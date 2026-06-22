import Link from "next/link";
import Badge from "@/components/ui/Badge";
import ProductImage from "@/components/ui/ProductImage";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
}

const conditionMap: Record<string, "mint" | "excellent" | "good" | "fair"> = {
  mint: "mint",
  excellent: "excellent",
  good: "good",
  fair: "fair",
};

const conditionText: Record<string, string> = {
  mint: "mint",
  excellent: "excelente",
  good: "buen estado",
  fair: "con uso",
};

export default function ProductCard({ product }: ProductCardProps) {
  const lowestPrice = Math.min(
    ...product.variants.map((v) => product.basePrice + v.priceModifier)
  );

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block border border-concrete hover:border-steel transition-colors"
    >
      <div className="aspect-[4/5] bg-concrete overflow-hidden relative">
        <ProductImage
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          priority
        />
      </div>
      <div className="p-4 space-y-2">
        <p className="text-[10px] uppercase tracking-widest text-smoke font-mono">
          {product.era} / {product.origin}
        </p>
        <h3 className="text-sm font-bold uppercase tracking-wide">
          {product.name}
        </h3>
        <div className="flex flex-wrap gap-1">
          {product.variants.map((v) => (
            <Badge key={v.id} variant={conditionMap[v.condition] ?? "default"}>
              {v.size} — {conditionText[v.condition] ?? v.condition}
            </Badge>
          ))}
        </div>
        <p className="text-lg font-mono font-bold pt-1">
          {formatPrice(lowestPrice)}
          {product.variants.length > 1 && (
            <span className="text-xs text-smoke font-normal ml-1">desde</span>
          )}
        </p>
      </div>
    </Link>
  );
}
