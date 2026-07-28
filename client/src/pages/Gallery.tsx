// Mama's Kitchen — Gallery Page (Tight 3D Reel & Pure Image Lightbox)
// Guaranteed Card Tap: removed blocking overlay layer, direct card hit-testing for 100% reliable full-screen photo viewer.

import { useEffect, useState, useRef, useCallback } from "react";
import { ArrowRight, ArrowLeft, X } from "lucide-react";
import { motion, useMotionValue, useTransform, useAnimationFrame, animate, PanInfo } from "framer-motion";

interface FrameData {
  id: number;
  url: string;
  alt: string;
  caption: string;
  venue: string;
  venueAmharic: string;
  tag: string;
}

const baseFrames: FrameData[] = [
  {
    id: 1,
    url: "/manus-storage/food-hero_f659107c.jpg",
    alt: "Full Ethiopian platter — wot, tibs, kitfo on fresh injera served in traditional presentation",
    caption: "A full injera platter — wot, tibs, and kitfo sharing the same table",
    venue: "Bole Medhanialem",
    venueAmharic: "ቦሌ ምድሓኒዓለም",
    tag: "The kitchen",
  },
  {
    id: 2,
    url: "/manus-storage/lounge-night_266234b3.jpg",
    alt: "Rooftop lounge overlooking Addis city lights at night with ambient warm lighting",
    caption: "The lounge after dark — Addis city lights in the distance",
    venue: "Royal Lounge",
    venueAmharic: "ሮያል ላውንጅ",
    tag: "The stage",
  },
  {
    id: 3,
    url: "/manus-storage/hero-banner_c23ef116.jpg",
    alt: "Live music performance in the dining room featuring acoustic Ethiopian band",
    caption: "Live music night at the dining room",
    venue: "Royal Lounge",
    venueAmharic: "ሮያል ላውንጅ",
    tag: "The stage",
  },
  {
    id: 4,
    url: "/manus-storage/menu-background_7f2f3d7b.jpg",
    alt: "Intimate table setting before service begins with handcrafted candle illumination",
    caption: "The table before the show starts",
    venue: "Entoto",
    venueAmharic: "እንጦጦ",
    tag: "The street",
  },
];



