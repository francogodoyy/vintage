import { getDb } from "./db";
import { products, variants } from "./db/schema";

const seedProducts = [
  {
    slug: "leather-bomber-90s",
    name: "Chaqueta Bomber de Cuero '90s",
    description:
      "Auténtica chaqueta bomber de cuero de los años 90. Encontrada en un depósito en Buenos Aires, con ese desgaste natural que solo el tiempo regala. Cierre metálico original, forro interior de seda sintética con pequeñas reparaciones. Cada mancha cuenta una historia.",
    category: "chaquetas",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
      "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=800&q=80",
    ],
    basePrice: 85000,
    era: "1990s",
    origin: "Buenos Aires, Argentina",
    material: "Cuero vacuno",
    variantList: [
      { size: "M", color: "Negro", condition: "good" as const, stock: 1, priceModifier: 0 },
      { size: "L", color: "Negro", condition: "excellent" as const, stock: 1, priceModifier: 15000 },
      { size: "XL", color: "Marrón", condition: "fair" as const, stock: 1, priceModifier: -10000 },
    ],
  },
  {
    slug: "denim-raw-70s",
    name: "Jeans Raw Denim Años 70",
    description:
      "Jeans de denim crudo japonés de los 70. Costura doble, botones de cobre originales, y un corte recto impecable. El índigo ha ido desvaneciendo naturalmente creando un fade único. Difíciles de encontrar en este estado de conservación.",
    category: "pantalones",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80",
      "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=800&q=80",
    ],
    basePrice: 65000,
    era: "1970s",
    origin: "Osaka, Japón",
    material: "Denim 14oz",
    variantList: [
      { size: "32", color: "Indigo", condition: "good" as const, stock: 1, priceModifier: 0 },
      { size: "34", color: "Indigo", condition: "excellent" as const, stock: 1, priceModifier: 10000 },
      { size: "36", color: "Indigo", condition: "good" as const, stock: 1, priceModifier: 0 },
    ],
  },
  {
    slug: "band-tee-80s",
    name: "Remera Banda '80s Original",
    description:
      "Remera original de gira de 1988. La tela está gastada en el cuello, la impresión está craquelada, y huele levemente a un show en Obras. Esto no es una reproducción vintage — es la posta. Talle único como se usaba entonces.",
    category: "remeras",
    images: [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
    ],
    basePrice: 35000,
    era: "1988",
    origin: "Ciudad de México, México",
    material: "Algodón 100%",
    variantList: [
      { size: "Único", color: "Negro", condition: "fair" as const, stock: 1, priceModifier: 0 },
    ],
  },
  {
    slug: "wool-overcoat-60s",
    name: "Abrigo de Lana '60s",
    description:
      "Abrigo largo de lana merino de los 60. Solapas anchas, corte structure, y un forro de seda natural que todavía está intacto. Los botones son de pasta originales. Una prenda de otra época que todavia impone presencia.",
    category: "abrigos",
    images: [
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80",
      "https://images.unsplash.com/photo-1544923246-77307dd270b9?w=800&q=80",
    ],
    basePrice: 95000,
    era: "1960s",
    origin: "Londres, Reino Unido",
    material: "Lana merino",
    variantList: [
      { size: "M", color: "Gris", condition: "excellent" as const, stock: 1, priceModifier: 0 },
      { size: "L", color: "Gris", condition: "good" as const, stock: 1, priceModifier: -10000 },
      { size: "L", color: "Vino tinto", condition: "good" as const, stock: 1, priceModifier: 0 },
    ],
  },
  {
    slug: "cowboy-boots-tejanos",
    name: "Botas Tejanas Cowboy 80s",
    description:
      "Botas cowboy de cuero grabado, fabricadas en León, Guanajuato. Puntera tradicional, tacón inclinado, y un desgaste parejo que las hace increíblemente cómodas. El cuero ha tomado una pátina espectacular con los años.",
    category: "calzado",
    images: [
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&q=80",
      "https://images.unsplash.com/photo-1632914885558-e97921cea72d?w=800&q=80",
    ],
    basePrice: 72000,
    era: "1980s",
    origin: "León, México",
    material: "Cuero grabado",
    variantList: [
      { size: "40", color: "Marrón", condition: "good" as const, stock: 1, priceModifier: 0 },
      { size: "42", color: "Marrón", condition: "excellent" as const, stock: 1, priceModifier: 8000 },
    ],
  },
  {
    slug: "military-vest-70s",
    name: "Chaleco Militar '70s",
    description:
      "Chaleco militar original del ejército argentino. Bolsillos de carga originales, cierres metálicos, y una lona resistente que ha visto décadas de uso. El lavado ha suavizado la tela sin perder su carácter. Pieza única con historia.",
    category: "chalecos",
    images: [
      "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800&q=80",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80",
    ],
    basePrice: 45000,
    era: "1970s",
    origin: "Buenos Aires, Argentina",
    material: "Lona resistente",
    variantList: [
      { size: "M", color: "Oliva", condition: "good" as const, stock: 1, priceModifier: 0 },
      { size: "L", color: "Oliva", condition: "fair" as const, stock: 1, priceModifier: -5000 },
    ],
  },
];

export async function seed() {
  const db = getDb();
  if (!db) throw new Error("DATABASE_URL not set");

  for (const p of seedProducts) {
    const { variantList, ...productData } = p;
    const [inserted] = await db
      .insert(products)
      .values(productData)
      .returning({ id: products.id });

    await db.insert(variants).values(
      variantList.map((v) => ({ ...v, productId: inserted.id }))
    );
  }
  console.log("Seed complete");
}
