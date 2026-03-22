import mongoose, { Schema, type Model } from "mongoose";
import type { ExperienceItem } from "@/types/content";

const experienceSchema = new Schema<ExperienceItem>(
  {
    title: { type: String, required: true },
    organization: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String },
    location: { type: String, required: true },
    type: { type: String, enum: ["work", "education", "certification"], required: true },
    highlights: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const Experience: Model<ExperienceItem> =
  mongoose.models.Experience || mongoose.model<ExperienceItem>("Experience", experienceSchema);
