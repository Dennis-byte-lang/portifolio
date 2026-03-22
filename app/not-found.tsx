import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-bg px-5 text-text">
      <div className="glass max-w-xl rounded-3xl border p-8 text-center">
        <h1 className="text-3xl font-semibold">Page not found</h1>
        <p className="mt-3 text-muted">The page you requested does not exist.</p>
        <Link href="/" className="mt-6 inline-block rounded-xl bg-brand px-4 py-2 font-medium text-white">
          Back Home
        </Link>
      </div>
    </main>
  );
}
