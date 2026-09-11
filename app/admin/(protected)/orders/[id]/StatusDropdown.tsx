"use client";

import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const STATUSES = [
  "PENDING",
  "PAID",
  "PROCESSING",
  "DISPATCHED",
  "DELIVERED",
  "CANCELLED",
];

export default function StatusDropdown({ 
  orderId, 
  currentStatus 
}: { 
  orderId: string; 
  currentStatus: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleUpdate = async (newStatus: string) => {
    setIsOpen(false);
    if (newStatus === status) return;
    
    setLoading(true);
    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq("id", orderId);

    if (error) {
      alert("Failed to update status: " + error.message);
      setLoading(false);
      return;
    }

    setStatus(newStatus);
    setLoading(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={loading}
        className="flex items-center justify-between w-40 px-3 py-2 bg-white border border-[#c5c6cc] rounded-md text-sm font-medium text-[#0f172a] hover:bg-[#f5f5f6] transition-colors disabled:opacity-50"
      >
        {status}
        <ChevronDown className="h-4 w-4 text-[#827e9c]" />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-40 mt-1 bg-white border border-[#c5c6cc] rounded-md shadow-lg overflow-hidden">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => handleUpdate(s)}
              className="flex items-center justify-between w-full px-3 py-2 text-sm text-left hover:bg-[#f5f5f6] transition-colors"
            >
              <span className={s === status ? "font-bold text-[#0f172a]" : "text-[#4b5563]"}>
                {s}
              </span>
              {s === status && <Check className="h-4 w-4 text-[#0f172a]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
