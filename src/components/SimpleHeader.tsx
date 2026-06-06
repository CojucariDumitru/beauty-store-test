"use client";

import { Heart, ShoppingBag } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { BackToShopLink } from "@/components/BackToShopLink";
import { StoreLogo } from "@/components/StoreLogo";

export function SimpleHeader() {
  const { cartCount, wishlist, setCartOpen, setWishlistOpen } = useShop();

  return (
    <header className="sticky top-0 z-40 border-b border-[#f0e0e8] bg-white/90 py-3 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
        <BackToShopLink />
        <StoreLogo />
        <nav className="flex gap-2">
          <button
            type="button"
            onClick={() => setWishlistOpen(true)}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#fafafa] text-[#ee4291]"
            aria-label="Wishlist"
          >
            <Heart className="h-5 w-5" />
            {wishlist.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#ee4291] text-[9px] font-bold text-white">
                {wishlist.length}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#fafafa] text-[#ee4291]"
            aria-label="Cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#ee4291] text-[9px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
