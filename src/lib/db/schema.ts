import {
  pgTable,
  text,
  integer,
  timestamp,
  uuid,
  real,
  jsonb,
} from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").unique().notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  images: jsonb("images").$type<string[]>().notNull().default([]),
  basePrice: integer("base_price").notNull(),
  era: text("era").notNull(),
  origin: text("origin").notNull(),
  material: text("material").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const variants = pgTable("variants", {
  id: uuid("id").primaryKey().defaultRandom(),
  productId: uuid("product_id")
    .references(() => products.id, { onDelete: "cascade" })
    .notNull(),
  size: text("size").notNull(),
  color: text("color").notNull(),
  condition: text("condition", {
    enum: ["mint", "excellent", "good", "fair"],
  }).notNull(),
  stock: integer("stock").notNull().default(0),
  priceModifier: integer("price_modifier").notNull().default(0),
});

export const orders = pgTable("orders", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionId: text("session_id").notNull(),
  items: jsonb("items").$type<{
    variantId: string;
    productName: string;
    size: string;
    color: string;
    price: number;
  }[]>().notNull().default([]),
  total: integer("total").notNull(),
  status: text("status", {
    enum: ["pending", "paid", "shipped", "cancelled"],
  }).notNull().default("pending"),
  stripePaymentId: text("stripe_payment_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
