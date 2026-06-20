import { getDb } from "@/lib/db";
import { products, variants } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getReservedStock } from "@/lib/redis";
import type { Product as ProductType } from "@/lib/types";

export async function GET() {
  const db = getDb();
  if (!db) return Response.json([]);
  const rows = await db
    .select()
    .from(products)
    .leftJoin(variants, eq(variants.productId, products.id));

  const productMap = new Map<string, ProductType>();

  for (const row of rows) {
    const p = row.products;
    const v = row.variants;

    if (!productMap.has(p.id)) {
      productMap.set(p.id, {
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

    if (v) {
      const reservedStock = await getReservedStock(v.id);
      productMap.get(p.id)!.variants.push({
        id: v.id,
        productId: v.productId,
        size: v.size,
        color: v.color,
        condition: v.condition as VariantCondition,
        stock: Math.max(0, v.stock - reservedStock),
        priceModifier: v.priceModifier,
        reservedUntil: null,
      });
    }
  }

  return Response.json(Array.from(productMap.values()));
}

type VariantCondition = "mint" | "excellent" | "good" | "fair";
