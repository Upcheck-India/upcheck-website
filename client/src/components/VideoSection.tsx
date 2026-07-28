import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export default function VideoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position of the section relative to the viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end center"]
  });

  // Apply spring smoothing for buttery fluid transitions
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 20,
    restDelta: 0.001
  });

  // Map progress to scale, opacity, and 3D rotation for the video container
  const videoScale = useTransform(smoothProgress, [0.1, 0.6], [0.85, 1]);
  const videoOpacity = useTransform(smoothProgress, [0.1, 0.5], [0, 1]);
  const videoRotateX = useTransform(smoothProgress, [0.1, 0.6], [12, 0]);

  // Map progress to title and subtitle slide-ins
  const titleY = useTransform(smoothProgress, [0.0, 0.4], [40, 0]);
  const titleOpacity = useTransform(smoothProgress, [0.0, 0.4], [0, 1]);
  const subtitleY = useTransform(smoothProgress, [0.1, 0.5], [30, 0]);
  const subtitleOpacity = useTransform(smoothProgress, [0.1, 0.5], [0, 1]);

  return (
    <section ref={sectionRef} className="py-20 px-6 relative" style={{ background: "linear-gradient(180deg, #e0f2fe 0%, #ffffff 100%)" }} data-testid="section-video">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            style={{ 
              y: titleY,
              opacity: titleOpacity,
              background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}
            className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight leading-tight"
            data-testid="text-video-title"
          >
            See Upcheck in Action
          </motion.h2>
          <motion.p 
            style={{
              y: subtitleY,
              opacity: subtitleOpacity
            }}
            className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto font-medium" 
            data-testid="text-video-subtitle"
          >
            Watch how Upcheck is revolutionizing shrimp farming through smart technology and data-driven insights.
          </motion.p>
        </div>

        {/* Video Wrapper Container with 3D scroll entrance & Shadow */}
        <motion.div
          style={{ 
            scale: videoScale,
            opacity: videoOpacity,
            rotateX: videoRotateX,
            transformStyle: "preserve-3d", 
            perspective: 1000 
          }}
          className="relative aspect-video w-full max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-[0_30px_60px_rgba(0,103,177,0.18)] bg-[#59B2D8]"
        >
          <div className="absolute inset-0 bg-[#59B2D8]/10 animate-pulse duration-3000" />
          
          {/* Cinematic Clip Path Reveal Wrapper */}
          <div className="absolute inset-0 w-full h-full z-10">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/sxu62fm_Z5E"
              title="Upcheck - Reinventing Shrimp Aquaculture"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
      
      {/* Seamless transition fade to white */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none z-20" />
    </section>
  );
}