export default function Gallery() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const [radius, setRadius] = useState(320);

  // All frames always shown
  const filteredBase = baseFrames;

  // Repeat items to 8 cards total for a tight 45° step on PC
  const framesList = filteredBase.length > 0
    ? [...filteredBase, ...filteredBase.map((f, i) => ({ ...f, id: f.id + 100 + i }))]
    : [];

  const numCards = framesList.length;
  const angleStep = numCards > 0 ? 360 / numCards : 0;

  // Rotation motion value in degrees
  const rotation = useMotionValue(0);
  const [isPanActive, setIsPanActive] = useState(false);

  // Desktop & Mobile Radius Calibration
  useEffect(() => {
    const updateRadius = () => {
      if (window.innerWidth < 640) {
        setRadius(Math.max(190, window.innerWidth * 0.48));
      } else if (window.innerWidth < 1024) {
        setRadius(Math.max(260, window.innerWidth * 0.32));
      } else {
        setRadius(Math.max(320, window.innerWidth * 0.22));
      }
    };
    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  // Idle auto-rotation
  useAnimationFrame((_, delta) => {
    if (!isPanActive && expandedIndex === null && numCards > 0) {
      rotation.set(rotation.get() - delta * 0.005);
    }
  });

  // Mouse wheel scroll to rotate 3D cylinder
  const handleWheel = useCallback((e: React.WheelEvent) => {
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    const sensitivity = 0.12;
    rotation.set(rotation.get() + delta * sensitivity);
  }, [rotation]);

  // Keyboard navigation for full-screen viewer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (expandedIndex === null) return;
      if (e.key === "Escape") setExpandedIndex(null);
      if (e.key === "ArrowLeft" && expandedIndex > 0) setExpandedIndex(expandedIndex - 1);
      if (e.key === "ArrowRight" && expandedIndex < filteredBase.length - 1) setExpandedIndex(expandedIndex + 1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [expandedIndex, filteredBase.length]);

  // Touch & Pointer Pan Handlers attached directly to stage
  const handlePanStart = () => {
    setIsPanActive(true);
    isDragging.current = false;
  };

  const handlePan = (_: any, info: PanInfo) => {
    if (Math.hypot(info.offset.x, info.offset.y) > 6) {
      isDragging.current = true;
    }
    const sensitivity = window.innerWidth < 768 ? 0.35 : 0.18;
    rotation.set(rotation.get() + info.delta.x * sensitivity);
  };

  const handlePanEnd = (_: any, info: PanInfo) => {
    setIsPanActive(false);
    const sensitivity = window.innerWidth < 768 ? 0.35 : 0.18;
    const velocity = info.velocity.x * sensitivity;
    animate(rotation, rotation.get() + velocity * 0.4, {
      type: "spring",
      damping: 22,
      stiffness: 95,
    });
  };

  // Card click / tap handler (guaranteed 100% trigger when tapping a card without dragging)
  const handleCardSelect = (index: number) => {
    if (!isDragging.current) {
      setExpandedIndex(index % filteredBase.length);
    }
  };

  // Scroll progress indicator (0 to 1)
  const progress = useTransform(rotation, (r) => {
    const normalized = ((r % 360) + 360) % 360;
    return 1 - normalized / 360;
  });

  return (
    <div 
      className="py-12 sm:py-16 lg:py-24 overflow-hidden min-h-screen flex flex-col bg-[oklch(0.13_0.02_340)] text-[oklch(0.93_0.01_80)] relative select-none"
      onWheel={handleWheel}
    >
      {/* SEO Meta */}
      <div className="sr-only">
        <h1>Mama's Kitchen Gallery — The Night Reel</h1>
        <p>The kitchen, the stage, the street. A 3D interactive gallery experience in Addis Ababa.</p>
      </div>

      {/* Header matching site design */}
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="mb-5 sm:mb-8 lg:mb-10">
          <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[oklch(0.74_0.12_80/0.6)] mb-2">
            The Night Reel
          </p>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-7xl text-[oklch(0.93_0.01_80)] tracking-tight">
            Frames from<br />
            <span className="text-[oklch(0.74_0.12_80)]">the floor</span>.
          </h1>
          <p className="font-body text-[oklch(0.93_0.01_80/0.55)] text-xs sm:text-sm lg:text-base mt-2 max-w-xl leading-relaxed">
            Swipe left or right to spin the 3D reel — tap any picture to view the image solely in full screen.
          </p>
        </div>
      </div>


      {/* 3D Carousel Stage with Direct Pan Gestures (NO blocking overlay) */}
      <motion.div 
        className="relative flex-grow flex items-center justify-center min-h-[360px] sm:min-h-[420px] lg:min-h-[500px] overflow-hidden touch-pan-y cursor-grab active:cursor-grabbing" 
        ref={containerRef}
        onPanStart={handlePanStart}
        onPan={handlePan}
        onPanEnd={handlePanEnd}
      >
        {/* 3D Scene Container */}
        <div className="absolute inset-0 flex items-center justify-center perspective-[900px] sm:perspective-[1100px] lg:perspective-[1500px]">
          {numCards > 0 ? (
            <motion.div
              className="relative w-full h-full flex items-center justify-center transform-style-3d"
              style={{ rotateY: rotation }}
            >
              {framesList.map((frame, index) => {
                const angle = index * angleStep;

                // Relative angle calculation (-180 to 180)
                const cardAngle = useTransform(rotation, (r) => {
                  let rel = (r + angle) % 360;
                  if (rel < -180) rel += 360;
                  if (rel > 180) rel -= 360;
                  return rel;
                });

                // Calibrated opacity and scale for close, aesthetic card spacing on PC
                const opacity = useTransform(cardAngle, [-180, -135, -90, -45, 0, 45, 90, 135, 180], [0.05, 0.25, 0.6, 0.9, 1, 0.9, 0.6, 0.25, 0.05]);
                const blur = useTransform(cardAngle, [-180, -90, 0, 90, 180], ["blur(12px)", "blur(4px)", "blur(0px)", "blur(4px)", "blur(12px)"]);
                const scale = useTransform(cardAngle, [-180, -90, 0, 90, 180], [0.72, 0.86, 1.03, 0.86, 0.72]);
                const zIndex = useTransform(cardAngle, (val) => Math.round(200 - Math.abs(val)));
                const darkness = useTransform(cardAngle, [-180, -90, 0, 90, 180], [0.85, 0.45, 0, 0.45, 0.85]);

                return (
                  <div
                    key={`${frame.id}-${index}`}
                    className="absolute inset-0 flex items-center justify-center transform-style-3d pointer-events-none"
                    style={{ transform: `rotateY(${angle}deg) translateZ(${radius}px)` }}
                  >
                    {/* Direct interactive Card with onClick & onTap for 100% guaranteed popup */}
                    <motion.div
                      className="relative w-[42vw] sm:w-[28vw] md:w-[20vw] lg:w-[16vw] max-w-[220px] aspect-[3/4] rounded-2xl overflow-hidden border border-[oklch(0.74_0.12_80/0.25)] bg-[oklch(0.17_0.02_340)] pointer-events-auto cursor-pointer shadow-[0_20px_40px_rgba(0,0,0,0.8),_0_0_15px_oklch(0.74_0.12_80/0.08)_inset] transition-border duration-300 hover:border-[oklch(0.74_0.12_80/0.6)]"
                      style={{
                        opacity,
                        scale,
                        filter: blur,
                        zIndex,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardSelect(index);
                      }}
                      onTap={(e) => {
                        e.stopPropagation();
                        handleCardSelect(index);
                      }}
                    >
                      {/* Photo */}
                      <img
                        src={frame.url}
                        alt={frame.alt}
                        className="w-full h-full object-cover pointer-events-none"
                        loading="lazy"
                      />

                      {/* Lighting Overlay */}
                      <motion.div
                        className="absolute inset-0 bg-black pointer-events-none"
                        style={{ opacity: darkness }}
                      />

                      {/* Bottom Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.13_0.02_340)] via-[oklch(0.13_0.02_340/0.5)] to-transparent pointer-events-none" />

                      {/* Highlight Ring */}
                      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-[oklch(0.74_0.12_80/0.15)] pointer-events-none" />

                      {/* Text Stacked Bottom-Left */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 lg:p-5 text-left pointer-events-none">
                        <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.15em] text-[oklch(0.74_0.12_80)] mb-0.5 block">
                          {frame.tag}
                        </span>
                        <h3 className="font-display font-bold text-white text-xs sm:text-sm lg:text-base leading-tight">
                          {frame.venue}
                        </h3>
                        <p className="font-body text-[oklch(0.93_0.01_80/0.6)] text-[9px] sm:text-[10px] lg:text-[11px] mt-0.5 line-clamp-2">
                          {frame.caption}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          ) : (
            <div className="text-[oklch(0.93_0.01_80/0.4)] font-mono text-xs sm:text-sm pointer-events-auto">No frames found.</div>
          )}
        </div>

        {/* Scroll Progress Indicator */}
        <div className="absolute right-2 sm:right-4 lg:right-10 top-1/2 -translate-y-1/2 h-28 sm:h-32 lg:h-44 w-[2px] bg-[oklch(0.74_0.12_80/0.15)] rounded-full overflow-hidden pointer-events-none">
          <motion.div
            className="w-full bg-[oklch(0.74_0.12_80)] rounded-full origin-top shadow-[0_0_8px_oklch(0.74_0.12_80/0.6)]"
            style={{
              height: "100%",
              scaleY: progress,
            }}
          />
        </div>
      </motion.div>

      {/* Sole Selected Image Lightbox — Pure Full-Screen Viewer */}
      {expandedIndex !== null && filteredBase[expandedIndex] && (
        <div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-between p-4 sm:p-6 lg:p-10 bg-black/95 backdrop-blur-2xl transition-opacity duration-300"
          onClick={() => setExpandedIndex(null)}
        >
          {/* Top Bar: Close Button & Counter */}
          <div className="w-full flex items-center justify-between max-w-6xl z-30 pt-2" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[oklch(0.74_0.12_80)] bg-[oklch(0.74_0.12_80/0.15)] px-2.5 py-1 rounded border border-[oklch(0.74_0.12_80/0.3)]">
                {filteredBase[expandedIndex].tag}
              </span>
              <span className="font-mono text-xs tracking-widest text-gray-400 ml-2">
                {String(expandedIndex + 1).padStart(2, "0")} / {String(filteredBase.length).padStart(2, "0")}
              </span>
            </div>

            {/* Sole Close Button */}
            <button
              onClick={() => setExpandedIndex(null)}
              className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all active:scale-95 cursor-pointer"
              aria-label="Close full image view"
            >
              <X size={22} />
            </button>
          </div>

          {/* Center Stage: Sole Image Focus with Navigation Arrows */}
          <div className="relative w-full max-w-6xl flex-grow flex items-center justify-center my-4 overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {/* Previous Image Arrow */}
            {expandedIndex > 0 && (
              <button
                onClick={() => setExpandedIndex(expandedIndex - 1)}
                className="absolute left-2 sm:left-4 z-30 w-12 h-12 flex items-center justify-center rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-white transition-all active:scale-90 shadow-2xl backdrop-blur-md cursor-pointer"
                aria-label="Previous photo"
              >
                <ArrowLeft size={22} />
              </button>
            )}

            {/* Sole High-Res Photo */}
            <motion.img
              key={filteredBase[expandedIndex].id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              src={filteredBase[expandedIndex].url}
              alt={filteredBase[expandedIndex].alt}
              className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-[0_25px_60px_rgba(0,0,0,0.9)]"
            />

            {/* Next Image Arrow */}
            {expandedIndex < filteredBase.length - 1 && (
              <button
                onClick={() => setExpandedIndex(expandedIndex + 1)}
                className="absolute right-2 sm:right-4 z-30 w-12 h-12 flex items-center justify-center rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-white transition-all active:scale-90 shadow-2xl backdrop-blur-md cursor-pointer"
                aria-label="Next photo"
              >
                <ArrowRight size={22} />
              </button>
            )}
          </div>

          {/* Bottom Bar: Image Title & Caption */}
          <div className="w-full max-w-3xl text-center z-30 pb-2" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-display font-bold text-xl sm:text-2xl lg:text-3xl text-white drop-shadow-md">
              {filteredBase[expandedIndex].caption}
            </h2>
            <p className="font-body text-gray-400 text-xs sm:text-sm mt-1 max-w-xl mx-auto leading-relaxed">
              {filteredBase[expandedIndex].venue} — {filteredBase[expandedIndex].venueAmharic}
            </p>
          </div>
        </div>
      )}

      {/* Preserve 3D context */}
      <style>{`
        .transform-style-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  );
}
