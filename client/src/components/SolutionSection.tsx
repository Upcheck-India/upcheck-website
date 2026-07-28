import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { Sparkles } from "lucide-react";

export default function SolutionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Track raw scroll position of the section relative to the viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end center"]
  });

  // Apply spring smoothing to the scroll progress for buttery, fluid transitions
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 20,
    restDelta: 0.001
  });

  // Map smooth progress to container morphing states (completes quickly between 5% and 35% scroll depth)
  const scale = useTransform(smoothProgress, [0.05, 0.35], [0.8, 1]);
  const opacity = useTransform(smoothProgress, [0.05, 0.25], [0, 1]);
  const borderRadius = useTransform(smoothProgress, [0.05, 0.35], ["12px", "32px"]);

  // Map scroll progress to three stacked images for subtle parallax offsets
  const farmY = useTransform(smoothProgress, [0, 1], [-15, 15]);
  const farmX = useTransform(smoothProgress, [0, 1], [-10, 10]);

  const sol2Y = useTransform(smoothProgress, [0, 1], [0, 0]); // Neutral speed reference

  const sol1Y = useTransform(smoothProgress, [0, 1], [25, -25]);
  const sol1X = useTransform(smoothProgress, [0, 1], [15, -15]);

  // Map smooth progress to sequential sentence reveals (occurs right after card expands)
  const s1Opacity = useTransform(smoothProgress, [0.12, 0.22], [0, 1]);
  const s1Y = useTransform(smoothProgress, [0.12, 0.22], [10, 0]);

  const s2Opacity = useTransform(smoothProgress, [0.20, 0.30], [0, 1]);
  const s2Y = useTransform(smoothProgress, [0.20, 0.30], [10, 0]);

  const s3Opacity = useTransform(smoothProgress, [0.28, 0.38], [0, 1]);
  const s3Y = useTransform(smoothProgress, [0.28, 0.38], [10, 0]);

  const s4Opacity = useTransform(smoothProgress, [0.36, 0.46], [0, 1]);
  const s4Y = useTransform(smoothProgress, [0.36, 0.46], [10, 0]);

  return (
    <section 
      ref={sectionRef} 
      className="relative pt-6 pb-20 md:pt-8 md:pb-24 px-6 bg-site-gradient overflow-hidden" 
      data-testid="section-solution"
    >
      {/* Decorative premium background grid mesh pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `radial-gradient(#00C9E4 1px, transparent 1px)`,
          backgroundSize: '36px 36px'
        }}
      />
      
      {/* Soft luxurious background radial blobs */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[#00C9E4]/5 to-[#0067B1]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-gradient-to-br from-[#00E5FF]/4 to-[#0082E6]/4 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* Centered Title Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#0067B1]" />
            <span className="text-[10px] font-extrabold tracking-[0.2em] text-[#0067B1] uppercase">
              The Future of Aquaculture
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight pb-2"
            style={{ 
              background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}
          >
            Our Solution
          </motion.h2>
        </div>

        {/* Split Grid Layout */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-start w-full">
          
          {/* LEFT COLUMN: Triple-Stacked Overlapping Images (50% width) */}
          <div className="lg:w-1/2 w-full relative h-[780px] flex items-center justify-center">
            
            {/* Base Image Wrapper: Slides in from LEFT */}
            <motion.div 
              initial={{ opacity: 0, x: -120 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.0, ease: "easeOut" }}
              className="absolute left-2 top-0 w-[90%] h-[360px] z-0"
            >
              {/* Inner Parallax Child */}
              <motion.div 
                style={{ y: farmY, x: farmX }}
                whileHover={{ scale: 1.02, zIndex: 5 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full rounded-2xl overflow-hidden shadow-xl border border-slate-100 cursor-pointer"
              >
                <img 
                  src="/attached_assets/shrimpfarm.png" 
                  alt="Shrimp farm operations" 
                  className="w-full h-full object-cover animate-smooth-layout"
                />
              </motion.div>
            </motion.div>

            {/* Overlapping Image Wrapper: Slides in from RIGHT */}
            <motion.div 
              initial={{ opacity: 0, x: 120 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.0, ease: "easeOut", delay: 0.2 }}
              className="absolute right-2 top-[240px] w-[70%] h-[280px] z-10"
            >
              {/* Inner Parallax Child */}
              <motion.div 
                style={{ y: sol2Y }}
                whileHover={{ scale: 1.03, zIndex: 15 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border-2 border-white cursor-pointer"
              >
                <img 
                  src="/attached_assets/sol2.jpg" 
                  alt="Mobile aquaculture dashboard" 
                  className="w-full h-full object-cover animate-smooth-layout"
                />
              </motion.div>
            </motion.div>

            {/* Bottom-Left Overlay Image Wrapper: Slides in from LEFT (matching shrimpfarm) */}
            <motion.div 
              initial={{ opacity: 0, x: -120 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.0, ease: "easeOut", delay: 0.35 }}
              className="absolute left-2 top-[500px] w-[76%] h-[250px] z-20"
            >
              {/* Inner Parallax Child (linked to farm scroll parameters) */}
              <motion.div 
                style={{ y: farmY, x: farmX }}
                whileHover={{ scale: 1.02, zIndex: 25 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border-2 border-white cursor-pointer"
              >
                <img 
                  src="/attached_assets/sol1.jpg" 
                  alt="Integrated IoT node sensors" 
                  className="w-full h-full object-cover animate-smooth-layout"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Solution Info and Morphing Card (50% width) - matches left height */}
          <div className="lg:w-1/2 w-full flex flex-col items-stretch justify-stretch h-[780px]">
            
            {/* Scroll-Linked Blooming Box - expands to full height */}
            <motion.div
              style={{
                scale,
                opacity,
                borderRadius,
              }}
              className="relative w-full h-full p-8 md:p-12 bg-gradient-to-br from-[#00C9E4] to-[#0067B1] text-white shadow-[0_24px_60px_rgba(0,103,177,0.2)] overflow-hidden flex flex-col justify-center"
            >
              {/* Subtle geometric line patterns inside the box */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-white/20 rounded-tl-lg" />
              <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-white/20 rounded-tr-lg" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-white/20 rounded-bl-lg" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-white/20 rounded-tr-lg" />

              {/* Solution Content Layout - Spaced elegantly */}
              <div className="relative z-10 space-y-6 md:space-y-8 text-white/90 leading-relaxed text-base md:text-lg font-medium">
                
                {/* Paragraph 1 */}
                <p className="space-y-2 md:space-y-3">
                  <motion.span style={{ opacity: s1Opacity, y: s1Y }} className="inline-block mr-1">
                    UpCheck is an integrated precision aquaculture platform designed to help shrimp farmers manage their entire operation intelligently and efficiently.
                  </motion.span>
                  <motion.span style={{ opacity: s2Opacity, y: s2Y }} className="inline-block mr-1">
                    At its core is a solar-powered floating IoT device that continuously monitors critical pond parameters such as pH, dissolved oxygen, temperature, humidity, and rainfall, providing real-time insights through a simple mobile application.
                  </motion.span>
                </p>

                {/* Paragraph 2 */}
                <p className="space-y-2 md:space-y-3">
                  <motion.span style={{ opacity: s3Opacity, y: s3Y }} className="inline-block mr-1">
                    By combining live pond data with AI-driven analytics, UpCheck generates personalized feeding schedules, enables early detection of unfavorable conditions, and supports healthier shrimp growth with reduced chemical usage.
                  </motion.span>
                  <motion.span style={{ opacity: s4Opacity, y: s4Y }} className="inline-block mr-1">
                    By bringing all farm activities into a single ecosystem, UpCheck transforms traditional, guesswork-based shrimp farming into a data-driven, sustainable, and profitable operation.
                  </motion.span>
                </p>
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
