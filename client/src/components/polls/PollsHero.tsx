import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Users, ChevronDown } from "lucide-react";

export default function PollsHero() {
  const scrollToPolls = () => {
    const el = document.getElementById("featured-poll");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Scroll tracking for parallax background effects
  const { scrollY } = useScroll();

  // Subtle depth parallax shifts relative to viewport scroll height
  const parallaxBlobsY1 = useTransform(scrollY, [0, 800], [0, 100]);
  const parallaxBlobsY2 = useTransform(scrollY, [0, 800], [0, -80]);
  const parallaxRipplesY = useTransform(scrollY, [0, 800], [0, 50]);
  const parallaxWavesY = useTransform(scrollY, [0, 800], [0, 25]);
  const backgroundY = useTransform(scrollY, [0, 800], ["0%", "15%"]);


  return (
    <motion.section
      className="text-foreground relative min-h-[80vh] md:min-h-[90vh] py-24 flex items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #def3ffff 0%, #d1f2ffff 50%, #def3ffff 100%)",
        backgroundSize: "100% 120%",
        backgroundPositionY: backgroundY
      }}
    >
      
      {/* 1. Soft radial glows behind the heading */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-gradient-to-r from-[#00C9E4]/4 to-[#0067B1]/3 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* 2. Low-opacity blurred cyan/blue gradient blobs with parallax shifts */}
      <motion.div
        style={{ y: parallaxBlobsY1 }}
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.05, 0.95, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/4 w-[280px] h-[280px] bg-[#00C9E4]/4 rounded-full blur-[90px] pointer-events-none z-0"
      />
      <motion.div
        style={{ y: parallaxBlobsY2 }}
        animate={{
          x: [0, -25, 25, 0],
          y: [0, 35, -35, 0],
          scale: [1, 0.95, 1.05, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/4 right-1/4 w-[320px] h-[320px] bg-[#90E0EF]/5 rounded-full blur-[100px] pointer-events-none z-0"
      />

      {/* 3. Faint concentric water ripple circles behind heading (subtle parallax) */}
      <motion.div 
        style={{ y: parallaxRipplesY }}
        className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-[0.02] select-none"
      >
        <svg viewBox="0 0 800 800" className="w-[100%] h-[100%] text-[#0067B1]" fill="none" stroke="currentColor" strokeWidth="0.8">
          <circle cx="400" cy="400" r="140" strokeDasharray="3 3" />
          <circle cx="400" cy="400" r="240" />
          <circle cx="400" cy="400" r="340" strokeDasharray="6 4" />
          <circle cx="400" cy="400" r="440" />
        </svg>
      </motion.div>

      {/* 4. Overlapping tall layered wave transitions near the bottom (with parallax offset) */}
      <motion.div 
        style={{ y: parallaxWavesY }}
        className="absolute bottom-0 left-0 right-0 z-0 pointer-events-none overflow-hidden h-[180px] md:h-[260px]"
      >
        <svg
          className="absolute bottom-0 w-[200%] h-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          style={{ transform: "translateX(-25%)" }}
        >
          <defs>
            <linearGradient id="wave-blue-1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00C9E4" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#0067B1" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="wave-blue-2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#90E0EF" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#0077B6" stopOpacity="0.08" />
            </linearGradient>
            <linearGradient id="wave-blue-3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00C9E4" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#a7e1faff" stopOpacity="0.65" />
            </linearGradient>
          </defs>
          {/* Wave 1: Soft Translucent Cyan-Blue */}
          <motion.path
            animate={{ x: [-40, 40, -40] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            d="M0,35 C150,65 300,5 450,35 C600,65 750,5 900,35 C1050,65 1200,5 1350,35 L1350,120 L0,120 Z"
            fill="url(#wave-blue-1)"
          />
          {/* Wave 2: Soft Sky Blue overlay */}
          <motion.path
            animate={{ x: [30, -30, 30] }}
            transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
            d="M0,50 C150,20 300,80 450,50 C600,20 750,80 900,50 C1050,20 1200,80 1350,50 L1350,120 L0,120 Z"
            fill="url(#wave-blue-2)"
          />
          {/* Wave 3: Soft Cyan/Bottom gradient blend */}
          <motion.path
            animate={{ x: [-20, 20, -20] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            d="M0,65 C100,50 200,80 300,65 C400,50 500,80 600,65 C700,50 800,80 900,65 L900,120 L0,120 Z"
            fill="url(#wave-blue-3)"
          />
        </svg>
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-20 container mx-auto px-6 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-sm font-semibold mb-8 backdrop-blur-md animate-pulse"
        >
          <Users className="w-4 h-4 text-[#00B4D8]" />
          <span>Interactive Farmer Community</span>
        </motion.div>

        {/* Heading Title with slow blur-to-clear reveal */}
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.0, ease: "easeOut", delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight pb-3"
          style={{
            background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            paddingBottom: "0.15em",
          }}
          data-testid="text-polls-headline"
        >
          Help Shape the Future of Aquaculture
        </motion.h1>

        {/* Subtitle with fade-up and blur animation */}
        <motion.p
          initial={{ opacity: 0, y: 15, filter: "blur(5px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
          data-testid="text-polls-subtext"
        >
          Shaping the future of sustainable aquaculture. Share your experience, participate in active community debates, and explore real-time regional trends.
        </motion.p>

        {/* CTA Button with slight slide-up animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
          className="flex justify-center"
        >
          <motion.div
            whileHover={{
              y: -3,
              scale: 1.02,
              boxShadow: "0 10px 20px -5px rgba(0, 103, 177, 0.2), 0 5px 10px -5px rgba(0, 199, 228, 0.15)",
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <Button
              size="lg"
              onClick={scrollToPolls}
              className="gap-2 relative overflow-hidden font-semibold px-8"
              data-testid="button-explore-polls"
              style={{
                background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)",
                border: "none",
              }}
            >
              Start Voting
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Seamless transition overlay fading from transparent to the white background of the next section */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#ffffff] z-10 pointer-events-none" />
    </motion.section>
  );
}
