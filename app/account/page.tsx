"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import { formatPrice } from "@/lib/utils";

type Tab =
  | "profile"
  | "orders"
  | "wishlist"
  | "addresses"
  | "payment"
  | "settings";

const TABS: { id: Tab; label: string; icon: typeof User }[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "orders", label: "Orders", icon: Package },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "payment", label: "Payment Methods", icon: CreditCard },
  { id: "settings", label: "Settings", icon: Settings },
];

const SAMPLE_ORDERS = [
  {
    id: "SRZ1024",
    date: "Aug 10, 2026",
    item: "Classic Sterling Silver Ring",
    price: 2499,
    status: "Delivered",
  },
  {
    id: "SRZ1018",
    date: "Jul 22, 2026",
    item: "Oxidised Silver Necklace",
    price: 4499,
    status: "Delivered",
  },
  {
    id: "SRZ1009",
    date: "Jun 30, 2026",
    item: "Minimal Silver Earrings",
    price: 1599,
    status: "Shipped",
  },
];

function statusColor(status: string) {
  if (status === "Delivered") return "text-[#0f172a] bg-[#c5c6cc]/40";
  if (status === "Shipped") return "text-[#827e9c] bg-[#827e9c]/10";
  return "text-[#827e9c] bg-[#c5c6cc]/30";
}

