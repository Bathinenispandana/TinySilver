"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  MapPin,
  Package,
  Truck,
  Lock,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { formatPrice } from "@/lib/utils";
import AddressManager from "@/components/AddressManager";
import { Address } from "@/lib/api/addresses";

type DeliveryMethod = "standard" | "express";

export default function CheckoutPage() {
  const { items, subtotal } = useCart();
  const { account, isLoggedIn, openLogin, loading: authLoading, updateAccount } = useAuth();

  const [customer, setCustomer] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  const [delivery, setDelivery] = useState<DeliveryMethod>("standard");
  const [paymentError, setPaymentError] = useState<string | null>(null);

  useEffect(() => {
    // Check if we just returned from a failed payment
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("payment_status") === "failed") {
        setPaymentError("Your payment was declined or cancelled. Please try again.");
      }
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn && account) {
      setCustomer({
        fullName: account.name === "Guest User" ? "" : account.name,
        email: account.email,
        phone: account.phone,
      });
    }
  }, [isLoggedIn, account]);

  const deliveryCost =
    delivery === "express"
      ? 249
      : 0;

  const total = subtotal + deliveryCost;

  const [guestAddress, setGuestAddress] = useState({
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "India"
  });

  if (authLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#0f172a] border-t-transparent"></div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8 animate-fade-in">
        <Package className="mx-auto h-10 w-10 text-[#827e9c]" />
        <h1 className="mt-4 text-2xl font-semibold text-[#0f172a]">
          Your cart is empty
        </h1>
        <p className="mt-2 text-sm text-[#827e9c]">
          Add something beautiful before checking out.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-[#0f172a] px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-[#827e9c]"
        >
          Explore Products
        </Link>
      </div>
    );
  }

  const handlePayment = async () => {
    if (!customer.fullName.trim() || !customer.email.trim() || !customer.phone.trim()) {
      alert("Please fill in all contact details.");
      return;
    }

    if (isLoggedIn) {
      if (!selectedAddress) {
        alert("Please select or add a shipping address.");
        return;
      }
      if (customer.phone !== account?.phone || customer.fullName !== account?.name) {
        await updateAccount({ name: customer.fullName, phone: customer.phone });
      }
    } else {
      if (!guestAddress.address_line1.trim() || !guestAddress.city.trim() || !guestAddress.state.trim() || !guestAddress.postal_code.trim()) {
        alert("Please fill in all required shipping address fields.");
        return;
      }
    }

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer,
          is_guest: !isLoggedIn,
          address_id: isLoggedIn ? selectedAddress?.id : undefined,
          shipping_address: !isLoggedIn ? {
            full_name: customer.fullName,
            phone_number: customer.phone,
            ...guestAddress
          } : undefined,
          delivery_method: delivery,
          items: items.map(item => ({
            product_id: item.product.id,
            quantity: item.quantity,
            price: item.product.price
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to initialize payment");
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("Invalid response from payment gateway");
      }
    } catch (err: any) {
      console.error("Checkout error:", err);
      alert("Error initializing payment: " + err.message);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
        <h1 className="text-2xl font-semibold text-[#0f172a] sm:text-3xl">
          Checkout
        </h1>
        {!isLoggedIn && (
          <div className="text-sm">
            <span className="text-[#827e9c]">Already have an account? </span>
            <button onClick={openLogin} className="font-semibold text-[#0f172a] hover:underline">
              Log in
            </button>
          </div>
        )}
      </div>

      <p className="text-sm text-[#827e9c]">
        {isLoggedIn ? "Select your delivery address and proceed to secure payment." : "Checkout as a guest or log in for a faster experience."}
      </p>

      {paymentError && (
        <div className="mt-6 rounded-md bg-red-50 p-4 border border-red-200">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Payment Failed</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{paymentError}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        className="mt-8 grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_360px]"
      >
        <div className="flex flex-col gap-8">
          {/* Customer Information */}
          <section className="rounded-xl border border-[#c5c6cc] p-6 bg-white shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#0f172a] mb-5">
              Contact Information
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="fullName" className="mb-1.5 block text-xs font-medium text-[#827e9c]">
                  Full Name *
                </label>
                <input
                  id="fullName"
                  required
                  type="text"
                  value={customer.fullName}
                  onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                  className="w-full rounded-lg border border-[#c5c6cc] px-3.5 py-2.5 text-sm text-[#0f172a] outline-none transition-all duration-300 focus:border-[#827e9c]"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-[#827e9c]">
                  Email *
                </label>
                <input
                  id="email"
                  required
                  type="email"
                  value={customer.email}
                  disabled={isLoggedIn}
                  onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                  className={`w-full rounded-lg border border-[#c5c6cc] px-3.5 py-2.5 text-sm text-[#0f172a] outline-none ${isLoggedIn ? 'bg-gray-50 opacity-80' : 'transition-all duration-300 focus:border-[#827e9c]'}`}
                />
              </div>

              <div>
                <label htmlFor="phone" className="mb-1.5 block text-xs font-medium text-[#827e9c]">
                  Phone (for updates) *
                </label>
                <input
                  id="phone"
                  required
                  type="tel"
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  className="w-full rounded-lg border border-[#c5c6cc] px-3.5 py-2.5 text-sm text-[#0f172a] outline-none transition-all duration-300 focus:border-[#827e9c]"
                />
              </div>
            </div>
          </section>

          {/* Shipping Address */}
          <section className="rounded-xl border border-[#c5c6cc] p-6 bg-white shadow-sm">
            {isLoggedIn ? (
              <>
                <AddressManager 
                  selectable={true} 
                  onAddressSelect={setSelectedAddress}
                  selectedAddressId={selectedAddress?.id}
                />
                {!selectedAddress && (
                  <p className="text-xs text-red-500 mt-2">* Please select an address to continue</p>
                )}
              </>
            ) : (
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-[#0f172a] mb-5">
                  Shipping Address
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-xs font-medium text-[#827e9c]">Address Line 1 *</label>
                    <input
                      type="text"
                      required
                      value={guestAddress.address_line1}
                      onChange={(e) => setGuestAddress({ ...guestAddress, address_line1: e.target.value })}
                      className="w-full rounded-lg border border-[#c5c6cc] px-3 py-2 text-sm text-[#0f172a] outline-none focus:border-[#827e9c] transition-all"
                      placeholder="House No., Building, Street"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-xs font-medium text-[#827e9c]">Address Line 2 (Optional)</label>
                    <input
                      type="text"
                      value={guestAddress.address_line2}
                      onChange={(e) => setGuestAddress({ ...guestAddress, address_line2: e.target.value })}
                      className="w-full rounded-lg border border-[#c5c6cc] px-3 py-2 text-sm text-[#0f172a] outline-none focus:border-[#827e9c] transition-all"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-[#827e9c]">City *</label>
                    <input
                      type="text"
                      required
                      value={guestAddress.city}
                      onChange={(e) => setGuestAddress({ ...guestAddress, city: e.target.value })}
                      className="w-full rounded-lg border border-[#c5c6cc] px-3 py-2 text-sm text-[#0f172a] outline-none focus:border-[#827e9c] transition-all"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-[#827e9c]">State *</label>
                    <select
                      required
                      value={guestAddress.state}
                      onChange={(e) => setGuestAddress({ ...guestAddress, state: e.target.value })}
                      className="w-full rounded-lg border border-[#c5c6cc] px-3 py-2 text-sm text-[#0f172a] outline-none focus:border-[#827e9c] transition-all"
                    >
                      <option value="" disabled>Select State</option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Telangana">Telangana</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-[#827e9c]">Pincode *</label>
                    <input
                      type="text"
                      required
                      value={guestAddress.postal_code}
                      onChange={(e) => setGuestAddress({ ...guestAddress, postal_code: e.target.value })}
                      className="w-full rounded-lg border border-[#c5c6cc] px-3 py-2 text-sm text-[#0f172a] outline-none focus:border-[#827e9c] transition-all"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-[#827e9c]">Country</label>
                    <input
                      type="text"
                      disabled
                      value="India"
                      className="w-full rounded-lg border border-[#c5c6cc] bg-gray-50 px-3 py-2 text-sm text-[#0f172a] outline-none opacity-80"
                    />
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Delivery Method */}
          <section className="rounded-xl border border-[#c5c6cc] p-6 bg-white shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <Truck className="h-4 w-4 text-[#827e9c]" />
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[#0f172a]">
                Delivery Method
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label
                className={`relative flex cursor-pointer flex-col rounded-lg border p-4 transition-all duration-300 ${
                  delivery === "standard"
                    ? "border-[#0f172a] bg-[#0f172a]/5"
                    : "border-[#c5c6cc] hover:border-[#827e9c]"
                }`}
              >
                <input
                  type="radio"
                  name="delivery"
                  value="standard"
                  checked={delivery === "standard"}
                  onChange={() => setDelivery("standard")}
                  className="sr-only"
                />
                <span className="text-sm font-semibold text-[#0f172a]">
                  Standard Delivery
                </span>
                <span className="mt-1 text-xs text-[#827e9c]">
                  4-6 business days
                </span>
                <span className="mt-2 text-sm font-medium text-[#0f172a]">
                  Free
                </span>
              </label>

              <label
                className={`relative flex cursor-pointer flex-col rounded-lg border p-4 transition-all duration-300 ${
                  delivery === "express"
                    ? "border-[#0f172a] bg-[#0f172a]/5"
                    : "border-[#c5c6cc] hover:border-[#827e9c]"
                }`}
              >
                <input
                  type="radio"
                  name="delivery"
                  value="express"
                  checked={delivery === "express"}
                  onChange={() => setDelivery("express")}
                  className="sr-only"
                />
                <span className="text-sm font-semibold text-[#0f172a]">
                  Express Delivery
                </span>
                <span className="mt-1 text-xs text-[#827e9c]">
                  1-2 business days
                </span>
                <span className="mt-2 text-sm font-medium text-[#0f172a]">
                  ₹249
                </span>
              </label>
            </div>
          </section>
        </div>

        {/* Order Summary */}
        <div className="sticky top-24 rounded-xl border border-[#c5c6cc] bg-[#f8f8f9] p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-[#0f172a]">
            Order Summary
          </h2>

          <div className="mt-6 flex flex-col gap-4">
            {items.map((item) => (
              <div
                key={`${item.product.id}`}
                className="flex items-start gap-4"
              >
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border border-[#c5c6cc] bg-white">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#0f172a] text-[10px] font-bold text-white">
                    {item.quantity}
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-center">
                  <h3 className="text-sm font-medium text-[#0f172a] line-clamp-1">
                    {item.product.name}
                  </h3>
                  <p className="mt-1 text-xs text-[#827e9c]">
                    Weight: {item.product.weight || "N/A"}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#0f172a]">
                    {item.quantity > 1
                      ? `${item.quantity} × ${formatPrice(item.product.price)} = ${formatPrice(item.product.price * item.quantity)}`
                      : formatPrice(item.product.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-[#c5c6cc] pt-6">
            <dl className="flex flex-col gap-3 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-[#827e9c]">Subtotal</dt>
                <dd className="font-medium text-[#0f172a]">
                  {formatPrice(subtotal)}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-[#827e9c]">Delivery</dt>
                <dd className="font-medium text-[#0f172a]">
                  {deliveryCost === 0
                    ? "Free"
                    : formatPrice(deliveryCost)}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-[#c5c6cc] pt-3 text-base">
                <dt className="font-semibold text-[#0f172a]">Total</dt>
                <dd className="font-bold text-[#0f172a]">
                  {formatPrice(total)}
                </dd>
              </div>
            </dl>
          </div>

          <button
            type="button"
            onClick={handlePayment}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#0f172a] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#827e9c] shadow-sm"
          >
            <Lock className="h-4 w-4" />
            Pay Now
          </button>
          
          <p className="mt-4 text-center text-xs text-[#827e9c]">
            By placing your order, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}