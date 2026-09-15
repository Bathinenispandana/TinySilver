import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Tiny Silver Collection",
  description:
    "Learn how Tiny Silver Collection collects, uses, stores and protects your personal information.",
};

const sections = [
  { id: "information-we-collect", label: "Information we collect" },
  { id: "how-we-use-information", label: "How we use information" },
  { id: "sharing-information", label: "When we share information" },
  { id: "cookies", label: "Cookies and similar tools" },
  { id: "data-security", label: "Data security and retention" },
  { id: "your-rights", label: "Your choices and rights" },
  { id: "children", label: "Children's privacy" },
  { id: "contact", label: "Contact us" },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#f8fafc]">
      <section className="border-b border-[#e2e8f0] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#64748b] transition-colors hover:text-[#0f172a]">
            <ArrowLeft className="h-4 w-4" /> Back to Tiny Silver
          </Link>
          <div className="mt-10 max-w-3xl">
            <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#827e9c]">
              <ShieldCheck className="h-5 w-5" /> Your privacy matters
            </div>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-[#0f172a] sm:text-5xl">Privacy Policy</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#64748b]">
              This policy explains how Tiny Silver Collection collects and uses information when you browse our website, create an account, or shop for handcrafted 925 sterling silver jewellery.
            </p>
            <p className="mt-6 text-sm text-[#94a3b8]">Last updated: September 15, 2026</p>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:px-8 lg:py-16">
        <aside className="lg:sticky lg:top-8 lg:self-start">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#94a3b8]">On this page</p>
          <nav aria-label="Privacy policy sections" className="mt-4 border-l border-[#cbd5e1]">
            {sections.map((section) => (
              <a key={section.id} href={`#${section.id}`} className="block border-l-2 border-transparent px-4 py-2 text-sm leading-5 text-[#64748b] transition-colors hover:border-[#827e9c] hover:text-[#0f172a]">
                {section.label}
              </a>
            ))}
          </nav>
        </aside>

        <article className="max-w-3xl space-y-12 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#e2e8f0] sm:p-10">
          <section id="information-we-collect"><h2>1. Information we collect</h2><p>We collect information you choose to provide, such as your name, email address, phone number, delivery address, billing details and account credentials when you place an order, create an account, save an address, contact us or join a product update list.</p><p>We also receive limited technical information when you use the site, including your IP address, device and browser type, pages viewed, approximate location and interaction data. This helps us keep the website secure and improve your shopping experience.</p></section>
          <section id="how-we-use-information"><h2>2. How we use information</h2><p>Tiny Silver Collection uses personal information to process and deliver orders, provide customer support, manage accounts and wishlists, confirm payments, communicate about purchases, prevent fraud and maintain the website.</p><p>Where permitted by law, we may also send helpful updates about new arrivals or collections. You can unsubscribe from promotional messages at any time by following the link in the message or contacting us.</p></section>
          <section id="sharing-information"><h2>3. When we share information</h2><p>We do not sell your personal information. We share only the information needed with trusted service providers who help us operate the business, including payment processors, delivery partners, hosting providers, analytics services and customer-support tools.</p><p>These providers may process information only to perform services for us and are expected to protect it. We may also disclose information when required by law, to enforce our terms, or to protect the rights, safety and security of Tiny Silver Collection, our customers or others.</p></section>
          <section id="cookies"><h2>4. Cookies and similar tools</h2><p>Our website may use cookies or similar technologies to remember preferences, keep your cart and account experience working, understand site traffic and help protect against misuse. You can adjust cookie settings through your browser, although some shopping features may not work as intended if cookies are disabled.</p></section>
          <section id="data-security"><h2>5. Data security and retention</h2><p>We use reasonable administrative, technical and organisational safeguards to protect personal information. No online service can guarantee absolute security, so please use a strong password and let us know promptly if you believe your account has been accessed without permission.</p><p>We retain information for as long as needed to provide services, complete transactions, meet legal and accounting obligations, resolve disputes and enforce our agreements. When it is no longer needed, we securely delete or anonymise it where practical.</p></section>
          <section id="your-rights"><h2>6. Your choices and rights</h2><p>Depending on where you live, you may have the right to request access to, correction of, deletion of or a copy of your personal information. You may also object to or restrict certain processing and withdraw consent where processing is based on consent.</p><p>To make a request, email <a href="mailto:tinysilvercollection@gmail.com">tinysilvercollection@gmail.com</a>. We may need to verify your identity before completing a request.</p></section>
          <section id="children"><h2>7. Children&apos;s privacy</h2><p>Our website is intended for adults and is not directed to children under 13. We do not knowingly collect personal information from children. If you believe a child has provided us information, please contact us so we can remove it.</p></section>
          <section id="contact"><h2>8. Contact us</h2><p>If you have questions about this policy or how your information is handled, contact Tiny Silver Collection at <a href="mailto:tinysilvercollection@gmail.com">tinysilvercollection@gmail.com</a> or <a href="tel:+918247862319">+91 8247862319</a>. We are based in Hyderabad, Telangana, India.</p></section>
          <p className="border-t border-[#e2e8f0] pt-6 text-sm text-[#94a3b8]">We may update this policy when our services or legal obligations change. The updated version will be posted on this page with a new revision date.</p>
        </article>
      </div>

      <style>{`article h2 { color: #0f172a; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.01em; } article p { color: #475569; font-size: 0.975rem; line-height: 1.8; margin-top: 1rem; } article a { color: #827e9c; text-decoration: underline; text-underline-offset: 3px; }`}</style>
    </div>
  );
}
