export default function OfflinePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-bg px-5 text-text">
      <div className="glass max-w-xl rounded-3xl border p-8 text-center">
        <h1 className="text-3xl font-semibold">You are offline</h1>
        <p className="mt-3 text-muted">The portfolio app is still available with cached content. Reconnect to sync new updates.</p>
      </div>
    </main>
  );
}
