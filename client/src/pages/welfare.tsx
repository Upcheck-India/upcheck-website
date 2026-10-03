import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Link } from "wouter";
import { AlertTriangle, Search } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

/**
 * Welfare page.
 *
 * Written for an aquaculture welfare expert first, and anyone they forward it to.
 * Animals come first, then the pond, then the people. Every item is honest about
 * whether it works in Neerani today or needs the Neero sensor, and every measure
 * is something we will report from pilot farms — not a result we already have.
 */

const W = {
  ground: "#F3F7F7",
  paper: "#FFFFFF",
  ink: "#0E2A33",
  muted: "#557079",
  rule: "#D5E2E3",
  teal: "#0A7F93", // "works today" on a light ground
  deep: "#0067B1",
  amber: "#B7791F", // "needs Neero"
  amberSoft: "#FBF1DE",
  alert: "#B3261E",
  alertSoft: "#FCE8E6",
};

type Status = "today" | "neero";

const STATUS: Record<Status, { label: string; color: string }> = {
  today: { label: "Works in Neerani today", color: W.teal },
  neero: { label: "Comes with Neero", color: W.amber },
};

type Item = {
  title: string;
  risk: string;
  response: string;
  status: Status;
  measure: string;
};

type Chapter = { id: string; name: string; lede: string; items: Item[] };

const chapters: Chapter[] = [
  {
    id: "animals",
    name: "The animals",
    lede: "Shrimp show stress late. By the time it is visible, the water has usually been wrong for hours.",
    items: [
      {
        title: "Oxygen stress, before it becomes suffocation",
        risk:
          "Dissolved oxygen falls overnight and is lowest just before dawn. Below about 3 mg/L shrimp are in distress; well below it they suffocate. Feeder-canal water in Indian farming areas has been measured as low as 0.8 mg/L.",
        response:
          "Neerani flags a low oxygen reading on its home screen the moment it is logged. Neero is being built to measure oxygen every 15 minutes through the night and raise the alarm while there is still time to run the aerators.",
        status: "neero",
        measure: "Hours below 3 mg/L in each crop",
      },
      {
        title: "Disease caught at the first signs",
        risk:
          "Hypoxia, ammonia and sudden swings in temperature, salinity or pH stress shrimp and open the door to White Spot and EHP. White Spot can kill an entire grow-out pond within three to ten days.",
        response:
          "A symptom checker ranks likely causes from what the farmer can actually see, on the animal, in its behaviour and in the water. Plankton and Vibrio counts sit in the same pond record, so a lab result is read alongside the water history rather than lost in a chat thread.",
        status: "today",
        measure: "Days from first sign to first action",
      },
      {
        title: "Survival counted, not guessed",
        risk:
          "Losses spread over a crop are easy to underestimate when deaths are remembered rather than recorded, and stocking density is often a rough figure.",
        response:
          "Stocking count and density are recorded when the crop begins, deaths are logged as they happen, and survival is worked out from that record when the crop closes.",
        status: "today",
        measure: "Survival rate and mortality events per crop",
      },
    ],
  },
  {
    id: "pond",
    name: "The pond",
    lede: "What goes into the water stays in it, and in the animals, and eventually on someone's plate.",
    items: [
      {
        title: "Feeding to appetite",
        risk:
          "Feed that isn't eaten sinks and breaks down, fouling the pond bottom the shrimp live on. Feed is also around 60% of production cost, so overfeeding harms the animals and the farm at once.",
        response:
          "The feed advisor adjusts each day's ration for what was left on the feeding trays, water conditions and molt timing, and says what it based that on.",
        status: "today",
        measure: "Feed conversion ratio and tray leftovers",
      },
      {
        title: "Fewer blind treatments, and no banned ones",
        risk:
          "Without a clear view of the water, treatment becomes defensive guesswork. Residue testing at farm level is negligible, so banned antibiotics are usually caught only at the buyer's lab.",
        response:
          "When a treatment is recorded, Neerani warns if the substance is banned, before it goes into the water. Every treatment stays in the pond's history.",
        status: "today",
        measure: "Treatments per crop, and banned-substance warnings raised",
      },
      {
        title: "Records an audit can read",
        risk:
          "Certification schemes such as BAP and ASC, CAA farm registration and MPEDA export requirements all depend on records of stocking, water, treatments and losses that most small farms keep on paper, if at all.",
        response:
          "Neerani keeps those records as the farm works and exports them to a file. Upcheck and Neerani are not certified or endorsed by these bodies; the app simply makes the records they ask for easier to keep.",
        status: "today",
        measure: "How complete each crop's record is at harvest",
      },
    ],
  },
  {
    id: "people",
    name: "The people",
    lede: "Welfare on a farm includes the people who keep the animals alive at 3 am.",
    items: [
      {
        title: "A safer night shift",
        risk:
          "Checking oxygen and aerators means walking a dark pond bank in the small hours. It is the least safe job on the farm, and the one where a tired miss costs the most.",
        response:
          "Neero is being built to watch the water overnight so that a person is called out when something is wrong, rather than walking the bank every night just in case.",
        status: "neero",
        measure: "Night checks avoided each week",
      },
      {
        title: "Guidance in the worker's own language",
        risk:
          "The person doing the morning round is rarely the person who reads English, so written instructions and warnings often don't reach them.",
        response:
          "Every screen, label and warning in Neerani exists in English, Hindi, Bengali, Tamil, Telugu and Odia.",
        status: "today",
        measure: "Share of daily logs completed by field staff",
      },
      {
        title: "Work that is seen and verified",
        risk:
          "On farms with hired labour, good work goes unnoticed and missed rounds go unrecorded.",
        response:
          "Tasks are assigned, marked done and verified by a manager, and owners decide who sees money. A consultant can be given read-only access to advise without changing anything.",
        status: "today",
        measure: "Tasks completed and verified on time",
      },
    ],
  },
];

