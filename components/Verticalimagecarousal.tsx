"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export interface CarouselImage {
  id: number;
  src: string;
  alt: string;
}

export interface VerticalImageCarouselProps {
  images: CarouselImage[];
  autoPlay?: boolean;
  interval?: number;
  /** Height of the visible carousel viewport (px). Default 480. */
  containerHeight?: number;
  /** Width of the visible carousel viewport (px). Default cardWidth + 140. */
  containerWidth?: number;
  /** Size of each image card (px). Square by default — keep width === height for a 1:1 aspect ratio. Default 280 x 280. */
  cardWidth?: number;
  cardHeight?: number;
  className?: string;
}

/** Premium, elegant "ease" curve — slow start, fast middle, gentle settle. */
const EASE: [number, number, number, number] = [0.65, 0, 0.35, 1];

/**
 * Returns the shortest circular distance between an item's index and the
 * active index, e.g. for 5 items, index 4 relative to active 0 is -1 (not 4).
 * This is what makes the "last -> first" transition feel continuous instead
 * of jumping backwards through the whole list.
 */
function circularDiff(index: number, active: number, length: number) {
  let diff = index - active;
  const half = length / 2;
  if (diff > half) diff -= length;
  if (diff < -half) diff += length;
  return diff;
}

export default function VerticalImageCarousel({
  images,
  autoPlay = true,
  interval = 3500,
  containerHeight = 460,
  containerWidth,
  cardWidth = 280,
  cardHeight = 280,
  className = "",
}: VerticalImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartY = useRef<number | null>(null);
  const length = images.length;

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % length);
  }, [length]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + length) % length);
  }, [length]);

  // Autoplay
  useEffect(() => {
    if (!autoPlay || isPaused || length <= 1) return;
    const id = setInterval(goNext, interval);
    return () => clearInterval(id);
  }, [autoPlay, isPaused, interval, goNext, length]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    const SWIPE_THRESHOLD = 40;
    if (deltaY > SWIPE_THRESHOLD) {
      goPrev();
    } else if (deltaY < -SWIPE_THRESHOLD) {
      goNext();
    }
    touchStartY.current = null;
  };

  // Diagonal spacing per index step. Positive diff (an "upcoming" image,
  // about to become active) sits up + to the right; as it becomes active it
  // slides through center and continues down + to the left into the "just
  // passed" slot (negative diff). That's what produces the top-right ->
  // center -> bottom-left travel path as the carousel rotates forward.
  const STEP_X = cardWidth * 0.55;
  const STEP_Y = cardHeight * 0.55;

  const resolvedWidth = containerWidth ?? cardWidth + 140;

  return (
    <div
      className={`relative mx-auto select-none ${className}`}
      style={{ height: containerHeight, width: resolvedWidth }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative w-full h-full overflow-hidden">
        {images.map((image, i) => {
          const diff = circularDiff(i, activeIndex, length);
          const absDiff = Math.abs(diff);

          // Only render items within 2 steps of active; everything else
          // stays fully hidden/off-screen so the DOM stays light.
          const visible = absDiff <= 2;
          if (!visible) return null;

          let scale = 1;
          let opacity = 1;
          let zIndex = 30;
          let rotate = 0;

          if (absDiff === 1) {
            scale = 0.5;
            opacity = 0.5;
            zIndex = 20;
            rotate = diff * -4; // subtle tilt reinforcing the diagonal travel
          } else if (absDiff >= 2) {
            scale = 0.32;
            opacity = 0;
            zIndex = 10;
            rotate = diff * -4;
          }

          // diff > 0  -> upcoming image  -> top-right
          // diff < 0  -> just-passed image -> bottom-left
          const magnitude = absDiff >= 2 ? 1.8 : 1;
          const dx = diff * STEP_X * magnitude;
          const dy = -diff * STEP_Y * magnitude;

          return (
            <motion.div
              key={image.id}
              className="absolute left-1/2 top-1/2 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10"
              style={{
                width: cardWidth,
                height: cardHeight,
              }}
              initial={false}
              animate={{
                x: `calc(-50% + ${dx}px)`,
                y: `calc(-50% + ${dy}px)`,
                scale,
                opacity,
                rotate,
                zIndex,
              }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={`${cardWidth}px`}
                className="object-cover pointer-events-none"
                priority={diff === 0}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}