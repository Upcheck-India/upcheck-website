import { motion } from "framer-motion";
import { Radio, Brain, Zap, ArrowDown } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Sense",
    text: "Neero monitors your pond in real time, capturing the key water parameters that influence aquaculture.",
    icon: Radio,
    accent: "from-cyan-500 to-blue-500",
    badgeColor: "bg-cyan-50 text-[#0067B1] border-cyan-200",
  },
  {
    num: "02",
    title: "Understand",
    text: "UpCheck turns raw pond data into meaningful insights, helping you see changes before they become problems.",
    icon: Brain,
    accent: "from-blue-500 to-indigo-600",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    num: "03",
    title: "Act",
    text: "Get timely alerts and actionable recommendations, so you know what to do and when to do it.",
    icon: Zap,
    accent: "from-indigo-500 to-cyan-500",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
];

export default function PondToHandsSection() {
  return (
    <section 
      className="relative py-16 md:py-24 px-6 bg-gradient-to-b from-white via-cyan-50/20 to-white overflow-hidden"
      data-testid="section-pond-to-hands"
    >
      {/* Soft background ambient glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(#00C9E4_1px,transparent_1px)] [background-size:32px_32px]" />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-[#00C9E4]/10 via-[#0067B1]/8 to-[#00C9E4]/10 blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative z-10 space-y-12 md:space-y-16">
        
        {/* Main Heading & Supporting Text */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.2]"
            style={{ 
              background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}
          >
            Neero sees what’s happening. <br className="hidden sm:block" />
            UpCheck helps you understand why.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            Neero continuously monitors your pond and captures the changes that matter. That data travels into the UpCheck ecosystem, where it is transformed into clear insights, trends, and alerts—so you’re not just collecting data, you’re making better decisions.
          </motion.p>
        </div>

        {/* 3-Step Storytelling Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                whileHover={{ y: -5 }}
                className="group relative rounded-3xl p-7 sm:p-8 bg-white border border-slate-200/80 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Top Step Number & Icon */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-[#0067B1] px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100">
                      Step {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-100 flex items-center justify-center text-[#0067B1] group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                    {step.num} — {step.title}
                  </h3>

                  {/* Text */}
                  <p className="text-sm text-slate-600 leading-relaxed font-medium">
                    {step.text}
                  </p>
                </div>

                {/* Subtle bottom decorative line */}
                <div className="pt-6 mt-6 border-t border-slate-100">
                  <div className="w-full h-1 rounded-full bg-slate-100 overflow-hidden">
                    <div className={`h-full w-1/3 bg-gradient-to-r ${step.accent} rounded-full group-hover:w-full transition-all duration-500`} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Transition Line Before App Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center pt-4"
        >
          <div className="inline-flex flex-col items-center gap-2.5">
            <p className="text-base sm:text-lg font-bold text-slate-800 tracking-tight">
              From a sensor in the pond to insights in your pocket.
            </p>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-[#00C9E4]"
            >
              <ArrowDown className="w-5 h-5" />
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
