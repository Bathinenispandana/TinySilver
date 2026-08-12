export interface Category {
  slug: string;
  name: string;
  image: string;
}

export const categories: Category[] = [
  {
    slug: "rings",
    name: "Rings",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80&auto=format&fit=crop",
  },
  {
    slug: "earrings",
    name: "Earrings",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80&auto=format&fit=crop",
  },
  {
    slug: "necklaces",
    name: "Necklaces",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80&auto=format&fit=crop",
  },
  {
    slug: "bracelets",
    name: "Bracelets",
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&q=80&auto=format&fit=crop",
  },
  {
    slug: "anklets",
    name: "Anklets",
    image:
      "https://images.unsplash.com/photo-1631982690223-8aa4a70b3d6a?w=800&q=80&auto=format&fit=crop",
  },
  {
    slug: "bangles",
    name: "Bangles",
    image:
      "https://images.unsplash.com/photo-1611955167811-4711904bb9f8?w=800&q=80&auto=format&fit=crop",
  },
  {
    slug: "toe-rings",
    name: "Toe Rings",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80&auto=format&fit=crop",
  },
  {
    slug: "sets",
    name: "Silver Sets",
    image:
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80&auto=format&fit=crop",
  },
];

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}
