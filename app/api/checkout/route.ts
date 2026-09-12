import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { customer, address_id, delivery_method, items } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Determine subtotal from actual product prices to prevent frontend tampering
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const { data: product, error } = await supabaseAdmin
        .from("products")
        .select("price")
        .eq("id", item.product_id)
        .single();

      if (error || !product) {
        return NextResponse.json({ error: `Product not found: ${item.product_id}` }, { status: 400 });
      }

      const itemTotal = product.price * item.quantity;
      subtotal += itemTotal;

      orderItems.push({
        product_id: item.product_id,
        quantity: item.quantity,
        price: product.price,
      });
    }

    // Delivery fee calculation
    const delivery_fee = delivery_method === "express" ? 249 : 0;
    const total_amount = subtotal + delivery_fee;

    // Create a PENDING order in the database
    const { data: order, error: orderError } = await supabaseAdmin
      .from("orders")
      .insert({
        customer_email: customer.email,
        customer_name: customer.fullName,
        customer_phone: customer.phone,
        address_id: address_id,
        status: "PENDING",
        payment_status: "PENDING",
        delivery_fee: delivery_fee,
        total_amount: total_amount,
      })
      .select()
      .single();

    if (orderError || !order) {
      console.error("Order creation error:", orderError);
      return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
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
      return NextResponse.json({ error: "Failed to add items to order" }, { status: 500 });
    }

    // TODO: Zoho Payment Gateway Integration
    // Replace this section with the actual Zoho API call to generate a checkout session URL
    // For now, we will mock the Zoho redirect by redirecting to a local test webhook mock page
    // which simulates a successful payment.
    
    // In production, this would be: `https://payments.zoho.in/checkout/...`
    const mockZohoUrl = `/checkout/mock-zoho?order_id=${order.id}&amount=${total_amount}`;

    return NextResponse.json({ url: mockZohoUrl });
  } catch (error: any) {
    console.error("Checkout API error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
