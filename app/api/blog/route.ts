import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import { requireAdmin } from "@/lib/api-auth";
import { blogSchema } from "@/lib/validators";
import { Blog } from "@/models/blog";

export async function GET() {
  await connectDb();
  const items = await Blog.find().sort({ publishedAt: -1 }).lean();
  return NextResponse.json({ data: items });
}

export async function POST(req: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.error;

  const payload = await req.json();
  const parsed = blogSchema.safeParse(payload);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  await connectDb();
  const created = await Blog.create(parsed.data);
  return NextResponse.json({ data: created }, { status: 201 });
}
