const store = new Map<string, { count: number; expires: number }>();

export function checkRateLimit(key: string) {
  const windowMs = Number(process.env.RATE_LIMIT_WINDOW_MS || 60000);
  const max = Number(process.env.RATE_LIMIT_MAX || 8);
  const now = Date.now();

  const current = store.get(key);
  if (!current || current.expires < now) {
    store.set(key, { count: 1, expires: now + windowMs });
    return { ok: true, remaining: max - 1 };
  }

  if (current.count >= max) {
    return { ok: false, remaining: 0 };
  }

  current.count += 1;
  store.set(key, current);
  return { ok: true, remaining: max - current.count };
}
