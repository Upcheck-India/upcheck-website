import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { QrCode, ArrowRight, Smartphone, Sparkles } from "lucide-react";
import { FaAndroid, FaGooglePlay } from "react-icons/fa";

const appScreenImg = "/attached_assets/upcheck-farm-app.jpg";

export default function AppSection() {
  return (
    <section 
      className="relative py-10 md:py-14 px-6 bg-gradient-to-r from-[#00C9E4] via-[#0089C7] to-[#0067B1] text-white overflow-hidden" 
      data-testid="section-app-showcase"
    >
      {/* Subtle Background Lighting & Water Ripple Overlays */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.2),_transparent_60%)] opacity-80" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-70" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-cyan-300/20 blur-[100px]" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center max-w-5xl mx-auto">
          
          {/* LEFT COLUMN: Narrative & App Actions */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Story Eyebrow Badge */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-xs sm:text-sm font-semibold text-cyan-100 italic">
                "But Neero doesn't work alone."
              </span>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 border border-white/30 text-white text-[10px] font-extrabold tracking-wider uppercase backdrop-blur-md shadow-xs">
                <FaAndroid className="w-3.5 h-3.5 text-[#3DDC84]" />
                <span>AN APP AT YOUR HANDS</span>
              </div>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight leading-[1.15] text-white drop-shadow-sm">
                Your pond. Your data. <br />
                Your decisions—all in one place.
              </h2>
              <p className="text-sm sm:text-base text-white/90 leading-relaxed font-medium max-w-xl">
                Monitor water parameters, manage feeding schedules, predict pond health, and configure critical alerts. Get our Android application to streamline your aquaculture workflows.
              </p>
            </div>

            {/* Action Buttons Row */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              {/* Android Download Button */}
              <Link href="/download">
                <Button 
                  size="lg" 
                  className="h-12 px-6 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs sm:text-sm gap-3 shadow-xl shadow-black/20 hover:scale-105 active:scale-95 transition-all border-none"
                  data-testid="btn-get-android-app"
                >
                  <FaAndroid className="w-5 h-5 text-[#3DDC84]" />
                  <div className="text-left">
                    <div className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold leading-none">
                      GET IT FOR
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-slate-950 leading-tight">
                      Android Device
                    </div>
                  </div>
                </Button>
              </Link>

              {/* Request a Demo Button */}
              <Link href="/contact">
                <Button 
                  size="lg"
                  variant="outline"
                  className="h-12 px-6 rounded-2xl bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold text-xs sm:text-sm gap-2 backdrop-blur-md shadow-lg hover:scale-105 active:scale-95 transition-all"
                  data-testid="btn-request-demo"
                >
                  <span>Request a Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* QR Code Instant Install Box */}
            <div className="pt-2 max-w-md">
              <div className="p-3.5 rounded-2xl bg-white/15 border border-white/25 backdrop-blur-md flex items-center gap-4 shadow-md">
                {/* QR Code Icon Container */}
                <div className="w-13 h-13 bg-white rounded-xl p-1.5 flex items-center justify-center shrink-0 shadow-sm">
                  <div className="w-full h-full bg-slate-900 rounded-lg flex items-center justify-center p-1 text-white">
                    <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14 2h2v4h-2v-4zm-4-2h2v2h-2v-2zm2 2h2v2h-2v-2zm-2 2h2v2h-2v-2zm4-2h2v2h-2v-2zm2-2h2v2h-2v-2zm0 4h2v2h-2v-2zm-6-4h2v2h-2v-2zm2-2h2v2h-2v-2zM6 6h2v2H6V6zm12 0h2v2h-2V6zM6 18h2v2H6v-2z" />
                    </svg>
                  </div>
                </div>
                
                {/* QR Instructions */}
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                    Scan to Instant Install
                  </h4>
                  <p className="text-[11px] text-white/80 leading-snug mt-0.5">
                    Point your camera to instantly load the Upcheck Installer onto your Android phone.
                  </p>
                </div>
              </div>
            </div>

          </motion.div>

          {/* RIGHT COLUMN: Realistic Smartphone Mockup */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.92, y: 25 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="lg:col-span-5 flex items-center justify-center relative"
          >
            {/* Ambient Back Glow */}
            <div className="absolute w-72 h-72 rounded-full bg-cyan-300/30 blur-[80px] pointer-events-none" />

            {/* Phone Frame */}
            <div 
              className="relative h-[460px] sm:h-[500px] aspect-[9/19] rounded-[42px] bg-slate-950 p-2.5 shadow-2xl border-[4px] border-slate-700 ring-1 ring-white/20 flex flex-col justify-between overflow-hidden group"
              style={{
                boxShadow: "0 25px 60px -12px rgba(0, 0, 0, 0.6), 0 0 35px rgba(0, 201, 228, 0.3)",
              }}
            >
              {/* Glass Glare */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none z-20 rounded-[38px]" />

              {/* Top Camera Notch */}
              <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-16 h-3.5 bg-black rounded-full z-30 flex items-center justify-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-slate-900 border border-slate-800" />
                <div className="w-1 h-1 rounded-full bg-blue-900/80" />
              </div>

              {/* App Screen Content */}
              <div className="relative w-full h-full rounded-[32px] overflow-hidden bg-white shadow-inner flex flex-col">
                <img
                  src={appScreenImg}
                  alt="Upcheck Mobile App Dashboard"
                  className="w-full h-full object-cover object-top select-none pointer-events-none group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>

              {/* Bottom Home Indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/40 rounded-full z-30" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
