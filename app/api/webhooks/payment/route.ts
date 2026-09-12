import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    // In production, we would verify Zoho's Webhook signature here
    // const signature = request.headers.get("x-zoho-signature");

    const payload = await request.json();
    const { order_id, payment_id, status } = payload;

    if (!order_id || !payment_id || !status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (status === "captured" || status === "success") {
      // Update the order in the database
      const { data, error } = await supabaseAdmin
        .from("orders")
        .update({
          payment_status: "PAID",
          status: "PAID",
          payment_id: payment_id,
          payment_timestamp: new Date().toISOString(),
        })
        .eq("id", order_id)
        .select()
        .single();

      if (error) {
        console.error("Webhook DB update error:", error);
        return NextResponse.json({ error: "Failed to update order status" }, { status: 500 });
      }

      return NextResponse.json({ success: true, order: data });
    }

    return NextResponse.json({ success: true, message: "Ignored non-success status" });
  } catch (error: any) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
