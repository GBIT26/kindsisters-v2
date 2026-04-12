'use client';

import { useCallback } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface EmbeddedCheckoutProps {
  amount: number;
  frequency: 'once' | 'monthly';
  onClose: () => void;
}

export default function EmbeddedCheckoutForm({
  amount,
  frequency,
  onClose,
}: EmbeddedCheckoutProps) {
  const fetchClientSecret = useCallback(async () => {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, frequency }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to create checkout');
    return data.clientSecret;
  }, [amount, frequency]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-trust/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-[var(--shadow-lg)] max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        <div className="flex items-center justify-between p-6 border-b border-[var(--border-subtle)]">
          <div>
            <h3 className="font-serif text-xl text-trust">
              Complete your ${amount} {frequency === 'monthly' ? 'monthly ' : ''}donation
            </h3>
            <p className="text-sm text-trust-muted mt-1">
              Secure payment powered by Stripe
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[var(--earth)] flex items-center justify-center text-trust-muted hover:text-trust transition-colors"
            aria-label="Close checkout"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">
          <EmbeddedCheckoutProvider
            stripe={stripePromise}
            options={{ fetchClientSecret }}
          >
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </div>
      </div>
    </div>
  );
}
