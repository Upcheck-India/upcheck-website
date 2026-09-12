import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Cpu, Radio, Database, Brain, Smartphone, ShieldCheck } from "lucide-react";

/**
 * Technology page.
 *
 * Written for two readers: an aquaculture engineer who wants to know whether the
 * hardware is real, and a cloud-programme reviewer who wants to know what
 * workload they would be underwriting. Every figure is either a measured fact,
 * a stated design target, or an explicitly labelled projection.
 */

const stages = [
  {
    icon: Cpu,
    stage: "Edge",
    title: "Neero — the pond node",
    status: "Bench prototype",
    body:
      "A sealed floating buoy carrying pH, dissolved oxygen and temperature probes. It runs from a small solar panel into a Li-ion cell, and spends almost all of its life asleep: the MCU wakes on a timer, powers the probe rail, takes a burst of readings, medians them to reject splash noise, writes the result to local flash, and drops back to deep sleep.",
    detail: [
      ["Target sample interval", "15 min (configurable 5–60 min)"],
      ["Duty cycle", "~8–12 s awake per cycle"],
      ["Payload per reading", "~80 bytes packed binary"],
      ["Local buffer", "~30 days of readings in flash"],
    ],
  },
  {
    icon: Radio,
    stage: "Transport",
    title: "GSM with store-and-forward",
    status: "Design validated on bench",
    body:
      "Ponds are not where the towers are. The node does not stream; it batches. Readings accumulate in flash and are pushed as a compact batch when the modem next has signal, so a dead patch delays data rather than losing it. The modem is the largest power draw on the board, which is exactly why it is used in bursts rather than held open.",
    detail: [
      ["Uplink", "GSM/GPRS, batched"],
      ["Batch cadence", "Hourly, or on threshold breach"],
      ["Behaviour in a dead zone", "Buffer and retry; no data loss under 30 days"],
      ["Typical daily uplink", "~8 KB per node"],
    ],
  },
  {
    icon: Database,
    stage: "Ingest & storage",
    title: "Time-series pipeline",
    status: "In build",
    body:
      "An ingest endpoint authenticates the node, unpacks the batch, and writes to a time-series store partitioned by pond and cycle. Raw readings are kept at full resolution for the life of the crop, because a post-mortem on a failed cycle needs the minute-level detail; older cycles are downsampled to hourly aggregates for long-term trend work.",
    detail: [
      ["Hot retention", "Full resolution, current cycle (~120 days)"],
      ["Cold retention", "Hourly rollups, retained for trend analysis"],
      ["Per-node raw volume", "~2.8 MB/yr at 15-min sampling"],
      ["Also stored", "Farmer-entered logs: feed, trays, mortality, treatments"],
    ],
  },
  {
    icon: Brain,
    stage: "Analytics",
    title: "Where the models sit",
    status: "Heuristics today, models next",
    body:
      "We are deliberate about this distinction. Today's feed and aeration advice is documented industry heuristics, and the app says so on screen. The models we intend to train — dissolved-oxygen crash prediction and disease-risk scoring — need labelled outcomes across many ponds and full cycles, which is precisely the dataset the sensor fleet is being built to produce. Training is a batch workload; inference is light and can run per-request.",
    detail: [
      ["Today", "Rule-based advisors, with stated confidence"],
      ["Next", "DO crash prediction from pond time-series"],
      ["Then", "Disease risk from water + tray + mortality signals"],
      ["Training shape", "Periodic batch retraining, not always-on"],
    ],
  },
  {
    icon: Smartphone,
    stage: "Delivery",
    title: "Offline-first mobile app",
    status: "Closed beta",
    body:
      "Neerani holds a local copy of the farm record so the morning round works with no signal at all, then reconciles when the connection returns. That means the sync layer has to handle conflicting edits from an owner, a manager and a worker who were all offline — which is a correctness problem, not a UI one, and it is why the record is modelled as append-only events per pond rather than a mutable row.",
    detail: [
      ["Platforms", "Android and iOS"],
      ["Languages", "English, Hindi, Bengali, Tamil, Telugu, Odia"],
      ["Offline", "Full read/write, reconciles on reconnect"],
      ["Access control", "Owner, manager, worker, viewer"],
    ],
  },
];

