"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import type { ColorFamily } from "@/types/product";
import {
  COLOR_FAMILIES,
  COLOR_FAMILY_SWATCHES,
  countForBrand,
  countForColor,
  getActiveColorFamilies,
  getUniqueBrands,
  isColorAvailable,
} from "@/lib/catalog";
import { useCatalog } from "@/context/CatalogContext";

type FilterSidebarProps = {
  mobileOpen: boolean;
  onMobileOpenChange: (open: boolean) => void;
};

export function FilterSidebar({
  mobileOpen,
  onMobileOpenChange,
}: FilterSidebarProps) {
  const {
    products,
    filters,
    searchQuery,
    toggleBrand,
    toggleColor,
    clearFilters,
    setFilters,
  } = useCatalog();

  const [brandsOpen, setBrandsOpen] = useState(true);
  const [colorsOpen, setColorsOpen] = useState(true);

  const brands = getUniqueBrands(products);
  const activeColors = getActiveColorFamilies(products);
  const hasFilters =
    filters.brands.length > 0 ||
    filters.colorFamilies.length > 0 ||
    searchQuery.length > 0;

  function selectSingleBrand(brand: string) {
    setFilters({ brands: [brand], colorFamilies: filters.colorFamilies });
  }

  const sidebarContent = (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b border-[#f0e0e8] px-5 py-4">
        <SlidersHorizontal className="h-4 w-4 shrink-0 text-[#ee4291]" />
        <h2 className="font-semibold">Filters</h2>
        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="ml-auto text-xs font-medium text-[#ee4291] hover:underline lg:ml-2"
          >
            Clear all
          </button>
        )}
        <button
          type="button"
          className="rounded-lg p-1.5 hover:bg-[#fafafa] lg:hidden"
          onClick={() => onMobileOpenChange(false)}
          aria-label="Close filters"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5">
        <CollapsibleSection
          title="Brands"
          open={brandsOpen}
          onToggle={() => setBrandsOpen((v) => !v)}
          count={filters.brands.length || undefined}
        >
          <ul className="space-y-0.5">
            {brands.map((brand) => {
              const checked = filters.brands.includes(brand);
              const count = countForBrand(products, brand, filters, searchQuery);
              return (
                <li key={brand}>
                  <div className="group flex items-center gap-1 rounded-lg hover:bg-[#fafafa]">
                    <label className="flex flex-1 cursor-pointer items-center gap-3 px-2 py-2">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleBrand(brand)}
                        suppressHydrationWarning
                        className="h-4 w-4 rounded border-[#ddd] accent-[#ee4291]"
                      />
                      <span className="flex-1 text-sm font-medium">{brand}</span>
                      <span className="text-xs tabular-nums text-[#aaa]">
                        {count}
                      </span>
                    </label>
                    <button
                      type="button"
                      title={`Show only ${brand}`}
                      onClick={() => selectSingleBrand(brand)}
                      className="mr-1 rounded px-1.5 py-0.5 text-[10px] font-medium text-[#ee4291] opacity-0 transition group-hover:opacity-100 hover:bg-[#ee4291]/10"
                    >
                      only
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </CollapsibleSection>

        <CollapsibleSection
          title="Colors"
          open={colorsOpen}
          onToggle={() => setColorsOpen((v) => !v)}
          count={filters.colorFamilies.length || undefined}
          className="mt-6"
        >
          <ul className="space-y-0.5">
            {COLOR_FAMILIES.filter((c) => activeColors.includes(c)).map(
              (color) => {
                const checked = filters.colorFamilies.includes(color);
                const available = isColorAvailable(
                  products,
                  color,
                  filters,
                  searchQuery,
                );
                const count = countForColor(
                  products,
                  color,
                  filters,
                  searchQuery,
                );
                const swatch = COLOR_FAMILY_SWATCHES[color];
                const disabled = !available && !checked;

                return (
                  <li key={color}>
                    <label
                      className={`flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 transition ${
                        disabled
                          ? "cursor-not-allowed opacity-40"
                          : "hover:bg-[#fafafa]"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        disabled={disabled}
                        onChange={() => toggleColor(color)}
                        suppressHydrationWarning
                        className="h-4 w-4 rounded border-[#ddd] accent-[#ee4291]"
                      />
                      <span
                        className="h-5 w-5 shrink-0 rounded-full border border-black/10"
                        style={
                          color === "Multi"
                            ? { backgroundImage: swatch }
                            : { backgroundColor: swatch }
                        }
                      />
                      <span className="flex-1 text-sm font-medium">{color}</span>
                      <span className="text-xs tabular-nums text-[#aaa]">
                        {count}
                      </span>
                    </label>
                  </li>
                );
              },
            )}
          </ul>
        </CollapsibleSection>
      </div>
    </div>
  );

  const activeFilterCount =
    filters.brands.length +
    filters.colorFamilies.length +
    (searchQuery ? 1 : 0);

  return (
    <>
      <button
        type="button"
        onClick={() => onMobileOpenChange(true)}
        className="mb-6 flex items-center gap-2 rounded-xl border border-[#f0e0e8] bg-white px-4 py-2.5 text-sm font-medium shadow-sm lg:hidden"
      >
        <SlidersHorizontal className="h-4 w-4 text-[#ee4291]" />
        Filters
        {activeFilterCount > 0 && (
          <span className="rounded-full bg-[#ee4291] px-2 py-0.5 text-xs text-white">
            {activeFilterCount}
          </span>
        )}
      </button>

      <aside className="hidden w-56 shrink-0 lg:block xl:w-64">
        <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-hidden rounded-2xl border border-[#f0e0e8] bg-white shadow-[0_4px_16px_#ebeff0]">
          {sidebarContent}
        </div>
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close filters"
              className="fixed inset-0 z-50 bg-black/40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => onMobileOpenChange(false)}
            />
            <motion.aside
              role="dialog"
              aria-label="Filters"
              className="fixed bottom-0 left-0 top-0 z-50 w-[min(100%,20rem)] max-w-[85vw] bg-white shadow-2xl sm:max-w-xs lg:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 36 }}
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function CollapsibleSection({
  title,
  open,
  onToggle,
  count,
  className = "",
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  count?: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={className}>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-2 text-left"
      >
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#999]">
          {title}
        </h3>
        {count !== undefined && count > 0 && (
          <span className="rounded-full bg-[#ee4291]/15 px-1.5 py-0.5 text-[10px] font-bold text-[#ee4291]">
            {count}
          </span>
        )}
        <ChevronDown
          className={`ml-auto h-4 w-4 text-[#ccc] transition ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="mt-3">{children}</div>}
    </section>
  );
}
