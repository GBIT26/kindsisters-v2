"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const featuredPrograms = [
  {
    title: "Essentials Relief Bags",
    href: "/projects/essentials-relief-bags",
    photo: "/images/gallery/img_2446.jpg",
    description:
      "We deliver bags filled with food and hygiene products to families in need through local schools in the Mirrabooka area. These bags provide dignity and relief when it matters most.",
  },
  {
    title: "Women's Community Connect",
    href: "/projects/womens-community-connect",
    photo: "/images/hero/women-multicultural.jpg",
    description:
      "Our community events bring women together for connection, practical support, and access to essential services. Every gathering is a chance to build strength and belonging.",
  },
];

const galleryImages = [
  { src: "/images/gallery/img_6702.jpg", alt: "Kind Sisters community event" },
  { src: "/images/gallery/img_6769.jpg", alt: "Volunteers supporting families" },
  { src: "/images/gallery/img_7828.jpg", alt: "Relief bags being prepared" },
  { src: "/images/gallery/march-2025.jpg", alt: "March 2025 community gathering" },
  { src: "/images/gallery/primary-school-delivery.jpeg", alt: "Delivering essentials to a primary school" },
  { src: "/images/gallery/40-families-first-ever.jpg", alt: "40 families supported for the first time" },
  { src: "/images/gallery/bags-ready-for-delivery.jpeg", alt: "Bags packed and ready for delivery" },
  { src: "/images/gallery/img_1898.jpg", alt: "Kind Sisters volunteers in action" },
  { src: "/images/gallery/kellie.jpeg", alt: "Community member Kellie" },
  { src: "/images/gallery/img_7887.jpg", alt: "Families receiving support" },
  { src: "/images/gallery/img_7942.jpg", alt: "Community connection event" },
  { src: "/images/gallery/hamper.jpg", alt: "Hygiene essentials hamper" },
];

const supportNetwork = [
  { name: "WA Connect", phone: null, website: "https://waconnect.org.au/" },
  { name: "Crisis Care", phone: "1800 199 008", website: null },
  { name: "Salvation Army", phone: "13 72 58", website: null },
  { name: "Anglicare WA", phone: "1300 114 446", website: null },
  { name: "St Vinnies", phone: "1300 794 054", website: null },
  { name: "MercyCare", phone: null, website: "https://www.mercycare.com.au/" },
  { name: "Uniting WA", phone: null, website: "https://unitingwa.org.au/" },
  { name: "Centrecare", phone: "9325 6644", website: null },
  { name: "Ruah", phone: "13 78 24", website: null },
  { name: "Mission Australia", phone: null, website: "https://www.missionaustralia.com.au/" },
  { name: "Foodbank WA", phone: null, website: "https://www.foodbank.org.au/WA/" },
  { name: "MCCO", phone: null, website: null },
  { name: "No Limits Perth", phone: null, website: null },
  { name: "Family Line", phone: "1800 050 321", website: null },
];

export default function ProjectsPage() {
  const [lightboxImage, setLightboxImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const scrollAmount = 320;
    carouselRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <main className="bg-earth">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-kindness-whisper">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-trust">
            Our Programs
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-trust-soft">
            Practical support, genuine connection, and community strength
          </p>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 md:grid-cols-2">
            {featuredPrograms.map((program) => (
              <Link
                key={program.title}
                href={program.href}
                className="group rounded-[var(--radius-lg)] overflow-hidden bg-canvas shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition-shadow"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={program.photo}
                    alt={program.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-8">
                  <h2 className="font-serif text-2xl md:text-3xl text-trust group-hover:text-kindness transition-colors">
                    {program.title}
                  </h2>
                  <p className="mt-4 text-trust-soft leading-relaxed">
                    {program.description}
                  </p>
                  <span className="mt-6 inline-flex items-center text-kindness font-medium">
                    Learn more
                    <svg
                      className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery Carousel */}
      <section className="py-16 md:py-24 bg-canvas">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-3xl md:text-4xl text-trust">
              Gallery
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => scrollCarousel('left')}
                className="w-10 h-10 rounded-full bg-[var(--earth)] flex items-center justify-center text-[var(--trust)] hover:bg-[var(--kindness-whisper)] transition-colors"
                aria-label="Scroll gallery left"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => scrollCarousel('right')}
                className="w-10 h-10 rounded-full bg-[var(--earth)] flex items-center justify-center text-[var(--trust)] hover:bg-[var(--kindness-whisper)] transition-colors"
                aria-label="Scroll gallery right"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          <div
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {galleryImages.map((img) => (
              <button
                key={img.src}
                onClick={() => setLightboxImage(img)}
                className="relative flex-shrink-0 w-72 h-72 snap-start rounded-[var(--radius-lg)] overflow-hidden group cursor-pointer"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="288px"
                />
                <div className="absolute inset-0 bg-[var(--trust)]/0 group-hover:bg-[var(--trust)]/20 transition-colors" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-trust/80 p-4"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-4xl w-full aspect-[4/3] rounded-[var(--radius-lg)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              fill
              className="object-contain"
              sizes="90vw"
            />
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-canvas/90 flex items-center justify-center text-trust hover:bg-canvas transition-colors"
              aria-label="Close lightbox"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Local Support Network */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-serif text-3xl md:text-4xl text-trust text-center mb-4">
            Local Support Network
          </h2>
          <p className="text-center text-trust-soft text-lg mb-12 max-w-2xl mx-auto">
            Kind Sisters works alongside these trusted agencies. If you or
            someone you know needs help, please reach out.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {supportNetwork.map((agency) => (
              <div
                key={agency.name}
                className="rounded-[var(--radius-md)] bg-canvas p-5 shadow-[var(--shadow-sm)] flex items-center justify-between"
              >
                <span className="font-medium text-trust">{agency.name}</span>
                <div className="flex items-center gap-3">
                  {agency.phone && (
                    <a
                      href={`tel:${agency.phone.replace(/\s/g, "")}`}
                      className="text-kindness hover:text-kindness-deep transition-colors text-sm font-medium"
                    >
                      {agency.phone}
                    </a>
                  )}
                  {agency.website && (
                    <a
                      href={agency.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-warmth hover:text-warmth-deep transition-colors"
                      aria-label={`Visit ${agency.name} website`}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
