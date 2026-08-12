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

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage on mount
      if (stored) setItems(JSON.parse(stored));
    } catch {
      // ignore corrupted storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const isWishlisted = (productId: number) =>
    items.some((p) => p.id === productId);

  const toggleWishlist = (product: Product) => {
    setItems((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast("Removed from Wishlist");
        return prev.filter((p) => p.id !== product.id);
      }
      showToast("♡ Added to Wishlist");
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId: number) => {
    setItems((prev) => prev.filter((p) => p.id !== productId));
    showToast("Removed from Wishlist");
  };

  return (
    <WishlistContext.Provider
      value={{ items, toggleWishlist, isWishlisted, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
