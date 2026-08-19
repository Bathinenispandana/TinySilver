"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { Product } from "@/lib/products";
import { useToast } from "@/context/ToastContext";

interface WishlistContextValue {
  items: Product[];
  toggleWishlist: (product: Product) => void;
  isWishlisted: (productId: number) => boolean;
  removeFromWishlist: (productId: number) => void;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(
  undefined
);

const STORAGE_KEY = "srz_wishlist";

export function WishlistProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [items, setItems] = useState<Product[]>([]);
  const [hydrated, setHydrated] = useState(false);

  const { showToast } = useToast();

  // Load wishlist from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch {
      // Ignore corrupted localStorage data
    }

    setHydrated(true);
  }, []);

  // Save wishlist to localStorage
  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const isWishlisted = (productId: number) => {
    return items.some((product) => product.id === productId);
  };

  const toggleWishlist = (product: Product) => {
    const exists = items.some((item) => item.id === product.id);

    // Update state — no side effects inside setItems
    setItems((prev) => {
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }

      return [...prev, product];
    });

    // Toast is outside the state updater
    if (exists) {
      showToast("Removed from Wishlist");
    } else {
      showToast("♡ Added to Wishlist");
    }
  };

  const removeFromWishlist = (productId: number) => {
    setItems((prev) =>
      prev.filter((product) => product.id !== productId)
    );

    showToast("Removed from Wishlist");
  };

  return (
    <WishlistContext.Provider
      value={{
        items,
        toggleWishlist,
        isWishlisted,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);

  if (!ctx) {
    throw new Error(
      "useWishlist must be used within WishlistProvider"
    );
  }

  return ctx;
}