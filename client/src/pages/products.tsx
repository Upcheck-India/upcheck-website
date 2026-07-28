import { MouseEvent, useRef, useState, useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import CountUp from "react-countup";
import upcheckDeviceImg from "@assets/upcheck-iot-device.png";
import yellowDeviceImg from "@assets/upcheck-yellow-device.jpg";
import appScreenshotImg from "@assets/upcheck-app-screenshot.jpg";
import aquaculturePensImg from "@assets/aquaculture-pens.png";
import shrimpHarvestImg from "@assets/shrimp-harvest.png";
import fishermanBoatImg from "@assets/fisherman-boat.jpg";
import diseaseShrimpImg from "@assets/disease-shrimp.jpg";
import platformAccuracyImg from "@assets/platform-accuracy.png";
import liveAnalyticsSeaImg from "@assets/live-analytics-sea.png";
import aiFeedingSeaweedImg from "@assets/ai-feeding-seaweed.jpg";
import traceabilityPlaceholderImg from "@assets/traceability-placeholder.png";
import {
  Activity,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ShieldAlert,
  Sparkles,
  Target,
  TrendingUp,
  Waves,
} from "lucide-react";

const detailedSections = [
  {
    name: "Pond Monitoring System",
    icon: Waves,
    description:
      "Upcheck’s monitoring layer keeps critical pond data visible throughout the day so farmers can act before small changes become costly problems.",
    points: [
      "24/7 monitoring view with live status updates",
      "Alert-first design for quick operational response",
      "Built to match the existing Upcheck visual system",
    ],
  },
  {
    name: "Smart Feeding Assistant",
    icon: Target,
    description:
      "The feeding assistant turns farm context into clear guidance, helping teams keep feeding efficient and predictable.",
    points: [
      "Practical recommendations for routine feeding",
      "Designed to lower waste without adding complexity",
      "Fits naturally into the existing app workflow",
    ],
  },
  {
    name: "Farm Analytics Dashboard",
    icon: BarChart3,
    description:
      "The analytics dashboard gives owners and operators a single place to review performance and understand what is changing across the farm.",
    points: [
      "Simple charts and summary cards for fast review",
      "Supports operational planning and reporting",
      "Uses the same card and spacing language as the rest of the site",
    ],
  },
  {
    name: "Disease & Risk Alert System",
    icon: ShieldAlert,
    description:
      "Risk alerts help teams detect unusual patterns early, improving response time and reducing the chance of larger losses.",
    points: [
      "Early indicators based on environmental changes",
      "Clear escalation path for farm teams",
      "Keeps the interface aligned with Upcheck’s current design",
    ],
  },
];

const reasons = [
  {
    title: "Built on the same product language",
    description:
      "The page reuses the same gradient, cards, spacing, and motion style already present in Upcheck.",
    icon: Sparkles,
  },
  {
    title: "Designed for aquaculture operators",
    description:
      "Each section speaks to practical farm workflows: monitoring, feeding, analysis, and risk alerts.",
    icon: Activity,
  },
  {
    title: "Clear next-step actions",
    description:
      "The page ends with the same call-to-action style used elsewhere in the site, keeping the experience consistent.",
    icon: TrendingUp,
  },
];

// Magnetic Button Wrapper
interface MagneticWrapperProps {
  children: React.ReactNode;
}

function MagneticWrapper({ children }: MagneticWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    const maxDistance = 75;
    const distance = Math.hypot(distanceX, distanceY);

    if (distance < maxDistance) {
      const strength = 0.22;
      setPosition({ x: distanceX * strength, y: distanceY * strength });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

// Premium Cursor-Tracking Spotlight Card
interface PremiumCardProps {
  children: React.ReactNode;
  className?: string;
  reversed?: boolean;
}

function PremiumCard({ children, className = "", reversed = false }: PremiumCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const borderBackground = useMotionTemplate`
    radial-gradient(
      160px circle at ${mouseX}px ${mouseY}px,
      rgba(0, 201, 228, 0.4),
      transparent 80%
    )
  `;

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Auto-remove default card padding if custom padding is supplied
  const hasPadding = className.split(" ").some(c => c.startsWith("p-") || c.startsWith("px-") || c.startsWith("py-"));
  const paddingClass = hasPadding ? "" : "p-8 md:p-10";

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`group relative rounded-[24px] border border-border/30 bg-white/40 dark:bg-black/10 backdrop-blur-md h-full flex flex-col justify-center shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 ease-out overflow-hidden ${paddingClass} ${reversed ? "lg:[direction:ltr]" : ""} ${className}`}
    >

      {/* Glowing spotlight border highlighting */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{
          background: borderBackground,
          padding: "1px",
          WebkitMaskImage: "linear-gradient(#fff, #fff)",
          WebkitMaskComposite: "xor",
          maskImage: "linear-gradient(#fff, #fff)",
          maskComposite: "exclude",
        }}
      />
      
      <div className="relative z-10 w-full h-full flex flex-col justify-center">{children}</div>
    </div>
  );
}

// Hero Motion Animation Variants
const heroContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const heroItemVariants = {
  hidden: { opacity: 0, y: 25, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

// Procedural floating bubble configurations
const bubbleConfigs = [
  { size: 28, left: 8, duration: 14, delay: 0 },
  { size: 16, left: 18, duration: 10, delay: 3 },
  { size: 34, left: 28, duration: 18, delay: 1 },
  { size: 20, left: 45, duration: 12, delay: 5 },
  { size: 24, left: 62, duration: 15, delay: 2 },
  { size: 14, left: 74, duration: 9, delay: 4 },
  { size: 30, left: 85, duration: 16, delay: 1.5 },
  { size: 18, left: 93, duration: 11, delay: 6 },
];


export default function Products() {
  return (
    <div className="min-h-screen bg-site-gradient relative overflow-hidden">
      <Navigation />

      {/* Embedded CSS animations for border-beam card tracking */}
      <style>{`
        @keyframes border-beam {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-border-beam {
          animation: border-beam 6s linear infinite;
        }
      `}</style>

      {/* Decorative ambient background overlays */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Fine-grained dotted pattern grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#00c9e40c_1.5px,transparent_1.5px)] [background-size:32px_32px] opacity-90" />
        
        {/* Wavy background lines representing water currents */}
        <svg className="absolute top-[20%] left-0 w-full h-[600px] opacity-10 pointer-events-none stroke-[#00C9E4]" fill="none">
          <motion.path
            d="M-100,150 C150,250 350,50 600,150 C850,250 1050,50 1300,150 C1550,250 1750,50 2000,150"
            strokeWidth="1.5"
            animate={{
              d: [
                "M-100,150 C150,250 350,50 600,150 C850,250 1050,50 1300,150 C1550,250 1750,50 2000,150",
                "M-100,170 C150,230 350,70 600,170 C850,230 1050,70 1300,170 C1550,230 1750,70 2000,170",
                "M-100,150 C150,250 350,50 600,150 C850,250 1050,50 1300,150 C1550,250 1750,50 2000,150",
              ]
            }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>

        {/* Floating background bubble particles */}
        {bubbleConfigs.map((bubble, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-white/20 dark:border-white/5 bg-gradient-to-tr from-[#00C9E4]/10 to-transparent pointer-events-none"
            style={{
              width: bubble.size,
              height: bubble.size,
              left: `${bubble.left}%`,
              bottom: "-10%",
            }}
            animate={{
              y: ["0vh", "-120vh"],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0, 0.45, 0.45, 0],
            }}
            transition={{
              duration: bubble.duration,
              delay: bubble.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
        
        {/* Floating gradient mesh blur circles */}
        <motion.div
          className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-gradient-to-br from-[#00C9E4]/10 to-transparent blur-[80px]"
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.05, 0.95, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-[35%] -right-[5%] w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] rounded-full bg-gradient-to-br from-[#0067B1]/8 to-transparent blur-[100px]"
          animate={{
            x: [0, -40, 20, 0],
            y: [0, 30, -30, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-[10%] left-[15%] w-[40vw] h-[40vw] max-w-[450px] max-h-[450px] rounded-full bg-gradient-to-br from-[#90E0EF]/12 to-transparent blur-[90px]"
          animate={{
            x: [0, 20, -30, 0],
            y: [0, 40, -20, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <main className="relative z-10 pt-36 pb-24 px-6">
        <div className="container mx-auto space-y-28">
          
          {/* Hero Section Banner */}
          <motion.section
            variants={heroContainerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-7xl mx-auto w-full"
          >
            {/* Outer Blue Banner stretching wide with rounded corners */}
            <div className="bg-gradient-to-r from-[#00C9E4] to-[#0067B1] rounded-[32px] p-6 md:p-12 shadow-2xl relative overflow-hidden group">
              {/* Subtle background overlay patterns */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.15),_transparent_60%)] pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:20px_20px] opacity-70" />
              
              {/* Inner White Card containing title and details */}
              <div className="bg-white rounded-[24px] shadow-lg p-10 md:p-20 text-center max-w-5xl mx-auto relative z-10 border border-[#0077B6]/10">
                <motion.h1
                  variants={heroItemVariants}
                  className="text-4xl md:text-6xl font-bold mb-8 tracking-tight leading-tight"
                  style={{ 
                    background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  }}
                >
                  Everything you need to run a smarter farm
                </motion.h1>
                
                <motion.p
                  variants={heroItemVariants}
                  className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium"
                >
                  Upcheck brings monitoring, feeding, analytics, and risk alerts together in one connected experience built for aquaculture teams.
                </motion.p>
              </div>
            </div>
          </motion.section>

          {/* Our Products Section */}
          <section className="space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-[#00C9E4] to-[#0067B1] bg-clip-text text-transparent">
                Our Products
              </h2>
            </motion.div>

            <div className="space-y-12">
              {/* Section 1: IoT monitoring device */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <PremiumCard className="p-8 md:p-12">
                  <div className="grid lg:grid-cols-12 gap-8 items-center">
                    {/* Left Column: Image of the Yellow IoT Device with radar signal animation */}
                    <motion.div 
                      className="lg:col-span-6 flex items-center justify-center relative min-h-[380px]"
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                      {/* Pulsing signal rings representing IoT live data broadcasts */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                        <motion.div 
                          className="absolute w-52 h-52 rounded-full border-2 border-[#00C9E4]/25"
                          animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
                        />
                        <motion.div 
                          className="absolute w-52 h-52 rounded-full border border-[#0067B1]/15"
                          animate={{ scale: [1, 2.3], opacity: [0.4, 0] }}
                          transition={{ duration: 4, delay: 2, repeat: Infinity, ease: "easeOut" }}
                        />
                      </div>
                      
                      <div className="absolute w-72 h-72 rounded-full bg-gradient-to-br from-[#00C9E4]/12 to-[#0067B1]/5 blur-[60px] pointer-events-none" />
                      <motion.img
                        src={yellowDeviceImg}
                        alt="IoT monitoring device"
                        className="max-h-[360px] w-auto object-contain relative z-10 drop-shadow-2xl rounded-2xl border border-border/20 shadow-lg"
                        animate={{
                          y: [0, -12, 0],
                        }}
                        transition={{
                          duration: 6,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        whileHover={{ scale: 1.04 }}
                      />
                    </motion.div>
                    {/* Right Column: Title and Content */}
                    <motion.div 
                      className="lg:col-span-6 space-y-6 text-left"
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                      <Badge className="bg-cyan-500/10 text-cyan-600 border border-cyan-500/20 px-3 py-1 text-xs font-semibold rounded-full shadow-sm">
                        Hardware
                      </Badge>
                      <h3 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-[#00C9E4] to-[#0067B1] bg-clip-text text-transparent">
                        IoT monitoring device
                      </h3>
                      <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-medium">
                        UpCheck is a solar-powered, floating IoT monitoring device that sits directly in the shrimp pond,
                        continuously tracking the water quality parameters that matter most to shrimp health — pH, dissolved
                        oxygen, temperature, humidity, and rainfall — and streaming that data to a simple mobile dashboard in real
                        time.
                      </p>
                    </motion.div>
                  </div>
                </PremiumCard>
              </motion.div>

              {/* Section 2: UpCheck Mobile Application */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <PremiumCard className="p-8 md:p-12" reversed={true}>
                  <div className="grid lg:grid-cols-12 gap-8 items-center lg:[direction:rtl]">
                    {/* Left Column (App Screenshot) with floating bubbles - visually on the RIGHT */}
                    <motion.div 
                      className="lg:col-span-6 flex items-center justify-center relative lg:[direction:ltr] min-h-[400px]"
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                      {/* Rising data bubble animations behind the app screen */}
                      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                        <motion.div 
                          className="absolute w-4 h-4 rounded-full bg-cyan-400/20 blur-[1px]"
                          style={{ left: "25%", top: "80%" }}
                          animate={{ y: [0, -140], opacity: [0, 0.8, 0], scale: [1, 1.6] }}
                          transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div 
                          className="absolute w-3 h-3 rounded-full bg-blue-500/25 blur-[1px]"
                          style={{ left: "75%", top: "70%" }}
                          animate={{ y: [0, -160], opacity: [0, 0.7, 0], scale: [1, 1.4] }}
                          transition={{ duration: 4.2, delay: 1.4, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div 
                          className="absolute w-5 h-5 rounded-full bg-[#00C9E4]/15 blur-[2px]"
                          style={{ left: "45%", top: "90%" }}
                          animate={{ y: [0, -180], opacity: [0, 0.6, 0], scale: [0.8, 1.7] }}
                          transition={{ duration: 5.5, delay: 0.7, repeat: Infinity, ease: "easeInOut" }}
                        />
                      </div>
                      
                      <div className="absolute w-72 h-72 rounded-full bg-gradient-to-br from-[#00C9E4]/12 to-[#0067B1]/5 blur-[60px] pointer-events-none" />
                      <motion.img
                        src={appScreenshotImg}
                        alt="UpCheck Mobile Application"
                        className="max-h-[380px] w-auto object-contain relative z-10 drop-shadow-2xl rounded-3xl border border-border/20 shadow-lg"
                        animate={{
                          y: [-10, 10, -10],
                        }}
                        transition={{
                          duration: 5.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        whileHover={{ scale: 1.04 }}
                      />
                    </motion.div>
                    {/* Right Column: Title and Content - visually on the LEFT */}
                    <motion.div 
                      className="lg:col-span-6 space-y-6 text-left lg:[direction:ltr]"
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                      <Badge className="bg-blue-500/10 text-blue-600 border border-blue-500/20 px-3 py-1 text-xs font-semibold rounded-full shadow-sm">
                        Software
                      </Badge>
                      <h3 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-[#00C9E4] to-[#0067B1] bg-clip-text text-transparent">
                        UpCheck Mobile Application
                      </h3>
                      <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-medium">
                        Monitor your shrimp ponds anytime, anywhere with the UpCheck mobile application. Connected directly to your floating IoT device, the app delivers real-time pond insights, AI-powered recommendations, and complete farm management tools—all from a single dashboard.
                      </p>
                    </motion.div>
                  </div>
                </PremiumCard>
              </motion.div>

              {/* Section 3: Transforming Every Pond into Actionable Insights */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <PremiumCard className="p-8 md:p-12">
                  <div className="grid lg:grid-cols-12 gap-8 items-center">
                    {/* Left Column: Interactive Tracking Graph */}
                    <motion.div 
                      className="lg:col-span-6 flex items-center justify-center relative"
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,201,228,0.14),_transparent_70%)] opacity-100 pointer-events-none" />
                      <div className="w-full rounded-3xl border border-border/40 bg-white/40 dark:bg-black/25 p-6 relative overflow-hidden shadow-lg backdrop-blur-md">
                        <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_top_right,_rgba(0,201,228,0.16),_transparent_40%)] pointer-events-none" />
                        <div className="relative space-y-4">
                          <div className="flex items-center justify-between border-b border-border/10 pb-2">
                            <div>
                              <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">Intelligence</p>
                              <h4 className="text-sm font-bold tracking-tight">Transforming Every Pond</h4>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 bg-white/60 dark:bg-black/20 rounded-2xl border border-border/30 shadow-xs">
                              <p className="text-[10px] text-muted-foreground font-semibold">Dissolved Oxygen</p>
                              <p className="text-lg font-bold text-[#00C9E4]">7.4 mg/L</p>
                              <div className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full mt-2 overflow-hidden">
                                <motion.div 
                                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" 
                                  initial={{ width: 0 }}
                                  whileInView={{ width: '85%' }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 1.2, ease: "easeOut" }}
                                />
                              </div>
                            </div>
                            <div className="p-3 bg-white/60 dark:bg-black/20 rounded-2xl border border-border/30 shadow-xs">
                              <p className="text-[10px] text-muted-foreground font-semibold">pH Level</p>
                              <p className="text-lg font-bold text-[#0067B1]">8.2 pH</p>
                              <div className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full mt-2 overflow-hidden">
                                <motion.div 
                                  className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full" 
                                  initial={{ width: 0 }}
                                  whileInView={{ width: '90%' }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 1.2, ease: "easeOut" }}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="text-[10px] font-semibold text-muted-foreground pb-0.5">
                              Critical Pond Health Analytics
                            </div>
                            <div className="p-3 bg-background/60 rounded-2xl border border-border/40 h-24 relative overflow-hidden flex flex-col justify-end">
                              <svg className="w-full h-full overflow-visible" viewBox="0 0 100 30" preserveAspectRatio="none">
                                <defs>
                                  <linearGradient id="pondChartGradientSection3" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0%" stopColor="#00C9E4" />
                                    <stop offset="100%" stopColor="#0067B1" />
                                  </linearGradient>
                                  <linearGradient id="pondAreaGradientSection3" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#00C9E4" stopOpacity="0.2" />
                                    <stop offset="100%" stopColor="#00C9E4" stopOpacity="0" />
                                  </linearGradient>
                                </defs>
                                <path
                                  d="M0,30 L0,15 C20,25 40,5 60,18 C80,2 90,15 100,8 L100,30 Z"
                                  fill="url(#pondAreaGradientSection3)"
                                />
                                <motion.path
                                  d="M0,15 C20,25 40,5 60,18 C80,2 90,15 100,8"
                                  fill="none"
                                  stroke="url(#pondChartGradientSection3)"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  initial={{ pathLength: 0 }}
                                  whileInView={{ pathLength: 1 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 1.8, ease: "easeInOut" }}
                                />
                                <motion.circle 
                                  cx="60" 
                                  cy="18" 
                                  r="2" 
                                  fill="#00C9E4" 
                                  stroke="white" 
                                  strokeWidth="0.5" 
                                  animate={{ scale: [1, 1.5, 1] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                    {/* Right Column: Title and Content */}
                    <motion.div 
                      className="lg:col-span-6 space-y-6 text-left"
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                      <Badge className="bg-indigo-500/10 text-indigo-600 border border-indigo-500/20 px-3 py-1 text-xs font-semibold rounded-full shadow-sm">
                        Tracking
                      </Badge>
                      <h3 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-[#00C9E4] to-[#0067B1] bg-clip-text text-transparent">
                        Transforming Every Pond into Actionable Insights
                      </h3>
                      <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-medium">
                        UpCheck continuously collects and analyzes critical pond data through its solar-powered IoT device,
                        enabling farmers to monitor pond health, optimize operations, and make smarter decisions. Our
                        intelligent tracking system works silently in the background, providing real-time insights that improve
                        productivity and reduce farming risks.
                      </p>
                    </motion.div>
                  </div>
                </PremiumCard>
              </motion.div>
            </div>
          </section>

          {/* Why Choose Upcheck - Premium Light Masonry Showcase */}
          <section className="bg-[#F8FAFC] border border-slate-200/60 rounded-[32px] p-6 md:py-12 md:px-8 space-y-8 text-slate-800 shadow-sm relative overflow-hidden my-10">
            {/* Subtle light background patterns */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(0,103,177,0.03),_transparent_50%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:20px_20px] opacity-70" />
            
            <div className="relative z-10 space-y-8">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="text-center max-w-3xl mx-auto space-y-2 pb-2"
              >
                <span className="text-xs font-bold tracking-[0.2em] text-[#0067B1] uppercase">Smart Technology. Smarter Shrimp Farming.</span>
                <h3 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                  Why Choose Upcheck?
                </h3>
                <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto font-medium leading-relaxed">
                  Discover how UpCheck transforms every pond into a connected, intelligent aquaculture ecosystem.
                </p>
              </motion.div>

              {/* Asymmetrical Masonry Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                
                {/* Card 1: Disease Prevention */}
                <motion.div
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.65, ease: "easeOut", delay: 0 }}
                  whileHover="hover"
                  className="relative rounded-[20px] overflow-hidden group shadow-sm hover:shadow-md border border-slate-200/60 h-[200px] cursor-pointer"
                >
                  <motion.img
                    src={diseaseShrimpImg}
                    alt="Disease Prevention"
                    className="absolute inset-0 w-full h-full object-cover"
                    variants={{
                      initial: { scale: 1 },
                      hover: { scale: 1.05 }
                    }}
                    transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent z-10"
                    variants={{
                      initial: { opacity: 0.4 },
                      hover: { opacity: 0.65 }
                    }}
                    transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                  />
                  <div className="absolute inset-0 p-4 flex flex-col justify-end z-20 text-left">
                    <motion.div
                      variants={{
                        initial: { y: 10 },
                        hover: { y: 0 }
                      }}
                      transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                      className="space-y-1"
                    >
                      <span className="text-[#00C9E4] text-[10px] font-bold uppercase tracking-wider block mb-0.5">
                        Disease Prevention
                      </span>
                      <h4 className="text-white text-lg font-extrabold tracking-tight">
                        Detect early.
                      </h4>
                      <p className="text-white/90 text-xs font-medium">
                        Protect every harvest.
                      </p>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Card 2: Statistics Card (Platform Accuracy) */}
                <motion.div
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
                  whileHover="hover"
                  className="relative rounded-[20px] overflow-hidden group shadow-sm hover:shadow-md border border-slate-200/60 h-[200px] cursor-pointer"
                >
                  <motion.img
                    src={platformAccuracyImg}
                    alt="Platform Accuracy"
                    className="absolute inset-0 w-full h-full object-cover"
                    variants={{
                      initial: { scale: 1 },
                      hover: { scale: 1.05 }
                    }}
                    transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-[#0067B1]/90 via-[#00C9E4]/40 to-black/30 z-10"
                    variants={{
                      initial: { opacity: 0.7 },
                      hover: { opacity: 0.85 }
                    }}
                    transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                  />
                  <div className="absolute inset-0 p-5 flex flex-col justify-between z-20 text-left">
                    <div className="space-y-1">
                      <span className="text-white/80 text-[10px] font-bold uppercase tracking-wider block">
                        Platform Accuracy
                      </span>
                      <h4 className="text-white text-xs font-bold">
                        Continuous Monitoring
                      </h4>
                    </div>
                    
                    <div className="my-auto">
                      <span className="text-4xl md:text-5xl text-white font-black tracking-tighter flex items-baseline">
                        <CountUp end={99} duration={2.5} enableScrollSpy scrollSpyOnce />
                        <span className="text-white/80 text-2xl font-extrabold ml-0.5">%</span>
                      </span>
                    </div>
 
                    <div className="flex items-center justify-between text-[10px] text-white/75 border-t border-white/15 pt-3">
                      <span>Real-Time Sensor Precision</span>
                      <ArrowRight className="w-3.5 h-3.5 text-white group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
 
                {/* Card 3: Hero Card (Largest, spans 2 rows on desktop) */}
                <motion.div
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                  whileHover="hover"
                  className="relative rounded-[20px] overflow-hidden group shadow-sm hover:shadow-md border border-slate-200/60 h-[424px] cursor-pointer md:col-span-1 md:row-span-2"
                >
                  <motion.img
                    src={aquaculturePensImg}
                    alt="UpCheck Aquaculture Site"
                    className="absolute inset-0 w-full h-full object-cover"
                    variants={{
                      initial: { scale: 1 },
                      hover: { scale: 1.03 }
                    }}
                    transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 z-10" />
 
                  {/* Content at Bottom */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end z-20 text-left pointer-events-none">
                    <div className="space-y-1 max-w-[160px]">
                      <h4 className="text-white text-lg font-black tracking-tight leading-none uppercase">
                        Every Pond.<br/>Connected.<br/>Intelligent.
                      </h4>
                      <span className="text-[#00C9E4] text-[10px] font-bold uppercase tracking-wider block">
                        Complete Ecosystem
                      </span>
                    </div>
                  </div>
                </motion.div>
 
                {/* Card 4: Farmer Experience */}
                <motion.div
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
                  whileHover="hover"
                  className="relative rounded-[20px] overflow-hidden group shadow-sm hover:shadow-md border border-slate-200/60 h-[200px] cursor-pointer md:col-span-2"
                >
                  <motion.img
                    src={fishermanBoatImg}
                    alt="Farmer Experience"
                    className="absolute inset-0 w-full h-full object-cover"
                    variants={{
                      initial: { scale: 1 },
                      hover: { scale: 1.04 }
                    }}
                    transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent z-10"
                    variants={{
                      initial: { opacity: 0.4 },
                      hover: { opacity: 0.65 }
                    }}
                    transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                  />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end z-20 text-left">
                    <motion.div
                      variants={{
                        initial: { y: 10 },
                        hover: { y: 0 }
                      }}
                      transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                      className="space-y-1"
                    >
                      <span className="text-[#00C9E4] text-[10px] font-bold uppercase tracking-wider block mb-0.5">
                        Farmer Experience
                      </span>
                      <h4 className="text-white text-xl font-extrabold tracking-tight">
                        Manage Anywhere
                      </h4>
                      <p className="text-white/90 text-xs font-medium">
                        Monitor every pond from your phone.
                      </p>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Card 5: Circular Dashboard Chart Card (Live Analytics) */}
                <motion.div
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.65, ease: "easeOut", delay: 0 }}
                  whileHover="hover"
                  className="relative rounded-[20px] overflow-hidden group shadow-sm hover:shadow-md border border-slate-200/60 h-[200px] cursor-pointer"
                >
                  <motion.img
                    src={liveAnalyticsSeaImg}
                    alt="Live Analytics"
                    className="absolute inset-0 w-full h-full object-cover"
                    variants={{
                      initial: { scale: 1 },
                      hover: { scale: 1.05 }
                    }}
                    transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent z-10"
                    variants={{
                      initial: { opacity: 0.6 },
                      hover: { opacity: 0.8 }
                    }}
                    transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                  />
                  <div className="absolute inset-0 p-5 flex flex-col justify-between z-20 text-left">
                    <div className="space-y-0.5">
                      <span className="text-[#00C9E4] text-[10px] font-bold uppercase tracking-wider block">
                        Live Analytics
                      </span>
                      <h4 className="text-white text-xs font-bold">
                        Optimal Pond Health
                      </h4>
                    </div>
                    
                    {/* SVG Circular Ring Chart */}
                    <div className="flex items-center gap-4 my-auto">
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                          <path
                            className="text-[#00C9E4]/20"
                            strokeWidth="4"
                            stroke="currentColor"
                            fill="transparent"
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <motion.path
                            className="text-[#00C9E4]"
                            strokeWidth="4"
                            strokeDasharray="60, 100"
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="transparent"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-xs font-black text-white">
                          60%
                        </div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-base font-extrabold text-white leading-none block">60% vs 40%</span>
                        <p className="text-white/80 text-[10px] font-semibold leading-relaxed">
                          Optimal feeding parameters met
                        </p>
                      </div>
                    </div>

                    <div className="text-[10px] text-white/60 border-t border-white/10 pt-3">
                      Turn data into better decisions.
                    </div>
                  </div>
                </motion.div>

                {/* Card 6: AI Feeding */}
                <motion.div
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
                  whileHover="hover"
                  className="relative rounded-[20px] overflow-hidden group shadow-sm hover:shadow-md border border-slate-200/60 h-[200px] cursor-pointer"
                >
                  <motion.img
                    src={aiFeedingSeaweedImg}
                    alt="AI Feeding"
                    className="absolute inset-0 w-full h-full object-cover"
                    variants={{
                      initial: { scale: 1 },
                      hover: { scale: 1.05 }
                    }}
                    transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent z-10"
                    variants={{
                      initial: { opacity: 0.4 },
                      hover: { opacity: 0.65 }
                    }}
                    transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                  />
                  <div className="absolute inset-0 p-4 flex flex-col justify-end z-20 text-left">
                    <motion.div
                      variants={{
                        initial: { y: 10 },
                        hover: { y: 0 }
                      }}
                      transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                      className="space-y-1"
                    >
                      <span className="text-[#00C9E4] text-[10px] font-bold uppercase tracking-wider block mb-0.5">
                        AI Feeding
                      </span>
                      <h4 className="text-white text-lg font-extrabold tracking-tight">
                        Precision feeding.
                      </h4>
                      <p className="text-white/90 text-xs font-medium">
                        Zero guesswork.
                      </p>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Card 7: Better Harvest */}
                <motion.div
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.65, ease: "easeOut", delay: 0.2 }}
                  whileHover="hover"
                  className="relative rounded-[20px] overflow-hidden group shadow-sm hover:shadow-md border border-slate-200/60 h-[200px] cursor-pointer"
                >
                  <motion.img
                    src={shrimpHarvestImg}
                    alt="Harvest ROI"
                    className="absolute inset-0 w-full h-full object-cover"
                    variants={{
                      initial: { scale: 1 },
                      hover: { scale: 1.05 }
                    }}
                    transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent z-10"
                    variants={{
                      initial: { opacity: 0.4 },
                      hover: { opacity: 0.65 }
                    }}
                    transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                  />
                  <div className="absolute inset-0 p-4 flex flex-col justify-end z-20 text-left">
                    <motion.div
                      variants={{
                        initial: { y: 10 },
                        hover: { y: 0 }
                      }}
                      transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                      className="space-y-1"
                    >
                      <span className="text-[#00C9E4] text-[10px] font-bold uppercase tracking-wider block mb-0.5">
                        Higher Yield
                      </span>
                      <h4 className="text-white text-lg font-extrabold tracking-tight">
                        Lower Costs.
                      </h4>
                      <p className="text-white/90 text-xs font-medium">
                        Better Returns.
                      </p>
                    </motion.div>
                  </div>
                </motion.div>

              </div>
            </div>
          </section>

          {/* Standalone Traceability Solution Section */}
          <section className="my-12 md:my-16 max-w-4xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#F8FAFC] border border-slate-200/60 rounded-[32px] p-6 md:p-10 relative overflow-hidden shadow-sm text-left">
              {/* Background patterns */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(0,103,177,0.03),_transparent_50%)] pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:20px_20px] opacity-70 pointer-events-none" />

              {/* Left Column: Wording & Information */}
              <div className="relative z-10 space-y-4">
                <div>
                  <Badge className="bg-[#00C9E4]/15 text-[#0067B1] border border-[#00C9E4]/25 px-3.5 py-1 text-xs font-semibold rounded-full shadow-xs mb-3 inline-flex items-center gap-1.5 pointer-events-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0067B1] animate-pulse" />
                    Coming Soon
                  </Badge>
                  <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                    Traceability Solution
                  </h3>
                </div>

                <p className="text-slate-500 text-sm md:text-base font-medium leading-relaxed">
                  Track every harvest from pond to consumer. Verify origin, batch specifications, and quality logs at every link of your supply chain.
                </p>

                <div className="pt-2">
                  <button
                    className="p-0 h-auto font-bold text-[#0067B1] hover:text-[#005a9c] gap-1.5 inline-flex items-center group cursor-pointer border-none bg-transparent"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Right Column: Premium Placeholder Supply Chain Illustration */}
              <div className="relative z-10 rounded-2xl overflow-hidden border border-slate-200/60 bg-white p-2 shadow-xs group cursor-pointer">
                <img
                  src={traceabilityPlaceholderImg}
                  alt="Shrimp Traceability Supply Chain Concept"
                  className="w-full h-auto object-cover rounded-xl group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </div>
          </section>

          {/* Call to Action Banner */}
          <motion.section
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
          >
            <Card className="overflow-hidden border border-white/15 bg-gradient-to-r from-[#00C9E4] to-[#0067B1] shadow-2xl rounded-[24px] transition-all duration-500 hover:-translate-y-1.5 group relative text-white">
              {/* Vibrant lighting effect overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_65%)] opacity-80 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              {/* Particle stars overlay effect */}
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:20px_20px] opacity-70" />

              <CardContent className="p-8 md:p-16 text-center relative z-10">
                <div className="relative">
                  <Badge className="mb-6 bg-white/10 text-white border border-white/20 backdrop-blur-md px-4 py-1.5 text-xs font-semibold rounded-full group-hover:scale-105 transition-transform duration-300 shadow-sm">
                    Ready to get started?
                  </Badge>
                  <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight leading-tight text-white">
                    Bring the full Upcheck system to your farm
                  </h2>
                  <p className="text-white/80 max-w-2xl mx-auto mb-8 text-base md:text-lg leading-relaxed font-medium">
                    See how monitoring, feeding, analytics, and alerts can work together in one connected platform.
                  </p>
                  
                  <div className="flex flex-wrap justify-center items-center gap-6">
                    <MagneticWrapper>
                      <Button
                        size="lg"
                        className="relative gap-2 font-semibold shadow-lg bg-white text-[#0067B1] hover:bg-slate-50 hover:text-[#005a9c] hover:scale-105 active:scale-95 group overflow-hidden border-none"
                      >
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                        Request a Demo
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </MagneticWrapper>
                    
                    <MagneticWrapper>
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-white/30 text-white bg-transparent hover:bg-white/10 hover:border-white/50 hover:scale-105 active:scale-95 hover:shadow-lg transition-all duration-300"
                      >
                        View Contact Options
                      </Button>
                    </MagneticWrapper>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
