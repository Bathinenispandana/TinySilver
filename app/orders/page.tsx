"use client";

import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function OrdersPage() {
  const { isLoggedIn } = useAuth();

  return (
    <main className="min-h-screen bg-[#f8fafc] px-4 py-10">
      <div className="mx-auto max-w-5xl">
        {/* Back to Home */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0f172a] transition-opacity hover:opacity-70"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        {/* Orders Container */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          {/* Header */}
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0f172a]">
              <ShoppingBag className="h-6 w-6 text-white" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-[#0f172a]">
                Your Orders
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                View and manage your Tiny Silver orders.
              </p>
            </div>
          </div>

          {/* Login / Orders Content */}
          {!isLoggedIn ? (
            <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-6 text-center">
              <h2 className="text-lg font-semibold text-[#0f172a]">
                Please sign in to view your orders
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Sign in to access your order history.
              </p>

              <Link
                href="/"
                className="mt-5 inline-flex rounded-lg bg-[#0f172a] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1e293b]"
              >
                Go to Home
              </Link>
            </div>
          ) : (
            <div className="mt-8 rounded-xl border border-dashed border-slate-300 p-10 text-center">
              <ShoppingBag className="mx-auto h-10 w-10 text-slate-400" />

              <h2 className="mt-4 text-lg font-semibold text-[#0f172a]">
                No orders yet
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Your orders will appear here after you make a purchase.
              </p>

              <Link
                href="/products"
                className="mt-5 inline-flex rounded-lg bg-[#0f172a] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1e293b]"
              >
                Start Shopping
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}