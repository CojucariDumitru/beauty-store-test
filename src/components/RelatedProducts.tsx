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
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold">More from {brand}</h2>
          <p className="mt-1 text-sm text-[#888]">
            Other shades you might love
          </p>
        </div>
        <Link
          href={`/?brand=${encodeURIComponent(brand)}`}
          className="text-sm font-medium text-[#ee4291] hover:underline"
        >
          View all {brand} →
        </Link>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-5 sm:gap-6 lg:grid-cols-4">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </section>
  );
}
