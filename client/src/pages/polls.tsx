import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import Navigation from "@/components/Navigation";
import PollsHero from "@/components/polls/PollsHero";
import FeaturedPoll from "@/components/polls/FeaturedPoll";
import ActivePolls from "@/components/polls/ActivePolls";
import PastResults from "@/components/polls/PastResults";
import Footer from "@/components/Footer";

export default function Polls() {
  // Page-level cursor tracking motion values relative to viewport client bounds
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for lag-free elegant cursor lag glow physics
  const spotlightX = useSpring(mouseX, { stiffness: 150, damping: 30 });
  const spotlightY = useSpring(mouseY, { stiffness: 150, damping: 30 });

  // Dynamic radial gradient selector setting radius: 140px, brightness: 0.08 soft cyan
  const spotlightBg = useMotionTemplate`radial-gradient(circle 140px at ${spotlightX}px ${spotlightY}px, rgba(205, 235, 250, 0.08) 0%, transparent 100%)`;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="min-h-screen relative">
      {/* top-level page spotlight overlay (scopes only to polls component) */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-30"
        style={{ background: spotlightBg }}
      />

      <Navigation isLightHero={true} />
      <main>
        <PollsHero />
        <FeaturedPoll />
        <ActivePolls />
        <PastResults />
      </main>
      <Footer />
    </div>
  );
}
