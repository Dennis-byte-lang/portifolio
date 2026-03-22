import { connectDb } from "@/lib/db";
import { defaultBlogPosts, defaultExperiences, defaultProjects, defaultSkills, defaultTestimonials } from "@/lib/default-content";
import { Blog } from "@/models/blog";
import { Experience } from "@/models/experience";
import { Project } from "@/models/project";
import { Skill } from "@/models/skill";
import { Testimonial } from "@/models/testimonial";

export async function getProjects() {
  try {
    await connectDb();
    const docs = await Project.find().sort({ createdAt: -1 }).lean();
    return docs.length ? docs : defaultProjects;
  } catch {
    return defaultProjects;
  }
}

export async function getSkills() {
  try {
    await connectDb();
    const docs = await Skill.find().sort({ group: 1, level: -1 }).lean();
    return docs.length ? docs : defaultSkills;
  } catch {
    return defaultSkills;
  }
}

export async function getExperiences() {
  try {
    await connectDb();
    const docs = await Experience.find().sort({ startDate: -1 }).lean();
    return docs.length ? docs : defaultExperiences;
  } catch {
    return defaultExperiences;
  }
}

export async function getTestimonials() {
  try {
    await connectDb();
    const docs = await Testimonial.find().lean();
    return docs.length ? docs : defaultTestimonials;
  } catch {
    return defaultTestimonials;
  }
}

export async function getBlogPosts() {
  try {
    await connectDb();
    const docs = await Blog.find().sort({ publishedAt: -1 }).lean();
    return docs.length ? docs : defaultBlogPosts;
  } catch {
    return defaultBlogPosts;
  }
}
