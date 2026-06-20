import { seed } from "@/lib/seed";

export async function GET() {
  try {
    await seed();
    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
  }
}
