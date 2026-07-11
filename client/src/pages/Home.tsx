// Mama's Kitchen — Home Page
// Design: Addis Nocturne — cinematic dark lounge hero, gold accents, asymmetric editorial flow
// Features: Hero with generated image, branch grid (equal weight), menu preview, footer

import { Link } from "wouter";
import { useEffect, useRef } from "react";
import { branches, menuItems } from "@/lib/data";
import { ArrowRight, MapPin, Clock, Phone } from "lucide-react";

export default function Home() {
  const revealRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-4");
          }
        });
      },
      { threshold: 0.1 }
    );

    revealRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-end overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/manus-storage/hero-banner_c23ef116.jpg"
            alt="Mama's Kitchen lounge interior at night"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.13_0.02_340)] via-[oklch(0.13_0.02_340/0.6)] to-[oklch(0.13_0.02_340/0.3)]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.13_0.02_340/0.8)] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 container pb-16 lg:pb-24">
          <div
            className="opacity-0 translate-y-4"
            ref={(el) => {
              if (el) {
                setTimeout(() => el.classList.add("opacity-100", "translate-y-0", "transition-all", "duration-700", "ease-out-snappy"), 300);
              }
            }}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[oklch(0.74_0.12_80/0.7)] mb-4">
              Five venues across Addis Ababa
            </p>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-7xl text-[oklch(0.93_0.01_80)] leading-[1.1] tracking-tight max-w-3xl">
              Where Addis comes<br />
              <span className="text-[oklch(0.74_0.12_80)]">alive after dark</span>.
            </h1>
            <p className="font-body text-[oklch(0.93_0.01_80/0.7)] text-base lg:text-lg mt-6 max-w-xl leading-relaxed">
              Ethiopian and international cuisine, generous portions, live music.
              Five locations, one pulse — from 24-hour kitchens to the Royal Lounge stage.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 bg-[oklch(0.74_0.12_80)] text-[oklch(0.13_0.02_340)] font-mono text-[11px] uppercase tracking-[0.15em] px-6 py-3 transition-all duration-200 ease-out-snappy hover:bg-[oklch(0.8_0.11_80)] active:scale-[0.97]"
              >
                See tonight's menu
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/branches"
                className="inline-flex items-center gap-2 border border-[oklch(0.74_0.12_80/0.3)] text-[oklch(0.93_0.01_80/0.8)] font-mono text-[11px] uppercase tracking-[0.15em] px-6 py-3 transition-all duration-200 ease-out-snappy hover:border-[oklch(0.74_0.12_80/0.6)] active:scale-[0.97]"
              >
                Find a venue
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Branches Section */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <div className="mb-14">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[oklch(0.74_0.12_80/0.6)] mb-3">
              Our Venues
            </p>
            <h2 className="font-display font-bold text-3xl lg:text-5xl text-[oklch(0.93_0.01_80)] tracking-tight">
              Five venues. One pulse.
            </h2>
          </div>

          {/* Branch Grid — flat, equal visual weight */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {branches.map((branch, i) => (
              <div
                key={branch.id}
                className="group block p-6 bg-[oklch(0.17_0.02_340)] border border-[oklch(0.74_0.12_80/0.08)] transition-all duration-300 ease-out-snappy gold-border-glow hover:bg-[oklch(0.2_0.02_340)] opacity-0 translate-y-4"
                ref={(el) => { if (el) revealRefs.current[i] = el; }}
              >
                <Link href={`/branches#${branch.slug}`} className="block">
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-[oklch(0.74_0.12_80/0.3)] text-xs tracking-[0.15em] shrink-0 mt-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-display font-bold text-lg text-[oklch(0.93_0.01_80)] group-hover:text-[oklch(0.74_0.12_80)] transition-colors duration-300">
                        {branch.name}
                      </h3>
                      <p className="font-ethiopic text-[oklch(0.93_0.01_80/0.5)] text-xs mt-1">
                        {branch.nameAmharic}
                      </p>
                      <p className="font-body text-[oklch(0.93_0.01_80/0.5)] text-sm mt-3 leading-relaxed">
                        {branch.description}
                      </p>
                      <div className="flex flex-wrap gap-4 mt-4">
                        {branch.hasPhone && (
                          <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-[oklch(0.93_0.01_80/0.4)]">
                            <Phone size={12} /> {branch.phone}
                          </span>
                        )}
                        {branch.hasHours && (
                          <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-[oklch(0.93_0.01_80/0.4)]">
                            <Clock size={12} /> {branch.hours}
                          </span>
                        )}
                        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-[oklch(0.93_0.01_80/0.4)]">
                          <MapPin size={12} /> {branch.address.split(",")[0]}
                        </span>
                      </div>
                      {branch.isLounge && (
                        <div className="mt-3 inline-flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[oklch(0.48_0.14_25)] animate-pulse" />
                          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[oklch(0.48_0.14_25)]">
                            Live music venue
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ))}

            {/* Empty slot for 3-col grid symmetry */}
            <div className="hidden lg:flex items-center justify-center p-6 border border-dashed border-[oklch(0.74_0.12_80/0.1)] opacity-30">
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[oklch(0.93_0.01_80/0.2)]">
                More coming soon
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Preview */}
      <section className="py-20 lg:py-28 border-t border-[oklch(0.74_0.12_80/0.05)]">
        <div className="container">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[oklch(0.74_0.12_80/0.6)] mb-3">
                Tonight's Lineup
              </p>
              <h2 className="font-display font-bold text-3xl lg:text-5xl text-[oklch(0.93_0.01_80)] tracking-tight">
                What's cooking
              </h2>
            </div>
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-[oklch(0.74_0.12_80)] hover:text-[oklch(0.8_0.11_80)] transition-colors mt-4 lg:mt-0"
            >
              Full menu
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Lineup Track-List */}
          <div className="max-w-3xl">
            {menuItems.slice(0, 8).map((item, i) => (
              <div key={item.id} className="lineup-item">
                <span className="lineup-number">{String(i + 1).padStart(2, "0")}</span>
                <span className="lineup-name">{item.name}</span>
                {item.priceRange && <span className="lineup-price">{item.priceRange}</span>}
              </div>
            ))}
          </div>

          {/* Price range note */}
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[oklch(0.93_0.01_80/0.3)] mt-8">
            Typical entrées ETB 150–700. Prices vary by branch.
          </p>
        </div>
      </section>

      {/* Atmosphere Section */}
      <section className="py-20 lg:py-28 border-t border-[oklch(0.74_0.12_80/0.05)]">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[oklch(0.74_0.12_80/0.6)] mb-3">
                The Atmosphere
              </p>
              <h2 className="font-display font-bold text-3xl lg:text-4xl text-[oklch(0.93_0.01_80)] tracking-tight leading-tight">
                An Addis lounge<br />
                <span className="text-[oklch(0.74_0.12_80)]">after dark</span>
              </h2>
              <p className="font-body text-[oklch(0.93_0.01_80/0.65)] text-base lg:text-lg mt-6 leading-relaxed max-w-lg">
                Warm Ethiopian gold and berry-red signage glow meeting a live-jazz-club energy.
                Not a bright, minimalist café — this is where the night comes alive. Generous
                portions, live music, and the kind of service that makes you feel at home.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 border border-[oklch(0.74_0.12_80/0.3)] text-[oklch(0.93_0.01_80/0.8)] font-mono text-[11px] uppercase tracking-[0.15em] px-6 py-3 mt-8 transition-all duration-200 ease-out-snappy hover:border-[oklch(0.74_0.12_80/0.6)] active:scale-[0.97]"
              >
                Our story
                <ArrowRight size={14} />
              </Link>
            </div>
            <div className="relative">
              <img
                src="/manus-storage/lounge-night_266234b3.jpg"
                alt="Mama's Kitchen lounge atmosphere at night"
                className="w-full h-[300px] lg:h-[420px] object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-[oklch(0.74_0.12_80/0.1)]" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
