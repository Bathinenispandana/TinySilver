import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Collection } from "@/lib/collections";

interface CollectionCardProps {
  collection: Collection;
  productCount?: number;
}

export default function CollectionCard({
  collection,
  productCount,
}: CollectionCardProps) {
  return (
    <div className="group flex flex-col">
      <Link
        href={`/collections/${collection.slug}`}
        className="relative block aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#f5f5f6]"
      >
        <Image
          src={collection.image}
          alt={collection.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="mt-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-lg font-semibold text-[#0f172a]">
            {collection.name}
          </h3>
          {typeof productCount === "number" && (
            <span className="text-xs text-[#827e9c] whitespace-nowrap">
              {productCount} pieces
            </span>
          )}
        </div>
        <p className="mt-1.5 text-sm text-[#827e9c] leading-relaxed">
          {collection.description}
        </p>
        <Link
          href={`/collections/${collection.slug}`}
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#0f172a] hover:text-[#827e9c] transition-colors duration-300"
        >
          Explore Collection
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
