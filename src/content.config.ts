import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const docs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    group: z.enum(['Getting started', 'Using rustywx', 'Reference', 'Contributing']),
    order: z.number(),
    symbol: z.enum(['cold', 'warm', 'isobar', 'rain', 'site', 'cyclone', 'high', 'low']).default('site'),
  }),
});

export const collections = { docs };
