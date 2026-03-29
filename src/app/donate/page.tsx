"use client";

import { useState } from "react";
import Link from "next/link";

const STRIPE_CONFIG = {
  publishableKey: "REPLACE_WITH_STRIPE_PUBLISHABLE_KEY",
  priceIds: {
    once: {
      10: "REPLACE_WITH_PRICE_ID",
      25: "REPLACE_WITH_PRICE_ID",
      50: "REPLACE_WITH_PRICE_ID",
    },
    monthly: {
      10: "REPLACE_WITH_PRICE_ID",
      25: "REPLACE_WITH_PRICE_ID",
      50: "REPLACE_WITH_PRICE_ID",
    },
  },
  successUrl: "/donate?status=success",
  cancelUrl: "/donate?status=cancel",
  fallbackUrl: "https://buy.stripe.com/5kAaFXcdCgxOcLuaEE",
};

const impactItems = [
  { amount: 10, label: "School supplies for one child" },
  { amount: 25, label: "A week of hygiene products" },
  { amount: 50, label: "A complete family essentials bag" },
];

const presetAmounts = [10, 25, 50];

export default function DonatePage() {
  const [frequency, setFrequency] = useState<"once" | "monthly">("once");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(25);
  const [customAmount, setCustomAmount] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  // Check URL params for post-donation status
  if (typeof window !== "undefined" && status === null) {
    const params = new URLSearchParams(window.location.search);
    const urlStatus = params.get("status");
    if (urlStatus) {
      setStatus(urlStatus);
    }
  }

  const handleDonate = () => {
    // When Stripe is configured, this would create a Checkout session.
    // For now, redirect to the existing Stripe link.
    window.open(STRIPE_CONFIG.fallbackUrl, "_blank", "noopener,noreferrer");
  };

  const activeAmount = selectedAmount ?? (customAmount ? Number(customAmount) : 0);

  return (
    <main className="bg-earth">
      {/* Post-donation status */}
      {status === "success" && (
        <div className="bg-relief-soft border-b border-relief/20 py-4 text-center">
          <p className="text-relief font-medium text-lg">
            Thank you for your generous donation! Your kindness makes a real
            difference.
          </p>
        </div>
      )}
      {status === "cancel" && (
        <div className="bg-warmth-glow border-b border-warmth/20 py-4 text-center">
          <p className="text-warmth-deep font-medium">
            Your donation was not completed. If you&apos;d like to try again,
            you can use the form below.
          </p>
        </div>
      )}

      {/* Hero */}
      <section className="py-16 md:py-24 bg-warmth-glow">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-trust">
            Your generosity{" "}
            <span className="text-warmth">changes lives</span>
          </h1>
          <p className="mt-6 text-lg text-trust-soft max-w-2xl mx-auto">
            Every dollar you give goes directly to supporting families in
            our community who need it most. Kind Sisters is a registered
            charity — your donation is tax deductible.
          </p>
        </div>
      </section>

      {/* Impact */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="font-serif text-3xl text-trust text-center mb-10">
            Your Impact
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {impactItems.map((item) => (
              <div
                key={item.amount}
                className="rounded-[var(--radius-lg)] bg-canvas p-8 text-center shadow-[var(--shadow-sm)]"
              >
                <span className="font-serif text-4xl text-warmth">
                  ${item.amount}
                </span>
                <p className="mt-3 text-trust-soft">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Widget */}
      <section className="py-16 md:py-20 bg-canvas">
        <div className="mx-auto max-w-lg px-6">
          <h2 className="font-serif text-3xl text-trust text-center mb-8">
            Make a Donation
          </h2>

          {/* Frequency toggle */}
          <div className="flex rounded-[var(--radius-full)] bg-earth p-1 mb-8">
            <button
              onClick={() => setFrequency("once")}
              className={`flex-1 rounded-[var(--radius-full)] py-3 text-sm font-medium transition-colors ${
                frequency === "once"
                  ? "bg-canvas text-trust shadow-[var(--shadow-sm)]"
                  : "text-trust-muted hover:text-trust-soft"
              }`}
            >
              One-time
            </button>
            <button
              onClick={() => setFrequency("monthly")}
              className={`flex-1 rounded-[var(--radius-full)] py-3 text-sm font-medium transition-colors ${
                frequency === "monthly"
                  ? "bg-canvas text-trust shadow-[var(--shadow-sm)]"
                  : "text-trust-muted hover:text-trust-soft"
              }`}
            >
              Monthly
            </button>
          </div>

          {/* Amount buttons */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {presetAmounts.map((amount) => (
              <button
                key={amount}
                onClick={() => {
                  setSelectedAmount(amount);
                  setCustomAmount("");
                }}
                className={`rounded-[var(--radius-md)] py-4 text-lg font-medium transition-colors border-2 ${
                  selectedAmount === amount
                    ? "border-kindness bg-kindness-whisper text-kindness-deep"
                    : "border-[var(--border-default)] bg-canvas text-trust hover:border-kindness-soft"
                }`}
              >
                ${amount}
              </button>
            ))}
          </div>

          {/* Custom amount */}
          <div className="mb-8">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-trust-muted text-lg">
                $
              </span>
              <input
                type="number"
                min="1"
                placeholder="Other amount"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount(null);
                }}
                className="w-full rounded-[var(--radius-md)] border-2 border-[var(--border-default)] bg-canvas py-4 pl-9 pr-4 text-lg text-trust placeholder:text-trust-muted focus:border-kindness focus:outline-none"
              />
            </div>
          </div>

          {/* Donate button */}
          <button
            onClick={handleDonate}
            disabled={activeAmount <= 0}
            className="w-full rounded-[var(--radius-full)] bg-kindness py-4 text-lg font-semibold text-white transition-colors hover:bg-kindness-deep disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Donate{activeAmount > 0 ? ` $${activeAmount}` : ""}{" "}
            {frequency === "monthly" ? "Monthly" : ""}
          </button>

          <p className="mt-4 text-center text-sm text-trust-muted">
            Kind Sisters is a registered charity. All donations over $2 are
            tax deductible.
          </p>
        </div>
      </section>

      {/* Containers for Change */}
      <section className="py-16 md:py-20 bg-relief-soft">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <h2 className="font-serif text-3xl text-trust mb-6">
                Containers for Change
              </h2>
              <p className="text-lg text-trust-soft mb-8">
                Recycle your eligible containers and donate the refund to Kind
                Sisters. Simply quote our scheme ID at any refund point.
              </p>
              <div className="inline-block rounded-[var(--radius-lg)] bg-canvas px-10 py-8 shadow-[var(--shadow-md)]">
                <p className="text-sm font-medium text-relief uppercase tracking-wider mb-2">
                  Our Scheme ID
                </p>
                <p className="font-serif text-4xl md:text-5xl text-relief">
                  C11083530
                </p>
              </div>
              <p className="mt-6 text-trust-muted">
                Find your nearest{" "}
                <a
                  href="https://www.containersforchange.com.au/wa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-relief underline hover:text-relief/80"
                >
                  Containers for Change
                </a>{" "}
                refund point.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="animate-float relative">
                <img
                  src="/images/icons/containers-for-change-social.jpeg"
                  alt="Donate your 10c containers to Kind Sisters — Containers for Change ID C11083530"
                  className="rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)] max-w-xs w-full hover:scale-105 transition-transform duration-300 cursor-pointer"
                  onClick={() => {
                    navigator.clipboard?.writeText('C11083530');
                    alert('Scheme ID C11083530 copied to clipboard!');
                  }}
                />
                <p className="text-center text-trust-muted text-xs mt-3">Tap to copy Scheme ID</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get Involved */}
      <section className="py-16 md:py-24 bg-[var(--earth)]">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-trust mb-4">
              Get Involved
            </h2>
            <p className="text-lg text-trust-soft max-w-2xl mx-auto">
              Join our kindness community. Whether through giving, volunteering, or spreading awareness, every act of kindness contributes to improving the lives of women and children.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Containers for Change Steps */}
            <div className="rounded-[var(--radius-lg)] bg-canvas p-8 shadow-[var(--shadow-sm)]">
              <h3 className="font-serif text-2xl text-trust mb-2">Change for Change</h3>
              <p className="text-kindness font-medium text-sm mb-4">Donate your 10c refundable containers</p>
              <p className="text-trust-soft mb-6 text-sm leading-relaxed">
                In Western Australia, every eligible bottle and can is worth 10 cents through Containers for Change. By using our ID when you return your containers, you demonstrate Kindness in Action.
              </p>
              <ol className="space-y-3 mb-6">
                {[
                  'Collect your eligible 10c containers',
                  'Visit a Containers for Change WA refund point',
                  "Select 'Donate' and enter the Kind Sisters ID:",
                  'Your refund will be donated directly to Kind Sisters',
                ].map((step, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--relief-soft)] text-[var(--relief)] text-sm font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span className="text-trust-soft text-sm">
                      {step}
                      {i === 2 && <strong className="text-[var(--relief)] ml-1">C11083530</strong>}
                    </span>
                  </li>
                ))}
              </ol>
              <p className="text-trust-muted text-xs italic">
                If everyone does a little bit, it adds up to a lot!
              </p>
            </div>

            {/* Volunteer */}
            <div className="rounded-[var(--radius-lg)] bg-canvas p-8 shadow-[var(--shadow-sm)] flex flex-col">
              <h3 className="font-serif text-2xl text-trust mb-2">Volunteer With Us</h3>
              <p className="text-kindness font-medium text-sm mb-4">Join the Kind Sisters team</p>
              <p className="text-trust-soft mb-6 text-sm leading-relaxed flex-1">
                If you are interested in joining the Kind Sisters Team, we would love to hear from you! Whether you can help pack relief bags, support at community events, or contribute your professional skills — every hand makes a difference.
              </p>
              <a
                href="mailto:info@kindsisters.org.au?subject=Volunteer%20Interest"
                className="inline-block rounded-[var(--radius-full)] bg-[var(--kindness)] text-white px-6 py-3 font-semibold text-center hover:bg-[var(--kindness-deep)] transition-colors"
              >
                Email Us to Register Your Interest
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-kindness-whisper text-center">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-serif text-3xl text-trust mb-4">
            Every act of kindness matters
          </h2>
          <p className="text-trust-soft text-lg mb-8">
            Thank you for supporting us and for choosing to turn your containers into kindness.
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-[var(--radius-full)] border-2 border-kindness px-8 py-3 font-medium text-kindness-deep hover:bg-kindness hover:text-white transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </main>
  );
}
