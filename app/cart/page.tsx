"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CartItem from "@/components/CartItem";
import CartSummary from "@/components/CartSummary";
import EmptyState from "@/components/EmptyState";

export default function CartPage() {
  const { items, subtotal } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <h1 className="text-2xl sm:text-3xl font-semibold text-[#0f172a]">
        Shopping Cart
      </h1>
      <p className="mt-2 text-sm sm:text-base text-[#827e9c]">
        {items.length} item{items.length !== 1 ? "s" : ""} in your cart
      </p>

      {items.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            icon={<ShoppingBag className="h-9 w-9" />}
            title="Your Cart is Empty"
            description="Looks like you haven't added anything to your cart yet."
            actionLabel="Explore Products"
            actionHref="/products"
          />
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 items-start">
          <div className="rounded-xl border border-[#c5c6cc] px-6">
            {items.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))}
          </div>

          <CartSummary subtotal={subtotal} />
        </div>
      )}
    </div>
  );
}
