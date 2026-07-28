import HeroSection from "@/components/HeroSection";
import ProblemsScrollytelling from "@/components/ProblemsScrollytelling";
import SolutionSection from "@/components/SolutionSection";
import VideoSection from "@/components/VideoSection";
import PricingSection from "@/components/PricingSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <ProblemsScrollytelling />
        <SolutionSection />
        <VideoSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
