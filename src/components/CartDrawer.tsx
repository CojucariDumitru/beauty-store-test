"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useShop } from "@/context/ShopContext";

export function CartDrawer() {
  const {
    cart,
    cartOpen,
    setCartOpen,
    removeFromCart,
    updateCartQuantity,
    cartTotal,
    cartCount,
  } = useShop();

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.button
            type="button"
            aria-label="Close cart"
            className="fixed inset-0 z-50 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
          />
          <motion.aside
            role="dialog"
            aria-label="Shopping cart"
            className="fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl sm:max-w-md"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 36 }}
          >
            <div className="flex items-center justify-between border-b border-[#f0e0e8] px-6 py-5">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-[#ee4291]" />
                <h2 className="text-lg font-semibold">Your cart</h2>
                <span className="rounded-full bg-[#ee4291]/10 px-2 py-0.5 text-xs font-medium text-[#ee4291]">
                  {cartCount}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                className="rounded-full p-2 hover:bg-[#fafafa]"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center text-[#888]">
                  <ShoppingBag className="mb-4 h-12 w-12 opacity-30" />
                  <p className="font-medium">Your cart is empty</p>
                  <p className="mt-1 text-sm">Add some polishes to get started.</p>
                </div>
              ) : (
                <ul className="space-y-4">
                  {cart.map(({ product, quantity }) => (
                    <li
                      key={product.id}
                      className="flex gap-4 rounded-xl border border-[#f0e0e8] p-3"
                    >
                      <div
                        className="relative h-20 w-16 shrink-0 overflow-hidden rounded-lg"
                        style={{
                          background: `linear-gradient(160deg, #fff, ${product.colorHex}22)`,
                        }}
                      >
                        <Image
                          src={product.bottleImage.split("?")[0]}
                          alt={product.name}
                          fill
                          className="object-contain p-1 drop-shadow-sm"
                          sizes="64px"
                          unoptimized
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <p className="font-medium leading-tight">{product.name}</p>
                        <p className="text-sm text-[#ee4291]">
                          ${product.price.toFixed(2)}
                        </p>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center gap-2 rounded-lg border border-[#eee]">
                            <button
                              type="button"
                              className="p-1.5 hover:text-[#ee4291]"
                              onClick={() =>
                                updateCartQuantity(product.id, quantity - 1)
                              }
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="min-w-[1.5rem] text-center text-sm">
                              {quantity}
                            </span>
                            <button
                              type="button"
                              className="p-1.5 hover:text-[#ee4291]"
                              onClick={() =>
                                updateCartQuantity(product.id, quantity + 1)
                              }
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFromCart(product.id)}
                            className="p-1.5 text-[#999] hover:text-red-500"
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-[#f0e0e8] px-6 py-5">
                <div className="flex justify-between text-base font-semibold">
                  <span>Subtotal</span>
                  <span className="text-[#ee4291]">${cartTotal.toFixed(2)}</span>
                </div>
                <p className="mt-1 text-xs text-[#999]">
                  Checkout is not enabled in this test build.
                </p>
                <button
                  type="button"
                  disabled
                  className="mt-4 w-full rounded-xl bg-[#ee4291]/40 py-3 text-sm font-semibold text-white"
                >
                  Checkout (coming soon)
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
