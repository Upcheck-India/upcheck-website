import { useState, useEffect } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  ChevronDown,
  ArrowRight,
  Trophy,
  ExternalLink,
} from "lucide-react";

export interface EventItem {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  startDate: string;
  endDate: string;
  venue: string;
  duration: string;
  organizer: string;
  image: string;
  accentColor: string;
  tags: string[];
  website: string;
  registration: string;
}

export const EVENTS_DATA: EventItem[] = [
  {
    id: 1,
    slug: "makeathon-7",
    title: "Makeathon 7.0",
    subtitle: "National Level Hardware & Software Hackathon",
    description:
      "A 24-hour innovation-driven hackathon where student innovators from institutions across India tackle real-world, industry-oriented challenges.",
    startDate: "2026-04-15T00:00:00",
    endDate: "2026-04-16T23:59:59",
    venue: "SVCE, Sriperumbudur, Tamil Nadu",
    duration: "24 Hours",
    organizer: "Department of ECE, SVCE",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    accentColor: "from-[#00C9E4] to-[#0067B1]",
    tags: ["Hardware", "Software", "AI/ML", "IoT"],
    website: "https://make-a-thon-7.in",
    registration: "https://forms.gle/MSiu9x7Mo2kYBmmA9",
  },
];

const getEventStatus = (dateStr: string) => {
  const now = new Date();
  const end = new Date(dateStr);
  if (isNaN(end.getTime())) {
    return {
      label: "TBD",
      color: "bg-slate-400",
      textColor: "text-slate-500",
      active: false,
      urgent: false,
    };
  }
  if (now > end) {
    return {
      label: "Ended",
      color: "bg-slate-400",
      textColor: "text-slate-500",
      active: false,
      urgent: false,
    };
  }
  const days = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  if (days <= 7) {
    return {
      label: "LIVE · Ending Soon",
      color: "bg-rose-500",
      textColor: "text-rose-600",
      active: true,
      urgent: true,
    };
  }
  if (days <= 30) {
    return {
      label: "LIVE NOW",
      color: "bg-emerald-500",
      textColor: "text-emerald-600",
      active: true,
      urgent: false,
    };
  }
  return {
    label: "Upcoming",
    color: "bg-[#0067B1]",
    textColor: "text-[#0067B1]",
    active: false,
    urgent: false,
  };
};

