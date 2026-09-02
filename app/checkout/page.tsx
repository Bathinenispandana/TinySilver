"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Package,
  Truck,
  MessageCircle,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { formatPrice } from "@/lib/utils";
import { sendWhatsAppMessage } from "@/lib/whatsapp";

type DeliveryMethod = "standard" | "express";

export default function CheckoutPage() {
  const { items, subtotal } = useCart();
  const { account } = useAuth();

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

  const [delivery, setDelivery] =
    useState<DeliveryMethod>("standard");

  const deliveryCost =
    delivery === "express"
      ? 249
      : subtotal >= 2000
      ? 0
      : 149;

  const total = subtotal + deliveryCost;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
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

  const handleWhatsAppOrder = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (
      !customer.fullName.trim() ||
      !customer.email.trim() ||
      !customer.phone.trim() ||
      !address.address.trim() ||
      !address.city.trim() ||
      !address.state.trim() ||
      !address.pincode.trim()
    ) {
      alert("Please fill in all customer and delivery details.");
      return;
    }

    const productDetails = items
      .map((item, index) => {
        const itemTotal =
          item.product.price * item.quantity;

        return `${index + 1}. ${item.product.name}
Quantity: ${item.quantity}
Price: ${formatPrice(item.product.price)}
Item Total: ${formatPrice(itemTotal)}`;
      })
      .join("\n\n");

    const deliveryName =
      delivery === "express"
        ? "Express Delivery (1-2 business days)"
        : "Standard Delivery (4-6 business days)";

    const message = `Hello TinySilver Team,

I would like to place an order. Please find my order details below.

*CUSTOMER DETAILS*
Name: ${customer.fullName}
Email: ${customer.email}
Phone: ${customer.phone}

*DELIVERY ADDRESS*
${address.address}
${address.city}, ${address.state}
Pincode: ${address.pincode}
Country: ${address.country}

*ORDER DETAILS*
${productDetails}

*DELIVERY METHOD*
${deliveryName}

*PAYMENT SUMMARY*
Subtotal: ${formatPrice(subtotal)}
Delivery Charges: ${
  deliveryCost === 0 ? "Free" : formatPrice(deliveryCost)
}

*TOTAL AMOUNT: ${formatPrice(total)}*

Please share the payment details or UPI QR code so I can complete the payment.

Thank you.`;


    sendWhatsAppMessage(message);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <h1 className="text-2xl font-semibold text-[#0f172a] sm:text-3xl">
        Checkout
      </h1>

      <p className="mt-2 text-sm text-[#827e9c]">
        Complete your details and place your order through WhatsApp.
      </p>

      <form
        onSubmit={handleWhatsAppOrder}
        className="mt-8 grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_360px]"
      >
        <div className="flex flex-col gap-8">

          {/* Customer Information */}
          <section className="rounded-xl border border-[#c5c6cc] p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#0f172a]">
              Customer Information
            </h2>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">

              <div className="sm:col-span-2">
                <label
                  htmlFor="fullName"
                  className="mb-1.5 block text-xs font-medium text-[#827e9c]"
                >
                  Full Name
                </label>

                <input
                  id="fullName"
                  required
                  type="text"
                  value={customer.fullName}
                  onChange={(e) =>
                    setCustomer({
                      ...customer,
                      fullName: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-[#c5c6cc] px-3.5 py-2.5 text-sm text-[#0f172a] outline-none transition-all duration-300 focus:border-[#827e9c]"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-xs font-medium text-[#827e9c]"
                >
                  Email
                </label>

                <input
                  id="email"
                  required
                  type="email"
                  value={customer.email}
                  onChange={(e) =>
                    setCustomer({
                      ...customer,
                      email: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-[#c5c6cc] px-3.5 py-2.5 text-sm text-[#0f172a] outline-none transition-all duration-300 focus:border-[#827e9c]"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-1.5 block text-xs font-medium text-[#827e9c]"
                >
                  Phone
                </label>

                <input
                  id="phone"
                  required
                  type="tel"
                  value={customer.phone}
                  onChange={(e) =>
                    setCustomer({
                      ...customer,
                      phone: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-[#c5c6cc] px-3.5 py-2.5 text-sm text-[#0f172a] outline-none transition-all duration-300 focus:border-[#827e9c]"
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

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">

              <div className="sm:col-span-2">
                <label
                  htmlFor="address"
                  className="mb-1.5 block text-xs font-medium text-[#827e9c]"
                >
                  Address
                </label>

                <input
                  id="address"
                  required
                  type="text"
                  value={address.address}
                  onChange={(e) =>
                    setAddress({
                      ...address,
                      address: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-[#c5c6cc] px-3.5 py-2.5 text-sm text-[#0f172a] outline-none transition-all duration-300 focus:border-[#827e9c]"
                />
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="mb-1.5 block text-xs font-medium text-[#827e9c]"
                >
                  City
                </label>

                <input
                  id="city"
                  required
                  type="text"
                  value={address.city}
                  onChange={(e) =>
                    setAddress({
                      ...address,
                      city: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-[#c5c6cc] px-3.5 py-2.5 text-sm text-[#0f172a] outline-none transition-all duration-300 focus:border-[#827e9c]"
                />
              </div>

              <div>
                <label
                  htmlFor="state"
                  className="mb-1.5 block text-xs font-medium text-[#827e9c]"
                >
                  State
                </label>

                <input
                  id="state"
                  required
                  type="text"
                  value={address.state}
                  onChange={(e) =>
                    setAddress({
                      ...address,
                      state: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-[#c5c6cc] px-3.5 py-2.5 text-sm text-[#0f172a] outline-none transition-all duration-300 focus:border-[#827e9c]"
                />
              </div>

              <div>
                <label
                  htmlFor="pincode"
                  className="mb-1.5 block text-xs font-medium text-[#827e9c]"
                >
                  Pincode
                </label>

                <input
                  id="pincode"
                  required
                  type="text"
                  value={address.pincode}
                  onChange={(e) =>
                    setAddress({
                      ...address,
                      pincode: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-[#c5c6cc] px-3.5 py-2.5 text-sm text-[#0f172a] outline-none transition-all duration-300 focus:border-[#827e9c]"
                />
              </div>

              <div>
                <label
                  htmlFor="country"
                  className="mb-1.5 block text-xs font-medium text-[#827e9c]"
                >
                  Country
                </label>

                <input
                  id="country"
                  required
                  type="text"
                  value={address.country}
                  onChange={(e) =>
                    setAddress({
                      ...address,
                      country: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-[#c5c6cc] px-3.5 py-2.5 text-sm text-[#0f172a] outline-none transition-all duration-300 focus:border-[#827e9c]"
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
                className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-all duration-300 ${
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
                    onChange={() =>
                      setDelivery("standard")
                    }
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
                  {subtotal >= 2000
                    ? "Free"
                    : formatPrice(149)}
                </span>
              </label>

              <label
                className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-all duration-300 ${
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
                    onChange={() =>
                      setDelivery("express")
                    }
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

          {/* WhatsApp Payment Information */}
          <section className="rounded-xl border border-[#c5c6cc] bg-[#c5c6cc]/10 p-6">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-[#0f172a]" />

              <h2 className="text-sm font-semibold uppercase tracking-wider text-[#0f172a]">
                Payment via WhatsApp
              </h2>
            </div>

            <p className="mt-3 text-sm leading-6 text-[#827e9c]">
              After you click <strong>Order on WhatsApp</strong>,
              WhatsApp will open with your complete order details.
              Send the message to us and we will share the payment
              details or UPI QR code with you.
            </p>
          </section>
        </div>

        {/* Order Summary */}
        <div className="rounded-xl border border-[#c5c6cc] p-6 lg:sticky lg:top-24">
          <h2 className="text-base font-semibold text-[#0f172a]">
            Order Summary
          </h2>

          <div className="mt-4 flex max-h-64 flex-col gap-3 overflow-y-auto pr-1">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center justify-between text-sm"
              >
                <span className="truncate pr-2 text-[#827e9c]">
                  {item.product.name} × {item.quantity}
                </span>

                <span className="shrink-0 font-medium text-[#0f172a]">
                  {formatPrice(
                    item.product.price * item.quantity
                  )}
                </span>
              </div>
            ))}
          </div>

          <dl className="mt-4 flex flex-col gap-3 border-t border-[#c5c6cc] pt-4 text-sm">

            <div className="flex items-center justify-between">
              <dt className="text-[#827e9c]">
                Subtotal
              </dt>

              <dd className="font-medium text-[#0f172a]">
                {formatPrice(subtotal)}
              </dd>
            </div>

            <div className="flex items-center justify-between">
              <dt className="text-[#827e9c]">
                Delivery
              </dt>

              <dd className="font-medium text-[#0f172a]">
                {deliveryCost === 0
                  ? "Free"
                  : formatPrice(deliveryCost)}
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
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:opacity-90"
          >
            <MessageCircle className="h-4 w-4" />
            Order on WhatsApp
          </button>

          <p className="mt-3 text-center text-xs text-[#827e9c]">
            Payment details will be shared with you on WhatsApp.
          </p>
        </div>
      </form>
    </div>
  );
}