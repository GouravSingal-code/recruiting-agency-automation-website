"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { href: "#problem", label: "What We Solve" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#services", label: "Pricing" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md transition-all duration-300"
      style={{
        borderColor: scrolled ? 'rgba(37,99,235,0.15)' : 'rgba(31,41,55,0.8)',
        background: scrolled ? 'rgba(10,10,15,0.92)' : 'rgba(10,10,15,0.75)',
        boxShadow: scrolled ? '0 0 40px rgba(37,99,235,0.07)' : 'none',
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#" className="flex flex-col leading-none group">
          <span className="text-xl font-bold text-foreground">
            Shortlisted
            <span className="text-accent-blue" style={{ textShadow: '0 0 20px rgba(37,99,235,0.5)' }}>
              .ai
            </span>
          </span>
          <span className="text-[10px] text-muted font-medium tracking-wide group-hover:text-accent-blue/60 transition-colors duration-300">
            Interview-ready candidates, delivered
          </span>
        </a>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-sm text-muted transition-colors hover:text-foreground group"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent-blue group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <a
            href="https://calendly.com/YOUR_LINK"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shimmer rounded-lg bg-accent-blue px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-accent-blue/90 hover:scale-105"
            style={{ boxShadow: '0 0 16px rgba(37,99,235,0.3)' }}
          >
            Contact Us
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-foreground hover:text-accent-blue transition-colors"
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-card-border bg-background/95 px-6 pb-6 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm text-muted transition-colors hover:text-foreground border-b border-card-border/40 last:border-0"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://calendly.com/YOUR_LINK"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-4 block rounded-lg bg-accent-blue px-5 py-2.5 text-center text-sm font-semibold text-white"
          >
            Contact Us
          </a>
        </div>
      )}
    </nav>
  );
}
