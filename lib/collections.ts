export interface Collection {
  slug: string;
  name: string;
  description: string;
  image: string;
}

export const collections: Collection[] = [
  {
    slug: "everyday-silver",
    name: "Everyday Silver",
    description:
      "Understated pieces built for daily wear — light, durable and endlessly versatile.",
    image:
      "https://images.unsplash.com/photo-1620656798579-1984d9e87df7?w=1200&q=80&auto=format&fit=crop",
  },
  {
    slug: "traditional",
    name: "Traditional Collection",
    description:
      "Intricately crafted silver rooted in heritage motifs, made for celebration and ritual.",
    image:
      "https://images.unsplash.com/photo-1591160690555-5debfba289f0?w=1200&q=80&auto=format&fit=crop",
  },
  {
    slug: "bridal",
    name: "Bridal Collection",
    description:
      "Statement silver for the aisle and beyond — bold, ornate, unforgettable.",
    image:
      "https://images.unsplash.com/photo-1587467512961-120760940315?w=1200&q=80&auto=format&fit=crop",
  },
  {
    slug: "minimal",
    name: "Minimal Collection",
    description:
      "Clean lines and quiet elegance. Silver stripped to its essential form.",
    image:
      "https://images.unsplash.com/photo-1602751584547-ecf03e2b4be3?w=1200&q=80&auto=format&fit=crop",
  },
  {
    slug: "statement",
    name: "Statement Pieces",
    description:
      "Sculptural silhouettes designed to be noticed. Silver with presence.",
    image:
      "https://images.unsplash.com/photo-1608042314453-ae338d80c427?w=1200&q=80&auto=format&fit=crop",
  },
  {
    slug: "gifts",
    name: "Gift Collection",
    description:
      "Thoughtfully packaged silver keepsakes, ready to give and cherish.",
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1200&q=80&auto=format&fit=crop",
  },
];

export function getCollectionBySlug(slug: string) {
  return collections.find((c) => c.slug === slug);
}
