export default function Loading() {
  return (
    <main className="min-h-screen bg-bg px-5 py-28">
      <div className="section-shell grid gap-6 md:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-44 animate-pulse rounded-3xl bg-card" />
        ))}
      </div>
    </main>
  );
}
