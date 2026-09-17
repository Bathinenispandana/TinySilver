import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Mail, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Tiny Silver Collection",
  description:
    "Learn how Tiny Silver Collection collects, uses, stores and protects your personal information.",
};

const sections = [
  {
    id: "information-we-collect",
    number: "01",
    label: "Information we collect",
    paragraphs: [
      "We collect information you choose to provide, such as your name, email address, phone number, delivery address, billing details and account credentials when you place an order, create an account, save an address, contact us or join a product update list.",
      "We also receive limited technical information when you use the site, including your IP address, device and browser type, pages viewed, approximate location and interaction data. This helps us keep the website secure and improve your shopping experience.",
    ],
  },
  {
    id: "how-we-use-information",
    number: "02",
    label: "How we use information",
    paragraphs: [
      "Tiny Silver Collection uses personal information to process and deliver orders, provide customer support, manage accounts and wishlists, confirm payments, communicate about purchases, prevent fraud and maintain the website.",
      "Where permitted by law, we may also send helpful updates about new arrivals or collections. You can unsubscribe from promotional messages at any time by following the link in the message or contacting us.",
    ],
  },
  {
    id: "sharing-information",
    number: "03",
    label: "When we share information",
    paragraphs: [
      "We do not sell your personal information. We share only the information needed with trusted service providers who help us operate the business, including payment processors, delivery partners, hosting providers, analytics services and customer-support tools.",
      "These providers may process information only to perform services for us and are expected to protect it. We may also disclose information when required by law, to enforce our terms, or to protect the rights, safety and security of Tiny Silver Collection, our customers or others.",
    ],
  },
  {
    id: "cookies",
    number: "04",
    label: "Cookies and similar tools",
    paragraphs: [
      "Our website may use cookies or similar technologies to remember preferences, keep your cart and account experience working, understand site traffic and help protect against misuse. You can adjust cookie settings through your browser, although some shopping features may not work as intended if cookies are disabled.",
    ],
  },
  {
    id: "data-security",
    number: "05",
    label: "Data security and retention",
    paragraphs: [
      "We use reasonable administrative, technical and organisational safeguards to protect personal information. No online service can guarantee absolute security, so please use a strong password and let us know promptly if you believe your account has been accessed without permission.",
      "We retain information for as long as needed to provide services, complete transactions, meet legal and accounting obligations, resolve disputes and enforce our agreements. When it is no longer needed, we securely delete or anonymise it where practical.",
    ],
  },
  {
    id: "your-rights",
    number: "06",
    label: "Your choices and rights",
    paragraphs: [
      "Depending on where you live, you may have the right to request access to, correction of, deletion of or a copy of your personal information. You may also object to or restrict certain processing and withdraw consent where processing is based on consent.",
    ],
    contact: true,
  },
  {
    id: "children",
    number: "07",
    label: "Children's privacy",
    paragraphs: [
      "Our website is intended for adults and is not directed to children under 13. We do not knowingly collect personal information from children. If you believe a child has provided us information, please contact us so we can remove it.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#fbfbfc]">
      {/* ================= HERO ================= */}

      <section className="border-b border-[#e9e9ee] bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-2 lg:py-24">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#827e9c] transition-colors duration-200 hover:text-[#0f172a]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Tiny Silver
          </Link>

          <div className="mt-12 max-w-2xl">
            <div className="flex items-center gap-2 text-sm font-medium text-[#827e9c]">
              <ShieldCheck className="h-4 w-4" />
              Your privacy matters
            </div>

            <h1 className="mt-4 font-serif text-[44px] leading-[1.1] text-[#0f172a] sm:text-5xl">
              Privacy Policy
            </h1>

            <p className="mt-6 text-[17px] leading-8 text-[#64748b]">
              This policy explains how Tiny Silver Collection collects and
              uses information when you browse our website, create an
              account, or shop for handcrafted 925 sterling silver jewellery.
            </p>

            <p className="mt-6 text-sm text-[#a3a3ae]">
              Last updated: September 15, 2026
            </p>
          </div>
        </div>
      </section>

      {/* ================= BODY ================= */}

      <div className="mx-auto grid max-w-6xl gap-16 px-6 py-16 lg:grid-cols-[200px_minmax(0,1fr)] lg:px-2 lg:py-20">
        {/* ================= TABLE OF CONTENTS ================= */}

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-xs font-medium text-[#a3a3ae]">On this page</p>

          <nav
            aria-label="Privacy policy sections"
            className="mt-4 flex flex-col gap-0.5 border-l border-[#e9e9ee]"
          >
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="group flex items-baseline gap-2.5 border-l-2 border-transparent py-1.5 pl-4 text-[13px] leading-5 text-[#827e9c] transition-colors duration-200 hover:border-[#0f172a] hover:text-[#0f172a]"
              >
                <span className="text-[11px] tabular-nums text-[#c3c2cf] group-hover:text-[#827e9c]">
                  {section.number}
                </span>
                {section.label}
              </a>
            ))}
            <a
              href="#contact"
              className="group flex items-baseline gap-2.5 border-l-2 border-transparent py-1.5 pl-4 text-[13px] leading-5 text-[#827e9c] transition-colors duration-200 hover:border-[#0f172a] hover:text-[#0f172a]"
            >
              <span className="text-[11px] tabular-nums text-[#c3c2cf] group-hover:text-[#827e9c]">
                08
              </span>
              Contact us
            </a>
          </nav>
        </aside>

        {/* ================= ARTICLE ================= */}

        <article className="max-w-2xl">
          {sections.map((section, i) => (
            <section
              key={section.id}
              id={section.id}
              className={`scroll-mt-28 ${
                i === 0 ? "" : "mt-10 border-t border-[#e9e9ee] pt-10"
              }`}
            >
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-sm text-[#c3c2cf]">
                  {section.number}
                </span>
                <h2 className="text-[19px] font-semibold tracking-[-0.01em] text-[#0f172a]">
                  {section.label}
                </h2>
              </div>

              <div className="mt-4 space-y-4 pl-[26px]">
                {section.paragraphs.map((p, j) => (
                  <p key={j} className="text-[15px] leading-[1.8] text-[#475569]">
                    {p}
                  </p>
                ))}

                {section.contact && (
                  <p className="text-[15px] leading-[1.8] text-[#475569]">
                    To make a request, email{" "}
                    <a
                      href="mailto:tinysilvercollection@gmail.com"
                      className="text-[#0f172a] underline decoration-[#c3c2cf] underline-offset-4 transition-colors hover:decoration-[#0f172a]"
                    >
                      tinysilvercollection@gmail.com
                    </a>
                    . We may need to verify your identity before completing a
                    request.
                  </p>
                )}
              </div>
            </section>
          ))}

          {/* ================= CONTACT ================= */}

          <section
            id="contact"
            className="scroll-mt-28 mt-10 border-t border-[#e9e9ee] pt-10"
          >
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-sm text-[#c3c2cf]">08</span>
              <h2 className="text-[19px] font-semibold tracking-[-0.01em] text-[#0f172a]">
                Contact us
              </h2>
            </div>

            <div className="mt-4 pl-[26px]">
              <p className="text-[15px] leading-[1.8] text-[#475569]">
                If you have questions about this policy or how your
                information is handled, reach out to Tiny Silver Collection.
                We are based in Hyderabad, Telangana, India.
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="mailto:tinysilvercollection@gmail.com"
                  className="inline-flex items-center gap-2 rounded-full border border-[#e9e9ee] px-4 py-2 text-sm text-[#0f172a] transition-colors duration-200 hover:bg-[#fafafc]"
                >
                  <Mail className="h-3.5 w-3.5 text-[#827e9c]" />
                  tinysilvercollection@gmail.com
                </a>

                <a
                  href="tel:+918247862319"
                  className="inline-flex items-center gap-2 rounded-full border border-[#e9e9ee] px-4 py-2 text-sm text-[#0f172a] transition-colors duration-200 hover:bg-[#fafafc]"
                >
                  <Phone className="h-3.5 w-3.5 text-[#827e9c]" />
                  +91 82478 62319
                </a>
              </div>
            </div>
          </section>

          <p className="mt-12 border-t border-[#e9e9ee] pt-6 text-sm leading-7 text-[#a3a3ae]">
            We may update this policy when our services or legal obligations
            change. The updated version will be posted on this page with a
            new revision date.
          </p>
        </article>
      </div>
    </div>
  );
}