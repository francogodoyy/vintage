export const dynamic = "force-dynamic";

import { getDb } from "@/lib/db";
import { orders } from "@/lib/db/schema";
import { formatPrice } from "@/lib/utils";

async function getOrders() {
  const db = getDb();
  if (!db) return [];
  return db.select().from(orders).orderBy(orders.createdAt).limit(10);
}

export default async function OrdersPage() {
  const orderList = await getOrders();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-rust mb-2">
        / pedidos
      </p>
      <h1 className="text-2xl font-bold uppercase tracking-wide mb-8">
        Tus pedidos
      </h1>

      {orderList.length === 0 ? (
        <div className="border border-concrete p-12 text-center">
          <p className="text-smoke text-sm">Todavía no hiciste ningún pedido</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orderList.map((order) => (
            <div
              key={order.id}
              className="border border-concrete p-4"
            >
              <div className="flex justify-between items-start mb-3">
                <p className="text-[10px] font-mono uppercase tracking-widest text-smoke">
                  {new Date(order.createdAt).toLocaleDateString("es-AR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
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
                {(order.items as Array<{ productName: string; size: string; color: string; price: number }>).map(
                  (item: any, i: number) => (
                    <p key={i}>
                      {item.productName} — {item.size} / {item.color} —{" "}
                      {formatPrice(item.price)}
                    </p>
                  )
                )}
              </div>
              <p className="text-lg font-mono font-bold mt-3">
                {formatPrice(order.total)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
