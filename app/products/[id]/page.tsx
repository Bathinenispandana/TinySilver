import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProductById, getRelatedProducts, products } from "@/lib/products";
import ProductDetailsClient from "./ProductDetailsClient";
import ProductCard from "@/components/ProductCard";

export function generateStaticParams() {
  return products.map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(Number(id));
  return { title: product ? `${product.name} — SILVERAZ` : "Product — SILVERAZ" };
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(Number(id));

  if (!product) notFound();

  const related = getRelatedProducts(product);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <nav className="mb-8 text-xs text-[#827e9c]">
        <Link href="/" className="hover:text-[#0f172a] transition-colors duration-300">
          Home
        </Link>
        <span className="mx-1.5">/</span>
        <Link href="/products" className="hover:text-[#0f172a] transition-colors duration-300">
          Shop
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-[#0f172a]">{product.name}</span>
      </nav>

      <ProductDetailsClient product={product} />

      {related.length > 0 && (
        <section className="mt-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-[#0f172a]">
              You May Also Like
            </h2>
            <Link
              href={`/products?category=${encodeURIComponent(product.category)}`}
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-[#0f172a] hover:text-[#827e9c] transition-colors duration-300"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
