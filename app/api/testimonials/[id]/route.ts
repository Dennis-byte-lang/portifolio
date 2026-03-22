import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import { requireAdmin } from "@/lib/api-auth";
import { testimonialSchema } from "@/lib/validators";
import { Testimonial } from "@/models/testimonial";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.error;

  const { id } = await params;
  const payload = await req.json();
  const parsed = testimonialSchema.partial().safeParse(payload);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  await connectDb();
  const updated = await Testimonial.findByIdAndUpdate(id, parsed.data, { new: true });
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ data: updated });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.error;

  const { id } = await params;
  await connectDb();
  await Testimonial.findByIdAndDelete(id);
  return NextResponse.json({ ok: true });
}
