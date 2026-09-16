import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Package, MapPin, CreditCard, User, Truck } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import StatusDropdown from "./StatusDropdown";
import { products } from "@/lib/products"; // Import the static catalog
import ZohoRefundMock from "./ZohoRefundMock";

export default async function AdminOrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const supabase = await createClient();
  const { id: orderId } = await params;

  // 1. Fetch Order Data
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .single();

  if (orderError || !order) {
    console.error("DEBUG order fetching error:", orderError);
    return notFound();
  }

  // 1b. Fetch Customer Profile manually
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, email, phone")
    .eq("id", order.user_id)
    .single();

  const customer = profile || { full_name: "Guest", email: "Unknown", phone: "None" };

  // 2. Fetch Order Items
  const { data: orderItems, error: itemsError } = await supabase
    .from("order_items")
    .select("*")
    .eq("order_id", orderId);

  // 3. Map order_items to our catalog to get names/images
  const enrichedItems = orderItems?.map((item) => {
    // Find the product in our static catalog
    // Note: product_id in db is stored as text, our catalog might use numbers
    const catalogProduct = products.find((p) => p.id.toString() === item.product_id);
    return {
      ...item,
      name: catalogProduct?.name || "Unknown Product",
      image: catalogProduct?.image || "",
    };
  }) || [];



  return (
    <div className="w-full space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/orders"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#827e9c] hover:text-[#0f172a] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Orders
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-[#827e9c]">Update Status:</span>
          <StatusDropdown orderId={order.id} currentStatus={order.status} />
        </div>
      </div>

      <div className="bg-white rounded-lg border border-[#c5c6cc] shadow-sm overflow-hidden">
        {/* Order Header Summary */}
        <div className="px-6 py-5 border-b border-[#c5c6cc] bg-[#f8f9fa] flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-lg font-bold text-[#0f172a]">
              Order {order.id.split("-")[0].toUpperCase()}
            </h1>
            <p className="text-sm text-[#827e9c] mt-1">
              Placed on {new Date(order.created_at).toLocaleString("en-IN")}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-[#827e9c]">Total Amount</p>
            <p className="text-xl font-bold text-[#0f172a]">{formatPrice(order.total_amount)}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-0">
          {/* Left Column: Customer & Delivery */}
          <div className="p-6 border-b lg:border-b-0 lg:border-r border-[#c5c6cc] space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Customer Details */}
              <section>
                <h2 className="flex items-center gap-2 text-sm font-bold text-[#0f172a] uppercase tracking-wider mb-4">
                  <User className="w-4 h-4 text-[#827e9c]" /> Customer
                </h2>
                <div className="space-y-1">
                  <p className="font-medium text-[#0f172a]">{customer?.full_name || "Guest"}</p>
                  <p className="text-sm text-[#827e9c]">{customer?.email}</p>
                  <p className="text-sm text-[#827e9c]">{customer?.phone || "No phone provided"}</p>
                </div>
              </section>

              {/* Payment Details */}
              <section>
                <h2 className="flex items-center gap-2 text-sm font-bold text-[#0f172a] uppercase tracking-wider mb-4">
                  <CreditCard className="w-4 h-4 text-[#827e9c]" /> Payment
                </h2>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-[#827e9c] block mb-1">Payment Status:</span>
                    {order.status === "PENDING" ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800">
                        Pending
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                        Paid
                      </span>
                    )}
                  </div>
                  <div>
                    <span className="text-[#827e9c] block mb-1">Transaction ID:</span>
                    <span className="font-mono text-[#0f172a]">{order.payment_id || "N/A"}</span>
                  </div>
                </div>
              </section>
            </div>

            <hr className="border-[#c5c6cc]" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Shipping Address */}
              <section>
                <h2 className="flex items-center gap-2 text-sm font-bold text-[#0f172a] uppercase tracking-wider mb-4">
                  <MapPin className="w-4 h-4 text-[#827e9c]" /> Shipping Address
                </h2>
                <div className="space-y-1 text-sm text-[#0f172a]">
                  <p className="font-medium">{order.shipping_address.name}</p>
                  <p>{order.shipping_address.address_line1}</p>
                  {order.shipping_address.address_line2 && <p>{order.shipping_address.address_line2}</p>}
                  <p>
                    {order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.pincode}
                  </p>
                  <p className="text-[#827e9c] mt-2">Phone: {order.shipping_address.phone}</p>
                </div>
              </section>

              {/* Delivery Method */}
              <section>
                <h2 className="flex items-center gap-2 text-sm font-bold text-[#0f172a] uppercase tracking-wider mb-4">
                  <Truck className="w-4 h-4 text-[#827e9c]" /> Delivery Method
                </h2>
                <div className="space-y-1 text-sm text-[#0f172a]">
                  <p className="font-medium capitalize">
                    {order.shipping_address.delivery_method || "Standard"} Delivery
                  </p>
                  <p className="text-[#827e9c]">
                    {order.shipping_address.delivery_method === "express" 
                      ? "1-2 business days" 
                      : "4-6 business days"}
                  </p>
                </div>
              </section>
            </div>

            {/* Zoho Refund Management */}
            <ZohoRefundMock orderId={order.id} totalAmount={order.total_amount} />
          </div>

          {/* Right Column: Order Items */}
          <div className="p-6 bg-[#f8f9fa]">
            <h2 className="flex items-center gap-2 text-sm font-bold text-[#0f172a] uppercase tracking-wider mb-4">
              <Package className="w-4 h-4 text-[#827e9c]" /> Order Items
            </h2>
            
            <div className="space-y-4">
              {enrichedItems.map((item) => (
                <div key={item.id} className="flex gap-4 p-3 bg-white border border-[#c5c6cc] rounded-lg">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md border border-[#c5c6cc]" />
                  ) : (
                    <div className="w-16 h-16 bg-[#f5f5f6] rounded-md border border-[#c5c6cc] flex items-center justify-center">
                      <Package className="w-6 h-6 text-[#c5c6cc]" />
                    </div>
                  )}
                  <div className="flex-1 flex flex-col justify-center">
                    <p className="text-sm font-medium text-[#0f172a] line-clamp-1">{item.name}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-[#827e9c]">Qty: {item.quantity}</p>
                      <p className="text-sm font-semibold text-[#0f172a]">{formatPrice(item.price_at_time * item.quantity)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-[#c5c6cc] space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#827e9c]">Subtotal</span>
                <span className="font-medium text-[#0f172a]">
                  {formatPrice(order.total_amount - (order.shipping_address.delivery_method === 'express' ? 249 : 0))}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#827e9c]">Shipping</span>
                <span className="font-medium text-[#0f172a]">
                  {order.shipping_address.delivery_method === 'express' ? formatPrice(249) : "Free"}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold mt-2 pt-2 border-t border-[#c5c6cc]">
                <span className="text-[#0f172a]">Total</span>
                <span className="text-[#0f172a]">{formatPrice(order.total_amount)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
