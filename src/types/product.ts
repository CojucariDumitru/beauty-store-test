export type ColorFamily =
  | "Pink"
  | "Red"
  | "Coral"
  | "Orange"
  | "Yellow"
  | "Green"
  | "Blue"
  | "Purple"
  | "Neutral"
  | "Multi";

export type SortOption =
  | "default"
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "brand-asc"
  | "color-asc"
  | "newest";

export type Product = {
  id: string;
  name: string;
  brand: string;
  colorName: string;
  colorHex: string;
  colorFamily: ColorFamily;
  price: number;
  description: string;
  bottleImage: string;
  swatchImage: string;
  inStock: boolean;
  published: boolean;
  createdAt: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type CatalogFilters = {
  brands: string[];
  colorFamilies: ColorFamily[];
};
