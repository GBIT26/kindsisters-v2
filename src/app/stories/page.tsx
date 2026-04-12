import Link from "next/link";

const testimonials = [
  {
    name: "Sarah M.",
    context: "Refugee family receiving bags",
    quote:
      "When we first arrived in Perth, we had nothing. No furniture, no food in the cupboards, and three children to look after. The school told us about Kind Sisters, and within days a bag arrived with everything we needed. It wasn't just the food and toiletries — it was knowing that someone in this new country cared about us. My children went to school the next day with full stomachs and clean clothes. That small bag gave us hope that we could build a life here.",
  },
  {
    name: "Lisa T.",
    context: "Volunteer who found purpose",
    quote:
      "After my youngest started school, I felt lost. I'd spent years as a full-time mum and didn't know what to do with myself. A friend invited me to help pack bags at Kind Sisters, and I haven't looked back. The other volunteers became my closest friends. Seeing the difference we make — the relief on a parent's face when they receive a bag — it gives me a sense of purpose I didn't know I was missing. Volunteering here changed my life as much as it changed anyone else's.",
  },
  {
    name: "Rachel K.",
    context: "School support worker",
    quote:
      "As a school support worker, I see families in crisis every week. Parents come to me in tears because they can't afford lunch for their kids. Before Kind Sisters, I had very little I could offer them. Now I can say, 'Let me get you some support,' and within days a bag of essentials is there. It takes the pressure off families at their most vulnerable moments. The bags are always packed with care — you can tell they're put together by people who genuinely understand what families need.",
  },
  {
    name: "Maria D.",
    context: "Monthly donor who visited a delivery",
    quote:
      "I'd been donating monthly for about a year when Jody invited me to come and see a bag delivery at one of the schools. Watching the support worker hand a bag to a mum who was visibly struggling — and seeing her shoulders drop with relief — I understood exactly where my money was going. It's not a faceless charity. It's real people helping real families, one bag at a time. I doubled my donation that afternoon and I haven't regretted it for a second.",
  },
];

export default function TestimonialsPage() {
  return (
    <div className="bg-earth">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-kindness-whisper">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-trust">
            Stories of Hope
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-trust-soft">
            Real voices from the people whose lives have been touched by
            Kind Sisters
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-8 md:grid-cols-2">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="rounded-[var(--radius-lg)] bg-canvas p-8 shadow-[var(--shadow-sm)] border-l-4 border-kindness"
              >
                <svg
                  className="w-8 h-8 text-kindness-soft mb-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
                </svg>
                <blockquote className="text-trust-soft leading-relaxed mb-6">
                  {testimonial.quote}
                </blockquote>
                <div>
                  <p className="font-medium text-trust">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-trust-muted">
                    {testimonial.context}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-warmth-glow text-center">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-serif text-3xl text-trust mb-4">
            Be part of a story that matters
          </h2>
          <p className="text-trust-soft text-lg mb-8">
            Every donation, every volunteer hour, every act of kindness
            creates another story of hope in our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/donate"
              className="inline-block rounded-[var(--radius-full)] bg-warmth px-10 py-4 text-lg font-semibold text-white hover:bg-warmth-deep transition-colors"
            >
              Donate Now
            </Link>
            <Link
              href="/get-involved"
              className="inline-block rounded-[var(--radius-full)] border-2 border-trust px-10 py-4 text-lg font-semibold text-trust hover:bg-trust hover:text-white transition-colors"
            >
              Get Involved
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
