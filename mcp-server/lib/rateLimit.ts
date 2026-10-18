// Soft, per-instance guard only: resets on cold start and is not shared across
// concurrent serverless instances. See README for why this is acceptable for v1
// (no Upstash/Vercel KV).
const WINDOW_MS = 60 * 60 * 1000;

const WRITE_LIMIT = 20;
const READ_LIMIT = 100;

type Category = 'write' | 'read';

const buckets = new Map<string, { count: number; resetAt: number }>();

export class RateLimitError extends Error {
  constructor(public readonly retryAfterMs: number) {
    super('Too many requests. Please try again later.');
    this.name = 'RateLimitError';
  }
}

export function checkRateLimit(category: Category, clientId: string): void {
  const limit = category === 'write' ? WRITE_LIMIT : READ_LIMIT;
  const key = `${category}:${clientId}`;
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return;
  }
  if (bucket.count >= limit) throw new RateLimitError(bucket.resetAt - now);
  bucket.count += 1;
}

export function clientIdFromRequest(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  return forwardedFor?.split(',')[0]?.trim() || 'unknown';
}
