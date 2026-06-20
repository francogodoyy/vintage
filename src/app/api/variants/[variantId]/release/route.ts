import { releaseReservation } from "@/lib/redis";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ variantId: string }> }
) {
  const { variantId } = await params;
  const { sessionId } = await _request.json();

  if (!sessionId) {
    return Response.json({ error: "sessionId requerido" }, { status: 400 });
  }

  await releaseReservation(variantId, sessionId);

  return Response.json({ ok: true });
}
