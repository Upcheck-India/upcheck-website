import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

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

  // Map smooth progress to container morphing states
  const scale = useTransform(smoothProgress, [0.05, 0.30], [0.92, 1]);
  const opacity = useTransform(smoothProgress, [0.05, 0.22], [0.3, 1]);
  const borderRadius = useTransform(smoothProgress, [0.05, 0.30], ["16px", "28px"]);

  // Parallax offsets for the 3 images
  const farmY = useTransform(smoothProgress, [0, 1], [-10, 10]);
  const farmX = useTransform(smoothProgress, [0, 1], [-6, 6]);

  const sol2Y = useTransform(smoothProgress, [0, 1], [0, 0]);

  const sol1Y = useTransform(smoothProgress, [0, 1], [15, -15]);
  const sol1X = useTransform(smoothProgress, [0, 1], [10, -10]);

  return (
    <section 
      ref={sectionRef} 
      className="relative pt-14 pb-12 md:pt-20 md:pb-16 px-6 bg-site-gradient overflow-hidden" 
      data-testid="section-solution"
    >
      {/* Decorative premium background grid mesh pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `radial-gradient(#00C9E4 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />
      
      {/* Soft luxurious background radial blobs */}
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-gradient-to-br from-[#00C9E4]/6 to-[#0067B1]/6 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-gradient-to-br from-[#00E5FF]/5 to-[#0082E6]/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* Centered Title Section */}
        <div className="text-center mb-5 md:mb-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-2.5 shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#0067B1]" />
            <span className="text-[10px] font-extrabold tracking-[0.2em] text-[#0067B1] uppercase">
              The Future of Aquaculture
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-3xl md:text-4xl lg:text-[42px] font-extrabold tracking-tight pb-1"
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

        {/* Split Grid Layout (Proportioned to fit neatly in viewport) */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-stretch w-full max-w-5xl mx-auto">
          
          {/* LEFT COLUMN: Triple-Stacked Overlapping Clean Images */}
          <div className="lg:w-1/2 w-full relative h-[480px] sm:h-[530px] md:h-[560px] flex items-center justify-center">
            
            {/* Base Image: Shrimp Farm Aerial View */}
            <motion.div 
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute left-0 top-0 w-[88%] h-[250px] sm:h-[280px] z-0"
            >
              <motion.div 
                style={{ y: farmY, x: farmX }}
                whileHover={{ scale: 1.02, zIndex: 5 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full rounded-2xl overflow-hidden shadow-lg border border-slate-100 cursor-pointer relative group"
              >
                <img 
                  src="/attached_assets/shrimpfarm.png" 
                  alt="Shrimp farm operations" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
            </motion.div>

            {/* Overlapping Middle Image: Farmer Harvest */}
            <motion.div 
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
              className="absolute right-0 top-[155px] sm:top-[175px] w-[66%] h-[200px] sm:h-[220px] z-10"
            >
              <motion.div 
                style={{ y: sol2Y }}
                whileHover={{ scale: 1.03, zIndex: 15 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border-2 border-white cursor-pointer relative group"
              >
                <img 
                  src="/attached_assets/sol2.jpg" 
                  alt="Farmer shrimp harvest" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
            </motion.div>

            {/* Bottom Overlay Image: Precision Shrimp Health */}
            <motion.div 
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.25 }}
              className="absolute left-2 bottom-0 w-[72%] h-[180px] sm:h-[195px] z-20"
            >
              <motion.div 
                style={{ y: sol1Y, x: sol1X }}
                whileHover={{ scale: 1.02, zIndex: 25 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border-2 border-white cursor-pointer relative group"
              >
                <img 
                  src="/attached_assets/sol1.jpg" 
                  alt="Healthy shrimp aquaculture" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Clean, Full Solution Card (No Blank Spaces, No Indicator Badges) */}
          <div className="lg:w-1/2 w-full flex flex-col items-stretch justify-stretch">
            <motion.div
              style={{
                scale,
                opacity,
                borderRadius,
              }}
              className="relative w-full h-full p-6 sm:p-7 md:p-8 bg-gradient-to-br from-[#00C9E4] to-[#0067B1] text-white shadow-[0_20px_50px_rgba(0,103,177,0.22)] overflow-hidden flex flex-col justify-between space-y-4"
            >
              {/* Subtle geometric line patterns inside the box */}
              <div className="absolute top-4 left-4 w-5 h-5 border-t border-l border-white/30 rounded-tl-lg pointer-events-none" />
              <div className="absolute top-4 right-4 w-5 h-5 border-t border-r border-white/30 rounded-tr-lg pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-5 h-5 border-b border-l border-white/30 rounded-bl-lg pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-5 h-5 border-b border-r border-white/30 rounded-tr-lg pointer-events-none" />

              {/* Ambient inner soft glow */}
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />

              {/* TOP HEADER OF CARD */}
              <div className="relative z-10 text-left">
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
                  Smart IoT Sensing & AI Farm Intelligence
                </h3>
              </div>

              {/* MIDDLE BODY CONTENT (Rich Structured Narrative Filling the Card) */}
              <div className="relative z-10 space-y-3.5 text-white/95 text-xs sm:text-sm leading-relaxed text-left font-medium">
                <p>
                  <strong className="text-white font-bold">UpCheck</strong> is an integrated precision aquaculture platform designed to help shrimp farmers manage their entire operation intelligently, sustainably, and profitably.
                </p>

                <p>
                  At its core is a solar-powered floating IoT device that continuously monitors critical pond parameters such as <span className="text-white font-semibold">pH, dissolved oxygen, temperature, humidity, and rainfall</span>, providing instant real-time insights through a simple mobile application.
                </p>

                <p>
                  By combining live pond data with AI-driven analytics, UpCheck generates personalized feeding schedules, enables early detection of unfavorable conditions, and supports healthier shrimp growth with reduced chemical usage.
                </p>

                <p>
                  By bringing all farm activities into a single ecosystem, UpCheck transforms traditional, guesswork-based shrimp farming into a data-driven, sustainable, and profitable operation.
                </p>
              </div>

              {/* BOTTOM ACTION ROW */}
              <div className="relative z-10 pt-2 border-t border-white/15 flex items-center justify-between text-left">
                <span className="text-[11px] text-white/80 font-medium">
                  Autonomous Sensing • AI Analytics
                </span>

                <Link href="/products">
                  <Button 
                    size="sm" 
                    className="bg-white hover:bg-slate-50 text-[#0067B1] font-bold px-4 py-2 rounded-xl text-xs gap-1.5 shadow-md hover:scale-105 active:scale-95 transition-all border-none"
                  >
                    <span>Explore Platform</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>

            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
