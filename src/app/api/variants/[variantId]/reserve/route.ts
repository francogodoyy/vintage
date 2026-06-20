import { getDb } from "@/lib/db";
import { variants } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { createReservation, getReservedStock } from "@/lib/redis";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ variantId: string }> }
) {
  const { variantId } = await params;

  const db = getDb();
  if (!db) return Response.json({ error: "DB not configured" }, { status: 500 });
  const [variant] = await db
    .select()
    .from(variants)
    .where(eq(variants.id, variantId));

  if (!variant) {
    return Response.json({ error: "Variante no encontrada" }, { status: 404 });
  }

  const reservedStock = await getReservedStock(variantId);
  const availableStock = variant.stock - reservedStock;

  if (availableStock <= 0) {
    return Response.json(
      { error: "No hay stock disponible" },
      { status: 409 }
    );
  }

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
