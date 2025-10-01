import { NextResponse } from 'next/server';
const store = new Map();
const WINDOW_MS = 60 * 1000; // 1 minute
const MAX = 60;
export function rateLimit(req: Request) {
  const ip = req.headers.get('x-forwarded-for') || 'local';
  const now = Date.now();
  const entry = store.get(ip) || { count: 0, start: now };
  if (now - entry.start > WINDOW_MS) { entry.count = 0; entry.start = now; }
  entry.count += 1;
  store.set(ip, entry);
  if (entry.count > MAX) return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  return null;
}
