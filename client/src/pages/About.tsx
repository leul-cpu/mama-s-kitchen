// Mama's Kitchen — About Page
// Design: Addis Nocturne — brand story with editorial layout
// Dramatic typography, atmospheric imagery, brand-specific voice
// Fusion of Ethiopian and international cuisine, live-music lounge identity

export default function About() {
  return (
    <div>
      {/* Hero strip */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.13_0.02_340)] via-[oklch(0.15_0.025_340)] to-[oklch(0.13_0.02_340)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[oklch(0.74_0.12_80/0.2)] to-transparent" />
        <div className="container relative z-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[oklch(0.74_0.12_80/0.5)] mb-3">
            Our Story
          </p>
          <h1 className="font-display font-extrabold text-5xl lg:text-7xl text-[oklch(0.93_0.01_80)] tracking-tight max-w-4xl leading-[1.1]">
            A kitchen that feels<br />
            <span className="text-[oklch(0.74_0.12_80)]">like home</span>.
          </h1>
          <p className="font-body text-[oklch(0.93_0.01_80/0.55)] text-lg mt-6 max-w-2xl leading-relaxed">
            Ethiopian food served with international pride. A lounge that comes alive after dark.
            Five venues, one pulse — this is Mama's Kitchen.
          </p>
        </div>
      </section>

      <div className="container pb-24 lg:pb-32">
        {/* Two-column editorial layout */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left column — story text */}
          <div className="space-y-14">
            <section>
              <div className="flex items-baseline gap-3 mb-5">
                <span className="font-mono text-[oklch(0.74_0.12_80/0.3)] text-sm tracking-[0.15em]">01</span>
                <h2 className="font-display font-bold text-2xl lg:text-3xl text-[oklch(0.74_0.12_80)] tracking-tight">
                  The food
                </h2>
              </div>
              <div className="h-px bg-[oklch(0.74_0.12_80/0.1)] mb-5" />
              <p className="font-body text-[oklch(0.93_0.01_80/0.65)] text-base leading-[1.8]">
                Mama's Kitchen was built on a simple idea: Ethiopian food deserves to be served
                with the same generosity and pride as any international cuisine. That's why every
                menu blends Habesha staples — tibs, kitfo, wot, shiro — with international comfort
                food like pizzas, pastas, steaks, and grills. Not fusion for fusion's sake, but
                a kitchen that genuinely serves two traditions with equal respect.
              </p>
              <p className="font-body text-[oklch(0.93_0.01_80/0.65)] text-base leading-[1.8] mt-4">
                The portions are generous because that's how Addis eats. The injera comes fresh,
                the wot is slow-cooked, and the international menu is cooked with the same care
                as the Ethiopian plates. Every branch, every table, every plate — the same standard.
              </p>
            </section>

            <section>
              <div className="flex items-baseline gap-3 mb-5">
                <span className="font-mono text-[oklch(0.74_0.12_80/0.3)] text-sm tracking-[0.15em]">02</span>
                <h2 className="font-display font-bold text-2xl lg:text-3xl text-[oklch(0.74_0.12_80)] tracking-tight">
                  The atmosphere
                </h2>
              </div>
              <div className="h-px bg-[oklch(0.74_0.12_80/0.1)] mb-5" />
              <p className="font-body text-[oklch(0.93_0.01_80/0.65)] text-base leading-[1.8]">
                Think of a lounge after dark. Warm Ethiopian gold and berry-red signage glow
                meeting a live-jazz-club energy. This isn't a bright, minimalist café — it's a
                venue where the night comes alive. At the Royal Lounge, the stage lights come on
                after ten, and the full dinner menu runs late into the evening. The kind of place
                where the music is live and the portions are generous.
              </p>
            </section>

            <section>
              <div className="flex items-baseline gap-3 mb-5">
                <span className="font-mono text-[oklch(0.74_0.12_80/0.3)] text-sm tracking-[0.15em]">03</span>
                <h2 className="font-display font-bold text-2xl lg:text-3xl text-[oklch(0.74_0.12_80)] tracking-tight">
                  Who it's for
                </h2>
              </div>
              <div className="h-px bg-[oklch(0.74_0.12_80/0.1)] mb-5" />
              <p className="font-body text-[oklch(0.93_0.01_80/0.65)] text-base leading-[1.8]">
                Local families who want a reliable spot for a satisfying meal. Young professionals
                and students looking for a vibrant evening out. International visitors seeking
                modern Habesha food in a setting that feels contemporary and welcoming. Anyone
                who wants to eat well, stay late, and feel at home in Addis.
              </p>
            </section>
          </div>

          {/* Right column — imagery + group card */}
          <div className="space-y-8">
            {/* Main food image */}
            <div className="relative overflow-hidden border border-[oklch(0.74_0.12_80/0.08)]">
              <img
                src="/manus-storage/food-hero_f659107c.jpg"
                alt="Traditional Ethiopian food platter at Mama's Kitchen"
                className="w-full h-[280px] lg:h-[380px] object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-[oklch(0.74_0.12_80/0.06)]" />
            </div>

            {/* Lounge image */}
            <div className="relative overflow-hidden border border-[oklch(0.74_0.12_80/0.08)]">
              <img
                src="/manus-storage/lounge-night_266234b3.jpg"
                alt="Mama's Kitchen lounge atmosphere at night"
                className="w-full h-[200px] lg:h-[260px] object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-[oklch(0.74_0.12_80/0.06)]" />
            </div>

            {/* Five venues card — program note style */}
            <div className="p-8 bg-[oklch(0.17_0.02_340)] border border-[oklch(0.74_0.12_80/0.08)]">
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-mono text-[oklch(0.74_0.12_80/0.3)] text-sm tracking-[0.15em]">04</span>
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[oklch(0.74_0.12_80/0.5)]">
                  The Group
                </p>
              </div>
              <h3 className="font-display font-bold text-xl text-[oklch(0.93_0.01_80)] mb-4">
                Five venues, one family
              </h3>
              <p className="font-body text-[oklch(0.93_0.01_80/0.55)] text-sm leading-relaxed mb-5">
                Mama's Kitchen operates five locations across Addis Ababa, each treated as an equal
                branch of the same family. From the 24-hour Bole Medhanialem kitchen to the
                nightlife energy of Royal Lounge, from the Megenagna junction to the hills of
                Entoto, and Mama's Inn combining hotel and restaurant under one roof — every venue
                carries the same standard.
              </p>
              <div className="space-y-0">
                {[
                  "Mama's Kitchen | Bole Medhanialem",
                  "Mama's Kitchen | Megenagna",
                  "Mama's Kitchen | Entoto",
                  "Royal Lounge by Mama's Kitchen",
                  "Mama's Inn",
                ].map((name, i) => (
                  <div key={name} className="flex items-baseline gap-3 py-2 border-b border-[oklch(0.74_0.12_80/0.06)]">
                    <span className="font-mono text-[oklch(0.74_0.12_80/0.2)] text-[10px] tracking-[0.15em] shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-body text-[oklch(0.93_0.01_80/0.5)] text-sm">
                      {name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
