import { motion } from "framer-motion";
import { 
  AlertTriangle, 
  Clock, 
  Activity, 
  HelpCircle, 
  ShieldAlert, 
  Eye, 
  ArrowRight, 
  Sparkles, 
  Cpu, 
  LineChart, 
  BellRing, 
  CheckCircle2, 
  Zap,
  ChevronRight
} from "lucide-react";

export default function ProblemSolutionSection() {
  const challenges = [
    {
      title: "Lack of real-time water quality monitoring",
      desc: "Parameters change rapidly while manual tests are hours apart.",
      icon: Clock,
    },
    {
      title: "Manual checking of pond conditions",
      desc: "Tedious physical testing prone to human error and fatigue.",
      icon: Eye,
    },
    {
      title: "Delayed detection of harmful changes",
      desc: "Critical DO and pH crashes noticed only after shrimp start dying.",
      icon: AlertTriangle,
    },
    {
      title: "Difficulty maintaining feeding schedules",
      desc: "Guesswork feeding creates wasted feed and toxic pond bottoms.",
      icon: HelpCircle,
    },
    {
      title: "Unexpected shrimp health problems",
      desc: "Invisible water stresses trigger rapid disease outbreaks.",
      icon: ShieldAlert,
    },
    {
      title: "Dependence on constant manual observation",
      desc: "Round-the-clock stress and high operational farm risk.",
      icon: Activity,
    },
  ];

  const solutions = [
    {
      badge: "REAL-TIME MONITORING",
      title: "Continuous 24/7 Sensing",
      desc: "Continuously track critical pond parameters including pH, DO, temperature, salinity, and rainfall without manual sampling.",
      icon: Zap,
    },
    {
      badge: "SMART ANALYTICS",
      title: "AI-Driven Farm Intelligence",
      desc: "Turn raw telemetry into personalized feeding recommendations and predictive pond health indices.",
      icon: LineChart,
    },
    {
      badge: "EARLY ALERTS",
      title: "Instant Warning System",
      desc: "Identify abnormal conditions and oxygen crashes in seconds to take immediate corrective action.",
      icon: BellRing,
    },
    {
      badge: "BETTER DECISIONS",
      title: "Actionable Confidence",
      desc: "Give farmers clear, automated guidance to cut chemical costs, avoid feed waste, and maximize harvest yields.",
      icon: CheckCircle2,
    },
  ];

  return (
    <section 
      className="relative py-14 md:py-20 px-4 sm:px-6 md:px-8 bg-site-gradient overflow-hidden" 
      data-testid="section-problem-solution"
    >
      {/* Decorative Background Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `radial-gradient(#00C9E4 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />
      <div className="absolute top-1/4 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#00C9E4]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        
        {/* ========================================================================= */}
        {/* 1. SECTION TITLE (The Challenge)                                          */}
        {/* ========================================================================= */}
        <div className="text-center mb-10 md:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 mb-3 shadow-2xs"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
            <span className="text-[10px] font-extrabold tracking-[0.2em] text-red-600 uppercase">
              THE CHALLENGE
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight"
          >
            Challenges Faced by Farmers
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto font-medium mt-2 leading-relaxed"
          >
            Managing a pond is more than just raising fish. Farmers constantly need to understand what is happening beneath the surface.
          </motion.p>
        </div>

        {/* ========================================================================= */}
        {/* 2 & 4. TWO-SIDED COMPOSITION: Left (Challenges) → Transition → Right (Solution) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* ----------------------------------------------------------------------- */}
          {/* LEFT SIDE: The Challenges (5 Cols on Desktop)                           */}
          {/* ----------------------------------------------------------------------- */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-white/85 border border-red-200/70 shadow-xl shadow-slate-200/50 backdrop-blur-md relative overflow-hidden"
          >
            {/* Top Red Accent Banner */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-red-500 via-orange-400 to-amber-500" />
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-red-600 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  TRADITIONAL FARMING GAPS
                </span>
                <span className="text-xs font-bold text-slate-400">06 Pain Points</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight mb-4 text-left">
                Manual Observation & Constant Uncertainty
              </h3>

              {/* 6 Problem Cards in a 2-Col / 1-Col Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5 text-left">
                {challenges.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div 
                      key={idx}
                      className="p-3 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-red-300/80 hover:bg-red-50/30 transition-all duration-200 group flex items-start gap-3"
                    >
                      <div className="w-7 h-7 rounded-xl bg-red-500/10 text-red-600 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 leading-snug">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Status Callout */}
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-left text-slate-500 text-[11px] font-semibold">
              <span>Result: High Operational Risks</span>
              <span className="text-red-600 font-bold">Delayed Response</span>
            </div>
          </motion.div>

          {/* ----------------------------------------------------------------------- */}
          {/* CENTER: Storytelling Visual Connector Bridge (2 Cols on Desktop)       */}
          {/* ----------------------------------------------------------------------- */}
          <div className="lg:col-span-2 flex flex-col items-center justify-center py-4 lg:py-0 relative">
            
            {/* Desktop Horizontal Data Flow Connector */}
            <div className="hidden lg:flex flex-col items-center justify-center w-full space-y-3 text-center px-1">
              
              {/* Animated Glowing Bridge Line */}
              <div className="relative w-full flex items-center justify-center">
                <div className="w-full h-0.5 bg-gradient-to-r from-red-400 via-[#00C9E4] to-[#0067B1] opacity-60" />
                <motion.div 
                  animate={{ x: [-20, 20, -20] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute w-6 h-6 rounded-full bg-white shadow-md border border-[#00C9E4] flex items-center justify-center text-[#0067B1]"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </motion.div>
              </div>

              {/* Story Bridge Pill */}
              <div className="p-3 rounded-2xl bg-white/90 border border-slate-200/90 shadow-md backdrop-blur-md">
                <p className="text-[11px] font-bold text-slate-800 leading-tight">
                  These challenges need a smarter way of working.
                </p>
                
                {/* Flow Sequence: Problem -> Data -> Intelligence -> Action */}
                <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-col gap-1 text-[9px] font-extrabold tracking-wider text-slate-500 uppercase">
                  <span className="text-red-600">Challenge</span>
                  <span className="text-slate-400 text-[8px]">↓</span>
                  <span className="text-cyan-600">Real-Time Data</span>
                  <span className="text-slate-400 text-[8px]">↓</span>
                  <span className="text-blue-600">AI Intelligence</span>
                  <span className="text-slate-400 text-[8px]">↓</span>
                  <span className="text-emerald-600">Action</span>
                </div>
              </div>

            </div>

            {/* Mobile Vertical Story Bridge Connector */}
            <div className="flex lg:hidden items-center justify-center w-full py-2">
              <div className="px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-center">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <span className="text-[#0067B1]">These challenges need a smarter way of working</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#00C9E4] rotate-90 sm:rotate-0" />
                </span>
              </div>
            </div>

          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* RIGHT SIDE: Our Solution (5 Cols on Desktop)                           */}
          {/* ----------------------------------------------------------------------- */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-[#00C9E4] via-[#0087CE] to-[#0067B1] text-white shadow-xl shadow-[#0067B1]/25 relative overflow-hidden"
          >
            {/* Ambient Background Glow in Card */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-cyan-100 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
                  OUR SOLUTION
                </span>
                <span className="text-xs font-bold text-white/70">Intelligent Ecosystem</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight mb-2 text-left">
                From Challenges to Smarter Decisions
              </h3>

              <p className="text-xs sm:text-sm text-white/90 font-medium leading-relaxed mb-4 text-left">
                UpCheck combines intelligent sensing, real-time monitoring, and actionable insights to help farmers understand their ponds and respond before small problems become major losses.
              </p>

              {/* 4 Solution Capability Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5 text-left">
                {solutions.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div 
                      key={idx}
                      className="p-3 rounded-2xl bg-white/12 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all duration-200 flex items-start gap-3 shadow-xs"
                    >
                      <div className="w-7 h-7 rounded-xl bg-white/20 text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-3.5 h-3.5 text-cyan-100" />
                      </div>
                      <div>
                        <div className="text-[9px] font-extrabold uppercase tracking-wider text-cyan-200 leading-none mb-0.5">
                          {item.badge}
                        </div>
                        <h4 className="text-xs font-bold text-white leading-snug">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-white/85 font-medium leading-tight mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Status Callout */}
            <div className="relative z-10 mt-5 pt-3 border-t border-white/20 flex items-center justify-between text-left text-white/80 text-[11px] font-semibold">
              <span>Outcome: Autonomous Clarity</span>
              <span className="text-white font-bold">Predictive Action</span>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
