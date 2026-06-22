export const dynamic = "force-dynamic";

import Link from "next/link";
import { getAllProducts } from "@/sanity/lib/queries";
import { getReservedStock } from "@/lib/redis";
import type { Product, Variant } from "@/lib/types";
import ProductGrid from "@/components/product/ProductGrid";

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

export default async function HomePage() {
  const productList = await getProducts();

  return (
    <>
      <section className="relative h-[70vh] min-h-[400px] bg-charcoal border-b border-concrete overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-carbon via-charcoal to-concrete" />
        <div className="relative z-10 h-full flex flex-col justify-center px-4 max-w-7xl mx-auto">
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-rust mb-4">
            Curaduría desde 2024
          </p>
          <h1 className="text-5xl sm:text-7xl font-bold uppercase tracking-tight leading-none">
            Ropa con
            <br />
            <span className="text-rust">historia</span>
          </h1>
          <p className="mt-4 text-sm text-smoke max-w-md font-mono">
            Cada prenda es seleccionada a mano. Sin reproducciones. Sin moda
            rápida. Solo piezas originales con décadas de vida.
          </p>
          <div className="mt-8 flex gap-4">
            <Link
              href="/products"
              className="inline-flex items-center px-6 py-3 text-sm font-bold uppercase tracking-widest bg-rust text-carbon border border-rust hover:bg-rust-light transition-colors"
            >
              Explorar
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center px-6 py-3 text-sm font-bold uppercase tracking-widest border border-steel text-parchment hover:bg-charcoal transition-colors"
            >
              Catálogo
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-smoke">
            / recién llegados
          </h2>
          <Link
            href="/products"
            className="text-[10px] font-mono uppercase tracking-widest text-rust hover:text-rust-light transition-colors"
          >
            Ver todo →
          </Link>
        </div>
        <ProductGrid products={productList} />
      </section>
    </>
  );
}
