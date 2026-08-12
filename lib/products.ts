export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  collection: string;
  isNew: boolean;
  isBestSeller?: boolean;
  material?: string;
  weight?: string;
  dimensions?: string;
  description?: string;
  rating?: number;
  reviews?: number;
  inStock?: boolean;
}

const img = (id: string, w = 1000) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

const RING_IMGS = [
  img("photo-1611591437281-460bfbe1220a"),
  img("photo-1599643478518-a784e5dc4c8f"),
  img("photo-1515562141207-7a88fb7ce338"),
  img("photo-1608042314453-ae338d80c427"),
];
const EARRING_IMGS = [
  img("photo-1535632066927-ab7c9ab60908"),
  img("photo-1630019852942-f89202989a59"),
  img("photo-1596944924616-7b38e7cfac36"),
  img("photo-1630019852942-f89202989a59"),
];
const NECKLACE_IMGS = [
  img("photo-1599643478518-a784e5dc4c8f"),
  img("photo-1611955167811-4711904bb9f8"),
  img("photo-1573408301185-9146fe634ad0"),
  img("photo-1611652022419-a9419f74343d"),
];
const BRACELET_IMGS = [
  img("photo-1611652022419-a9419f74343d"),
  img("photo-1602752250015-52934bc45613"),
  img("photo-1611955167811-4711904bb9f8"),
];
const ANKLET_IMGS = [img("photo-1631982690223-8aa4a70b3d6a")];
const BANGLE_IMGS = [img("photo-1611955167811-4711904bb9f8"), img("photo-1591160690555-5debfba289f0")];
const TOE_RING_IMGS = [img("photo-1515562141207-7a88fb7ce338")];
const PENDANT_IMGS = [img("photo-1573408301185-9146fe634ad0"), img("photo-1602751584547-ecf03e2b4be3")];
const SET_IMGS = [img("photo-1587467512961-120760940315"), img("photo-1591160690555-5debfba289f0")];

function pick(arr: string[], i: number) {
  return arr[i % arr.length];
}