export default function AccountPage() {
  const { isLoggedIn, account, updateAccount, logout } = useAuth();
  const { items: wishlistItems } = useWishlist();
  const { showToast } = useToast();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [form, setForm] = useState(account);
  const [editing, setEditing] = useState(false);

  if (!isLoggedIn) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-2xl font-semibold text-[#0f172a]">
          You&apos;re not signed in
        </h1>
        <p className="mt-2 text-sm text-[#827e9c]">
          Sign in to view your account dashboard.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-[#0f172a] text-white text-sm font-medium px-6 py-3 hover:bg-[#827e9c] transition-all duration-300"
        >
          Go to Homepage
        </Link>
      </div>
    );
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateAccount(form);
    setEditing(false);
    showToast("Profile updated");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <h1 className="text-2xl sm:text-3xl font-semibold text-[#0f172a]">
        Hello, {account.name || "Customer"}
      </h1>
      <p className="mt-2 text-sm sm:text-base text-[#827e9c]">
        Welcome back to your account.
      </p>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10">
        <aside>
          <nav className="flex lg:flex-col gap-1 overflow-x-auto pb-2 lg:pb-0">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 whitespace-nowrap rounded-lg px-4 py-3 text-sm font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-[#0f172a] text-white"
                      : "text-[#0f172a] hover:bg-[#c5c6cc]/30"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
            <button
              onClick={() => {
                logout();
                showToast("Logged out");
                router.push("/");
              }}
              className="flex items-center gap-3 whitespace-nowrap rounded-lg px-4 py-3 text-sm font-medium text-[#827e9c] hover:bg-[#c5c6cc]/30 transition-all duration-300"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </nav>
        </aside>

        <div className="rounded-xl border border-[#c5c6cc] p-6 sm:p-8">
          {activeTab === "profile" && (
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-[#0f172a]">
                  Profile
                </h2>
                {!editing && (
                  <button
                    onClick={() => {
                      setForm(account);
                      setEditing(true);
                    }}
                    className="text-sm font-medium text-[#0f172a] hover:text-[#827e9c] transition-colors duration-300"
                  >
                    Edit
                  </button>
                )}
              </div>

              {editing ? (
                <form onSubmit={handleSave} className="mt-6 flex flex-col gap-4 max-w-sm">
                  <div>
                    <label htmlFor="acc-name" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#0f172a]">
                      Name
                    </label>
                    <input
                      id="acc-name"
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full rounded-lg border border-[#c5c6cc] px-3.5 py-2.5 text-sm text-[#0f172a] outline-none focus:border-[#827e9c] transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="acc-email" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#0f172a]">
                      Email
                    </label>
                    <input
                      id="acc-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full rounded-lg border border-[#c5c6cc] px-3.5 py-2.5 text-sm text-[#0f172a] outline-none focus:border-[#827e9c] transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="acc-phone" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#0f172a]">
                      Phone
                    </label>
                    <input
                      id="acc-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full rounded-lg border border-[#c5c6cc] px-3.5 py-2.5 text-sm text-[#0f172a] outline-none focus:border-[#827e9c] transition-all duration-300"
                    />
                  </div>
                  <div className="flex gap-3 mt-2">
                    <button
                      type="submit"
                      className="rounded-full bg-[#0f172a] text-white text-sm font-medium px-6 py-2.5 hover:bg-[#827e9c] transition-all duration-300"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditing(false)}
                      className="rounded-full border border-[#c5c6cc] text-[#0f172a] text-sm font-medium px-6 py-2.5 hover:bg-[#c5c6cc]/30 transition-all duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <dl className="mt-6 flex flex-col gap-4 max-w-sm text-sm">
                  <div>
                    <dt className="text-[#827e9c]">Name</dt>
                    <dd className="mt-0.5 font-medium text-[#0f172a]">
                      {account.name || "—"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[#827e9c]">Email</dt>
                    <dd className="mt-0.5 font-medium text-[#0f172a]">
                      {account.email || "—"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[#827e9c]">Phone</dt>
                    <dd className="mt-0.5 font-medium text-[#0f172a]">
                      {account.phone || "—"}
                    </dd>
                  </div>
                </dl>
              )}
            </div>
          )}

          {activeTab === "orders" && (
            <div>
              <h2 className="text-lg font-semibold text-[#0f172a]">Orders</h2>
              <div className="mt-6 flex flex-col gap-4">
                {SAMPLE_ORDERS.map((order) => (
                  <div
                    key={order.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border border-[#c5c6cc] p-4"
                  >
                    <div>
                      <p className="text-sm font-semibold text-[#0f172a]">
                        Order #{order.id}
                      </p>
                      <p className="text-xs text-[#827e9c]">
                        Placed on {order.date}
                      </p>
                      <p className="mt-1 text-sm text-[#0f172a]">
                        {order.item} · {formatPrice(order.price)}
                      </p>
                    </div>
                    <span
                      className={`self-start sm:self-center rounded-full px-3 py-1 text-xs font-medium ${statusColor(order.status)}`}
                    >
                      {order.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "wishlist" && (
            <div>
              <h2 className="text-lg font-semibold text-[#0f172a]">
                Wishlist
              </h2>
              {wishlistItems.length === 0 ? (
                <p className="mt-4 text-sm text-[#827e9c]">
                  Your wishlist is empty.{" "}
                  <Link href="/products" className="font-medium text-[#0f172a] hover:text-[#827e9c] transition-colors duration-300">
                    Explore products
                  </Link>
                </p>
              ) : (
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {wishlistItems.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.id}`}
                      className="flex items-center gap-3 rounded-lg border border-[#c5c6cc] p-3 hover:border-[#827e9c] transition-all duration-300"
                    >
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-[#f5f5f6]">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-[#0f172a] truncate">
                          {product.name}
                        </p>
                        <p className="text-xs text-[#827e9c]">
                          {formatPrice(product.price)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "addresses" && (
            <div>
              <h2 className="text-lg font-semibold text-[#0f172a]">
                Addresses
              </h2>
              <div className="mt-6 rounded-lg border border-[#c5c6cc] p-4 max-w-sm">
                <p className="text-sm font-medium text-[#0f172a]">
                  {account.name || "Customer"}
                </p>
                <p className="mt-1 text-sm text-[#827e9c]">
                  123 MG Road, Uppal Kalan
                  <br />
                  Hyderabad, Telangana 500039
                  <br />
                  India
                </p>
                <span className="mt-3 inline-block rounded-full bg-[#c5c6cc]/40 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#0f172a]">
                  Default
                </span>
              </div>
              <button
                onClick={() => showToast("Address form coming soon")}
                className="mt-4 text-sm font-medium text-[#0f172a] hover:text-[#827e9c] transition-colors duration-300"
              >
                + Add New Address
              </button>
            </div>
          )}

          {activeTab === "payment" && (
            <div>
              <h2 className="text-lg font-semibold text-[#0f172a]">
                Payment Methods
              </h2>
              <p className="mt-4 text-sm text-[#827e9c]">
                No saved payment methods yet. Payment details are entered
                securely at checkout.
              </p>
              <button
                onClick={() => showToast("Payment method form coming soon")}
                className="mt-4 text-sm font-medium text-[#0f172a] hover:text-[#827e9c] transition-colors duration-300"
              >
                + Add Payment Method
              </button>
            </div>
          )}

          {activeTab === "settings" && (
            <div>
              <h2 className="text-lg font-semibold text-[#0f172a]">
                Settings
              </h2>
              <div className="mt-6 flex flex-col gap-4 max-w-sm text-sm">
                <label className="flex items-center justify-between rounded-lg border border-[#c5c6cc] p-4">
                  <span className="text-[#0f172a]">Email notifications</span>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 accent-[#0f172a]"
                  />
                </label>
                <label className="flex items-center justify-between rounded-lg border border-[#c5c6cc] p-4">
                  <span className="text-[#0f172a]">SMS order updates</span>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 accent-[#0f172a]"
                  />
                </label>
                <label className="flex items-center justify-between rounded-lg border border-[#c5c6cc] p-4">
                  <span className="text-[#0f172a]">Marketing emails</span>
                  <input type="checkbox" className="h-4 w-4 accent-[#0f172a]" />
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
