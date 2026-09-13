import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Link } from "wouter";
import { BatteryCharging, Cloud, Cpu, Database, Radio, Smartphone, Brain } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

/**
 * Technology page.
 *
 * Two readers: an aquaculture engineer checking whether the hardware is real,
 * and a cloud-programme reviewer checking what workload they would underwrite.
 * The page follows one dissolved-oxygen reading from the pond to the phone.
 *
 * Every figure is a stated design target, a sourced fact, or a labelled
 * projection. Nothing here is measured fleet data — there is no fleet yet.
 */

const C = {
  ground: "#06202B",
  surface: "#0B2E3B",
  line: "#18475A",
  ink: "#E6F3F5",
  muted: "#86A9B3",
  cyan: "#00C9E4",
  deep: "#0067B1",
  amber: "#F2B04A",
};

// Design targets used throughout. Change them here and every derived number follows.
const SAMPLE_MIN = 15;
const READINGS_PER_DAY = (24 * 60) / SAMPLE_MIN; // 96
const BYTES_PER_READING = 80;
const AWAKE_SECONDS = 10;
const HYPOXIA = 3; // mg/L
const BATTERY_DAYS = 90; // expected battery life, per the hardware team

// International grouping: this page is read by cloud-programme reviewers, for whom
// Indian lakh grouping (3,50,40,000) is easy to misread.
const fmt = new Intl.NumberFormat("en-US");

function bytes(n: number) {
  if (n >= 1e9) return `${(n / 1e9).toFixed(1)} GB`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)} MB`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(1)} KB`;
  return `${n} B`;
}

/* ───────────────────────────── Hero: the overnight oxygen sag ───────────────────────────── */

// Illustrative diurnal curve: peaks late afternoon from photosynthesis, bottoms out
// just before dawn from respiration. x runs noon → noon so the night sits centre-right.
function doAt(hourFromNoon: number) {
  const clock = (12 + hourFromNoon) % 24;
  const base = 6.2 + 3.3 * Math.cos((2 * Math.PI * (clock - 17.75)) / 24);
  const texture = 0.12 * Math.sin(hourFromNoon * 2.3) + 0.07 * Math.sin(hourFromNoon * 5.1);
  return base + texture;
}

const CHART = { w: 1000, h: 300, l: 44, r: 16, t: 20, b: 36 };
const xOf = (hr: number) => CHART.l + (hr / 24) * (CHART.w - CHART.l - CHART.r);
const yOf = (mg: number) => CHART.t + (1 - mg / 10) * (CHART.h - CHART.t - CHART.b);

const PLAYHEAD_HR = 15 + 52 / 60; // 3:52 am, in hours from noon

