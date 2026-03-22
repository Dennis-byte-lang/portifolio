export type ProjectCategory = "web" | "mobile" | "backend" | "fullstack";

export interface ProjectItem {
  _id?: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  category: ProjectCategory;
  coverImage: string;
  gallery: string[];
  techStack: string[];
  features: string[];
  challenges: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface SkillItem {
  _id?: string;
  name: string;
  level: number;
  group: string;
  icon?: string;
}

export interface ExperienceItem {
  _id?: string;
  title: string;
  organization: string;
  startDate: string;
  endDate?: string;
  location: string;
  type: "work" | "education" | "certification";
  highlights: string[];
}

export interface TestimonialItem {
  _id?: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
}
