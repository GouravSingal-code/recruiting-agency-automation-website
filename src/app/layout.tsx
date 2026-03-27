import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shortlisted.ai — We Source, Screen & Deliver Interview-Ready Candidates",
  description:
    "Tell us who you need. We source, screen, and deliver interview-ready candidates for any company, any industry, any role. Shortlisted.ai",
  keywords:
    "recruiting agency automation, staffing agency workflow automation, ATS integration services, Bullhorn automation, candidate sourcing automation, recruiter productivity",
  openGraph: {
    title: "Automation Built Exclusively for Recruiting Agencies",
    description:
      "Save 15-25 hours/week per recruiter. We automate sourcing, submittals, and reporting across your entire recruiting tech stack.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Do you replace our ATS?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No. We integrate with your existing ATS (Bullhorn, Recruiterflow, Loxo, JobAdder, etc.) to make it work better. Your ATS handles 30% of your workflow — we automate the other 70%.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How is this different from Bullhorn Automation (Herefish)?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Bullhorn Automation works within Bullhorn only. We connect across all your tools — ATS + LinkedIn + Email + Invoicing + Reporting.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How long until we see ROI?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Quick Win projects ($3,500): ROI in 1-2 months. Full projects ($15-25k): ROI in 3-6 months. 1 extra placement ($20-50k fee) pays for the entire project.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What ATS systems do you support?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Bullhorn, Recruiterflow, Loxo, JobAdder, Crelate, Zoho Recruit, Greenhouse, Lever, Vincere, and most others with APIs.",
                  },
                },
                {
                  "@type": "Question",
                  name: "We tried automation before and it didn't work. What's different?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Most automation fails because the builder didn't understand recruiting workflows, there was no error handling, and no ongoing maintenance. We solve all three — we only work with recruiting agencies, build with error handling and alerts, and offer ongoing support.",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
