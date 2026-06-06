"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PAGE_SIZE, SORT_OPTIONS } from "@/lib/catalog";
import { useCatalog } from "@/context/CatalogContext";
import { FilterSidebar } from "@/components/FilterSidebar";
import { ProductCard } from "@/components/ProductCard";

export function ProductCatalog() {
  const {
    filters,
    sort,
    searchQuery,
    page,
    paged,
    totalCount,
    pageCount,
    products,
    setSort,
    setPage,
    setFilters,
    setSearchQuery,
    clearFilters,
  } = useCatalog();

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const rangeStart = totalCount === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(page * PAGE_SIZE, totalCount);

  return (
    <div className="flex flex-col gap-0 lg:flex-row lg:gap-10">
      <FilterSidebar
        mobileOpen={mobileFiltersOpen}
        onMobileOpenChange={setMobileFiltersOpen}
      />

      <div className="min-w-0 flex-1">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <h2 className="text-xl font-bold sm:text-2xl">All polishes</h2>
            <p className="mt-1 text-sm text-[#888]">
              Showing {rangeStart}–{rangeEnd} of {totalCount} shades
              {totalCount !== products.length && (
                <span> (filtered from {products.length})</span>
              )}
            </p>
          </div>

          <div className="flex w-full items-center gap-3 sm:w-auto">
            <label className="sr-only" htmlFor="sort">
              Sort products
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              suppressHydrationWarning
              className="w-full rounded-xl border border-[#f0e0e8] bg-white px-4 py-2.5 text-sm font-medium text-[#111] shadow-sm outline-none transition focus:border-[#ee4291] sm:w-auto"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {(filters.brands.length > 0 ||
          filters.colorFamilies.length > 0 ||
          searchQuery) && (
          <div className="mb-6 flex flex-wrap gap-2">
            {searchQuery && (
              <FilterChip
                label={`Search: "${searchQuery}"`}
                onRemove={() => setSearchQuery("")}
              />
            )}
            {filters.brands.map((brand) => (
              <FilterChip
                key={brand}
                label={brand}
                onRemove={() =>
                  setFilters({
                    ...filters,
                    brands: filters.brands.filter((b) => b !== brand),
                  })
                }
              />
            ))}
            {filters.colorFamilies.map((color) => (
              <FilterChip
                key={color}
                label={color}
                onRemove={() =>
                  setFilters({
                    ...filters,
                    colorFamilies: filters.colorFamilies.filter(
                      (c) => c !== color,
                    ),
                  })
                }
              />
            ))}
          </div>
        )}

        {totalCount === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#ee4291]/40 bg-white py-20 text-center">
            <p className="text-lg font-medium">No polishes match your filters</p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-3 text-sm font-medium text-[#ee4291] hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3 sm:gap-6 xl:grid-cols-3">
              {paged.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                />
              ))}
            </div>

            {pageCount > 1 && (
              <nav
                className="mt-10 flex max-w-full items-center justify-center gap-1 overflow-x-auto px-1 pb-1 sm:gap-2"
                aria-label="Pagination"
              >
                <PaginationButton
                  disabled={page <= 1}
                  onClick={() => setPage(page - 1)}
                  label="Previous page"
                >
                  <ChevronLeft className="h-4 w-4" />
                </PaginationButton>

                <PageNumbers
                  page={page}
                  pageCount={pageCount}
                  onPage={setPage}
                />

                <PaginationButton
                  disabled={page >= pageCount}
                  onClick={() => setPage(page + 1)}
                  label="Next page"
                >
                  <ChevronRight className="h-4 w-4" />
                </PaginationButton>
              </nav>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function FilterChip({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onRemove}
      className="inline-flex items-center gap-1.5 rounded-full bg-[#ee4291]/10 px-3 py-1 text-xs font-medium text-[#ee4291] transition hover:bg-[#ee4291]/20"
    >
      {label}
      <span aria-hidden>×</span>
    </button>
  );
}

function PaginationButton({
  children,
  disabled,
  onClick,
  label,
}: {
  children: React.ReactNode;
  disabled: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#f0e0e8] bg-white text-[#666] transition hover:border-[#ee4291] hover:text-[#ee4291] disabled:opacity-40"
    >
      {children}
    </button>
  );
}

function PageNumbers({
  page,
  pageCount,
  onPage,
}: {
  page: number;
  pageCount: number;
  onPage: (p: number) => void;
}) {
  const pages: (number | "ellipsis")[] = [];
  if (pageCount <= 7) {
    for (let i = 1; i <= pageCount; i++) pages.push(i);
  } else {
    pages.push(1);
    if (page > 3) pages.push("ellipsis");
    for (
      let i = Math.max(2, page - 1);
      i <= Math.min(pageCount - 1, page + 1);
      i++
    ) {
      pages.push(i);
    }
    if (page < pageCount - 2) pages.push("ellipsis");
    pages.push(pageCount);
  }

  return (
    <>
      {pages.map((p, i) =>
        p === "ellipsis" ? (
          <span key={`e-${i}`} className="px-1 text-[#ccc]">
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onPage(p)}
            className={`flex h-10 min-w-10 items-center justify-center rounded-xl px-2 text-sm font-medium transition ${
              p === page
                ? "bg-[#ee4291] text-white shadow-md"
                : "border border-[#f0e0e8] bg-white text-[#666] hover:border-[#ee4291] hover:text-[#ee4291]"
            }`}
          >
            {p}
          </button>
        ),
      )}
    </>
  );
}
