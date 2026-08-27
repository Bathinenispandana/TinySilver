import React from "react";

import { categories } from "@/lib/categories";
import CategoryCard from "@/components/CategoryCard";


export default function Category() {
  return (
    <section className="max-w-7xl mx-auto px-4 bg-[#e8e8e8] sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="text-center max-w-xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#0f172a]">
          Shop By Category
        </h2>
        <p className="mt-2 text-sm sm:text-base text-[#0f172a]/60">
          Explore every silhouette, from everyday staples to statement pieces.
        </p>
      </div>
      <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.slug} category={category} />
        ))}
      </div>
    </section>
  );
}
