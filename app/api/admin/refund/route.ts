import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const { order_id, refund_type, amount } = await request.json();

    if (!order_id || !refund_type || amount === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Fetch the order to verify it's eligible for a refund
    const { data: order, error: fetchError } = await supabaseAdmin
      .from("orders")
      .select("*")
      .eq("id", order_id)
      .single();

    if (fetchError || !order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (order.status !== "PAID" && order.status !== "DISPATCHED" && order.status !== "DELIVERED") {
      return NextResponse.json({ error: "Order is not eligible for a refund" }, { status: 400 });
    }

    // 2. Here we would make the actual server-to-server call to Zoho
    // Example: 
    // const zohoResponse = await fetch("https://payments.zoho.in/api/v1/refunds", { ... });
    // if (!zohoResponse.ok) throw new Error("Zoho refund failed");

    // 3. Update the order status in our database
    const newStatus = refund_type === "FULL" ? "REFUNDED" : "PARTIALLY_REFUNDED";
    
    const { data: updatedOrder, error: updateError } = await supabaseAdmin
      .from("orders")
      .update({
        status: newStatus,
        payment_status: newStatus,
      })
      .eq("id", order_id)
      .select()
      .single();

    if (updateError) {
      console.error("Refund DB update error:", updateError);
      return NextResponse.json({ error: "Failed to update order status" }, { status: 500 });
    }

    return NextResponse.json({ success: true, order: updatedOrder, refunded_amount: amount });
  } catch (error: any) {
    console.error("Refund processing error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
