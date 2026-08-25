"use client";

import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Search "Products"',
  autoFocus = false,
  className = "",
}: SearchBarProps) {
  return (
    <div
      className={`flex w-full items-center rounded-xl bg-white/5 px-4 ${className}`}
    >
      <Search className="h-5 w-5 shrink-0 text-[#c5c6cc]" />

      <input
        type="text"
        value={value}
        autoFocus={autoFocus}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search products"
        className="ml-3 min-w-0 flex-1 border-0 bg-transparent text-sm text-black outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0 placeholder:text-[#c5c6cc] lg:text-base"
      />

      {value && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => onChange("")}
          className="ml-2 shrink-0 text-[#c5c6cc] transition-colors duration-300 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}