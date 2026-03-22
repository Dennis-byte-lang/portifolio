import mongoose, { Schema, type Model } from "mongoose";
import type { TestimonialItem } from "@/types/content";

const testimonialSchema = new Schema<TestimonialItem>(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    company: { type: String, required: true },
    avatar: { type: String, required: true },
    quote: { type: String, required: true },
  },
  { timestamps: true }
);

export const Testimonial: Model<TestimonialItem> =
  mongoose.models.Testimonial || mongoose.model<TestimonialItem>("Testimonial", testimonialSchema);
