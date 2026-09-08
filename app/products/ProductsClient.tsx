"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { Product } from "@/lib/products";
import SearchBar from "@/components/SearchBar";
import SortDropdown, { SortOption, sortProducts } from "@/components/SortDropdown";
import FilterSidebar, {
  FilterState,
  defaultFilters,
  applyFilters,
} from "@/components/FilterSidebar";
import ProductGrid from "@/components/ProductGrid";

interface ProductsClientProps {
  allProducts: Product[];
  title: string;
  description: string;
}

export default function ProductsClient({
  allProducts,
  title,
  description,
}: ProductsClientProps) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [sort, setSort] = useState<SortOption>(
    (searchParams.get("sort") as SortOption) ?? "featured"
  );
  const [filters, setFilters] = useState<FilterState>(() => {
    const category = searchParams.get("category");
    return category
      ? { ...defaultFilters, categories: [category] }
      : defaultFilters;
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = applyFilters(allProducts, filters);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.collection.toLowerCase().includes(q)
      );
    }
    return sortProducts(result, sort);
  }, [allProducts, filters, query, sort]);

  const activeFilterCount =
    filters.categories.length +
    filters.collections.length +
    filters.materials.length +
    (filters.inStockOnly ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.maxPrice < defaultFilters.maxPrice ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="max-w-2xl">
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#0f172a]">
          {title}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[#827e9c]">
          {description}
        </p>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
        <SearchBar value={query} onChange={setQuery} className="sm:max-w-sm" />
        <div className="flex items-center gap-3 sm:ml-auto">
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden inline-flex items-center gap-2 rounded-full border border-[#c5c6cc] px-4 py-2.5 text-sm font-medium text-[#0f172a] hover:bg-[#c5c6cc]/30 transition-all duration-300"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#0f172a] text-[10px] text-white">
                {activeFilterCount}
              </span>
            )}
          </button>
          <SortDropdown value={sort} onChange={setSort} />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10">
        <aside className="hidden lg:block">
          <FilterSidebar filters={filters} onChange={setFilters} />
        </aside>

        <div>
          <p className="mb-5 text-xs text-[#827e9c]">
            {filteredProducts.length} product
            {filteredProducts.length !== 1 ? "s" : ""}
          </p>
          <ProductGrid products={filteredProducts} />
        </div>
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <button
            aria-label="Close filters"
            onClick={() => setMobileFiltersOpen(false)}
            className="absolute inset-0 bg-[#0f172a]/50 backdrop-blur-sm animate-fade-in"
          />
          <div className="animate-drawer-in absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-xl overflow-y-auto">
            <div className="flex items-center justify-between px-5 py-5 border-b border-[#c5c6cc] sticky top-0 bg-white">
              <span className="text-sm font-semibold text-[#0f172a]">
                Filters
              </span>
              <button
                aria-label="Close filters"
                onClick={() => setMobileFiltersOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#c5c6cc]/30 transition-all duration-300"
              >
                <X className="h-5 w-5 text-[#0f172a]" />
              </button>
            </div>
            <div className="px-5 py-5">
              <FilterSidebar filters={filters} onChange={setFilters} />
            </div>
            <div className="sticky bottom-0 bg-white border-t border-[#c5c6cc] p-4">
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full rounded-full bg-[#0f172a] text-white text-sm font-medium py-3 hover:bg-[#827e9c] transition-all duration-300"
              >
                Show {filteredProducts.length} Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
