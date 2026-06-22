"use client";

import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleCheckout = async () => {
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            variantId: i.variantId,
            productName: i.productName,
            productSlug: i.productSlug,
            size: i.size,
            color: i.color,
            price: i.price,
          })),
        }),
      });

      const data = await res.json();

      if (data.outOfStock) {
        setStatus("error");
        setErrorMsg(data.error);
        return;
      }

      if (data.url) {
        clearCart();
        window.location.href = data.url;
      } else {
        setStatus("error");
        setErrorMsg("Error al procesar el pago. Intentalo de nuevo.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Error de conexión. Revisá tu internet e intentalo de nuevo.");
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-rust mb-2">
          / checkout
        </p>
        <h1 className="text-2xl font-bold uppercase tracking-wide mb-8">
          Tu carrito está vacío
        </h1>
        <Link href="/products">
          <Button variant="secondary">Explorar catálogo</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-rust mb-2">
        / checkout
      </p>
      <h1 className="text-2xl font-bold uppercase tracking-wide mb-8">
        Confirmar compra
      </h1>

      <div className="space-y-4 mb-8">
        {items.map((item) => (
          <div
            key={item.variantId}
            className="flex justify-between items-center p-4 border border-concrete"
          >
            <div>
              <p className="text-sm font-bold uppercase">{item.productName}</p>
              <p className="text-xs text-smoke font-mono mt-1">
                {item.size} / {item.color}
              </p>
            </div>
            <p className="text-lg font-mono font-bold">
              {formatPrice(item.price)}
            </p>
          </div>
        ))}
        <div className="flex justify-between items-center p-4 border border-concrete bg-charcoal">
          <span className="text-sm font-bold uppercase">Total</span>
          <span className="text-xl font-mono font-bold">
            {formatPrice(totalPrice())}
          </span>
        </div>
      </div>

      <Button
        onClick={handleCheckout}
        disabled={status === "loading"}
        className="w-full justify-center"
        size="lg"
      >
        {status === "loading" ? (
          <Loader2 size={16} className="animate-spin mr-2" />
        ) : null}
        {status === "loading" ? "Procesando..." : "Pagar con Stripe"}
      </Button>

      {status === "error" && (
        <p className="text-xs text-rust text-center mt-4 font-mono">
          {errorMsg}
        </p>
      )}
    </div>
  );
}
