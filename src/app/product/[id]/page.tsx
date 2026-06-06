import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById, getProducts, getRelatedProducts } from "@/lib/products";
import { SimpleHeader } from "@/components/SimpleHeader";
import { ShopOverlays } from "@/components/ShopOverlays";
import { ProductGallery } from "@/components/ProductGallery";
import { RelatedProducts } from "@/components/RelatedProducts";
import { ProductActions } from "./ProductActions";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  const products = await getProducts(true);
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) return { title: "Product not found" };

  return {
    title: `${product.name} — ${product.brand} | ANOVA`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.swatchImage }],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product || !product.published) notFound();

  const related = await getRelatedProducts(product, 4);

  return (
    <>
      <SimpleHeader />
      <main className="mx-auto max-w-6xl px-3 py-6 sm:px-6 sm:py-10">
        <nav
          className="flex flex-wrap items-center gap-1 text-xs text-[#ee4291] sm:text-sm"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span className="text-[#ccc]">/</span>
          <Link
            href={`/?brand=${encodeURIComponent(product.brand)}`}
            className="hover:underline"
          >
            {product.brand}
          </Link>
          <span className="text-[#ccc]">/</span>
          <span className="text-[#666]">{product.colorName}</span>
          <span className="text-[#ccc]">/</span>
          <span className="font-medium text-[#444]">{product.name}</span>
        </nav>

        <div className="mt-6 grid gap-8 sm:mt-8 sm:gap-10 lg:grid-cols-2 lg:gap-14">
          <ProductGallery product={product} />

          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#ee4291]">
              {product.brand}
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              {product.name}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span
                className="h-6 w-6 rounded-full border border-black/10 shadow-sm"
                style={{ backgroundColor: product.colorHex }}
              />
              <span className="text-sm font-medium text-[#555]">
                {product.colorName}
              </span>
              <span className="rounded-full bg-[#fafafa] px-3 py-1 text-xs font-medium text-[#888]">
                {product.colorFamily}
              </span>
            </div>

            <p className="mt-6 text-3xl font-bold text-[#ee4291] sm:text-4xl">
              ${product.price.toFixed(2)}
            </p>
            <p
              className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                product.inStock
                  ? "bg-[#529a6f]/10 text-[#529a6f]"
                  : "bg-black/5 text-[#888]"
              }`}
            >
              {product.inStock ? "In stock" : "Out of stock"}
            </p>

            <ProductActions product={product} />

            <div className="mt-10 rounded-2xl border border-[#f0e0e8] bg-white p-6 shadow-sm">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[#999]">
                About this shade
              </h2>
              <p className="mt-4 leading-relaxed text-[#555]">
                {product.description}
              </p>
            </div>

            <dl className="mt-6 grid grid-cols-2 gap-4 rounded-2xl border border-[#f0e0e8] bg-[#fafafa] p-5 text-sm">
              <div>
                <dt className="text-[#999]">Brand</dt>
                <dd className="mt-1 font-medium">{product.brand}</dd>
              </div>
              <div>
                <dt className="text-[#999]">Color family</dt>
                <dd className="mt-1 font-medium">{product.colorFamily}</dd>
              </div>
              <div>
                <dt className="text-[#999]">Shade</dt>
                <dd className="mt-1 font-medium">{product.colorName}</dd>
              </div>
              <div>
                <dt className="text-[#999]">SKU</dt>
                <dd className="mt-1 font-mono text-xs text-[#666]">
                  {product.id}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <RelatedProducts products={related} brand={product.brand} />
      </main>
      <ShopOverlays />
    </>
  );
}
