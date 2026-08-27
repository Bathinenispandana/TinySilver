import Link from "next/link";
import Image from "next/image";
import { MapPin, Mail, Phone } from "lucide-react";

const SHOP_LINKS = [
  { href: "/products", label: "All Jewellery" },
  { href: "/new-arrivals", label: "New Arrivals" },
  { href: "/products?sort=rating", label: "Best Sellers" },
  { href: "/collections", label: "Collections" },
];

// const CARE_LINKS = [
//   { href: "/contact", label: "Contact Us" },
//   { href: "/shipping", label: "Shipping & Delivery" },
//   { href: "/returns", label: "Returns & Exchanges" },
//   { href: "/faqs", label: "Frequently Asked Questions" },
// ];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
        {title}
      </h4>

      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="group inline-flex items-center text-sm text-slate-400 transition-colors duration-300 hover:text-white"
            >
              <span className="h-px w-0 bg-white transition-all duration-300 group-hover:mr-2 group-hover:w-3" />
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="mt-16 overflow-hidden bg-[#081426] text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-20 lg:grid-cols-12">
          {/* Brand Section */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="inline-block transition-opacity duration-300 hover:opacity-80"
            >
              <Image
                src="/tinysilver.webp"
                alt="Silver Jewellery"
                width={100}
                height={40}
                className="h-auto w-auto"
              />
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
              Discover beautifully handcrafted 925 sterling silver jewellery
              designed to celebrate your everyday moments and timeless memories.
            </p>

            
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 lg:col-span-8">
            {/* Shop */}
            <FooterColumn title="Shop" links={SHOP_LINKS} />

            {/* Customer Care */}
            {/* <FooterColumn title="Customer Care" links={CARE_LINKS} /> */}

            {/* Contact Us */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
                Contact Us
              </h4>

              <div className="mt-5 space-y-4">
                {/* Email */}
                <a
                  href="mailto:tinysilvercollection@gmail.com"
                  className="group flex items-start gap-3 text-sm text-slate-400 transition-colors duration-300 hover:text-white"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-slate-300 transition-colors duration-300 group-hover:text-white" />
                  <span className="break-all">
                    tinysilvercollection@gmail.com
                  </span>
                </a>

                {/* Phone */}
                <a
                  href="tel:+918247862319"
                  className="group flex items-center gap-3 text-sm text-slate-400 transition-colors duration-300 hover:text-white"
                >
                  <Phone className="h-4 w-4 shrink-0 text-slate-300 transition-colors duration-300 group-hover:text-white" />
                  <span>+91 8247862319</span>
                </a>

                {/* Location */}
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View location on Google Maps"
                  className="group flex items-start gap-3 text-sm leading-6 text-slate-400 transition-colors duration-300 hover:text-white"
                >
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-slate-300 transition-colors duration-300 group-hover:text-white" />
                  <span>Hyderabad, Telangana</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Tiny Silver Collection. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-slate-500 sm:justify-end">
            <Link
              href="/privacy-policy"
              className="transition-colors duration-300 hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="transition-colors duration-300 hover:text-white"
            >
              Terms & Conditions
            </Link>

            <span>925 Sterling Silver</span>
          </div>
        </div>
      </div>
    </footer>
  );
}