const evidence = [
  {
    fact: "74% of India's antibiotic-related shrimp export rejections were traced to farms in Andhra Pradesh.",
    source: "The South First",
    url: "https://thesouthfirst.com/health/andhra-farms-drove-74-of-indias-antibiotic-shrimp-rejections-centre-seeks-answers-from-states/",
  },
  {
    fact: "85.7% of antibiotic-related shrimp refusals at the US border in early 2026 came from facilities holding BAP certification.",
    source: "Southern Shrimp Alliance",
    url: "https://shrimpalliance.com/march-2026/",
  },
  {
    fact: "White Spot Syndrome Virus can reach 100% mortality in a grow-out pond within 3 to 10 days.",
    source: "Iowa State University, CFSPH",
    url: "https://www.cfsph.iastate.edu/Factsheets/pdfs/white-spot-disease.pdf",
  },
  {
    fact: "Low oxygen, high ammonia and abrupt changes in temperature, salinity and pH are documented triggers of White Spot outbreaks in Indian ponds.",
    source: "Peer-reviewed study, PMC",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3349133/",
  },
];

/* ───────────────────────────── Treatment warning illustration ───────────────────────────── */

const TYPED = "Chloramphenicol";

function TreatmentWarning() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [chars, setChars] = useState(reduce ? TYPED.length : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setChars(i);
      if (i >= TYPED.length) window.clearInterval(id);
    }, 70);
    return () => window.clearInterval(id);
  }, [inView, reduce]);

  const done = chars >= TYPED.length;

  return (
    <figure ref={ref} className="w-full max-w-sm mx-auto">
      <div
        className="rounded-[28px] p-5 shadow-xl"
        style={{ background: W.paper, border: `1px solid ${W.rule}` }}
        aria-hidden="true"
      >
        <div className="flex items-center justify-between text-xs" style={{ color: W.muted }}>
          <span>Pond 3 · Day 42</span>
          <span>Record treatment</span>
        </div>

        <label className="mt-5 block text-xs font-semibold" style={{ color: W.muted }}>
          Product or substance
        </label>
        <div
          className="mt-1.5 flex items-center gap-2 rounded-xl px-3 py-2.5 text-[15px]"
          style={{ border: `1.5px solid ${done ? W.alert : W.rule}`, color: W.ink }}
        >
          <Search className="w-4 h-4 shrink-0" style={{ color: W.muted }} />
          <span>
            {TYPED.slice(0, chars)}
            {!done && <span className="inline-block w-px h-4 align-middle ml-0.5 animate-pulse" style={{ background: W.ink }} />}
          </span>
        </div>

        <motion.div
          initial={false}
          animate={done ? { opacity: 1, height: "auto", marginTop: 16 } : { opacity: 0, height: 0, marginTop: 0 }}
          transition={{ duration: reduce ? 0 : 0.35, ease: "easeOut" }}
          className="overflow-hidden"
        >
          <div className="rounded-xl p-3.5" style={{ background: W.alertSoft }}>
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: W.alert }} />
              <div>
                <p className="text-sm font-bold" style={{ color: W.alert }}>
                  Banned for use in shrimp farming
                </p>
                <p className="mt-1 text-[13px] leading-snug" style={{ color: W.ink }}>
                  Residues can get a whole export consignment rejected. Choose a permitted product, or check with
                  your technician before treating.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-5 text-sm font-semibold">
          <span className="block rounded-xl py-2.5 text-center" style={{ border: `1px solid ${W.rule}`, color: W.ink }}>
            Choose another product
          </span>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-xs" style={{ color: W.muted }}>
        Illustration of the warning in Neerani, not a screenshot.
      </figcaption>
    </figure>
  );
}

