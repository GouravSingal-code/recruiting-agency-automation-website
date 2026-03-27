import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Results from "@/components/Results";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Services />
        <WhyUs />
        <Results />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
