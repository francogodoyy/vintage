"use client";

import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";
import ProductImage from "@/components/ui/ProductImage";
import DirectionalTransition from "@/components/ui/DirectionalTransition";
import Link from "next/link";
import { X } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, totalPrice, itemCount } = useCartStore();

  return (
    <DirectionalTransition>
    <div className="max-w-3xl mx-auto px-4 py-8">
      <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-rust mb-2">
        / carrito
      </p>
      <h1 className="text-2xl font-bold uppercase tracking-wide mb-8">
        Tu carrito
      </h1>

      {items.length === 0 ? (
        <div className="border border-concrete p-12 text-center">
          <p className="text-smoke text-sm mb-4">No hay prendas en tu carrito</p>
          <Link href="/products">
            <Button variant="secondary">Explorar catálogo</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.variantId}
              className="flex gap-4 p-4 border border-concrete"
            >
              <div className="w-24 h-28 bg-concrete flex-shrink-0 overflow-hidden relative">
                <ProductImage
                  src={item.productImage}
                  alt={item.productName}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold uppercase">{item.productName}</p>
                <p className="text-xs text-smoke font-mono mt-1">
                  {item.size} / {item.color} / {item.condition}
                </p>
                <p className="text-lg font-mono font-bold mt-2">
                  {formatPrice(item.price)}
                </p>
                {item.reservedUntil && (
                  <p className="text-[10px] text-rust uppercase tracking-widest font-mono mt-1">
                    Reservado por 15 min
                  </p>
                )}
              </div>
              <button
                onClick={() => removeItem(item.variantId)}
                className="text-smoke hover:text-rust self-start"
              >
                <X size={18} />
              </button>
            </div>
          ))}

          <div className="border border-concrete p-4 mt-6">
            <div className="flex justify-between items-center text-lg font-mono font-bold mb-4">
              <span>Total</span>
              <span>{formatPrice(totalPrice())}</span>
            </div>
            <Link href="/checkout">
              <Button className="w-full justify-center" size="lg">
                Ir a pagar
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
    </DirectionalTransition>
  );
}
