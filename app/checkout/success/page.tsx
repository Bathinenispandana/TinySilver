"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, ShoppingBag, ArrowRight } from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");

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
        <div className="bg-[#f8f8f9] rounded-xl p-6 border border-[#c5c6cc] mb-10 max-w-sm mx-auto">
          <p className="text-sm text-[#827e9c] mb-1 uppercase tracking-wider font-semibold">Order Reference ID</p>
          <p className="text-xl font-mono text-[#0f172a] font-bold">
            {orderId.split("-")[0].toUpperCase()}
          </p>
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link
          href="/orders"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f172a] px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#827e9c]"
        >
          <ShoppingBag className="h-4 w-4" />
          View My Orders
        </Link>
        
        <Link
          href="/products"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-[#c5c6cc] bg-white px-8 py-3.5 text-sm font-semibold text-[#0f172a] transition-all duration-300 hover:bg-[#f8f8f9]"
        >
          Continue Shopping
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
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
