"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingBag } from "lucide-react";
import { Product } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import WishlistButton from "@/components/WishlistButton";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="group relative flex flex-col">
      <Link
        href={`/products/${product.id}`}
        className="relative block aspect-[4/5] w-full overflow-hidden rounded-xl bg-[#f5f5f6] border border-transparent group-hover:border-[#c5c6cc] transition-all duration-300"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="rounded-full bg-[#0f172a] text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1">
              New
            </span>
          )}
          {product.isBestSeller && (
            <span className="rounded-full bg-[#827e9c] text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1">
              Best Seller
            </span>
          )}
        </div>

        <WishlistButton
          product={product}
          className="absolute top-3 right-3 shadow-sm"
        />

        <button
          type="button"
          aria-label={`Add ${product.name} to cart`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addToCart(product);
          }}
          className="absolute bottom-3 left-3 right-3 flex items-center justify-center gap-2 rounded-full bg-[#0f172a] text-white text-xs sm:text-sm font-medium py-2.5 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#827e9c]"
        >
          <ShoppingBag className="h-3.5 w-3.5" />
          Add to Cart
        </button>
      </Link>

      <div className="mt-3 flex flex-col gap-1">
        <span className="text-[11px] uppercase tracking-wider text-[#827e9c]">
          {product.category}
        </span>
        <Link
          href={`/products/${product.id}`}
          className="text-sm sm:text-base font-medium text-[#0f172a] hover:text-[#827e9c] transition-colors duration-300 line-clamp-2"
        >
          {product.name}
        </Link>
        <div className="flex items-center justify-between mt-0.5">
          <span className="text-sm sm:text-base font-semibold text-[#0f172a]">
            {formatPrice(product.price)}
          </span>
          {product.rating && (
            <span className="flex items-center gap-1 text-xs text-[#827e9c]">
              <Star className="h-3.5 w-3.5 fill-[#827e9c] text-[#827e9c]" />
              {product.rating}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
