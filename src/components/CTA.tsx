export default function CTA() {
  return (
    <section id="cta" className="py-20 md:py-28">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <h2 className="text-3xl font-bold text-white md:text-4xl">
          Ready to meet candidates worth interviewing?
        </h2>
        <p className="mt-4 text-lg text-muted">
          Tell us who you need. We&apos;ll source, screen, and deliver a shortlist in 12–14 days.
        </p>
        <a
          href="https://calendly.com/YOUR_LINK"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block rounded-lg bg-accent-blue px-10 py-4 text-base font-semibold text-white shadow-lg shadow-accent-blue/25 transition-all hover:bg-accent-blue/90"
        >
          Contact Us →
        </a>
        <p className="mt-4 text-sm text-muted">No commitment. We respond within one business day.</p>
      </div>
    </section>
  );
}
