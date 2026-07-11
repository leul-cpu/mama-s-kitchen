// Mama's Kitchen — Layout Component
// Design: Addis Nocturne — dark night lounge, gold accents, Bricolage Grotesque display, Space Mono utility
// Navigation: compact uppercase, Amharic wordmark alongside English logo

import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Branches", path: "/branches" },
  { label: "Menu", path: "/menu" },
  { label: "About", path: "/about" },
  { label: "Gallery", path: "/gallery" },
  { label: "Contact", path: "/contact" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "oklch(0.13 0.02 340)" }}>
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out-snappy ${
          scrolled ? "bg-[oklch(0.13_0.02_340/0.95)] backdrop-blur-md border-b border-[oklch(0.74_0.12_80/0.1)]" : "bg-transparent"
        }`}
      >
        <div className="container flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/manus-storage/logo-icon_197abe30.png"
              alt="Mama's Kitchen logo"
              className="w-9 h-9 lg:w-11 lg:h-11 transition-transform duration-300 ease-out-snappy group-hover:scale-110"
            />
            <div className="flex flex-col leading-none">
              <span className="font-display font-bold text-[oklch(0.74_0.12_80)] text-base lg:text-lg tracking-tight">
                Mama's Kitchen
              </span>
              <span className="font-ethiopic text-[oklch(0.74_0.12_80/0.7)] text-[10px] lg:text-xs mt-0.5">
                ማማስ ኪችን
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`font-mono text-[11px] uppercase tracking-[0.15em] transition-colors duration-200 ${
                  location === link.path
                    ? "text-[oklch(0.74_0.12_80)]"
                    : "text-[oklch(0.93_0.01_80/0.62)] hover:text-[oklch(0.74_0.12_80)]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-[oklch(0.74_0.12_80)] p-2 transition-transform duration-200 active:scale-95"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav
            className="lg:hidden bg-[oklch(0.13_0.02_340/0.98)] backdrop-blur-md border-t border-[oklch(0.74_0.12_80/0.1)] animate-in fade-in slide-in-from-top-2"
            style={{ animationDuration: "200ms" }}
          >
            {navLinks.map((link, i) => (
              <Link
                key={link.path}
                href={link.path}
                className={`block px-6 py-3 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors duration-200 ${
                  location === link.path
                    ? "text-[oklch(0.74_0.12_80)] bg-[oklch(0.74_0.12_80/0.05)]"
                    : "text-[oklch(0.93_0.01_80/0.62)] hover:text-[oklch(0.74_0.12_80)]"
                }`}
                style={{
                  animationDelay: `${i * 40}ms`,
                  animation: "fade-in 0.2s ease-out forwards",
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16 lg:pt-20">{children}</main>

      {/* Footer */}
      <footer className="border-t border-[oklch(0.74_0.12_80/0.1)] py-10 lg:py-14" style={{ background: "oklch(0.1 0.02 340)" }}>
        <div className="container">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
            {/* Logo + Tagline */}
            <div className="flex items-start gap-3">
              <img
                src="/manus-storage/logo-icon_197abe30.png"
                alt="Mama's Kitchen logo"
                className="w-10 h-10"
              />
              <div>
                <div className="font-display font-bold text-[oklch(0.74_0.12_80)] text-lg tracking-tight">
                  Mama's Kitchen
                </div>
                <div className="font-ethiopic text-[oklch(0.74_0.12_80/0.6)] text-xs mt-0.5">
                  ማማስ ኪችን
                </div>
                <p className="text-[oklch(0.93_0.01_80/0.5)] text-sm mt-2 font-body max-w-xs">
                  Where Addis comes alive after dark. Five venues. One pulse.
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className="font-mono text-[11px] uppercase tracking-[0.15em] text-[oklch(0.93_0.01_80/0.5)] hover:text-[oklch(0.74_0.12_80)] transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-[oklch(0.74_0.12_80/0.05)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[oklch(0.93_0.01_80/0.3)]">
              Addis Ababa, Ethiopia
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[oklch(0.93_0.01_80/0.3)]">
              &copy; {new Date().getFullYear()} Mama's Kitchen
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
