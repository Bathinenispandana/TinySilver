import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Category } from "@/lib/categories";

export default function CategoryCard({
  category,
}: {
  category: Category;
}) {
  return (
    <div className="group">
      {/* Image Card */} 
      <Link
        href={`/products?category=${encodeURIComponent(category.name)}`}
        className="relative block aspect-[3/4] overflow-hidden rounded-xl bg-[#f5f5f6]"
      >
        <Image
          src={category.image}
          alt={category.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </Link>

      {/* Content Outside Card */}
      <div className="mt-3 px-1">
        <Link
          href={`/products?category=${encodeURIComponent(category.name)}`}
          className="block"
        >
          <h3 className="text-[#0f172a] text-base sm:text-lg font-medium">
            {category.name}
          </h3>
        </Link>

        <Link
          href={`/products?category=${encodeURIComponent(category.name)}`}
          className="mt-1 inline-flex items-center gap-1 text-xs sm:text-sm text-[#827e9c] hover:text-[#0f172a] transition-colors duration-300"
        >
          Shop Now
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}