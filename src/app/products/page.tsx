export const dynamic = "force-dynamic";

import { getDb } from "@/lib/db";
import { products, variants } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getReservedStock } from "@/lib/redis";
import type { Product } from "@/lib/types";
import ProductGrid from "@/components/product/ProductGrid";

async function getProducts(): Promise<Product[]> {
  const db = getDb();
  if (!db) return [];
  const rows = await db
    .select()
    .from(products)
    .leftJoin(variants, eq(variants.productId, products.id));

  const map = new Map<string, Product>();

  for (const row of rows) {
    const p = row.products;
    if (!map.has(p.id)) {
      map.set(p.id, {
        id: p.id,
        slug: p.slug,
        name: p.name,
        description: p.description,
        category: p.category,
        images: p.images,
        basePrice: p.basePrice,
        era: p.era,
        origin: p.origin,
        material: p.material,
        variants: [],
      });
    }
    if (row.variants) {
      const v = row.variants;
      const reservedStock = await getReservedStock(v.id);
      map.get(p.id)!.variants.push({
        id: v.id,
        productId: v.productId,
        size: v.size,
        color: v.color,
        condition: v.condition as Product["variants"][number]["condition"],
        stock: Math.max(0, v.stock - reservedStock),
        priceModifier: v.priceModifier,
        reservedUntil: null,
      });
    }
  }

  return Array.from(map.values());
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
        <p className="text-sm text-smoke mt-1">{productList.length} piezas disponibles</p>
      </div>
      <ProductGrid products={productList} />
    </div>
  );
}
