import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Truck } from "lucide-react";

export const metadata: Metadata = {
  title: "Shipping & Delivery Policy | Tiny Silver Collection",
  description:
    "Learn about Tiny Silver Collection's shipping timelines, delivery process and address requirements.",
};

const sections = [
  { id: "processing", label: "Processing time" },
  { id: "delivery", label: "Delivery timelines" },
  { id: "charges", label: "Shipping charges" },
  { id: "address", label: "Delivery details" },
  { id: "issues", label: "Delivery issues" },
];

export default function ShippingDeliveryPolicyPage() {
  return (
    <div className="bg-[#f8fafc]">
      <section className="border-b border-[#e2e8f0] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#64748b] transition-colors hover:text-[#0f172a]"><ArrowLeft className="h-4 w-4" /> Back to Tiny Silver</Link>
          <div className="mt-10 max-w-3xl">
            <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#827e9c]"><Truck className="h-5 w-5" /> Delivered with care</div>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-[#0f172a] sm:text-5xl">Shipping &amp; Delivery Policy</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#64748b]">Everything you need to know about how we prepare, ship and deliver your Tiny Silver Collection order.</p>
            <p className="mt-6 text-sm text-[#94a3b8]">Last updated: September 15, 2026</p>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:px-8 lg:py-16">
        <aside className="lg:sticky lg:top-32 lg:self-start"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#94a3b8]">On this page</p><nav aria-label="Shipping and delivery sections" className="mt-4 border-l border-[#cbd5e1]">{sections.map((section) => <a key={section.id} href={`#${section.id}`} className="block border-l-2 border-transparent px-4 py-2 text-sm leading-5 text-[#64748b] transition-colors hover:border-[#827e9c] hover:text-[#0f172a]">{section.label}</a>)}</nav></aside>
        <article className="max-w-3xl space-y-12 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#e2e8f0] sm:p-10">
          <section id="processing"><h2>1. Processing time</h2><p>Orders are usually packed and dispatched within 2–4 business days after payment is confirmed. Orders placed on weekends or public holidays begin processing on the next business day. We will share tracking details when your order is handed to the courier.</p></section>
          <section id="delivery"><h2>2. Delivery timelines</h2><p>Most orders within India arrive within 3–7 business days after dispatch. Timelines are estimates and may vary by destination, courier capacity, weather, public holidays and other events outside our control.</p></section>
          <section id="charges"><h2>3. Shipping charges</h2><p>Any applicable shipping charge is shown clearly at checkout before you place your order. Offers for free or discounted delivery may have destination, order-value or promotional conditions.</p></section>
          <section id="address"><h2>4. Delivery details</h2><p>Please provide a complete address, accurate pincode and reachable phone number. We are not responsible for delays or failed delivery caused by incorrect or incomplete information. If a parcel is returned because delivery could not be completed, additional shipping charges may apply for re-dispatch.</p></section>
          <section id="issues"><h2>5. Delivery issues</h2><p>If tracking shows delivered but you have not received the parcel, or if it arrives damaged, contact us within 48 hours at <a href="mailto:tinysilvercollection@gmail.com">tinysilvercollection@gmail.com</a> with your order number and photographs where relevant. We will work with the courier to investigate and resolve the issue.</p></section>
        </article>
      </div>
      <style>{`article h2 { color: #0f172a; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.01em; } article p { color: #475569; font-size: 0.975rem; line-height: 1.8; margin-top: 1rem; } article a { color: #827e9c; text-decoration: underline; text-underline-offset: 3px; }`}</style>
    </div>
  );
}
