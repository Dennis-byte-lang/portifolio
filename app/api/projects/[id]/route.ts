import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import { requireAdmin } from "@/lib/api-auth";
import { projectSchema } from "@/lib/validators";
import { Project } from "@/models/project";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.error;

  const { id } = await params;
  const payload = await req.json();
  const parsed = projectSchema.partial().safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  await connectDb();
  const updated = await Project.findByIdAndUpdate(id, parsed.data, { new: true });
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ data: updated });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.error;

  const { id } = await params;
  await connectDb();
  await Project.findByIdAndDelete(id);
  return NextResponse.json({ ok: true });
}
