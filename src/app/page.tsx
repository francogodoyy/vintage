export const dynamic = "force-dynamic";

import Link from "next/link";
import { getAllProducts } from "@/sanity/lib/queries";
import { getReservedStock } from "@/lib/redis";
import type { Product, Variant } from "@/lib/types";
import ProductGrid from "@/components/product/ProductGrid";
import ProductImage from "@/components/ui/ProductImage";
import DirectionalTransition from "@/components/ui/DirectionalTransition";

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
  const featured = productList.filter((p) => p.category === "chaquetas");

  return (
    <DirectionalTransition>
      <section className="relative h-[80vh] min-h-[500px] bg-charcoal border-b border-concrete overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-carbon via-charcoal to-concrete" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, var(--color-parchment) 1px, transparent 0)`,
          backgroundSize: '50px 50px',
        }} />
        <div className="relative z-10 h-full flex flex-col justify-center px-4 max-w-7xl mx-auto">
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-rust mb-4 animate-[fade-in_0.6s_ease-out]">
            Curaduría desde 2024
          </p>
          <h1 className="text-5xl sm:text-7xl font-bold uppercase tracking-tight leading-none animate-[fade-in_0.6s_ease-out_0.15s_both]">
            Ropa con
            <br />
            <span className="text-rust">historia</span>
          </h1>
          <p className="mt-4 text-sm text-smoke max-w-md font-mono animate-[fade-in_0.6s_ease-out_0.3s_both]">
            Cada prenda es seleccionada a mano. Sin reproducciones. Sin moda
            rápida. Solo piezas originales con décadas de vida.
          </p>
          <div className="mt-8 flex gap-4 animate-[fade-in_0.6s_ease-out_0.45s_both]">
            <Link
              href="/products"
              className="inline-flex items-center px-6 py-3 text-sm font-bold uppercase tracking-widest bg-rust text-carbon border border-rust hover:bg-rust-light transition-colors"
            >
              Explorar
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center px-6 py-3 text-sm font-bold uppercase tracking-widest border border-steel text-parchment hover:bg-charcoal transition-colors"
            >
              Nosotros
            </Link>
          </div>
        </div>
      </section>

      <div className="border-y border-concrete bg-charcoal py-3 overflow-hidden">
        <div className="flex whitespace-nowrap gap-8 animate-[marquee_40s_linear_infinite] font-mono text-[10px] uppercase tracking-[0.3em] text-smoke/50">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="flex gap-8">
              <span>●</span>
              <span>VINTAGE AUTÉNTICO</span>
              <span>●</span>
              <span>MODA LENTA</span>
              <span>●</span>
              <span>PIEZAS ÚNICAS</span>
              <span>●</span>
              <span>SIN REPRODUCCIONES</span>
              <span>●</span>
              <span>MODA LENTA</span>
            </span>
          ))}
        </div>
      </div>

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
        <ProductGrid products={productList.slice(0, 6)} />
      </section>

      {featured.length >= 3 && (
        <section className="border-y border-concrete bg-charcoal">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-smoke mb-2">
              / colección destacada
            </h2>
            <p className="text-2xl font-bold uppercase tracking-wide mb-8">
              Chaquetas con historia
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-concrete">
              {featured.slice(0, 3).map((p) => (
                <Link
                  key={p.id}
                  href={`/products/${p.slug}`}
                  className="group bg-carbon p-4 hover:bg-charcoal transition-colors"
                >
                  <div className="aspect-[4/5] bg-concrete overflow-hidden relative mb-4">
                    <ProductImage
                      src={p.images[0]}
                      alt={p.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-smoke">
                    {p.era} / {p.origin}
                  </p>
                  <h3 className="text-sm font-bold uppercase tracking-wide mt-1">
                    {p.name}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-concrete">
          <div className="bg-carbon p-8 text-center">
            <p className="text-3xl font-bold text-rust">+150</p>
            <p className="text-[10px] font-mono uppercase tracking-widest text-smoke mt-2">
              Prendas curadas
            </p>
          </div>
          <div className="bg-carbon p-8 text-center">
            <p className="text-3xl font-bold text-rust">10</p>
            <p className="text-[10px] font-mono uppercase tracking-widest text-smoke mt-2">
              Décadas abarcadas
            </p>
          </div>
          <div className="bg-carbon p-8 text-center">
            <p className="text-3xl font-bold text-rust">2024</p>
            <p className="text-[10px] font-mono uppercase tracking-widest text-smoke mt-2">
              Desde
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-concrete">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-smoke mb-8">
            / lo que dicen
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-concrete">
            {[
              {
                text: "La campera llegó impecable. Se nota que curan cada prenda una por una.",
                author: "Martina G.",
              },
              {
                text: "Compra segura y la prenda es exactamente lo que buscaba. La historia que cuenta vale lo que pagué.",
                author: "Franco L.",
              },
              {
                text: "El sistema de reserva de 15 minutos me dio tiempo para decidirme sin presión. Genial.",
                author: "Camila R.",
              },
            ].map((t) => (
              <div key={t.author} className="bg-carbon p-8">
                <p className="text-sm text-parchment leading-relaxed mb-4">
                  &ldquo;{t.text}&rdquo;
                </p>
                <p className="text-[10px] font-mono uppercase tracking-widest text-smoke">
                  — {t.author}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </DirectionalTransition>
  );
}
