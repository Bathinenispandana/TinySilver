import Image from "next/image";
import Link from "next/link";
import Category from "@/components/Category";
import Arrivals from "@/components/Arrivals";
import BestSellers from "@/components/BestSellers";
import CollectionItems from "@/components/CollectionItems";
import HeroSection from "@/components/HeroSection";
import { ArrowRight } from "lucide-react";
import { products } from "@/lib/products";
import { categories } from "@/lib/categories";
import { collections } from "@/lib/collections";
import ProductCard from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";
import CollectionCard from "@/components/CollectionCard";
import DeliveryLocation from "@/components/DeliveryLocation";

export default function Home() {
  const featuredCollections = collections.slice(0, 3);

  return (
    <div>
      {/* HERO */}
      <HeroSection />
      {/* <section className="relative overflow-hidden bg-[#f7f7f8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="animate-fade-in-up order-2 lg:order-1">
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[#827e9c]">
                925 Sterling Silver
              </span>
              <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] text-[#0f172a]">
                Timeless Silver.
                <br />
                Modern Elegance.
              </h1>
              <p className="mt-5 max-w-md text-base sm:text-lg text-[#827e9c] leading-relaxed">
                Discover handcrafted silver ornaments designed to become part
                of your story.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 rounded-full bg-[#0f172a] text-white text-sm font-medium px-7 py-3.5 hover:bg-[#827e9c] transition-all duration-300"
                >
                  Shop Collection
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/new-arrivals"
                  className="inline-flex items-center gap-2 rounded-full border border-[#c5c6cc] text-[#0f172a] text-sm font-medium px-7 py-3.5 hover:bg-[#c5c6cc]/30 transition-all duration-300"
                >
                  Explore New Arrivals
                </Link>
              </div>
            </div>

            <div className="order-1 lg:order-2 animate-fade-in">
              <div className="relative aspect-[4/5] w-full max-w-md mx-auto overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1200&q=85&auto=format&fit=crop"
                  alt="Premium silver jewellery"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <Category />
      <Arrivals />
      <BestSellers />

      {/* COLLECTIONS */}
      <CollectionItems />
      {/* <DeliveryLocation /> */}
    </div>
  );
}
 