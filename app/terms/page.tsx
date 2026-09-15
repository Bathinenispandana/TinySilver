import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions | Tiny Silver Collection",
  description:
    "Read the terms that apply when you use the Tiny Silver Collection website and shop our silver jewellery.",
};

const sections = [
  { id: "acceptance", label: "Acceptance of terms" },
  { id: "products-orders", label: "Products and orders" },
  { id: "pricing-payment", label: "Pricing and payment" },
  { id: "shipping-returns", label: "Shipping and returns" },
  { id: "account", label: "Accounts and security" },
  { id: "intellectual-property", label: "Our content" },
  { id: "liability", label: "Liability" },
  { id: "contact", label: "Contact us" },
];

export default function TermsPage() {
  return (
    <div className="bg-[#f8fafc]">
      <section className="border-b border-[#e2e8f0] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#64748b] transition-colors hover:text-[#0f172a]"><ArrowLeft className="h-4 w-4" /> Back to Tiny Silver</Link>
          <div className="mt-10 max-w-3xl">
            <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#827e9c]"><FileText className="h-5 w-5" /> Shopping with confidence</div>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-[#0f172a] sm:text-5xl">Terms &amp; Conditions</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#64748b]">These terms explain the rules for using the Tiny Silver Collection website and purchasing our handcrafted 925 sterling silver jewellery.</p>
            <p className="mt-6 text-sm text-[#94a3b8]">Last updated: September 15, 2026</p>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:px-8 lg:py-16">
        <aside className="lg:sticky lg:top-8 lg:self-start"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#94a3b8]">On this page</p><nav aria-label="Terms sections" className="mt-4 border-l border-[#cbd5e1]">{sections.map((section) => <a key={section.id} href={`#${section.id}`} className="block border-l-2 border-transparent px-4 py-2 text-sm leading-5 text-[#64748b] transition-colors hover:border-[#827e9c] hover:text-[#0f172a]">{section.label}</a>)}</nav></aside>

        <article className="max-w-3xl space-y-12 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#e2e8f0] sm:p-10">
          <section id="acceptance"><h2>1. Acceptance of terms</h2><p>By accessing or using tinysilvercollection.com, you agree to these Terms &amp; Conditions and our <Link href="/privacy-policy">Privacy Policy</Link>. If you do not agree, please do not use the website. We may update these terms from time to time by posting a revised version here.</p></section>
          <section id="products-orders"><h2>2. Products and orders</h2><p>We aim to display product descriptions, images, dimensions, weights and availability as accurately as possible. Because jewellery is photographed and finished individually, colours and minor details may vary slightly from what appears on your screen.</p><p>Submitting an order is an offer to purchase. An order is accepted when we confirm it and successfully receive or authorise payment. We may decline or cancel an order if an item is unavailable, a listing contains an error, payment cannot be verified, or we suspect fraudulent or unauthorised activity. If we cancel a paid order, we will arrange a refund for the cancelled portion.</p></section>
          <section id="pricing-payment"><h2>3. Pricing and payment</h2><p>Prices are shown in Indian Rupees unless stated otherwise. Product prices, offers, taxes and delivery charges may change before an order is placed. The total payable amount shown at checkout is the amount applicable to your order.</p><p>Payments are processed through the payment methods made available at checkout. You confirm that you are authorised to use the selected payment method and that the information provided is accurate.</p></section>
          <section id="shipping-returns"><h2>4. Shipping and returns</h2><p>Delivery estimates are provided for guidance and may vary based on destination, courier capacity, weather, public holidays and other events outside our control. Please ensure your delivery details and phone number are correct before placing an order.</p><p>Returns, exchanges, damaged-item claims and delivery issues are handled according to the applicable policy communicated with your order. Please contact us promptly at <a href="mailto:tinysilvercollection@gmail.com">tinysilvercollection@gmail.com</a> with your order number and relevant photographs so we can review the issue.</p></section>
          <section id="account"><h2>5. Accounts and security</h2><p>You are responsible for keeping your account credentials confidential and for activity under your account. Please notify us if you suspect unauthorised access. You may not use the website to impersonate another person, interfere with its operation, attempt unauthorised access, or place fraudulent orders.</p></section>
          <section id="intellectual-property"><h2>6. Our content</h2><p>All website content, including product photography, logos, copy, graphics, page designs and code, belongs to Tiny Silver Collection or the relevant rights holder. You may view and use the site for personal, non-commercial shopping purposes. You may not reproduce, modify, distribute, scrape or commercially exploit our content without written permission.</p></section>
          <section id="liability"><h2>7. Liability</h2><p>We provide the website and its content on an available basis. To the extent permitted by law, Tiny Silver Collection is not responsible for indirect, incidental or consequential loss arising from use of the website, delays beyond our reasonable control, or reliance on information that may contain errors.</p><p>Nothing in these terms limits any consumer right or liability that cannot legally be excluded under applicable law. These terms are governed by the laws applicable in India, and disputes will be subject to the jurisdiction of the courts in Hyderabad, Telangana.</p></section>
          <section id="contact"><h2>8. Contact us</h2><p>For questions about an order or these terms, email <a href="mailto:tinysilvercollection@gmail.com">tinysilvercollection@gmail.com</a> or call <a href="tel:+918247862319">+91 8247862319</a>. Tiny Silver Collection is based in Hyderabad, Telangana, India.</p></section>
          <p className="border-t border-[#e2e8f0] pt-6 text-sm text-[#94a3b8]">These pages are provided as general website terms and privacy information. Consider having them reviewed for your specific business and legal requirements.</p>
        </article>
      </div>

      <style>{`article h2 { color: #0f172a; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.01em; } article p { color: #475569; font-size: 0.975rem; line-height: 1.8; margin-top: 1rem; } article a { color: #827e9c; text-decoration: underline; text-underline-offset: 3px; }`}</style>
    </div>
  );
}
