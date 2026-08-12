"use client";

import { ChevronDown } from "lucide-react";

export type SortOption =
  | "featured"
  | "newest"
  | "price-asc"
  | "price-desc"
  | "rating";

const OPTIONS: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Best Rated" },
];

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div className="relative inline-block">
      <select
        aria-label="Sort products"
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="appearance-none cursor-pointer rounded-full border border-[#c5c6cc] bg-white pl-4 pr-9 py-2.5 text-sm text-[#0f172a] hover:border-[#827e9c] transition-all duration-300 outline-none"
      >
        {OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            Sort: {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#827e9c]" />
    </div>
  );
}

export function sortProducts<T extends { price: number; isNew: boolean; rating?: number; id: number }>(
  products: T[],
  sort: SortOption
): T[] {
  const arr = [...products];
  switch (sort) {
    case "newest":
      return arr.sort((a, b) => Number(b.isNew) - Number(a.isNew) || b.id - a.id);
    case "price-asc":
      return arr.sort((a, b) => a.price - b.price);
    case "price-desc":
      return arr.sort((a, b) => b.price - a.price);
    case "rating":
      return arr.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    default:
      return arr;
  }
}
