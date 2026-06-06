"use client";

import { ShopProvider } from "@/context/ShopContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return <ShopProvider>{children}</ShopProvider>;
}
