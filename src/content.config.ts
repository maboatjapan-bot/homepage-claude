import { defineCollection, z } from 'astro:content';

const products = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    price: z.string().optional(),
    image: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

const solutions = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string().optional(),
  }),
});

const news = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = { products, solutions, news };
