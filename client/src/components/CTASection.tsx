import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FaAndroid, FaApple } from "react-icons/fa";
import { ArrowRight, Thermometer, Droplet, Shield, Wind, Calendar, ChevronDown, Wifi, Battery } from "lucide-react";
import { useRef } from "react";

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section 
      ref={ref} 
      className="relative py-20 px-6 overflow-hidden text-white" 
      style={{ background: "linear-gradient(90deg, #59b2d8 0%, #4a87b3 100%)" }}
      data-testid="section-cta"
    >
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/25 text-white text-xs font-semibold uppercase tracking-wider mb-6">
              <FaAndroid className="w-4 h-4 animate-bounce text-[#3DDC84]" />
              Available for Android
            </div>
            
            <h2 
              className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight leading-tight text-white"
              data-testid="text-cta-title"
            >
              Bring the Full Upcheck System to Your Farm
            </h2>
            <p className="text-base md:text-lg text-white/90 mb-8 leading-relaxed" data-testid="text-cta-subtitle">
              Monitor water parameters, manage feeding schedules, predict pond health, and configure critical alerts. Get our Android application to streamline your aquaculture workflows.
            </p>
            
            <div className="flex flex-wrap gap-4 items-center">
              {/* Premium Android App Download Button */}
              <a 
                href="#download-android" 
                className="inline-flex items-center gap-3 bg-white hover:bg-slate-50 text-slate-800 px-6 h-14 rounded-xl shadow-md transition-all duration-300 hover:scale-[1.03]"
                data-testid="button-cta-android-download"
              >
                <FaAndroid className="w-8 h-8 text-[#3DDC84]" />
                <div className="text-left leading-tight">
                  <div className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Get it for</div>
                  <div className="text-sm font-bold text-slate-800">Android Device</div>
                </div>
              </a>

              {/* Demo button */}
              <Button 
                size="lg" 
                variant="outline"
                className="h-14 px-6 gap-2 rounded-xl transition-all duration-300 hover:scale-[1.03] border-white/40 hover:border-white text-white bg-transparent hover:bg-white/10"
                data-testid="button-cta-demo"
              >
                Request a Demo
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>

            {/* Premium QR Code Container */}
            <div className="mt-8 flex items-center gap-5">
              <div className="relative w-24 h-24 bg-white border border-white/10 rounded-xl flex items-center justify-center p-2 shadow-sm">
                <div className="w-full h-full bg-slate-50 rounded-lg p-1.5 flex items-center justify-center">
                  <div className="w-full h-full grid grid-cols-5 grid-rows-5 gap-0.5">
                    {[...Array(25)].map((_, idx) => {
                      const filled = (idx * 7) % 3 === 0 || idx % 4 === 0 || idx < 5 || idx > 20 || idx % 5 === 0;
                      return (
                        <div 
                          key={idx} 
                          className={`rounded-sm ${filled ? 'bg-[#4a87b3]' : 'bg-transparent'}`} 
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="text-left max-w-xs">
                <h4 className="text-sm font-bold text-white">Scan to Instant Install</h4>
                <p className="text-xs text-white/85 mt-1">Point your camera to instantly load the Upcheck installer onto your Android phone.</p>
              </div>
            </div>
          </motion.div>

          {/* Interactive iPhone Mockup Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="relative flex justify-center items-center"
          >
            {/* iPhone Device Container */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-[310px] h-[600px] bg-slate-900 border-[10px] border-slate-950 rounded-[2.8rem] shadow-2xl flex flex-col overflow-hidden"
              style={{
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.45), inset 0 0 4px rgba(255, 255, 255, 0.25)",
              }}
              data-testid="mockup-iphone-dashboard"
            >
              {/* Silver Outer Rim highlight */}
              <div className="absolute inset-[-2px] border-2 border-slate-700/30 rounded-[2.7rem] pointer-events-none" />

              {/* Speaker notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-30 flex items-center justify-center">
                <div className="w-10 h-1 bg-slate-800 rounded-full mb-1.5" />
                <div className="w-2.5 h-2.5 bg-slate-900 rounded-full absolute right-6 top-1.5 border border-slate-950" />
              </div>

              {/* Status Bar */}
              <div className="h-9 px-6 pt-2 flex justify-between items-center text-[10px] text-[#111827] font-bold bg-[#F8FAFC] z-20 w-full relative">
                <div>9:00</div>
                <div className="flex items-center gap-1.5">
                  <Wifi className="w-3.5 h-3.5 text-[#111827]" />
                  <Battery className="w-4 h-4 text-[#111827]" />
                </div>
              </div>

              {/* Screen Body Content */}
              <div className="flex-1 bg-[#F8FAFC] px-5 py-4.5 flex flex-col justify-between text-[#111827] font-sans text-left z-10 overflow-y-auto space-y-4">
                
                {/* Greeting & Header */}
                <div className="space-y-2.5 mt-1">
                  <div>
                    <h3 className="text-[28px] font-bold leading-tight tracking-tight text-[#111827]">Hello, Farmer! 👋</h3>
                    <p className="text-[14px] text-[#6B7280] font-medium mt-0.5">Here's your pond overview</p>
                  </div>

                  {/* Filter & Date selector row */}
                  <div className="flex justify-between items-center text-[11px] font-bold">
                    {/* Pond Dropdown */}
                    <div className="flex items-center justify-between bg-white px-3 h-[36px] w-[95px] rounded-full border border-[#E5E7EB] shadow-xs cursor-pointer hover:bg-slate-50 text-[#111827]">
                      <span>Pond 1</span>
                      <ChevronDown className="w-3.5 h-3.5 text-[#6B7280]" />
                    </div>
                    {/* Time Display */}
                    <div className="flex items-center gap-1.5 text-[#6B7280] font-medium">
                      <Calendar className="w-3.5 h-3.5 text-[#9CA3AF]" /> Today, 7:45 AM
                    </div>
                  </div>
                </div>

                {/* Score Card */}
                <div className="bg-white p-5 rounded-[20px] border border-[#E5E7EB] shadow-xs flex justify-between items-center">
                  <div className="space-y-2.5">
                    <h4 className="text-[18px] text-[#111827] font-semibold tracking-tight">Pond Health Score</h4>
                    
                    <div className="flex items-baseline gap-1">
                      <span className="text-[42px] font-bold text-[#111827] leading-none">86</span>
                      <span className="text-[15px] text-[#6B7280]">/ 100</span>
                    </div>

                    <div className="inline-block text-[11px] bg-[#6CC28A]/15 text-[#6CC28A] px-2.5 py-0.5 rounded-full font-bold">
                      Good
                    </div>
                    
                    <div className="text-[12px] text-[#6B7280] leading-normal font-medium">
                      Stable conditions. Keep it up!
                    </div>
                  </div>

                  {/* Thicker Circular SVG Ring */}
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <circle
                        className="text-[#E5E7EB]"
                        strokeWidth="4.5"
                        stroke="currentColor"
                        fill="none"
                        cx="18"
                        cy="18"
                        r="14"
                      />
                      <circle
                        className="text-[#6CC28A]"
                        strokeWidth="4.5"
                        strokeDasharray="86, 100"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        cx="18"
                        cy="18"
                        r="14"
                      />
                    </svg>
                  </div>
                </div>

                {/* Parameters Card */}
                <div className="bg-white p-5 rounded-[20px] border border-[#E5E7EB] shadow-xs">
                  <h4 className="text-[18px] text-[#111827] font-semibold tracking-tight mb-4">Water Quality Summary</h4>
                  
                  <div className="grid grid-cols-4 gap-2 text-center">
                    {/* Temperature */}
                    <div className="flex flex-col items-center">
                      <div className="w-9 h-9 rounded-full bg-[#58B5F7]/10 flex items-center justify-center mb-2.5">
                        <Thermometer className="w-4.5 h-4.5 text-[#58B5F7] stroke-[1.5]" />
                      </div>
                      <div className="text-[12.5px] font-bold text-[#111827]">28.4 C</div>
                      <div className="text-[9px] text-[#6B7280] font-medium leading-tight mt-1">Temperature</div>
                    </div>
                    
                    {/* pH */}
                    <div className="flex flex-col items-center">
                      <div className="w-9 h-9 rounded-full bg-[#58B5F7]/10 flex items-center justify-center mb-2.5">
                        <Droplet className="w-4.5 h-4.5 text-[#58B5F7] stroke-[1.5]" />
                      </div>
                      <div className="text-[12.5px] font-bold text-[#111827]">7.6</div>
                      <div className="text-[9px] text-[#6B7280] font-medium leading-tight mt-1">pH</div>
                    </div>

                    {/* DO */}
                    <div className="flex flex-col items-center">
                      <div className="w-9 h-9 rounded-full bg-[#58B5F7]/10 flex items-center justify-center mb-2.5">
                        <Wind className="w-4.5 h-4.5 text-[#58B5F7] stroke-[1.5]" />
                      </div>
                      <div className="text-[12.5px] font-bold text-[#111827]">5.8</div>
                      <div className="text-[9px] text-[#6B7280] font-medium leading-tight mt-1">DO(mg/L)</div>
                    </div>

                    {/* Alkalinity */}
                    <div className="flex flex-col items-center">
                      <div className="w-9 h-9 rounded-full bg-[#58B5F7]/10 flex items-center justify-center mb-2.5">
                        <Shield className="w-4.5 h-4.5 text-[#58B5F7] stroke-[1.5]" />
                      </div>
                      <div className="text-[12.5px] font-bold text-[#111827]">120</div>
                      <div className="text-[9px] text-[#6B7280] font-medium leading-tight mt-1">Alkalinity</div>
                    </div>
                  </div>
                </div>

                {/* Trend Card */}
                <div className="bg-white p-5 rounded-[20px] border border-[#E5E7EB] shadow-xs flex-1 flex flex-col justify-between">
                  <h4 className="text-[18px] text-[#111827] font-semibold tracking-tight mb-2">Pond Trend (7 Days)</h4>
                  
                  {/* Trend Graph Area */}
                  <div className="h-20 w-full relative flex-1 flex items-center">
                    <svg className="w-full h-full min-h-[60px]" viewBox="0 0 100 40" preserveAspectRatio="none">
                      <path
                        d="M 0 30 Q 15 28, 30 20 T 60 15 T 80 25 T 100 28"
                        fill="none"
                        stroke="url(#chartGradient)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M 0 30 Q 15 28, 30 20 T 60 15 T 80 25 T 100 28 L 100 40 L 0 40 Z"
                        fill="url(#chartAreaGradient)"
                        opacity="0.15"
                      />
                      <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#58B5F7" />
                          <stop offset="100%" stopColor="#6CC28A" />
                        </linearGradient>
                        <linearGradient id="chartAreaGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#58B5F7" />
                          <stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  
                  <div className="flex justify-between text-[10px] text-[#6B7280] font-semibold mt-2 px-1">
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </div>
                </div>

              </div>

              {/* iPhone Home Indicator bar */}
              <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-28 h-1 bg-slate-900/40 rounded-full z-20" />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
