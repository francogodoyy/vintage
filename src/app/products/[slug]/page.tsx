export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { getProductBySlug } from "@/sanity/lib/queries";
import { getReservedStock } from "@/lib/redis";
import type { Product, Variant } from "@/lib/types";
import VariantSelector from "@/components/product/VariantSelector";
import ImageGallery from "@/components/product/ImageGallery";
import DirectionalTransition from "@/components/ui/DirectionalTransition";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const p = await getProductBySlug(slug);
  if (!p) notFound();

  const product: Product = {
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
  };

  return (
    <DirectionalTransition>
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <ImageGallery images={product.images} name={product.name} />

        <div className="space-y-6">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-smoke font-mono">
              {product.category.toUpperCase()} / {product.era} /{" "}
              {product.origin}
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-wide mt-2">
              {product.name}
            </h1>
          </div>

          <p className="text-sm text-smoke leading-relaxed">
            {product.description}
          </p>

          <div className="border-t border-concrete pt-4 grid grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <span className="text-smoke uppercase tracking-widest">Era</span>
              <p className="text-parchment mt-1">{product.era}</p>
            </div>
            <div>
              <span className="text-smoke uppercase tracking-widest">
                Origen
              </span>
              <p className="text-parchment mt-1">{product.origin}</p>
            </div>
            <div>
              <span className="text-smoke uppercase tracking-widest">
                Material
              </span>
              <p className="text-parchment mt-1">{product.material}</p>
            </div>
          </div>

          <VariantSelector
            variants={product.variants}
            basePrice={product.basePrice}
            productId={product.id}
            productName={product.name}
            productSlug={product.slug}
            productImage={product.images[0]}
          />
        </div>
      </div>
    </div>
    </DirectionalTransition>
  );
}
