"use client";

import { useState, useCallback } from "react";
import type { Variant } from "@/lib/types";
import { useCartStore } from "@/store/cart";
import Button from "@/components/ui/Button";
import { Loader2 } from "lucide-react";
import ReservationTimer from "./ReservationTimer";

interface ReserveButtonProps {
  variant: Variant;
  price: number;
  productId: string;
  productName: string;
  productSlug: string;
  productImage: string;
  onSuccess: () => void;
}

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = sessionStorage.getItem("rv_session");
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem("rv_session", id);
  }
  return id;
}

export default function ReserveButton({
  variant,
  price,
  productId,
  productName,
  productSlug,
  productImage,
  onSuccess,
}: ReserveButtonProps) {
  const [status, setStatus] = useState<"idle" | "reserving" | "reserved" | "error">("idle");
  const [expiresAt, setExpiresAt] = useState<string | null>(null);
  const addItem = useCartStore((s) => s.addItem);
  const updateReservation = useCartStore((s) => s.updateReservation);

  const handleReserve = useCallback(async () => {
    setStatus("reserving");
    try {
      const sessionId = getSessionId();
      const res = await fetch(`/api/variants/${variant.id}/reserve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });

      if (!res.ok) {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
        return;
      }

      const data = await res.json();
      const now = Date.now();
      const expires = new Date(now + 15 * 60 * 1000).toISOString();
      setExpiresAt(expires);
      setStatus("reserved");

      addItem({
        variantId: variant.id,
        productId,
        productName,
        productSlug,
        productImage,
        size: variant.size,
        color: variant.color,
        condition: variant.condition,
        price,
        quantity: 1,
        reservedUntil: expires,
      });

      updateReservation(variant.id, expires);
      onSuccess();
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  }, [variant, price, productId, productName, productSlug, productImage, addItem, updateReservation, onSuccess]);

  const handleRelease = useCallback(async () => {
    try {
      const sessionId = getSessionId();
      await fetch(`/api/variants/${variant.id}/release`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });
    } catch {
      // silent
    }
    setStatus("idle");
    setExpiresAt(null);
  }, [variant.id]);

  if (status === "reserved" && expiresAt) {
    return (
      <div className="space-y-3">
        <ReservationTimer
          expiresAt={expiresAt}
          onExpire={handleRelease}
          onRelease={handleRelease}
        />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Button
        onClick={handleReserve}
        disabled={status === "reserving"}
        className="w-full justify-center"
        size="lg"
      >
        {status === "reserving" ? (
          <Loader2 size={16} className="animate-spin mr-2" />
        ) : null}
        {status === "reserving"
          ? "Reservando..."
          : status === "error"
          ? "Alguien se adelantó"
          : "Reservar — 15 min"}
      </Button>
      <p className="text-[10px] text-smoke text-center font-mono uppercase tracking-widest">
        Reservalo gratis y pagá después
      </p>
    </div>
  );
}
