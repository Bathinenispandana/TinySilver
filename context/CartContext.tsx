"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useMemo,
} from "react";
import { Product } from "@/lib/products";
import { useToast } from "@/context/ToastContext";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  itemCount: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "srz_cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  const { showToast } = useToast();

  // ============================================================
  // LOAD CART FROM LOCAL STORAGE
  // ============================================================

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored) {
        const parsed: CartItem[] = JSON.parse(stored);

        // Make sure old/invalid quantities cannot exceed stock
        const safeItems = parsed.map((item) => ({
          ...item,
          quantity: Math.min(
            Math.max(1, item.quantity),
            item.product.stock,
          ),
        }));

        setItems(safeItems);
      }
    } catch {
      // Ignore corrupted localStorage
    }

    setHydrated(true);
  }, []);

  // ============================================================
  // SAVE CART TO LOCAL STORAGE
  // ============================================================

  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  // ============================================================
  // ADD TO CART
  // ============================================================

  const addToCart = (
  product: Product,
  quantity: number = 1,
) => {
  const existingItem = items.find(
    (item) => item.product.id === product.id,
  );

  const currentQuantity =
    existingItem?.quantity ?? 0;

  const newQuantity =
    currentQuantity + quantity;

  if (newQuantity > product.stock) {
    const remainingStock =
      product.stock - currentQuantity;

    if (remainingStock <= 0) {
      showToast(
        `We have only ${product.stock} ${
          product.stock === 1
            ? "item"
            : "items"
        } available for ${product.name}.`,
      );
    } else {
      showToast(
        `You can add only ${remainingStock} more ${
          remainingStock === 1
            ? "item"
            : "items"
        } of ${product.name}.`,
      );
    }

    return;
  }

  setItems((prev) => {
    const existing = prev.find(
      (item) =>
        item.product.id === product.id,
    );

    if (existing) {
      return prev.map((item) =>
        item.product.id === product.id
          ? {
              ...item,
              quantity:
                item.quantity + quantity,
            }
          : item,
      );
    }

    return [
      ...prev,
      {
        product,
        quantity,
      },
    ];
  });

  showToast(
    `${quantity} ${
      quantity === 1
        ? "item"
        : "items"
    } added to cart.`,
  );
};

  // ============================================================
  // REMOVE FROM CART
  // ============================================================

  const removeFromCart = (productId: number) => {
    setItems((prev) =>
      prev.filter(
        (item) => item.product.id !== productId,
      ),
    );

    showToast("Product removed from cart");
  };

  // ============================================================
  // UPDATE CART QUANTITY
  // ============================================================

  const updateQuantity = (
    productId: number,
    quantity: number,
  ) => {
    // Never allow quantity below 1
    if (quantity < 1) return;

    const item = items.find(
      (item) => item.product.id === productId,
    );

    if (!item) return;

    // ==========================================================
    // STOCK CHECK
    // ==========================================================

    if (quantity > item.product.stock) {
      showToast(
        `We have only ${item.product.stock} ${
          item.product.stock === 1
            ? "item"
            : "items"
        } available for ${item.product.name}.`,
      );

      return;
    }

    // ==========================================================
    // UPDATE QUANTITY
    // ==========================================================

    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? {
              ...item,
              quantity,
            }
          : item,
      ),
    );
  };

  // ============================================================
  // CLEAR CART
  // ============================================================

  const clearCart = () => {
    setItems([]);
  };

  // ============================================================
  // SUBTOTAL
  // ============================================================

  const subtotal = useMemo(() => {
    return items.reduce(
      (sum, item) =>
        sum +
        item.product.price *
          item.quantity,
      0,
    );
  }, [items]);

  // ============================================================
  // TOTAL ITEM COUNT
  // ============================================================

  const itemCount = useMemo(() => {
    return items.reduce(
      (sum, item) =>
        sum + item.quantity,
      0,
    );
  }, [items]);

  // ============================================================
  // PROVIDER
  // ============================================================

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ============================================================
// USE CART
// ============================================================

export function useCart() {
  const ctx = useContext(CartContext);

  if (!ctx) {
    throw new Error(
      "useCart must be used within CartProvider",
    );
  }

  return ctx;
}