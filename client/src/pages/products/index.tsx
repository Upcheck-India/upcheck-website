import { useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { IconWaterDrop } from "@/components/icons";
import {
  detailedSections,
  alsoInNeerani,
  reasons,
  flowNodes,
  bubbleConfigs,
  yellowDeviceImg,
  appScreenshotImg,
  traceabilityPlaceholderImg,
} from "./data";
import { useProductsMotion } from "./motion";
import Magnetic from "./Magnetic";
import PremiumCard from "./PremiumCard";
import MasonryShowcase from "./MasonryShowcase";

export default function Products() {
  const pageRef = useRef<HTMLDivElement>(null);
  useProductsMotion(pageRef);

  return (
    <div ref={pageRef} className="min-h-screen bg-site-gradient relative overflow-hidden">
      <Navigation />

      {/* Decorative ambient background overlays */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Fine-grained dotted pattern grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#00c9e40c_1.5px,transparent_1.5px)] [background-size:32px_32px] opacity-90" />

        {/* Flowing water current — two identical waves, translated seamlessly */}
        <svg
          className="absolute top-[20%] left-0 w-full h-[600px] opacity-10 pointer-events-none"
          viewBox="0 0 2800 300"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          <g className="js-wave-group will-change-transform">
            <path d="M-100,150 C150,250 350,50 600,150 C850,250 1050,50 1300,150" stroke="#00C9E4" strokeWidth="1.5" />
            <path d="M1300,150 C1550,250 1750,50 2000,150 C2250,250 2450,50 2700,150" stroke="#00C9E4" strokeWidth="1.5" />
          </g>
        </svg>

        {/* Floating background bubble particles */}
        {bubbleConfigs.map((bubble, i) => (
          <div
            key={i}
            className="js-bubble absolute rounded-full border border-white/20 dark:border-white/5 bg-gradient-to-tr from-[#00C9E4]/10 to-transparent pointer-events-none will-change-transform"
            style={{
              width: bubble.size,
              height: bubble.size,
              left: `${bubble.left}%`,
              bottom: "-10%",
            }}
          />
        ))}

        {/* Floating gradient mesh blur circles */}
        <div className="js-mesh absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-gradient-to-br from-[#00C9E4]/10 to-transparent blur-[80px] pointer-events-none will-change-transform" />
        <div className="js-mesh absolute top-[35%] -right-[5%] w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] rounded-full bg-gradient-to-br from-[#0067B1]/8 to-transparent blur-[100px] pointer-events-none will-change-transform" />
        <div className="js-mesh absolute -bottom-[10%] left-[15%] w-[40vw] h-[40vw] max-w-[450px] max-h-[450px] rounded-full bg-gradient-to-br from-[#90E0EF]/12 to-transparent blur-[90px] pointer-events-none will-change-transform" />
      </div>

      <main className="relative z-10 pt-24 md:pt-28 pb-20 space-y-10 md:space-y-16">

        {/* 1. HERO */}
        <section className="relative w-full pt-4 pb-6 md:pt-8 md:pb-8 px-4 sm:px-6 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[320px] bg-gradient-to-r from-[#00C9E4]/12 via-[#0067B1]/8 to-[#00C9E4]/12 blur-[100px] pointer-events-none" />

          <div className="container mx-auto max-w-5xl text-center relative z-10 space-y-6">
            <div className="js-hero-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 shadow-2xs">
              <IconWaterDrop className="w-3.5 h-3.5 text-[#0067B1]" />
              <span className="text-[10px] font-extrabold tracking-[0.2em] text-[#0067B1] uppercase">
                COMPLETE AQUACULTURE PLATFORM
              </span>
            </div>

            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.15]"
              style={{
                background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              <span className="js-hero-line block">Everything you need to</span>
              <span className="js-hero-line block">run a smarter farm</span>
            </h1>

            {/* Water line that draws itself under the headline */}
            <svg
              className="js-hero-wave mx-auto h-6 w-[min(512px,88%)] overflow-visible"
              viewBox="0 0 512 24"
              fill="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="heroWaveGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#00C9E4" stopOpacity="0" />
                  <stop offset="25%" stopColor="#00C9E4" />
                  <stop offset="75%" stopColor="#0067B1" />
                  <stop offset="100%" stopColor="#0067B1" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                className="js-hero-wave-path"
                d="M4 12c28-9 56-9 84 0s56 9 84 0 56-9 84 0 56 9 84 0 56-9 84 0"
                stroke="url(#heroWaveGradient)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>

            <p className="js-hero-sub text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
              Upcheck brings monitoring, feeding, analytics, and risk alerts together in one connected experience built for aquaculture teams.
            </p>
          </div>
        </section>

        {/* 2. OUR PRODUCTS */}
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 space-y-16 md:space-y-24">

          {/* Section 1: Neero IoT Monitoring Device (Hardware) */}
          <div className="js-reveal">
            <PremiumCard className="p-8 md:p-14">
              <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                <div className="js-from-left lg:col-span-6 flex items-center justify-center relative min-h-[380px]">
                  {/* Pulsing signal rings representing IoT live data broadcasts */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                    <div className="js-signal-ring absolute w-60 h-60 rounded-full border-2 border-[#00C9E4]/25 will-change-transform" />
                    <div className="js-signal-ring absolute w-60 h-60 rounded-full border border-[#0067B1]/15 will-change-transform" />
                  </div>

                  <div className="absolute w-80 h-80 rounded-full bg-gradient-to-br from-[#00C9E4]/15 to-[#0067B1]/8 blur-[70px] pointer-events-none" />
                  <img
                    src={yellowDeviceImg}
                    alt="IoT monitoring device"
                    className="js-float-device max-h-[380px] w-auto object-contain relative z-10 drop-shadow-2xl rounded-3xl border border-slate-200/40 shadow-xl will-change-transform transition-transform duration-300 hover:scale-[1.04]"
                  />
                </div>
                <div className="js-from-right lg:col-span-6 space-y-6 text-left">
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
                    Neero is a solar-assisted floating sensor that sits in the shrimp pond and tracks the water
                    readings that matter most to shrimp health — pH, dissolved oxygen and temperature — sending them
                    into the Neerani app. The sensors live in a cartridge on the underside that can be swapped out, it
                    calibrates itself, and it wakes only when a reading is due, for an expected battery life of about
                    90 days. Where mobile coverage is weak, a long-range link carries the data instead.
                  </p>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    <strong className="text-slate-700">Where it stands:</strong> we are validating the sensing stack on
                    the bench. Pond trials are the next milestone, and pricing will be announced alongside them. The
                    image shown is a design render, not a deployed unit.
                  </p>
                </div>
              </div>
            </PremiumCard>
          </div>

          {/* Section 2: Neerani mobile app (Software) */}
          <div className="js-reveal">
            <PremiumCard className="p-8 md:p-14">
              <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                <div className="js-from-left lg:col-span-6 space-y-6 text-left order-2 lg:order-1">
                  <Badge className="bg-blue-500/10 text-blue-600 border border-blue-500/20 px-3.5 py-1 text-xs font-semibold rounded-full shadow-2xs">
                    Software
                  </Badge>
                  <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight">
                    UpCheck Mobile Application
                  </h3>
                  <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium">
                    Neerani is where the whole farm is recorded: water readings, feed by meal, tray leftovers, deaths, treatments, stock and money. It works without signal at the pond bank, in six languages, and turns the record into feeding guidance and disease-risk checks that show what they were worked out from. Once Neero ships, its readings will flow into the same app.
                  </p>

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
                        style={{ background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)", border: "none" }}
                      >
                        <span>Get the App</span>
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </a>
                  </div>
                </div>

                <div className="js-from-right lg:col-span-6 flex items-center justify-center relative min-h-[460px] order-1 lg:order-2">
                  <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-[#00C9E4]/20 via-[#0067B1]/15 to-transparent blur-[70px] pointer-events-none" />

                  <div className="js-float-phone relative z-10 w-[270px] sm:w-[290px] rounded-[44px] p-2.5 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-950 shadow-[0_25px_60px_-15px_rgba(0,103,177,0.35)] border border-slate-600/50 will-change-transform transition-transform duration-300 hover:scale-[1.02]">
                    <div className="relative rounded-[36px] overflow-hidden bg-white border-2 border-slate-900/80 aspect-[9/18.5] shadow-inner">
                      <div className="absolute top-2.5 inset-x-0 z-30 flex justify-center pointer-events-none">
                        <div className="w-24 h-4 bg-slate-950 rounded-full flex items-center justify-end px-2.5">
                          <div className="w-2 h-2 rounded-full bg-slate-800" />
                        </div>
                      </div>
                      <img
                        src={appScreenshotImg}
                        alt="UpCheck Mobile Application Interface"
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none z-20" />
                    </div>
                  </div>
                </div>
              </div>
            </PremiumCard>
          </div>

          {/* Section 2b: What Neerani does on a working farm */}
          <section aria-labelledby="neerani-features" className="space-y-10">
            <div className="js-reveal max-w-3xl">
              <h2
                id="neerani-features"
                className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white"
              >
                What Neerani does on a working farm
              </h2>
              <p className="mt-3 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                Neerani is a shrimp farm manager: the daily record of every pond, and the tools for running the farm
                as a business around it.
              </p>
            </div>

            <div className="js-detail-grid grid md:grid-cols-2 gap-6">
              {detailedSections.map((section) => (
                <div
                  key={section.name}
                  className="js-detail-card rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-7 md:p-8"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-cyan-500/10 border border-cyan-500/20 p-2.5 text-[#0067B1]">
                      <section.icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{section.name}</h3>
                  </div>
                  <p className="mt-4 text-slate-600 dark:text-slate-300 leading-relaxed">{section.description}</p>
                  <ul className="mt-4 space-y-2">
                    {section.points.map((point) => (
                      <li key={point} className="flex gap-2 text-sm text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-[#00C9E4]" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="js-reveal rounded-3xl bg-slate-900 dark:bg-slate-950 p-7 md:p-10">
              <h3 className="text-2xl font-bold text-white">And the rest of running the farm</h3>
              <dl className="js-also-grid mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-7">
                {alsoInNeerani.map((item) => (
                  <div key={item.title} className="js-also-item border-t border-white/15 pt-4">
                    <dt className="font-semibold text-white">{item.title}</dt>
                    <dd className="mt-1.5 text-sm text-white/65 leading-relaxed">{item.text}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="js-reasons grid md:grid-cols-3 gap-8 pt-2">
              {reasons.map((reason) => (
                <div key={reason.title} className="js-reason">
                  <reason.icon className="w-6 h-6 text-[#0067B1]" />
                  <h3 className="mt-3 text-lg font-bold text-slate-900 dark:text-white">{reason.title}</h3>
                  <p className="mt-2 text-slate-600 dark:text-slate-300 leading-relaxed">{reason.description}</p>
                </div>
              ))}
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
              Several of these, like the banned-substance warning and feeding to tray leftovers, matter as much for the
              animals as for the farm.{" "}
              <a href="/welfare" className="font-semibold text-[#0067B1] underline underline-offset-4">
                Read how Neerani supports shrimp welfare
              </a>
              .
            </p>
          </section>

          {/* Section 2c: The connected system — pinned, scrubbed data flow (desktop) */}
          <section aria-labelledby="flow-title" className="relative">
            <div className="js-flow-pin max-w-6xl mx-auto">
              <div className="max-w-3xl mb-10 md:mb-14">
                <h2
                  id="flow-title"
                  className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white"
                >
                  From the pond to your pocket
                </h2>
                <p className="mt-3 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                  One connected system: Neero takes the readings, the cloud keeps them, and Neerani puts them to work —
                  even where the signal isn't.
                </p>
              </div>

              {/* Desktop: nodes along a drawn water line, scrubbed by scroll */}
              <div className="js-flow-stage relative hidden lg:block h-[230px]">
                <svg
                  className="absolute left-0 top-0 w-full h-12 overflow-visible"
                  viewBox="0 0 1000 48"
                  preserveAspectRatio="none"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    className="js-flow-path"
                    d="M100 24C170 2 280 2 350 24S580 46 650 24S820 2 900 24"
                    stroke="#00C9E4"
                    strokeOpacity="0.55"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <circle className="js-flow-dot" r="5" fill="#00C9E4" />
                </svg>

                {flowNodes.map((node, i) => (
                  <div
                    key={node.step}
                    className="js-flow-node absolute top-0 w-[180px] text-center will-change-transform"
                    style={{ left: `${10 + i * 30}%`, transform: "translateX(-50%)" }}
                  >
                    <div className="mx-auto w-12 h-12 rounded-2xl bg-white border border-cyan-200 shadow-md flex items-center justify-center text-[#0067B1]">
                      <node.icon className="w-6 h-6" />
                    </div>
                    <div className="js-flow-caption mt-3">
                      <p className="text-[10px] font-extrabold tracking-[0.18em] text-[#00C9E4]">{node.step}</p>
                      <h3 className="mt-1 text-sm font-bold text-slate-900">{node.title}</h3>
                      <p className="mt-1 text-xs text-slate-500 leading-relaxed">{node.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile: the same story as a simple grid */}
              <div className="js-flow-mobile lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-5">
                {flowNodes.map((node) => (
                  <div
                    key={node.step}
                    className="js-flow-mobile-node flex gap-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5"
                  >
                    <div className="shrink-0 w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-[#0067B1]">
                      <node.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-extrabold tracking-[0.18em] text-[#00C9E4]">{node.step}</p>
                      <h3 className="mt-0.5 text-sm font-bold text-slate-900 dark:text-white">{node.title}</h3>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{node.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-8 text-sm text-slate-500 dark:text-slate-400">
                Neerani is live on Google Play today. Neero is in development — a bench prototype today, pond trials
                next.
              </p>
            </div>
          </section>

          {/* Section 3: Transforming Every Pond into Actionable Insights (Intelligence) */}
          <div className="js-reveal">
            <PremiumCard className="p-8 md:p-14">
              <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                <div className="js-from-left lg:col-span-6 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,201,228,0.14),_transparent_70%)] opacity-100 pointer-events-none" />
                  <div className="js-analytics w-full rounded-3xl border border-slate-200/80 bg-white/70 dark:bg-black/25 p-6 md:p-8 relative overflow-hidden shadow-xl backdrop-blur-md">
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
                          <p className="text-2xl font-black text-[#00C9E4]">
                            <span className="js-counter" data-value="7.4" data-decimals="1">7.4</span> mg/L
                          </p>
                          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mt-2 overflow-hidden">
                            <div className="js-stat-bar h-full w-[85%] bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full will-change-transform" />
                          </div>
                        </div>
                        <div className="p-4 bg-white/80 dark:bg-black/20 rounded-2xl border border-slate-200/70 shadow-xs">
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">pH Level</p>
                          <p className="text-2xl font-black text-[#0067B1]">
                            <span className="js-counter" data-value="8.2" data-decimals="1">8.2</span> pH
                          </p>
                          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mt-2 overflow-hidden">
                            <div className="js-stat-bar h-full w-[90%] bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full will-change-transform" />
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
                            <path
                              className="js-chart-line"
                              d="M0,15 C20,25 40,5 60,18 C80,2 90,15 100,8"
                              fill="none"
                              stroke="url(#pondChartGradientSection3)"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                            <circle className="js-chart-dot" cx="60" cy="18" r="2" fill="#00C9E4" stroke="white" strokeWidth="0.5" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="js-from-right lg:col-span-6 space-y-6 text-left">
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
                </div>
              </div>
            </PremiumCard>
          </div>

          {/* Why Choose Upcheck — Premium Light Masonry Showcase */}
          <div className="js-reveal">
            <MasonryShowcase />
          </div>

          {/* Standalone Traceability Solution Section */}
          <div className="js-reveal">
            <PremiumCard className="p-8 md:p-14">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center text-left">
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
                    <button className="p-0 h-auto font-bold text-[#0067B1] hover:text-[#005a9c] gap-2 inline-flex items-center group cursor-pointer border-none bg-transparent text-base">
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-6 relative z-10 rounded-2xl overflow-hidden border border-slate-200/80 bg-white p-3 shadow-md group cursor-pointer">
                  <img
                    src={traceabilityPlaceholderImg}
                    alt="Shrimp Traceability Supply Chain Concept"
                    className="w-full h-auto object-cover rounded-xl group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>
              </div>
            </PremiumCard>
          </div>

          {/* Call to Action Banner */}
          <section className="js-reveal">
            <Card className="overflow-hidden border border-white/15 bg-gradient-to-r from-[#00C9E4] to-[#0067B1] shadow-2xl rounded-[24px] transition-all duration-500 hover:-translate-y-1.5 group relative text-white">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_65%)] opacity-80 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
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
                    <Magnetic>
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
                    </Magnetic>

                    <Magnetic>
                      <a href="/contact">
                        <Button
                          size="lg"
                          variant="outline"
                          className="border-white/30 text-white bg-transparent hover:bg-white/10 hover:border-white/50 hover:scale-105 active:scale-95 hover:shadow-lg transition-all duration-300"
                        >
                          View Contact Options
                        </Button>
                      </a>
                    </Magnetic>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
