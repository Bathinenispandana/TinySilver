
"use client";

import { ChevronDown } from "lucide-react";

export type SortOption =
  | "featured"
  | "newest"
  | "price-asc"
  | "price-desc"
  | "rating";

const OPTIONS: { value: SortOption; label: string }[] = [
  {
    value: "featured",
    label: "Featured",
  },
  {
    value: "newest",
    label: "New Arrivals",
  },
  {
    value: "price-asc",
    label: "Price: Low to High",
  },
  {
    value: "price-desc",
    label: "Price: High to Low",
  },
  {
    value: "rating",
    label: "Best Rated",
  },
];

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export default function SortDropdown({
  value,
  onChange,
}: SortDropdownProps) {
  return (
    <div className="relative inline-block">
      <select
        aria-label="Sort products"
        value={value}
        onChange={(e) =>
          onChange(e.target.value as SortOption)
        }
        className="
          cursor-pointer
          appearance-none
          rounded-full
          border
          border-[#c5c6cc]
          bg-white
          py-2.5
          pl-4
          pr-10
          text-sm
          text-[#0f172a]
          outline-none
          transition-all
          duration-300
          hover:border-[#827e9c]
          focus:border-[#827e9c]
        "
      >
        {OPTIONS.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            Sort: {option.label}
          </option>
        ))}
      </select>

      <ChevronDown
        className="
          pointer-events-none
          absolute
          right-3
          top-1/2
          h-4
          w-4
          -translate-y-1/2
          text-[#827e9c]
        "
      />
    </div>
  );
}


/* =====================================================
   PRODUCT SORTING
===================================================== */

export function sortProducts<
  T extends {
    price: number;
    isNew: boolean;
    isBestSeller?: boolean;
    rating?: number;
    reviews?: number;
    id: number;
  }
>(
  products: T[],
  sort: SortOption
): T[] {
  // Never modify the original products array
  const arr = [...products];

  switch (sort) {

    /* =================================================
       FEATURED
       Best sellers first
       Then highest rated
       ================================================= */

    case "featured":
      return arr.sort((a, b) => {
        // Best seller products first
        const bestSellerA = a.isBestSeller ? 1 : 0;
        const bestSellerB = b.isBestSeller ? 1 : 0;

        if (bestSellerA !== bestSellerB) {
          return bestSellerB - bestSellerA;
        }

        // Then highest rating
        const ratingA = a.rating ?? 0;
        const ratingB = b.rating ?? 0;

        if (ratingA !== ratingB) {
          return ratingB - ratingA;
        }

        // Then most reviews
        const reviewsA = a.reviews ?? 0;
        const reviewsB = b.reviews ?? 0;

        if (reviewsA !== reviewsB) {
          return reviewsB - reviewsA;
        }

        // Finally newer ID first
        return b.id - a.id;
      });


    /* =================================================
       NEW ARRIVALS
       New products first
       Then newest ID first
       ================================================= */

    case "newest":
      return arr.sort((a, b) => {
        const newA = a.isNew ? 1 : 0;
        const newB = b.isNew ? 1 : 0;

        // New products first
        if (newA !== newB) {
          return newB - newA;
        }

        // Newest product ID first
        return b.id - a.id;
      });


    /* =================================================
       PRICE: LOW TO HIGH
       ================================================= */

    case "price-asc":
      return arr.sort((a, b) => {
        if (a.price !== b.price) {
          return a.price - b.price;
        }

        // If price is same, highest rating first
        return (b.rating ?? 0) - (a.rating ?? 0);
      });


    /* =================================================
       PRICE: HIGH TO LOW
       ================================================= */

    case "price-desc":
      return arr.sort((a, b) => {
        if (a.price !== b.price) {
          return b.price - a.price;
        }

        // If price is same, highest rating first
        return (b.rating ?? 0) - (a.rating ?? 0);
      });


    /* =================================================
       BEST RATED
       Highest rating first
       Then highest review count
       ================================================= */

    case "rating":
      return arr.sort((a, b) => {
        const ratingA = a.rating ?? 0;
        const ratingB = b.rating ?? 0;

        // Highest rating first
        if (ratingA !== ratingB) {
          return ratingB - ratingA;
        }

        // If rating is same, more reviews first
        const reviewsA = a.reviews ?? 0;
        const reviewsB = b.reviews ?? 0;

        if (reviewsA !== reviewsB) {
          return reviewsB - reviewsA;
        }

        // Finally newer ID first
        return b.id - a.id;
      });


    
      // DEFAULT

    default:
      return arr;
  }
}