"use client";

import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { sendWhatsAppMessage } from "@/lib/whatsapp";

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
  const shipping =
    subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0
      ? 0
      : SHIPPING_COST;

  const discount = subtotal >= 8000 ? Math.round(subtotal * 0.05) : 0;

  const total = subtotal + shipping - discount;

  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;

  const handleWhatsAppOrder = () => {
    if (subtotal === 0) {
      alert("Your cart is empty");
      return;
    }

    const message = `Hello! I would like to place an order from TinySilver.

🛍️ *ORDER SUMMARY*

Subtotal: ${formatPrice(subtotal)}
Shipping: ${shipping === 0 ? "Free" : formatPrice(shipping)}
${
  discount > 0
    ? `Discount: -${formatPrice(discount)}`
    : ""
}

💰 *TOTAL AMOUNT: ${formatPrice(total)}*

Please share the payment details.

Thank you!`;

    sendWhatsAppMessage(message);
  };

  return (
    <div className="rounded-xl border border-[#c5c6cc] p-6">
      <h2 className="text-base font-semibold text-[#0f172a]">
        Order Summary
      </h2>

      {remaining > 0 && subtotal > 0 && (
        <div className="mt-4 rounded-lg bg-[#c5c6cc]/25 px-3.5 py-3">
          <p className="text-xs text-[#0f172a]">
            Add{" "}
            <span className="font-semibold">
              {formatPrice(remaining)}
            </span>{" "}
            more to unlock{" "}
            <span className="font-semibold">
              FREE SHIPPING
            </span>
          </p>

          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white">
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
        {/* Subtotal */}
        <div className="flex items-center justify-between">
          <dt className="text-[#827e9c]">Subtotal</dt>

          <dd className="font-medium text-[#0f172a]">
            {formatPrice(subtotal)}
          </dd>
        </div>

        {/* Shipping */}
        <div className="flex items-center justify-between">
          <dt className="text-[#827e9c]">Shipping</dt>

          <dd className="font-medium text-[#0f172a]">
            {shipping === 0 ? "Free" : formatPrice(shipping)}
          </dd>
        </div>

        {/* Discount */}
        {discount > 0 && (
          <div className="flex items-center justify-between">
            <dt className="text-[#827e9c]">Discount</dt>

            <dd className="font-medium text-[#827e9c]">
              -{formatPrice(discount)}
            </dd>
          </div>
        )}
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

      {/* Order on WhatsApp */}
      <button
        type="button"
        onClick={handleWhatsAppOrder}
        disabled={subtotal === 0}
        className={`mt-4 w-full rounded-full px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 ${
          subtotal === 0
            ? "cursor-not-allowed bg-green-600/40"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        Order on WhatsApp
      </button>
    </div>
  );
}