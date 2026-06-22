"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { formatPrice } from "@/lib/utils";
import DirectionalTransition from "@/components/ui/DirectionalTransition";

export default function OrdersPage() {
  const searchParams = useSearchParams();
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    async function fetchOrders() {
      const stored = sessionStorage.getItem("orderSessionIds");
      const ids: string[] = stored ? JSON.parse(stored) : [];
      const qp = searchParams.get("sessionId");
      if (qp && !ids.includes(qp)) {
        ids.push(qp);
        sessionStorage.setItem("orderSessionIds", JSON.stringify(ids));
      }

      const all = await Promise.all(
        ids.map(async (id) => {
          const res = await fetch(`/api/orders?sessionId=${id}`);
          const data = await res.json();
          return data.orders?.[0];
        })
      );

      setOrders(all.filter(Boolean));
    }

    fetchOrders();
  }, [searchParams]);

  return (
    <DirectionalTransition>
    <div className="max-w-3xl mx-auto px-4 py-8">
      <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-rust mb-2">
        / pedidos
      </p>
      <h1 className="text-2xl font-bold uppercase tracking-wide mb-8">
        Tus pedidos
      </h1>

      {orders.length === 0 ? (
        <div className="border border-concrete p-12 text-center">
          <p className="text-smoke text-sm">Todavía no hiciste ningún pedido</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order: any) => (
            <div key={order.sessionId} className="border border-concrete p-4">
              <div className="flex justify-between items-start mb-3">
                <span
                  className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 border ${
                    order.status === "paid"
                      ? "text-green-400 border-green-800"
                      : order.status === "pending"
                      ? "text-yellow-400 border-yellow-800"
                      : "text-smoke border-concrete"
                  }`}
                >
                  {order.status === "paid"
                    ? "Pagado"
                    : order.status === "pending"
                    ? "Pendiente"
                    : order.status}
                </span>
              </div>
              <div className="text-xs font-mono text-smoke space-y-1">
                {(order.items || []).map((item: any, i: number) => (
                  <p key={i}>
                    {item.productName} — {item.size} / {item.color} —{" "}
                    {formatPrice(item.price)}
                  </p>
                ))}
              </div>
              <p className="text-lg font-mono font-bold mt-3">
                {formatPrice(order.total)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
    </DirectionalTransition>
  );
}
