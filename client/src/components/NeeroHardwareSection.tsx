import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const neeroInWaterImg = "/attached_assets/neero-in-water.png";

export default function NeeroHardwareSection() {
  return (
    <section 
      className="relative py-10 md:py-14 px-6 bg-gradient-to-b from-white via-cyan-50/40 to-white overflow-hidden" 
      data-testid="section-neero-hardware"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute inset-0 bg-[radial-gradient(#00C9E4_1px,transparent_1px)] [background-size:32px_32px]" />
      </div>
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[500px] bg-[#00C9E4]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-black tracking-tight pb-2"
            style={{ 
              background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}
          >
            Meet Neero — The Hardware Behind UpCheck
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto font-medium mt-1 leading-relaxed"
          >
            The autonomous floating IoT buoy that lives in your shrimp pond, continuously measuring vital chemical and physical parameters with zero manual intervention.
          </motion.p>
        </div>

        {/* 2-Column Split: Hardware Visual + Story Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center max-w-5xl mx-auto">
          
          {/* LEFT: Neero Device Presentation */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 flex justify-center relative"
          >
            {/* Glowing Aura underneath device */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-[#00C9E4]/20 blur-[90px] pointer-events-none" />

            {/* Device Container Card */}
            <motion.div 
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full max-w-[480px] aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 group"
            >
              <img 
                src={neeroInWaterImg} 
                alt="UpCheck Neero Hardware Device floating in pond" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          </motion.div>

          {/* RIGHT: Storytelling & Technical Capabilities */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            <div className="space-y-4">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
                <span className="text-[#0067B1]">
                  Continuous Pond Sensing,
                </span> <br />
                <span className="bg-gradient-to-r from-[#00C9E4] to-[#0067B1] bg-clip-text text-transparent">
                  Engineered for Aquaculture.
                </span>
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                Traditional water testing is manual, infrequent, and slow. <strong>Neero</strong> floats freely in your pond, taking continuous electrochemical measurements every minute and transmitting them directly to the cloud without needing external power outlets or manual battery swaps.
              </p>
            </div>

            {/* Next Step CTA */}
            <div className="pt-2">
              <Link href="/products">
                <Button 
                  className="bg-gradient-to-r from-[#00C9E4] to-[#0067B1] hover:from-[#00b5cd] hover:to-[#005a9c] text-white font-bold px-6 py-3 rounded-xl text-sm gap-2 shadow-lg shadow-[#0067B1]/20 hover:scale-105 active:scale-95 transition-all"
                >
                  <span>Explore Hardware Specifications</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
