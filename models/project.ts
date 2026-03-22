import mongoose, { Schema, type Model } from "mongoose";
import type { ProjectItem } from "@/types/content";

const projectSchema = new Schema<ProjectItem>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    summary: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, enum: ["web", "mobile", "backend", "fullstack"], required: true },
    coverImage: { type: String, required: true },
    gallery: { type: [String], default: [] },
    techStack: { type: [String], default: [] },
    features: { type: [String], default: [] },
    challenges: { type: [String], default: [] },
    liveUrl: { type: String },
    githubUrl: { type: String },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Project: Model<ProjectItem> =
  mongoose.models.Project || mongoose.model<ProjectItem>("Project", projectSchema);
