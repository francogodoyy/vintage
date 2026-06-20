export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  images: string[];
  basePrice: number;
  era: string;
  origin: string;
  material: string;
  variants: Variant[];
}

export interface Variant {
  id: string;
  productId: string;
  size: string;
  color: string;
  condition: "mint" | "excellent" | "good" | "fair";
  stock: number;
  priceModifier: number;
  reservedUntil: string | null;
}

export interface CartItem {
  variantId: string;
  productId: string;
  productName: string;
  productSlug: string;
  productImage: string;
  size: string;
  color: string;
  condition: string;
  price: number;
  quantity: number;
  reservedUntil: string | null;
}

export interface Reservation {
  variantId: string;
  sessionId: string;
  expiresAt: string;
  status: "active" | "expired" | "converted";
}
