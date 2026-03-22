import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user || (session.user as { role?: string }).role !== "admin") {
    return { ok: false as const, error: new Response("Unauthorized", { status: 401 }) };
  }

  return { ok: true as const, session };
}
