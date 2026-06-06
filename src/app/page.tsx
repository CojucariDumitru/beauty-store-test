import { getProducts } from "@/lib/products";
import { ProductCatalog } from "@/components/ProductCatalog";
import { CatalogShell } from "@/components/CatalogShell";
import { HeroBanner } from "@/components/HeroBanner";

export default async function HomePage() {
  const products = await getProducts(true);

  return (
    <CatalogShell products={products}>
      <main>
        <HeroBanner />

        <section
          id="catalog"
          className="mx-auto max-w-7xl px-3 py-8 sm:px-6 sm:py-12"
        >
          {products.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#ee4291]/40 bg-white py-20 text-center">
              <p className="text-lg font-medium">No products yet</p>
              <p className="mt-2 text-sm text-[#888]">
                Add polishes from the{" "}
                <a href="/admin" className="text-[#ee4291] underline">
                  admin page
                </a>
                .
              </p>
            </div>
          ) : (
            <ProductCatalog />
          )}
        </section>
      </main>
    </CatalogShell>
  );
}
