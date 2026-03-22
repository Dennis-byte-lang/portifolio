import type { BlogPostItem, ExperienceItem, ProjectItem, SkillItem, TestimonialItem } from "@/types/content";

export const defaultProjects: ProjectItem[] = [
  {
    title: "Hypermarket Super App",
    slug: "hypermarket-super-app",
    summary: "Mobile commerce platform for grocery discovery, real-time inventory, checkout, and order tracking.",
    description:
      "A production-ready mobile commerce platform designed for speed, reliability, and retail operations at scale. Built with clean architecture and analytics-driven iteration.",
    category: "mobile",
    coverImage: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1556742524-750f6cfedc4f?auto=format&fit=crop&w=1400&q=80"
    ],
    techStack: ["Flutter", "Node.js", "MongoDB", "Redis", "Docker"],
    features: [
      "Personalized product feed",
      "Live stock and pricing updates",
      "Secure checkout and order tracking",
      "Admin fulfillment dashboard"
    ],
    challenges: [
      "Handling concurrency for stock updates",
      "Reducing checkout abandonment",
      "Keeping app experience smooth on low-end devices"
    ],
    liveUrl: "#",
    githubUrl: "https://github.com/Dennis-byte-lang",
    featured: true,
  },
  {
    title: "Portfolio OS",
    slug: "portfolio-os",
    summary: "A premium portfolio web app with dynamic content management and admin tooling.",
    description: "Built as a high-end web experience with animation system, SEO, dashboard management and PWA capability.",
    category: "fullstack",
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80"
    ],
    techStack: ["Next.js", "TypeScript", "Framer Motion", "MongoDB"],
    features: ["CMS-style dashboard", "PWA install", "Premium interactions", "API secured CRUD"],
    challenges: ["Balancing visuals with performance", "Building reusable section system"],
    liveUrl: "#",
    githubUrl: "https://github.com/Dennis-byte-lang",
    featured: true,
  },
  {
    title: "Workflow Analytics API",
    slug: "workflow-analytics-api",
    summary: "Backend platform for event processing, dashboards, and operational insights.",
    description: "Designed a resilient API and ingestion pipeline for product telemetry and team visibility.",
    category: "backend",
    coverImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80",
    gallery: ["https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1400&q=80"],
    techStack: ["Node.js", "PostgreSQL", "Redis", "Docker"],
    features: ["Event ingestion", "Role-based APIs", "Caching and queue processing"],
    challenges: ["Handling burst traffic", "Schema evolution over time"],
    liveUrl: "#",
    githubUrl: "https://github.com/Dennis-byte-lang",
    featured: false,
  },
];

export const defaultSkills: SkillItem[] = [
  { name: "Next.js", level: 92, group: "Frontend" },
  { name: "TypeScript", level: 90, group: "Frontend" },
  { name: "Framer Motion", level: 86, group: "Frontend" },
  { name: "Node.js", level: 88, group: "Backend" },
  { name: "API Design", level: 90, group: "Backend" },
  { name: "MongoDB", level: 84, group: "Database" },
  { name: "PostgreSQL", level: 82, group: "Database" },
  { name: "Docker", level: 78, group: "DevOps" },
  { name: "Product Thinking", level: 92, group: "Leadership" },
  { name: "Performance Optimization", level: 88, group: "Frontend" },
];

export const defaultExperiences: ExperienceItem[] = [
  {
    title: "Lead Full-Stack Engineer",
    organization: "Independent Product Studio",
    startDate: "2023-01",
    endDate: "Present",
    location: "Nairobi / Remote",
    type: "work",
    highlights: [
      "Shipped cross-platform commerce products",
      "Reduced load times by over 40% on critical pages",
      "Built reusable design and component architecture"
    ]
  },
  {
    title: "Software Engineer",
    organization: "Digital Commerce Team",
    startDate: "2021-01",
    endDate: "2022-12",
    location: "Nairobi",
    type: "work",
    highlights: [
      "Implemented checkout optimization flow",
      "Built internal admin tools for operations"
    ]
  },
  {
    title: "BSc Computer Science",
    organization: "University",
    startDate: "2017-09",
    endDate: "2021-06",
    location: "Kenya",
    type: "education",
    highlights: ["Graduated with software engineering specialization"]
  }
];

export const defaultTestimonials: TestimonialItem[] = [
  {
    name: "Sarah M.",
    role: "Product Lead",
    company: "UrbanMart",
    avatar: "https://i.pravatar.cc/120?img=44",
    quote: "Dennis brings product focus and technical depth. We moved from idea to reliable launch faster than expected."
  },
  {
    name: "Brian K.",
    role: "Engineering Manager",
    company: "SwiftCart",
    avatar: "https://i.pravatar.cc/120?img=13",
    quote: "Strong architecture decisions, excellent delivery discipline, and clear communication with stakeholders."
  },
  {
    name: "Amina L.",
    role: "Operations Director",
    company: "KenyaFresh",
    avatar: "https://i.pravatar.cc/120?img=24",
    quote: "The admin tooling and performance improvements made a real business difference for our team."
  }
];

export const defaultBlogPosts: BlogPostItem[] = [
  {
    title: "How I Scaled a Hypermarket App for Viral Growth",
    slug: "scaling-hypermarket-app-viral-growth",
    excerpt: "Architecture and product decisions behind scaling a fast-growing commerce app in Kenya.",
    coverImage: "https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=1400&q=80",
    content:
      "This case study covers feature prioritization, inventory synchronization, and performance budgets used to scale a hypermarket application from early traction to large daily active usage.",
    tags: ["Architecture", "Mobile", "Scale"],
    publishedAt: "2026-03-01",
  },
  {
    title: "Designing Premium UX Without Sacrificing Performance",
    slug: "premium-ux-with-performance",
    excerpt: "A practical workflow for blending animation, accessibility, and Lighthouse goals.",
    coverImage: "https://images.unsplash.com/photo-1510751007277-36932aac9ebd?auto=format&fit=crop&w=1400&q=80",
    content:
      "Premium interfaces can stay fast when motion is intentional, assets are optimized, and rendering paths are audited continuously with clear performance budgets.",
    tags: ["UX", "Performance", "Frontend"],
    publishedAt: "2026-02-14",
  },
];
