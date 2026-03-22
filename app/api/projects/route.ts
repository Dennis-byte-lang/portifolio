import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import { requireAdmin } from "@/lib/api-auth";
import { projectSchema } from "@/lib/validators";
import { Project } from "@/models/project";

export async function GET() {
  await connectDb();
  const projects = await Project.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ data: projects });
}

export async function POST(req: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.error;

  const payload = await req.json();
  const parsed = projectSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  await connectDb();
  const created = await Project.create(parsed.data);
  return NextResponse.json({ data: created }, { status: 201 });
}
