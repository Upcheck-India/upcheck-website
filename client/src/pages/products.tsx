import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import CountUp from "react-countup";
const upcheckDeviceImg = "/attached_assets/upcheck-iot-device.webp";
const yellowDeviceImg = "/attached_assets/upcheck-yellow-device.webp";
const appScreenshotImg = "/attached_assets/upcheck-farm-app.jpg";
const aquaculturePensImg = "/attached_assets/aquaculture-pens.webp";
const shrimpHarvestImg = "/attached_assets/shrimp-harvest.webp";
const fishermanBoatImg = "/attached_assets/fisherman-boat.webp";
const diseaseShrimpImg = "/attached_assets/disease-shrimp.jpg";
const platformAccuracyImg = "/attached_assets/platform-accuracy.webp";
const liveAnalyticsSeaImg = "/attached_assets/live-analytics-sea.webp";
const aiFeedingSeaweedImg = "/attached_assets/ai-feeding-seaweed.jpg";
const traceabilityPlaceholderImg = "/attached_assets/traceability-placeholder.webp";
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
    name: "Pond Monitoring & Daily Log",
    icon: Waves,
    description:
      "Every pond's working record in one place — dissolved oxygen, pH, temperature and salinity, feed given by meal, tray residue, mortality and treatments. A multi-pond grid lets one person log the whole farm in a single morning round.",
    points: [
      "Log the whole farm in one pass, not pond by pond",
      "Works offline at the pond bank and syncs when signal returns",
      "Weekly chemistry, plankton and Vibrio counts in the same record",
    ],
  },
  {
    name: "Feed Advisor",
    icon: Target,
    description:
      "How much to feed today, adjusted for tray residue, water conditions and molt stage. Where the readings are thin the advisor returns a range instead of a falsely precise number, and says what to go and measure.",
    points: [
      "Tray-residue adjusted, so uneaten feed stops becoming ammonia",
      "Lunar molt windows factored into the daily ration",
      "States what each recommendation was computed from",
    ],
  },
  {
    name: "Cycle Economics & Reckoning",
    icon: BarChart3,
    description:
      "Feed conversion ratio, survival rate, cost per kilo, break-even count band, margin and return — computed from the record you kept all cycle, not estimated in a spreadsheet after harvest.",
    points: [
      "Costs and feed attributed to the crop, not the farm in general",
      "Break-even priced against count bands, the way buyers actually pay",
      "Dealer credit tracked as a balance instead of remembered",
    ],
  },
  {
    name: "Disease Risk & Responsible Treatment",
    icon: ShieldAlert,
    description:
      "A symptom checker that ranks likely causes from what you can actually see — on the animal, in its behaviour, in the water — instead of a guess from a WhatsApp group. Paired with a banned-substance warning at the moment a treatment is recorded.",
    points: [
      "Ranked candidates from observable signs, not a single guess",
      "Warns on export-banned substances before they go in the water",
      "Treatment history kept per pond for audit and certification",
    ],
  },
];

