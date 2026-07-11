// Mama's Kitchen — Gallery Page (V2)
// Design: Addis Nocturne — "The Night Reel"
// CONCEPT: A cinematic horizontal scroll experience. Each photo is a "frame" in a film reel
// that scrolls horizontally on desktop (snap-scroll carousel), with a stacked vertical reveal
// on mobile. Each frame has a venue tag, a caption in the brand voice, and a subtle film-grain
// overlay. No lightbox — instead the image expands in-place on hover with a vignette pull-back.
// The page reads like walking through a gallery of Polaroids pinned on a dark lounge wall.

import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface FrameData {
  id: number;
  url: string;
  alt: string;
  caption: string;
  venue: string;
  venueAmharic: string;
  tag: string;
}

const frames: FrameData[] = [
  {
    id: 1,
    url: "/manus-storage/food-hero_f659107c.jpg",
    alt: "Full Ethiopian platter — wot, tibs, kitfo on fresh injera",
    caption: "A full injera platter — wot, tibs, and kitfo sharing the same table",
    venue: "Bole Medhanialem",
    venueAmharic: "ቦሌ ምድሓኒዓለም",
    tag: "The kitchen",
  },
  {
    id: 2,
    url: "/manus-storage/lounge-night_266234b3.jpg",
    alt: "Rooftop lounge overlooking Addis city lights at night",
    caption: "The lounge after dark — Addis city lights in the distance",
    venue: "Royal Lounge",
    venueAmharic: "ሮያል ላውንጅ",
    tag: "The stage",
  },
  {
    id: 3,
    url: "/manus-storage/hero-banner_c23ef116.jpg",
    alt: "Live music performance in the dining room",
    caption: "Live music night at the dining room",
    venue: "Royal Lounge",
    venueAmharic: "ሮያል ላውንጅ",
    tag: "The stage",
  },
  {
    id: 4,
    url: "/manus-storage/menu-background_7f2f3d7b.jpg",
    alt: "Intimate table setting before service begins",
    caption: "The table before the show starts",
    venue: "Entoto",
    venueAmharic: "እንጦጦ",
    tag: "The street",
  },
];

const tags = ["All", "The kitchen", "The stage", "The street"];

