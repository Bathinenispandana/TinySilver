import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { DollarSign, ShoppingBag, Clock, CheckCircle, Users, Truck, ArrowRight } from "lucide-react";
import Link from "next/link";
import dayjs from "dayjs";
import DashboardFilter from "./DashboardFilter";

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>;
}) {
  const supabase = await createClient();
  const { range } = await searchParams;

  // Determine start date based on range filter
  let startDate = null;
  const now = dayjs();
  
  if (range === "today") {
    startDate = now.startOf("day").toISOString();
  } else if (range === "7d") {
    startDate = now.subtract(7, "day").startOf("day").toISOString();
  } else if (range === "month") {
    startDate = now.startOf("month").toISOString();
  } else if (range === "year") {
    startDate = now.startOf("year").toISOString();
  }

  // 1. Fetch Orders
  let ordersQuery = supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (startDate) {
    ordersQuery = ordersQuery.gte("created_at", startDate);
  }

  const { data: rawOrders } = await ordersQuery;

  // 2. Fetch Profiles to get customer names for recent orders
  const userIds = rawOrders?.map(o => o.user_id) || [];
  let profiles: any[] = [];
  if (userIds.length > 0) {
    const { data: fetchedProfiles } = await supabaseAdmin
      .from("profiles")
      .select("id, full_name, email, role")
      .in("id", userIds);
    profiles = fetchedProfiles || [];
  }

  // Also fetch total registered users
  let customersQuery = supabaseAdmin
    .from("profiles")
    .select("*", { count: "exact", head: true })
    .neq("role", "ADMIN");

  if (startDate) {
    customersQuery = customersQuery.gte("created_at", startDate);
  }

  const { count: totalCustomersCount } = await customersQuery;

  const orders = rawOrders?.map(order => ({
    ...order,
    profiles: profiles.find(p => p.id === order.user_id)
  })) || [];

  // Metrics
  const validRevenueOrders = orders.filter(o => o.status !== "CANCELLED" && o.status !== "PENDING");
  
  const totalOrders = validRevenueOrders.length;
  const pendingOrders = orders.filter(o => o.status === "PENDING").length;
  const processingOrders = orders.filter(o => o.status === "PROCESSING").length;
  const dispatchedOrders = orders.filter(o => o.status === "DISPATCHED").length;
  const deliveredOrders = orders.filter(o => o.status === "DELIVERED").length;
  
  const totalRevenue = validRevenueOrders.reduce((sum, order) => sum + Number(order.total_amount), 0);
  const averageOrderValue = validRevenueOrders.length > 0 ? (totalRevenue / validRevenueOrders.length) : 0;

  // Recent 5 Orders (Excluding Abandoned Checkouts)
  const recentOrders = orders.filter(o => o.status !== "PENDING").slice(0, 5);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-orange-100 text-orange-800";
      case "PROCESSING":
        return "bg-blue-100 text-blue-800";
      case "DISPATCHED":
        return "bg-purple-100 text-purple-800";
      case "DELIVERED":
        return "bg-green-100 text-green-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#25314d]">Dashboard Overview</h1>
        
        {/* Time Filter Dropdown */}
        <DashboardFilter />
      </div>

      {/* Primary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-5">
          <div className="h-14 w-14 rounded-full bg-[#25314d] flex items-center justify-center text-[#C9A66B]">
            <DollarSign className="h-7 w-7" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Total Revenue</p>
            <p className="text-3xl font-bold text-[#25314d]">
              ₹{totalRevenue.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-5">
          <div className="h-14 w-14 rounded-full bg-slate-100 flex items-center justify-center text-[#25314d]">
            <ShoppingBag className="h-7 w-7" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Total Orders</p>
            <p className="text-3xl font-bold text-[#25314d]">{totalOrders}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-5">
          <div className="h-14 w-14 rounded-full bg-slate-100 flex items-center justify-center text-[#25314d]">
            <Users className="h-7 w-7" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Total Customers</p>
            <p className="text-3xl font-bold text-[#25314d]">{totalCustomersCount || 0}</p>
          </div>
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Average Order Value</p>
          <p className="text-xl font-bold text-[#25314d]">₹{averageOrderValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
        </div>
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm border-t-4 border-t-orange-400">
          <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Abandoned</p>
          <p className="text-xl font-bold text-[#25314d]">{pendingOrders}</p>
        </div>
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm border-t-4 border-t-blue-400">
          <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Processing</p>
          <p className="text-xl font-bold text-[#25314d]">{processingOrders}</p>
        </div>
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm border-t-4 border-t-purple-400">
          <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Dispatched</p>
          <p className="text-xl font-bold text-[#25314d]">{dispatchedOrders}</p>
        </div>
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm border-t-4 border-t-green-400">
          <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Delivered</p>
          <p className="text-xl font-bold text-[#25314d]">{deliveredOrders}</p>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#25314d]">Recent Orders</h2>
          <Link href="/admin/orders" className="text-sm font-semibold text-[#C9A66B] flex items-center hover:underline">
            View All <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        {recentOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-semibold">
                <tr>
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Ref ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Total Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono font-medium text-[#25314d]">
                      {order.display_id || "-"}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-500">
                      {order.id.slice(0, 8).toUpperCase()}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-[#25314d]">{order.profiles?.full_name?.trim() || order.shipping_address?.full_name || order.shipping_address?.name || "Guest"}</p>
                      <p className="text-xs text-slate-500">{order.profiles?.email}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {dayjs(order.created_at).format("DD MMM YYYY, hh:mm A")}
                    </td>
                    <td className="px-6 py-4 font-semibold text-[#25314d]">
                      ₹{Number(order.total_amount).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link 
                        href={`/admin/orders/${order.id}`}
                        className="text-sm font-semibold text-[#25314d] hover:text-[#C9A66B] transition-colors"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center flex flex-col items-center">
            <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
              <ShoppingBag className="h-8 w-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-medium text-[#25314d]">No orders yet</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-sm">
              When customers place orders, they will appear here automatically.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
