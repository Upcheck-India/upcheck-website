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
}

const problems: Problem[] = [
  {
    id: 1,
    title: "Disease Outbreaks",
    subtitle: "RAPID SPREAD & LATE DETECTION",
    description: "Shrimp diseases such as EHP and White Spot Syndrome Virus (WSSV) spread rapidly through ponds. Manual checks often fail to detect early warning signs, leading to entire crop losses within days.",
    metric: "up to 80%",
    metricLabel: "Crop Mortality Rate",
  },
  {
    id: 2,
    title: "Inefficient Feeding",
    subtitle: "OVERFEEDING & WASTED FEED COSTS",
    description: "Farmers usually follow fixed feeding schedules, leading to massive feed waste and polluted pond bottoms, or underfeeding which stunts growth and delays harvest.",
    metric: "35% - 40%",
    metricLabel: "Wasted Feed Expense",
  },
  {
    id: 3,
    title: "Excessive Antibiotic Usage",
    subtitle: "ANTIBIOTIC OVERUSE",
    description: "The lack of real-time monitoring pushes farmers to overuse antibiotics \"just in case\", increasing chemical costs, causing resistance, and jeopardizing shrimp quality for export.",
    metric: "20% - 30%",
    metricLabel: "Higher Cost of Production",
  },
  {
    id: 4,
    title: "Low Farm Profitability",
    subtitle: "HIGH RISKS, LOW RETURNS",
    description: "All these challenges combined lead to high operational risks, inconsistent yields, and reduced profitability for shrimp farmers.",
    metric: "10% - 15%",
    metricLabel: "Profit Margin",
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
    <>
      {/* Intro Header Section with light background and blue text */}
      <div className="w-full bg-[#f3f7fb] py-8 md:py-10 px-6 text-center relative border-b border-slate-200/80">
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `radial-gradient(#0067B1 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />
        <div className="container mx-auto max-w-3xl relative z-10">
          <span className="text-xs font-bold tracking-[0.25em] text-[#0067B1] uppercase block mb-2">
            AQUACULTURE REALITIES
          </span>
          <h2 
            className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-transparent mb-3 bg-clip-text"
            style={{
              background: "linear-gradient(90deg, #58b0df 0%, #3073b6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Problems Faced by Shrimp Farmers
          </h2>
          <p className="text-slate-600 text-sm md:text-base max-w-xl mx-auto leading-relaxed font-medium">
            Modern aquaculture challenges require smart, automated systems. Scroll down to explore major issues and their economic impact.
          </p>
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative h-[400vh] w-full bg-slate-950"
        data-testid="section-problems"
      >
        {/* Sticky Full-Screen Container */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
          
          {/* Background Images Layer with deep dark gradients */}
          <div className="absolute inset-0 z-0">
            {problems.map((prob, idx) => (
              <div
                key={prob.id}
                className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
                style={{
                  backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.6) 50%, rgba(15, 23, 42, 0.9) 100%), url('/attached_assets/problem${prob.id}.jpg')`,
                  opacity: activeIndex === idx ? 1 : 0,
                  zIndex: activeIndex === idx ? 1 : 0,
                }}
              />
            ))}
          </div>

          {/* Content Area */}
          <div className="relative z-20 w-full flex-1 flex items-center px-6 md:px-24">
            <div className="container mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* Left Content Side - Placed directly on the background as in the reference image */}
              <div className="md:col-span-8 lg:col-span-6 text-left">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="space-y-6"
                  >
                    <div>
                      <span className="text-[11px] font-bold tracking-[0.25em] text-blue-400/90 uppercase block mb-6">
                        AQUACULTURE REALITIES
                      </span>
                      
                      <span className="inline-block text-[10px] font-extrabold tracking-[0.2em] px-4 py-2 rounded-full border border-slate-700 bg-slate-900/60 text-slate-300 uppercase mb-4">
                        PROBLEM 0{problems[activeIndex].id}
                      </span>
                      
                      <h3 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight mt-2">
                        {problems[activeIndex].title}
                      </h3>

                      <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#00C9E4] mt-2">
                        {problems[activeIndex].subtitle}
                      </h4>
                    </div>

                    <p className="text-sm md:text-base leading-relaxed text-slate-300 max-w-xl font-medium">
                      {problems[activeIndex].description}
                    </p>

                    {/* Impact Metric Section with thin border divider */}
                    <div className="pt-6 border-t border-slate-700/60 max-w-lg flex items-center justify-between">
                      <div>
                        <span className="text-[9px] uppercase font-extrabold tracking-widest text-slate-400 block mb-1">
                          METRIC IMPACT
                        </span>
                        <span className="text-sm font-bold text-white">
                          {problems[activeIndex].metricLabel}
                        </span>
                      </div>
                      {problems[activeIndex].metric !== "0%" && (
                        <div className="px-5 py-2.5 rounded-full text-xs font-black bg-red-500/20 border border-red-500/30 text-red-400 tracking-wider shadow-sm">
                          {problems[activeIndex].metric}
                        </div>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right Side: Slim Progress Navigation */}
              <div className="hidden md:flex md:col-span-4 lg:col-span-6 flex-col items-end gap-6 pr-8">
                {problems.map((prob, idx) => {
                  const isSelected = activeIndex === idx;
                  return (
                    <button
                      key={prob.id}
                      onClick={() => handleDotClick(idx)}
                      className="group flex items-center gap-4 text-right transition-all duration-300 focus:outline-none"
                    >
                      <span
                        className={`text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                          isSelected
                            ? "text-[#00C9E4] translate-x-0 scale-105"
                            : "text-slate-500 group-hover:text-slate-300 translate-x-2"
                        }`}
                      >
                        {prob.title}
                      </span>
                      <div
                        className={`h-3 rounded-full transition-all duration-500 ${
                          isSelected
                            ? "w-10 bg-[#00C9E4] shadow-[0_0_10px_rgba(0,201,228,0.5)]"
                            : "w-3 bg-slate-700 group-hover:bg-slate-500"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

            </div>
          </div>

        {/* Bottom Helper Guide / Indicator */}
        <div className="relative z-20 text-center pb-8 flex flex-col items-center gap-1 pointer-events-none">
          <span className="text-[10px] font-bold text-slate-400 tracking-[0.3em] uppercase">
            {activeIndex === problems.length - 1 ? "Keep scrolling to explore solutions" : "Scroll down for next problem"}
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </motion.div>
        </div>

      </div>
    </div>
  </>
);
}
