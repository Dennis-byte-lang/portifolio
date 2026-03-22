import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  summary: z.string().min(8),
  description: z.string().min(20),
  category: z.enum(["web", "mobile", "backend", "fullstack"]),
  coverImage: z.string().url(),
  gallery: z.array(z.string().url()).default([]),
  techStack: z.array(z.string()).default([]),
  features: z.array(z.string()).default([]),
  challenges: z.array(z.string()).default([]),
  liveUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  featured: z.boolean().optional(),
});

export const skillSchema = z.object({
  name: z.string().min(2),
  level: z.number().min(1).max(100),
  group: z.string().min(2),
  icon: z.string().optional(),
});

export const experienceSchema = z.object({
  title: z.string().min(2),
  organization: z.string().min(2),
  startDate: z.string().min(4),
  endDate: z.string().optional(),
  location: z.string().min(2),
  type: z.enum(["work", "education", "certification"]),
  highlights: z.array(z.string()).default([]),
});

export const testimonialSchema = z.object({
  name: z.string().min(2),
  role: z.string().min(2),
  company: z.string().min(2),
  avatar: z.string().url(),
  quote: z.string().min(10),
});

export const blogSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  excerpt: z.string().min(10),
  coverImage: z.string().url(),
  content: z.string().min(40),
  tags: z.array(z.string()).default([]),
  publishedAt: z.string().min(8),
});

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  message: z.string().min(10),
  honeypot: z.string().max(0).optional().default(""),
});
