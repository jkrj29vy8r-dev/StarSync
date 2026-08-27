import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { BentoGrid } from "@/components/bento-grid";
import { Testimonials } from "@/components/Testimonials";
import { Comparison } from "@/components/Comparison";
import { Integrations } from "@/components/Integrations";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <div id="funcționalități">
        <BentoGrid />
      </div>
      <Testimonials />
      <Comparison />
      <Integrations />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
