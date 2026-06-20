import { getStripe } from "@/lib/stripe";
import { getDb } from "@/lib/db";
import { orders } from "@/lib/db/schema";
import { releaseReservation } from "@/lib/redis";

export async function POST(request: Request) {
  const { items } = await request.json();

  if (!items || items.length === 0) {
    return Response.json({ error: "Carrito vacío" }, { status: 400 });
  }

  const total = items.reduce(
    (sum: number, i: { price: number }) => sum + i.price,
    0
  );

  const sessionId = crypto.randomUUID();

  const db = getDb();
  if (!db) return Response.json({ error: "DB not configured" }, { status: 500 });
  await db.insert(orders).values({
    sessionId,
    items,
    total,
    status: "pending",
  });

  const stripe = getStripe()!;
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: items.map(
      (item: {
        productName: string;
        price: number;
        size: string;
        color: string;
      }) => ({
        quantity: 1,
        price_data: {
          currency: "ars",
          product_data: {
            name: item.productName,
            description: `${item.size} / ${item.color}`,
          },
          unit_amount: item.price,
        },
      })
    ),
    success_url: `${request.headers.get("origin")}/orders?success=true`,
    cancel_url: `${request.headers.get("origin")}/cart`,
    metadata: { sessionId },
  });

  return Response.json({ url: session.url });
}
