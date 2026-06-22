import { getStripe } from "@/lib/stripe";
import { saveOrder, getReservedStock } from "@/lib/redis";
import { client } from "@/sanity/lib/client";

export async function POST(request: Request) {
  const { items, sessionId } = await request.json();

  if (!items || items.length === 0) {
    return Response.json({ error: "Carrito vacío" }, { status: 400 });
  }

  const id = sessionId || crypto.randomUUID();

  for (const item of items) {
    if (!item.productSlug) continue;

    const p = await client.fetch(
      `*[_type == "product" && slug.current == $slug][0]{
        variants[_key == $variantKey][0]{ stock }
      }`,
      { slug: item.productSlug, variantKey: item.variantId }
    );

    const totalStock = p?.variants?.[0]?.stock ?? 1;
    const reservedStock = await getReservedStock(item.variantId);
    const available = Math.max(0, totalStock - reservedStock);

    if (available <= 0) {
      return Response.json(
        {
          error: `"${item.productName}" (${item.size} / ${item.color}) ya no está disponible`,
          outOfStock: true,
          variantId: item.variantId,
        },
        { status: 409 }
      );
    }
  }

  const total = items.reduce(
    (sum: number, i: { price: number }) => sum + i.price,
    0
  );

  await saveOrder({
    sessionId: id,
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
    success_url: `${request.headers.get("origin")}/orders?sessionId=${id}`,
    cancel_url: `${request.headers.get("origin")}/cart`,
    metadata: { sessionId: id },
  });

  return Response.json({ url: session.url, sessionId: id });
}
