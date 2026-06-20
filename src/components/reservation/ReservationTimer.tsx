"use client";

import { useState, useEffect, useCallback } from "react";
import { formatTimeLeft } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Link from "next/link";

interface ReservationTimerProps {
  expiresAt: string;
  onExpire: () => void;
  onRelease: () => void;
}

export default function ReservationTimer({
  expiresAt,
  onExpire,
  onRelease,
}: ReservationTimerProps) {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    function tick() {
      const now = Date.now();
      const target = new Date(expiresAt).getTime();
      const diff = Math.max(0, Math.floor((target - now) / 1000));
      setTimeLeft(diff);
      if (diff <= 0) {
        setExpired(true);
        onExpire();
      }
    }

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [expiresAt, onExpire]);

  if (expired) {
    return (
      <div className="border border-concrete p-4 text-center">
        <p className="text-xs text-rust uppercase tracking-widest font-mono mb-3">
          La reserva expiró
        </p>
        <p className="text-[10px] text-smoke">
          La prenda volvió al catálogo
        </p>
      </div>
    );
  }

  return (
    <div className="border border-rust p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[10px] uppercase tracking-widest text-smoke font-mono">
          Reserva activa
        </p>
        <span className="text-lg font-mono font-bold text-rust">
          {formatTimeLeft(timeLeft)}
        </span>
      </div>
      <div className="flex gap-2">
        <Link href="/cart" className="flex-1">
          <Button variant="primary" size="md" className="w-full justify-center">
            Ir al carrito
          </Button>
        </Link>
        <Button
          variant="ghost"
          size="md"
          onClick={onRelease}
          className="text-rust border-rust/30 hover:bg-rust hover:text-carbon"
        >
          Liberar
        </Button>
      </div>
    </div>
  );
}
