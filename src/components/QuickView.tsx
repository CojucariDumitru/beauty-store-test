"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Heart, ShoppingBag, X } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import {
  ProductRevealDisplay,
  RevealViewToggle,
  type RevealView,
} from "@/components/ProductRevealDisplay";

export function QuickView() {
  const reduceMotion = useReducedMotion();
  const [view, setView] = useState<RevealView>("bottle");
  const {
    quickViewProduct,
    closeQuickView,
    addToCart,
    toggleWishlist,
    isInWishlist,
  } = useShop();

  const product = quickViewProduct;
  const saved = product ? isInWishlist(product.id) : false;

  useEffect(() => {
    setView("bottle");
  }, [product?.id]);

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.button
            type="button"
            aria-label="Close quick view"
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeQuickView}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Quick view: ${product.name}`}
            className="fixed inset-x-3 bottom-3 top-auto z-50 mx-auto max-h-[92vh] w-[calc(100%-1.5rem)] max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-[8%] sm:w-full sm:-translate-x-1/2"
            initial={reduceMotion ? false : { opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          >
            <button
              type="button"
              onClick={closeQuickView}
              className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 text-[#666] shadow hover:text-[#ee4291]"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative">
              <ProductRevealDisplay
                product={product}
                view={view}
                aspect="wide"
                imageSizes="512px"
                priority
                className="rounded-t-2xl"
              />
              <RevealViewToggle
                view={view}
                onChange={setView}
                className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2"
              />
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2">
                <span
                  className="h-4 w-4 rounded-full border border-black/10"
                  style={{ backgroundColor: product.colorHex }}
                />
                <span className="text-sm text-[#888]">{product.colorName}</span>
              </div>
              <h2 className="mt-2 text-2xl font-semibold">{product.name}</h2>
              <p className="mt-2 text-2xl font-bold text-[#ee4291]">
                ${product.price.toFixed(2)}
              </p>
              <p className="mt-1 text-sm text-[#529a6f]">
                {product.inStock ? "In stock" : "Out of stock"}
              </p>
              <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-[#555]">
                {product.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  disabled={!product.inStock}
                  onClick={() => {
                    addToCart(product);
                    closeQuickView();
                  }}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#ee4291] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#e13e8a] disabled:opacity-50"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Add to cart
                </button>
                <button
                  type="button"
                  onClick={() => toggleWishlist(product)}
                  className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                    saved
                      ? "border-[#ee4291] bg-[#ee4291] text-white"
                      : "border-[#ee4291] text-[#ee4291] hover:bg-[#ee4291]/5"
                  }`}
                >
                  <Heart className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
                  {saved ? "Saved" : "Wishlist"}
                </button>
              </div>

              <Link
                href={`/product/${product.id}`}
                onClick={closeQuickView}
                className="mt-4 flex w-full items-center justify-center rounded-xl border-2 border-[#ee4291] py-3 text-sm font-semibold text-[#ee4291] transition hover:bg-[#ee4291] hover:text-white"
              >
                Open full product page →
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