function FilmFrame({
  frame,
  isActive,
  onExpand,
}: {
  frame: FrameData;
  isActive: boolean;
  onExpand: () => void;
}) {
  return (
    <div
      className={`shrink-0 relative group cursor-pointer transition-all duration-500 ease-out-snappy ${
        isActive ? "w-[70vw] lg:w-[60vw] opacity-100" : "w-[50vw] lg:w-[35vw] opacity-70"
      }`}
      onClick={onExpand}
    >
      {/* Frame border — like a Polaroid pinned to a wall */}
      <div className="relative bg-[oklch(0.15_0.02_340)] border border-[oklch(0.74_0.12_80/0.08)] overflow-hidden transition-all duration-500 ease-out-snappy group-hover:border-[oklch(0.74_0.12_80/0.2)]">
        {/* Image */}
        <div className={`relative overflow-hidden transition-all duration-500 ease-out-snappy ${
          isActive ? "aspect-[16/9]" : "aspect-[4/3]"
        }`}>
          <img
            src={frame.url}
            alt={frame.alt}
            className="w-full h-full object-cover transition-transform duration-700 ease-out-snappy group-hover:scale-105"
            loading="lazy"
          />
          {/* Film grain overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJncmFpbiI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNzUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjZ3JhaW4pIiBvcGFjaXR5PSIwLjA0Ii8+PC9zdmc+')] opacity-40 mix-blend-overlay pointer-events-none" />
          {/* Vignette — pulls back on hover */}
          <div className="absolute inset-0 ring-1 ring-inset ring-[oklch(0.08_0.01_340/0.6)] transition-opacity duration-500 group-hover:opacity-0 opacity-100" />
          {/* Bottom gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[oklch(0.13_0.02_340/0.9)] to-transparent pointer-events-none" />
        </div>

        {/* Polaroid-style caption strip below image */}
        <div className="px-5 py-4 border-t border-[oklch(0.74_0.12_80/0.06)]">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[oklch(0.74_0.12_80/0.4)]">
              {frame.tag}
            </span>
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-[oklch(0.74_0.12_80/0.3)]">
                {frame.venue}
              </span>
              <span className="font-ethiopic text-[9px] text-[oklch(0.74_0.12_80/0.2)]">
                {frame.venueAmharic}
              </span>
            </div>
          </div>
          <p className="font-body text-[oklch(0.93_0.01_80/0.6)] text-xs leading-relaxed">
            {frame.caption}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeTag, setActiveTag] = useState("All");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const filteredFrames = activeTag === "All"
    ? frames
    : frames.filter((f) => f.tag === activeTag);

  const checkScrollButtons = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    checkScrollButtons();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScrollButtons);
    return () => el.removeEventListener("scroll", checkScrollButtons);
  }, [filteredFrames.length, checkScrollButtons]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.6;
    el.scrollTo({
      left: el.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount),
      behavior: "smooth",
    });
  };

  return (
    <div className="py-20 lg:py-28 overflow-hidden">
      {/* SEO Meta */}
      <div className="sr-only">
        <h1>Mama's Kitchen Gallery — The Night Reel in Addis Ababa</h1>
        <p>The kitchen, the stage, the street. A cinematic journey through the Mama's Kitchen experience.</p>
      </div>

      <div className="container">
        {/* Header */}
        <div className="mb-14">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[oklch(0.74_0.12_80/0.6)] mb-3">
            The Night Reel
          </p>
          <h1 className="font-display font-extrabold text-5xl lg:text-7xl text-[oklch(0.93_0.01_80)] tracking-tight">
            Frames from<br />
            <span className="text-[oklch(0.74_0.12_80)]">the floor</span>.
          </h1>
          <p className="font-body text-[oklch(0.93_0.01_80/0.55)] text-lg mt-4 max-w-2xl leading-relaxed">
            The kitchen, the stage, the street. Scroll through the moments that define the
            Mama's Kitchen experience — each frame a snapshot from one of our five venues.
          </p>
        </div>

        {/* Filter tags */}
        <div className="flex flex-wrap gap-2 mb-10">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => { setActiveTag(tag); setExpandedIndex(null); }}
              className={`font-mono text-[10px] uppercase tracking-[0.15em] px-4 py-2 transition-all duration-200 ease-out-snappy active:scale-[0.97] ${
                activeTag === tag
                  ? "bg-[oklch(0.74_0.12_80)] text-[oklch(0.13_0.02_340)]"
                  : "border border-[oklch(0.74_0.12_80/0.12)] text-[oklch(0.93_0.01_80/0.4)] hover:border-[oklch(0.74_0.12_80/0.3)] hover:text-[oklch(0.74_0.12_80)]"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Horizontal Film Reel — snap-scroll carousel */}
      <div className="relative">
        {/* Scroll controls */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-[oklch(0.13_0.02_340/0.9)] border border-[oklch(0.74_0.12_80/0.15)] text-[oklch(0.74_0.12_80)] hover:border-[oklch(0.74_0.12_80/0.4)] transition-all duration-200 ease-out-snappy active:scale-90 backdrop-blur-sm"
            aria-label="Scroll left"
          >
            <ArrowLeft size={18} />
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-[oklch(0.13_0.02_340/0.9)] border border-[oklch(0.74_0.12_80/0.15)] text-[oklch(0.74_0.12_80)] hover:border-[oklch(0.74_0.12_80/0.4)] transition-all duration-200 ease-out-snappy active:scale-90 backdrop-blur-sm"
            aria-label="Scroll right"
          >
            <ArrowRight size={18} />
          </button>
        )}

        {/* Scrolling track */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory px-[15vw] lg:px-[20vw] py-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onScroll={checkScrollButtons}
        >
          {filteredFrames.map((frame, index) => (
            <div
              key={frame.id}
              className="snap-start"
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            >
              <FilmFrame
                frame={frame}
                isActive={expandedIndex === index}
                onExpand={() => setExpandedIndex(expandedIndex === index ? null : index)}
              />
            </div>
          ))}
        </div>

        {/* Hide scrollbar */}
        <style>{`.snap-x::-webkit-scrollbar { display: none; }`}</style>
      </div>

      {/* Frame counter — bottom right */}
      <div className="container mt-8">
        <div className="flex items-center justify-end gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[oklch(0.93_0.01_80/0.3)]">
            Drag or scroll
          </span>
          <span className="w-px h-3 bg-[oklch(0.74_0.12_80/0.1)]" />
          <span className="font-mono text-[10px] tracking-[0.15em] text-[oklch(0.74_0.12_80/0.4)]">
            <span className="text-[oklch(0.74_0.12_80)]">01</span> / 0{filteredFrames.length}
          </span>
        </div>
      </div>

      {/* Expanded view — modal-like overlay when a frame is clicked */}
      {expandedIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-8 transition-opacity duration-300"
          style={{
            background: "oklch(0.06 0.01 340 / 0.92)",
            backdropFilter: "blur(12px)",
          }}
          onClick={() => setExpandedIndex(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setExpandedIndex(null)}
              className="absolute -top-10 right-0 text-[oklch(0.93_0.01_80/0.5)] hover:text-[oklch(0.74_0.12_80)] transition-colors"
              aria-label="Close expanded view"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="4" y1="4" x2="16" y2="16" />
                <line x1="16" y1="4" x2="4" y2="16" />
              </svg>
            </button>

            {/* Expanded image */}
            <div className="relative overflow-hidden border border-[oklch(0.74_0.12_80/0.1)]">
              <img
                src={filteredFrames[expandedIndex].url}
                alt={filteredFrames[expandedIndex].alt}
                className="w-full h-[50vh] lg:h-[65vh] object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-[oklch(0.08_0.01_340/0.4)]" />
            </div>

            {/* Caption */}
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="font-body text-[oklch(0.93_0.01_80/0.7)] text-sm">
                  {filteredFrames[expandedIndex].caption}
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[oklch(0.74_0.12_80/0.4)]">
                    {filteredFrames[expandedIndex].tag}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-[oklch(0.74_0.12_80/0.3)]">
                    {filteredFrames[expandedIndex].venue}
                  </span>
                </div>
              </div>

              {/* Navigate frames */}
              <div className="flex items-center gap-2">
                {expandedIndex > 0 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedIndex(expandedIndex - 1);
                    }}
                    className="w-8 h-8 flex items-center justify-center border border-[oklch(0.74_0.12_80/0.15)] text-[oklch(0.74_0.12_80/0.5)] hover:border-[oklch(0.74_0.12_80/0.4)] transition-all active:scale-90"
                  >
                    <ArrowLeft size={14} />
                  </button>
                )}
                <span className="font-mono text-[10px] tracking-[0.15em] text-[oklch(0.93_0.01_80/0.3)]">
                  {String(expandedIndex + 1).padStart(2, "0")} / {String(filteredFrames.length).padStart(2, "0")}
                </span>
                {expandedIndex < filteredFrames.length - 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedIndex(expandedIndex + 1);
                    }}
                    className="w-8 h-8 flex items-center justify-center border border-[oklch(0.74_0.12_80/0.15)] text-[oklch(0.74_0.12_80/0.5)] hover:border-[oklch(0.74_0.12_80/0.4)] transition-all active:scale-90"
                  >
                    <ArrowRight size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom note — brand voice */}
      <div className="container mt-16">
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-3 py-3 px-6 border border-[oklch(0.74_0.12_80/0.08)]">
            <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-[oklch(0.93_0.01_80/0.25)]">
              Film in production
            </span>
            <span className="w-1 h-1 rounded-full bg-[oklch(0.74_0.12_80/0.3)] animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
