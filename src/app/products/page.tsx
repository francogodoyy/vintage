export const dynamic = "force-dynamic";

import { getAllProducts } from "@/sanity/lib/queries";
import { getReservedStock } from "@/lib/redis";
import type { Product, Variant } from "@/lib/types";
import CatalogClient from "@/components/product/CatalogClient";

async function getProducts(): Promise<Product[]> {
  const sanityProducts = await getAllProducts();

  return Promise.all(
    sanityProducts.map(async (p: any) => ({
      id: p._id,
      slug: p.slug,
      name: p.name,
      description: p.description,
      category: p.category,
      images: p.images,
      basePrice: p.basePrice,
      era: p.era,
      origin: p.origin,
      material: p.material,
      variants: await Promise.all(
        (p.variants || []).map(async (v: any) => {
          const reservedStock = await getReservedStock(v._key);
          return {
            id: v._key,
            productId: p._id,
            size: v.size,
            color: v.color,
            condition: v.condition as Variant["condition"],
            stock: Math.max(0, (v.stock || 1) - reservedStock),
            priceModifier: v.priceModifier || 0,
            reservedUntil: null,
          };
        })
      ),
    }))
  );
}

export default async function ProductsPage() {
  const productList = await getProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-rust">
          / catálogo
        </p>
        <h1 className="text-2xl font-bold uppercase tracking-wide mt-2">
          Todas las prendas
        </h1>
      </div>
      <CatalogClient products={productList} />
    </div>
  );
}
