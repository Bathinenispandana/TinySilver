import { createClient } from "@/lib/supabase/server";
import { products as catalogProducts } from "@/lib/products"; // Import the static catalog
import OrdersTable from "./components/OrdersTable";

export default async function AdminOrdersPage() {
  const supabase = await createClient();

  // Fetch all orders
  const { data: rawOrders, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching orders:", error.message || error);
  }

  // Fetch profiles and order items for these orders manually
  const userIds = rawOrders?.map(o => o.user_id) || [];
  const orderIds = rawOrders?.map(o => o.id) || [];
  
  let profiles: any[] = [];
  let allOrderItems: any[] = [];
  
  if (userIds.length > 0) {
    const { data: fetchedProfiles } = await supabase
      .from("profiles")
      .select("id, full_name, email")
      .in("id", userIds);
    profiles = fetchedProfiles || [];
  }

  if (orderIds.length > 0) {
    const { data: fetchedItems } = await supabase
      .from("order_items")
      .select("*")
      .in("order_id", orderIds);
    allOrderItems = fetchedItems || [];
  }

  // Merge the data
  const orders = rawOrders?.map(order => ({
    ...order,
    profiles: profiles.find(p => p.id === order.user_id),
    items: allOrderItems.filter(item => item.order_id === order.id).map(item => {
      const p = catalogProducts.find(cp => cp.id.toString() === item.product_id);
      return {
        ...item,
        name: p?.name || "Unknown Product"
      };
    })
  })) || [];


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#0f172a]">Manage Orders</h1>
      </div>

      <OrdersTable initialOrders={orders} />
    </div>
  );
}
