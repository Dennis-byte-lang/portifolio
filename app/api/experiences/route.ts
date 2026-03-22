import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import { requireAdmin } from "@/lib/api-auth";
import { experienceSchema } from "@/lib/validators";
import { Experience } from "@/models/experience";

export async function GET() {
  await connectDb();
  const items = await Experience.find().sort({ startDate: -1 }).lean();
  return NextResponse.json({ data: items });
}

export async function POST(req: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.error;

  const payload = await req.json();
  const parsed = experienceSchema.safeParse(payload);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  await connectDb();
  const created = await Experience.create(parsed.data);
  return NextResponse.json({ data: created }, { status: 201 });
}
