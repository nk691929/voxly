/**
 * Simple in-memory rate limiter (fixed window).
 * IMPORTANT: memory is per server instance. This is fine for local development and a
 * first demo, but on serverless hosting each instance has its own counters. Before real
 * launch we replace it with a shared store (database or Redis).
 */
export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSec: number;
}

export function createRateLimiter(options: {
  limit: number;
  windowMs: number;
  now?: () => number;
}) {
  const { limit, windowMs } = options;
  const now = options.now ?? (() => Date.now());
  const hits = new Map<string, { count: number; resetAt: number }>();

  function prune(t: number) {
    for (const [key, entry] of hits) {
      if (entry.resetAt <= t) hits.delete(key);
    }
  }

  return {
    check(key: string): RateLimitResult {
      const t = now();
      if (hits.size > 1000) prune(t);
      const entry = hits.get(key);
      if (!entry || entry.resetAt <= t) {
        hits.set(key, { count: 1, resetAt: t + windowMs });
        return { allowed: true, remaining: limit - 1, retryAfterSec: 0 };
      }
      if (entry.count >= limit) {
        return { allowed: false, remaining: 0, retryAfterSec: Math.ceil((entry.resetAt - t) / 1000) };
      }
      entry.count += 1;
      return { allowed: true, remaining: limit - entry.count, retryAfterSec: 0 };
    },
  };
}
