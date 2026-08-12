import { Product } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import EmptyState from "@/components/EmptyState";
import { PackageSearch } from "lucide-react";

interface ProductGridProps {
  products: Product[];
  emptyTitle?: string;
  emptyDescription?: string;
}

export default function ProductGrid({
  products,
  emptyTitle = "No products found",
  emptyDescription = "Try adjusting your filters or search terms.",
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <EmptyState
        icon={<PackageSearch className="h-10 w-10" />}
        title={emptyTitle}
        description={emptyDescription}
      />
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
