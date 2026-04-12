import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet the team behind Kind Sisters — a grass-roots nonprofit supporting vulnerable women and children in Perth since 2015.",
};

const team = [
  {
    name: "Jody Rynski",
    role: "Director & Founder",
    photo: "/images/team/jody-rynski.png",
    bio: "Jody founded Kind Sisters in 2015 with a simple vision: no family in our community should go without essentials. Her passion for grassroots support has grown Kind Sisters from a small local initiative into a trusted community organisation serving families across the City of Stirling and beyond.",
  },
  {
    name: "Penny Webb",
    role: "Director",
    photo: "/images/team/penny-webb.png",
    bio: "With over 25 years of experience in community services, Penny brings deep operational expertise to Kind Sisters. She is the CEO of People Who Care and holds an MBA, combining strategic leadership with a heartfelt commitment to those in need.",
  },
  {
    name: "Alison Taylor",
    role: "Director",
    photo: "/images/team/alison-taylor.png",
    bio: "Alison is a dedicated community advocate whose governance skills and compassionate outlook strengthen every aspect of Kind Sisters. Her steady guidance helps ensure the organisation continues to grow sustainably while staying true to its mission.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-earth">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-kindness-whisper">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-trust">
            Our People
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-trust-soft">
            The hearts and hands behind Kind Sisters
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="font-serif text-3xl md:text-4xl text-trust mb-8">
            Our Story
          </h2>
          <div className="space-y-6 text-trust-soft text-lg leading-relaxed">
            <p>
              Kind Sisters was born in 2015 out of a desire to strengthen
              community within the City of Stirling and surrounding areas.
              What started as one woman&apos;s determination to help local
              families access everyday essentials has grown into an
              organisation built on kindness, trust, and genuine human
              connection.
            </p>
            <p>
              We saw families struggling quietly — parents choosing between
              groceries and toiletries, children arriving at school without
              basic supplies. We knew that small, consistent acts of support
              could make a profound difference.
            </p>
            <p>
              Today, Kind Sisters delivers Essentials Relief Bags through
              local schools, runs Women&apos;s Community Connect events that
              bring people together, and partners with a network of agencies
              to ensure no one in our community faces hardship alone.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:py-24 bg-canvas">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-serif text-3xl md:text-4xl text-trust text-center mb-12">
            Meet the Team
          </h2>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <div
                key={member.name}
                className="rounded-[var(--radius-lg)] overflow-hidden shadow-[var(--shadow-md)] bg-canvas"
              >
                <div className="bg-kindness-soft p-8 flex justify-center">
                  <div className="relative w-48 h-48 rounded-full overflow-hidden">
                    <Image
                      src={member.photo}
                      alt={`Portrait of ${member.name}`}
                      fill
                      className="object-cover"
                      sizes="192px"
                    />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl text-trust">
                    {member.name}
                  </h3>
                  <p className="text-kindness font-medium text-sm mt-1">
                    {member.role}
                  </p>
                  <p className="mt-4 text-trust-soft leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
