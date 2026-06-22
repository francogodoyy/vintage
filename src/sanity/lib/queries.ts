import { client, urlFor } from "./client";


const productsQuery = `*[_type == "product"] {
  _id,
  name,
  "slug": slug.current,
  description,
  category,
  images,
  basePrice,
  era,
  origin,
  material,
  variants
}`;

const productBySlugQuery = `*[_type == "product" && slug.current == $slug][0] {
  _id,
  name,
  "slug": slug.current,
  description,
  category,
  images,
  basePrice,
  era,
  origin,
  material,
  variants
}`;

export async function getAllProducts() {
  const products = await client.fetch(productsQuery);
  return products.map((p: any) => ({
    ...p,
    images: (p.images || []).map((img: any) =>
      urlFor(img).width(800).url()
    ),
  }));
}

export async function getProductBySlug(slug: string) {
  const p = await client.fetch(productBySlugQuery, { slug });
  if (!p) return null;
  return {
    ...p,
    images: (p.images || []).map((img: any) =>
      urlFor(img).width(800).url()
    ),
  };
}