/* ───────────────────────────── Chapters ───────────────────────────── */

function ChapterBlock({ chapter, index }: { chapter: Chapter; index: number }) {
  return (
    <section
      id={chapter.id}
      aria-labelledby={`${chapter.id}-title`}
      className="grid md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-8 md:gap-16 py-20 md:py-28 border-t"
      style={{ borderColor: W.rule }}
    >
      {/* Pinned chapter heading while its items scroll past */}
      <div>
        <div className="md:sticky md:top-32">
          <span className="text-sm font-semibold tabular-nums" style={{ color: W.muted }}>
            {index + 1} of {chapters.length}
          </span>
          <h2
            id={`${chapter.id}-title`}
            className="mt-2 text-4xl md:text-5xl font-bold tracking-tight leading-[1.05]"
            style={{ color: W.ink }}
          >
            {chapter.name}
          </h2>
          <p className="mt-4 text-lg leading-relaxed max-w-[34ch]" style={{ color: W.muted }}>
            {chapter.lede}
          </p>
        </div>
      </div>

      <div>
        {chapter.items.map((item, i) => (
          <article
            key={item.title}
            className={`py-9 ${i === 0 ? "pt-0" : "border-t"}`}
            style={{ borderColor: W.rule }}
          >
            <h3 className="text-2xl md:text-[1.75rem] font-bold tracking-tight leading-snug max-w-[28ch]" style={{ color: W.ink }}>
              {item.title}
            </h3>
            <div className="mt-5 grid sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-semibold" style={{ color: W.muted }}>
                  The risk
                </p>
                <p className="mt-1.5 leading-relaxed" style={{ color: W.ink }}>
                  {item.risk}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: W.muted }}>
                  What Neerani does
                </p>
                <p className="mt-1.5 leading-relaxed" style={{ color: W.ink }}>
                  {item.response}
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
              <span className="flex items-center gap-2 font-semibold" style={{ color: STATUS[item.status].color }}>
                <span className="w-2 h-2 rounded-full" style={{ background: STATUS[item.status].color }} />
                {STATUS[item.status].label}
              </span>
              <span style={{ color: W.muted }}>
                We'll measure: <span style={{ color: W.ink }}>{item.measure}</span>
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────────── Page ───────────────────────────── */

export default function Welfare() {
  const allItems = chapters.flatMap((c) => c.items.map((it) => ({ ...it, chapter: c.name })));

  return (
    <div className="min-h-screen" style={{ background: W.ground }}>
      <Navigation />

      <main>
        {/* Hero */}
        <section className="px-6 pt-36 md:pt-44 pb-20">
          <div className="container mx-auto max-w-6xl">
            <h1
              className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.04] max-w-[17ch]"
              style={{ color: W.ink }}
            >
              A shrimp can't tell you it's short of oxygen. The water can.
            </h1>
            <p
              className="mt-7 text-lg md:text-xl leading-relaxed max-w-[60ch]"
              style={{ color: W.muted }}
            >
              How Neerani and Neero support the welfare of farmed shrimp, the ponds they live in and the people who
              look after them. Each point says what works today, what needs the Neero sensor, and what we will
              measure to show it is working.
            </p>

            <nav aria-label="Chapters" className="mt-10 flex flex-wrap gap-3">
              {chapters.map((c) => (
                <a
                  key={c.id}
                  href={`#${c.id}`}
                  className="rounded-full px-5 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{ background: W.paper, border: `1px solid ${W.rule}`, color: W.ink, outlineColor: W.deep }}
                >
                  {c.name}
                </a>
              ))}
            </nav>
          </div>
        </section>

        <div className="px-6">
          <div className="container mx-auto max-w-6xl">
            <ChapterBlock chapter={chapters[0]} index={0} />

            {/* Treatment spotlight, between the animals and the pond */}
            <section
              aria-labelledby="treatment-title"
              className="grid md:grid-cols-2 gap-12 md:gap-16 items-center py-20 md:py-28 border-t"
              style={{ borderColor: W.rule }}
            >
              <div>
                <h2
                  id="treatment-title"
                  className="text-3xl md:text-5xl font-bold tracking-tight leading-tight"
                  style={{ color: W.ink }}
                >
                  The warning comes before the treatment, not after the lab test
                </h2>
                <p className="mt-5 text-lg leading-relaxed max-w-[50ch]" style={{ color: W.muted }}>
                  India banned chloramphenicol and nitrofurans in food-producing animals, yet residues still turn up
                  in rejected export consignments. Farm-level testing is rare, so the first check usually happens at
                  the buyer's lab, after the shrimp have been treated, harvested and shipped.
                </p>
                <p className="mt-4 text-lg leading-relaxed max-w-[50ch]" style={{ color: W.ink }}>
                  Neerani moves that check to the moment a farmer records a treatment, while there is still time to
                  choose something else.
                </p>
              </div>
              <TreatmentWarning />
            </section>

            <ChapterBlock chapter={chapters[1]} index={1} />
            <ChapterBlock chapter={chapters[2]} index={2} />

            {/* Honest advice */}
            <section className="py-20 md:py-28 border-t" style={{ borderColor: W.rule }}>
              <div className="grid md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-8 md:gap-16">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight" style={{ color: W.ink }}>
                  Advice that admits what it doesn't know
                </h2>
                <div className="space-y-4 text-lg leading-relaxed max-w-[62ch]" style={{ color: W.muted }}>
                  <p>
                    Bad advice about living animals is worse than none. Every recommendation in Neerani says what it
                    was worked out from. When readings are thin it gives a range instead of a falsely precise number,
                    and when the data isn't there it says what to go and measure rather than guessing.
                  </p>
                  <p>
                    Today that advice is built on documented industry practice, and the app says so. Models trained on
                    real pond outcomes come later, once there is enough honest data to train them on.
                  </p>
                </div>
              </div>
            </section>

            {/* How we'll show it */}
            <section aria-labelledby="measures-title" className="py-20 md:py-28 border-t" style={{ borderColor: W.rule }}>
              <h2
                id="measures-title"
                className="text-3xl md:text-4xl font-bold tracking-tight leading-tight max-w-[24ch]"
                style={{ color: W.ink }}
              >
                How we'll show it's working
              </h2>
              <p className="mt-4 text-lg leading-relaxed max-w-[62ch]" style={{ color: W.muted }}>
                We don't have welfare results to report yet. These are the measures we will publish from pilot farms
                once a full crop has closed, good or bad.
              </p>

              <div className="mt-10 overflow-x-auto rounded-2xl" style={{ background: W.paper, border: `1px solid ${W.rule}` }}>
                <table className="w-full min-w-[640px] border-collapse text-left">
                  <thead>
                    <tr className="text-sm" style={{ color: W.muted }}>
                      <th className="px-5 py-4 font-semibold">Measure</th>
                      <th className="px-5 py-4 font-semibold">For</th>
                      <th className="px-5 py-4 font-semibold">Where it comes from</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allItems.map((it) => (
                      <tr key={it.measure} className="border-t" style={{ borderColor: W.rule }}>
                        <td className="px-5 py-4 font-semibold" style={{ color: W.ink }}>
                          {it.measure}
                        </td>
                        <td className="px-5 py-4" style={{ color: W.muted }}>
                          {it.chapter}
                        </td>
                        <td className="px-5 py-4 text-sm font-semibold whitespace-nowrap" style={{ color: STATUS[it.status].color }}>
                          {it.status === "today" ? "Neerani records" : "Neero readings"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Evidence */}
            <section aria-labelledby="evidence-title" className="py-20 md:py-28 border-t" style={{ borderColor: W.rule }}>
              <h2
                id="evidence-title"
                className="text-3xl md:text-4xl font-bold tracking-tight leading-tight max-w-[26ch]"
                style={{ color: W.ink }}
              >
                Why this matters in Indian shrimp farming now
              </h2>
              <ul className="mt-10 grid md:grid-cols-2 gap-x-12 gap-y-8">
                {evidence.map((e) => (
                  <li key={e.fact} className="border-l-2 pl-5" style={{ borderColor: W.teal }}>
                    <p className="text-lg leading-relaxed" style={{ color: W.ink }}>
                      {e.fact}
                    </p>
                    <a
                      href={e.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-sm underline underline-offset-4"
                      style={{ color: W.muted }}
                    >
                      Source: {e.source}
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            {/* Invitation */}
            <section className="py-20 md:py-28 border-t" style={{ borderColor: W.rule }}>
              <div className="max-w-3xl">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight" style={{ color: W.ink }}>
                  If you work on aquaculture welfare, we'd value your input
                </h2>
                <p className="mt-5 text-lg leading-relaxed" style={{ color: W.muted }}>
                  We are early, and the measures above are ours to get right. If you research shrimp welfare, advise
                  farms or work on certification, we would like to hear what we should be tracking and what we have
                  missed.
                </p>
                <div className="mt-9 flex flex-wrap items-center gap-6">
                  <Link
                    href="/contact"
                    className="rounded-full px-7 py-3.5 text-[15px] font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    style={{ background: W.deep, outlineColor: W.deep }}
                  >
                    Share your thoughts
                  </Link>
                  <Link href="/technology" className="text-[15px] font-medium underline underline-offset-4" style={{ color: W.ink }}>
                    See how the system works
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
