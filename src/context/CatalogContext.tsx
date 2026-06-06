"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CatalogFilters, ColorFamily, Product, SortOption } from "@/types/product";
import {
  PAGE_SIZE,
  filterProducts,
  paginate,
  sortProducts,
  totalPages,
} from "@/lib/catalog";

type CatalogContextValue = {
  products: Product[];
  filters: CatalogFilters;
  sort: SortOption;
  searchQuery: string;
  page: number;
  filtered: Product[];
  sorted: Product[];
  paged: Product[];
  totalCount: number;
  pageCount: number;
  setFilters: (filters: CatalogFilters) => void;
  setSort: (sort: SortOption) => void;
  setSearchQuery: (q: string) => void;
  setPage: (page: number) => void;
  toggleBrand: (brand: string) => void;
  toggleColor: (color: ColorFamily) => void;
  clearFilters: () => void;
  selectBrandOnly: (brand: string) => void;
};

const CatalogContext = createContext<CatalogContextValue | null>(null);

export function CatalogProvider({
  products,
  children,
}: {
  products: Product[];
  children: React.ReactNode;
}) {
  const [filters, setFilters] = useState<CatalogFilters>({
    brands: [],
    colorFamilies: [],
  });
  const [sort, setSort] = useState<SortOption>("default");
  const [searchQuery, setSearchQueryState] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const brand = params.get("brand");
    if (brand) {
      setFilters({ brands: [brand], colorFamilies: [] });
    }
  }, []);

  const setSearchQuery = useCallback((q: string) => {
    setSearchQueryState(q);
    setPage(1);
  }, []);

  const setFiltersAndResetPage = useCallback((next: CatalogFilters) => {
    setFilters(next);
    setPage(1);
  }, []);

  const setSortAndResetPage = useCallback((next: SortOption) => {
    setSort(next);
    setPage(1);
  }, []);

  const filtered = useMemo(
    () => filterProducts(products, filters, searchQuery),
    [products, filters, searchQuery],
  );

  const sorted = useMemo(
    () => sortProducts(filtered, sort),
    [filtered, sort],
  );

  const paged = useMemo(
    () => paginate(sorted, page, PAGE_SIZE),
    [sorted, page],
  );

  const pageCount = totalPages(filtered.length, PAGE_SIZE);

  const toggleBrand = useCallback((brand: string) => {
    setFilters((prev) => {
      const next = prev.brands.includes(brand)
        ? prev.brands.filter((b) => b !== brand)
        : [...prev.brands, brand];
      return { ...prev, brands: next };
    });
    setPage(1);
  }, []);

  const toggleColor = useCallback((color: ColorFamily) => {
    setFilters((prev) => {
      const next = prev.colorFamilies.includes(color)
        ? prev.colorFamilies.filter((c) => c !== color)
        : [...prev.colorFamilies, color];
      return { ...prev, colorFamilies: next };
    });
    setPage(1);
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({ brands: [], colorFamilies: [] });
    setSearchQueryState("");
    setPage(1);
  }, []);

  const selectBrandOnly = useCallback((brand: string) => {
    setFilters({ brands: [brand], colorFamilies: [] });
    setPage(1);
  }, []);

  const value = useMemo<CatalogContextValue>(
    () => ({
      products,
      filters,
      sort,
      searchQuery,
      page,
      filtered,
      sorted,
      paged,
      totalCount: filtered.length,
      pageCount,
      setFilters: setFiltersAndResetPage,
      setSort: setSortAndResetPage,
      setSearchQuery,
      setPage,
      toggleBrand,
      toggleColor,
      clearFilters,
      selectBrandOnly,
    }),
    [
      products,
      filters,
      sort,
      searchQuery,
      page,
      filtered,
      sorted,
      paged,
      pageCount,
      setFiltersAndResetPage,
      setSortAndResetPage,
      setSearchQuery,
      toggleBrand,
      toggleColor,
      clearFilters,
      selectBrandOnly,
    ],
  );

  return (
    <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
  );
}

export function useCatalog() {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error("useCatalog must be used within CatalogProvider");
  return ctx;
}