function OxygenCurve() {
  const reduce = useReducedMotion();

  const path = useMemo(() => {
    const pts: string[] = [];
    for (let i = 0; i <= 240; i++) {
      const hr = (i / 240) * 24;
      pts.push(`${i === 0 ? "M" : "L"}${xOf(hr).toFixed(1)},${yOf(doAt(hr)).toFixed(1)}`);
    }
    return pts.join(" ");
  }, []);

  const px = xOf(PLAYHEAD_HR);
  const pv = doAt(PLAYHEAD_HR);
  const py = yOf(pv);

  const ticks: [number, string][] = [
    [0, "12 pm"],
    [6, "6 pm"],
    [12, "12 am"],
    [18, "6 am"],
    [24, "12 pm"],
  ];

  return (
    <figure className="w-full">
      <div className="relative">
        <svg
          viewBox={`0 0 ${CHART.w} ${CHART.h}`}
          className="w-full h-auto overflow-visible"
          role="img"
          aria-label={`Illustrative dissolved oxygen over 24 hours, falling to about ${pv.toFixed(1)} milligrams per litre at 3:52 am and crossing the 3 milligram hypoxia line before sunrise.`}
        >
          <defs>
            <linearGradient id="doFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={C.cyan} stopOpacity="0.22" />
              <stop offset="100%" stopColor={C.cyan} stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* night: roughly 6:30 pm to 6 am */}
          <rect
            x={xOf(6.5)}
            y={CHART.t}
            width={xOf(18) - xOf(6.5)}
            height={CHART.h - CHART.t - CHART.b}
            fill="#000"
            opacity="0.22"
          />
          <text x={xOf(18) - 10} y={yOf(0) - 10} fill={C.muted} fontSize="14" textAnchor="end">
            night
          </text>

          {/* gridlines */}
          {[0, 3, 6, 9].map((v) => (
            <g key={v}>
              <line
                x1={CHART.l}
                x2={CHART.w - CHART.r}
                y1={yOf(v)}
                y2={yOf(v)}
                stroke={v === HYPOXIA ? C.amber : C.line}
                strokeWidth={v === HYPOXIA ? 1.5 : 1}
                strokeDasharray={v === HYPOXIA ? "6 6" : undefined}
              />
              <text
                x={CHART.l - 10}
                y={yOf(v) + 5}
                fill={v === HYPOXIA ? C.amber : C.muted}
                fontSize="14"
                textAnchor="end"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {v}
              </text>
            </g>
          ))}
          <text x={CHART.l + 12} y={yOf(HYPOXIA) + 22} fill={C.amber} fontSize="14" textAnchor="start">
            3 mg/L — shrimp begin to suffocate below this line
          </text>

          {ticks.map(([hr, label]) => (
            <text
              key={hr}
              x={xOf(hr)}
              y={CHART.h - 10}
              fill={C.muted}
              fontSize="14"
              textAnchor={hr === 0 ? "start" : hr === 24 ? "end" : "middle"}
            >
              {label}
            </text>
          ))}

          <motion.path
            d={`${path} L${xOf(24)},${yOf(0)} L${xOf(0)},${yOf(0)} Z`}
            fill="url(#doFill)"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
          />
          <motion.path
            d={path}
            fill="none"
            stroke={C.cyan}
            strokeWidth="3"
            strokeLinecap="round"
            initial={reduce ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.2, ease: [0.4, 0, 0.2, 1] }}
          />

          {/* playhead */}
          <motion.g
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.1, duration: 0.4 }}
          >
            <line x1={px} x2={px} y1={CHART.t} y2={CHART.h - CHART.b} stroke={C.ink} strokeOpacity="0.35" />
            {!reduce && (
              <motion.circle
                cx={px}
                cy={py}
                r="9"
                fill={C.cyan}
                initial={{ opacity: 0.5, scale: 1 }}
                animate={{ opacity: [0.5, 0, 0.5], scale: [1, 2.6, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
                style={{ transformOrigin: `${px}px ${py}px` }}
              />
            )}
            <circle cx={px} cy={py} r="6" fill={C.ground} stroke={C.cyan} strokeWidth="3" />
          </motion.g>
        </svg>

        {/* Positioning lives on a plain wrapper: framer's y animation owns the inner transform. */}
        <div
          className="absolute"
          style={{
            left: `${(px / CHART.w) * 100}%`,
            top: `${(py / CHART.h) * 100}%`,
            transform: "translate(calc(-100% - 20px), 14px)",
          }}
        >
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.3, duration: 0.5 }}
          className="rounded-xl px-4 py-3 text-left shadow-2xl whitespace-nowrap"
          style={{
            background: C.surface,
            border: `1px solid ${C.line}`,
          }}
        >
          <div className="text-xs" style={{ color: C.muted }}>
            Pond 4, 3:52 am
          </div>
          <div className="text-2xl font-bold tabular-nums" style={{ color: C.ink }}>
            {pv.toFixed(1)} <span className="text-sm font-medium" style={{ color: C.muted }}>mg/L and falling</span>
          </div>
        </motion.div>
        </div>
      </div>
      <figcaption className="mt-3 text-xs" style={{ color: C.muted }}>
        A typical overnight oxygen curve in a stocked pond. Illustrative, not a recording.
      </figcaption>
    </figure>
  );
}

/* ───────────────────────────── Follow one reading ───────────────────────────── */

type State = "real" | "building" | "next";

const STATE_LABEL: Record<State, string> = {
  real: "Working today",
  building: "Being built",
  next: "Comes next",
};

const STATE_COLOR: Record<State, string> = {
  real: C.cyan,
  building: C.amber,
  next: C.muted,
};

