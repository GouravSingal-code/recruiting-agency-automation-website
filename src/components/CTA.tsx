export default function CTA() {
  return (
    <section id="cta" className="relative py-20 md:py-28 overflow-hidden">
      {/* Animated background blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[700px] rounded-full blur-[120px]"
          style={{
            background: 'radial-gradient(ellipse, rgba(37,99,235,0.12) 0%, rgba(124,58,237,0.06) 50%, transparent 70%)',
            animation: 'pulse-glow 5s ease-in-out infinite',
          }}
        />
      </div>
      <div className="animated-grid absolute inset-0 opacity-30" />

      <div className="relative mx-auto max-w-2xl px-6 text-center">
        <div
          className="inline-block rounded-full border border-accent-blue/30 bg-accent-blue/10 px-4 py-1.5 text-xs font-semibold text-accent-blue mb-6 animate-float"
        >
          No commitment · We respond within 1 business day
        </div>

        <h2
          className="text-3xl font-bold text-white md:text-4xl"
          style={{ opacity: 0, animation: 'fade-in-up 0.6s ease 0.1s forwards' }}
        >
          Ready to meet candidates{' '}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(135deg, #2563eb, #10b981)',
              backgroundSize: '200% 200%',
              animation: 'gradient-shift 4s ease infinite',
            }}
          >
            worth interviewing?
          </span>
        </h2>

        <p
          className="mt-4 text-lg text-muted"
          style={{ opacity: 0, animation: 'fade-in-up 0.6s ease 0.2s forwards' }}
        >
          Tell us who you need. We&apos;ll source, screen, and deliver a shortlist in 12–14 days.
        </p>

        <div
          className="mt-8 inline-block"
          style={{ opacity: 0, animation: 'fade-in-up 0.6s ease 0.3s forwards' }}
        >
          {/* Pulsing ring wrapper */}
          <div className="relative inline-flex">
            <div
              className="absolute inset-0 rounded-lg"
              style={{ animation: 'pulse-ring 2.2s ease-out infinite' }}
            />
            <a
              href="https://calendly.com/jhasaurav215/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shimmer relative inline-block rounded-lg bg-accent-blue px-10 py-4 text-base font-semibold text-white transition-all hover:bg-accent-blue/90 hover:scale-105"
              style={{ boxShadow: '0 0 30px rgba(37,99,235,0.35), 0 8px 24px rgba(0,0,0,0.3)' }}
            >
              Contact Us →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
