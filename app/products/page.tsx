import { Suspense } from "react";
import { products } from "@/lib/products";
import ProductsClient from "./ProductsClient";

export const metadata = {
  title: "Shop All Silver Jewellery — SILVERAZ",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const key = new URLSearchParams(
    params as Record<string, string>
  ).toString();

  return (
    <Suspense fallback={null}>
      <ProductsClient
        key={key}
        allProducts={products}
        title="Silver Jewellery"
        description="Handcrafted 925 sterling silver, made for everyday elegance and special occasions alike."
      />
    </Suspense>
  );
}
