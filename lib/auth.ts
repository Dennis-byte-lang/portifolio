import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!credentials?.email || !credentials.password || !adminEmail || !adminPassword) {
          return null;
        }

        const emailOk = credentials.email === adminEmail;
        const passwordOk = credentials.password === adminPassword;

        if (!emailOk || !passwordOk) return null;

        return {
          id: "admin",
          email: adminEmail,
          name: "Portfolio Admin",
          role: "admin",
        } as unknown as { id: string; email: string; name: string; role: string };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as { role?: string }).role || "admin";
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as typeof session.user & { role?: string }).role = (token.role as string) || "admin";
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
  },
};
