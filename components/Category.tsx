
"use client";

import React, { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { categories } from "@/lib/categories";
import CategoryCard from "@/components/CategoryCard";

export default function Category() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);

  // Manual scroll
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -350,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 350,
        behavior: "smooth",
      });
    }
  };

  // Automatic scroll
  const startAutoScroll = () => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
    }

    autoScrollRef.current = setInterval(() => {
      if (!carouselRef.current) return;

      const carousel = carouselRef.current;

      const maxScroll =
        carousel.scrollWidth - carousel.clientWidth;

      // If reached the end, go back to the beginning
      if (carousel.scrollLeft >= maxScroll - 10) {
        carousel.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        carousel.scrollBy({
          left: 300,
          behavior: "smooth",
        });
      }
    }, 3000);
  };

  const stopAutoScroll = () => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    }
  };

  // Start automatic scrolling
  useEffect(() => {
    startAutoScroll();

    return () => {
      stopAutoScroll();
    };
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 bg-[#e8e8e8] sm:px-6 lg:px-8 py-10 sm:py-14">

      {/* Heading */}
      <div className="text-center max-w-xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#0f172a]">
          Shop By Category
        </h2>

        <p className="mt-2 text-sm sm:text-base text-[#0f172a]/60">
          Explore every silhouette, from everyday staples to statement pieces.
        </p>
      </div>

      {/* Carousel */}
      <div
        className="relative mt-10"
        onMouseEnter={stopAutoScroll}
        onMouseLeave={startAutoScroll}
      >

        {/* Left Arrow */}
        <button
          type="button"
          onClick={scrollLeft}
          aria-label="Previous categories"
          className="
            absolute
            left-0
            top-1/2
            -translate-y-1/2
            z-10
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-white
            shadow-md
            border
            border-gray-200
            transition
            duration-200
            hover:bg-gray-100
            hover:scale-105
          "
        >
          <ChevronLeft
            size={22}
            className="text-[#0f172a]"
          />
        </button>

        {/* Carousel Items */}
        <div
          ref={carouselRef}
          className="
            flex
            gap-4
            sm:gap-6
            overflow-x-auto
            scroll-smooth
            snap-x
            snap-mandatory
            px-12
            pb-4

            [&::-webkit-scrollbar]:hidden
            [-ms-overflow-style:none]
            [scrollbar-width:none]
          "
        >
          {categories.map((category) => (
            <div
              key={category.slug}
              className="
                flex-shrink-0
                w-[45%]
                sm:w-[28%]
                md:w-[22%]
                lg:w-[18%]
                snap-start
              "
            >
              <CategoryCard category={category} />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          type="button"
          onClick={scrollRight}
          aria-label="Next categories"
          className="
            absolute
            right-0
            top-1/2
            -translate-y-1/2
            z-10
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-white
            shadow-md
            border
            border-gray-200
            transition
            duration-200
            hover:bg-gray-100
            hover:scale-105
          "
        >
          <ChevronRight
            size={22}
            className="text-[#0f172a]"
          />
        </button>

      </div>
    </section>
  );
}