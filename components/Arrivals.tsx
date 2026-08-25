import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { products } from '@/lib/products'
import ProductCard from '@/components/ProductCard'

export default function Arrivals() {

  const Arrivals = products.filter((p) => p.isNew).slice(0, 8);

  return (
    <section className="max-w-7xl mx-auto bg-[#0f172a] py-16 sm:py-20">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#e8e8e8]">
                New Arrivals
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#e8e8e8]/40">
                Fresh designs. Timeless silver.
              </p>
            </div>
            <Link
              href="/new-arrivals"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-[#e8e8e8]/40 hover:text-[#827e9c] transition-colors duration-300"
            >
              View All New Arrivals
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10">
            {Arrivals.map((product) => (
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
  )
}

