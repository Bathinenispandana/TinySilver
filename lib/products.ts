// ============================================
// PRODUCT TYPE
// ============================================

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
  stock: number;
}


// ============================================
// PRODUCT CATEGORIES
// ============================================

export const categories = [
  "All",
  "KumKumBox",
  "Diya",
  "Plates",
  "ToeRings",
  "Coins",
  "Glass",
  "Flower",
  "Leaf",
  "Srichakra",
  "Rakhi",
];


// ============================================
// PRODUCTS
// ============================================

export const products: Product[] = [

  /*Kumkum-box*/
  {
    id: 1,
    name: "Silver Kumkum Box - 2.5g",
    price: 1000,
    originalPrice: 1200,

    image: "/silver-kumkumbox-2.5g-1.webp",
    images: [
      "/silver-kumkumbox-2.5g-2.webp",
    ],

    category: "KumKumBox",
    collection: "daily-wear",

    isNew: true,
    isBestSeller: true,

    material: "925 Sterling Silver",
    weight: "2.5g",
    dimensions: "Small",

    description:
      "Elegant silver kumkum box crafted for traditional and everyday use.",

    rating: 4.8,
    reviews: 24,

    inStock: true,
    stock: 4,
  },

  {
    id: 2,
    name: "Silver Kumkum Box - 5g",
    price: 1000,
    originalPrice: 1200,

    image: "/silver-kumkumbox-5g-1.webp",
    images: [
      "/silver-kumkumbox-5g-1.webp",
    ],

    category: "KumKumBox",
    collection: "daily-wear",

    isNew: false,
    isBestSeller: true,

    material: "925 Sterling Silver",
    weight: "5g",
    dimensions: "Medium",

    description:
      "Beautifully crafted silver kumkum box with a traditional finish.",

    rating: 4.7,
    reviews: 18,

    inStock: true,
    stock: 2,
  },

  {
    id: 3,
    name: "Silver Kumkum Box - 8g",
    price: 1000,
    originalPrice: 1250,

    image: "/silver-kumkumbox-8g-1.webp",
    images: [
      "/silver-kumkumbox-8g-1.webp",
    ],

    category: "KumKumBox",
    collection: "daily-wear",

    isNew: false,
    isBestSeller: false,

    material: "925 Sterling Silver",
    weight: "8g",
    dimensions: "Large",

    description:
      "Premium silver kumkum box designed for pooja and gifting.",

    rating: 4.6,
    reviews: 12,

    inStock: true,
    stock: 5,
  },


  // --------------------------------------------
  // DIYA
  // --------------------------------------------

  {
    id: 4,
    name: "Silver Diya - 5g",
    price: 1000,
    originalPrice: 1150,

    image: "/silver-diya-5g-1.webp",
    images: [
      "/silver-diya-5g-1.webp",
    ],

    category: "Diya",
    collection: "daily-wear",

    isNew: true,
    isBestSeller: true,

    material: "925 Sterling Silver",
    weight: "5g",
    dimensions: "Small",

    description:
      "Traditional silver diya perfect for daily pooja and festive occasions.",

    rating: 4.9,
    reviews: 31,

    inStock: true,
    stock: 2,
  },

  {
    id: 5,
    name: "Silver Diya - 9g",
    price: 1000,
    originalPrice: 1250,

    image: "/silver-diya-9g-1.webp",
    images: [
      "/silver-diya-9g-2.webp",
    ],

    category: "Diya",
    collection: "daily-wear",

    isNew: false,
    isBestSeller: true,

    material: "925 Sterling Silver",
    weight: "9g",
    dimensions: "Medium",

    description:
      "Elegant silver diya with a traditional design, ideal for pooja and gifting.",

    rating: 4.8,
    reviews: 27,

    inStock: true,
    stock: 1,
  },


  // --------------------------------------------
  // SILVER PLATE
  // --------------------------------------------

  {
    id: 6,
    name: "Silver Plate - 5g",
    price: 1200,
    originalPrice: 1400,

    image: "/silver-plate-5g-1.webp",
    images: [
      "/silver-plate-5g-1.webp",
    ],

    category: "Plates",
    collection: "daily-wear",

    isNew: false,
    isBestSeller: true,

    material: "925 Sterling Silver",
    weight: "5g",
    dimensions: "Small",

    description:
      "Elegant silver plate suitable for pooja, gifting and special occasions.",

    rating: 4.7,
    reviews: 16,

    inStock: true,
    stock: 6,
  },


  // --------------------------------------------
  // TOE RINGS
  // --------------------------------------------

  {
    id: 7,
    name: "Butterfly Toe Ring",
    price: 2520,
    originalPrice: 2800,

    image: "/butterfly-3g-1.webp",
    images: [
      "/butterfly-3g-1.webp",
    ],

    category: "ToeRings",
    collection: "daily-wear",

    isNew: false,
    isBestSeller: true,

    material: "925 Sterling Silver",
    weight: "3g",
    dimensions: "Adjustable",

    description:
      "Beautiful butterfly-designed silver toe ring with a comfortable adjustable fit.",

    rating: 4.8,
    reviews: 22,

    inStock: true,
    stock: 3,
  },

  {
    id: 8,
    name: "Peacock Toe Ring",
    price: 2520,
    originalPrice: 2800,

    image: "/peacock-3g-1.webp",
    images: [
      "/peacock-3g-1.webp",
    ],

    category: "ToeRings",
    collection: "daily-wear",

    isNew: false,
    isBestSeller: false,

    material: "925 Sterling Silver",
    weight: "3g",
    dimensions: "Adjustable",

    description:
      "Traditional peacock-inspired silver toe ring with detailed craftsmanship.",

    rating: 4.7,
    reviews: 19,

    inStock: true,
    stock: 1,
  },

  {
    id: 9,
    name: "Flower Toe Ring",
    price: 2520,
    originalPrice: 2800,

    image: "/flower-4g-1.webp",
    images: [
      "/flower-4g-1.webp",
    ],

    category: "ToeRings",
    collection: "daily-wear",

    isNew: true,
    isBestSeller: true,

    material: "925 Sterling Silver",
    weight: "4g",
    dimensions: "Adjustable",

    description:
      "Delicate floral silver toe ring designed for everyday elegance.",

    rating: 4.8,
    reviews: 26,

    inStock: true,
    stock: 8,
  },

  {
    id: 10,
    name: "Rounded Toe Ring",
    price: 2520,
    originalPrice: 2800,

    image: "/rounded-3g-1.webp",
    images: [
      "/rounded-3g-1.webp",
    ],

    category: "ToeRings",
    collection: "daily-wear",

    isNew: false,
    isBestSeller: false,

    material: "925 Sterling Silver",
    weight: "3g",
    dimensions: "Adjustable",

    description:
      "Simple rounded silver toe ring designed for comfortable everyday wear.",

    rating: 4.6,
    reviews: 15,

    inStock: true,
    stock: 4,
  },


  // --------------------------------------------
  // SILVER COINS
  // --------------------------------------------

  {
    id: 11,
    name: "Silver Coin - 1g",
    price: 8500,
    originalPrice: 9000,

    image: "/silver-coin-1g.webp",
    images: [
      "/silver-coin-1g.webp",
    ],

    category: "Coins",
    collection: "daily-wear",

    isNew: false,
    isBestSeller: true,

    material: "925 Sterling Silver",
    weight: "1g",
    dimensions: "Small",

    description:
      "Pure silver coin suitable for gifting, pooja and special occasions.",

    rating: 4.8,
    reviews: 20,

    inStock: true,
    stock: 4,
  },

  {
    id: 12,
    name: "Silver Coin - 2g",
    price: 8500,
    originalPrice: 9000,

    image: "/silver-coin-2g.webp",
    images: [
      "/silver-coin-2g.webp",
    ],

    category: "Coins",
    collection: "daily-wear",

    isNew: false,
    isBestSeller: false,

    material: "925 Sterling Silver",
    weight: "2g",
    dimensions: "Medium",

    description:
      "Classic silver coin suitable for gifting and traditional occasions.",

    rating: 4.7,
    reviews: 14,

    inStock: true,
    stock: 4,
  },

  {
    id: 13,
    name: "Silver Coin - 5g",
    price: 8500,
    originalPrice: 9500,

    image: "/silver-coin-5g.webp",
    images: [
      "/silver-coin-5g.webp",
    ],

    category: "Coins",
    collection: "daily-wear",

    isNew: false,
    isBestSeller: true,

    material: "925 Sterling Silver",
    weight: "5g",
    dimensions: "Large",

    description:
      "Premium silver coin ideal for gifting, pooja and celebrations.",

    rating: 4.9,
    reviews: 28,

    inStock: true,
    stock: 4,
  },


  // --------------------------------------------
  // SILVER GLASS
  // --------------------------------------------

  {
    id: 14,
    name: "Silver Glass - 5g",
    price: 4200,
    originalPrice: 4600,

    image: "/5g-glass.webp",
    images: [
      "/5g-glass.webp",
    ],

    category: "Glass",
    collection: "daily-wear",

    isNew: false,
    isBestSeller: true,

    material: "925 Sterling Silver",
    weight: "5g",
    dimensions: "Standard",

    description:
      "Elegant silver glass crafted for traditional use and premium gifting.",

    rating: 4.8,
    reviews: 17,

    inStock: true,
    stock: 4,
  },


  // --------------------------------------------
  // SILVER FLOWER
  // --------------------------------------------

  {
    id: 15,
    name: "Silver Flower - 5g",
    price: 4200,
    originalPrice: 4500,

    image: "/silver-flower-5g-1.webp",
    images: [
      "/silver-flower-5g-1.webp",
    ],

    category: "Flower",
    collection: "daily-wear",

    isNew: false,
    isBestSeller: false,

    material: "925 Sterling Silver",
    weight: "5g",
    dimensions: "Standard",

    description:
      "Beautiful silver flower ornament designed for pooja and decorative use.",

    rating: 4.7,
    reviews: 13,

    inStock: true,
    stock: 4,
  },


  // --------------------------------------------
  // SILVER LEAVES
  // --------------------------------------------

  {
    id: 16,
    name: "Silver Mango Leaf",
    price: 4200,
    originalPrice: 4500,

    image: "/2g-Mango-leaf.webp",
    images: [
      "/2g-Mango-leaf.webp",
    ],

    category: "Leaf",
    collection: "daily-wear",

    isNew: false,
    isBestSeller: false,

    material: "925 Sterling Silver",
    weight: "2g",
    dimensions: "Standard",

    description:
      "Traditional mango leaf design crafted in silver for decorative and pooja use.",

    rating: 4.6,
    reviews: 11,

    inStock: true,
    stock: 4,
  },

  {
    id: 17,
    name: "Silver Peepal Leaf",
    price: 4200,
    originalPrice: 4500,

    image: "/2g-peepal-leaf.webp",
    images: [
      "/2g-peepal-leaf.webp",
    ],

    category: "Leaf",
    collection: "daily-wear",

    isNew: true,
    isBestSeller: false,

    material: "925 Sterling Silver",
    weight: "2g",
    dimensions: "Standard",

    description:
      "Elegant peepal leaf design crafted in sterling silver.",

    rating: 4.7,
    reviews: 10,

    inStock: true,
    stock: 4,
  },


  // --------------------------------------------
  // SRICHAKRA
  // --------------------------------------------

  {
    id: 18,
    name: "Silver Srichakra",
    price: 4200,
    originalPrice: 4600,

    image: "/2g-Srichakra.webp",
    images: [
      "/2g-Srichakra.webp",
    ],

    category: "Srichakra",
    collection: "daily-wear",

    isNew: false,
    isBestSeller: false,

    material: "925 Sterling Silver",
    weight: "2g",
    dimensions: "Standard",

    description:
      "Intricately designed silver Srichakra suitable for pooja and spiritual spaces.",

    rating: 4.9,
    reviews: 23,

    inStock: true,
    stock: 4,
  },
];


// ============================================
// GET PRODUCT BY ID
// ============================================

export function getProductById(id: number) {
  return products.find((product) => product.id === id);
}

// ============================================
// GET NEW ARRIVALS
// ============================================

export function getNewArrivals(limit?: number) {
  const newArrivals = products.filter(
    (product) => product.isNew === true
  );

  return limit
    ? newArrivals.slice(0, limit)
    : newArrivals;
}


// ============================================
// GET BEST SELLERS
// ============================================

export function getBestSellers(limit?: number) {
  const bestSellers = products.filter(
    (product) => product.isBestSeller === true
  );

  return limit
    ? bestSellers.slice(0, limit)
    : bestSellers;
}
// ============================================
// GET RELATED PRODUCTS
// ============================================

export function getRelatedProducts(
  product: Product,
  limit = 4
) {
  return products
    .filter(
      (item) =>
        item.id !== product.id &&
        item.category === product.category
    )
    .slice(0, limit);
}