/**
 * Cloud scale projection.
 *
 * These are projections from the stated assumptions above, not measured usage —
 * we are in closed beta and say so. The arithmetic is shown so a reviewer can
 * check it rather than take it on trust.
 */
const projection = [
  {
    stage: "Pilot",
    ponds: "25",
    readings: "~876 K / yr",
    raw: "~70 MB / yr",
    note: "Current phase. Comfortably inside free tiers.",
    highlight: false,
  },
  {
    stage: "Regional rollout",
    ponds: "1,000",
    readings: "~35 M / yr",
    raw: "~2.8 GB / yr",
    note: "Ingest, time-series storage and the first real model training runs.",
    highlight: true,
  },
  {
    stage: "Andhra belt",
    ponds: "25,000",
    readings: "~876 M / yr",
    raw: "~70 GB / yr",
    note: "Continuous retraining, per-pond inference, multi-region reads.",
    highlight: false,
  },
];

function StatusPill({ children }: { children: string }) {
  const tone =
    children === "Closed beta"
      ? "bg-emerald-50 text-emerald-800 border-emerald-300"
      : children === "In build"
        ? "bg-sky-50 text-sky-800 border-sky-300"
        : "bg-amber-50 text-amber-800 border-amber-300";
  return (
    <span
      className={`inline-block shrink-0 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${tone}`}
    >
      {children}
    </span>
  );
}

