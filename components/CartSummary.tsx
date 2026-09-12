"use client";

import Link from "next/link";
import { formatPrice } from "@/lib/utils";

interface CartSummaryProps {
  subtotal: number;
  ctaHref?: string;
  ctaLabel?: string;
}

export default function CartSummary({
  subtotal,
  ctaHref = "/checkout",
  ctaLabel = "Proceed to Checkout",
}: CartSummaryProps) {
  const total = subtotal;

  return (
    <div className="rounded-xl border border-[#c5c6cc] p-6">
      <h2 className="text-base font-semibold text-[#0f172a]">
        Order Summary
      </h2>

      <dl className="mt-5 flex flex-col gap-3 text-sm">
        {/* Subtotal */}
        <div className="flex items-center justify-between">
          <dt className="text-[#827e9c]">Subtotal</dt>

          <dd className="font-medium text-[#0f172a]">
            {formatPrice(subtotal)}
          </dd>
        </div>
      </dl>

      {/* Total */}
      <div className="mt-4 flex items-center justify-between border-t border-[#c5c6cc] pt-4">
        <span className="text-sm font-semibold text-[#0f172a]">
          Total
        </span>

        <span className="text-lg font-semibold text-[#0f172a]">
          {formatPrice(total)}
        </span>
      </div>

      {/* Proceed to Checkout */}
      <Link
        href={ctaHref}
        className={`mt-6 block w-full rounded-full bg-[#0f172a] py-3.5 text-center text-sm font-semibold text-white transition-all duration-300 hover:bg-[#827e9c] ${
          subtotal === 0
            ? "pointer-events-none opacity-40"
            : ""
        }`}
      >
        {ctaLabel}
      </Link>
    </div>
  );
}