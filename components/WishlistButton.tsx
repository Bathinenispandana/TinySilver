"use client";

import { Heart } from "lucide-react";
import { useState } from "react";
import { Product } from "@/lib/products";
import { useWishlist } from "@/context/WishlistContext";

interface WishlistButtonProps {
  product: Product;
  className?: string;
  size?: "sm" | "md";
}

export default function WishlistButton({
  product,
  className = "",
  size = "md",
}: WishlistButtonProps) {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [popping, setPopping] = useState(false);
  const active = isWishlisted(product.id);
  const iconSize = size === "sm" ? "h-4 w-4" : "h-5 w-5";
  const wrapSize = size === "sm" ? "h-8 w-8" : "h-10 w-10";

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(product);
        setPopping(true);
        setTimeout(() => setPopping(false), 350);
      }}
      className={`${wrapSize} flex items-center justify-center rounded-full bg-white/90 backdrop-blur border border-[#c5c6cc] hover:border-[#827e9c] transition-all duration-300 ${className}`}
    >
      <Heart
        className={`${iconSize} ${popping ? "animate-heart-pop" : ""} transition-colors duration-300`}
        color="#0f172a"
        fill={active ? "#0f172a" : "none"}
      />
    </button>
  );
}
