"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle, RefreshCcw, DollarSign } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export default function ZohoRefundMock({ 
  orderId, 
  totalAmount 
}: { 
  orderId: string; 
  totalAmount: number 
}) {
  const [refundStatus, setRefundStatus] = useState<"NONE" | "PROCESSING" | "SUCCESS" | "ERROR">("NONE");
  const [refundType, setRefundType] = useState<"FULL" | "PARTIAL">("FULL");
  const [partialAmount, setPartialAmount] = useState<number>(totalAmount);

  const handleRefund = () => {
    if (refundType === "PARTIAL" && (partialAmount <= 0 || partialAmount > totalAmount)) {
      alert("Invalid partial refund amount.");
      return;
    }
    
    setRefundStatus("PROCESSING");
    
    // Simulate Zoho API Call delay
    setTimeout(() => {
      setRefundStatus("SUCCESS");
    }, 2000);
  };

  return (
    <div className="mt-6 border border-[#c5c6cc] rounded-lg p-5 bg-white">
      <div className="flex items-center gap-2 mb-4">
        <RefreshCcw className="w-5 h-5 text-[#25314d]" />
        <h3 className="font-bold text-[#0f172a] text-base">Zoho Payment Gateway - Refund Management</h3>
      </div>
      
      <p className="text-sm text-[#827e9c] mb-6">
        This section allows you to initiate refunds directly through the Zoho Payment Gateway integration. 
        Once a refund is processed here, it will automatically sync with Zoho Books and notify the customer.
      </p>

      {refundStatus === "SUCCESS" ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-green-800">Refund Initiated Successfully!</p>
            <p className="text-xs text-green-700 mt-1">
              A {refundType === "FULL" ? "full" : "partial"} refund of {formatPrice(refundType === "FULL" ? totalAmount : partialAmount)} has been submitted to Zoho. 
              The customer will receive the amount in their original payment method within 5-7 business days.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <label className="flex-1 border border-[#c5c6cc] rounded-lg p-3 cursor-pointer hover:bg-slate-50 flex items-center gap-3">
              <input 
                type="radio" 
                name="refundType" 
                value="FULL" 
                checked={refundType === "FULL"} 
                onChange={() => setRefundType("FULL")}
                className="text-[#C9A66B] focus:ring-[#C9A66B]"
              />
              <div>
                <p className="font-medium text-[#0f172a] text-sm">Full Refund</p>
                <p className="text-xs text-[#827e9c]">Refund the entire order amount ({formatPrice(totalAmount)})</p>
              </div>
            </label>
            <label className="flex-1 border border-[#c5c6cc] rounded-lg p-3 cursor-pointer hover:bg-slate-50 flex items-center gap-3">
              <input 
                type="radio" 
                name="refundType" 
                value="PARTIAL" 
                checked={refundType === "PARTIAL"} 
                onChange={() => setRefundType("PARTIAL")}
                className="text-[#C9A66B] focus:ring-[#C9A66B]"
              />
              <div>
                <p className="font-medium text-[#0f172a] text-sm">Partial Refund</p>
                <p className="text-xs text-[#827e9c]">Refund a specific amount for selected items</p>
              </div>
            </label>
          </div>

          {refundType === "PARTIAL" && (
            <div className="bg-slate-50 p-4 rounded-lg border border-[#c5c6cc]">
              <label className="block text-sm font-medium text-[#0f172a] mb-1">
                Enter Refund Amount (Max: {formatPrice(totalAmount)})
              </label>
              <div className="relative max-w-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="h-4 w-4 text-[#827e9c]" />
                </div>
                <input
                  type="number"
                  max={totalAmount}
                  min={1}
                  value={partialAmount}
                  onChange={(e) => setPartialAmount(Number(e.target.value))}
                  className="block w-full pl-9 pr-3 py-2 border border-[#c5c6cc] rounded-md text-sm focus:ring-[#C9A66B] focus:border-[#C9A66B] outline-none"
                />
              </div>
            </div>
          )}

          <div className="pt-2">
            <button
              onClick={handleRefund}
              disabled={refundStatus === "PROCESSING"}
              className="inline-flex items-center gap-2 bg-[#25314d] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#25314d]/90 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
            >
              {refundStatus === "PROCESSING" ? (
                <>
                  <RefreshCcw className="w-4 h-4 animate-spin" />
                  Processing with Zoho...
                </>
              ) : (
                `Initiate ${refundType === "FULL" ? "Full" : "Partial"} Refund`
              )}
            </button>
            <p className="text-xs text-[#827e9c] mt-3 flex items-start gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              Note: This is a UI simulation. In a real-world scenario, this button triggers a secure backend API call to Zoho's Refund endpoint using your secret merchant keys.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
