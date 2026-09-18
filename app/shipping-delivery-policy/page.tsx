import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Truck } from "lucide-react";

export const metadata: Metadata = {
  title: "Shipping & Delivery Policy | Tiny Silver Collection",
  description: "Learn about shipping areas, timelines and delivery at Tiny Silver Collection.",
};

export default function ShippingDeliveryPolicyPage() {
  return (
    <div className="bg-[#f8fafc]">
      <section className="border-b border-[#e2e8f0] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#64748b] transition-colors hover:text-[#0f172a]"><ArrowLeft className="h-4 w-4" /> Back to Tiny Silver</Link>
          <div className="mt-10 max-w-3xl">
            <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#827e9c]"><Truck className="h-5 w-5" /> Delivery information</div>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-[#0f172a] sm:text-5xl">Shipping &amp; Delivery Policy</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#64748b]">Everything you need to know about delivery from Tiny Silver Collection.</p>
            <p className="mt-6 text-sm text-[#94a3b8]">Last updated: September 15, 2026</p>
          </div>
        </div>
      </section>
      <article className="mx-auto max-w-3xl space-y-10 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <section><h2>1. Delivery areas</h2><p>We currently deliver to serviceable addresses in Telangana and Andhra Pradesh. Enter your pincode at checkout or contact us if you need help confirming delivery availability.</p></section>
        <section><h2>2. Processing and delivery times</h2><p>Orders are generally processed within 1–3 business days after payment confirmation. Delivery usually takes 3–7 business days after dispatch, depending on the destination and courier service.</p><p>Estimated dates are guidance only. Delays may occur because of weather, public holidays, courier capacity, incorrect address details or events outside our reasonable control.</p></section>
        <section><h2>3. Shipping charges</h2><p>Any applicable delivery charge will be shown clearly at checkout before you place your order. The total shown at checkout is the amount payable for your order.</p></section>
        <section><h2>4. Delivery requirements</h2><p>Please provide a complete address and an active phone number. Someone should be available to receive the parcel. If a delivery attempt fails because the address is incorrect or nobody is available, additional delivery arrangements or charges may apply.</p></section>
        <section><h2>5. Delivery issues</h2><p>If your parcel arrives damaged, appears tampered with or has not arrived within the expected window, contact us promptly at <a href="mailto:tinysilvercollection@gmail.com">tinysilvercollection@gmail.com</a> with your order number and photographs where relevant.</p></section>
      </article>
      <style>{`article h2 { color: #0f172a; font-size: 1.25rem; font-weight: 600; } article p { color: #475569; font-size: 0.975rem; line-height: 1.8; margin-top: 1rem; } article a { color: #827e9c; text-decoration: underline; text-underline-offset: 3px; }`}</style>
    </div>
  );
}
