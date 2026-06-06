import Link from "next/link";
import type { Product } from "@/types/product";
import { ProductCard } from "@/components/ProductCard";

export function RelatedProducts({
  products,
  brand,
}: {
  products: Product[];
  brand: string;
}) {
  if (products.length === 0) return null;

  return (
    <section className="mt-16 border-t border-[#f0e0e8] pt-12">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-bold sm:text-2xl">More from {brand}</h2>
          <p className="mt-1 text-sm text-[#888]">
            Other shades you might love
          </p>
        </div>
        <Link
          href={`/?brand=${encodeURIComponent(brand)}`}
          className="shrink-0 text-sm font-medium text-[#ee4291] hover:underline"
        >
          View all {brand} →
        </Link>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-6 lg:grid-cols-4">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </section>
  );
}
