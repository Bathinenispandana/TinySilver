export interface Category {
  slug: string;
  name: string;
  image: string;
}

export const categories: Category[] = [
  {
    slug: "coins",
    name: "Coins",
    image:
      "/silver-coin-1g.webp",
  },
  {
    slug: "srichakra",
    name: "Srichakra",
    image:
      "/srichakra-2g.webp",
  },
  {
    slug: "diya",
    name: "Diya",
    image:
      "/silver-diya-5g-1.webp",
  },
  {
    slug: "kumkum-box",
    name: "KumKumBox",
    image:
      "/silver-kumkumbox-2.5g-1.webp",
  },
  {
    slug: "plates",
    name: "Plates",
    image:
      "/silver-plate-5g-1.webp",
  },
  {
    slug: "leaf",
    name: "Leaf",
    image:
      "/2g-Mango-leaf.webp",
  },
  {
    slug: "toe-rings",
    name: "ToeRings",
    image:
      "/toe-ring-fly.webp",
  },
  {
    slug: "glass",
    name: "Glass",
    image:
      "/5g-Glass.webp",
  },
  {
    slug: "bowl",
    name: "Bowl",
    image:
      "/silver-bowl-8g.webp",
  },
  {
    slug: "earcuffs",
    name: "Earcuffs",
    image:
      "/ear-cuffs-3g-1.webp",
  },
];

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}
