import type {
  CatalogFilters,
  ColorFamily,
  Product,
  SortOption,
} from "@/types/product";

export const COLOR_FAMILIES: ColorFamily[] = [
  "Pink",
  "Red",
  "Coral",
  "Orange",
  "Yellow",
  "Green",
  "Blue",
  "Purple",
  "Neutral",
  "Multi",
];

export const COLOR_FAMILY_ORDER: Record<ColorFamily, number> = {
  Pink: 0,
  Red: 1,
  Coral: 2,
  Orange: 3,
  Yellow: 4,
  Green: 5,
  Blue: 6,
  Purple: 7,
  Neutral: 8,
  Multi: 9,
};

export const COLOR_FAMILY_SWATCHES: Record<ColorFamily, string> = {
  Pink: "#F4A4B8",
  Red: "#D64550",
  Coral: "#FF6B6B",
  Orange: "#F59E42",
  Yellow: "#F5D547",
  Green: "#6BBF8A",
  Blue: "#4A7FD4",
  Purple: "#9B7FD4",
  Neutral: "#C4B8AE",
  Multi: "linear-gradient(135deg,#ee4291,#4a7fd4,#f5d547)",
};

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "default", label: "Featured" },
  { value: "brand-asc", label: "Brand A → Z" },
  { value: "color-asc", label: "Color family" },
  { value: "name-asc", label: "Name A → Z" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "newest", label: "Newest first" },
];

export const PAGE_SIZE = 12;

export function getUniqueBrands(products: Product[]): string[] {
  return [...new Set(products.map((p) => p.brand).filter(Boolean))].sort();
}

export function getActiveColorFamilies(products: Product[]): ColorFamily[] {
  const set = new Set(products.map((p) => p.colorFamily));
  return COLOR_FAMILIES.filter((c) => set.has(c));
}

export function filterProducts(
  products: Product[],
  filters: CatalogFilters,
  searchQuery = "",
): Product[] {
  const q = searchQuery.trim().toLowerCase();

  return products.filter((product) => {
    const brandMatch =
      filters.brands.length === 0 || filters.brands.includes(product.brand);
    const colorMatch =
      filters.colorFamilies.length === 0 ||
      filters.colorFamilies.includes(product.colorFamily);

    const searchMatch =
      !q ||
      product.name.toLowerCase().includes(q) ||
      product.brand.toLowerCase().includes(q) ||
      product.colorName.toLowerCase().includes(q) ||
      product.colorFamily.toLowerCase().includes(q);

    return brandMatch && colorMatch && searchMatch;
  });
}

export function sortProducts(products: Product[], sort: SortOption): Product[] {
  const list = [...products];

  switch (sort) {
    case "price-asc":
      return list.sort((a, b) => a.price - b.price);
    case "price-desc":
      return list.sort((a, b) => b.price - a.price);
    case "name-asc":
      return list.sort((a, b) => a.name.localeCompare(b.name));
    case "brand-asc":
      return list.sort(
        (a, b) =>
          a.brand.localeCompare(b.brand) ||
          COLOR_FAMILY_ORDER[a.colorFamily] - COLOR_FAMILY_ORDER[b.colorFamily] ||
          a.colorName.localeCompare(b.colorName),
      );
    case "color-asc":
      return list.sort(
        (a, b) =>
          COLOR_FAMILY_ORDER[a.colorFamily] -
            COLOR_FAMILY_ORDER[b.colorFamily] ||
          a.brand.localeCompare(b.brand) ||
          a.colorName.localeCompare(b.colorName),
      );
    case "newest":
      return list.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    default:
      return list;
  }
}

export function countForBrand(
  products: Product[],
  brand: string,
  filters: CatalogFilters,
  searchQuery = "",
): number {
  return filterProducts(
    products,
    { ...filters, brands: [brand] },
    searchQuery,
  ).length;
}

export function countForColor(
  products: Product[],
  colorFamily: ColorFamily,
  filters: CatalogFilters,
  searchQuery = "",
): number {
  return filterProducts(
    products,
    { ...filters, colorFamilies: [colorFamily] },
    searchQuery,
  ).length;
}

export function isColorAvailable(
  products: Product[],
  colorFamily: ColorFamily,
  filters: CatalogFilters,
  searchQuery = "",
): boolean {
  return countForColor(products, colorFamily, filters, searchQuery) > 0;
}

export function paginate<T>(items: T[], page: number, pageSize: number): T[] {
  const start = (page - 1) * pageSize;
  return items.slice(start, start + pageSize);
}

export function totalPages(count: number, pageSize: number): number {
  return Math.max(1, Math.ceil(count / pageSize));
}
