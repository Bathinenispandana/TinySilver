"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { CartItem as CartItemType } from "@/context/CartContext";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import QuantitySelector from "@/components/QuantitySelector";

export default function CartItem({ item }: { item: CartItemType }) {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  return (
    <div className="flex gap-4 py-6 border-b border-[#c5c6cc] last:border-b-0">
      <Link
        href={`/products/${product.id}`}
        className="relative h-24 w-24 sm:h-28 sm:w-28 shrink-0 overflow-hidden rounded-lg bg-[#f5f5f6]"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="112px"
          className="object-cover"
        />
      </Link>

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link
              href={`/products/${product.id}`}
              className="text-sm sm:text-base font-medium text-[#0f172a] hover:text-[#827e9c] transition-colors duration-300"
            >
              {product.name}
            </Link>
            <p className="mt-0.5 text-xs text-[#827e9c]">
              {product.category}
            </p>
          </div>
          <button
            type="button"
            aria-label={`Remove ${product.name} from cart`}
            onClick={() => removeFromCart(product.id)}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full hover:bg-[#c5c6cc]/30 transition-all duration-300"
          >
            <Trash2 className="h-4 w-4 text-[#827e9c]" />
          </button>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <QuantitySelector
            quantity={quantity}
            onChange={(q) => updateQuantity(product.id, q)}
            size="sm"
          />
          <div className="text-right">
            <p className="text-sm sm:text-base font-semibold text-[#0f172a]">
              {formatPrice(product.price * quantity)}
            </p>
            {quantity > 1 && (
              <p className="text-xs text-[#827e9c]">
                {formatPrice(product.price)} each
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