const journey: {
  icon: typeof Cpu;
  node: string;
  title: string;
  state: State;
  body: string;
  facts: [string, string][];
}[] = [
  {
    icon: Cpu,
    node: "Sensor",
    title: "The buoy wakes up, measures, and goes back to sleep",
    state: "building",
    body:
      "Neero floats in the pond with its sensors in the underside, in a cartridge that can be swapped out rather than the whole buoy replaced. Every 15 minutes it wakes, powers the probes, takes a burst of readings and keeps the median, so a splash or a passing fish doesn't become a false alarm. It calibrates itself, so nobody has to wade out with a buffer solution. Then it sleeps again.",
    facts: [
      ["Wakes every", "15 minutes"],
      ["Sensors", "replaceable cartridge"],
      ["Calibration", "self-calibrating"],

    ],
  },
  {
    icon: BatteryCharging,
    node: "Buffer",
    title: "It writes the reading down before it tries to send it",
    state: "building",
    body:
      "The reading goes to the buoy's own memory first. Nothing is sent yet. That ordering is the whole design: the pond bank often has no signal, and a sensor that loses data whenever the tower is out of reach is worse than no sensor, because people stop trusting it.",
    facts: [
      ["Memory holds", "about 30 days"],
      ["Battery life", "about 90 days expected"],
      ["Cables to the pond", "none"],
    ],
  },
  {
    icon: Radio,
    node: "Tower",
    title: "Once an hour, it sends everything it has",
    state: "building",
    body:
      "The radio is the hungriest part of the circuit, so it runs in short bursts instead of staying connected. Readings go out together in one small batch, over mobile data where there is coverage and a long-range link where the pond is out of reach of the towers. If oxygen crosses a danger line, the buoy doesn't wait for the hour — it sends at once.",
    facts: [
      ["Network", "GSM, plus long-range for weak coverage"],
      ["Sends", "hourly, or instantly on danger"],
      ["Data per day", "about 8 KB"],
    ],
  },
  {
    icon: Database,
    node: "Cloud",
    title: "The cloud files it under the pond and the crop",
    state: "building",
    body:
      "Each batch is checked, unpacked and stored against the pond it came from and the crop cycle it belongs to. Full detail is kept for the whole cycle, because when a crop fails, the minute-by-minute record is what explains why.",
    facts: [
      ["Kept in full", "for the whole crop cycle"],
      ["Older cycles", "kept as hourly summaries"],
      ["Per pond", "about 2.8 MB a year"],
    ],
  },
  {
    icon: Brain,
    node: "Advice",
    title: "The reading is compared with everything else the farm knows",
    state: "real",
    body:
      "Water readings meet the farmer's own logs: feed given, tray leftovers, deaths, treatments. Today the advice comes from documented industry rules, and the app says so on screen. Prediction models trained on real pond outcomes come next, once the sensors have produced that history.",
    facts: [
      ["Today", "rule-based, confidence shown"],
      ["Next", "oxygen crash prediction"],
      ["Then", "disease risk scoring"],
    ],
  },
  {
    icon: Smartphone,
    node: "Phone",
    title: "It reaches the farmer, even with no signal at the pond",
    state: "real",
    body:
      "Anything abnormal lands on the app's home screen as a plain alert, so the farmer sees it the moment they open it rather than digging through charts. Neerani also keeps a copy of the farm on the phone, so the morning round works with no connection and syncs later, and an owner, a manager and a worker editing offline don't overwrite each other.",
    facts: [
      ["Status", "closed beta, 100+ testers"],
      ["Alerts", "on the home screen"],
      ["Languages", "six"],
    ],
  },
];

// Node positions along the diagram, in viewBox units (320 × 560).
const NODES = [
  { x: 70, y: 470 },
  { x: 190, y: 400 },
  { x: 90, y: 300 },
  { x: 220, y: 200 },
  { x: 110, y: 110 },
  { x: 240, y: 40 },
];

function nodePath() {
  let d = `M${NODES[0].x},${NODES[0].y}`;
  for (let i = 1; i < NODES.length; i++) {
    const a = NODES[i - 1];
    const b = NODES[i];
    const my = (a.y + b.y) / 2;
    d += ` C${a.x},${my} ${b.x},${my} ${b.x},${b.y}`;
  }
  return d;
}

