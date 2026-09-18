import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const order_id = searchParams.get("order_id");
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    if (!order_id) {
      return NextResponse.json({ error: "Order ID is required." }, { status: 400 });
    }

    if (!token && !email) {
      return NextResponse.json({ error: "Either tracking token or email is required." }, { status: 400 });
    }

    // Build the query
    let query = supabaseAdmin
      .from("orders")
      .select(`
        id, 
        status, 
        payment_status, 
        total_amount, 
        created_at, 
        customer_email, 
        is_guest,
        shipping_address
      `)
      .eq("id", order_id);

    if (token) {
      query = query.eq("tracking_token", token);
    } else if (email) {
      query = query.eq("customer_email", email);
    }

    const { data: order, error } = await query.single();

    if (error || !order) {
      return NextResponse.json({ error: "Order not found or invalid credentials." }, { status: 404 });
    }

    return NextResponse.json({ order });
  } catch (error: any) {
    console.error("Track API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
