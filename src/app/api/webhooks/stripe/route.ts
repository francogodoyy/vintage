import { getStripe } from "@/lib/stripe";
import { getOrder, updateOrderStatus, releaseReservation } from "@/lib/redis";

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
      await updateOrderStatus(sessionId, "paid", session.id);

      const order = await getOrder(sessionId);
      if (order?.items) {
        for (const item of order.items) {
          if (item.variantId) {
            await releaseReservation(item.variantId, sessionId);
          }
        }
      }
    }
  }

  return Response.json({ received: true });
}
