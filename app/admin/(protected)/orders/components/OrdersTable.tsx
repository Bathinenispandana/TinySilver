"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { Eye, Clock, CheckCircle, Package, Truck, XCircle, CreditCard, Search, Download, Filter } from "lucide-react";

// Helper function for status badges
function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case "PENDING":
      return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700"><Clock className="w-3.5 h-3.5" /> Pending</span>;
    case "PAID":
      return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700"><CreditCard className="w-3.5 h-3.5" /> Paid</span>;
    case "PROCESSING":
      return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700"><Package className="w-3.5 h-3.5" /> Processing</span>;
    case "DISPATCHED":
      return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700"><Truck className="w-3.5 h-3.5" /> Dispatched</span>;
    case "DELIVERED":
      return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700"><CheckCircle className="w-3.5 h-3.5" /> Delivered</span>;
    case "CANCELLED":
      return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700"><XCircle className="w-3.5 h-3.5" /> Cancelled</span>;
    default:
      return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">{status}</span>;
  }
}

export default function OrdersTable({ initialOrders }: { initialOrders: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filteredOrders = useMemo(() => {
    return initialOrders.filter((order) => {
      // 1. Status Filter
      if (statusFilter !== "ALL" && order.status !== statusFilter) {
        return false;
      }
      
      // 2. Search Filter (Order ID, Customer Name, Email)
      if (searchTerm.trim() !== "") {
        const term = searchTerm.toLowerCase();
        const orderId = order.id.toLowerCase();
        const customerName = (order.profiles?.full_name || "Unknown").toLowerCase();
        const customerEmail = (order.profiles?.email || "").toLowerCase();
        
        if (!orderId.includes(term) && !customerName.includes(term) && !customerEmail.includes(term)) {
          return false;
        }
      }
      
      return true;
    });
  }, [initialOrders, searchTerm, statusFilter]);

  const handleExportCSV = () => {
    if (filteredOrders.length === 0) {
      alert("No orders to export.");
      return;
    }

    const headers = ["Order ID", "Customer Name", "Email", "Date", "Items", "Total Amount", "Status"];
    
    const rows = filteredOrders.map(order => {
      const date = new Date(order.created_at).toLocaleDateString("en-IN", {
        day: "numeric", month: "short", year: "numeric",
      });
      
      const itemsStr = order.items && order.items.length > 0 
        ? order.items.map((i: any) => `${i.quantity}x ${i.name}`).join(" | ")
        : "No items";

      // Escape quotes in strings to avoid CSV injection/breaking
      const escapeStr = (str: string) => `"${str.replace(/"/g, '""')}"`;
      
      return [
        order.id.split("-")[0].toUpperCase(),
        escapeStr(order.profiles?.full_name || "Unknown User"),
        escapeStr(order.profiles?.email || ""),
        escapeStr(date),
        escapeStr(itemsStr),
        order.total_amount,
        order.status
      ].join(",");
    });

    const csvContent = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Orders_Export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      {/* Filters and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-white p-4 rounded-lg border border-[#c5c6cc] shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          {/* Search */}
          <div className="relative w-full sm:max-w-xs">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-[#827e9c]" />
            </div>
            <input
              type="text"
              placeholder="Search ID, Name, Email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-9 pr-3 py-2 border border-[#c5c6cc] rounded-md text-sm focus:ring-[#C9A66B] focus:border-[#C9A66B] outline-none transition-colors"
            />
          </div>
          
          {/* Status Filter */}
          <div className="relative w-full sm:max-w-[200px] flex items-center">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-4 w-4 text-[#827e9c]" />
             </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="block w-full pl-9 pr-8 py-2 border border-[#c5c6cc] rounded-md text-sm focus:ring-[#C9A66B] focus:border-[#C9A66B] outline-none appearance-none bg-white"
            >
              <option value="ALL">All Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="PAID">Paid</option>
              <option value="PROCESSING">Processing</option>
              <option value="DISPATCHED">Dispatched</option>
              <option value="DELIVERED">Delivered</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
        </div>
        
        {/* Export Action */}
        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#c5c6cc] rounded-md text-sm font-medium text-[#25314d] hover:bg-slate-50 transition-colors shrink-0"
        >
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-[#c5c6cc] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#f5f5f6] text-[#827e9c] uppercase font-semibold text-xs">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4 min-w-[250px]">Products</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c5c6cc]">
              {filteredOrders && filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#f8f9fa] transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-[#0f172a]">
                      {order.id.split("-")[0].toUpperCase()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-[#0f172a]">
                        {(order.profiles as any)?.full_name || "Unknown User"}
                      </div>
                      <div className="text-xs text-[#827e9c]">
                        {(order.profiles as any)?.email}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        {order.items && order.items.length > 0 ? (
                          order.items.map((item: any) => (
                            <div key={item.id} className="text-xs text-[#0f172a] truncate max-w-[250px]">
                              <span className="font-medium">{item.quantity}x</span> {item.name} 
                              <span className="text-[#827e9c] ml-1">(ID: {item.product_id})</span>
                            </div>
                          ))
                        ) : (
                          <span className="text-xs text-[#827e9c]">No items found</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[#827e9c]">
                      {new Date(order.created_at).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 font-semibold text-[#0f172a]">
                      {formatPrice(order.total_amount)}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[#0f172a] text-white rounded-md hover:bg-[#0f172a]/90 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" /> View
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <Package className="h-10 w-10 text-[#c5c6cc] mb-3" />
                      <p className="text-[#0f172a] font-medium">No orders found</p>
                      <p className="text-sm text-[#827e9c] mt-1">Try adjusting your search or filters.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
