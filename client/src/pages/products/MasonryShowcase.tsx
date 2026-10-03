import { ArrowRight } from "lucide-react";
import { IconWaterDrop } from "@/components/icons";
import PremiumCard from "./PremiumCard";
import {
  diseaseShrimpImg,
  platformAccuracyImg,
  aquaculturePensImg,
  fishermanBoatImg,
  liveAnalyticsSeaImg,
  aiFeedingSeaweedImg,
  shrimpHarvestImg,
} from "./data";

/** "Why Choose Upcheck?" — batched masonry entrances are driven from motion.ts. */
export default function MasonryShowcase() {
  return (
    <div className="relative">
      <PremiumCard className="p-6 md:py-16 md:px-12 relative overflow-hidden">
        <div className="relative z-10 space-y-12">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3 pb-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-50 border border-cyan-200/80 shadow-2xs">
              <IconWaterDrop className="w-3.5 h-3.5 text-[#0067B1]" />
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
          </div>

          {/* Asymmetrical Masonry Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">

            {/* Card 1: Disease Prevention */}
            <div className="js-masonry-card relative rounded-[24px] overflow-hidden group shadow-md hover:shadow-2xl border border-slate-200/80 hover:border-[#00C9E4]/60 h-[210px] cursor-pointer transition-all duration-400 ease-out hover:-translate-y-1.5 hover:scale-[1.015]">
              <img
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
            </div>

            {/* Card 2: Statistics Card (Platform Accuracy) */}
            <div className="js-masonry-card relative rounded-[24px] overflow-hidden group shadow-md hover:shadow-2xl border border-slate-200/80 hover:border-[#00C9E4]/70 h-[210px] cursor-pointer transition-all duration-400 ease-out hover:-translate-y-1.5 hover:scale-[1.015]">
              <img
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
                    <span className="js-counter" data-value="15">15</span>
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
            </div>

            {/* Card 3: Hero Card (Largest, spans 2 rows on desktop) */}
            <div className="js-masonry-card relative rounded-[24px] overflow-hidden group shadow-md hover:shadow-2xl border border-slate-200/80 hover:border-[#00C9E4]/70 h-[444px] cursor-pointer md:col-span-1 md:row-span-2 transition-all duration-400 ease-out hover:-translate-y-1.5 hover:scale-[1.015]">
              <img
                src={aquaculturePensImg}
                alt="UpCheck Aquaculture Site"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-slate-950/20 z-10 transition-opacity duration-500 group-hover:opacity-90" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end z-20 text-left">
                <div className="space-y-2 transform transition-transform duration-300 group-hover:-translate-y-1">
                  <span className="text-[#00C9E4] text-[10px] font-extrabold uppercase tracking-widest block">
                    Complete Ecosystem
                  </span>
                  <h4 className="text-white text-2xl font-black tracking-tight leading-tight uppercase group-hover:text-cyan-100 transition-colors">
                    Every Pond.<br />Connected.<br />Intelligent.
                  </h4>
                  <p className="text-white/80 text-xs font-medium leading-relaxed pt-1 border-t border-white/15">
                    Autonomous sensor arrays tracking 24/7.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 4: Farmer Experience */}
            <div className="js-masonry-card relative rounded-[24px] overflow-hidden group shadow-md hover:shadow-2xl border border-slate-200/80 hover:border-[#00C9E4]/60 h-[210px] cursor-pointer md:col-span-2 transition-all duration-400 ease-out hover:-translate-y-1.5 hover:scale-[1.015]">
              <img
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
            </div>

            {/* Card 5: Circular Dashboard Chart Card (Live Analytics) */}
            <div className="js-masonry-card relative rounded-[24px] overflow-hidden group shadow-md hover:shadow-2xl border border-slate-200/80 hover:border-[#00C9E4]/60 h-[210px] cursor-pointer transition-all duration-400 ease-out hover:-translate-y-1.5 hover:scale-[1.015]">
              <img
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
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="js-fcr-ring text-[#00C9E4]"
                        strokeWidth="4"
                        strokeDasharray="60, 100"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
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
            </div>

            {/* Card 6: Feed advisor */}
            <div className="js-masonry-card relative rounded-[24px] overflow-hidden group shadow-md hover:shadow-2xl border border-slate-200/80 hover:border-[#00C9E4]/60 h-[210px] cursor-pointer transition-all duration-400 ease-out hover:-translate-y-1.5 hover:scale-[1.015]">
              <img
                src={aiFeedingSeaweedImg}
                alt="Feed pellets in pond water"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/45 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-85" />
              <div className="absolute inset-0 p-5 flex flex-col justify-end z-20 text-left">
                <div className="space-y-1 transform transition-transform duration-300 group-hover:-translate-y-1">
                  <span className="text-[#00C9E4] text-[10px] font-extrabold uppercase tracking-widest block">
                    Feed advisor
                  </span>
                  <h4 className="text-white text-lg font-extrabold tracking-tight group-hover:text-cyan-100 transition-colors">
                    Precision feeding.
                  </h4>
                  <p className="text-white/85 text-xs font-medium">
                    Adjusted to what's left on the tray.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 7: Better Harvest */}
            <div className="js-masonry-card relative rounded-[24px] overflow-hidden group shadow-md hover:shadow-2xl border border-slate-200/80 hover:border-[#00C9E4]/60 h-[210px] cursor-pointer transition-all duration-400 ease-out hover:-translate-y-1.5 hover:scale-[1.015]">
              <img
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
            </div>

          </div>
        </div>
      </PremiumCard>
    </div>
  );
}
