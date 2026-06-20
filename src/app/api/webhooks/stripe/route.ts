import { getStripe } from "@/lib/stripe";
import { getDb } from "@/lib/db";
import { orders } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  const sig = request.headers.get("stripe-signature");
  const body = await request.text();

  if (!sig) {
    return Response.json({ error: "No signature" }, { status: 400 });
  }

  const stripe = getStripe()!;
  const event = stripe.webhooks.constructEvent(
    body,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET!
  );

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const sessionId = session.metadata?.sessionId;

    if (sessionId) {
      const db = getDb();
      if (!db) return Response.json({ error: "DB not configured" }, { status: 500 });
      await db
        .update(orders)
        .set({
          status: "paid",
          stripePaymentId: session.id,
        })
        .where(eq(orders.sessionId, sessionId));
    }
  }

  return Response.json({ received: true });
}