const reasons = [
  {
    title: "It speaks the shrimp belt's languages",
    description:
      "Every screen, label and warning exists in six languages — English, Hindi, Bengali, Tamil, Telugu and Odia. The person who walks the pond bank at dawn is rarely the person who reads English.",
    icon: Sparkles,
  },
  {
    title: "It works where the signal doesn't",
    description:
      "Ponds are not where the towers are. Neerani keeps working through a dead patch and reconciles when the connection returns — because a logging tool that fails at the pond bank is one nobody uses twice.",
    icon: Activity,
  },
  {
    title: "A record several people can be trusted with",
    description:
      "Workers log, managers verify, and money is visible only to whom the owner allows. A farm with hired labour cannot run on one shared password — and a lender or consultant can be given a read-only view without handing over the books.",
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

// Premium Section Card with Clean, Minimal Background Hover Effect
interface PremiumCardProps {
  children: React.ReactNode;
  className?: string;
  reversed?: boolean;
}

function PremiumCard({ children, className = "", reversed = false }: PremiumCardProps) {
  // Auto-remove default card padding if custom padding is supplied
  const hasPadding = className.split(" ").some(c => c.startsWith("p-") || c.startsWith("px-") || c.startsWith("py-"));
  const paddingClass = hasPadding ? "" : "p-8 md:p-14";

  return (
    <div
      className={`group relative rounded-[32px] border border-slate-200/80 bg-white dark:bg-slate-900 h-full flex flex-col justify-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out overflow-hidden ${paddingClass} ${reversed ? "lg:[direction:ltr]" : ""} ${className}`}
    >
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

      <main className="relative z-10 pt-24 md:pt-28 pb-20 space-y-10 md:space-y-16">
        
        {/* ========================================================================= */}
        {/* 1. HERO SECTION: Wide Clean Hero Section */}
        {/* ========================================================================= */}
        <section className="relative w-full pt-4 pb-6 md:pt-8 md:pb-8 px-4 sm:px-6 overflow-hidden">
          {/* Subtle Ambient Lighting */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[320px] bg-gradient-to-r from-[#00C9E4]/12 via-[#0067B1]/8 to-[#00C9E4]/12 blur-[100px] pointer-events-none" />
          
          <div className="container mx-auto max-w-5xl text-center relative z-10 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#0067B1]" />
              <span className="text-[10px] font-extrabold tracking-[0.2em] text-[#0067B1] uppercase">
                COMPLETE AQUACULTURE PLATFORM
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.15]"
              style={{ 
                background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}
            >
              Everything you need to <br className="hidden sm:block" />
              run a smarter farm
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium"
            >
              Upcheck brings monitoring, feeding, analytics, and risk alerts together in one connected experience built for aquaculture teams.
            </motion.p>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. OUR PRODUCTS: Divided into spacious, wide sections */}
        {/* ========================================================================= */}
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 space-y-16 md:space-y-24">
          
          {/* Section 1: IoT Monitoring Device (Hardware) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <PremiumCard className="p-8 md:p-14">
              <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
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
                      className="absolute w-60 h-60 rounded-full border-2 border-[#00C9E4]/25"
                      animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
                    />
                    <motion.div 
                      className="absolute w-60 h-60 rounded-full border border-[#0067B1]/15"
                      animate={{ scale: [1, 2.3], opacity: [0.4, 0] }}
                      transition={{ duration: 4, delay: 2, repeat: Infinity, ease: "easeOut" }}
                    />
                  </div>
                  
                  <div className="absolute w-80 h-80 rounded-full bg-gradient-to-br from-[#00C9E4]/15 to-[#0067B1]/8 blur-[70px] pointer-events-none" />
                  <motion.img
                    src={yellowDeviceImg}
                    alt="IoT monitoring device"
                    className="max-h-[380px] w-auto object-contain relative z-10 drop-shadow-2xl rounded-3xl border border-slate-200/40 shadow-xl"
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
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="bg-cyan-500/10 text-[#0067B1] border border-cyan-500/20 px-3.5 py-1 text-xs font-semibold rounded-full shadow-2xs">
                      Hardware
                    </Badge>
                    <Badge className="bg-amber-50 text-amber-800 border border-amber-300 px-3.5 py-1 text-xs font-bold rounded-full uppercase tracking-wide shadow-2xs">
                      In development · Bench prototype
                    </Badge>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight">
                    Neero — Floating Pond Sensor
                  </h3>
                  <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium">
                    Neero is a solar-powered, floating IoT sensor designed to sit directly in the shrimp pond and
                    continuously track the water quality parameters that matter most to shrimp health — pH, dissolved
                    oxygen and temperature — streaming them over GSM into the Neerani app. It is duty-cycled to wake only
                    when a reading is due, so a single solar charge carries it through overcast weather without cabling
                    or battery swaps.
                  </p>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    <strong className="text-slate-700">Where it stands:</strong> we are validating the sensing stack on
                    the bench. Pond trials are the next milestone, and pricing will be announced alongside them. The
                    image shown is a design render, not a deployed unit.
                  </p>
                </motion.div>
              </div>
            </PremiumCard>
          </motion.div>

          {/* Section 2: UpCheck Mobile Application (Software) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <PremiumCard className="p-8 md:p-14">
              <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                {/* Left Column: Title and Content */}
                <motion.div 
                  className="lg:col-span-6 space-y-6 text-left order-2 lg:order-1"
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <Badge className="bg-blue-500/10 text-blue-600 border border-blue-500/20 px-3.5 py-1 text-xs font-semibold rounded-full shadow-2xs">
                    Software
                  </Badge>
                  <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight">
                    UpCheck Mobile Application
                  </h3>
                  <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium">
                    Monitor your shrimp ponds anytime, anywhere with the UpCheck mobile application. Connected directly to your floating IoT device, the app delivers real-time pond insights, AI-powered recommendations, and complete farm management tools—all from a single dashboard.
                  </p>

                  {/* Feature highlights list */}
                  <div className="space-y-3 pt-2">
                    {[
                      "Instant alerts for critical pH & Dissolved Oxygen thresholds",
                      "Automated molting window predictions & feeding guidance",
                      "Multi-farm & multi-pond synchronized management in real time",
                    ].map((feature, i) => (
                      <div key={i} className="flex items-start gap-3 text-slate-700 text-sm md:text-base font-medium">
                        <div className="w-5 h-5 rounded-full bg-cyan-50 border border-cyan-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0067B1]" />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 flex flex-wrap items-center gap-4">
                    <a href="/download">
                      <Button 
                        className="gap-2 shadow-md hover:scale-105 active:scale-95 transition-all duration-300 text-white font-bold h-11 px-6 rounded-2xl"
                        style={{
                          background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)",
                          border: "none"
                        }}
                      >
                        <span>Get the App</span>
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </a>
                  </div>
                </motion.div>

                {/* Right Column: Premium Smartphone Mockup with Floating UI Badges */}
                <motion.div 
                  className="lg:col-span-6 flex items-center justify-center relative min-h-[460px] order-1 lg:order-2"
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  {/* Ambient Glow */}
                  <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-[#00C9E4]/20 via-[#0067B1]/15 to-transparent blur-[70px] pointer-events-none" />

                  {/* Smartphone Mockup Frame */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    whileHover={{ scale: 1.02 }}
                    className="relative z-10 w-[270px] sm:w-[290px] rounded-[44px] p-2.5 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-950 shadow-[0_25px_60px_-15px_rgba(0,103,177,0.35)] border border-slate-600/50"
                  >
                    {/* Inner bezel */}
                    <div className="relative rounded-[36px] overflow-hidden bg-white border-2 border-slate-900/80 aspect-[9/18.5] shadow-inner">
                      {/* Dynamic Island / Speaker notch */}
                      <div className="absolute top-2.5 inset-x-0 z-30 flex justify-center pointer-events-none">
                        <div className="w-24 h-4 bg-slate-950 rounded-full flex items-center justify-end px-2.5">
                          <div className="w-2 h-2 rounded-full bg-slate-800" />
                        </div>
                      </div>

                      {/* App Image Screen */}
                      <img
                        src={appScreenshotImg}
                        alt="UpCheck Mobile Application Interface"
                        className="w-full h-full object-cover object-top"
                      />

                      {/* Subtle Screen Reflection Glare */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none z-20" />
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </PremiumCard>
          </motion.div>

          {/* Section 3: Transforming Every Pond into Actionable Insights (Intelligence) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <PremiumCard className="p-8 md:p-14">
              <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                {/* Left Column: Interactive Tracking Graph */}
                <motion.div 
                  className="lg:col-span-6 flex items-center justify-center relative"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,201,228,0.14),_transparent_70%)] opacity-100 pointer-events-none" />
                  <div className="w-full rounded-3xl border border-slate-200/80 bg-white/70 dark:bg-black/25 p-6 md:p-8 relative overflow-hidden shadow-xl backdrop-blur-md">
                    <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_top_right,_rgba(0,201,228,0.16),_transparent_40%)] pointer-events-none" />
                    <div className="relative space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.2em] text-[#0067B1] font-extrabold">Intelligence</p>
                          <h4 className="text-base font-bold text-slate-900 tracking-tight">Transforming Every Pond</h4>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3.5">
                        <div className="p-4 bg-white/80 dark:bg-black/20 rounded-2xl border border-slate-200/70 shadow-xs">
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Dissolved Oxygen</p>
                          <p className="text-2xl font-black text-[#00C9E4]">7.4 mg/L</p>
                          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mt-2 overflow-hidden">
                            <motion.div 
                              className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" 
                              initial={{ width: 0 }}
                              whileInView={{ width: '85%' }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.2, ease: "easeOut" }}
                            />
                          </div>
                        </div>
                        <div className="p-4 bg-white/80 dark:bg-black/20 rounded-2xl border border-slate-200/70 shadow-xs">
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">pH Level</p>
                          <p className="text-2xl font-black text-[#0067B1]">8.2 pH</p>
                          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mt-2 overflow-hidden">
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
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pb-0.5">
                          Critical Pond Health Analytics
                        </div>
                        <div className="p-3 bg-white/60 rounded-2xl border border-slate-200/60 h-28 relative overflow-hidden flex flex-col justify-end">
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
                  <Badge className="bg-indigo-500/10 text-indigo-600 border border-indigo-500/20 px-3.5 py-1 text-xs font-semibold rounded-full shadow-2xs">
                    Tracking
                  </Badge>
                  <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight">
                    Transforming Every Pond into Actionable Insights
                  </h3>
                  <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium">
                    UpCheck continuously collects and analyzes critical pond data through its solar-powered IoT device,
                    enabling farmers to monitor pond health, optimize operations, and make smarter decisions. Our
                    intelligent tracking system works silently in the background, providing real-time insights that improve
                    productivity and reduce farming risks.
                  </p>
                </motion.div>
              </div>
            </PremiumCard>
          </motion.div>

          {/* Why Choose Upcheck - Premium Light Masonry Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <PremiumCard className="p-6 md:py-16 md:px-12 relative overflow-hidden">
              <div className="relative z-10 space-y-12">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="text-center max-w-3xl mx-auto space-y-3 pb-2"
                >
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-50 border border-cyan-200/80 shadow-2xs">
                    <Sparkles className="w-3.5 h-3.5 text-[#0067B1]" />
                    <span className="text-[11px] font-extrabold tracking-[0.2em] text-[#0067B1] uppercase">
                      Smart Technology. Smarter Shrimp Farming.
                    </span>
                  </div>
                  <h3 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                    Why Choose Upcheck?
                  </h3>
                  <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto font-medium leading-relaxed">
                    Discover how UpCheck transforms every pond into a connected, intelligent aquaculture ecosystem.
                  </p>
                </motion.div>

                {/* Asymmetrical Masonry Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                  
                  {/* Card 1: Disease Prevention */}
                  <motion.div
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.65, ease: "easeOut", delay: 0 }}
                    whileHover={{ y: -6, scale: 1.015 }}
                    className="relative rounded-[24px] overflow-hidden group shadow-md hover:shadow-2xl border border-slate-200/80 hover:border-[#00C9E4]/60 h-[210px] cursor-pointer transition-all duration-400 ease-out"
                  >
                    <motion.img
                      src={diseaseShrimpImg}
                      alt="Disease Prevention"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-85" />

                    <div className="absolute inset-0 p-5 flex flex-col justify-end z-20 text-left">
                      <div className="space-y-1 transform transition-transform duration-300 group-hover:-translate-y-1">
                        <span className="text-[#00C9E4] text-[10px] font-extrabold uppercase tracking-widest block">
                          Disease Prevention
                        </span>
                        <h4 className="text-white text-lg font-extrabold tracking-tight group-hover:text-cyan-100 transition-colors">
                          Detect early.
                        </h4>
                        <p className="text-white/85 text-xs font-medium">
                          Protect every harvest.
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Card 2: Statistics Card (Platform Accuracy) */}
                  <motion.div
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
                    whileHover={{ y: -6, scale: 1.015 }}
                    className="relative rounded-[24px] overflow-hidden group shadow-md hover:shadow-2xl border border-slate-200/80 hover:border-[#00C9E4]/70 h-[210px] cursor-pointer transition-all duration-400 ease-out"
                  >
                    <motion.img
                      src={platformAccuracyImg}
                      alt="Platform Accuracy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0067B1]/92 via-[#0067B1]/75 to-slate-950/60 z-10 transition-all duration-500 group-hover:from-[#0067B1]/95 group-hover:via-[#00C9E4]/60" />

                    <div className="absolute inset-0 p-5 flex flex-col justify-between z-20 text-left">
                      <div className="space-y-0.5">
                        <span className="text-white/80 text-[10px] font-extrabold uppercase tracking-widest block">
                          Target Sampling Rate
                        </span>
                        <h4 className="text-white text-xs font-bold tracking-tight">
                          Continuous Monitoring
                        </h4>
                      </div>

                      <div className="my-auto transform transition-transform duration-300 group-hover:scale-105">
                        <span className="text-4xl md:text-5xl text-white font-black tracking-tighter flex items-baseline drop-shadow-md">
                          15
                          <span className="text-[#00C9E4] text-2xl font-extrabold ml-1">min</span>
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[10px] font-semibold text-white/80 border-t border-white/20 pt-2.5 group-hover:text-white transition-colors">
                        <span>Design target · not yet field-verified</span>
                        <div className="w-6 h-6 rounded-full bg-white/15 group-hover:bg-white/30 flex items-center justify-center transition-all">
                          <ArrowRight className="w-3.5 h-3.5 text-white group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Card 3: Hero Card (Largest, spans 2 rows on desktop) */}
                  <motion.div
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                    whileHover={{ y: -6, scale: 1.015 }}
                    className="relative rounded-[24px] overflow-hidden group shadow-md hover:shadow-2xl border border-slate-200/80 hover:border-[#00C9E4]/70 h-[444px] cursor-pointer md:col-span-1 md:row-span-2 transition-all duration-400 ease-out"
                  >
                    <motion.img
                      src={aquaculturePensImg}
                      alt="UpCheck Aquaculture Site"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-slate-950/20 z-10 transition-opacity duration-500 group-hover:opacity-90" />

                    {/* Content at Bottom */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-end z-20 text-left">
                      <div className="space-y-2 transform transition-transform duration-300 group-hover:-translate-y-1">
                        <span className="text-[#00C9E4] text-[10px] font-extrabold uppercase tracking-widest block">
                          Complete Ecosystem
                        </span>
                        <h4 className="text-white text-2xl font-black tracking-tight leading-tight uppercase group-hover:text-cyan-100 transition-colors">
                          Every Pond.<br/>Connected.<br/>Intelligent.
                        </h4>
                        <p className="text-white/80 text-xs font-medium leading-relaxed pt-1 border-t border-white/15">
                          Autonomous sensor arrays tracking 24/7.
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Card 4: Farmer Experience */}
                  <motion.div
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
                    whileHover={{ y: -6, scale: 1.015 }}
                    className="relative rounded-[24px] overflow-hidden group shadow-md hover:shadow-2xl border border-slate-200/80 hover:border-[#00C9E4]/60 h-[210px] cursor-pointer md:col-span-2 transition-all duration-400 ease-out"
                  >
                    <motion.img
                      src={fishermanBoatImg}
                      alt="Farmer Experience"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/45 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-85" />
                    
                    <div className="absolute inset-0 p-6 flex flex-col justify-end z-20 text-left">
                      <div className="space-y-1 transform transition-transform duration-300 group-hover:-translate-y-1">
                        <span className="text-[#00C9E4] text-[10px] font-extrabold uppercase tracking-widest block">
                          Farmer Experience
                        </span>
                        <h4 className="text-white text-xl font-extrabold tracking-tight group-hover:text-cyan-100 transition-colors">
                          Manage Anywhere
                        </h4>
                        <p className="text-white/85 text-xs font-medium">
                          Monitor every pond right from your phone.
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Card 5: Circular Dashboard Chart Card (Live Analytics) */}
                  <motion.div
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.65, ease: "easeOut", delay: 0 }}
                    whileHover={{ y: -6, scale: 1.015 }}
                    className="relative rounded-[24px] overflow-hidden group shadow-md hover:shadow-2xl border border-slate-200/80 hover:border-[#00C9E4]/60 h-[210px] cursor-pointer transition-all duration-400 ease-out"
                  >
                    <motion.img
                      src={liveAnalyticsSeaImg}
                      alt="Live Analytics"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-slate-950/30 z-10 transition-opacity duration-500 group-hover:opacity-90" />
                    
                    <div className="absolute inset-0 p-5 flex flex-col justify-between z-20 text-left">
                      <div className="space-y-0.5">
                        <span className="text-[#00C9E4] text-[10px] font-extrabold uppercase tracking-widest block">
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
                              className="text-white/15"
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
                            1.5
                          </div>
                        </div>
                        <div className="space-y-1">
                          <span className="text-base font-extrabold text-white leading-none block group-hover:text-cyan-100 transition-colors">FCR 1.5 &rarr; 1.8</span>
                          <p className="text-white/80 text-[10px] font-semibold leading-relaxed">
                            Typical Indian farm range. Feed is ~60% of production cost, so every
                            0.1 of FCR is money.
                          </p>
                        </div>
                      </div>

                      <div className="text-[10px] text-white/60 border-t border-white/10 pt-2.5">
                        Tray-residue adjusted feeding, logged every meal.
                      </div>
                    </div>
                  </motion.div>

                  {/* Card 6: AI Feeding */}
                  <motion.div
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
                    whileHover={{ y: -6, scale: 1.015 }}
                    className="relative rounded-[24px] overflow-hidden group shadow-md hover:shadow-2xl border border-slate-200/80 hover:border-[#00C9E4]/60 h-[210px] cursor-pointer transition-all duration-400 ease-out"
                  >
                    <motion.img
                      src={aiFeedingSeaweedImg}
                      alt="AI Feeding"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/45 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-85" />
                    
                    <div className="absolute inset-0 p-5 flex flex-col justify-end z-20 text-left">
                      <div className="space-y-1 transform transition-transform duration-300 group-hover:-translate-y-1">
                        <span className="text-[#00C9E4] text-[10px] font-extrabold uppercase tracking-widest block">
                          AI Feeding
                        </span>
                        <h4 className="text-white text-lg font-extrabold tracking-tight group-hover:text-cyan-100 transition-colors">
                          Precision feeding.
                        </h4>
                        <p className="text-white/85 text-xs font-medium">
                          Zero guesswork.
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Card 7: Better Harvest */}
                  <motion.div
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.65, ease: "easeOut", delay: 0.2 }}
                    whileHover={{ y: -6, scale: 1.015 }}
                    className="relative rounded-[24px] overflow-hidden group shadow-md hover:shadow-2xl border border-slate-200/80 hover:border-[#00C9E4]/60 h-[210px] cursor-pointer transition-all duration-400 ease-out"
                  >
                    <motion.img
                      src={shrimpHarvestImg}
                      alt="Harvest ROI"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/45 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-85" />
                    
                    <div className="absolute inset-0 p-5 flex flex-col justify-end z-20 text-left">
                      <div className="space-y-1 transform transition-transform duration-300 group-hover:-translate-y-1">
                        <span className="text-[#00C9E4] text-[10px] font-extrabold uppercase tracking-widest block">
                          Higher Yield
                        </span>
                        <h4 className="text-white text-lg font-extrabold tracking-tight group-hover:text-cyan-100 transition-colors">
                          Lower Costs.
                        </h4>
                        <p className="text-white/85 text-xs font-medium">
                          Better Returns.
                        </p>
                      </div>
                    </div>
                  </motion.div>

                </div>
              </div>
            </PremiumCard>
          </motion.div>

          {/* Standalone Traceability Solution Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <PremiumCard className="p-8 md:p-14">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center text-left">
                {/* Left Column: Wording & Information */}
                <div className="lg:col-span-6 relative z-10 space-y-6">
                  <div>
                    <Badge className="bg-[#00C9E4]/15 text-[#0067B1] border border-[#00C9E4]/25 px-3.5 py-1 text-xs font-semibold rounded-full shadow-2xs mb-3 inline-flex items-center gap-1.5 pointer-events-none">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0067B1] animate-pulse" />
                      Coming Soon
                    </Badge>
                    <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                      Traceability Solution
                    </h3>
                  </div>

                  <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
                    Track every harvest from pond to consumer. Verify origin, batch specifications, and quality logs at every link of your supply chain.
                  </p>

                  <div className="pt-2">
                    <button
                      className="p-0 h-auto font-bold text-[#0067B1] hover:text-[#005a9c] gap-2 inline-flex items-center group cursor-pointer border-none bg-transparent text-base"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Right Column: Premium Placeholder Supply Chain Illustration */}
                <div className="lg:col-span-6 relative z-10 rounded-2xl overflow-hidden border border-slate-200/80 bg-white p-3 shadow-md group cursor-pointer">
                  <img
                    src={traceabilityPlaceholderImg}
                    alt="Shrimp Traceability Supply Chain Concept"
                    className="w-full h-auto object-cover rounded-xl group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>
              </div>
            </PremiumCard>
          </motion.div>

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
                      <a href="/contact?subject=demo">
                        <Button
                          size="lg"
                          className="relative gap-2 font-semibold shadow-lg bg-white text-[#0067B1] hover:bg-slate-50 hover:text-[#005a9c] hover:scale-105 active:scale-95 group overflow-hidden border-none"
                        >
                          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                          Request a Demo
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </Button>
                      </a>
                    </MagneticWrapper>

                    <MagneticWrapper>
                      <a href="/contact">
                        <Button
                          size="lg"
                          variant="outline"
                          className="border-white/30 text-white bg-transparent hover:bg-white/10 hover:border-white/50 hover:scale-105 active:scale-95 hover:shadow-lg transition-all duration-300"
                        >
                          View Contact Options
                        </Button>
                      </a>
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
