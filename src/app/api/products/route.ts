import { getAllProducts } from "@/sanity/lib/queries";
import { getReservedStock } from "@/lib/redis";
import type { Product, Variant } from "@/lib/types";

export async function GET() {
  const sanityProducts = await getAllProducts();

  const products: Product[] = await Promise.all(
    sanityProducts.map(async (p: any) => ({
      id: p._id,
      slug: p.slug,
      name: p.name,
      description: p.description,
      category: p.category,
      images: p.images?.map((img: any) => img.asset?.url || img) || [],
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

  return Response.json(products);
}
