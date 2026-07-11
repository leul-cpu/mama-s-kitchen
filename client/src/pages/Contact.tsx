// Mama's Kitchen — Contact Page
// Design: Addis Nocturne — all five branches' verified contact info (NAP)
// Uses the "Tonight's Lineup" numbering system. Social links placeholder in brand voice.
// LocalBusiness JSON-LD for all branches + Organization JSON-LD

import { branches } from "@/lib/data";
import { Phone, MapPin, Clock, ExternalLink, ArrowRight } from "lucide-react";

function ContactJSONLD() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Mama's Kitchen",
    description: "Ethiopian and international cuisine restaurant and lounge group in Addis Ababa, Ethiopia",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Addis Ababa",
      addressCountry: "ET",
    },
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
  );
}

export default function Contact() {
  return (
    <div>
      {/* SEO Meta */}
      <div className="sr-only">
        <h1>Contact Mama's Kitchen — All Locations in Addis Ababa, Ethiopia</h1>
        <p>Contact information for all five Mama's Kitchen branches in Addis Ababa. Live music lounge Addis. Ethiopian cuisine.</p>
      </div>

      {/* JSON-LD */}
      <ContactJSONLD />
      {branches.map((branch) => (
        <script
          key={`jsonld-${branch.id}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
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
              ...(branch.hasPhone && branch.phone ? { telephone: branch.phone } : {}),
            }),
          }}
        />
      ))}

      {/* Hero strip */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.13_0.02_340)] via-[oklch(0.15_0.025_340)] to-[oklch(0.13_0.02_340)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[oklch(0.74_0.12_80/0.2)] to-transparent" />
        <div className="container relative z-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[oklch(0.74_0.12_80/0.5)] mb-3">
            Reach us
          </p>
          <h1 className="font-display font-extrabold text-5xl lg:text-7xl text-[oklch(0.93_0.01_80)] tracking-tight">
            Every branch,<br />
            <span className="text-[oklch(0.74_0.12_80)]">within reach</span>.
          </h1>
          <p className="font-body text-[oklch(0.93_0.01_80/0.55)] text-lg mt-4 max-w-2xl leading-relaxed">
            Five addresses across Addis. Verified info, no guesswork — just the details you need
            to find your way to any Mama's Kitchen door.
          </p>
        </div>
      </section>

      {/* Directory — lineup style, no boxes, just content */}
      <div className="container pb-24 lg:pb-32">
        <div className="max-w-4xl">
          {branches.map((branch, index) => (
            <div key={branch.id}>
              {/* Gold divider between entries */}
              {index > 0 && (
                <div className="h-px bg-gradient-to-r from-transparent via-[oklch(0.74_0.12_80/0.12)] to-transparent my-10" />
              )}

              <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 py-4">
                {/* Left — number + name */}
                <div className="lg:col-span-4">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-[oklch(0.74_0.12_80/0.3)] text-sm tracking-[0.15em] shrink-0">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h2 className="font-display font-bold text-xl lg:text-2xl text-[oklch(0.93_0.01_80)] tracking-tight leading-tight">
                        {branch.name}
                      </h2>
                      <p className="font-ethiopic text-[oklch(0.93_0.01_80/0.3)] text-xs mt-1">
                        {branch.nameAmharic}
                      </p>
                    </div>
                  </div>

                  {/* Quick actions */}
                  <div className="flex flex-wrap gap-3 mt-4">
                    {branch.hasPhone && branch.phone && (
                      <a
                        href={`tel:${branch.phone.replace(/\s/g, "")}`}
                        className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-[oklch(0.74_0.12_80)] border border-[oklch(0.74_0.12_80/0.2)] px-4 py-2 transition-all duration-200 hover:border-[oklch(0.74_0.12_80/0.5)] hover:bg-[oklch(0.74_0.12_80/0.05)] active:scale-[0.97]"
                      >
                        <Phone size={12} /> Call
                      </a>
                    )}
                    <a
                      href={`https://www.google.com/maps?q=${branch.lat},${branch.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-[oklch(0.93_0.01_80/0.5)] border border-[oklch(0.74_0.12_80/0.1)] px-4 py-2 transition-all duration-200 hover:border-[oklch(0.74_0.12_80/0.3)] hover:text-[oklch(0.74_0.12_80)] active:scale-[0.97]"
                    >
                      Directions <ExternalLink size={10} />
                    </a>
                  </div>
                </div>

                {/* Right — details */}
                <div className="lg:col-span-8">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin size={14} className="text-[oklch(0.74_0.12_80/0.3)] shrink-0 mt-0.5" />
                      <span className="font-body text-[oklch(0.93_0.01_80/0.6)] text-sm">
                        {branch.address}
                      </span>
                    </div>

                    {branch.hasPhone && branch.phone && (
                      <div className="flex items-center gap-3">
                        <Phone size={14} className="text-[oklch(0.74_0.12_80/0.3)] shrink-0" />
                        <span className="font-body text-[oklch(0.93_0.01_80/0.6)] text-sm">
                          {branch.phone}
                        </span>
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

                    {/* Map link for branches without phone */}
                    <a
                      href={`https://www.google.com/maps?q=${branch.lat},${branch.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-3 font-mono text-[10px] uppercase tracking-[0.15em] text-[oklch(0.74_0.12_80/0.4)] hover:text-[oklch(0.74_0.12_80)] transition-colors"
                    >
                      View on map <ArrowRight size={12} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social links — brand voice, not generic */}
        <div className="mt-16 p-8 border border-[oklch(0.74_0.12_80/0.08)] bg-gradient-to-br from-[oklch(0.17_0.02_340)] to-[oklch(0.74_0.12_80/0.01)] text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[oklch(0.93_0.01_80/0.3)] mb-3">
            On social
          </p>
          <p className="font-body text-[oklch(0.93_0.01_80/0.45)] text-sm">
            Social links will appear here once we're ready to go live on the platforms.
            For now, find us at any of the five addresses above.
          </p>
        </div>
      </div>
    </div>
  );
}
