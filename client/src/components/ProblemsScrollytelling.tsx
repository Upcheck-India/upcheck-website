import { motion, useScroll, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

interface Problem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  metric: string;
  metricLabel: string;
  bgImage: string;
}

const problems: Problem[] = [
  {
    id: 1,
    title: "Inefficient Feeding & Feed Wastage",
    subtitle: "OVERFEEDING & SINKING FEED LOSS",
    description: "Farmers rely on fixed, manual feeding charts regardless of real-time shrimp appetite. Unconsumed feed rapidly sinks to the pond bottom, causing toxic ammonia spikes while burning up to 60% of daily farm operational costs.",
    metric: "35% - 40%",
    metricLabel: "Feed Investment Lost to Pond Bottom",
    bgImage: "/attached_assets/problem2.jpg",
  },
  {
    id: 2,
    title: "Workforce & Night Shift Management",
    subtitle: "MANUAL OBSERVATION & UNMONITORED AERATORS",
    description: "Aquaculture operations depend heavily on manual labor during dangerous late-night shifts. Worker fatigue, delayed manual logs, and lack of real-time accountability leave aerators unmonitored and farms exposed to sudden failures.",
    metric: "65%",
    metricLabel: "Farm Disasters Linked to Manual Error",
    bgImage: "/attached_assets/fisherman-boat.jpg",
  },
  {
    id: 3,
    title: "No Timely Alerts for Quick Action",
    subtitle: "BLIND SPOTS DURING CRITICAL OXYGEN CRASHES",
    description: "Dissolved oxygen and water chemistry can crash dangerously within 30 minutes during sudden weather changes or night shifts. Without instant automated alerts, farmers only discover lethal conditions after shrimp begin dying.",
    metric: "< 30 Mins",
    metricLabel: "Response Window Before Fatal Crop Loss",
    bgImage: "/attached_assets/problem3.jpg",
  },
  {
    id: 4,
    title: "Excessive Chemical & Antibiotic Overuse",
    subtitle: "DEFENSIVE GUESSWORK & ESCALATING COSTS",
    description: "Without continuous water quality visibility, farmers routinely dump antibiotics and chemical conditioners as defensive guesswork. This inflates production costs, builds resistance, and jeopardizes export compliance.",
    metric: "25% - 30%",
    metricLabel: "Unnecessary Chemical & Treatment Expenses",
    bgImage: "/attached_assets/problem5.jpg",
  },
  {
    id: 5,
    title: "Disease Outbreaks & Mass Mortality",
    subtitle: "RAPID SPREAD & LATE STAGE DETECTION",
    description: "Unaddressed water parameter fluctuations trigger virulent pathogens like White Spot Syndrome Virus (WSSV) and EHP. Because early invisible warning signs are missed, entire ponds face total crop loss within days.",
    metric: "Up to 80%",
    metricLabel: "Total Harvest Crop Loss",
    bgImage: "/attached_assets/disease-shrimp.jpg",
  },
];

