import { collections } from "@/lib/collections";
import { products } from "@/lib/products";
import CollectionCard from "@/components/CollectionCard";

export const metadata = {
  title: "Collections — SILVERAZ",
};

export default function CollectionsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="max-w-2xl">
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#0f172a]">
          Collections
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[#827e9c]">
          Curated edits of handcrafted silver, organised by occasion and
          mood.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
        {collections.map((collection) => (
          <CollectionCard
            key={collection.slug}
            collection={collection}
            productCount={
              products.filter((p) => p.collection === collection.name)
                .length
            }
          />
        ))}
      </div>
    </div>
  );
}
