"use client";

import { useState } from "react";
import type { Variant } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import ReserveButton from "@/components/reservation/ReserveButton";

interface VariantSelectorProps {
  variants: Variant[];
  basePrice: number;
  productId: string;
  productName: string;
  productSlug: string;
  productImage: string;
  onAddedToCart: () => void;
}

const conditionMap: Record<string, "mint" | "excellent" | "good" | "fair"> = {
  mint: "mint",
  excellent: "excellent",
  good: "good",
  fair: "fair",
};

const conditionText: Record<string, string> = {
  mint: "Mint — impecable",
  excellent: "Excelente — casi nuevo",
  good: "Buen estado — uso normal",
  fair: "Con uso — desgaste visible",
};

function groupBy<T>(items: T[], key: (item: T) => string): Record<string, T[]> {
  const map: Record<string, T[]> = {};
  for (const item of items) {
    const k = key(item);
    if (!map[k]) map[k] = [];
    map[k].push(item);
  }
  return map;
}

export default function VariantSelector({
  variants,
  basePrice,
  productId,
  productName,
  productSlug,
  productImage,
  onAddedToCart,
}: VariantSelectorProps) {
  const sizes = Object.keys(groupBy(variants, (v) => v.size));
  const colors = Object.keys(groupBy(variants, (v) => v.color));

  const [selectedSize, setSelectedSize] = useState(sizes[0] ?? "");
  const [selectedColor, setSelectedColor] = useState(colors[0] ?? "");

  const selectedVariant = variants.find(
    (v) => v.size === selectedSize && v.color === selectedColor
  );

  const price = selectedVariant
    ? basePrice + selectedVariant.priceModifier
    : basePrice;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-widest text-smoke font-mono mb-3">
          Talle
        </p>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={cn(
                "px-4 py-2 text-sm border font-mono transition-colors",
                selectedSize === size
                  ? "bg-rust text-carbon border-rust"
                  : "bg-transparent text-parchment border-steel hover:border-parchment"
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs uppercase tracking-widest text-smoke font-mono mb-3">
          Color
        </p>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={cn(
                "px-4 py-2 text-sm border font-mono transition-colors",
                selectedColor === color
                  ? "bg-rust text-carbon border-rust"
                  : "bg-transparent text-parchment border-steel hover:border-parchment"
              )}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {selectedVariant && (
        <Badge
          variant={conditionMap[selectedVariant.condition] ?? "default"}
          className="text-xs"
        >
          {conditionText[selectedVariant.condition] ?? selectedVariant.condition}
        </Badge>
      )}

      <div className="border-t border-concrete pt-4">
        <p className="text-2xl font-mono font-bold">{formatPrice(price)}</p>
        {selectedVariant && selectedVariant.stock <= 0 && (
          <p className="text-xs text-rust uppercase tracking-widest mt-2 font-mono">
            No disponible — alguien lo está probando
          </p>
        )}
      </div>

      {selectedVariant && selectedVariant.stock > 0 && (
        <ReserveButton
          variant={selectedVariant}
          price={price}
          productId={productId}
          productName={productName}
          productSlug={productSlug}
          productImage={productImage}
          onSuccess={onAddedToCart}
        />
      )}
    </div>
  );
}
