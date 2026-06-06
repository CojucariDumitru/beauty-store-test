"use client";

import type { Product } from "@/types/product";
import { CatalogProvider } from "@/context/CatalogContext";
import { Header } from "@/components/Header";
import { ShopOverlays } from "@/components/ShopOverlays";

export function CatalogShell({
  products,
  children,
}: {
  products: Product[];
  children: React.ReactNode;
}) {
  return (
    <CatalogProvider products={products}>
      <Header />
      {children}
      <ShopOverlays />
    </CatalogProvider>
  );
}
