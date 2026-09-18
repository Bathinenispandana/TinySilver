"use client";

import { useState } from "react";
import { Truck, Search, AlertCircle, Package } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import OrderTracker from "@/app/orders/[id]/OrderTracker";

export default function TrackOrderPage() {
  const [email, setEmail] = useState("");
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<any>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !orderId) {
      setError("Please enter both Email and Order ID.");
      return;
    }

    setLoading(true);
    setError(null);
    setOrder(null);

    try {
      const res = await fetch(`/api/track?order_id=${orderId}&email=${encodeURIComponent(email)}`);
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Order not found. Please check your details.");
      }

      setOrder(data.order);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 animate-fade-in min-h-[70vh]">
      <div className="text-center mb-10">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#0f172a]/5 mb-4">
          <Truck className="h-6 w-6 text-[#0f172a]" />
        </div>
        <h1 className="text-3xl font-bold text-[#0f172a] sm:text-4xl">
          Track Your Order
        </h1>
        <p className="mt-3 text-sm text-[#827e9c] max-w-lg mx-auto">
          Enter your Order ID and the email address used during checkout to see the current status of your shipment.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-[#c5c6cc] p-6 sm:p-8 max-w-lg mx-auto">
        <form onSubmit={handleTrack} className="space-y-5">
          <div>
            <label htmlFor="orderId" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#0f172a]">
              Order ID
            </label>
            <input
              id="orderId"
              type="text"
              required
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="e.g. 123e4567-e89b-..."
              className="w-full rounded-xl border border-[#c5c6cc] px-4 py-3 text-sm text-[#0f172a] outline-none transition-all duration-300 focus:border-[#827e9c] focus:ring-1 focus:ring-[#827e9c]"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#0f172a]">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="The email used for the order"
              className="w-full rounded-xl border border-[#c5c6cc] px-4 py-3 text-sm text-[#0f172a] outline-none transition-all duration-300 focus:border-[#827e9c] focus:ring-1 focus:ring-[#827e9c]"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
              <AlertCircle className="h-4 w-4" />
              <p>{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-full bg-[#0f172a] px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#827e9c] disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {loading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
            ) : (
              <>
                <Search className="h-4 w-4" />
                Find Order
              </>
            )}
          </button>
        </form>
      </div>

      {order && (
        <div className="mt-12 max-w-3xl mx-auto animate-fade-in">
          <div className="bg-white rounded-2xl shadow-sm border border-[#c5c6cc] overflow-hidden">
            <div className="bg-[#f8f8f9] px-6 py-4 border-b border-[#c5c6cc] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs text-[#827e9c] font-medium uppercase tracking-wider mb-1">Order Details</p>
                <p className="text-sm font-bold font-mono text-[#0f172a]">#{order.id.split('-')[0].toUpperCase()}</p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-xs text-[#827e9c] font-medium uppercase tracking-wider mb-1">Total</p>
                <p className="text-sm font-bold text-[#0f172a]">{formatPrice(order.total_amount)}</p>
              </div>
            </div>
            
            <OrderTracker status={order.status} />
            
            {order.shipping_address && (
               <div className="p-6 md:p-8 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row gap-8">
                 <div className="flex-1">
                   <div className="flex items-center gap-2 mb-3">
                     <Truck className="w-4 h-4 text-slate-400" />
                     <h4 className="text-xs font-bold text-[#0f172a] uppercase tracking-wider">Shipping To</h4>
                   </div>
                   <div className="text-sm text-slate-600 leading-relaxed">
                     <p className="font-medium text-[#0f172a] mb-1">{order.shipping_address.full_name}</p>
                     <p>{order.shipping_address.address_line1}</p>
                     {order.shipping_address.address_line2 && <p>{order.shipping_address.address_line2}</p>}
                     <p>{order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.postal_code}</p>
                   </div>
                 </div>
                 
                 <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                     <Package className="w-4 h-4 text-slate-400" />
                     <h4 className="text-xs font-bold text-[#0f172a] uppercase tracking-wider">Delivery Method</h4>
                   </div>
                   <div className="text-sm text-slate-600">
                     <p className="capitalize font-medium text-[#0f172a] mb-1">{order.shipping_address.delivery_method} Delivery</p>
                     <p>{order.shipping_address.delivery_method === 'express' ? '1-2 business days' : '4-6 business days'}</p>
                   </div>
                 </div>
               </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
