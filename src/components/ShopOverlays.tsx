"use client";

import { CartDrawer } from "@/components/CartDrawer";
import { QuickView } from "@/components/QuickView";
import { WishlistDrawer } from "@/components/WishlistDrawer";

export function ShopOverlays() {
  return (
    <>
      <QuickView />
      <CartDrawer />
      <WishlistDrawer />
    </>
  );
}
