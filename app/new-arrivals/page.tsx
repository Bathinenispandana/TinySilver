import { Suspense } from "react";
import { products } from "@/lib/products";
import ProductsClient from "@/app/products/ProductsClient";

export const metadata = {
  title: "New Arrivals — SILVERAZ",
};

export default function NewArrivalsPage() {
  const newProducts = products.filter((p) => p.isNew);
  return (
    <Suspense fallback={null}>
      <ProductsClient
        allProducts={newProducts}
        title="New Arrivals"
        description="Fresh designs. Timeless silver."
      />
    </Suspense>
  );
}
