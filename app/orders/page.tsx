"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { formatPrice } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

function statusColor(status: string) {
  if (status === "Delivered") return "text-[#0f172a] bg-[#c5c6cc]/40";
  if (status === "Shipped") return "text-[#827e9c] bg-[#827e9c]/10";
  return "text-[#827e9c] bg-[#c5c6cc]/30";
}

export default function OrdersPage() {
  const { isLoggedIn, account, openLogin } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      const fetchOrders = async () => {
        setLoadingOrders(true);
        
        // Fetch the active user's ID
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          const { data, error } = await supabase
            .from("orders")
            .select("*, order_items(*)")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false });
          
          if (!error && data) {
            setOrders(data);
          }
        }
        setLoadingOrders(false);
      };
      fetchOrders();
    }
  }, [isLoggedIn]);

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

              <div className="mt-5 flex justify-center gap-3">
                <button
                  onClick={openLogin}
                  className="inline-flex rounded-lg bg-[#0f172a] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1e293b]"
                >
                  Sign In
                </button>
                <Link
                  href="/"
                  className="inline-flex rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#0f172a] transition hover:bg-slate-50"
                >
                  Go to Home
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-8">
              {loadingOrders ? (
                <div className="flex justify-center p-10 border border-dashed border-slate-300 rounded-xl">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#0f172a] border-t-transparent"></div>
                </div>
              ) : orders.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-300 p-10 text-center">
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
              ) : (
                <div className="flex flex-col gap-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-slate-200 p-5 transition-shadow hover:shadow-md"
                    >
                      <div className="flex flex-col gap-1.5">
                        <span className="font-bold text-[#0f172a]">
                          Order #{order.id.split("-")[0].toUpperCase()}
                        </span>
                        <p className="text-sm text-slate-500">
                          Placed on {new Date(order.created_at).toLocaleDateString()}
                        </p>
                        <p className="mt-1 text-sm font-medium text-[#0f172a]">
                          {order.order_items?.length} items · {formatPrice(order.total_amount)}
                        </p>
                      </div>
                      
                      <div className="flex flex-col sm:items-end gap-3 self-start sm:self-center">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusColor(order.status)}`}
                        >
                          {order.status}
                        </span>
                        <Link 
                          href={`/orders/${order.id}`}
                          className="text-sm font-semibold text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
                        >
                          View Details
                          <span aria-hidden="true">&rarr;</span>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}