function CountdownTimer({ endDate }: { endDate: string }) {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = new Date(endDate).getTime() - new Date().getTime();
      if (diff <= 0) {
        setTimeLeft({ d: 0, h: 0, m: 0, s: 0 });
        return;
      }
      setTimeLeft({
        d: Math.floor(diff / (1000 * 60 * 60 * 24)),
        h: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        m: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        s: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    calc();
    const interval = setInterval(calc, 1000);
    return () => clearInterval(interval);
  }, [endDate]);

  const Box = ({ val, label }: { val: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="relative w-14 h-14 bg-white shadow-xs rounded-xl flex items-center justify-center border border-cyan-200/70">
        <span className="text-slate-900 font-extrabold text-xl tabular-nums">
          {String(val).padStart(2, "0")}
        </span>
      </div>
      <span className="text-slate-500 text-[10px] mt-1.5 uppercase tracking-widest font-semibold">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex items-end gap-2">
      <Box val={timeLeft.d} label="Days" />
      <span className="text-slate-400 text-xl font-light mb-6">:</span>
      <Box val={timeLeft.h} label="Hrs" />
      <span className="text-slate-400 text-xl font-light mb-6">:</span>
      <Box val={timeLeft.m} label="Min" />
      <span className="text-slate-400 text-xl font-light mb-6">:</span>
      <Box val={timeLeft.s} label="Sec" />
    </div>
  );
}

export default function Events() {
  const [mounted, setMounted] = useState(false);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    setMounted(true);
    window.scrollTo(0, 0);
  }, []);

  const processedEvents = EVENTS_DATA.map((e) => ({
    ...e,
    status: getEventStatus(e.endDate),
  }));

  const filteredEvents = processedEvents.filter((e) => {
    if (filter === "all") return true;
    if (filter === "live") return e.status.active;
    if (filter === "upcoming") return e.status.label === "Upcoming";
    if (filter === "ended") return !e.status.active && e.status.label === "Ended";
    return true;
  });

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-site-gradient flex flex-col justify-between">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Subtle dot pattern and glow overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#00c9e415_1.5px,transparent_1.5px)] [background-size:28px_28px] opacity-70 pointer-events-none" />
        <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full bg-[#00C9E4]/12 blur-[110px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-[#0067B1]/10 blur-[100px] pointer-events-none" />

        <div className="relative container mx-auto px-6">
          <div className="max-w-3xl">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 bg-[#00C9E4]/15 border border-[#00C9E4]/30 px-4 py-1.5 rounded-full text-[#0067B1] text-sm font-semibold mb-6 shadow-2xs">
              <Sparkles className="w-4 h-4 text-[#00C9E4]" />
              <span>Where Innovation Meets Industry</span>
            </div>

            {/* Title with UpCheck signature gradient */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
              Events &{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Hackathons
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl">
              Upcheck partners with top institutions as an industrial sponsor and jury — backing the
              boldest student builders in India.
            </p>

            {/* Smooth Scroll Button */}
            <button
              onClick={() =>
                document.getElementById("events-list")?.scrollIntoView({ behavior: "smooth" })
              }
              className="mt-8 inline-flex items-center gap-2 text-slate-500 hover:text-[#0067B1] font-medium transition-colors text-sm cursor-pointer"
            >
              <ChevronDown className="w-4 h-4 animate-bounce text-[#00C9E4]" />
              Explore events
            </button>
          </div>
        </div>
      </section>

      {/* Events Listing Section */}
      <section id="events-list" className="py-12 relative z-10">
        <div className="container mx-auto px-6">
          {/* Header & Filter Tabs */}
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900">All Events</h2>
              <p className="text-slate-500 text-sm mt-1">
                {filteredEvents.length} event{filteredEvents.length !== 1 ? "s" : ""} found
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-1.5 bg-white rounded-2xl p-1.5 shadow-sm border border-slate-200/80">
              {(["all", "live", "upcoming", "ended"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  style={
                    filter === tab
                      ? {
                          background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)",
                        }
                      : {}
                  }
                  className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all cursor-pointer ${
                    filter === tab
                      ? "text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Cards List */}
          <div className="space-y-6">
            {filteredEvents.length === 0 && (
              <div className="py-24 text-center bg-white rounded-3xl border border-slate-200/80 shadow-sm">
                <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-400 text-lg font-medium">No events in this category yet.</p>
              </div>
            )}

            {filteredEvents.map((event) => (
              <Link
                key={event.id}
                href={`/events/${event.slug}`}
                className="block group cursor-pointer"
              >
                <div className="relative bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  {/* Top Stripe with Upcheck Gradient */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1.5"
                    style={{
                      background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)",
                    }}
                  />

                  <div className="flex flex-col lg:flex-row">
                    {/* Event Image */}
                    <div className="relative lg:w-80 h-56 lg:h-auto overflow-hidden flex-shrink-0">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      {event.status.active && (
                        <div className="absolute top-4 left-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-white text-xs font-bold shadow-md ${
                              event.status.urgent ? "bg-rose-500" : "bg-emerald-500"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full bg-white ${
                                event.status.urgent ? "animate-ping" : "animate-pulse"
                              }`}
                            />
                            {event.status.label}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Event Content */}
                    <div className="flex-1 p-8 flex flex-col justify-between">
                      <div>
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {!event.status.active && event.status.label !== "Ended" && (
                            <span className="px-3 py-1 bg-blue-50 text-[#0067B1] rounded-full text-xs font-semibold border border-blue-100">
                              {event.status.label}
                            </span>
                          )}
                          {event.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-cyan-50 text-[#0067B1] rounded-full text-xs font-semibold border border-cyan-100/80"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Title & Subtitle */}
                        <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-1.5 group-hover:text-[#0067B1] transition-colors">
                          {event.title}
                        </h3>
                        <p className="text-slate-500 font-medium mb-3">{event.subtitle}</p>

                        {/* Upcheck Industrial Partner Badge */}
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200/80 px-3.5 py-1.5 rounded-xl mb-4">
                          <Trophy className="w-4 h-4 text-[#0067B1]" />
                          <span className="text-xs font-bold text-[#0067B1] uppercase tracking-wide">
                            Upcheck: Industrial Partner & Jury
                          </span>
                        </div>

                        <p className="text-slate-600 text-sm leading-relaxed max-w-xl">
                          {event.description}
                        </p>
                      </div>

                      {/* Event Meta Info & View Details Button */}
                      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 text-[#00C9E4]" />
                            {new Date(event.startDate).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-[#0067B1]" />
                            {event.duration}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-rose-500" />
                            {event.venue}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <div
                            style={{
                              background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)",
                            }}
                            className="inline-flex items-center gap-2 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all group-hover:shadow-md group-hover:brightness-105"
                          >
                            <span>View Details</span>
                            <ArrowRight className="w-4 h-4 transform transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Active Event Countdown Banner */}
                  {event.status.active && (
                    <div className="border-t border-cyan-100/80 bg-gradient-to-r from-[#eaf8fb] via-[#f4fafc] to-[#eaf8fb] px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <p className="text-slate-500 text-xs uppercase tracking-widest font-bold mb-1">
                          Registration closes in
                        </p>
                        <CountdownTimer endDate={event.endDate} />
                      </div>
                      <a
                        href={event.registration}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)",
                        }}
                        className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-sm hover:shadow-md hover:brightness-105 transition-all"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Register on Website</span>
                      </a>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration Call to Action (Actual Website Theme Gradient) */}
      <section
        className="relative py-20 px-6 overflow-hidden text-white mt-16"
        style={{ background: "linear-gradient(90deg, #59b2d8 0%, #4a87b3 100%)" }}
      >
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 border border-white/30 px-4 py-1.5 rounded-full text-white text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
            <span>Partner with us</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight leading-tight text-white">
            Want to Collaborate
            <br />
            on Your Next Event?
          </h2>

          <p className="text-base md:text-lg text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Upcheck loves supporting student innovation. Reach out to explore sponsorship,
            mentorship, or jury partnerships.
          </p>

          <a
            href="mailto:admin@upcheck.in"
            className="inline-flex items-center gap-3 bg-white text-[#0067B1] hover:bg-slate-50 px-8 py-4 rounded-xl font-bold text-base shadow-md transition-all duration-300 hover:scale-[1.03]"
          >
            <span>Get in Touch</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
