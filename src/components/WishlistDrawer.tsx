"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, X } from "lucide-react";
import { useShop } from "@/context/ShopContext";

export function WishlistDrawer() {
  const {
    wishlist,
    wishlistOpen,
    setWishlistOpen,
    toggleWishlist,
    addToCart,
  } = useShop();

  return (
    <AnimatePresence>
      {wishlistOpen && (
        <>
          <motion.button
            type="button"
            aria-label="Close wishlist"
            className="fixed inset-0 z-50 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setWishlistOpen(false)}
          />
          <motion.aside
            role="dialog"
            aria-label="Wishlist"
            className="fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 36 }}
          >
            <div className="flex items-center justify-between border-b border-[#f0e0e8] px-6 py-5">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 fill-[#ee4291] text-[#ee4291]" />
                <h2 className="text-lg font-semibold">Wishlist</h2>
                <span className="rounded-full bg-[#ee4291]/10 px-2 py-0.5 text-xs font-medium text-[#ee4291]">
                  {wishlist.length}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setWishlistOpen(false)}
                className="rounded-full p-2 hover:bg-[#fafafa]"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {wishlist.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center text-[#888]">
                  <Heart className="mb-4 h-12 w-12 opacity-30" />
                  <p className="font-medium">No saved polishes yet</p>
                  <p className="mt-1 text-sm">
                    Tap the heart on any product to save it here.
                  </p>
                </div>
              ) : (
                <ul className="space-y-4">
                  {wishlist.map((product) => (
                    <li
                      key={product.id}
                      className="flex gap-4 rounded-xl border border-[#f0e0e8] p-3"
                    >
                      <Link
                        href={`/product/${product.id}`}
                        onClick={() => setWishlistOpen(false)}
                        className="relative h-20 w-16 shrink-0 overflow-hidden rounded-lg"
                      >
                        <Image
                          src={product.swatchImage}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </Link>
                      <div className="flex flex-1 flex-col">
                        <Link
                          href={`/product/${product.id}`}
                          onClick={() => setWishlistOpen(false)}
                          className="font-medium hover:text-[#ee4291]"
                        >
                          {product.name}
                        </Link>
                        <p className="text-sm text-[#ee4291]">
                          ${product.price.toFixed(2)}
                        </p>
                        <div className="mt-auto flex gap-2">
                          <button
                            type="button"
                            disabled={!product.inStock}
                            onClick={() => addToCart(product)}
                            className="flex items-center gap-1 rounded-lg bg-[#ee4291] px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-50"
                          >
                            <ShoppingBag className="h-3.5 w-3.5" />
                            Add
                          </button>
                          <button
                            type="button"
                            onClick={() => toggleWishlist(product)}
                            className="rounded-lg border border-[#eee] px-3 py-1.5 text-xs text-[#888] hover:border-red-200 hover:text-red-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
