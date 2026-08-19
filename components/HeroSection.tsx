import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#0f172a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="animate-fade-in-up order-2 lg:order-1">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[#e8e8e8]/40">
              925 Sterling Silver
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] text-[#e8e8e8]">
              Timeless Silver.
              <br />
              Modern Elegance.
            </h1>
            <p className="mt-5 max-w-md text-base sm:text-lg text-[#e8e8e8]/40 leading-relaxed">
              Discover handcrafted silver ornaments designed to become part of
              your story.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-full bg-[#e8e8e8] text-[#0f172a] text-sm font-medium px-7 py-3.5 hover:bg-[#827e9c] transition-all duration-300"
              >
                Shop Collection
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/new-arrivals"
                className="inline-flex items-center gap-2 rounded-full border border-[#c5c6cc] text-[#e8e8e8] text-sm font-medium px-7 py-3.5 hover:bg-[#c5c6cc]/30 transition-all duration-300"
              >
                Explore New Arrivals
              </Link>
            </div>
          </div>

          <div className="order-1 lg:order-2 animate-fade-in">
            <div className="w-full max-w-[280px] mx-auto overflow-hidden rounded-2xl">
              <Image
                src="/silver-kumkumbox-5g-1.webp"
                alt="Premium silver jewellery"
                width={600}
                height={750}
                priority
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
