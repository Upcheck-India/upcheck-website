import HeroSection from "@/components/HeroSection";
import FeatureCards from "@/components/FeatureCards";
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
        <FeatureCards />
        <VideoSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
