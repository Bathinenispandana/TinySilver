import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { products } from "@/lib/products";

export async function POST(request: Request) {
  try {
    const { customer, address_id, shipping_address, delivery_method, items, is_guest } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Determine subtotal from actual product prices to prevent frontend tampering
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      // Find the product securely from our static list (server-side)
      const product = products.find(p => p.id === item.product_id);

      if (!product) {
        return NextResponse.json({ error: `Product not found: ${item.product_id}` }, { status: 400 });
      }

      const itemTotal = product.price * item.quantity;
      subtotal += itemTotal;

      orderItems.push({
        product_id: item.product_id,
        quantity: item.quantity,
        price_at_time: product.price,
      });
    }

    // Delivery fee calculation
    const delivery_fee = delivery_method === "express" ? 249 : 0;
    const total_amount = subtotal + delivery_fee;

    let userId = null;
    let finalAddress = shipping_address;

    if (!is_guest) {
      // Fetch the user's ID
      const { data: profile } = await supabaseAdmin
        .from("profiles")
        .select("id")
        .eq("email", customer.email)
        .single();

      if (!profile) {
        return NextResponse.json({ error: "User profile not found for the provided email. If you are checking out as a guest, please use the guest flow." }, { status: 400 });
      }
      userId = profile.id;

      // Fetch the shipping address details
      if (address_id) {
        const { data: address } = await supabaseAdmin
          .from("addresses")
          .select("*")
          .eq("id", address_id)
          .single();

        if (!address) {
          return NextResponse.json({ error: "Selected address not found." }, { status: 400 });
        }
        finalAddress = address;
      }
    } else {
      // It's a guest checkout, ensure we have a shipping address passed directly
      if (!finalAddress) {
        return NextResponse.json({ error: "Shipping address is required for guest checkout." }, { status: 400 });
      }
    }

    // Create a PENDING order in the database
    const orderPayload = {
      user_id: userId,
      customer_email: customer.email,
      is_guest: !!is_guest,
      status: "PENDING",
      payment_status: "PENDING",
      delivery_fee: delivery_fee,
      total_amount: total_amount,
      shipping_address: {
        ...finalAddress,
        delivery_method,
      }
    };

    const { data: order, error: orderError } = await supabaseAdmin
      .from("orders")
      .insert(orderPayload)
      .select()
      .single();

    if (orderError || !order) {
      console.error("Order creation error:", orderError);
      return NextResponse.json({ error: `Failed to create order: ${orderError?.message || "Unknown DB error"}` }, { status: 500 });
    }

    // Insert order items
    const { error: itemsError } = await supabaseAdmin
      .from("order_items")
      .insert(
        orderItems.map((oi) => ({
          order_id: order.id,
          ...oi,
        }))
      );

    if (itemsError) {
      console.error("Order items creation error:", itemsError);
      return NextResponse.json({ error: `Failed to add items to order: ${itemsError?.message || "Unknown DB error"}` }, { status: 500 });
    }

    // Zoho Payment Gateway Integration
    const zohoPayload = {
      amount: total_amount,
      currency: "INR",
      configurations: {
        hosted_checkout_parameters: {
          success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?order_id=${order.id}&token=${order.tracking_token}`,
          failure_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout`,
          description: `Order ${order.id.split("-")[0].toUpperCase()} for ${customer.fullName || 'Customer'}`
        }
      },
      meta_data: [
        { key: "order_id", value: order.id }
      ]
    };

    // Exchange Refresh Token for Access Token
    const tokenParams = new URLSearchParams();
    tokenParams.append('grant_type', 'refresh_token');
    tokenParams.append('client_id', process.env.ZOHO_CLIENT_ID || "");
    tokenParams.append('client_secret', process.env.ZOHO_CLIENT_SECRET || "");
    tokenParams.append('refresh_token', process.env.ZOHO_REFRESH_TOKEN || "");

    const tokenResponse = await fetch('https://accounts.zoho.in/oauth/v2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: tokenParams
    });

    const tokenData = await tokenResponse.json();
    
    if (!tokenResponse.ok || !tokenData.access_token) {
      console.error("Zoho Token Error:", tokenData);
      return NextResponse.json({ error: "Failed to authenticate with Zoho Payments server." }, { status: 500 });
    }

    const accessToken = tokenData.access_token;

    // Zoho Sandbox API endpoint (Use 'https://payments.zoho.in' for live production later)
    const zohoApiDomain = "https://payments.zoho.in";

    const zohoResponse = await fetch(`${zohoApiDomain}/api/v1/paymentsessions?account_id=${process.env.ZOHO_ACCOUNT_ID}`, {
      method: "POST",
      headers: {
        "Authorization": `Zoho-oauthtoken ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(zohoPayload)
    });

    const zohoData = await zohoResponse.json();

    if (!zohoResponse.ok || zohoData.code === "error") {
      console.error("Zoho API Error:", zohoData);
      return NextResponse.json({ error: `Zoho API Error: ${zohoData.message || "Failed to create payment session"}` }, { status: 500 });
    }

    // Zoho Hosted Checkout requires the `access_key` from the response
    const accessKey = zohoData.payments_session?.access_key;
    if (!accessKey) {
      console.error("Missing access_key in Zoho response:", zohoData);
      return NextResponse.json({ error: "Failed to parse Zoho payment URL." }, { status: 500 });
    }

    const zohoCheckoutUrl = `${zohoApiDomain}/hostedcheckout/${accessKey}`;

    return NextResponse.json({ url: zohoCheckoutUrl });
  } catch (error: any) {
    console.error("Checkout API error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
