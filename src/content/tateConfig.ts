import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    bibliography: z.array(z.string()).optional(),
    memos: z.array(z.string()).optional(),
  }),
});

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    draft: z.boolean().default(false),
    heroTitle: z.string(),
    author: z.string().optional(),
    enAuthor: z.string().optional(),
    pubDate: z.date().optional(),  
    description: z.string().optional(),
    heroMedia: z.object({
      type: z.enum(["image", "video"]),
      url: z.string(),
      alt: z.string().optional(),
      position: z.string().optional(),
    }).optional(),
  }),
});

export const collections = { 
  blog,
  posts 
};
