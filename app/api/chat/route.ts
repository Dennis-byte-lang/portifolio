import { NextResponse } from "next/server";
import { z } from "zod";

const chatSchema = z.object({ message: z.string().min(1).max(800) });

const canned: Array<{ test: RegExp; answer: string }> = [
  {
    test: /(hire|project|work|service|build)/i,
    answer: "I can help with full-stack product builds, performance optimization, and architecture advisory. Share your timeline and target outcomes so we can scope precisely.",
  },
  {
    test: /(stack|tech|technology)/i,
    answer: "Core stack: Next.js, TypeScript, Node.js, MongoDB/PostgreSQL, Framer Motion, and production-grade API architecture.",
  },
  {
    test: /(hypermarket|viral|kenya)/i,
    answer: "The Hypermarket app focused on reliable inventory sync, fast checkout flows, and admin tooling to support real retail operations at scale.",
  },
];

export async function POST(req: Request) {
  const payload = await req.json();
  const parsed = chatSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid message" }, { status: 400 });
  }

  const input = parsed.data.message.trim();
  const matched = canned.find((entry) => entry.test.test(input));

  return NextResponse.json({
    reply:
      matched?.answer ||
      "Thanks for reaching out. I specialize in premium web/mobile products, scalable architecture, and measurable performance improvements. Tell me your goals and timeline.",
  });
}
