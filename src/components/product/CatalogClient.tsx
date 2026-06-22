"use client";

import { useState, useMemo } from "react";
import type { Product } from "@/lib/types";
import ProductGrid from "./ProductGrid";
import { Search } from "lucide-react";

const CATEGORIES = [
  { value: "", label: "Todas" },
  { value: "chaquetas", label: "Chaquetas" },
  { value: "pantalones", label: "Pantalones" },
  { value: "remeras", label: "Remeras" },
  { value: "abrigos", label: "Abrigos" },
  { value: "calzado", label: "Calzado" },
  { value: "chalecos", label: "Chalecos" },
  { value: "accesorios", label: "Accesorios" },
];

export default function CatalogClient({ products }: { products: Product[] }) {
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCategory = !category || p.category === category;
      const matchSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.era.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [products, category, search]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-smoke"
          />
          <input
            type="text"
            placeholder="Buscar por nombre, época..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-10 pr-4 text-sm bg-charcoal border border-concrete text-parchment placeholder:text-smoke focus:outline-none focus:border-rust font-mono"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setCategory(cat.value)}
            className={`px-4 py-2 text-[10px] font-mono uppercase tracking-widest border transition-colors ${
              category === cat.value
                ? "bg-rust text-carbon border-rust"
                : "bg-transparent text-smoke border-concrete hover:border-parchment hover:text-parchment"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="border border-concrete p-12 text-center">
          <p className="text-smoke text-sm">
            No encontramos prendas con esos filtros
          </p>
        </div>
      ) : (
        <div>
          <p className="text-[10px] font-mono text-smoke mb-4">
            {filtered.length} de {products.length} piezas
          </p>
          <ProductGrid products={filtered} />
        </div>
      )}
    </div>
  );
}
