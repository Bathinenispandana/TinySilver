"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { categories } from "@/lib/categories";
import { collections } from "@/lib/collections";
import { Product } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

export interface FilterState {
  categories: string[];
  collections: string[];
  maxPrice: number;
  materials: string[];
  inStockOnly: boolean;
  minRating: number;
}

export const defaultFilters: FilterState = {
  categories: [],
  collections: [],
  maxPrice: 15000,
  materials: [],
  inStockOnly: false,
  minRating: 0,
};

export function applyFilters(products: Product[], filters: FilterState) {
  return products.filter((p) => {
    if (
      filters.categories.length > 0 &&
      !filters.categories.includes(p.category)
    )
      return false;
    if (
      filters.collections.length > 0 &&
      !filters.collections.includes(p.collection)
    )
      return false;
    if (p.price > filters.maxPrice) return false;
    if (
      filters.materials.length > 0 &&
      !filters.materials.some((m) => p.material?.includes(m))
    )
      return false;
    if (filters.inStockOnly && !p.inStock) return false;
    if (filters.minRating > 0 && (p.rating ?? 0) < filters.minRating)
      return false;
    return true;
  });
}

const MATERIALS = [
  "925 Sterling Silver",
  "925 Oxidised Silver",
  "Kundan",
  "Pearl",
];

function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-[#c5c6cc] py-5 first:pt-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between text-left"
        aria-expanded={open}
      >
        <span className="text-xs font-semibold uppercase tracking-wider text-[#0f172a]">
          {title}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-[#827e9c] transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && <div className="mt-4 flex flex-col gap-3">{children}</div>}
    </div>
  );
}

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

export default function FilterSidebar({
  filters,
  onChange,
}: FilterSidebarProps) {
  const toggleArrayValue = (key: "categories" | "collections" | "materials", value: string) => {
    const current = filters[key];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onChange({ ...filters, [key]: next });
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-[#0f172a]">
          Filters
        </h3>
        <button
          type="button"
          onClick={() => onChange(defaultFilters)}
          className="text-xs text-[#827e9c] hover:text-[#0f172a] transition-colors duration-300"
        >
          Clear all
        </button>
      </div>

      <FilterSection title="Category">
        {categories.map((c) => (
          <label
            key={c.slug}
            className="flex items-center gap-2.5 text-sm text-[#0f172a] cursor-pointer"
          >
            <input
              type="checkbox"
              checked={filters.categories.includes(c.name)}
              onChange={() => toggleArrayValue("categories", c.name)}
              className="h-4 w-4 rounded border-[#c5c6cc] text-[#0f172a] accent-[#0f172a]"
            />
            {c.name}
          </label>
        ))}
      </FilterSection>

      <FilterSection title="Collection">
        {collections.map((c) => (
          <label
            key={c.slug}
            className="flex items-center gap-2.5 text-sm text-[#0f172a] cursor-pointer"
          >
            <input
              type="checkbox"
              checked={filters.collections.includes(c.name)}
              onChange={() => toggleArrayValue("collections", c.name)}
              className="h-4 w-4 rounded border-[#c5c6cc] text-[#0f172a] accent-[#0f172a]"
            />
            {c.name}
          </label>
        ))}
      </FilterSection>

      <FilterSection title="Price">
        <input
          type="range"
          min={500}
          max={15000}
          step={500}
          value={filters.maxPrice}
          onChange={(e) =>
            onChange({ ...filters, maxPrice: Number(e.target.value) })
          }
          className="w-full accent-[#0f172a]"
          aria-label="Maximum price"
        />
        <div className="flex justify-between text-xs text-[#827e9c]">
          <span>Up to</span>
          <span className="font-medium text-[#0f172a]">
            {formatPrice(filters.maxPrice)}
          </span>
        </div>
      </FilterSection>

      <FilterSection title="Material" defaultOpen={false}>
        {MATERIALS.map((m) => (
          <label
            key={m}
            className="flex items-center gap-2.5 text-sm text-[#0f172a] cursor-pointer"
          >
            <input
              type="checkbox"
              checked={filters.materials.includes(m)}
              onChange={() => toggleArrayValue("materials", m)}
              className="h-4 w-4 rounded border-[#c5c6cc] text-[#0f172a] accent-[#0f172a]"
            />
            {m}
          </label>
        ))}
      </FilterSection>

      <FilterSection title="Availability" defaultOpen={false}>
        <label className="flex items-center gap-2.5 text-sm text-[#0f172a] cursor-pointer">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={() =>
              onChange({ ...filters, inStockOnly: !filters.inStockOnly })
            }
            className="h-4 w-4 rounded border-[#c5c6cc] text-[#0f172a] accent-[#0f172a]"
          />
          In Stock Only
        </label>
      </FilterSection>

      <FilterSection title="Rating" defaultOpen={false}>
        {[4, 3, 2].map((r) => (
          <label
            key={r}
            className="flex items-center gap-2.5 text-sm text-[#0f172a] cursor-pointer"
          >
            <input
              type="radio"
              name="minRating"
              checked={filters.minRating === r}
              onChange={() => onChange({ ...filters, minRating: r })}
              className="h-4 w-4 border-[#c5c6cc] text-[#0f172a] accent-[#0f172a]"
            />
            {r}★ &amp; above
          </label>
        ))}
        <label className="flex items-center gap-2.5 text-sm text-[#0f172a] cursor-pointer">
          <input
            type="radio"
            name="minRating"
            checked={filters.minRating === 0}
            onChange={() => onChange({ ...filters, minRating: 0 })}
            className="h-4 w-4 border-[#c5c6cc] text-[#0f172a] accent-[#0f172a]"
          />
          Any rating
        </label>
      </FilterSection>
    </div>
  );
}
