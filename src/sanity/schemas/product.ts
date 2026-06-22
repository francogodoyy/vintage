import { defineType, defineField } from "sanity";

export const product = defineType({
  name: "product",
  title: "Prenda",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nombre",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descripción",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Categoría",
      type: "string",
      options: {
        list: [
          { title: "Chaquetas", value: "chaquetas" },
          { title: "Pantalones", value: "pantalones" },
          { title: "Remeras", value: "remeras" },
          { title: "Abrigos", value: "abrigos" },
          { title: "Calzado", value: "calzado" },
          { title: "Chalecos", value: "chalecos" },
          { title: "Accesorios", value: "accesorios" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "images",
      title: "Imágenes",
      type: "array",
      of: [{ type: "image" }],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: "basePrice",
      title: "Precio base (ARS)",
      type: "number",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "era",
      title: "Época",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "origin",
      title: "Origen",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "material",
      title: "Material",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "variants",
      title: "Variantes",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "size", title: "Talle", type: "string" },
            { name: "color", title: "Color", type: "string" },
            {
              name: "condition",
              title: "Condición",
              type: "string",
              options: {
                list: [
                  { title: "Mint — impecable", value: "mint" },
                  { title: "Excelente — casi nuevo", value: "excellent" },
                  { title: "Buen estado — uso normal", value: "good" },
                  { title: "Con uso — desgaste visible", value: "fair" },
                ],
              },
            },
            {
              name: "stock",
              title: "Stock",
              type: "number",
              initialValue: 1,
            },
            {
              name: "priceModifier",
              title: "Ajuste de precio ($)",
              type: "number",
              initialValue: 0,
              description: "Positivo = más caro, negativo = descuento",
            },
          ],
          preview: {
            select: {
              title: "size",
              subtitle: "color",
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category",
      media: "images.0",
    },
  },
});
