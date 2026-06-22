import { createReservation } from "@/lib/redis";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ variantId: string }> }
) {
  const { variantId } = await params;
  const { sessionId } = await _request.json();

  if (!sessionId) {
    return Response.json({ error: "sessionId requerido" }, { status: 400 });
  }

  const ok = await createReservation(variantId, sessionId);
  if (!ok) {
    return Response.json(
      { error: "Ya tenés una reserva activa para esta variante" },
      { status: 409 }
    );
  }

  return Response.json({
    ok: true,
    expiresIn: 15 * 60,
    variantId,
  });
}
