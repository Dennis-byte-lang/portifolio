import mongoose, { Schema, type Model } from "mongoose";
import type { BlogPostItem } from "@/types/content";

const blogSchema = new Schema<BlogPostItem>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    coverImage: { type: String, required: true },
    content: { type: String, required: true },
    tags: { type: [String], default: [] },
    publishedAt: { type: String, required: true },
  },
  { timestamps: true }
);

export const Blog: Model<BlogPostItem> = mongoose.models.Blog || mongoose.model<BlogPostItem>("Blog", blogSchema);
