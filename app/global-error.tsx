"use client";

export default function GlobalError() {
  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-bg px-5 text-text">
        <div className="glass max-w-xl rounded-3xl border p-8 text-center">
          <h1 className="text-2xl font-semibold">Application Error</h1>
          <p className="mt-3 text-muted">Please refresh the page. If the issue persists, contact support.</p>
        </div>
      </body>
    </html>
  );
}
