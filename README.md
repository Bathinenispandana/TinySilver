# SILVERAZ — Premium Silver Jewellery E-commerce

A premium, static Next.js e-commerce site for a silver ornaments brand.

## Tech Stack
- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- lucide-react for icons
- React Context API (Cart, Wishlist, Auth, Toast) with localStorage persistence
- No database — all product data lives in `lib/products.ts`

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
npm run start
```

## Structure

- `app/` — routes (Home, Products, Product Details, New Arrivals, Collections, Wishlist, Cart, Account, Checkout)
- `components/` — reusable UI (Header, Footer, ProductCard, LoginModal, filters, etc.)
- `context/` — Cart, Wishlist, Auth, Toast providers
- `lib/` — product/category/collection data and helpers

## Notes

- Login modal appears automatically on first visit and is simulated via localStorage — no real backend/auth.
- Checkout is a simulated flow — no real payment processing.
- Product images are sourced from Unsplash; swap `lib/products.ts` image URLs for your own product photography before going live.
