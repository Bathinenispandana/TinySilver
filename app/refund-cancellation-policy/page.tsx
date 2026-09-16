import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, RotateCcw } from "lucide-react";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | Tiny Silver Collection",
  description:
    "Review Tiny Silver Collection's order cancellation, return and refund policy.",
};

const sections = [
  { id: "cancellation", label: "Order cancellations" },
  { id: "returns", label: "Returns and exchanges" },
  { id: "damaged", label: "Damaged or incorrect items" },
  { id: "refunds", label: "Refunds" },
  { id: "contact", label: "Contact us" },
];

export default function RefundCancellationPolicyPage() {
  return (
    <div className="bg-[#f8fafc]">
      <section className="border-b border-[#e2e8f0] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#64748b] transition-colors hover:text-[#0f172a]"><ArrowLeft className="h-4 w-4" /> Back to Tiny Silver</Link>
          <div className="mt-10 max-w-3xl">
            <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#827e9c]"><RotateCcw className="h-5 w-5" /> Simple, transparent shopping</div>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-[#0f172a] sm:text-5xl">Refund &amp; Cancellation Policy</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#64748b]">Our policy for cancelling orders, returning jewellery and receiving refunds from Tiny Silver Collection.</p>
            <p className="mt-6 text-sm text-[#94a3b8]">Last updated: September 15, 2026</p>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:px-8 lg:py-16">
        <aside className="lg:sticky lg:top-32 lg:self-start"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#94a3b8]">On this page</p><nav aria-label="Refund and cancellation sections" className="mt-4 border-l border-[#cbd5e1]">{sections.map((section) => <a key={section.id} href={`#${section.id}`} className="block border-l-2 border-transparent px-4 py-2 text-sm leading-5 text-[#64748b] transition-colors hover:border-[#827e9c] hover:text-[#0f172a]">{section.label}</a>)}</nav></aside>
        <article className="max-w-3xl space-y-12 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#e2e8f0] sm:p-10">
          <section id="cancellation"><h2>1. Order cancellations</h2><p>You may request cancellation by emailing <a href="mailto:tinysilvercollection@gmail.com">tinysilvercollection@gmail.com</a> as soon as possible with your order number. We can cancel an order only before it has been dispatched. Once dispatched, it must follow the return process below.</p></section>
          <section id="returns"><h2>2. Returns and exchanges</h2><p>We accept return or exchange requests within 7 days of delivery for unused jewellery in its original condition, packaging and with all tags or certificates included. Items that have been worn, altered, engraved or damaged after delivery are not eligible unless the issue was caused by us.</p><p>Return shipping is the customer's responsibility unless the item is defective, damaged in transit or incorrect. Please contact us before sending anything back so we can provide the applicable instructions.</p></section>
          <section id="damaged"><h2>3. Damaged or incorrect items</h2><p>Inspect your order when it arrives and contact us within 48 hours if it is damaged, defective or not what you ordered. Include your order number and clear photographs of the item, packaging and shipping label. We will review the claim and arrange a replacement, exchange or refund where appropriate.</p></section>
          <section id="refunds"><h2>4. Refunds</h2><p>Approved refunds are issued to the original payment method after the returned item is received and inspected. Payment providers may take additional time to reflect the refund in your account. Original delivery charges are non-refundable unless the order was cancelled by us or the issue was caused by us.</p></section>
          <section id="contact"><h2>5. Contact us</h2><p>For cancellation, return or refund support, email <a href="mailto:tinysilvercollection@gmail.com">tinysilvercollection@gmail.com</a> or call <a href="tel:+918247862319">+91 8247862319</a>. Please include your order number so we can help promptly.</p></section>
        </article>
      </div>
      <style>{`article h2 { color: #0f172a; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.01em; } article p { color: #475569; font-size: 0.975rem; line-height: 1.8; margin-top: 1rem; } article a { color: #827e9c; text-decoration: underline; text-underline-offset: 3px; }`}</style>
    </div>
  );
}
