"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle2, Loader2, CreditCard } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

function MockZohoContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { clearCart } = useCart();
  
  const order_id = searchParams.get("order_id");
  const amount = searchParams.get("amount");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSimulatePayment = async () => {
    setLoading(true);

    try {
      // 1. Simulate user entering CC details and Zoho processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 2. Fire the webhook to our server to simulate Zoho's backend callback
      const mockPaymentId = "pay_zoho_" + Math.random().toString(36).substring(2, 10);
      
      const res = await fetch("/api/webhooks/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_id,
          payment_id: mockPaymentId,
          status: "captured"
        })
      });

      if (!res.ok) throw new Error("Webhook simulation failed");

      // 3. Clear the frontend cart since order is successful
      clearCart();

      // 4. Show success UI briefly
      setSuccess(true);

      // 5. Redirect to our website's success page
      setTimeout(() => {
        router.push(`/checkout/success?order_id=${order_id}`);
      }, 1500);

    } catch (err) {
      console.error(err);
      alert("Payment simulation failed");
      setLoading(false);
    }
  };

  if (!order_id || !amount) {
    return <div className="p-10 text-center">Invalid payment request</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 border border-gray-100">
        <div className="flex items-center justify-center mb-6 text-blue-600">
          <CreditCard className="h-12 w-12" />
        </div>
        
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
          Zoho Payment Gateway (Mock)
        </h1>
        
        <p className="text-center text-gray-500 mb-8 text-sm">
          This is a simulated payment screen for development.
        </p>

        <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-500">Order ID</span>
            <span className="font-medium text-gray-900 truncate max-w-[150px]">{order_id}</span>
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <span className="text-gray-500">Amount to Pay</span>
            <span className="text-xl font-bold text-gray-900">{formatPrice(Number(amount))}</span>
          </div>
        </div>

        {success ? (
          <div className="bg-green-50 text-green-700 rounded-xl p-4 flex flex-col items-center justify-center gap-2 animate-in fade-in zoom-in duration-300">
            <CheckCircle2 className="h-8 w-8 text-green-500" />
            <span className="font-medium">Payment Successful! Redirecting...</span>
          </div>
        ) : (
          <button
            onClick={handleSimulatePayment}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Processing Payment...
              </>
            ) : (
              "Simulate Successful Payment"
            )}
          </button>
        )}
        
        {!loading && !success && (
          <button
            onClick={() => router.push("/checkout")}
            className="w-full mt-4 text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors py-2"
          >
            Cancel and return to TinySilver
          </button>
        )}
      </div>
    </div>
  );
}

export default function MockZohoPage() {
  return (
    <Suspense fallback={<div className="flex justify-center p-20"><Loader2 className="h-8 w-8 animate-spin text-gray-400" /></div>}>
      <MockZohoContent />
    </Suspense>
  );
}
