import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="max-w-7xl mx-auto relative overflow-hidden">
      <div className="relative w-full min-h-[350px] sm:min-h-[400px] lg:min-h-[450px]">

        {/* Banner */}
        <Image
          src="/banner.png"
          alt="925 Sterling Silver Collection"
          fill
          priority
          className="object-cover"
          sizes="w-full"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Text Content - Left Side */}
        <div className="absolute inset-0 flex items-center">
          <div className="px-6 sm:px-10 lg:px-16 max-w-2xl">

            <span className="inline-block text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#25314d]">
              925 Sterling Silver
            </span>

            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.08] text-[#25314d]">
              Timeless Silver.
              <br />
              Modern Elegance.
            </h1>

            <p className="mt-4 max-w-md text-sm sm:text-base text-[#25314d] leading-relaxed">
              Discover handcrafted silver ornaments designed to become part of
              your story.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-full bg-[#25314d] text-white text-xs sm:text-sm font-medium px-5 sm:px-6 py-3 hover:bg-[#827e9c] transition-all duration-300"
              >
                Shop Collection
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/new-arrivals"
                className="inline-flex items-center gap-2 rounded-full border border-[#25314d]/60 text-[#25314d] bg-white text-xs sm:text-sm font-medium px-5 sm:px-6 py-3 hover:bg-white/20 transition-all duration-300"
              >
                Explore New Arrivals
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}