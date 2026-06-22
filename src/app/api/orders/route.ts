import { getOrder } from "@/lib/redis";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("sessionId");

  if (!sessionId) {
    return Response.json({ orders: [] });
  }

  const order = await getOrder(sessionId);
  return Response.json({ orders: order ? [order] : [] });
}
