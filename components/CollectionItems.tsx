import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { collections } from '@/lib/collections'
import CollectionCard from '@/components/CollectionCard'

export default function CollectionItems() {
  return (
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
            {collections.map((collection) => (
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
  )
}