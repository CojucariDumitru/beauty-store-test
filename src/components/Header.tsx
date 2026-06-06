"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Heart,
  Search,
  ShoppingBag,
  X,
} from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { useCatalog } from "@/context/CatalogContext";
import { getUniqueBrands } from "@/lib/catalog";
import { StoreLogo } from "@/components/StoreLogo";

export function Header() {
  const { cartCount, wishlist, setCartOpen, setWishlistOpen } = useShop();
  const {
    products,
    searchQuery,
    setSearchQuery,
    filters,
    selectBrandOnly,
    toggleBrand,
    totalCount,
  } = useCatalog();

  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [brandsOpen, setBrandsOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const brands = getUniqueBrands(products);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-all duration-300 ${
        scrolled
          ? "border-[#f0e0e8] bg-white/95 py-2 shadow-[0_4px_20px_rgba(238,66,145,0.08)] backdrop-blur-lg"
          : "border-transparent bg-white/80 py-4 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          {/* Left: search + brands */}
          <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setSearchOpen((v) => !v)}
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition sm:h-11 sm:w-11 ${
                searchOpen
                  ? "bg-[#ee4291] text-white"
                  : "bg-[#fafafa] text-[#ee4291] hover:bg-[#ee4291] hover:text-white"
              }`}
              aria-label="Toggle search"
            >
              <Search className="h-5 w-5" />
            </button>

            <div className="relative hidden sm:block">
              <button
                type="button"
                onClick={() => setBrandsOpen((v) => !v)}
                className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
                  brandsOpen || filters.brands.length > 0
                    ? "border-[#ee4291] bg-[#ee4291]/5 text-[#ee4291]"
                    : "border-[#f0e0e8] bg-white text-[#555] hover:border-[#ee4291]/40"
                }`}
              >
                Brands
                {filters.brands.length > 0 && (
                  <span className="rounded-full bg-[#ee4291] px-1.5 py-0.5 text-[10px] font-bold text-white">
                    {filters.brands.length}
                  </span>
                )}
                <ChevronDown
                  className={`h-4 w-4 transition ${brandsOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {brandsOpen && (
                  <>
                    <button
                      type="button"
                      className="fixed inset-0 z-30"
                      aria-label="Close brands menu"
                      onClick={() => setBrandsOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="absolute left-0 top-full z-40 mt-2 w-52 rounded-2xl border border-[#f0e0e8] bg-white p-2 shadow-xl"
                    >
                      {brands.map((brand) => {
                        const active = filters.brands.includes(brand);
                        return (
                          <button
                            key={brand}
                            type="button"
                            onClick={() => toggleBrand(brand)}
                            onDoubleClick={() => {
                              selectBrandOnly(brand);
                              setBrandsOpen(false);
                            }}
                            className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                              active
                                ? "bg-[#ee4291] text-white"
                                : "text-[#444] hover:bg-[#fafafa]"
                            }`}
                          >
                            {brand}
                            {active && <span className="text-xs opacity-80">✓</span>}
                          </button>
                        );
                      })}
                      <p className="mt-1 px-2 pb-1 text-[10px] text-[#aaa]">
                        Double-click a brand to show only that brand
                      </p>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <span className="hidden text-xs text-[#aaa] lg:inline">
              {totalCount} shades
            </span>
          </div>

          {/* Center logo */}
          <StoreLogo size="md" />

          {/* Right actions */}
          <nav className="flex flex-1 items-center justify-end gap-2">
            <HeaderIconButton
              label="Wishlist"
              count={wishlist.length}
              onClick={() => setWishlistOpen(true)}
            >
              <Heart className="h-5 w-5" />
            </HeaderIconButton>
            <HeaderIconButton
              label="Cart"
              count={cartCount}
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag className="h-5 w-5" />
            </HeaderIconButton>
            <Link
              href="/admin"
              className="hidden rounded-xl border border-[#ee4291]/30 px-3 py-2 text-xs font-medium text-[#ee4291] transition hover:bg-[#ee4291] hover:text-white sm:inline-block"
            >
              Admin
            </Link>
          </nav>
        </div>

        {/* Expandable search bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="relative pt-3">
                <Search className="absolute left-4 top-1/2 mt-1.5 h-4 w-4 -translate-y-1/2 text-[#ccc]" />
                <input
                  ref={searchRef}
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, brand, or color…"
                  className="w-full rounded-2xl border border-[#f0e0e8] bg-[#fafafa] py-3 pl-11 pr-10 text-sm outline-none transition focus:border-[#ee4291] focus:bg-white focus:shadow-[0_0_0_3px_rgba(238,66,145,0.12)]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 mt-1.5 -translate-y-1/2 rounded-full p-1 text-[#999] hover:bg-[#eee]"
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

function HeaderIconButton({
  children,
  label,
  count,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  count: number;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      onClick={onClick}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#fafafa] text-[#ee4291] transition-colors hover:bg-[#ee4291] hover:text-white sm:h-11 sm:w-11"
    >
      {children}
      <AnimatePresence>
        {count > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ee4291] px-1 text-[10px] font-bold text-white shadow-sm"
          >
            {count > 99 ? "99+" : count}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
