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
  placeholder = "Search silver jewellery...",
  autoFocus = false,
  className = "",
}: SearchBarProps) {
  return (
    <div
      className={`flex items-center gap-2 rounded-full border border-[#c5c6cc] bg-white px-4 py-2.5 focus-within:border-[#827e9c] transition-all duration-300 ${className}`}
    >
      <Search className="h-4 w-4 text-[#827e9c] shrink-0" />
      <input
        type="text"
        value={value}
        autoFocus={autoFocus}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search products"
        className="w-full bg-transparent text-sm text-[#0f172a] placeholder:text-[#827e9c] outline-none"
      />
      {value && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => onChange("")}
          className="shrink-0 text-[#827e9c] hover:text-[#0f172a] transition-colors duration-300"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
