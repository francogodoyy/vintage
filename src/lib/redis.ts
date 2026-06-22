import { Redis } from "@upstash/redis";

function createRedis() {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null;
  }
  return new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
}

const RESERVATION_TTL = 15 * 60;

export function reservationKey(variantId: string, sessionId: string) {
  return `reservation:${variantId}:${sessionId}`;
}

export function stockKey(variantId: string) {
  return `stock:reserved:${variantId}`;
}

export async function createReservation(
  variantId: string,
  sessionId: string
): Promise<boolean> {
  const redis = createRedis();
  if (!redis) return false;

  const key = reservationKey(variantId, sessionId);
  const existing = await redis.get(key);
  if (existing) return false;

  const stockReserved = await redis.incr(stockKey(variantId));
  await redis.expire(stockKey(variantId), RESERVATION_TTL);

  await redis.set(key, "active", { ex: RESERVATION_TTL });

  return true;
}

export async function releaseReservation(
  variantId: string,
  sessionId: string
) {
  const redis = createRedis();
  if (!redis) return;

  const key = reservationKey(variantId, sessionId);
  await redis.del(key);
  await redis.decr(stockKey(variantId));
}

export async function getReservation(
  variantId: string,
  sessionId: string
): Promise<string | null> {
  const redis = createRedis();
  if (!redis) return null;

  return redis.get(reservationKey(variantId, sessionId));
}

export async function getReservedStock(variantId: string): Promise<number> {
  const redis = createRedis();
  if (!redis) return 0;

  const val = await redis.get(stockKey(variantId));
  return typeof val === "number" ? val : 0;
}

export function orderKey(sessionId: string) {
  return `order:${sessionId}`;
}

export function sessionOrdersKey(sessionId: string) {
  return `session:orders:${sessionId}`;
}

export async function saveOrder(order: {
  sessionId: string;
  items: any[];
  total: number;
  status: string;
  stripePaymentId?: string;
}) {
  const redis = createRedis();
  if (!redis) return;

  await redis.set(orderKey(order.sessionId), JSON.stringify(order));
}

export async function getOrder(sessionId: string) {
  const redis = createRedis();
  if (!redis) return null;

  const raw = await redis.get(orderKey(sessionId));
  if (!raw) return null;
  return typeof raw === "string" ? JSON.parse(raw) : raw;
}

export async function updateOrderStatus(
  sessionId: string,
  status: string,
  stripePaymentId?: string
) {
  const redis = createRedis();
  if (!redis) return;

  const order = await getOrder(sessionId);
  if (order) {
    order.status = status;
    if (stripePaymentId) order.stripePaymentId = stripePaymentId;
    await redis.set(orderKey(sessionId), JSON.stringify(order));
  }
}
