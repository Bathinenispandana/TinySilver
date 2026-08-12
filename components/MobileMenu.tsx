"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X, Heart, User, ShoppingBag } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  onOpenLogin: () => void;
}

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/new-arrivals", label: "New Arrivals" },
  { href: "/collections", label: "Collections" },
];

export default function MobileMenu({
  open,
  onClose,
  onOpenLogin,
}: MobileMenuProps) {
  const { isLoggedIn, account } = useAuth();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] md:hidden">
      <button
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0 bg-[#0f172a]/50 backdrop-blur-sm animate-fade-in"
      />
      <div className="animate-drawer-in absolute right-0 top-0 h-full w-[82%] max-w-sm bg-white shadow-xl flex flex-col">
        <div className="flex items-center justify-between px-5 py-5 border-b border-[#c5c6cc]">
          <span className="text-lg font-semibold tracking-wide text-[#0f172a]">
            SILVERAZ
          </span>
          <button
            aria-label="Close menu"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#c5c6cc]/30 transition-all duration-300"
          >
            <X className="h-5 w-5 text-[#0f172a]" />
          </button>
        </div>

        <nav className="flex flex-col px-5 py-6 gap-1">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="py-3 text-base font-medium text-[#0f172a] border-b border-[#c5c6cc]/60 hover:text-[#827e9c] transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto px-5 py-6 border-t border-[#c5c6cc] flex flex-col gap-3">
          <Link
            href="/wishlist"
            onClick={onClose}
            className="flex items-center gap-3 text-sm font-medium text-[#0f172a]"
          >
            <Heart className="h-5 w-5" /> Wishlist
          </Link>
          <Link
            href="/cart"
            onClick={onClose}
            className="flex items-center gap-3 text-sm font-medium text-[#0f172a]"
          >
            <ShoppingBag className="h-5 w-5" /> Cart
          </Link>
          {isLoggedIn ? (
            <Link
              href="/account"
              onClick={onClose}
              className="flex items-center gap-3 text-sm font-medium text-[#0f172a]"
            >
              <User className="h-5 w-5" /> {account.name || "My Account"}
            </Link>
          ) : (
            <button
              onClick={() => {
                onClose();
                onOpenLogin();
              }}
              className="flex items-center gap-3 text-sm font-medium text-[#0f172a]"
            >
              <User className="h-5 w-5" /> Login / Sign Up
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
