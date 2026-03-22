import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import { requireAdmin } from "@/lib/api-auth";
import { skillSchema } from "@/lib/validators";
import { Skill } from "@/models/skill";

export async function GET() {
  await connectDb();
  const items = await Skill.find().sort({ level: -1 }).lean();
  return NextResponse.json({ data: items });
}

export async function POST(req: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.error;

  const payload = await req.json();
  const parsed = skillSchema.safeParse(payload);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  await connectDb();
  const created = await Skill.create(parsed.data);
  return NextResponse.json({ data: created }, { status: 201 });
}
