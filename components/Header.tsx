"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Heart,
  User,
  ShoppingBag,
  Menu,
  X,
  MapPin,
  ChevronDown,
  Check,
  Loader2,
} from "lucide-react";
import Image from "next/image";

import { products } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";

import MobileMenu from "@/components/MobileMenu";
import SearchBar from "@/components/SearchBar";

/* ================= DESIGN TOKENS ================= */

const COLORS = {
  // Use ONLY this color for the complete header
  navy: "#0f172a",
  navyRow: "#0f172a",
  navyScrolled: "#0f172a",

  gold: "#C9A66B",
  goldDeep: "#B08D4F",
  hairline: "rgba(255,255,255,0.08)",
};

/* ================= TYPES ================= */

type LocationDetails = {
  pincode: string;
  state: string;
  district: string;
  city: string;
};

interface HeaderProps {
  onOpenLogin: () => void;
}

export default function Header({ onOpenLogin }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  /* ================= DELIVERY LOCATION ================= */

  const [locationOpen, setLocationOpen] = useState(false);
  const [mobileLocationOpen, setMobileLocationOpen] = useState(false);

  const [pincode, setPincode] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("India");

  const [locationDetails, setLocationDetails] =
    useState<LocationDetails | null>(null);

  const [locationLoading, setLocationLoading] = useState(false);
  const [locationMessage, setLocationMessage] = useState("");

  const [isDeliverable, setIsDeliverable] = useState<boolean | null>(null);

  const locationRef = useRef<HTMLDivElement>(null);

  const { itemCount } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { isLoggedIn } = useAuth();

  const router = useRouter();

  // orders function

  const handleOrdersClick = () => {
    if (isLoggedIn) {
      router.push("/orders");
    } else {
      onOpenLogin();
    }
  };

  /* ================= LOAD SAVED LOCATION ================= */

  useEffect(() => {
    const savedLocation = localStorage.getItem("tiny-silver-delivery-location");

    if (!savedLocation) return;

    try {
      const parsed: LocationDetails = JSON.parse(savedLocation);

      setLocationDetails(parsed);
      setPincode(parsed.pincode);
      setSelectedLocation(parsed.city || "India");
      setIsDeliverable(true);
    } catch (error) {
      console.error("Unable to load saved location:", error);

      localStorage.removeItem("tiny-silver-delivery-location");
    }
  }, []);

  /* ================= LIVE SEARCH ================= */

  const searchQuery = searchValue.trim().toLowerCase();

  const searchResults =
    searchQuery.length > 0
      ? products
          .filter((product) => {
            const searchableText = [
              product.name,
              product.category,
              product.collection,
              product.material,
            ]
              .filter(Boolean)
              .join(" ")
              .toLowerCase();

            return searchableText.includes(searchQuery);
          })
          .slice(0, 6)
      : [];

  /* ================= SCROLL EFFECT ================= */

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);

    onScroll();

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* ================= ESCAPE + OUTSIDE CLICK ================= */

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setSearchValue("");
        setLocationOpen(false);
        setMobileLocationOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        locationRef.current &&
        !locationRef.current.contains(e.target as Node)
      ) {
        setLocationOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* ================= PINCODE FUNCTIONS ================= */

  const handlePincodeChange = (value: string) => {
    const numbersOnly = value.replace(/\D/g, "").slice(0, 6);

    setPincode(numbersOnly);
    setLocationMessage("");
    setIsDeliverable(null);
  };

  const checkPincode = async () => {
    if (pincode.length !== 6) {
      setLocationMessage("Please enter a valid 6-digit pincode.");
      setIsDeliverable(false);
      return;
    }

    try {
      setLocationLoading(true);
      setLocationMessage("");
      setIsDeliverable(null);

      const response = await fetch(`/api/pincode/${pincode}`);
      const data = await response.json();

      if (!response.ok || !data.success) {
        setLocationMessage(data.message || "Unable to find this pincode.");
        setIsDeliverable(false);
        return;
      }

      if (!data.deliverable) {
        setLocationDetails(data.location);
        setLocationMessage(
          data.message ||
            "Currently, we deliver only in Telangana and Andhra Pradesh.",
        );
        setIsDeliverable(false);
        return;
      }

      const newLocation: LocationDetails = data.location;

      setLocationDetails(newLocation);
      setSelectedLocation(newLocation.city);
      setPincode(newLocation.pincode);

      setLocationMessage(
        `Delivery available in ${newLocation.city}, ${newLocation.state}.`,
      );

      setIsDeliverable(true);

      localStorage.setItem(
        "tiny-silver-delivery-location",
        JSON.stringify(newLocation),
      );
    } catch (error) {
      console.error("Pincode check error:", error);

      setLocationMessage("Unable to check this pincode. Please try again.");

      setIsDeliverable(false);
    } finally {
      setLocationLoading(false);
    }
  };

  const clearLocation = () => {
    setPincode("");
    setSelectedLocation("India");
    setLocationDetails(null);
    setLocationMessage("");
    setIsDeliverable(null);

    localStorage.removeItem("tiny-silver-delivery-location");
  };

  const handlePincodeKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      checkPincode();
    }
  };

  /* ================= SEARCH FUNCTION ================= */

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const query = searchValue.trim();

    if (!query) return;

    router.push(`/products?q=${encodeURIComponent(query)}`);

    setSearchOpen(false);
    setSearchValue("");
  };

  /* ================= PRODUCT CLICK ================= */

  const handleProductClick = (productId: number) => {
    router.push(`/products/${productId}`);

    setSearchValue("");
    setSearchOpen(false);
  };

  /* ================= CLOSE SEARCH ================= */

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchValue("");
  };

  /* ================= ACCOUNT HANDLER ================= */

  const handleAccountClick = () => {
    isLoggedIn ? router.push("/account") : onOpenLogin();
  };

  /* ================= SHARED SEARCH RESULTS ================= */

  const renderResults = (imgSize: number) => (
    <>
      {searchResults.map((product) => (
        <button
          key={product.id}
          type="button"
          onClick={() => handleProductClick(product.id)}
          className="group flex w-full items-center gap-3 border-b border-black/[0.06] p-3 text-left transition-colors duration-150 last:border-b-0 hover:bg-[#FBF9F4] focus-visible:bg-[#FBF9F4] focus-visible:outline-none"
        >
          <div
            className="shrink-0 overflow-hidden rounded-lg bg-slate-100 ring-1 ring-inset ring-black/5"
            style={{
              height: imgSize,
              width: imgSize,
            }}
          >
            <Image
              src={product.image}
              alt={product.name}
              width={imgSize}
              height={imgSize}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-[#121722]">
              {product.name}
            </p>

            <p
              className="mt-0.5 text-xs font-semibold tracking-wide"
              style={{ color: COLORS.goldDeep }}
            >
              ₹{product.price.toLocaleString("en-IN")}
            </p>
          </div>
        </button>
      ))}
    </>
  );

  return (
    <>
      {/* ================= HEADER ================= */}

      <header
        className="sticky top-0 z-50 p-1 transition-shadow duration-300"
        style={{
          // Always #0f172a
          backgroundColor: COLORS.navy,
          boxShadow: scrolled ? "0 12px 32px -16px rgba(0,0,0,0.6)" : "none",
        }}
      >
        {/* ================= MAIN HEADER ROW ================= */}

        <div className="mx-auto max-w-[1500px] px-3 sm:px-4 lg:px-6">
          <div className="flex h-[88px] items-center gap-2 sm:gap-4">
            {/* ================= LOGO ================= */}

            <Link
              href="/"
              className="flex shrink-0 items-center rounded-md p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A66B]/60"
              aria-label="Tiny Silver Home"
            >
              <Image
                src="/tinysilver.webp"
                alt="Tiny Silver"
                width={220}
                height={90}
                priority
                className="h-16 w-auto object-contain sm:h-[72px] lg:h-[80px]"
              />
            </Link>

            {/* ================= DESKTOP LOCATION ================= */}

            <div
              ref={locationRef}
              className="relative hidden shrink-0 lg:block"
            >
              <button
                type="button"
                onClick={() => setLocationOpen((previous) => !previous)}
                aria-expanded={locationOpen}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-left text-white/90 transition-all duration-200 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A66B]/50"
              >
                <MapPin
                  className="h-7 w-7 shrink-0 text-white/80"
                  strokeWidth={1.8}
                />

                <span className="flex flex-col items-start leading-tight">
                  <span className="text-[11px] text-white/50">Deliver to</span>

                  <span className="max-w-[115px] truncate text-[14px] font-semibold text-white">
                    {selectedLocation}
                  </span>
                </span>

                <ChevronDown
                  className={`h-4 w-4 text-white/60 transition-transform duration-300 ${
                    locationOpen ? "rotate-180" : ""
                  }`}
                  strokeWidth={2}
                />
              </button>

              {locationOpen && (
                <div className="absolute left-0 top-full z-[110] mt-3 w-[390px] overflow-hidden rounded-xl border border-black/[0.08] bg-white shadow-2xl">
                  <div className="border-b border-black/[0.06] p-5">
                    <h3 className="text-lg font-bold text-[#121722]">
                      Choose your location
                    </h3>

                    <p className="mt-1 text-sm leading-relaxed text-slate-500">
                      Enter your pincode to check delivery availability. We
                      currently deliver only in Telangana and Andhra Pradesh.
                    </p>
                  </div>

                  <div className="p-5">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        inputMode="numeric"
                        value={pincode}
                        onChange={(e) => handlePincodeChange(e.target.value)}
                        onKeyDown={handlePincodeKeyDown}
                        placeholder="Enter 6-digit pincode"
                        maxLength={6}
                        className="h-11 min-w-0 flex-1 rounded-lg border border-slate-300 px-3 text-sm text-black outline-none transition focus:border-[#C9A66B] focus:ring-2 focus:ring-[#C9A66B]/20"
                      />

                      <button
                        type="button"
                        onClick={checkPincode}
                        disabled={locationLoading || pincode.length !== 6}
                        className="flex h-11 min-w-[82px] items-center justify-center rounded-lg px-4 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-50"
                        style={{
                          backgroundColor: COLORS.navy,
                        }}
                      >
                        {locationLoading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          "Check"
                        )}
                      </button>
                    </div>

                    <p className="mt-3 text-xs text-slate-500">
                      Delivery available only in Telangana and Andhra Pradesh.
                    </p>

                    {locationMessage && (
                      <div
                        className={`mt-4 rounded-lg border p-3 ${
                          isDeliverable
                            ? "border-green-200 bg-green-50"
                            : "border-red-200 bg-red-50"
                        }`}
                      >
                        <div className="flex gap-2">
                          {isDeliverable ? (
                            <Check className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                          ) : (
                            <X className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                          )}

                          <div>
                            <p
                              className={`text-sm font-medium ${
                                isDeliverable
                                  ? "text-green-700"
                                  : "text-red-700"
                              }`}
                            >
                              {locationMessage}
                            </p>

                            {locationDetails && (
                              <p className="mt-1 text-xs text-slate-600">
                                {locationDetails.district},{" "}
                                {locationDetails.state} -{" "}
                                {locationDetails.pincode}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {locationDetails && isDeliverable && (
                      <button
                        type="button"
                        onClick={clearLocation}
                        className="mt-4 text-xs font-semibold text-[#B08D4F] hover:underline"
                      >
                        Change location
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* ================= DESKTOP SEARCH ================= */}

            <div className="relative hidden flex-1 lg:block">
              <form
                onSubmit={handleSearchSubmit}
                className="flex h-11 w-full overflow-hidden rounded-md ring-1 ring-inset ring-white/10 transition-shadow duration-200 focus-within:ring-2 focus-within:ring-[#C9A66B]/60"
              >
                <div className="flex-1 bg-white">
                  <SearchBar
                    value={searchValue}
                    onChange={setSearchValue}
                    placeholder="Search rings, necklaces, earrings…"
                    className="h-11 rounded-none border-none bg-transparent text-[#121722] placeholder:text-slate-400 focus-within:ring-0"
                  />
                </div>

                <button
                  type="submit"
                  aria-label="Search"
                  className="flex w-14 shrink-0 items-center justify-center transition-colors duration-150 hover:brightness-95"
                  style={{
                    backgroundColor: COLORS.gold,
                  }}
                >
                  <Search className="h-5 w-5 text-[#121722]" strokeWidth={2} />
                </button>
              </form>

              {searchValue.trim() && (
                <div className="absolute left-0 top-[50px] z-[100] w-full overflow-hidden rounded-xl border border-black/5 bg-white shadow-2xl">
                  {searchResults.length > 0 ? (
                    <>
                      {renderResults(44)}

                      <button
                        type="button"
                        onClick={() => {
                          router.push(
                            `/products?q=${encodeURIComponent(
                              searchValue.trim(),
                            )}`,
                          );
                          setSearchValue("");
                        }}
                        className="w-full border-t border-black/[0.06] p-3 text-center text-[12px] font-bold uppercase tracking-wide text-[#121722] transition-colors hover:bg-[#FBF9F4]"
                      >
                        View all results for &ldquo;{searchValue}&rdquo;
                      </button>
                    </>
                  ) : (
                    <div className="p-4 text-center text-sm text-slate-500">
                      No products found for &ldquo;{searchValue}&rdquo;
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ================= MOBILE SEARCH ================= */}

            <button
              type="button"
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
              className="ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white transition-colors hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A66B]/50 lg:hidden"
            >
              <Search className="h-[19px] w-[19px]" strokeWidth={1.8} />
            </button>

            {/* ================= RIGHT ACTIONS ================= */}

            <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
              {/* ================= HOME - FIRST ================= */}

              <Link
                href="/"
                className="hidden rounded-md px-4 py-3 text-[14px] font-semibold text-white transition-colors duration-150 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A66B]/50 lg:flex"
              >
                Home
              </Link>

              {/* ================= ACCOUNT & LISTS - AFTER HOME ================= */}

              {/* <button
                type="button"
                onClick={handleAccountClick}
                className="hidden flex-col items-start rounded-md px-2 py-1.5 leading-tight text-white/90 transition-colors duration-150 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A66B]/50 lg:flex"
              >
                <span className="text-[11px] text-white/50">
                  {isLoggedIn ? "Welcome back" : "Hello, sign in"}
                </span>

                <span className="flex items-center gap-0.5 text-[13px] font-semibold">
                  Account
                  <ChevronDown className="h-3.5 w-3.5" strokeWidth={2} />
                </span>
              </button> */}

              {/* ================= ORDERS ================= */}

              <button
                type="button"
                onClick={handleOrdersClick}
                className="hidden flex-col items-start rounded-md px-2 py-1.5 leading-tight text-white/90 transition-colors duration-150 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A66B]/50 lg:flex"
              >
                <span className="text-[11px] text-white/50">Your</span>

                <span className="text-[13px] font-semibold">Orders</span>
              </button>

              {/* ================= WISHLIST ================= */}

              <Link
                href="/wishlist"
                aria-label="Wishlist"
                className="relative flex h-10 w-10 items-center justify-center rounded-full text-white/90 transition-colors duration-150 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A66B]/50"
              >
                <Heart className="h-[19px] w-[19px]" strokeWidth={1.6} />

                {wishlistItems.length > 0 && (
                  <span
                    className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[9px] font-bold text-[#121722]"
                    style={{
                      backgroundColor: COLORS.gold,
                    }}
                  >
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              {/* ================= MOBILE ACCOUNT ================= */}

              <button
                type="button"
                aria-label={isLoggedIn ? "Account" : "Log in"}
                onClick={handleAccountClick}
                className="relative flex h-10 w-10 items-center justify-center rounded-full text-white/90 transition-colors duration-150 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A66B]/50 lg:hidden"
              >
                <User className="h-[19px] w-[19px]" strokeWidth={1.6} />

                {isLoggedIn && (
                  <span
                    className="absolute bottom-1.5 right-1.5 h-2 w-2 rounded-full"
                    style={{
                      backgroundColor: COLORS.gold,
                      boxShadow: `0 0 0 2px ${COLORS.navy}`,
                    }}
                  />
                )}
              </button>

              {/* ================= CART ================= */}

              <Link
                href="/cart"
                aria-label="Cart"
                className="relative flex items-center gap-1 rounded-md px-2 py-1.5 text-white/90 transition-colors duration-150 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A66B]/50"
              >
                <span className="relative">
                  <ShoppingBag
                    className="h-[22px] w-[22px]"
                    strokeWidth={1.6}
                  />

                  {itemCount > 0 && (
                    <span
                      className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[9px] font-bold text-[#121722]"
                      style={{
                        backgroundColor: COLORS.gold,
                      }}
                    >
                      {itemCount}
                    </span>
                  )}
                </span>

                <span className="hidden text-[13px] font-semibold sm:block">
                  Cart
                </span>
              </Link>

              {/* ================= MOBILE MENU ================= */}

              <button
                type="button"
                aria-label="Open menu"
                onClick={() => setMobileMenuOpen(true)}
                className="flex h-10 w-10 items-center justify-center rounded-full text-white/90 transition-colors duration-150 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A66B]/50 lg:hidden"
              >
                <Menu className="h-[20px] w-[20px]" strokeWidth={1.8} />
              </button>
            </div>
          </div>
        </div>

        {/* ================= MOBILE DELIVERY STRIP ================= */}

        <button
          type="button"
          onClick={() => setMobileLocationOpen(true)}
          className="flex h-9 w-full items-center gap-2 border-t px-4 text-left transition-colors duration-200 hover:bg-white/[0.04] lg:hidden"
          style={{
            // Same #0f172a color
            backgroundColor: COLORS.navy,
            borderColor: COLORS.hairline,
          }}
        >
          <MapPin
            className="h-4 w-4 shrink-0 text-white/60"
            strokeWidth={1.8}
          />

          <span className="text-[11.5px] text-white/70">
            Deliver to{" "}
            <span className="font-semibold text-white">{selectedLocation}</span>
          </span>

          <ChevronDown
            className="ml-auto h-4 w-4 text-white/50"
            strokeWidth={2}
          />
        </button>
      </header>

      {/* ================= MOBILE LOCATION MODAL ================= */}

      {mobileLocationOpen && (
        <div className="fixed inset-0 z-[100] flex items-end bg-black/60 backdrop-blur-sm lg:hidden">
          <button
            type="button"
            aria-label="Close location selector"
            onClick={() => setMobileLocationOpen(false)}
            className="absolute inset-0"
          />

          <div
            className="relative z-10 w-full rounded-t-3xl border-t p-5 shadow-2xl"
            style={{
              backgroundColor: COLORS.navy,
              borderColor: COLORS.hairline,
            }}
          >
            <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-white/20" />

            <div className="mb-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Choose your location
                  </h3>

                  <p className="mt-1 text-xs text-white/50">
                    Enter your pincode to check delivery availability.
                  </p>
                </div>

                <button
                  type="button"
                  aria-label="Close location selector"
                  onClick={() => setMobileLocationOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-white/70 hover:bg-white/[0.08]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="pb-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  inputMode="numeric"
                  value={pincode}
                  onChange={(e) => handlePincodeChange(e.target.value)}
                  onKeyDown={handlePincodeKeyDown}
                  placeholder="Enter 6-digit pincode"
                  maxLength={6}
                  className="h-12 min-w-0 flex-1 rounded-xl border border-white/10 bg-white px-4 text-sm text-[#121722] outline-none"
                />

                <button
                  type="button"
                  onClick={checkPincode}
                  disabled={locationLoading || pincode.length !== 6}
                  className="flex h-12 min-w-[82px] items-center justify-center rounded-xl bg-[#C9A66B] px-4 text-sm font-bold text-[#121722] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {locationLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    "Check"
                  )}
                </button>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-white/50">
                We currently deliver only across Telangana and Andhra Pradesh.
              </p>

              {locationMessage && (
                <div
                  className={`mt-4 rounded-xl border p-4 ${
                    isDeliverable
                      ? "border-green-400/30 bg-green-400/10"
                      : "border-red-400/30 bg-red-400/10"
                  }`}
                >
                  <div className="flex gap-3">
                    {isDeliverable ? (
                      <Check className="h-5 w-5 shrink-0 text-green-400" />
                    ) : (
                      <X className="h-5 w-5 shrink-0 text-red-400" />
                    )}

                    <div>
                      <p
                        className={`text-sm font-medium ${
                          isDeliverable ? "text-green-300" : "text-red-300"
                        }`}
                      >
                        {locationMessage}
                      </p>

                      {locationDetails && (
                        <p className="mt-1 text-xs text-white/50">
                          {locationDetails.district}, {locationDetails.state} -{" "}
                          {locationDetails.pincode}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {locationDetails && isDeliverable && (
                <button
                  type="button"
                  onClick={clearLocation}
                  className="mt-4 text-sm font-semibold text-[#C9A66B]"
                >
                  Change location
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= MOBILE SEARCH MODAL ================= */}

      {searchOpen && (
        <div className="fixed inset-0 z-[75] flex items-start justify-center bg-black/60 px-4 pt-20 backdrop-blur-sm">
          <button
            type="button"
            aria-label="Close search"
            onClick={closeSearch}
            className="absolute inset-0"
          />

          <div
            className="relative w-full max-w-xl rounded-2xl border p-4 shadow-2xl"
            style={{
              backgroundColor: COLORS.navy,
              borderColor: COLORS.hairline,
            }}
          >
            <div className="flex items-center gap-3">
              <form
                onSubmit={handleSearchSubmit}
                className="flex h-12 flex-1 overflow-hidden rounded-lg ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-[#C9A66B]/60"
              >
                <div className="flex-1 bg-white">
                  <SearchBar
                    value={searchValue}
                    onChange={setSearchValue}
                    placeholder="Search rings, necklaces…"
                    autoFocus
                    className="h-12 rounded-none border-none bg-transparent text-[#121722] placeholder:text-slate-400"
                  />
                </div>

                <button
                  type="submit"
                  aria-label="Search"
                  className="flex w-12 shrink-0 items-center justify-center"
                  style={{
                    backgroundColor: COLORS.gold,
                  }}
                >
                  <Search className="h-5 w-5 text-[#121722]" strokeWidth={2} />
                </button>
              </form>

              <button
                type="button"
                aria-label="Close search"
                onClick={closeSearch}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/90 hover:bg-white/[0.08]"
              >
                <X className="h-[18px] w-[18px]" strokeWidth={1.6} />
              </button>
            </div>

            {searchValue.trim() && (
              <div className="mt-3 max-h-[60vh] overflow-y-auto rounded-xl bg-white">
                {searchResults.length > 0 ? (
                  <>
                    {renderResults(48)}

                    <button
                      type="button"
                      onClick={() => {
                        router.push(
                          `/products?q=${encodeURIComponent(
                            searchValue.trim(),
                          )}`,
                        );

                        setSearchOpen(false);
                        setSearchValue("");
                      }}
                      className="w-full p-3 text-center text-[12px] font-bold uppercase tracking-wide text-[#121722] hover:bg-[#FBF9F4]"
                    >
                      View all results for &ldquo;{searchValue}&rdquo;
                    </button>
                  </>
                ) : (
                  <div className="p-4 text-center text-sm text-slate-500">
                    No products found for &ldquo;{searchValue}&rdquo;
                  </div>
                )}
              </div>
            )}

            {!searchValue.trim() && (
              <p className="mt-3 text-xs tracking-wide text-white/40">
                Start typing to find products.
              </p>
            )}
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
