"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star, Heart } from "lucide-react";

import { Product } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

import ProductGallery from "@/components/ProductGallery";
import QuantitySelector from "@/components/QuantitySelector";
import { AccordionItem } from "@/components/Accordion";

export default function ProductDetailsClient({
  product,
}: {
  product: Product;
}) {
  // ============================================================
  // STATE
  // ============================================================

  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [showStockPopup, setShowStockPopup] = useState(false);

  // ============================================================
  // CONTEXT
  // ============================================================

  const { addToCart, items } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const router = useRouter();

  // ============================================================
  // PRODUCT DATA
  // ============================================================

  const wishlisted = isWishlisted(product.id);

  const images = product.images?.length
    ? product.images
    : [product.image];

  const stock = Math.max(0, product.stock ?? 0);

  // Quantity of this product already in cart
  const existingCartItem = items.find(
    (item) => item.product.id === product.id,
  );

  const existingCartQuantity =
    existingCartItem?.quantity ?? 0;

  // Remaining quantity that can still be added
  const remainingStock = Math.max(
    0,
    stock - existingCartQuantity,
  );

  // ============================================================
  // ADD TO CART
  // ============================================================

  const handleAddToCart = () => {
    // Product completely out of stock
    if (stock <= 0) {
      setShowStockPopup(true);
      return;
    }

    // Already have maximum stock in cart
    if (existingCartQuantity >= stock) {
      setShowStockPopup(true);
      return;
    }

    // Selected quantity would exceed remaining stock
    if (quantity > remainingStock) {
      setShowStockPopup(true);
      return;
    }

    // Add EXACT selected quantity
    addToCart(product, quantity);

    setAddedToCart(true);
  };

  // ============================================================
  // BUY NOW
  // ============================================================

  const handleBuyNow = () => {
    if (stock <= 0) {
      setShowStockPopup(true);
      return;
    }

    if (existingCartQuantity >= stock) {
      setShowStockPopup(true);
      return;
    }

    if (quantity > remainingStock) {
      setShowStockPopup(true);
      return;
    }

    // Add EXACT selected quantity
    addToCart(product, quantity);

    router.push("/checkout");
  };

  // ============================================================
  // STOCK MESSAGE
  // ============================================================

  const stockMessage =
    stock <= 0
      ? "This product is currently out of stock."
      : existingCartQuantity >= stock
        ? `You already have all ${stock} ${
            stock === 1 ? "item" : "items"
          } of this product in your cart.`
        : `We have only ${remainingStock} ${
            remainingStock === 1 ? "item" : "items"
          } available to add.`;

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-[0.5fr_1.1fr] gap-10 lg:gap-14 xl:gap-16">
        {/* ======================================================
            PRODUCT GALLERY
        ======================================================= */}

        <div className="w-full flex justify-center">
          <div className="w-full max-w-[580px]">
            <ProductGallery
              images={images}
              name={product.name}
            />
          </div>
        </div>

        {/* ======================================================
            PRODUCT INFORMATION
        ======================================================= */}

        <div className="w-full max-w-[680px]">
          {/* CATEGORY */}

          <span className="text-xs font-semibold uppercase tracking-wider text-[#827e9c]">
            {product.category} · {product.collection}
          </span>

          {/* PRODUCT NAME */}

          <h1 className="mt-2 text-2xl sm:text-3xl font-semibold text-[#25314d]">
            {product.name}
          </h1>

          {/* RATING */}

          {product.rating && (
            <div className="mt-3 flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.round(product.rating!)
                        ? "fill-[#25314d] text-[#25314d]"
                        : "text-[#c5c6cc]"
                    }`}
                  />
                ))}
              </div>

              <span className="text-sm text-[#827e9c]">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
          )}

          {/* PRICE */}

          <p className="mt-4 text-2xl font-semibold text-[#25314d]">
            {formatPrice(product.price)}
          </p>

          {/* DESCRIPTION */}

          <p className="mt-5 text-sm sm:text-base text-[#827e9c] leading-relaxed">
            {product.description}
          </p>

          {/* PRODUCT INFORMATION */}

          <dl className="mt-6 grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
            {product.material && (
              <div>
                <dt className="text-[#827e9c]">
                  Material
                </dt>

                <dd className="mt-0.5 font-medium text-[#25314d]">
                  {product.material}
                </dd>
              </div>
            )}

            {product.weight && (
              <div>
                <dt className="text-[#827e9c]">
                  Weight
                </dt>

                <dd className="mt-0.5 font-medium text-[#25314d]">
                  {product.weight}
                </dd>
              </div>
            )}

            {product.dimensions && (
              <div>
                <dt className="text-[#827e9c]">
                  Dimensions
                </dt>

                <dd className="mt-0.5 font-medium text-[#25314d]">
                  {product.dimensions}
                </dd>
              </div>
            )}

            {/* AVAILABILITY */}

            <div>
              <dt className="text-[#827e9c]">
                Availability
              </dt>

              <dd
                className={`mt-0.5 font-medium ${
                  stock <= 0
                    ? "text-red-600"
                    : "text-[#25314d]"
                }`}
              >
                {stock <= 0
                  ? "Out of Stock"
                  : `${stock} ${
                      stock === 1 ? "item" : "items"
                    } available`}
              </dd>
            </div>
          </dl>

          {/* ==================================================
              QUANTITY
          =================================================== */}

          <div className="mt-7 flex items-center gap-4">
            <span className="text-sm font-medium text-[#25314d]">
              Quantity:
            </span>

            <QuantitySelector
              quantity={quantity}
              onChange={setQuantity}
              min={1}
              max={remainingStock > 0 ? remainingStock : 1}
              onStockExceeded={() => {
                setShowStockPopup(true);
              }}
            />
          </div>

          {/* ==================================================
              ACTION BUTTONS
          =================================================== */}

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            {/* ADD TO CART */}

            {addedToCart ? (
              <button
                type="button"
                onClick={() => router.push("/cart")}
                className="flex-1 rounded-full bg-[#25314d] text-white text-sm font-semibold py-3.5 hover:bg-[#827e9c] transition-all duration-300"
              >
                View Cart
              </button>
            ) : (
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={stock <= 0}
                className="flex-1 rounded-full hover:bg-[#0f172a] text-white text-sm font-semibold py-3.5 bg-[#827e9c] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Add to Cart
              </button>
            )}

            {/* BUY NOW */}

            <button
              type="button"
              onClick={handleBuyNow}
              disabled={stock <= 0}
              className="flex-1 rounded-full border border-[#0f172a] text-[#25314d] text-sm font-semibold py-3.5 hover:bg-[#c5c6cc]/30 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Buy Now
            </button>
          </div>

          {/* WISHLIST */}

          <button
            type="button"
            onClick={() => toggleWishlist(product)}
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#25314d] hover:text-[#827e9c] transition-colors duration-300"
          >
            <Heart
              className="h-4.5 w-4.5"
              fill={
                wishlisted
                  ? "#0f172a"
                  : "none"
              }
            />

            {wishlisted
              ? "Added to Wishlist"
              : "Add to Wishlist"}
          </button>

          {/* ==================================================
              ACCORDIONS
          =================================================== */}

          <div className="mt-8">
            <AccordionItem
              title="Description"
              defaultOpen
            >
              {product.description}
            </AccordionItem>

            <AccordionItem title="Product Details">
              <ul className="list-disc pl-4 space-y-1">
                {product.material && (
                  <li>
                    Material: {product.material}
                  </li>
                )}

                {product.weight && (
                  <li>
                    Weight: {product.weight}
                  </li>
                )}

                {product.dimensions && (
                  <li>
                    Dimensions: {product.dimensions}
                  </li>
                )}

                <li>Silver</li>
              </ul>
            </AccordionItem>

            <AccordionItem title="Shipping & Returns">
              Free shipping on orders above ₹500.
              Standard delivery in 4-6 business days,
              express in 1-2 business days. Easy 15-day
              returns on unworn items in original
              packaging.
            </AccordionItem>

            <AccordionItem title="Care Instructions">
              Store in the pouch provided, away from
              moisture and perfume. Clean gently with a
              soft silver polishing cloth to maintain
              shine.
            </AccordionItem>
          </div>
        </div>
      </div>

      {/* ======================================================
          STOCK POPUP
      ======================================================= */}

      {showStockPopup && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-7 text-center shadow-2xl">
            {/* TITLE */}

            <h2 className="text-xl font-semibold text-[#25314d]">
              Stock Limit
            </h2>

            {/* MESSAGE */}

            <p className="mt-3 text-sm leading-relaxed text-[#827e9c]">
              {stockMessage}
            </p>

            {/* OK BUTTON */}

            <button
              type="button"
              onClick={() =>
                setShowStockPopup(false)
              }
              className="mt-6 w-full rounded-full bg-[#25314d] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#0f172a]"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
}