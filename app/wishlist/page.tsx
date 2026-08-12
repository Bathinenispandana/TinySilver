"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Trash2, Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import EmptyState from "@/components/EmptyState";

export default function WishlistPage() {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <h1 className="text-2xl sm:text-3xl font-semibold text-[#0f172a]">
        Wishlist
      </h1>
      <p className="mt-2 text-sm sm:text-base text-[#827e9c]">
        Pieces you&apos;ve saved for later.
      </p>

      {items.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            icon={<Heart className="h-9 w-9" />}
            title="Your Wishlist is Empty"
            description="Save your favorite silver pieces here."
            actionLabel="Explore Products"
            actionHref="/products"
          />
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((product) => (
            <div
              key={product.id}
              className="flex gap-4 rounded-xl border border-[#c5c6cc] p-4"
            >
              <Link
                href={`/products/${product.id}`}
                className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-[#f5f5f6]"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </Link>
              <div className="flex flex-1 flex-col">
                <Link
                  href={`/products/${product.id}`}
                  className="text-sm font-medium text-[#0f172a] hover:text-[#827e9c] transition-colors duration-300 line-clamp-2"
                >
                  {product.name}
                </Link>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#0f172a]">
                    {formatPrice(product.price)}
                  </span>
                  {product.rating && (
                    <span className="flex items-center gap-1 text-xs text-[#827e9c]">
                      <Star className="h-3.5 w-3.5 fill-[#827e9c] text-[#827e9c]" />
                      {product.rating}
                    </span>
                  )}
                </div>
                <div className="mt-auto flex items-center gap-2 pt-3">
                  <button
                    type="button"
                    onClick={() => addToCart(product)}
                    className="flex-1 rounded-full bg-[#0f172a] text-white text-xs font-medium py-2 hover:bg-[#827e9c] transition-all duration-300"
                  >
                    Add to Cart
                  </button>
                  <button
                    type="button"
                    aria-label="Remove from wishlist"
                    onClick={() => removeFromWishlist(product.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#c5c6cc] hover:border-[#827e9c] transition-all duration-300"
                  >
                    <Trash2 className="h-3.5 w-3.5 text-[#0f172a]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