export default function Technology() {
  return (
    <div className="min-h-screen bg-site-gradient">
      <Navigation />

      <main className="pt-28 pb-20 px-6">
        <div className="container mx-auto max-w-5xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#0067B1]">
              Technology
            </span>
            <h1
              className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight leading-tight"
              style={{
                background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              From a pond in Andhra to a decision at 5am
            </h1>
            <p className="mt-5 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              How the system is put together, what stage each part is actually at, and what it
              costs to run. Written to be checked, not admired — every number below is either a
              measured fact, a stated design target, or a labelled projection.
            </p>
          </motion.div>

          {/* Pipeline */}
          <div className="mt-14 space-y-5">
            {stages.map((s, i) => (
              <motion.section
                key={s.stage}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-7 md:p-9 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-start gap-4 min-w-0">
                    <div className="shrink-0 rounded-2xl border border-[#00C9E4]/25 bg-gradient-to-br from-[#00C9E4]/10 to-[#0067B1]/10 p-3 text-[#0067B1] dark:text-[#00C9E4]">
                      <s.icon className="w-6 h-6" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                        {s.stage}
                      </span>
                      <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        {s.title}
                      </h2>
                    </div>
                  </div>
                  <StatusPill>{s.status}</StatusPill>
                </div>

                <p className="mt-5 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300 max-w-3xl">
                  {s.body}
                </p>

                <dl className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2 border-t border-slate-100 dark:border-slate-800 pt-5">
                  {s.detail.map(([k, v]) => (
                    <div key={k} className="flex items-baseline justify-between gap-4 text-sm">
                      <dt className="text-slate-500 dark:text-slate-400">{k}</dt>
                      <dd className="font-semibold text-slate-900 dark:text-slate-100 text-right tabular-nums">
                        {v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </motion.section>
            ))}
          </div>

          {/* Why cloud */}
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5 }}
            className="mt-16 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-7 md:p-10 shadow-sm"
          >
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#0067B1]">
              Why this needs cloud infrastructure
            </span>
            <h2 className="mt-3 text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              The workload, and the arithmetic behind it
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300 max-w-3xl">
              A pond node produces roughly 35,000 readings a year at a 15-minute interval. That is
              trivial for one pond and substantial for a district. The table below projects the
              shape of that workload from the assumptions stated above.
            </p>
            <p className="mt-3 text-sm font-semibold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-900 rounded-xl px-4 py-3 max-w-3xl">
              These are projections, not measured usage. We are in closed beta with pilot farms and
              have no fleet in the water yet.
            </p>

            <div className="mt-7 overflow-x-auto">
              <table className="w-full min-w-[600px] border-collapse text-sm">
                <thead>
                  <tr className="border-b-2 border-slate-900 dark:border-slate-200">
                    <th className="py-3 pr-4 text-left text-[10px] font-black uppercase tracking-[0.12em] text-slate-500">
                      Stage
                    </th>
                    <th className="py-3 pr-4 text-left text-[10px] font-black uppercase tracking-[0.12em] text-slate-500">
                      Ponds
                    </th>
                    <th className="py-3 pr-4 text-left text-[10px] font-black uppercase tracking-[0.12em] text-slate-500">
                      Readings
                    </th>
                    <th className="py-3 pr-4 text-left text-[10px] font-black uppercase tracking-[0.12em] text-slate-500">
                      Raw telemetry
                    </th>
                    <th className="py-3 text-left text-[10px] font-black uppercase tracking-[0.12em] text-slate-500">
                      What it drives
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {projection.map((row) => (
                    <tr
                      key={row.stage}
                      className={`border-b border-slate-100 dark:border-slate-800 ${
                        row.highlight ? "bg-[#00C9E4]/5" : ""
                      }`}
                    >
                      <td className="py-4 pr-4 font-bold text-slate-900 dark:text-white whitespace-nowrap">
                        {row.stage}
                      </td>
                      <td className="py-4 pr-4 tabular-nums text-slate-700 dark:text-slate-300 whitespace-nowrap">
                        {row.ponds}
                      </td>
                      <td className="py-4 pr-4 tabular-nums text-slate-700 dark:text-slate-300 whitespace-nowrap">
                        {row.readings}
                      </td>
                      <td className="py-4 pr-4 tabular-nums text-slate-700 dark:text-slate-300 whitespace-nowrap">
                        {row.raw}
                      </td>
                      <td className="py-4 text-slate-600 dark:text-slate-400">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-6 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300 max-w-3xl">
              Raw telemetry is the smallest part of the bill. The cost sits in what surrounds it:
              an always-available ingest endpoint so a node with a narrow signal window is never
              turned away, time-series queries across a whole district when a farmer opens a
              dashboard, periodic model retraining as labelled cycle outcomes accumulate, and
              media storage for the pond photographs that accompany a disease report. Credits at
              the rollout stage are what let us keep sampling at full resolution instead of
              degrading the data to fit a budget — and the resolution is the product.
            </p>
          </motion.section>

          {/* Honesty */}
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5 }}
            className="mt-10 rounded-3xl border-2 border-slate-900 dark:border-slate-200 bg-white dark:bg-slate-900 p-7 md:p-9"
          >
            <div className="flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 shrink-0 text-[#0067B1] dark:text-[#00C9E4] mt-1" />
              <div>
                <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  What is not true yet
                </h2>
                <ul className="mt-4 space-y-2.5 text-[15px] text-slate-600 dark:text-slate-300 list-disc pl-5 marker:text-[#00C9E4]">
                  <li>
                    Neero is a bench prototype. No unit has completed a full crop cycle in a pond,
                    and the sensor accuracy figures we will publish do not exist yet because we
                    have not measured them against a reference instrument.
                  </li>
                  <li>
                    The aeration and lunar-molt models are documented industry heuristics, not
                    calibrated against measured farm outcomes. The app states this on screen.
                  </li>
                  <li>
                    Regional prices in the app are crowdsourced from farmers. That is community
                    pricing, not a market data feed.
                  </li>
                  <li>
                    The app computes risk when a farmer opens it. It does not yet wake overnight
                    and push a warning — that is the change the sensor fleet makes possible.
                  </li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* CTA */}
          <div className="mt-14 text-center">
            <p className="text-slate-600 dark:text-slate-300 mb-5">
              Building on this, evaluating us, or want the detail behind a number?
            </p>
            <Link href="/contact?subject=demo">
              <Button
                size="lg"
                className="gap-2 font-bold text-white border-none"
                style={{ background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)" }}
              >
                Talk to the team
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
