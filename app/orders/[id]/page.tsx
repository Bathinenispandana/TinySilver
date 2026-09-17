import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Package, MapPin, CreditCard, Truck } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { products } from "@/lib/products";
import OrderTracker from "./OrderTracker";

function statusColor(status: string) {
  if (status === "Delivered") return "text-green-800 bg-green-100";
  if (status === "Shipped") return "text-blue-800 bg-blue-100";
  if (status === "PAID") return "text-emerald-800 bg-emerald-100";
  if (status === "PROCESSING") return "text-blue-800 bg-blue-100";
  if (status === "DISPATCHED") return "text-purple-800 bg-purple-100";
  if (status === "CANCELLED") return "text-red-800 bg-red-100";
  return "text-orange-800 bg-orange-100"; // PENDING
}

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const supabase = await createClient();
  const { id: orderId } = await params;

  // 1. Check if user is logged in
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/"); // Or redirect to login
  }

  // 2. Fetch Order Data
  // Since we use standard createClient, RLS automatically ensures the user can only fetch THEIR OWN order.
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .single();

  if (orderError || !order) {
    return notFound();
  }

  // 3. Fetch Order Items
  const { data: orderItems } = await supabase
    .from("order_items")
    .select("*")
    .eq("order_id", orderId);

  // 4. Map order_items to our catalog to get names/images
  const enrichedItems = orderItems?.map((item) => {
    const catalogProduct = products.find((p) => p.id.toString() === item.product_id);
    return {
      ...item,
      name: catalogProduct?.name || "Unknown Product",
      image: catalogProduct?.image || "",
    };
  }) || [];

  return (
    <main className="min-h-screen bg-[#f8fafc] px-4 py-10">
      <div className="mx-auto max-w-4xl space-y-6">
        
        {/* Header Actions */}
        <div className="flex items-center justify-between">
          <Link
            href="/orders"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0f172a] hover:text-[#0f172a]/70 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to My Orders
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          
          {/* Order Header Summary */}
          <div className="px-6 py-6 border-b border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-[#0f172a] flex items-center gap-3">
                Order #{order.id.split("-")[0].toUpperCase()}
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColor(order.status)}`}>
                  {order.status}
                </span>
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Placed on {new Date(order.created_at).toLocaleString("en-IN", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-500">Total Amount</p>
              <p className="text-2xl font-bold text-[#0f172a]">{formatPrice(order.total_amount)}</p>
            </div>
          </div>

          <OrderTracker status={order.status} />

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-0">
            
            {/* Left Column: Delivery & Payment Details */}
            <div className="p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-slate-200 space-y-8">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Shipping Address */}
                <section>
                  <h2 className="flex items-center gap-2 text-sm font-bold text-[#0f172a] uppercase tracking-wider mb-4">
                    <MapPin className="w-4 h-4 text-slate-400" /> Delivery Address
                  </h2>
                  <div className="space-y-1 text-sm text-[#0f172a] leading-relaxed">
                    <p className="font-semibold text-base mb-2">
                      {order.shipping_address.full_name || order.shipping_address.name}
                    </p>
                    <p>{order.shipping_address.address_line1}</p>
                    {order.shipping_address.address_line2 && <p>{order.shipping_address.address_line2}</p>}
                    <p>
                      {order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.postal_code || order.shipping_address.pincode}
                    </p>
                    <p className="text-slate-500 mt-3 pt-3 border-t border-slate-100">
                      <span className="block text-xs uppercase tracking-wider mb-1">Phone Number</span>
                      {order.shipping_address.phone_number || order.shipping_address.phone}
                    </p>
                  </div>
                </section>

                <div className="space-y-8">
                  {/* Delivery Method */}
                  <section>
                    <h2 className="flex items-center gap-2 text-sm font-bold text-[#0f172a] uppercase tracking-wider mb-4">
                      <Truck className="w-4 h-4 text-slate-400" /> Delivery Method
                    </h2>
                    <div className="space-y-1 text-sm text-[#0f172a]">
                      <p className="font-medium capitalize">
                        {order.shipping_address.delivery_method || "Standard"} Delivery
                      </p>
                      <p className="text-slate-500">
                        {order.shipping_address.delivery_method === "express" 
                          ? "1-2 business days" 
                          : "4-6 business days"}
                      </p>
                    </div>
                  </section>

                  {/* Payment Details */}
                  <section>
                    <h2 className="flex items-center gap-2 text-sm font-bold text-[#0f172a] uppercase tracking-wider mb-4">
                      <CreditCard className="w-4 h-4 text-slate-400" /> Payment
                    </h2>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="text-slate-500 block mb-1">Transaction ID</span>
                        <span className="font-mono text-[#0f172a] bg-slate-100 px-2 py-1 rounded">
                          {order.payment_id || "N/A"}
                        </span>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>

            {/* Right Column: Order Items */}
            <div className="p-6 md:p-8 bg-slate-50/50">
              <h2 className="flex items-center gap-2 text-sm font-bold text-[#0f172a] uppercase tracking-wider mb-6">
                <Package className="w-4 h-4 text-slate-400" /> Order Summary
              </h2>
              
              <div className="space-y-5">
                {enrichedItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl border border-slate-200 shadow-sm" />
                    ) : (
                      <div className="w-20 h-20 bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-center">
                        <Package className="w-8 h-8 text-slate-300" />
                      </div>
                    )}
                    <div className="flex-1 flex flex-col justify-center">
                      <p className="text-sm font-bold text-[#0f172a] leading-tight line-clamp-2">{item.name}</p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-md">Qty: {item.quantity}</p>
                        <p className="text-sm font-bold text-[#0f172a]">{formatPrice(item.price_at_time * item.quantity)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Subtotal</span>
                  <span className="font-medium text-[#0f172a]">
                    {formatPrice(order.total_amount - (order.shipping_address.delivery_method === 'express' ? 249 : 0))}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Shipping</span>
                  <span className="font-medium text-[#0f172a]">
                    {order.shipping_address.delivery_method === 'express' ? formatPrice(249) : "Free"}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-black mt-4 pt-4 border-t border-slate-200">
                  <span className="text-[#0f172a]">Total</span>
                  <span className="text-[#0f172a]">{formatPrice(order.total_amount)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
