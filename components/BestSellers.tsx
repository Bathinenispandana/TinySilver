import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { products } from '@/lib/products'
import ProductCard from '@/components/ProductCard'  

export default function BestSellers() {
    const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 6);


  return (
    <section className="max-w-7xl bg-[#0f172a] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#e8e8e8]">
              Best Sellers
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#827e9c]">
              The pieces our customers keep coming back for.
            </p>
          </div>
          <Link
            href="/products?sort=rating"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-[#e8e8e8]/40 hover:text-[#827e9c] transition-colors duration-300"
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
  )
}