export default function ProblemsScrollytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    return scrollYProgress.on("change", (val) => {
      const index = Math.min(
        problems.length - 1,
        Math.max(0, Math.floor(val * problems.length))
      );
      setActiveIndex(index);
    });
  }, [scrollYProgress]);

  const handleDotClick = (index: number) => {
    if (!containerRef.current) return;
    const element = containerRef.current;
    const totalHeight = element.scrollHeight;
    const step = totalHeight / problems.length;
    const targetScrollY = element.offsetTop + step * index + 10;
    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full bg-[#f3f7fb] relative pt-8 pb-0" data-testid="section-problems">
      {/* Subtle Background Mesh */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden"
        style={{
          backgroundImage: `radial-gradient(#0067B1 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Section Header Title */}
      <div className="container mx-auto max-w-4xl text-center px-6 mb-4 md:mb-5 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-2 shadow-2xs"
        >
          <span className="text-[10px] font-extrabold tracking-[0.2em] text-[#0067B1] uppercase">
            AQUACULTURE REALITIES
          </span>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight pb-1"
          style={{
            background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}
        >
          Challenges Faced by Shrimp Farmers
        </motion.h2>
      </div>

      {/* Scrollytelling Scroll Area (5 Problems Smooth Transition) */}
      <div
        ref={containerRef}
        className="relative h-[320vh] w-full pt-0 pb-0"
      >
        {/* Sticky Card Container - Pinned in Viewport */}
        <div className="sticky top-[80px] md:top-[90px] h-[75vh] min-h-[500px] max-h-[620px] w-[94%] max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-slate-800/80 flex flex-col justify-between bg-slate-950/40 backdrop-blur-sm z-20">
          
          {/* Background Images Layer with deep dark gradients */}
          <div className="absolute inset-0 z-0">
            {problems.map((prob, idx) => (
              <div
                key={prob.id}
                className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
                style={{
                  backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.96) 0%, rgba(15, 23, 42, 0.7) 50%, rgba(15, 23, 42, 0.92) 100%), url('${prob.bgImage}')`,
                  opacity: activeIndex === idx ? 1 : 0,
                  zIndex: activeIndex === idx ? 1 : 0,
                }}
              />
            ))}
          </div>

          {/* Content Area */}
          <div className="relative z-20 w-full flex-1 flex items-center px-6 md:px-14 lg:px-18">
            <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* Left Content Side */}
              <div className="md:col-span-8 lg:col-span-7 text-left">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="space-y-4"
                  >
                    <div>
                      {/* Eyebrow Subtitle (No 1,2,3,4,5 numbers) */}
                      <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#00C9E4] block mb-2">
                        {problems[activeIndex].subtitle}
                      </span>
                      
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight mt-1">
                        {problems[activeIndex].title}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm md:text-base leading-relaxed text-slate-200 max-w-xl font-medium">
                      {problems[activeIndex].description}
                    </p>

                    {/* The Ground Impact Section */}
                    <div className="pt-4 border-t border-white/15 max-w-lg flex items-center justify-between">
                      <div>
                        <span className="text-[9px] uppercase font-extrabold tracking-[0.2em] text-cyan-300 block mb-0.5">
                          THE GROUND IMPACT
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-white">
                          {problems[activeIndex].metricLabel}
                        </span>
                      </div>
                      <div className="text-right pl-4">
                        <span className="text-2xl sm:text-3xl md:text-4xl font-black text-[#00C9E4] tracking-tight drop-shadow-sm">
                          {problems[activeIndex].metric}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right Side: Interactive Progress Navigation (Without numbers) */}
              <div className="hidden md:flex md:col-span-4 lg:col-span-5 flex-col items-end gap-4 pr-2">
                {problems.map((prob, idx) => {
                  const isSelected = activeIndex === idx;
                  return (
                    <button
                      key={prob.id}
                      onClick={() => handleDotClick(idx)}
                      className="group flex items-center gap-3.5 text-right transition-all duration-300 focus:outline-none cursor-pointer"
                    >
                      <span
                        className={`text-xs font-bold tracking-wide transition-all duration-300 ${
                          isSelected
                            ? "text-[#00C9E4] translate-x-0 scale-105"
                            : "text-slate-400 group-hover:text-slate-200 translate-x-1"
                        }`}
                      >
                        {prob.title.split("&")[0].trim()}
                      </span>
                      <div
                        className={`h-2.5 rounded-full transition-all duration-500 ${
                          isSelected
                            ? "w-8 bg-[#00C9E4] shadow-[0_0_12px_rgba(0,201,228,0.6)]"
                            : "w-2.5 bg-slate-700 group-hover:bg-slate-500"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

            </div>
          </div>

          {/* Bottom Helper Guide / Indicator */}
          <div className="relative z-20 text-center pb-3 flex flex-col items-center gap-0.5 pointer-events-none">
            <span className="text-[9px] font-bold text-slate-400 tracking-[0.25em] uppercase">
              {activeIndex === problems.length - 1 ? "Scroll down to see our solution" : "Scroll down to explore next challenge"}
            </span>
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
