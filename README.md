# Ultra Premium Portfolio Platform

Production-ready Next.js App Router portfolio with premium UI, admin CMS, contact pipeline, and PWA support.

## Stack

- Next.js 15 (App Router)
- Tailwind CSS + design tokens
- Framer Motion animations
- NextAuth credentials admin auth
- MongoDB (Mongoose)
- API routes with Zod validation
- next-pwa offline support

## Features

- Dark-mode first premium visual system with light toggle
- Responsive full-width app-like layout and smooth interactions
- Hero, About, Skills, Projects, Experience timeline, Services, Testimonials, Contact, Footer
- Blog section with dynamic post routes (`/blog`, `/blog/[slug]`)
- Built-in portfolio AI assistant widget (`/api/chat`)
- Project filtering and dedicated project detail pages
- Admin dashboard with Add/Edit/Delete for:
  - Projects
  - Skills
  - Experience
  - Testimonials
  - Blog posts
- Contact form with:
  - Validation
  - Honeypot anti-spam
  - Basic in-memory rate limiting
  - SMTP mail sending via `nodemailer`
- SEO metadata, `robots.ts`, `sitemap.ts`, `manifest.ts`
- Error UI (`error.tsx`, `global-error.tsx`, `not-found.tsx`)
- PWA installability and offline page fallback

## Environment Variables

Copy `.env.example` to `.env.local` and fill:

- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `MONGODB_URI`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `RESEND_TO`
- `RESEND_FROM`

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Admin login: `http://localhost:3000/admin/login`

## Production Build

```bash
npm run build
npm run start
```

## Deploy on Vercel

1. Push repository to GitHub.
2. Import project in Vercel.
3. Add all environment variables from `.env.example`.
4. Deploy.

## Docker

```bash
docker build -t premium-portfolio .
docker run -p 3000:3000 --env-file .env.local premium-portfolio
```
