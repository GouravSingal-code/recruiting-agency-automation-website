import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import BeforeAfter from "@/components/BeforeAfter";
import HowWeSolveIt from "@/components/HowWeSolveIt";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import ROICalculator from "@/components/ROICalculator";
import Results from "@/components/Results";
import DemoProjects from "@/components/DemoProjects";
import Integrations from "@/components/Integrations";
import TriedBefore from "@/components/TriedBefore";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <BeforeAfter />
        <HowWeSolveIt />
        <Services />
        <WhyUs />
        <ROICalculator />
        <Results />
        <DemoProjects />
        <Integrations />
        <TriedBefore />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
