"use client";

import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
}

export default function QuantitySelector({
  quantity,
  onChange,
  min = 1,
  max = 20,
  size = "md",
}: QuantitySelectorProps) {
  const btnSize = size === "sm" ? "h-8 w-8" : "h-10 w-10";
  const textSize = size === "sm" ? "text-sm" : "text-base";

  return (
    <div className="inline-flex items-center border border-[#c5c6cc] rounded-full overflow-hidden">
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={quantity <= min}
        onClick={() => onChange(Math.max(min, quantity - 1))}
        className={`${btnSize} flex items-center justify-center text-[#0f172a] hover:bg-[#c5c6cc]/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300`}
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span
        className={`${textSize} ${
          size === "sm" ? "w-8" : "w-10"
        } text-center font-medium text-[#0f172a] select-none`}
      >
        {quantity}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        disabled={quantity >= max}
        onClick={() => onChange(Math.min(max, quantity + 1))}
        className={`${btnSize} flex items-center justify-center text-[#0f172a] hover:bg-[#c5c6cc]/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300`}
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
