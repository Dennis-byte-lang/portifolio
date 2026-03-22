import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { checkRateLimit } from "@/lib/rate-limit";
import { contactSchema } from "@/lib/validators";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || "anon";
  const rate = checkRateLimit(ip);
  if (!rate.ok) return NextResponse.json({ error: "Too many requests" }, { status: 429 });

  const payload = await req.json();
  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  if (parsed.data.honeypot) {
    return NextResponse.json({ ok: true });
  }

  const { name, email, company, message } = parsed.data;

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.RESEND_TO) {
    return NextResponse.json({ ok: true, note: "SMTP not configured. Message validated only." });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.RESEND_FROM || process.env.SMTP_USER,
    to: process.env.RESEND_TO,
    subject: `Portfolio inquiry from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || "N/A"}\n\nMessage:\n${message}`,
  });

  return NextResponse.json({ ok: true });
}
