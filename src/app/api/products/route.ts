import { NextResponse } from "next/server";
import { addProduct, getProducts } from "@/lib/products";
import type { Product } from "@/types/product";

export async function GET() {
  const products = await getProducts(true);
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const auth = request.headers.get("x-admin-password");
  const expected = process.env.ADMIN_PASSWORD ?? "beauty-test";
  if (auth !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as Omit<Product, "id" | "createdAt">;
  if (!body.name || !body.bottleImage || !body.swatchImage) {
    return NextResponse.json(
      { error: "Name and both images are required" },
      { status: 400 },
    );
  }

  const product = await addProduct({
    name: body.name,
    brand: body.brand ?? "Beauty-Store",
    colorName: body.colorName ?? "Custom",
    colorHex: body.colorHex ?? "#EE4291",
    colorFamily: body.colorFamily ?? "Pink",
    price: Number(body.price) || 0,
    description: body.description ?? "",
    bottleImage: body.bottleImage,
    swatchImage: body.swatchImage,
    inStock: body.inStock ?? true,
    published: body.published ?? true,
  });

  return NextResponse.json(product, { status: 201 });
}
