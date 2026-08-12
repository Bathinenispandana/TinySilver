"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  CreditCard,
  Package,
  CheckCircle2,
  Truck,
  Zap,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { formatPrice } from "@/lib/utils";

type DeliveryMethod = "standard" | "express";
type PaymentMethod = "card" | "upi" | "cod";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const { account } = useAuth();

  const [placed, setPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [placedItems, setPlacedItems] = useState(items);
  const [placedTotal, setPlacedTotal] = useState(0);

  const [customer, setCustomer] = useState({
    fullName: account.name === "Guest User" ? "" : account.name,
    email: account.email,
    phone: account.phone,
  });
  const [address, setAddress] = useState({
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });
  const [delivery, setDelivery] = useState<DeliveryMethod>("standard");
  const [payment, setPayment] = useState<PaymentMethod>("cod");

  const deliveryCost = delivery === "express" ? 249 : subtotal >= 2000 ? 0 : 149;
  const total = subtotal + deliveryCost;

  if (items.length === 0 && !placed) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <Package className="mx-auto h-10 w-10 text-[#827e9c]" />
        <h1 className="mt-4 text-2xl font-semibold text-[#0f172a]">
          Your cart is empty
        </h1>
        <p className="mt-2 text-sm text-[#827e9c]">
          Add something beautiful before checking out.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-[#0f172a] text-white text-sm font-medium px-6 py-3 hover:bg-[#827e9c] transition-all duration-300"
        >
          Explore Products
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const number = `SRZ${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderNumber(number);
    setPlacedItems(items);
    setPlacedTotal(total);
    setPlaced(true);
    clearCart();
  };

  if (placed) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#c5c6cc]/40">
          <CheckCircle2 className="h-8 w-8 text-[#0f172a]" />
        </div>
        <h1 className="mt-6 text-2xl sm:text-3xl font-semibold text-[#0f172a]">
          Order Placed Successfully
        </h1>
        <p className="mt-2 text-sm text-[#827e9c]">
          Order number{" "}
          <span className="font-semibold text-[#0f172a]">{orderNumber}</span>
        </p>

        <div className="mt-8 rounded-xl border border-[#c5c6cc] p-6 text-left">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#0f172a]">
            Order Summary
          </h2>
          <div className="mt-4 flex flex-col gap-3">
            {placedItems.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-[#827e9c]">
                  {item.product.name} × {item.quantity}
                </span>
                <span className="font-medium text-[#0f172a]">
                  {formatPrice(item.product.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-[#c5c6cc] pt-4 text-sm font-semibold text-[#0f172a]">
            <span>Total Paid</span>
            <span>{formatPrice(placedTotal)}</span>
          </div>
        </div>

        <p className="mt-6 text-sm text-[#827e9c]">
          A confirmation has been sent to {customer.email || "your email"}.
          You can track this order anytime from your account.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-full bg-[#0f172a] text-white text-sm font-medium px-7 py-3.5 hover:bg-[#827e9c] transition-all duration-300"
          >
            Continue Shopping
          </Link>
          <Link
            href="/account"
            className="inline-flex items-center justify-center rounded-full border border-[#c5c6cc] text-[#0f172a] text-sm font-medium px-7 py-3.5 hover:bg-[#c5c6cc]/30 transition-all duration-300"
          >
            View Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <h1 className="text-2xl sm:text-3xl font-semibold text-[#0f172a]">
        Checkout
      </h1>

      <form
        onSubmit={handlePlaceOrder}
        className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 items-start"
      >
        <div className="flex flex-col gap-8">
          {/* Customer Information */}
          <section className="rounded-xl border border-[#c5c6cc] p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#0f172a]">
              Customer Information
            </h2>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label htmlFor="fullName" className="mb-1.5 block text-xs font-medium text-[#827e9c]">
                  Full Name
                </label>
                <input
                  id="fullName"
                  required
                  type="text"
                  value={customer.fullName}
                  onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                  className="w-full rounded-lg border border-[#c5c6cc] px-3.5 py-2.5 text-sm text-[#0f172a] outline-none focus:border-[#827e9c] transition-all duration-300"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-[#827e9c]">
                  Email
                </label>
                <input
                  id="email"
                  required
                  type="email"
                  value={customer.email}
                  onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                  className="w-full rounded-lg border border-[#c5c6cc] px-3.5 py-2.5 text-sm text-[#0f172a] outline-none focus:border-[#827e9c] transition-all duration-300"
                />
              </div>
              <div>
                <label htmlFor="phone" className="mb-1.5 block text-xs font-medium text-[#827e9c]">
                  Phone
                </label>
                <input
                  id="phone"
                  required
                  type="tel"
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  className="w-full rounded-lg border border-[#c5c6cc] px-3.5 py-2.5 text-sm text-[#0f172a] outline-none focus:border-[#827e9c] transition-all duration-300"
                />
              </div>
            </div>
          </section>

          {/* Shipping Address */}
          <section className="rounded-xl border border-[#c5c6cc] p-6">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#827e9c]" />
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[#0f172a]">
                Shipping Address
              </h2>
            </div>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label htmlFor="address" className="mb-1.5 block text-xs font-medium text-[#827e9c]">
                  Address
                </label>
                <input
                  id="address"
                  required
                  type="text"
                  value={address.address}
                  onChange={(e) => setAddress({ ...address, address: e.target.value })}
                  className="w-full rounded-lg border border-[#c5c6cc] px-3.5 py-2.5 text-sm text-[#0f172a] outline-none focus:border-[#827e9c] transition-all duration-300"
                />
              </div>
              <div>
                <label htmlFor="city" className="mb-1.5 block text-xs font-medium text-[#827e9c]">
                  City
                </label>
                <input
                  id="city"
                  required
                  type="text"
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  className="w-full rounded-lg border border-[#c5c6cc] px-3.5 py-2.5 text-sm text-[#0f172a] outline-none focus:border-[#827e9c] transition-all duration-300"
                />
              </div>
              <div>
                <label htmlFor="state" className="mb-1.5 block text-xs font-medium text-[#827e9c]">
                  State
                </label>
                <input
                  id="state"
                  required
                  type="text"
                  value={address.state}
                  onChange={(e) => setAddress({ ...address, state: e.target.value })}
                  className="w-full rounded-lg border border-[#c5c6cc] px-3.5 py-2.5 text-sm text-[#0f172a] outline-none focus:border-[#827e9c] transition-all duration-300"
                />
              </div>
              <div>
                <label htmlFor="pincode" className="mb-1.5 block text-xs font-medium text-[#827e9c]">
                  Pincode
                </label>
                <input
                  id="pincode"
                  required
                  type="text"
                  value={address.pincode}
                  onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                  className="w-full rounded-lg border border-[#c5c6cc] px-3.5 py-2.5 text-sm text-[#0f172a] outline-none focus:border-[#827e9c] transition-all duration-300"
                />
              </div>
              <div>
                <label htmlFor="country" className="mb-1.5 block text-xs font-medium text-[#827e9c]">
                  Country
                </label>
                <input
                  id="country"
                  required
                  type="text"
                  value={address.country}
                  onChange={(e) => setAddress({ ...address, country: e.target.value })}
                  className="w-full rounded-lg border border-[#c5c6cc] px-3.5 py-2.5 text-sm text-[#0f172a] outline-none focus:border-[#827e9c] transition-all duration-300"
                />
              </div>
            </div>
          </section>

          {/* Delivery Method */}
          <section className="rounded-xl border border-[#c5c6cc] p-6">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-[#827e9c]" />
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[#0f172a]">
                Delivery Method
              </h2>
            </div>
            <div className="mt-5 flex flex-col gap-3">
              <label
                className={`flex items-center justify-between rounded-lg border p-4 cursor-pointer transition-all duration-300 ${
                  delivery === "standard"
                    ? "border-[#0f172a]"
                    : "border-[#c5c6cc] hover:border-[#827e9c]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="delivery"
                    checked={delivery === "standard"}
                    onChange={() => setDelivery("standard")}
                    className="h-4 w-4 accent-[#0f172a]"
                  />
                  <div>
                    <p className="text-sm font-medium text-[#0f172a]">
                      Standard Delivery
                    </p>
                    <p className="text-xs text-[#827e9c]">
                      4-6 business days
                    </p>
                  </div>
                </div>
                <span className="text-sm font-medium text-[#0f172a]">
                  {subtotal >= 2000 ? "Free" : formatPrice(149)}
                </span>
              </label>
              <label
                className={`flex items-center justify-between rounded-lg border p-4 cursor-pointer transition-all duration-300 ${
                  delivery === "express"
                    ? "border-[#0f172a]"
                    : "border-[#c5c6cc] hover:border-[#827e9c]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="delivery"
                    checked={delivery === "express"}
                    onChange={() => setDelivery("express")}
                    className="h-4 w-4 accent-[#0f172a]"
                  />
                  <div>
                    <p className="text-sm font-medium text-[#0f172a]">
                      Express Delivery
                    </p>
                    <p className="text-xs text-[#827e9c]">
                      1-2 business days
                    </p>
                  </div>
                </div>
                <span className="text-sm font-medium text-[#0f172a]">
                  {formatPrice(249)}
                </span>
              </label>
            </div>
          </section>

          {/* Payment Method */}
          <section className="rounded-xl border border-[#c5c6cc] p-6">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-[#827e9c]" />
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[#0f172a]">
                Payment Method
              </h2>
            </div>
            <div className="mt-5 flex flex-col gap-3">
              {[
                { id: "card" as PaymentMethod, label: "Credit / Debit Card" },
                { id: "upi" as PaymentMethod, label: "UPI" },
                { id: "cod" as PaymentMethod, label: "Cash on Delivery" },
              ].map((method) => (
                <label
                  key={method.id}
                  className={`flex items-center gap-3 rounded-lg border p-4 cursor-pointer transition-all duration-300 ${
                    payment === method.id
                      ? "border-[#0f172a]"
                      : "border-[#c5c6cc] hover:border-[#827e9c]"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={payment === method.id}
                    onChange={() => setPayment(method.id)}
                    className="h-4 w-4 accent-[#0f172a]"
                  />
                  <span className="text-sm font-medium text-[#0f172a]">
                    {method.label}
                  </span>
                </label>
              ))}
            </div>
            <p className="mt-4 flex items-center gap-1.5 text-xs text-[#827e9c]">
              <Zap className="h-3.5 w-3.5" />
              This is a simulated checkout — no real payment will be
              processed.
            </p>
          </section>
        </div>

        {/* Order summary sidebar */}
        <div className="rounded-xl border border-[#c5c6cc] p-6 lg:sticky lg:top-24">
          <h2 className="text-base font-semibold text-[#0f172a]">
            Order Summary
          </h2>
          <div className="mt-4 flex flex-col gap-3 max-h-64 overflow-y-auto pr-1">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-[#827e9c] truncate pr-2">
                  {item.product.name} × {item.quantity}
                </span>
                <span className="shrink-0 font-medium text-[#0f172a]">
                  {formatPrice(item.product.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
          <dl className="mt-4 flex flex-col gap-3 border-t border-[#c5c6cc] pt-4 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-[#827e9c]">Subtotal</dt>
              <dd className="font-medium text-[#0f172a]">
                {formatPrice(subtotal)}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-[#827e9c]">Delivery</dt>
              <dd className="font-medium text-[#0f172a]">
                {deliveryCost === 0 ? "Free" : formatPrice(deliveryCost)}
              </dd>
            </div>
          </dl>
          <div className="mt-4 flex items-center justify-between border-t border-[#c5c6cc] pt-4">
            <span className="text-sm font-semibold text-[#0f172a]">
              Total
            </span>
            <span className="text-lg font-semibold text-[#0f172a]">
              {formatPrice(total)}
            </span>
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-[#0f172a] text-white text-sm font-semibold py-3.5 hover:bg-[#827e9c] transition-all duration-300"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
}
