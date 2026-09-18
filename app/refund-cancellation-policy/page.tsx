import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, RotateCcw } from "lucide-react";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | Tiny Silver Collection",
  description: "Learn about order cancellations, refunds and returns at Tiny Silver Collection.",
};

export default function RefundCancellationPolicyPage() {
  return (
    <div className="bg-[#f8fafc]">
      <section className="border-b border-[#e2e8f0] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#64748b] transition-colors hover:text-[#0f172a]"><ArrowLeft className="h-4 w-4" /> Back to Tiny Silver</Link>
          <div className="mt-10 max-w-3xl">
            <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#827e9c]"><RotateCcw className="h-5 w-5" /> Customer care</div>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-[#0f172a] sm:text-5xl">Refund &amp; Cancellation Policy</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#64748b]">Our policy for cancelling orders, returning eligible items and receiving refunds.</p>
            <p className="mt-6 text-sm text-[#94a3b8]">Last updated: September 15, 2026</p>
          </div>
        </div>
      </section>
      <article className="mx-auto max-w-3xl space-y-10 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <section><h2>1. Order cancellations</h2><p>You may request cancellation by contacting us at <a href="mailto:tinysilvercollection@gmail.com">tinysilvercollection@gmail.com</a> as soon as possible. Cancellation requests can be accepted only before the order has been shipped. Once dispatched, the order must follow the return process below.</p></section>
        <section><h2>2. Returns and eligibility</h2><p>We accept return requests for unused, unworn jewellery in its original condition and packaging within 7 days of delivery. Items that are damaged after delivery, altered, worn or missing original packaging may not qualify for a refund.</p><p>To start a return, share your order number, reason for return and clear photographs with us. We will confirm the next steps after reviewing the request.</p></section>
        <section><h2>3. Refunds</h2><p>After an approved return is received and inspected, the refund will be processed to the original payment method. Refund timelines depend on the payment provider and bank. Original shipping charges and return shipping costs are non-refundable unless the item arrived damaged or we made an error.</p></section>
        <section><h2>4. Damaged or incorrect items</h2><p>Please contact us within 48 hours of delivery with your order number and photographs of the package and item. We will review the issue and, where applicable, arrange a replacement or refund.</p></section>
        <section><h2>5. Contact us</h2><p>For cancellation or refund support, email <a href="mailto:tinysilvercollection@gmail.com">tinysilvercollection@gmail.com</a> or call <a href="tel:+918247862319">+91 8247862319</a>.</p></section>
      </article>
      <style>{`article h2 { color: #0f172a; font-size: 1.25rem; font-weight: 600; } article p { color: #475569; font-size: 0.975rem; line-height: 1.8; margin-top: 1rem; } article a { color: #827e9c; text-decoration: underline; text-underline-offset: 3px; }`}</style>
    </div>
  );
}