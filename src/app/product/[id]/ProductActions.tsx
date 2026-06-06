"use client";

import { Heart, ShoppingBag, Zap } from "lucide-react";
import type { Product } from "@/types/product";
import { useShop } from "@/context/ShopContext";

export function ProductActions({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const saved = isInWishlist(product.id);

  return (
    <div className="mt-8 space-y-3">
      <button
        type="button"
        disabled={!product.inStock}
        onClick={() => addToCart(product)}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#ee4291] px-6 py-4 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#e13e8a] disabled:opacity-50"
      >
        <ShoppingBag className="h-4 w-4" />
        Add to cart
      </button>
      <button
        type="button"
        disabled={!product.inStock}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#e13e8a]/90 px-6 py-4 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#d1367d] disabled:opacity-50"
      >
        <Zap className="h-4 w-4" />
        Quick order (test)
      </button>
      <button
        type="button"
        onClick={() => toggleWishlist(product)}
        className={`flex w-full items-center justify-center gap-2 rounded-xl border-2 px-6 py-4 text-sm font-semibold transition ${
          saved
            ? "border-[#ee4291] bg-[#ee4291] text-white"
            : "border-[#ee4291] text-[#ee4291] hover:bg-[#ee4291]/5"
        }`}
      >
        <Heart className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
        {saved ? "Saved to wishlist" : "Add to wishlist"}
      </button>
    </div>
  );
}
