"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const hasMultiple = images.length > 1;

  const goPrev = () => setActive((i) => (i - 1 + images.length) % images.length);
  const goNext = () => setActive((i) => (i + 1) % images.length);

  return (
    <div>
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-[#f5f5f6]">
        <Image
          src={images[active]}
          alt={`${name} — image ${active + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
        {hasMultiple && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={goPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-sm transition-all duration-300"
            >
              <ChevronLeft className="h-4.5 w-4.5 text-[#0f172a]" />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={goNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-sm transition-all duration-300"
            >
              <ChevronRight className="h-4.5 w-4.5 text-[#0f172a]" />
            </button>
          </>
        )}
      </div>

      {hasMultiple && (
        <div className="mt-4 flex items-center gap-3">
          {images.map((img, i) => (
            <button
              key={img + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              aria-current={active === i}
              className={`relative h-16 w-16 sm:h-20 sm:w-20 overflow-hidden rounded-lg border transition-all duration-300 ${
                active === i
                  ? "border-[#0f172a]"
                  : "border-[#c5c6cc] hover:border-[#827e9c]"
              }`}
            >
              <Image
                src={img}
                alt={`${name} thumbnail ${i + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
