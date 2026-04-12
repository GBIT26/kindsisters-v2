'use client';

import { useState, type FormEvent } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;

    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
    } catch {
      // Silently fail
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <p className="text-[var(--relief)] font-medium text-lg">
        Thank you for subscribing! We&apos;ll be in touch soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input
        type="email"
        placeholder="Your email address"
        required
        maxLength={320}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 px-4 py-3 rounded-full border border-[var(--border-default)] bg-[var(--earth)] focus:border-[var(--kindness)] focus:outline-none focus:ring-2 focus:ring-[var(--kindness)]/20 transition-all text-sm"
      />
      <button
        type="submit"
        className="px-6 py-3 bg-[var(--kindness)] text-white rounded-full font-semibold hover:bg-[var(--kindness-deep)] transition-all text-sm"
      >
        Subscribe
      </button>
    </form>
  );
}
