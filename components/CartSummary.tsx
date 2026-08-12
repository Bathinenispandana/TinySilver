"use client";

import Link from "next/link";
import { formatPrice } from "@/lib/utils";

interface CartSummaryProps {
  subtotal: number;
  ctaHref?: string;
  ctaLabel?: string;
}

const FREE_SHIPPING_THRESHOLD = 2000;
const SHIPPING_COST = 149;

export default function CartSummary({
  subtotal,
  ctaHref = "/checkout",
  ctaLabel = "Proceed to Checkout",
}: CartSummaryProps) {
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_COST;
  const discount = subtotal >= 8000 ? Math.round(subtotal * 0.05) : 0;
  const total = subtotal + shipping - discount;
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <div className="rounded-xl border border-[#c5c6cc] p-6">
      <h2 className="text-base font-semibold text-[#0f172a]">
        Order Summary
      </h2>

      {remaining > 0 && subtotal > 0 && (
        <div className="mt-4 rounded-lg bg-[#c5c6cc]/25 px-3.5 py-3">
          <p className="text-xs text-[#0f172a]">
            Add <span className="font-semibold">{formatPrice(remaining)}</span>{" "}
            more to unlock{" "}
            <span className="font-semibold">FREE SHIPPING</span>
          </p>
          <div className="mt-2 h-1.5 w-full rounded-full bg-white overflow-hidden">
            <div
              className="h-full rounded-full bg-[#0f172a] transition-all duration-300"
              style={{
                width: `${Math.min(
                  100,
                  (subtotal / FREE_SHIPPING_THRESHOLD) * 100
                )}%`,
              }}
            />
          </div>
        </div>
      )}

      <dl className="mt-5 flex flex-col gap-3 text-sm">
        <div className="flex items-center justify-between">
          <dt className="text-[#827e9c]">Subtotal</dt>
          <dd className="font-medium text-[#0f172a]">
            {formatPrice(subtotal)}
          </dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-[#827e9c]">Shipping</dt>
          <dd className="font-medium text-[#0f172a]">
            {shipping === 0 ? "Free" : formatPrice(shipping)}
          </dd>
        </div>
        {discount > 0 && (
          <div className="flex items-center justify-between">
            <dt className="text-[#827e9c]">Discount</dt>
            <dd className="font-medium text-[#827e9c]">
              -{formatPrice(discount)}
            </dd>
          </div>
        )}
      </dl>

      <div className="mt-4 flex items-center justify-between border-t border-[#c5c6cc] pt-4">
        <span className="text-sm font-semibold text-[#0f172a]">Total</span>
        <span className="text-lg font-semibold text-[#0f172a]">
          {formatPrice(total)}
        </span>
      </div>

      <Link
        href={ctaHref}
        className={`mt-6 block w-full rounded-full bg-[#0f172a] text-center text-white text-sm font-semibold py-3.5 hover:bg-[#827e9c] transition-all duration-300 ${
          subtotal === 0 ? "pointer-events-none opacity-40" : ""
        }`}
      >
        {ctaLabel}
      </Link>
    </div>
  );
}
