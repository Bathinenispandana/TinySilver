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
      "/2g-Mango-leaf.webp",
  },
  {
    slug: "traditional",
    name: "Traditional Collection",
    description:
      "Intricately crafted silver rooted in heritage motifs, made for celebration and ritual.",
    image:
      "/5g-Glass.webp",
  },
  {
    slug: "bridal",
    name: "Bridal Collection",
    description:
      "Statement silver for the aisle and beyond — bold, ornate, unforgettable.",
    image:
      "/silver-kumkumbox-5g-2.webp",
  },
  {
    slug: "minimal",
    name: "Minimal Collection",
    description:
      "Clean lines and quiet elegance. Silver stripped to its essential form.",
    image:
      "/peacock-3g-1.webp",
  },
  {
    slug: "statement",
    name: "Statement Pieces",
    description:
      "Sculptural silhouettes designed to be noticed. Silver with presence.",
    image:
      "/butterfly-3g-1.webp",
  },
  {
    slug: "gifts",
    name: "Gift Collection",
    description:
      "Thoughtfully packaged silver keepsakes, ready to give and cherish.",
    image:
      "/flower-4g-1.webp",
  },
];

export function getCollectionBySlug(slug: string) {
  return collections.find((c) => c.slug === slug);
}