export const products: Product[] = [
  // RINGS
  {
    id: 1,
    name: "Classic Sterling Silver Ring",
    price: 2499,
    image: pick(RING_IMGS, 0),
    images: [pick(RING_IMGS, 0), pick(RING_IMGS, 1), pick(RING_IMGS, 2)],
    category: "Rings",
    collection: "Everyday Silver",
    isNew: false,
    isBestSeller: true,
    material: "925 Sterling Silver",
    weight: "8g",
    dimensions: "Adjustable, sizes 6-9",
    description:
      "Crafted with timeless elegance, this classic band sits beautifully on its own or stacked with other rings. A wardrobe staple for everyday sophistication.",
    rating: 4.8,
    reviews: 32,
    inStock: true,
  },
  {
    id: 2,
    name: "Oxidised Floral Ring",
    price: 1899,
    image: pick(RING_IMGS, 1),
    images: [pick(RING_IMGS, 1), pick(RING_IMGS, 2)],
    category: "Rings",
    collection: "Traditional",
    isNew: true,
    material: "925 Oxidised Silver",
    weight: "6g",
    dimensions: "Adjustable",
    description:
      "A hand-finished floral motif ring with a deep oxidised patina that highlights every carved detail.",
    rating: 4.6,
    reviews: 18,
    inStock: true,
  },
  {
    id: 3,
    name: "Minimal Stacking Ring Set",
    price: 3299,
    image: pick(RING_IMGS, 2),
    images: [pick(RING_IMGS, 2), pick(RING_IMGS, 3)],
    category: "Rings",
    collection: "Minimal",
    isNew: true,
    material: "925 Sterling Silver",
    weight: "5g (set of 3)",
    dimensions: "Sizes 5-8",
    description:
      "Three slender bands designed to be worn together or separately for a considered, layered look.",
    rating: 4.7,
    reviews: 24,
    inStock: true,
  },
  {
    id: 4,
    name: "Bridal Kundan Ring",
    price: 5499,
    image: pick(RING_IMGS, 3),
    images: [pick(RING_IMGS, 3), pick(RING_IMGS, 0)],
    category: "Rings",
    collection: "Bridal",
    isNew: false,
    isBestSeller: true,
    material: "925 Silver with Kundan Stones",
    weight: "12g",
    dimensions: "Sizes 5-9",
    description:
      "An ornate statement ring finished with hand-set kundan stones, designed for the bride who wants tradition with polish.",
    rating: 4.9,
    reviews: 41,
    inStock: true,
  },
  {
    id: 5,
    name: "Statement Cocktail Ring",
    price: 4199,
    image: pick(RING_IMGS, 0),
    category: "Rings",
    collection: "Statement",
    isNew: false,
    material: "925 Sterling Silver",
    weight: "14g",
    dimensions: "Sizes 6-9",
    description:
      "A sculptural silhouette built to be noticed, with a bold form that catches the light from every angle.",
    rating: 4.5,
    reviews: 12,
    inStock: true,
  },
  {
    id: 6,
    name: "Engraved Initial Ring",
    price: 1799,
    image: pick(RING_IMGS, 1),
    category: "Rings",
    collection: "Gifts",
    isNew: true,
    material: "925 Sterling Silver",
    weight: "4g",
    dimensions: "Adjustable",
    description:
      "A personal, giftable ring featuring hand-engraved initials on a delicate polished band.",
    rating: 4.7,
    reviews: 9,
    inStock: true,
  },

  // EARRINGS
  {
    id: 7,
    name: "Minimal Silver Earrings",
    price: 1599,
    image: pick(EARRING_IMGS, 0),
    images: [pick(EARRING_IMGS, 0), pick(EARRING_IMGS, 2)],
    category: "Earrings",
    collection: "Minimal",
    isNew: false,
    isBestSeller: true,
    material: "925 Sterling Silver",
    weight: "3g",
    dimensions: "1.5cm drop",
    description:
      "Clean geometric studs finished with a soft polish, light enough for all-day wear.",
    rating: 4.8,
    reviews: 56,
    inStock: true,
  },
  {
    id: 8,
    name: "Jhumka Silver Earrings",
    price: 2999,
    image: pick(EARRING_IMGS, 2),
    images: [pick(EARRING_IMGS, 2), pick(EARRING_IMGS, 3)],
    category: "Earrings",
    collection: "Traditional",
    isNew: true,
    material: "925 Oxidised Silver",
    weight: "9g",
    dimensions: "3.2cm drop",
    description:
      "Traditional bell-shaped jhumkas with fine filigree detailing and a gentle sway.",
    rating: 4.7,
    reviews: 28,
    inStock: true,
  },
  {
    id: 9,
    name: "Chandbali Drop Earrings",
    price: 3499,
    image: pick(EARRING_IMGS, 3),
    category: "Earrings",
    collection: "Bridal",
    isNew: false,
    material: "925 Silver with Kundan",
    weight: "11g",
    dimensions: "4cm drop",
    description:
      "Crescent-shaped chandbalis with hand-set stones, designed to frame the face for special occasions.",
    rating: 4.9,
    reviews: 33,
    inStock: true,
  },
  {
    id: 10,
    name: "Pearl Drop Silver Earrings",
    price: 2199,
    image: pick(EARRING_IMGS, 0),
    category: "Earrings",
    collection: "Everyday Silver",
    isNew: true,
    material: "925 Silver with Freshwater Pearl",
    weight: "4g",
    dimensions: "2cm drop",
    description:
      "A single freshwater pearl suspended from a delicate silver hook, quietly elegant for everyday wear.",
    rating: 4.6,
    reviews: 21,
    inStock: true,
  },
  {
    id: 11,
    name: "Geometric Hoop Earrings",
    price: 1999,
    image: pick(EARRING_IMGS, 2),
    category: "Earrings",
    collection: "Statement",
    isNew: false,
    material: "925 Sterling Silver",
    weight: "6g",
    dimensions: "3cm diameter",
    description:
      "Architectural hoops with a matte-polish contrast that stand out without shouting.",
    rating: 4.4,
    reviews: 15,
    inStock: true,
  },
  {
    id: 12,
    name: "Silver Ear Cuff Set",
    price: 1399,
    image: pick(EARRING_IMGS, 3),
    category: "Earrings",
    collection: "Gifts",
    isNew: true,
    material: "925 Sterling Silver",
    weight: "2g (pair)",
    dimensions: "One size",
    description:
      "No-piercing-needed cuffs that wrap the ear gently, sold as a giftable pair.",
    rating: 4.5,
    reviews: 7,
    inStock: true,
  },

  // NECKLACES
  {
    id: 13,
    name: "Oxidised Silver Necklace",
    price: 4499,
    image: pick(NECKLACE_IMGS, 0),
    images: [pick(NECKLACE_IMGS, 0), pick(NECKLACE_IMGS, 1)],
    category: "Necklaces",
    collection: "Traditional",
    isNew: false,
    isBestSeller: true,
    material: "925 Oxidised Silver",
    weight: "22g",
    dimensions: "45cm chain",
    description:
      "A temple-inspired necklace with layered detailing and an antique oxidised finish.",
    rating: 4.8,
    reviews: 47,
    inStock: true,
  },
  {
    id: 14,
    name: "Pearl Silver Pendant",
    price: 2699,
    image: pick(NECKLACE_IMGS, 1),
    images: [pick(NECKLACE_IMGS, 1), pick(NECKLACE_IMGS, 2)],
    category: "Necklaces",
    collection: "Everyday Silver",
    isNew: false,
    isBestSeller: true,
    material: "925 Silver with Pearl",
    weight: "6g",
    dimensions: "40cm chain",
    description:
      "A single lustrous pearl set on a fine silver chain, designed for effortless layering.",
    rating: 4.7,
    reviews: 39,
    inStock: true,
  },
  {
    id: 15,
    name: "Layered Silver Chain Necklace",
    price: 3199,
    image: pick(NECKLACE_IMGS, 2),
    category: "Necklaces",
    collection: "Minimal",
    isNew: true,
    material: "925 Sterling Silver",
    weight: "10g",
    dimensions: "38cm + 42cm layered",
    description:
      "Two fine chains pre-layered at different lengths for a considered, undone finish.",
    rating: 4.6,
    reviews: 19,
    inStock: true,
  },
  {
    id: 16,
    name: "Bridal Choker Necklace",
    price: 8999,
    image: pick(NECKLACE_IMGS, 3),
    category: "Necklaces",
    collection: "Bridal",
    isNew: false,
    material: "925 Silver with Kundan & Pearls",
    weight: "48g",
    dimensions: "34cm choker",
    description:
      "An heirloom-style choker with dense kundan work and pearl drops, made for the big day.",
    rating: 5.0,
    reviews: 22,
    inStock: true,
  },
  {
    id: 17,
    name: "Statement Collar Necklace",
    price: 5299,
    image: pick(NECKLACE_IMGS, 0),
    category: "Necklaces",
    collection: "Statement",
    isNew: true,
    material: "925 Sterling Silver",
    weight: "28g",
    dimensions: "36cm collar",
    description:
      "A sculptural collar that sits close to the collarbone, engineered as the centrepiece of any outfit.",
    rating: 4.5,
    reviews: 11,
    inStock: true,
  },
  {
    id: 18,
    name: "Engraved Name Pendant",
    price: 2299,
    image: pick(NECKLACE_IMGS, 1),
    category: "Necklaces",
    collection: "Gifts",
    isNew: true,
    material: "925 Sterling Silver",
    weight: "5g",
    dimensions: "42cm chain",
    description:
      "A custom-engraved pendant on a fine box chain, packaged ready to gift.",
    rating: 4.8,
    reviews: 26,
    inStock: true,
  },

  // BRACELETS
  {
    id: 19,
    name: "Silver Bracelet",
    price: 2899,
    image: pick(BRACELET_IMGS, 0),
    images: [pick(BRACELET_IMGS, 0), pick(BRACELET_IMGS, 1)],
    category: "Bracelets",
    collection: "Everyday Silver",
    isNew: false,
    isBestSeller: true,
    material: "925 Sterling Silver",
    weight: "9g",
    dimensions: "18cm, adjustable",
    description:
      "A supple curb-chain bracelet finished with a secure lobster clasp, built for daily wear.",
    rating: 4.7,
    reviews: 34,
    inStock: true,
  },
  {
    id: 20,
    name: "Charm Link Bracelet",
    price: 3399,
    image: pick(BRACELET_IMGS, 1),
    category: "Bracelets",
    collection: "Minimal",
    isNew: true,
    material: "925 Sterling Silver",
    weight: "7g",
    dimensions: "17cm + 2cm extender",
    description:
      "A delicate link chain with a single polished charm, easy to dress up or down.",
    rating: 4.5,
    reviews: 14,
    inStock: true,
  },
  {
    id: 21,
    name: "Oxidised Cuff Bracelet",
    price: 2599,
    image: pick(BRACELET_IMGS, 2),
    category: "Bracelets",
    collection: "Traditional",
    isNew: false,
    material: "925 Oxidised Silver",
    weight: "16g",
    dimensions: "One size, open cuff",
    description:
      "A wide open cuff with hand-carved traditional motifs and a deep antique finish.",
    rating: 4.6,
    reviews: 20,
    inStock: true,
  },
  {
    id: 22,
    name: "Bridal Kada Bracelet",
    price: 6499,
    image: pick(BRACELET_IMGS, 0),
    category: "Bracelets",
    collection: "Bridal",
    isNew: false,
    material: "925 Silver with Kundan",
    weight: "32g",
    dimensions: "6.5cm diameter",
    description:
      "A substantial kada with dense stone work, designed as a bridal centrepiece.",
    rating: 4.9,
    reviews: 17,
    inStock: true,
  },

  // ANKLETS
  {
    id: 23,
    name: "Traditional Silver Anklet",
    price: 3799,
    image: pick(ANKLET_IMGS, 0),
    images: [pick(ANKLET_IMGS, 0)],
    category: "Anklets",
    collection: "Traditional",
    isNew: false,
    isBestSeller: true,
    material: "925 Silver",
    weight: "24g (pair)",
    dimensions: "24cm, adjustable",
    description:
      "A pair of ghungroo anklets with a soft chime, hand-finished in a classic pattern.",
    rating: 4.8,
    reviews: 45,
    inStock: true,
  },
  {
    id: 24,
    name: "Minimal Chain Anklet",
    price: 1699,
    image: pick(ANKLET_IMGS, 0),
    category: "Anklets",
    collection: "Minimal",
    isNew: true,
    material: "925 Sterling Silver",
    weight: "5g",
    dimensions: "23cm + 3cm extender",
    description:
      "A fine single chain anklet designed to sit low on the ankle, barely-there and elegant.",
    rating: 4.4,
    reviews: 10,
    inStock: true,
  },
  {
    id: 25,
    name: "Beaded Silver Anklet Set",
    price: 2199,
    image: pick(ANKLET_IMGS, 0),
    category: "Anklets",
    collection: "Everyday Silver",
    isNew: true,
    material: "925 Silver",
    weight: "14g (pair)",
    dimensions: "24cm, adjustable",
    description:
      "A pair of beaded anklets that pair easily with sandals or bare feet alike.",
    rating: 4.5,
    reviews: 13,
    inStock: true,
  },

  // BANGLES
  {
    id: 26,
    name: "Classic Silver Bangle Pair",
    price: 4999,
    image: pick(BANGLE_IMGS, 0),
    images: [pick(BANGLE_IMGS, 0), pick(BANGLE_IMGS, 1)],
    category: "Bangles",
    collection: "Traditional",
    isNew: false,
    isBestSeller: true,
    material: "925 Silver",
    weight: "38g (pair)",
    dimensions: "2.4 inch diameter",
    description:
      "A pair of round bangles with a fine engraved border, made to be worn together.",
    rating: 4.7,
    reviews: 29,
    inStock: true,
  },
  {
    id: 27,
    name: "Minimal Silver Bangle",
    price: 2499,
    image: pick(BANGLE_IMGS, 1),
    category: "Bangles",
    collection: "Minimal",
    isNew: true,
    material: "925 Sterling Silver",
    weight: "16g",
    dimensions: "2.4 inch diameter",
    description:
      "A single slim bangle with a brushed matte finish for a quiet, modern edge.",
    rating: 4.5,
    reviews: 8,
    inStock: true,
  },
  {
    id: 28,
    name: "Bridal Bangle Set",
    price: 7999,
    image: pick(BANGLE_IMGS, 0),
    category: "Bangles",
    collection: "Bridal",
    isNew: false,
    material: "925 Silver with Kundan",
    weight: "64g (set of 4)",
    dimensions: "2.4 - 2.6 inch",
    description:
      "A set of four ornately worked bangles designed to be stacked for bridal occasions.",
    rating: 4.9,
    reviews: 16,
    inStock: true,
  },

  // TOE RINGS
  {
    id: 29,
    name: "Traditional Toe Ring Pair",
    price: 1299,
    image: pick(TOE_RING_IMGS, 0),
    category: "Toe Rings",
    collection: "Traditional",
    isNew: false,
    material: "925 Silver",
    weight: "4g (pair)",
    dimensions: "Adjustable",
    description:
      "A classic pair of adjustable toe rings with fine wirework detailing.",
    rating: 4.6,
    reviews: 22,
    inStock: true,
  },
  {
    id: 30,
    name: "Minimal Band Toe Rings",
    price: 999,
    image: pick(TOE_RING_IMGS, 0),
    category: "Toe Rings",
    collection: "Minimal",
    isNew: true,
    material: "925 Sterling Silver",
    weight: "3g (pair)",
    dimensions: "Adjustable",
    description:
      "Simple polished bands, adjustable to fit comfortably, sold as a pair.",
    rating: 4.3,
    reviews: 6,
    inStock: true,
  },

  // PENDANTS
  {
    id: 31,
    name: "Om Silver Pendant",
    price: 1599,
    image: pick(PENDANT_IMGS, 0),
    category: "Pendants",
    collection: "Traditional",
    isNew: false,
    material: "925 Silver",
    weight: "4g",
    dimensions: "2cm pendant",
    description:
      "A compact, finely detailed Om pendant on a fine silver chain.",
    rating: 4.7,
    reviews: 25,
    inStock: true,
  },
  {
    id: 32,
    name: "Minimal Circle Pendant",
    price: 1799,
    image: pick(PENDANT_IMGS, 1),
    category: "Pendants",
    collection: "Minimal",
    isNew: true,
    material: "925 Sterling Silver",
    weight: "3g",
    dimensions: "1.8cm pendant",
    description:
      "A single polished circle pendant, a quiet everyday layering piece.",
    rating: 4.5,
    reviews: 11,
    inStock: true,
  },

  // SETS
  {
    id: 33,
    name: "Bridal Silver Jewellery Set",
    price: 12999,
    image: pick(SET_IMGS, 0),
    images: [pick(SET_IMGS, 0), pick(SET_IMGS, 1)],
    category: "Sets",
    collection: "Bridal",
    isNew: false,
    isBestSeller: true,
    material: "925 Silver with Kundan & Pearls",
    weight: "96g (necklace + earrings)",
    dimensions: "38cm necklace, 3.5cm earrings",
    description:
      "A matched necklace and earring set with dense kundan work, built as a bridal centrepiece.",
    rating: 4.9,
    reviews: 30,
    inStock: true,
  },
  {
    id: 34,
    name: "Everyday Silver Set",
    price: 4999,
    image: pick(SET_IMGS, 1),
    category: "Sets",
    collection: "Everyday Silver",
    isNew: true,
    material: "925 Sterling Silver",
    weight: "18g (necklace + earrings)",
    dimensions: "40cm necklace, 1.5cm earrings",
    description:
      "A matching pendant necklace and stud set designed for effortless daily pairing.",
    rating: 4.6,
    reviews: 14,
    inStock: true,
  },
  {
    id: 35,
    name: "Gift Box Silver Set",
    price: 3599,
    image: pick(SET_IMGS, 0),
    category: "Sets",
    collection: "Gifts",
    isNew: true,
    material: "925 Sterling Silver",
    weight: "12g (ring + earrings)",
    dimensions: "Adjustable ring, 1.2cm earrings",
    description:
      "A ring and earring duo presented in a keepsake box, ready to gift.",
    rating: 4.7,
    reviews: 9,
    inStock: true,
  },
];

export function getProductById(id: number) {
  return products.find((p) => p.id === id);
}

export function getRelatedProducts(product: Product, limit = 4) {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, limit);
}
