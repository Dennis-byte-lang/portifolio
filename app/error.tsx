"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-bg px-5">
      <div className="glass w-full max-w-lg rounded-3xl border p-8 text-center">
        <h2 className="text-2xl font-semibold">Something went wrong</h2>
        <p className="mt-3 text-muted">A runtime error occurred while rendering this page.</p>
        <button onClick={reset} className="mt-6 rounded-xl bg-brand px-4 py-2 font-medium text-white">
          Retry
        </button>
      </div>
    </main>
  );
}
