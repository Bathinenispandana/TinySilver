import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/lib/products";
import { categories } from "@/lib/categories";
import { collections } from "@/lib/collections";
import ProductCard from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";
import CollectionCard from "@/components/CollectionCard";

export default function Home() {
  const newArrivals = products.filter((p) => p.isNew).slice(0, 8);
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 6);
  const featuredCollections = collections.slice(0, 3);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#f7f7f8]">
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
      </section>

      {/* SHOP BY CATEGORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#0f172a]">
            Shop By Category
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#827e9c]">
            Explore every silhouette, from everyday staples to statement
            pieces.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="bg-[#f7f7f8] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#0f172a]">
                New Arrivals
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#827e9c]">
                Fresh designs. Timeless silver.
              </p>
            </div>
            <Link
              href="/new-arrivals"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-[#0f172a] hover:text-[#827e9c] transition-colors duration-300"
            >
              View All New Arrivals
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-10 text-center sm:hidden">
            <Link
              href="/new-arrivals"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0f172a] hover:text-[#827e9c] transition-colors duration-300"
            >
              View All New Arrivals
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#0f172a]">
              Best Sellers
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#827e9c]">
              The pieces our customers keep coming back for.
            </p>
          </div>
          <Link
            href="/products?sort=rating"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-[#0f172a] hover:text-[#827e9c] transition-colors duration-300"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* COLLECTIONS */}
      <section className="bg-[#f7f7f8] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#0f172a]">
              Collections
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#827e9c]">
              Curated edits for every occasion.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
            {featuredCollections.map((collection) => (
              <CollectionCard key={collection.slug} collection={collection} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 rounded-full border border-[#c5c6cc] text-[#0f172a] text-sm font-medium px-7 py-3.5 hover:bg-white transition-all duration-300"
            >
              View All Collections
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
