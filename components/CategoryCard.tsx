import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Category } from "@/lib/categories";

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/products?category=${encodeURIComponent(category.name)}`}
      className="group relative block aspect-[3/4] overflow-hidden rounded-xl bg-[#f5f5f6]"
    >
      <Image
        src={category.image}
        alt={category.name}
        fill
        sizes="(max-width: 768px) 50vw, 25vw"
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#e8e8e8]/70 via-[#e8e8e8]/10 to-transparent transition-opacity duration-300 group-hover:from-[#0f172a]/80" />
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
        <h3 className="text-white text-base sm:text-lg font-medium">
          {category.name}
        </h3>
        <span className="mt-1 inline-flex items-center gap-1 text-xs sm:text-sm text-white/90">
          Shop Now
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
