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
      <div className="mx-auto max-w-7xl px-3 sm:px-6">
        <div className="grid min-h-11 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-x-2 sm:min-h-[3.25rem] sm:gap-x-4">
          {/* Left: search + brands */}
          <div className="z-10 flex min-w-0 items-center gap-1.5 sm:gap-3">
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

            <div className="relative hidden min-w-0 lg:block">
              <button
                type="button"
                onClick={() => setBrandsOpen((v) => !v)}
                className={`flex max-w-full items-center gap-1 rounded-xl border px-2.5 py-2 text-xs font-medium transition sm:gap-2 sm:px-3 sm:py-2.5 sm:text-sm ${
                  brandsOpen || filters.brands.length > 0
                    ? "border-[#ee4291] bg-[#ee4291]/5 text-[#ee4291]"
                    : "border-[#f0e0e8] bg-white text-[#555] hover:border-[#ee4291]/40"
                }`}
              >
                <span className="hidden min-[400px]:inline">Brands</span>
                <span className="min-[400px]:hidden">Brand</span>
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
                      className="absolute left-0 top-full z-40 mt-2 w-48 rounded-2xl border border-[#f0e0e8] bg-white p-2 shadow-xl sm:w-52"
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

          {/* Center logo — reserved column, no overlap with sides */}
          <div className="flex shrink-0 justify-center px-1 sm:px-2">
            <StoreLogo />
          </div>

          {/* Right actions */}
          <nav className="z-10 flex min-w-0 items-center justify-end gap-2">
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
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="relative pt-3">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#ccc]" />
                <input
                  ref={searchRef}
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, brand, or color…"
                  suppressHydrationWarning
                  className="w-full rounded-2xl border border-[#f0e0e8] bg-[#fafafa] py-3 pl-11 pr-10 text-sm outline-none transition focus:border-[#ee4291] focus:bg-white"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#999] hover:bg-[#eee]"
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
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#fafafa] text-[#ee4291] transition-colors hover:bg-[#ee4291] hover:text-white sm:h-11 sm:w-11"
    >
      {children}
      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ee4291] px-1 text-[10px] font-bold text-white shadow-sm">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </button>
  );
}
