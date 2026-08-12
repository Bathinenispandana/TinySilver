import Link from "next/link";
import { Camera, Users, MapPin } from "lucide-react";

const SHOP_LINKS = [
  { href: "/products", label: "All Products" },
  { href: "/new-arrivals", label: "New Arrivals" },
  { href: "/products?sort=rating", label: "Best Sellers" },
  { href: "/collections", label: "Collections" },
];

const CARE_LINKS = [
  { href: "/account", label: "Contact Us" },
  { href: "/account", label: "Shipping" },
  { href: "/account", label: "Returns" },
  { href: "/account", label: "FAQs" },
];

const COMPANY_LINKS = [
  { href: "/", label: "About Us" },
  { href: "/", label: "Our Story" },
  { href: "/", label: "Careers" },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-white/90">
        {title}
      </h4>
      <ul className="mt-4 flex flex-col gap-2.5">
        {links.map((link, i) => (
          <li key={`${link.label}-${i}`}>
            <Link
              href={link.href}
              className="text-sm text-[#c5c6cc] hover:text-white transition-colors duration-300"
            >
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
    <footer className="bg-[#0f172a] mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          <div className="col-span-2 md:col-span-2">
            <span className="text-xl font-semibold tracking-[0.15em] text-white">
              SILVERAZ
            </span>
            <p className="mt-4 max-w-xs text-sm text-[#c5c6cc] leading-relaxed">
              Handcrafted 925 silver ornaments designed to become part of
              your story. Timeless silver, modern elegance.
            </p>
            <div className="mt-5 flex items-center gap-2 text-sm text-[#c5c6cc]">
              <MapPin className="h-4 w-4 shrink-0" />
              Crafted in India, worn worldwide
            </div>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 hover:border-white/60 transition-all duration-300"
              >
                <Camera className="h-4 w-4 text-white" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 hover:border-white/60 transition-all duration-300"
              >
                <Users className="h-4 w-4 text-white" />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pinterest"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 hover:border-white/60 transition-all duration-300"
              >
                <span className="text-white text-xs font-bold">P</span>
              </a>
            </div>
          </div>

          <FooterColumn title="Shop" links={SHOP_LINKS} />
          <FooterColumn title="Customer Care" links={CARE_LINKS} />
          <FooterColumn title="Company" links={COMPANY_LINKS} />
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#c5c6cc]">
            © 2026 Silver Jewellery. All Rights Reserved.
          </p>
          <p className="text-xs text-[#c5c6cc]">
            925 Sterling Silver · Crafted with Care
          </p>
        </div>
      </div>
    </footer>
  );
}
