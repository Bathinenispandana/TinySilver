import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { collections, getCollectionBySlug } from "@/lib/collections";
import { products } from "@/lib/products";
import ProductGrid from "@/components/ProductGrid";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  return {
    title: collection ? `${collection.name} — SILVERAZ` : "Collection — SILVERAZ",
  };
}

export default async function CollectionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);

  if (!collection) notFound();

  const collectionProducts = products.filter(
    (p) => p.collection === collection.name
  );

  return (
    <div>
      <div className="relative h-[42vh] min-h-[280px] w-full overflow-hidden">
        <Image
          src={collection.image}
          alt={collection.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#0f172a]/50" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-10 w-full">
            <nav className="mb-3 text-xs text-white/80">
              <Link href="/collections" className="hover:text-white transition-colors duration-300">
                Collections
              </Link>
              <span className="mx-1.5">/</span>
              <span className="text-white">{collection.name}</span>
            </nav>
            <h1 className="text-3xl sm:text-4xl font-semibold text-white">
              {collection.name}
            </h1>
            <p className="mt-2 max-w-lg text-sm sm:text-base text-white/85">
              {collection.description}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
        <p className="mb-6 text-xs text-[#827e9c]">
          {collectionProducts.length} product
          {collectionProducts.length !== 1 ? "s" : ""}
        </p>
        <ProductGrid
          products={collectionProducts}
          emptyTitle="More pieces coming soon"
          emptyDescription="We're adding new designs to this collection. Check back shortly."
        />
      </div>
    </div>
  );
}
