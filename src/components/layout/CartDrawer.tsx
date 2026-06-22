"use client";

import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";
import ProductImage from "@/components/ui/ProductImage";
import Link from "next/link";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, totalPrice, itemCount } =
    useCartStore();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-carbon/80 z-40"
          onClick={closeCart}
        />
      )}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full max-w-md bg-charcoal border-l border-concrete z-50 transform transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-concrete">
          <h2 className="text-sm font-bold uppercase tracking-widest">
            Carrito ({itemCount()})
          </h2>
          <button onClick={closeCart} className="text-smoke hover:text-parchment">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <p className="text-smoke text-sm text-center mt-8">
              No hay prendas en tu carrito
            </p>
          ) : (
            items.map((item) => (
              <div
                key={item.variantId}
                className="flex gap-3 p-3 border border-concrete"
              >
                <div className="w-20 h-24 bg-concrete flex-shrink-0 overflow-hidden relative">
                  <ProductImage
                    src={item.productImage}
                    alt={item.productName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold uppercase truncate">
                    {item.productName}
                  </p>
                  <p className="text-xs text-smoke mt-1">
                    {item.size} / {item.color}
                  </p>
                  <p className="text-sm font-mono mt-1">{formatPrice(item.price)}</p>
                  {item.reservedUntil && (
                    <p className="text-[10px] text-rust uppercase tracking-widest mt-1">
                      Reservado 15 min
                    </p>
                  )}
                </div>
                <button
                  onClick={() => removeItem(item.variantId)}
                  className="text-smoke hover:text-rust self-start mt-1"
                >
                  <X size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-concrete p-4 space-y-3">
            <div className="flex justify-between text-sm font-mono">
              <span>Total</span>
              <span className="font-bold">{formatPrice(totalPrice())}</span>
            </div>
            <Link href="/checkout">
              <Button
                className="w-full justify-center"
                onClick={closeCart}
                size="lg"
              >
                Pagar
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
