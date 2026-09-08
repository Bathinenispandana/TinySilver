"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star, Heart } from "lucide-react";
import { Product } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import ProductGallery from "@/components/ProductGallery";
import QuantitySelector from "@/components/QuantitySelector";
import { AccordionItem } from "@/components/Accordion";

export default function ProductDetailsClient({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const router = useRouter();
  const wishlisted = isWishlisted(product.id);

  const images = product.images?.length ? product.images : [product.image];

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push("/checkout");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
      <ProductGallery images={images} name={product.name} />

      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-[#827e9c]">
          {product.category} · {product.collection}
        </span>
        <h1 className="mt-2 text-2xl sm:text-3xl font-semibold text-[#0f172a]">
          {product.name}
        </h1>

        {product.rating && (
          <div className="mt-3 flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.round(product.rating!)
                      ? "fill-[#0f172a] text-[#0f172a]"
                      : "text-[#c5c6cc]"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-[#827e9c]">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>
        )}

        <p className="mt-4 text-2xl font-semibold text-[#0f172a]">
          {formatPrice(product.price)}
        </p>

        <p className="mt-5 text-sm sm:text-base text-[#827e9c] leading-relaxed">
          {product.description}
        </p>

        <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
          {product.material && (
            <div>
              <dt className="text-[#827e9c]">Material</dt>
              <dd className="mt-0.5 font-medium text-[#0f172a]">
                {product.material}
              </dd>
            </div>
          )}
          {product.weight && (
            <div>
              <dt className="text-[#827e9c]">Weight</dt>
              <dd className="mt-0.5 font-medium text-[#0f172a]">
                {product.weight}
              </dd>
            </div>
          )}
          {product.dimensions && (
            <div>
              <dt className="text-[#827e9c]">Dimensions</dt>
              <dd className="mt-0.5 font-medium text-[#0f172a]">
                {product.dimensions}
              </dd>
            </div>
          )}
          <div>
            <dt className="text-[#827e9c]">Availability</dt>
            <dd
              className={`mt-0.5 font-medium ${
                product.inStock === false ? "text-red-600" : "text-[#0f172a]"
              }`}
            >
              {product.inStock === false ? "Out of Stock" : "In Stock"}
            </dd>
          </div>
        </dl>

        <div className="mt-7 flex items-center gap-4">
          <span className="text-sm font-medium text-[#0f172a]">Quantity:</span>
          <QuantitySelector quantity={quantity} onChange={setQuantity} />
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => addToCart(product, quantity)}
            disabled={product.inStock === false}
            className="flex-1 rounded-full bg-[#0f172a] text-white text-sm font-semibold py-3.5 hover:bg-[#827e9c] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Add to Cart
          </button>
          <button
            type="button"
            onClick={handleBuyNow}
            disabled={product.inStock === false}
            className="flex-1 rounded-full border border-[#0f172a] text-[#0f172a] text-sm font-semibold py-3.5 hover:bg-[#c5c6cc]/30 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Buy Now
          </button>
        </div>

        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#0f172a] hover:text-[#827e9c] transition-colors duration-300"
        >
          <Heart
            className="h-4.5 w-4.5"
            fill={wishlisted ? "#0f172a" : "none"}
          />
          {wishlisted ? "Added to Wishlist" : "Add to Wishlist"}
        </button>

        <div className="mt-8">
          <AccordionItem title="Description" defaultOpen>
            {product.description}
          </AccordionItem>
          <AccordionItem title="Product Details">
            <ul className="list-disc pl-4 space-y-1">
              {product.material && <li>Material: {product.material}</li>}
              {product.weight && <li>Weight: {product.weight}</li>}
              {product.dimensions && (
                <li>Dimensions: {product.dimensions}</li>
              )}
              <li>Hallmarked 925 sterling silver</li>
            </ul>
          </AccordionItem>
          <AccordionItem title="Shipping & Returns">
            Free shipping on orders above ₹500. Standard delivery in 4-6
            business days, express in 1-2 business days. Easy 15-day returns
            on unworn items in original packaging.
          </AccordionItem>
          <AccordionItem title="Care Instructions">
            Store in the pouch provided, away from moisture and perfume.
            Clean gently with a soft silver polishing cloth to maintain
            shine.
          </AccordionItem>
        </div>
      </div>
    </div>
  );
}
