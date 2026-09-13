import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PricingSection from "@/components/PricingSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/**
 * Pricing page.
 *
 * Welcoming first: Neerani is free to start, and Neero is coming soon with pricing
 * shared at launch. Honest about stage, without making farmers feel they are being
 * sold to or warned off.
 */

const handVsNeero: { task: string; byHand: string; withNeero: string }[] = [
  {
    task: "Water readings",
    byHand: "Someone tests with a kit, usually once or twice a day, and types the result into Neerani.",
    withNeero: "Readings every 15 minutes, day and night, arriving in Neerani on their own.",
  },
  {
    task: "The night shift",
    byHand: "Someone walks the pond bank in the dark to check oxygen and aerators.",
    withNeero: "An alert on your phone when oxygen heads toward the danger line.",
  },
  {
    task: "Calibration",
    byHand: "Probes drift and have to be recalibrated by hand, or they quietly start lying.",
    withNeero: "Neero calibrates itself.",
  },
  {
    task: "Worn-out sensors",
    byHand: "Replace the meter.",
    withNeero: "Swap the sensor cartridge on the underside. The buoy stays.",
  },
  {
    task: "No signal at the pond",
    byHand: "Log offline in Neerani and let it sync later.",
    withNeero: "The buoy stores readings and sends them over mobile data or a long-range link.",
  },
];

const questions = [
  {
    q: "Is Neerani really free?",
    a: "Yes. Every farm, every pond, every feature in the app today. We may add paid plans for advanced features later, and if we do we will say so clearly before anything changes.",
  },
  {
    q: "Do I need Neero to use Neerani?",
    a: "No. Neerani works fully on its own: you log readings by hand and the app does the rest. Neero takes the water readings off your hands once it ships.",
  },
  {
    q: "What will Neero cost?",
    a: "We'll share Neero pricing closer to launch. We're working on options that suit different farm sizes, including buying outright or leasing for a season, so it fits the way you already budget a crop.",
  },
  {
    q: "Can I take my records with me?",
    a: "Yes. Neerani exports the farm record to a file that an accountant, a buyer or a certifier can read.",
  },
  {
    q: "Can my consultant or lender see the farm?",
    a: "Yes, for free. Give them a viewer login: they can read the record without changing anything, and money is only visible if you allow it.",
  },
  {
    q: "How do I start?",
    a: "Neerani is in closed testing on Google Play with more than 100 testers. Request access and we will add you to the tester list.",
  },
];

function HandVsNeero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const rail = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} className="px-6 py-24 md:py-32 bg-slate-950 text-white" aria-labelledby="hand-vs-neero">
      <div className="container mx-auto max-w-6xl grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12 md:gap-20">
        {/* Pinned while the comparison scrolls past */}
        <div>
          <div className="md:sticky md:top-32">
            <h2 id="hand-vs-neero" className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              What Neero adds to your farm
            </h2>
            <p className="mt-5 text-lg text-white/65 leading-relaxed max-w-[42ch]">
              Neerani on its own is a complete farm record. Neero is for the part of the job that happens in the
              water, around the clock, whether or not anyone is awake.
            </p>
            <p className="mt-6 text-sm text-amber-300 max-w-[42ch]">
              Neero is in development, with pond trials coming up. Ask us if you'd like to take part.
            </p>

            {!reduce && (
              <div className="hidden md:block mt-10 h-1 w-48 rounded-full bg-white/10 overflow-hidden" aria-hidden="true">
                <motion.div className="h-full bg-[#00C9E4]" style={{ width: rail }} />
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="hidden sm:grid grid-cols-2 gap-6 pb-4 border-b border-white/15 text-sm text-white/50">
            <span>With Neerani alone</span>
            <span>With Neero added</span>
          </div>
          {handVsNeero.map((row, i) => (
            <motion.div
              key={row.task}
              initial={reduce ? false : { opacity: 0.25 }}
              whileInView={{ opacity: 1 }}
              viewport={{ amount: 0.8, margin: "-10% 0px -30% 0px" }}
              transition={{ duration: 0.4 }}
              className="py-10 border-b border-white/10"
            >
              <h3 className="text-xl md:text-2xl font-bold">{row.task}</h3>
              <div className="mt-4 grid sm:grid-cols-2 gap-6">
                <div>
                  <span className="sm:hidden block text-xs text-white/45 mb-1">With Neerani alone</span>
                  <p className="text-white/60 leading-relaxed">{row.byHand}</p>
                </div>
                <div>
                  <span className="sm:hidden block text-xs text-white/45 mb-1">With Neero added</span>
                  <p className="leading-relaxed text-white">{row.withNeero}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Pricing() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Navigation />

      <main>
        <section className="px-6 pt-36 md:pt-44 pb-4">
          <div className="container mx-auto max-w-5xl">
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.04] text-slate-900 dark:text-white max-w-[18ch]"
            >
              Start free. Add a sensor when you're ready.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mt-6 text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-[58ch]"
            >
              Neerani, the shrimp farm manager app, costs nothing to use on every pond you run. Neero, our pond sensor, is on its way, and you can ask to join its first pond trials.
            </motion.p>
          </div>
        </section>

        <PricingSection />

        <HandVsNeero />

        <section className="px-6 py-24 md:py-32" aria-labelledby="pricing-questions">
          <div className="container mx-auto max-w-3xl">
            <h2
              id="pricing-questions"
              className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white"
            >
              Questions about cost
            </h2>
            <Accordion type="single" collapsible className="mt-10">
              {questions.map((item, i) => (
                <AccordionItem key={item.q} value={`q-${i}`} className="border-b border-slate-200 dark:border-slate-800">
                  <AccordionTrigger className="text-left text-lg font-semibold py-5 hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-slate-600 dark:text-slate-300 leading-relaxed pb-6">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-14 flex flex-wrap items-center gap-6">
              <Link
                href="/download"
                className="rounded-full px-7 py-3.5 text-[15px] font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0067B1]"
                style={{ background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)" }}
              >
                Request beta access
              </Link>
              <Link
                href="/contact?subject=demo"
                className="text-[15px] font-medium text-slate-900 dark:text-white underline underline-offset-4"
              >
                Ask about Neero pilots
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
