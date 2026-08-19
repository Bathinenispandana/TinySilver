"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Heart,
  User,
  ShoppingBag,
  Menu,
  X,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import MobileMenu from "@/components/MobileMenu";
import SearchBar from "@/components/SearchBar";
import Image from "next/image";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/new-arrivals", label: "New Arrivals" },
  { href: "/collections", label: "Collections" },
];

interface HeaderProps {
  onOpenLogin: () => void;
}

export default function Header({ onOpenLogin }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const { itemCount } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { isLoggedIn } = useAuth();

  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);

    onScroll();

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (searchOpen) {
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setSearchOpen(false);
        }
      };

      document.addEventListener("keydown", onKeyDown);

      return () => {
        document.removeEventListener("keydown", onKeyDown);
      };
    }
  }, [searchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchValue.trim()) {
      router.push(
        `/products?q=${encodeURIComponent(searchValue.trim())}`
      );

      setSearchOpen(false);
      setSearchValue("");
    }
  };

  return (
    <>
      {/* ================= HEADER ================= */}
      <header
        className={`sticky top-0 z-50 bg-[#525278] border-b border-white/10 transition-shadow duration-300 ${
          scrolled ? "shadow-md" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 sm:h-20 items-center justify-between">

            {/* ================= LOGO ================= */}
            <Link
              href="/"
              className="flex items-center"
              aria-label="Tiny Silver Home"
            >
              <Image
                src="/tinysilver.webp"
                alt="Tiny Silver Logo"
                width={80}
                height={20}
                priority
                className="w-22 h-20 object-contain"
              />
            </Link>

            {/* ================= DESKTOP NAVIGATION ================= */}
            <nav className="hidden md:flex items-center gap-9">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-white hover:text-[#c5c6cc] transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* ================= HEADER ACTIONS ================= */}
            <div className="flex items-center gap-1 sm:gap-2">

              {/* Search - Desktop */}
              <button
                aria-label="Search"
                onClick={() => setSearchOpen(true)}
                className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/10 transition-all duration-300"
              >
                <Search className="h-5 w-5 text-white" />
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                aria-label="Wishlist"
                className="relative hidden sm:flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/10 transition-all duration-300"
              >
                <Heart className="h-5 w-5 text-white" />

                {wishlistItems.length > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-white text-[9px] font-semibold text-[#49496c] px-1">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              {/* Account / Login */}
              <button
                aria-label={isLoggedIn ? "Account" : "Login"}
                onClick={() =>
                  isLoggedIn
                    ? router.push("/account")
                    : onOpenLogin()
                }
                className="relative hidden sm:flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/10 transition-all duration-300"
              >
                <User className="h-5 w-5 text-white" />

                {isLoggedIn && (
                  <span className="absolute bottom-1.5 right-1.5 h-2 w-2 rounded-full bg-[#c5c6cc] ring-2 ring-[#49496c]" />
                )}
              </button>

              {/* Search - Mobile */}
              <button
                aria-label="Search"
                onClick={() => setSearchOpen(true)}
                className="sm:hidden flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/10 transition-all duration-300"
              >
                <Search className="h-5 w-5 text-white" />
              </button>

              {/* Cart */}
              <Link
                href="/cart"
                aria-label="Cart"
                className="relative flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/10 transition-all duration-300"
              >
                <ShoppingBag className="h-5 w-5 text-white" />

                {itemCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-white text-[9px] font-semibold text-[#49496c] px-1">
                    {itemCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu */}
              <button
                aria-label="Open menu"
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/10 transition-all duration-300"
              >
                <Menu className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ================= SEARCH MODAL ================= */}
      {searchOpen && (
        <div className="fixed inset-0 z-[75] flex items-start justify-center bg-[#0f172a]/50 backdrop-blur-sm px-4 pt-24 sm:pt-32 animate-fade-in">

          {/* Background Close */}
          <button
            aria-label="Close search"
            onClick={() => setSearchOpen(false)}
            className="absolute inset-0 -z-10"
          />

          {/* Search Box */}
          <div className="w-full max-w-xl rounded-2xl bg-white p-5 sm:p-6 shadow-2xl">

            <div className="flex items-center gap-3">

              <form
                onSubmit={handleSearchSubmit}
                className="flex-1"
              >
                <SearchBar
                  value={searchValue}
                  onChange={setSearchValue}
                  autoFocus
                />
              </form>

              <button
                aria-label="Close search"
                onClick={() => setSearchOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#c5c6cc]/30 transition-all duration-300"
              >
                <X className="h-4.5 w-4.5 text-[#0f172a]" />
              </button>
            </div>

            <p className="mt-3 text-xs text-[#827e9c]">
              Press Enter to search, or Escape to close.
            </p>
          </div>
        </div>
      )}

      {/* ================= MOBILE MENU ================= */}
      <MobileMenu
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onOpenLogin={onOpenLogin}
      />
    </>
  );
}