function JourneyDiagram({ active }: { active: number }) {
  const reduce = useReducedMotion();
  const pathRef = useRef<SVGPathElement>(null);
  const [len, setLen] = useState(0);
  const [stops, setStops] = useState<number[]>([]);

  // Find how far along the curve each node sits, so the packet stops exactly on it.
  useEffect(() => {
    const p = pathRef.current;
    if (!p) return;
    const total = p.getTotalLength();
    const found = NODES.map((n) => {
      let best = 0;
      let bestDist = Infinity;
      for (let s = 0; s <= total; s += 2) {
        const pt = p.getPointAtLength(s);
        const d = (pt.x - n.x) ** 2 + (pt.y - n.y) ** 2;
        if (d < bestDist) {
          bestDist = d;
          best = s;
        }
      }
      return best;
    });
    setLen(total);
    setStops(found);
  }, []);

  const target = stops[active] ?? 0;
  const travelled = useSpring(0, { stiffness: 60, damping: 18 });
  useEffect(() => {
    if (reduce) travelled.jump(target);
    else travelled.set(target);
  }, [target, reduce, travelled]);

  const [dot, setDot] = useState(NODES[0]);
  useEffect(
    () =>
      travelled.on("change", (v) => {
        const p = pathRef.current;
        if (!p) return;
        const pt = p.getPointAtLength(Math.max(0, Math.min(v, len)));
        setDot({ x: pt.x, y: pt.y });
      }),
    [travelled, len]
  );

  const dash = useTransform(travelled, (v) => `${v} ${Math.max(len, 1)}`);

  return (
    <div className="relative mx-auto w-full max-w-[340px] aspect-[320/560]">
      <svg viewBox="0 0 320 560" className="absolute inset-0 w-full h-full" aria-hidden="true">
        <path ref={pathRef} d={nodePath()} fill="none" stroke={C.line} strokeWidth="2" strokeDasharray="4 6" />
        <motion.path
          d={nodePath()}
          fill="none"
          stroke={C.cyan}
          strokeWidth="3"
          strokeLinecap="round"
          style={{ strokeDasharray: dash }}
        />
        <circle cx={dot.x} cy={dot.y} r="14" fill={C.cyan} opacity="0.18" />
        <circle cx={dot.x} cy={dot.y} r="6" fill={C.cyan} />
      </svg>

      {journey.map((j, i) => {
        const n = NODES[i];
        const reached = i <= active;
        const size = i === active ? 52 : 40;
        // Labels sit on the outside of each bend so the path never runs through them.
        const labelLeft = n.x < 160;
        return (
          <div
            key={j.node}
            className="absolute"
            style={{ left: `${(n.x / 320) * 100}%`, top: `${(n.y / 560) * 100}%` }}
          >
            <div
              className="absolute grid place-items-center rounded-full transition-all duration-500"
              style={{
                width: size,
                height: size,
                left: -size / 2,
                top: -size / 2,
                background: reached ? C.surface : C.ground,
                border: `2px solid ${reached ? STATE_COLOR[j.state] : C.line}`,
                boxShadow: i === active ? `0 0 0 8px ${STATE_COLOR[j.state]}22` : "none",
              }}
            >
              <j.icon className="w-5 h-5" style={{ color: reached ? C.ink : C.muted }} />
            </div>
            <span
              className="absolute top-0 -translate-y-1/2 text-sm font-semibold whitespace-nowrap transition-colors duration-500"
              style={{
                color: reached ? C.ink : C.muted,
                ...(labelLeft ? { right: size / 2 + 10 } : { left: size / 2 + 10 }),
              }}
            >
              {j.node}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function JourneyStep({
  step,
  index,
  onActive,
  isActive,
}: {
  step: (typeof journey)[number];
  index: number;
  onActive: (i: number) => void;
  isActive: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <div
      ref={ref}
      className="min-h-[70vh] flex flex-col justify-center py-10 transition-opacity duration-500"
      style={{ opacity: isActive ? 1 : 0.32 }}
    >
      <div className="flex items-center gap-3 text-sm">
        <span className="tabular-nums font-semibold" style={{ color: C.muted }}>
          Step {index + 1} of {journey.length}
        </span>
        <span className="h-px w-8" style={{ background: C.line }} />
        <span className="font-semibold" style={{ color: STATE_COLOR[step.state] }}>
          {STATE_LABEL[step.state]}
        </span>
      </div>
      <h3 className="mt-4 text-2xl md:text-[2rem] font-bold leading-tight tracking-tight max-w-[24ch]" style={{ color: C.ink }}>
        {step.title}
      </h3>
      <p className="mt-4 text-base md:text-[17px] leading-relaxed max-w-[58ch]" style={{ color: C.muted }}>
        {step.body}
      </p>
      <dl className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-[58ch]">
        {step.facts.map(([k, v]) => (
          <div key={k} className="border-l-2 pl-3" style={{ borderColor: C.line }}>
            <dt className="text-xs" style={{ color: C.muted }}>
              {k}
            </dt>
            <dd className="mt-0.5 text-[15px] font-semibold" style={{ color: C.ink }}>
              {v}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function FollowTheReading() {
  const [active, setActive] = useState(0);

  return (
    <section className="px-6 py-24 md:py-32" aria-labelledby="journey-title">
      <div className="container mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <h2 id="journey-title" className="text-3xl md:text-5xl font-bold tracking-tight leading-tight" style={{ color: C.ink }}>
            Follow one reading from the water to the phone
          </h2>
          <p className="mt-5 text-lg leading-relaxed" style={{ color: C.muted }}>
            Six steps. Each one is marked with where it actually stands, because the difference
            between built and planned is the first thing worth knowing.
          </p>
        </div>

        <div className="mt-10 grid md:grid-cols-[1fr_minmax(260px,360px)] gap-10 md:gap-16">
          {/* Mobile: the diagram sits on top and stays in view */}
          <div className="md:order-2">
            <div className="sticky top-20 md:top-[18vh] z-10 py-4 md:py-0" style={{ background: C.ground }}>
              <div className="h-[34vh] md:h-auto">
                <div className="h-full md:h-auto aspect-[320/560] mx-auto">
                  <JourneyDiagram active={active} />
                </div>
              </div>
            </div>
          </div>

          <div className="md:order-1">
            {journey.map((step, i) => (
              <JourneyStep key={step.node} step={step} index={i} onActive={setActive} isActive={i === active} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────── Interlude: a pinned pause ───────────────────────────── */

const INTERLUDE = [
  "The farmer usually finds out at 6 am,",
  "when the shrimp are already gasping at the surface.",
  "Neero is being built to raise the alarm at 3.",
];

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block mr-[0.28em]">
      {word}
    </motion.span>
  );
}

function Interlude() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const total = INTERLUDE.reduce((n, line) => n + line.split(" ").length, 0);
  let index = 0;

  const text = (
    <p className="text-3xl sm:text-4xl md:text-6xl font-bold leading-[1.12] tracking-tight max-w-[22ch]" style={{ color: C.ink }}>
      {INTERLUDE.map((line, li) => (
        <span key={li} className="block">
          {line.split(" ").map((w, wi) => {
            const i = index++;
            // Words finish revealing by 85% of the pin, leaving a beat to read the whole thought.
            const range: [number, number] = [(i / total) * 0.85, ((i + 1) / total) * 0.85];
            return reduce ? (
              <span key={wi} className="inline-block mr-[0.28em]">
                {w}
              </span>
            ) : (
              <Word key={wi} word={w} progress={scrollYProgress} range={range} />
            );
          })}
        </span>
      ))}
    </p>
  );

  if (reduce) {
    return (
      <section className="px-6 py-24">
        <div className="container mx-auto max-w-6xl">{text}</div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[240vh]" aria-label="Why overnight monitoring matters">
      <div className="sticky top-0 h-[100svh] flex items-center px-6">
        <div className="container mx-auto max-w-6xl">{text}</div>
      </div>
    </section>
  );
}

/* ───────────────────────────── A day on the battery (pinned) ───────────────────────────── */

function clockLabel(fraction: number) {
  const mins = Math.min(1439, Math.floor(fraction * 1440));
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${h < 12 ? "am" : "pm"}`;
}

function BatteryDay() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // A short hold at each end of the pin, so the day starts and finishes at rest.
  const day = useTransform(scrollYProgress, [0.08, 0.9], [0, 1], { clamp: true });
  const smooth = useSpring(day, { stiffness: 120, damping: 26 });
  const clip = useTransform(smooth, (v) => `inset(0 ${100 - v * 100}% 0 0)`);
  const marker = useTransform(smooth, (v) => `${v * 100}%`);

  const [t, setT] = useState(reduce ? 1 : 0);
  useMotionValueEvent(smooth, "change", (v) => setT(v));

  const awakeMinutes = Math.round((READINGS_PER_DAY * AWAKE_SECONDS) / 60);
  const wakesSoFar = Math.min(READINGS_PER_DAY, Math.floor(t * READINGS_PER_DAY));
  const awakeSoFar = wakesSoFar * AWAKE_SECONDS;
  const sleptSoFar = Math.max(0, Math.round(t * 86400) - awakeSoFar);
  const hm = (sec: number) => `${Math.floor(sec / 3600)}h ${String(Math.floor((sec % 3600) / 60)).padStart(2, "0")}m`;

  const body = (
    <div className="container mx-auto max-w-6xl w-full">
      <div className="grid md:grid-cols-[minmax(0,1fr)_auto] gap-8 md:gap-16 items-end">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight" style={{ color: C.ink }}>
            Awake for {awakeMinutes} minutes a day
          </h2>
          <p className="mt-5 text-lg leading-relaxed max-w-[52ch]" style={{ color: C.muted }}>
            A floating sensor lives or dies by its power budget. Neero is designed to spend almost the whole day
            asleep, which is what gets it to an expected battery life of about {BATTERY_DAYS} days. Keep scrolling to
            run the clock.
          </p>
        </div>

        <dl className="grid grid-cols-3 md:grid-cols-1 gap-4 md:gap-3 md:text-right tabular-nums">
          <div>
            <dt className="text-xs" style={{ color: C.muted }}>
              Time
            </dt>
            <dd className="text-2xl md:text-3xl font-bold" style={{ color: C.ink }}>
              {clockLabel(t)}
            </dd>
          </div>
          <div>
            <dt className="text-xs" style={{ color: C.muted }}>
              Awake so far
            </dt>
            <dd className="text-2xl md:text-3xl font-bold" style={{ color: C.cyan }}>
              {Math.floor(awakeSoFar / 60)}m {String(awakeSoFar % 60).padStart(2, "0")}s
            </dd>
          </div>
          <div>
            <dt className="text-xs" style={{ color: C.muted }}>
              Asleep so far
            </dt>
            <dd className="text-2xl md:text-3xl font-bold" style={{ color: C.muted }}>
              {hm(sleptSoFar)}
            </dd>
          </div>
        </dl>
      </div>

      <div className="mt-12 relative">
        <div className="text-sm mb-2" style={{ color: C.ink }}>
          Measuring
        </div>
        <div className="relative h-14 rounded-lg overflow-hidden" style={{ background: C.surface }}>
          <motion.div className="absolute inset-0" style={{ clipPath: reduce ? undefined : clip }}>
            {Array.from({ length: READINGS_PER_DAY }).map((_, i) => (
              <span
                key={i}
                className="absolute top-2 bottom-2 rounded-full"
                style={{ left: `${(i / READINGS_PER_DAY) * 100}%`, width: 2, background: C.cyan }}
              />
            ))}
          </motion.div>
        </div>

        <div className="text-sm mt-6 mb-2" style={{ color: C.ink }}>
          Sending
        </div>
        <div className="relative h-8 rounded-lg overflow-hidden" style={{ background: C.surface }}>
          <motion.div className="absolute inset-0" style={{ clipPath: reduce ? undefined : clip }}>
            {Array.from({ length: 24 }).map((_, i) => (
              <span
                key={i}
                className="absolute top-1.5 bottom-1.5 rounded-sm"
                style={{ left: `${(i / 24) * 100}%`, width: 5, background: C.ink }}
              />
            ))}
          </motion.div>
        </div>

        {!reduce && (
          <motion.div
            className="absolute top-6 bottom-8 w-px pointer-events-none"
            style={{ left: marker, background: C.ink, opacity: 0.6 }}
            aria-hidden="true"
          />
        )}

        <div className="mt-3 flex justify-between text-xs tabular-nums" style={{ color: C.muted }}>
          <span>12 am</span>
          <span>6 am</span>
          <span>12 pm</span>
          <span>6 pm</span>
          <span>12 am</span>
        </div>
        <p className="mt-6 text-sm" style={{ color: C.muted }}>
          Everything that isn't a line is sleep. {READINGS_PER_DAY} wake-ups × about {AWAKE_SECONDS} seconds ={" "}
          {awakeMinutes} minutes. Design targets, not yet measured on a pond.
        </p>
      </div>
    </div>
  );

  if (reduce) {
    return (
      <section className="px-6 py-24 border-t" style={{ borderColor: C.line }}>
        {body}
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[300vh] border-t" style={{ borderColor: C.line }}>
      <div className="sticky top-0 h-[100svh] flex items-center px-6 pt-16">{body}</div>
    </section>
  );
}

/* ───────────────────────────── When the tower goes away ───────────────────────────── */

const BUFFER_CAP = 48;

function DeadZone() {
  const reduce = useReducedMotion();
  const [online, setOnline] = useState(true);
  const [buffered, setBuffered] = useState(0);
  const [delivered, setDelivered] = useState<number | null>(null);

  // While offline, a reading lands in memory roughly every half second — each one
  // stands in for 15 real minutes.
  useEffect(() => {
    if (online) return;
    const id = window.setInterval(() => {
      setBuffered((b) => Math.min(BUFFER_CAP, b + 1));
    }, 450);
    return () => window.clearInterval(id);
  }, [online]);

  const loseSignal = () => {
    setDelivered(null);
    setBuffered(0);
    setOnline(false);
  };

  const restoreSignal = () => {
    setDelivered(buffered);
    setOnline(true);
    window.setTimeout(() => setBuffered(0), reduce ? 0 : 700);
  };

  const hours = (buffered * SAMPLE_MIN) / 60;

  return (
    <section className="px-6 py-24 md:py-32 border-t" style={{ borderColor: C.line }}>
      <div className="container mx-auto max-w-6xl grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight" style={{ color: C.ink }}>
            Take the tower away. Nothing is lost.
          </h2>
          <p className="mt-5 text-lg leading-relaxed max-w-[52ch]" style={{ color: C.muted }}>
            Ponds are rarely where the signal is. Try it: cut the connection and watch readings pile
            up in the buoy's memory, then bring the signal back and watch them go out together.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {online ? (
              <button
                type="button"
                onClick={loseSignal}
                className="rounded-full px-6 py-3 text-sm font-semibold transition-transform active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ background: C.amber, color: C.ground, outlineColor: C.amber }}
              >
                Cut the signal
              </button>
            ) : (
              <button
                type="button"
                onClick={restoreSignal}
                className="rounded-full px-6 py-3 text-sm font-semibold transition-transform active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ background: C.cyan, color: C.ground, outlineColor: C.cyan }}
              >
                Bring the signal back
              </button>
            )}
          </div>
          <p className="mt-4 text-sm min-h-[1.5rem]" style={{ color: C.muted }} aria-live="polite">
            {!online && `No signal for ${hours.toFixed(hours < 10 ? 1 : 0)} hours. ${buffered} readings waiting.`}
            {online && delivered !== null && `${delivered} readings delivered. None lost.`}
          </p>
        </div>

        <div className="rounded-2xl p-6 md:p-8" style={{ background: C.surface, border: `1px solid ${C.line}` }}>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2" style={{ color: C.ink }}>
              <Cpu className="w-4 h-4" /> Buoy memory
            </span>
            <span
              className="flex items-center gap-2 font-semibold"
              style={{ color: online ? C.cyan : C.amber }}
            >
              <Radio className="w-4 h-4" /> {online ? "Signal" : "No signal"}
            </span>
          </div>

          <div className="mt-6 grid grid-cols-8 gap-2 min-h-[164px] content-start">
            <AnimatePresence>
              {Array.from({ length: buffered }).map((_, i) => (
                <motion.span
                  key={i}
                  layout
                  initial={reduce ? false : { opacity: 0, scale: 0.4 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -90, transition: { delay: i * 0.012, duration: 0.45 } }}
                  className="aspect-square rounded-[4px]"
                  style={{ background: C.cyan }}
                />
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-6 pt-5 border-t flex items-center gap-2 text-sm" style={{ borderColor: C.line, color: C.muted }}>
            <Cloud className="w-4 h-4" />
            Each square is one 15-minute reading. The memory holds about 30 days.
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────── What it costs to run ───────────────────────────── */

const MIN_PONDS = 25;
const MAX_PONDS = 25000;
const toPonds = (t: number) => Math.round(MIN_PONDS * Math.pow(MAX_PONDS / MIN_PONDS, t / 1000));
const toSlider = (p: number) => Math.round((1000 * Math.log(p / MIN_PONDS)) / Math.log(MAX_PONDS / MIN_PONDS));

const PRESETS = [
  { ponds: 25, label: "A pilot" },
  { ponds: 1000, label: "A district" },
  { ponds: 25000, label: "The Andhra belt" },
];

function CostOfScale() {
  const [t, setT] = useState(toSlider(1000));
  const ponds = toPonds(t);
  const readingsYear = ponds * READINGS_PER_DAY * 365;
  const rawYear = readingsYear * BYTES_PER_READING;
  const uplinkDay = ponds * READINGS_PER_DAY * BYTES_PER_READING;

  return (
    <section className="px-6 py-24 md:py-32 border-t" style={{ borderColor: C.line }}>
      <div className="container mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight" style={{ color: C.ink }}>
            One pond is nothing. A district is a real workload.
          </h2>
          <p className="mt-5 text-lg leading-relaxed" style={{ color: C.muted }}>
            Move the slider to see what the sensor network produces as it grows. The arithmetic is
            on the page so you can check it rather than take it on trust.
          </p>
        </div>

        <div className="mt-12 rounded-3xl p-6 md:p-10" style={{ background: C.surface, border: `1px solid ${C.line}` }}>
          <label htmlFor="ponds" className="flex flex-wrap items-baseline justify-between gap-4">
            <span className="text-lg" style={{ color: C.muted }}>
              Ponds with a sensor
            </span>
            <span className="text-5xl md:text-6xl font-bold tabular-nums tracking-tight" style={{ color: C.ink }}>
              {fmt.format(ponds)}
            </span>
          </label>

          <input
            id="ponds"
            type="range"
            min={0}
            max={1000}
            value={t}
            onChange={(e) => setT(Number(e.target.value))}
            className="mt-6 w-full accent-[#00C9E4] h-2 cursor-pointer"
            aria-valuetext={`${fmt.format(ponds)} ponds`}
          />

          <div className="mt-4 flex flex-wrap gap-2">
            {PRESETS.map((p) => {
              const on = Math.abs(ponds - p.ponds) / p.ponds < 0.04;
              return (
                <button
                  key={p.ponds}
                  type="button"
                  onClick={() => setT(toSlider(p.ponds))}
                  className="rounded-full px-4 py-1.5 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{
                    background: on ? C.cyan : "transparent",
                    color: on ? C.ground : C.ink,
                    border: `1px solid ${on ? C.cyan : C.line}`,
                    outlineColor: C.cyan,
                  }}
                >
                  {p.label}, {fmt.format(p.ponds)}
                </button>
              );
            })}
          </div>

          <dl className="mt-10 grid sm:grid-cols-3 gap-8">
            {[
              ["Readings a year", fmt.format(readingsYear), `${fmt.format(ponds)} × ${READINGS_PER_DAY} a day × 365`],
              ["Raw sensor data a year", bytes(rawYear), `readings × ${BYTES_PER_READING} bytes`],
              ["Arriving every day", bytes(uplinkDay), "before farmer logs and photos"],
            ].map(([k, v, how]) => (
              <div key={k}>
                <dt className="text-sm" style={{ color: C.muted }}>
                  {k}
                </dt>
                <dd className="mt-1 text-3xl font-bold tabular-nums" style={{ color: C.cyan }}>
                  {v}
                </dd>
                <dd className="mt-1 text-xs tabular-nums" style={{ color: C.muted }}>
                  {how}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-10 text-sm" style={{ color: C.amber }}>
            A projection from our design targets. We are in closed beta and have no sensors in ponds yet.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-2 gap-10 md:gap-16">
          <h3 className="text-2xl font-bold leading-snug tracking-tight" style={{ color: C.ink }}>
            The sensor data is the cheap part. What surrounds it is why we need cloud infrastructure.
          </h3>
          <ul className="space-y-4 text-[15px] leading-relaxed" style={{ color: C.muted }}>
            <li>
              <strong style={{ color: C.ink }}>A door that never closes.</strong> A buoy may get a few
              seconds of signal. The receiving end has to be there when it does, at any hour.
            </li>
            <li>
              <strong style={{ color: C.ink }}>District-wide questions.</strong> Comparing one pond
              against every nearby pond means querying millions of readings on demand.
            </li>
            <li>
              <strong style={{ color: C.ink }}>Training the prediction models.</strong> Oxygen-crash
              and disease-risk models retrain as each finished crop adds labelled history.
            </li>
            <li>
              <strong style={{ color: C.ink }}>Photos and records.</strong> Disease reports come with
              pond photographs, and farm records have to be kept for audits and buyers.
            </li>
            <li>
              Credits at the district stage let us keep full 15-minute detail instead of thinning the
              data to fit a budget. That detail is the product.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────── Where we actually are ───────────────────────────── */

const ledger: { state: State; items: string[] }[] = [
  {
    state: "real",
    items: [
      "Neerani app in closed beta on Google Play, with more than 100 testers",
      "Daily pond logging that works offline and syncs later",
      "Six languages, and owner, manager, worker and viewer roles",
      "Feed and aeration advice from documented rules, labelled as such in the app",
    ],
  },
  {
    state: "building",
    items: [
      "Neero sensor buoy, working as a bench prototype",
      "Firmware that stores readings first and sends them in batches",
      "The cloud pipeline that receives and files sensor data",
    ],
  },
  {
    state: "next",
    items: [
      "First Neero trials in real ponds",
      "Night-time alerts pushed to the farmer's phone",
      "Oxygen-crash prediction trained on real pond history",
      "Measured sensor accuracy, published against a reference instrument",
    ],
  },
];

function WhereWeAre() {
  return (
    <section className="px-6 py-24 md:py-32 border-t" style={{ borderColor: C.line }}>
      <div className="container mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight" style={{ color: C.ink }}>
            Where we actually are
          </h2>
          <p className="mt-5 text-lg leading-relaxed" style={{ color: C.muted }}>
            In order, without dates. We will publish dates when we are confident we can keep them.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-px rounded-2xl overflow-hidden" style={{ background: C.line }}>
          {ledger.map((col) => (
            <div key={col.state} className="p-7 md:p-8" style={{ background: C.ground }}>
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: STATE_COLOR[col.state] }} />
                <h3 className="text-lg font-bold" style={{ color: C.ink }}>
                  {STATE_LABEL[col.state]}
                </h3>
              </div>
              <ul className="mt-6 space-y-4">
                {col.items.map((item) => (
                  <li key={item} className="text-[15px] leading-relaxed" style={{ color: C.muted }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm leading-relaxed max-w-[70ch]" style={{ color: C.muted }}>
          Also true and worth knowing: prices shown in the app are reported by farmers, not taken from a
          market feed, and the app currently works out risk when it is opened rather than waking on its
          own overnight. That second gap is exactly what the sensor network closes.
        </p>
        <p className="mt-4 text-sm leading-relaxed max-w-[70ch]" style={{ color: C.muted }}>
          Overnight oxygen is a welfare question before it is a cost question.{" "}
          <Link href="/welfare" className="underline underline-offset-4" style={{ color: C.ink }}>
            How the system supports shrimp welfare
          </Link>
        </p>

        <div className="mt-16 flex flex-wrap items-center gap-6">
          <Link
            href="/contact?subject=demo"
            className="rounded-full px-7 py-3.5 text-[15px] font-semibold transition-transform active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{ background: C.cyan, color: C.ground, outlineColor: C.cyan }}
          >
            Talk to the team
          </Link>
          <Link href="/products" className="text-[15px] underline underline-offset-4" style={{ color: C.ink }}>
            See what Neerani does today
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────── Page ───────────────────────────── */

export default function Technology() {
  return (
    <div className="min-h-screen" style={{ background: C.ground }}>
      <Navigation transparentOnDark />

      <main>
        <section className="px-6 pt-36 md:pt-44 pb-16 md:pb-24">
          <div className="container mx-auto max-w-6xl">
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.02] max-w-[16ch]"
              style={{ color: C.ink }}
            >
              3:52 am. Pond 4 is running out of oxygen.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-6 text-lg md:text-xl leading-relaxed max-w-[56ch]"
              style={{ color: C.muted }}
            >
              Nobody is awake to see it. This page follows one reading from the water to the farmer's
              phone: how the system works, which parts are built, and what it takes to run at scale.
            </motion.p>

            <div className="mt-14 md:mt-16">
              <OxygenCurve />
            </div>
          </div>
        </section>

        <Interlude />
        <FollowTheReading />
        <BatteryDay />
        <DeadZone />
        <CostOfScale />
        <WhereWeAre />
      </main>

      <Footer />
    </div>
  );
}
