import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import VerticalImageCarousel, {
  CarouselImage,
} from "@/components/Verticalimagecarousal";

// Example data — swap these src values for your own asset paths
// (e.g. images placed in /public and referenced as "/kumkum-box.webp").
const heroImages: CarouselImage[] = [
  {
    id: 1,
    src: "/silver-kumkumbox-2.5g-2.webp",
    alt: "Silver kumkum box, 2.5g",
  },
  {
    id: 2,
    src: "/butterfly-3g-2.webp",
    alt: "Sterling silver butterfly toe rings, 3g",
  },
  {
    id: 3,
    src: "/silver-coin-5g.webp",
    alt: "Silver Lakshmi coin, 5g",
  },
];

export default function HeroSection() {
  return (
    <section className="max-w-7xl mx-auto relative overflow-visible bg-[#0f172a]">
      <div className="px-4 sm:px-6 lg:px-16 py-8 sm:py-10 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 items-center">
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

          <div className="order-1 lg:order-2 flex justify-center">
            <VerticalImageCarousel
              images={heroImages}
              autoPlay={true}
              interval={3500}
            />
          </div>
        </div>
      </div>
    </section>
  );
}