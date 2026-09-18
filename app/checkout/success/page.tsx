"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, ShoppingBag, ArrowRight, Truck, UserPlus, Lock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  const token = searchParams.get("token");
  const { isLoggedIn, openLogin } = useAuth();
  
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      if (!orderId) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`/api/track?order_id=${orderId}${token ? `&token=${token}` : ''}`);
        if (res.ok) {
          const data = await res.json();
          setOrder(data.order);
        }
      } catch (err) {
        console.error("Failed to fetch order", err);
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();
  }, [orderId, token]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8 animate-fade-in">
      <div className="flex justify-center mb-6">
        <div className="rounded-full bg-green-100 p-4">
          <CheckCircle2 className="h-16 w-16 text-green-600" />
        </div>
      </div>
      
      <h1 className="text-3xl sm:text-4xl font-bold text-[#0f172a] mb-4">
        Payment Successful!
      </h1>
      
      <p className="text-lg text-[#827e9c] mb-8 max-w-xl mx-auto">
        Thank you for your purchase from TinySilver. We've received your order and will begin processing it shortly.
      </p>
      
      {orderId && (
        <div className="bg-[#f8f8f9] rounded-xl p-6 border border-[#c5c6cc] mb-10 max-w-sm mx-auto shadow-sm">
          <p className="text-sm text-[#827e9c] mb-1 uppercase tracking-wider font-semibold">Order Reference ID</p>
          <p className="text-2xl font-mono text-[#0f172a] font-bold">
            {orderId.split("-")[0].toUpperCase()}
          </p>
          {order?.customer_email && (
            <p className="text-xs text-[#827e9c] mt-2">
              Confirmation sent to: <span className="font-semibold text-[#0f172a]">{order.customer_email}</span>
            </p>
          )}
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
        {order?.is_guest ? (
           <Link
             href="/track"
             className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f172a] px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#827e9c]"
           >
             <Truck className="h-4 w-4" />
             Track My Order
           </Link>
        ) : (
           <Link
             href="/orders"
             className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f172a] px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#827e9c]"
           >
             <ShoppingBag className="h-4 w-4" />
             View My Orders
           </Link>
        )}
        
        <Link
          href="/products"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-[#c5c6cc] bg-white px-8 py-3.5 text-sm font-semibold text-[#0f172a] transition-all duration-300 hover:bg-[#f8f8f9]"
        >
          Continue Shopping
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {order?.is_guest && !isLoggedIn && (
        <div className="mx-auto max-w-md rounded-2xl border-2 border-[#0f172a]/10 bg-white p-6 shadow-md text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <Lock className="h-24 w-24" />
          </div>
          <div className="flex items-center gap-3 mb-2 relative z-10">
            <div className="bg-slate-100 p-2 rounded-lg text-[#0f172a]">
              <UserPlus className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-[#0f172a]">Save your details?</h3>
          </div>
          <p className="text-sm text-[#827e9c] mb-5 relative z-10">
            You checked out as a guest. Claim your account to save your address for next time and track this order easily!
          </p>
          <button 
            onClick={openLogin}
            className="w-full relative z-10 flex items-center justify-center gap-2 rounded-full bg-[#0f172a] px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#827e9c]"
          >
            Create Password / Sign In
          </button>
        </div>
      )}
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-[#0f172a] border-t-transparent"></div></div>}>
      <SuccessContent />
    </Suspense>
  );
}
