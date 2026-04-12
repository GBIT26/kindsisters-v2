import { NextResponse, type NextRequest } from 'next/server';

const RATE_LIMIT_WINDOW = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5;
const submissions = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = submissions.get(ip);

  if (!entry || now > entry.resetAt) {
    submissions.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

function checkOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  const host = request.headers.get('host');
  if (!origin) return true; // Allow non-browser clients (e.g. curl for testing)
  try {
    const originHost = new URL(origin).host;
    return originHost === host;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  // CSRF check
  if (!checkOrigin(request)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // Rate limiting
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { name, email, subject, message } = body as {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  };

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  // Input length validation
  if (typeof name !== 'string' || name.length > 200) {
    return NextResponse.json({ error: 'Name is too long' }, { status: 400 });
  }
  if (typeof email !== 'string' || email.length > 320) {
    return NextResponse.json({ error: 'Email is too long' }, { status: 400 });
  }
  if (typeof subject !== 'string' || subject.length > 500) {
    return NextResponse.json({ error: 'Subject is too long' }, { status: 400 });
  }
  if (typeof message !== 'string' || message.length > 5000) {
    return NextResponse.json({ error: 'Message is too long' }, { status: 400 });
  }

  // Email format validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
  }

  // TODO: VERIFY — Wire up email sending (e.g. Resend, SendGrid, or Nodemailer)
  // Submission received successfully — no PII logged

  return NextResponse.json({ success: true });
}
