// Mama's Kitchen — Branches Page
// Design: Addis Nocturne — "Tonight's Lineup" as the governing visual language
// Every venue = an act on the bill. Numbered sequencing, gold underline rhythm, venue-as-performance.
// Map embeds, verified fields only, LocalBusiness JSON-LD per branch

import { branches } from "@/lib/data";
import { Phone, MapPin, Clock, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function BranchJSONLD({ branch }: { branch: typeof branches[number] }) {
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: branch.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: branch.address,
      addressLocality: "Addis Ababa",
      addressCountry: "ET",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: branch.lat,
      longitude: branch.lng,
    },
  };

  if (branch.hasPhone && branch.phone) {
    jsonLd.telephone = branch.phone;
  }

  if (branch.hasHours && branch.hours) {
    if (branch.hours.includes("24 hours")) {
      jsonLd.openingHours = ["Mo-Su 00:00-23:59"];
    }
  }

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
  );
}

export default function Branches() {
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && sectionRefs.current[hash]) {
      setTimeout(() => {
        sectionRefs.current[hash]?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.15 }
    );

    branches.forEach((branch) => {
      const el = sectionRefs.current[branch.slug];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      {/* JSON-LD for all branches */}
      {branches.map((branch) => (
        <BranchJSONLD key={branch.id} branch={branch} />
      ))}

      {/* Hero strip */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.13_0.02_340)] via-[oklch(0.15_0.025_340)] to-[oklch(0.13_0.02_340)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[oklch(0.74_0.12_80/0.2)] to-transparent" />
        <div className="container relative z-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[oklch(0.74_0.12_80/0.5)] mb-3">
            The full bill
          </p>
          <h1 className="font-display font-extrabold text-5xl lg:text-7xl text-[oklch(0.93_0.01_80)] tracking-tight">
            The lineup
          </h1>
          <p className="font-body text-[oklch(0.93_0.01_80/0.55)] text-lg mt-4 max-w-2xl leading-relaxed">
            Five venues across Addis Ababa, each with its own character but sharing the same soul.
            Every branch is equal. Every branch is home.
          </p>
        </div>
      </section>

      {/* Venue list — concert program styling */}
      <div className="container pb-24 lg:pb-32">
        <div className="space-y-0">
          {branches.map((branch, index) => {
            const isVisible = visibleItems.has(branch.slug);
            return (
              <div
                key={branch.id}
                id={branch.slug}
                ref={(el) => { sectionRefs.current[branch.slug] = el; }}
                className={`transition-all duration-700 ease-out-snappy ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                {/* Gold divider between acts */}
                {index > 0 && (
                  <div className="h-px bg-gradient-to-r from-transparent via-[oklch(0.74_0.12_80/0.15)] to-transparent my-12 lg:my-16" />
                )}

                {/* Act header — concert bill style */}
                <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
                  {/* Number + Name — left column */}
                  <div className="lg:col-span-5">
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-[oklch(0.74_0.12_80/0.35)] text-lg tracking-[0.15em] shrink-0">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h2 className="font-display font-bold text-2xl lg:text-3xl text-[oklch(0.93_0.01_80)] tracking-tight leading-tight">
                          {branch.name}
                        </h2>
                        <p className="font-ethiopic text-[oklch(0.93_0.01_80/0.35)] text-sm mt-1">
                          {branch.nameAmharic}
                        </p>
                      </div>
                    </div>
                    {branch.isLounge && (
                      <div className="mt-3 inline-flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[oklch(0.48_0.14_25)] animate-pulse" />
                        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[oklch(0.48_0.14_25)]">
                          The stage is live
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Details — right column */}
                  <div className="lg:col-span-4">
                    <p className="font-body text-[oklch(0.93_0.01_80/0.6)] text-sm leading-relaxed mb-6">
                      {branch.description}
                    </p>

                    {/* Verified fields — clean program notes */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <MapPin size={14} className="text-[oklch(0.74_0.12_80/0.3)] shrink-0" />
                        <span className="font-body text-[oklch(0.93_0.01_80/0.6)] text-sm">
                          {branch.address}
                        </span>
                      </div>

                      {branch.hasPhone && branch.phone && (
                        <div className="flex items-center gap-3">
                          <Phone size={14} className="text-[oklch(0.74_0.12_80/0.3)] shrink-0" />
                          <a
                            href={`tel:${branch.phone.replace(/\s/g, "")}`}
                            className="font-body text-[oklch(0.74_0.12_80)] text-sm hover:text-[oklch(0.8_0.11_80)] transition-colors"
                          >
                            {branch.phone}
                          </a>
                        </div>
                      )}

                      {branch.hasHours && branch.hours && (
                        <div className="flex items-center gap-3">
                          <Clock size={14} className="text-[oklch(0.74_0.12_80/0.3)] shrink-0" />
                          <span className="font-body text-[oklch(0.93_0.01_80/0.6)] text-sm">
                            {branch.hours}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Map — rightmost column */}
                  <div className="lg:col-span-3">
                    <div className="bg-[oklch(0.17_0.02_340)] border border-[oklch(0.74_0.12_80/0.06)] overflow-hidden">
                      <iframe
                        src={`https://www.google.com/maps?q=${branch.lat},${branch.lng}&z=16&output=embed`}
                        width="100%"
                        height="220"
                        style={{ border: 0 }}
                        loading="lazy"
                        title={`Map — ${branch.name}`}
                        className="w-full"
                      />
                    </div>
                    <a
                      href={`https://www.google.com/maps?q=${branch.lat},${branch.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-3 font-mono text-[10px] uppercase tracking-[0.15em] text-[oklch(0.74_0.12_80/0.5)] hover:text-[oklch(0.74_0.12_80)] transition-colors"
                    >
                      Get directions <ArrowRight size={12} />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tonight's Lineup event placeholder — Royal Lounge */}
        <div className="mt-20 p-8 border border-[oklch(0.74_0.12_80/0.1)] bg-gradient-to-br from-[oklch(0.17_0.02_340)] to-[oklch(0.74_0.12_80/0.02)]">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-[oklch(0.74_0.12_80/0.4)] text-sm tracking-[0.15em]">04</span>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[oklch(0.48_0.14_25)]">
              Royal Lounge — Event Stage
            </p>
          </div>
          <h3 className="font-display font-bold text-xl text-[oklch(0.93_0.01_80)] mb-2">
            Coming up on stage
          </h3>
          <p className="font-body text-[oklch(0.93_0.01_80/0.5)] text-sm leading-relaxed max-w-xl">
            Specific event nights and performer schedules will appear here once confirmed.
            Royal Lounge is the live music and nightlife branch of the Mama's Kitchen group —
            where the stage lights come on after ten.
          </p>
        </div>
      </div>
    </div>
  );
}
