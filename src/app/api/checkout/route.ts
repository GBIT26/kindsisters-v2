import { NextResponse, type NextRequest } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

function checkOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  const host = request.headers.get('host');
  if (!origin) return true;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  if (!checkOrigin(request)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const { amount, frequency } = body as {
    amount?: number;
    frequency?: 'once' | 'monthly';
  };

  if (!amount || typeof amount !== 'number' || amount < 1 || amount > 50000) {
    return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
  }

  const amountCents = Math.round(amount * 100);

  try {
    if (frequency === 'monthly') {
      // Create a subscription checkout
      const session = await stripe.checkout.sessions.create({
        ui_mode: 'embedded_page',
        mode: 'subscription',
        line_items: [
          {
            price_data: {
              currency: 'aud',
              product_data: {
                name: 'Kind Sisters Monthly Donation',
                description: `Monthly donation of $${amount} to Kind Sisters`,
              },
              unit_amount: amountCents,
              recurring: { interval: 'month' },
            },
            quantity: 1,
          },
        ],
        return_url: `${request.headers.get('origin')}/donate?status=success&session_id={CHECKOUT_SESSION_ID}`,
      });

      return NextResponse.json({ clientSecret: session.client_secret });
    } else {
      // One-time payment
      const session = await stripe.checkout.sessions.create({
        ui_mode: 'embedded_page',
        mode: 'payment',
        line_items: [
          {
            price_data: {
              currency: 'aud',
              product_data: {
                name: 'Kind Sisters Donation',
                description: `One-time donation of $${amount} to Kind Sisters`,
              },
              unit_amount: amountCents,
            },
            quantity: 1,
          },
        ],
        return_url: `${request.headers.get('origin')}/donate?status=success&session_id={CHECKOUT_SESSION_ID}`,
      });

      return NextResponse.json({ clientSecret: session.client_secret });
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Payment setup failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
