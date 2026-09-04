import Navigation from "@/components/Navigation";
import AboutSection from "@/components/AboutSection";
import OurStory from "@/components/OurStory";
import ValuesSection from "@/components/ValuesSection";
import TeamSection from "@/components/TeamSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-20">
        <AboutSection />
        <OurStory />
        <ValuesSection />
        <TeamSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
