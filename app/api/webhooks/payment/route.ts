import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signatureHeader = request.headers.get("x-zoho-webhook-signature");

    if (!signatureHeader) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    // signature format: t=<timestamp>,v=<signature>
    const parts = signatureHeader.split(',');
    if (parts.length !== 2) {
      return NextResponse.json({ error: "Malformed signature header" }, { status: 400 });
    }
    
    const t = parts[0].split('=')[1];
    const v = parts[1].split('=')[1];

    const data = `${t}.${rawBody}`;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.ZOHO_WEBHOOK_SECRET || "")
      .update(data)
      .digest('hex');

    if (!crypto.timingSafeEqual(Buffer.from(v), Buffer.from(expectedSignature))) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const payload = JSON.parse(rawBody);
    
    // Zoho webhook payload typically looks like:
    // { "event": "payment.succeeded", "data": { "payment": { "payments_session_id": "...", "meta_data": [ ... ] } } }
    
    const eventType = payload.event;
    
    // Handle specific event types
    if (eventType === "payment.succeeded") {
      const paymentData = payload.data?.payment || payload.data;
      
      // Extract order_id from meta_data
      let order_id = null;
      if (paymentData.meta_data && Array.isArray(paymentData.meta_data)) {
        const orderMeta = paymentData.meta_data.find((m: any) => m.key === "order_id");
        if (orderMeta) order_id = orderMeta.value;
      }

      // If we couldn't find order_id in metadata, fallback if it's sent elsewhere (for safety)
      if (!order_id && payload.order_id) {
         order_id = payload.order_id;
      }

      const payment_id = paymentData.payment_id || paymentData.payments_session_id;

      if (!order_id) {
        return NextResponse.json({ error: "Missing order_id in payload metadata" }, { status: 400 });
      }

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

    return NextResponse.json({ success: true, message: `Ignored event: ${eventType}` });
  } catch (error: any) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
