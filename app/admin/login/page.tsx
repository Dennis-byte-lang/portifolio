"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const params = useSearchParams();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");

    const result = await signIn("credentials", { email, password, redirect: false });

    if (result?.ok) {
      const callback = params.get("callbackUrl");
      const nextPath = callback && callback.startsWith("/") ? callback : "/admin";
      window.location.href = nextPath;
      return;
    }

    setLoading(false);
    setError("Invalid credentials");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-bg px-5">
      <form onSubmit={handleSubmit} className="glass w-full max-w-md rounded-3xl border p-8">
        <h1 className="text-3xl font-semibold">Admin Login</h1>
        <p className="mt-2 text-sm text-muted">Secure control panel for portfolio content.</p>

        <label className="mt-6 grid gap-2 text-sm">
          Email
          <input required name="email" type="email" className="rounded-xl border bg-surface px-3 py-2" />
        </label>

        <label className="mt-4 grid gap-2 text-sm">
          Password
          <input required name="password" type="password" className="rounded-xl border bg-surface px-3 py-2" />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-brand px-4 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>

        {error && <p className="mt-3 text-sm text-rose-400">{error}</p>}
      </form>
    </main>
  );
}
