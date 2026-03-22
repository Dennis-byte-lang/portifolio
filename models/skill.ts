import mongoose, { Schema, type Model } from "mongoose";
import type { SkillItem } from "@/types/content";

const skillSchema = new Schema<SkillItem>(
  {
    name: { type: String, required: true },
    level: { type: Number, required: true },
    group: { type: String, required: true },
    icon: { type: String },
  },
  { timestamps: true }
);

export const Skill: Model<SkillItem> = mongoose.models.Skill || mongoose.model<SkillItem>("Skill", skillSchema);
