import { promises as fs } from "fs";
import path from "path";
import { assetPath } from "@/lib/assetPath";
import type { Product } from "@/types/product";

const DATA_PATH = path.join(process.cwd(), "data", "products.json");

function withAssetPaths(product: Product): Product {
  return {
    ...product,
    bottleImage: assetPath(product.bottleImage),
    swatchImage: assetPath(product.swatchImage),
  };
}

export async function getProducts(publishedOnly = true): Promise<Product[]> {
  const raw = await fs.readFile(DATA_PATH, "utf-8");
  const products = (JSON.parse(raw) as Product[]).map(withAssetPaths);
  return publishedOnly ? products.filter((p) => p.published) : products;
}

export async function getProductById(id: string): Promise<Product | null> {
  const products = await getProducts(false);
  return products.find((p) => p.id === id) ?? null;
}

export async function getRelatedProducts(
  product: Product,
  limit = 4,
): Promise<Product[]> {
  const products = await getProducts(true);
  return products
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.brand === product.brand || p.colorFamily === product.colorFamily),
    )
    .slice(0, limit);
}

export async function getProductsByBrand(brand: string): Promise<Product[]> {
  const products = await getProducts(true);
  return products.filter((p) => p.brand === brand);
}

export async function saveProducts(products: Product[]): Promise<void> {
  await fs.writeFile(DATA_PATH, JSON.stringify(products, null, 2), "utf-8");
}

export async function addProduct(
  input: Omit<Product, "id" | "createdAt">,
): Promise<Product> {
  const products = await getProducts(false);
  const product: Product = {
    ...input,
    id: `prod-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  products.unshift(product);
  await saveProducts(products);
  return product;
}

export async function deleteProduct(id: string): Promise<boolean> {
  const products = await getProducts(false);
  const next = products.filter((p) => p.id !== id);
  if (next.length === products.length) return false;
  await saveProducts(next);
  return true;
}
