import React, { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Phone,
  Copy,
  Check,
  Share2,
  ChevronDown,
  ChevronUp,
  Award,
  Building2,
  Lightbulb,
  Globe,
} from "lucide-react";

export const EVENT_DETAIL_DATA = {
  title: "Makeathon 7.0",
  subtitle: "National Level Hardware & Software Hackathon",
  description:
    "A 24-hour innovation-driven hackathon where student innovators from institutions across India tackle real-world, industry-oriented challenges.",
  longDescription:
    "Makeathon 7.0 is the flagship event of the Department of Electronics and Communication Engineering at Sri Venkateswara College of Engineering. This national-level hackathon brings together hundreds of talented students to solve real-world challenges through innovative hardware and software solutions. Compete, collaborate, and create alongside the brightest minds from across India.",
  startDate: "2026-04-15T00:00:00",
  endDate: "2026-04-16T23:59:59",
  venue: "Sri Venkateswara College of Engineering (SVCE), Sriperumbudur, Tamil Nadu",
  venueShort: "SVCE, Sriperumbudur",
  organizer: "Department of ECE, SVCE",
  teamSize: "4–6 Members",
  image:
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  website: "https://make-a-thon-7.in",
  registration: "https://forms.gle/MSiu9x7Mo2kYBmmA9",
  highlights: [
    { icon: "⏱", label: "24-Hour Sprint", desc: "Continuous non-stop hackathon format" },
    { icon: "🏆", label: "National Stage", desc: "Compete with teams from all over India" },
    { icon: "🧠", label: "Real Problems", desc: "Industry-oriented challenge statements" },
    {
      icon: "🍹",
      label: "Food and Beverages",
      desc: "Free meals and refreshments provided throughout the event.",
    },
    { icon: "💼", label: "Internships", desc: "Opportunities from top sponsors" },
    { icon: "🤝", label: "Networking", desc: "Connect with industry leaders" },
  ],
  domains: [
    "IoT & Embedded Systems",
    "AI / Machine Learning",
    "Smart Cities",
    "Healthcare Tech",
    "Fintech",
    "Open Innovation",
  ],
  coordinators: [
    { name: "Roshan M", phone: "98410 92274" },
    { name: "Adarsh S", phone: "73059 70106" },
    { name: "Yaaminy S K", phone: "63809 89594" },
    { name: "Roobuck Rao C", phone: "81482 04922" },
    { name: "Mohammed Raeef", phone: "91501 58647" },
    { name: "Harinee V T", phone: "73581 20955" },
  ],
  organizingBodies: [
    {
      name: "RACE",
      fullName: "Research Association for Innovative Design in Communication and Electronics",
    },
    {
      name: "IETE-SF",
      fullName: "Institution of Electronics and Telecommunication Engineers – Students Forum",
    },
    {
      name: "ECEA",
      fullName: "Electronics and Communication Engineers Association",
    },
  ],
  faqs: [
    {
      q: "Who can participate?",
      a: "Any student currently enrolled in an undergraduate or postgraduate programme at a recognised college/university in India. You need a team of 4–6 members.",
    },
    {
      q: "Is there a registration fee?",
      a: "Registration fees and other details are mentioned on the official Makeathon 7.0 website. Please refer to make-a-thon-7.in for the latest information.",
    },
    {
      q: "What should I bring?",
      a: "Bring your laptop, charger, and any hardware components your project requires. Food and accommodation details will be communicated after registration.",
    },
    {
      q: "Can teams have members from different colleges?",
      a: "No. Teams must consist of members from the same college, but can include students from different departments or years of study.",
    },
  ],
};

function CountdownTimerDetail({ endDate }: { endDate: string }) {
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
    <div className="flex flex-col items-center min-w-[3.25rem]">
      <div className="bg-slate-50 border border-cyan-200/80 rounded-xl w-13 h-13 flex items-center justify-center shadow-xs">
        <span className="text-slate-900 font-extrabold text-xl tabular-nums leading-none">
          {String(val).padStart(2, "0")}
        </span>
      </div>
      <span className="text-slate-500 text-[10px] mt-1.5 uppercase tracking-widest font-bold">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex items-end gap-1.5">
      <Box val={timeLeft.d} label="Days" />
      <span className="text-slate-300 text-xl font-light mb-6">:</span>
      <Box val={timeLeft.h} label="Hrs" />
      <span className="text-slate-300 text-xl font-light mb-6">:</span>
      <Box val={timeLeft.m} label="Min" />
      <span className="text-slate-300 text-xl font-light mb-6">:</span>
      <Box val={timeLeft.s} label="Sec" />
    </div>
  );
}

function CoordinatorCard({ name, phone }: { name: string; phone: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(phone.replace(/\s/g, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="group relative bg-white border border-slate-200/80 rounded-2xl p-4 hover:border-cyan-300 hover:shadow-md transition-all duration-200">
      <div className="flex items-center gap-3 mb-3">
        <div
          style={{
            background: "linear-gradient(135deg, #00C9E4 0%, #0067B1 100%)",
          }}
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 shadow-xs"
        >
          <span className="text-white text-xs font-black">{initials}</span>
        </div>
        <div>
          <p className="font-bold text-slate-900 text-sm leading-tight">{name}</p>
          <p className="text-slate-500 text-xs">{phone}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <a
          href={`tel:${phone.replace(/\s/g, "")}`}
          style={{
            background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)",
          }}
          className="flex-1 flex items-center justify-center gap-1.5 text-white text-xs font-bold py-2 rounded-lg hover:brightness-105 transition-all shadow-xs"
          onClick={(e) => e.stopPropagation()}
        >
          <Phone className="w-3 h-3" />
          <span>Call</span>
        </a>
        <button
          onClick={handleCopy}
          className="flex items-center justify-center gap-1.5 bg-slate-50 border border-slate-200 text-slate-600 text-xs font-semibold py-2 px-3 rounded-lg hover:bg-slate-100 transition-all cursor-pointer"
        >
          {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
    </div>
  );
}

function FAQCard({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
        open
          ? "border-cyan-300 bg-cyan-50/30 shadow-xs"
          : "border-slate-200/80 bg-white hover:border-slate-300"
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left cursor-pointer"
      >
        <span className="font-bold text-slate-900 text-sm">{title}</span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-[#0067B1] flex-shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-6 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100">
          {children}
        </div>
      )}
    </div>
  );
}

function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch (err) {
        // user cancelled or unsupported
      }
    }
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 border border-slate-200 text-slate-600 px-4 py-2 rounded-xl text-sm font-semibold hover:border-cyan-300 hover:text-[#0067B1] transition-all duration-200 cursor-pointer"
    >
      {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
      <span>{copied ? "Link copied!" : "Share"}</span>
    </button>
  );
}

export default function EventDetail() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("overview");
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    setMounted(true);
    window.scrollTo(0, 0);
  }, []);

  const data = EVENT_DETAIL_DATA;

  const scrollToSection = (tabId: string) => {
    setActiveTab(tabId);
    sectionRefs.current[tabId]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-site-gradient flex flex-col justify-between">
      <Navigation />

      {/* Hero Header Section */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#00c9e415_1.5px,transparent_1.5px)] [background-size:28px_28px] opacity-70 pointer-events-none" />
        <div className="absolute top-10 left-1/3 w-96 h-96 rounded-full bg-[#00C9E4]/12 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-[#0067B1]/10 blur-[90px] pointer-events-none" />

        <div className="relative container mx-auto px-6">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-[#0067B1] font-medium transition-colors text-sm mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Events</span>
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-end gap-10">
            {/* Left Info */}
            <div className="flex-1 pb-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  LIVE NOW
                </span>
                <span className="inline-flex items-center gap-1.5 bg-cyan-50 border border-cyan-200 text-[#0067B1] text-xs font-semibold px-3 py-1 rounded-full shadow-2xs">
                  <Sparkles className="w-3 h-3 text-[#00C9E4]" />
                  Featured Event
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[1.05] mb-3 tracking-tight">
                Makeathon{" "}
                <span
                  style={{
                    background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  7.0
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 font-medium mb-6">{data.subtitle}</p>

              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600">
                <span className="inline-flex items-center gap-1.5 bg-white/80 border border-slate-200/80 px-3 py-1.5 rounded-xl shadow-2xs">
                  <Calendar className="w-4 h-4 text-[#00C9E4]" />
                  {new Date(data.startDate).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white/80 border border-slate-200/80 px-3 py-1.5 rounded-xl shadow-2xs">
                  <Clock className="w-4 h-4 text-[#0067B1]" />
                  24 Hours
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white/80 border border-slate-200/80 px-3 py-1.5 rounded-xl shadow-2xs">
                  <MapPin className="w-4 h-4 text-rose-500" />
                  {data.venueShort}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white/80 border border-slate-200/80 px-3 py-1.5 rounded-xl shadow-2xs">
                  <Users className="w-4 h-4 text-amber-500" />
                  {data.teamSize}
                </span>
              </div>
            </div>

            {/* Right Countdown & Action Card */}
            <div className="lg:w-84 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-lg">
              <p className="text-slate-500 text-xs uppercase tracking-widest font-bold mb-3">
                Registration closes in
              </p>
              <CountdownTimerDetail endDate={data.endDate} />
              <div className="mt-5 space-y-2.5">
                <a
                  href={data.registration}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)",
                  }}
                  className="flex items-center justify-center gap-2 w-full text-white py-3.5 rounded-xl font-bold text-sm shadow-md hover:brightness-105 hover:shadow-lg transition-all duration-200"
                >
                  <span>Register Now</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <a
                  href={data.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 py-3 rounded-xl font-semibold text-sm transition-all duration-200"
                >
                  <Globe className="w-4 h-4 text-slate-500" />
                  <span>Official Website</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Tab Navigation */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
            {[
              { id: "overview", label: "Overview" },
              { id: "problem", label: "Problem Statement" },
              { id: "highlights", label: "Highlights" },
              { id: "coordinators", label: "Coordinators" },
              { id: "faq", label: "FAQ" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className={`flex-shrink-0 px-5 py-4 text-sm font-bold border-b-2 transition-all duration-200 cursor-pointer ${
                  activeTab === tab.id
                    ? "border-[#00C9E4] text-[#0067B1]"
                    : "border-transparent text-slate-500 hover:text-slate-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
            <div className="ml-auto flex-shrink-0 py-2">
              <ShareButton title={data.title} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-6 py-12 space-y-12">
        {/* Banner with Feature Chips */}
        <div className="relative rounded-3xl overflow-hidden h-72 md:h-96 shadow-xl border border-slate-200/80">
          <img src={data.image} alt={data.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-8 right-8 flex items-end justify-between">
            <div className="flex gap-2.5 flex-wrap">
              <div className="bg-white/15 backdrop-blur-md border border-white/25 rounded-xl px-4 py-2 text-center text-white">
                <p className="font-extrabold text-base">Creative</p>
                <p className="text-white/80 text-[11px] uppercase tracking-wider">Thinking</p>
              </div>
              <div className="bg-white/15 backdrop-blur-md border border-white/25 rounded-xl px-4 py-2 text-center text-white">
                <p className="font-extrabold text-base">Futuristic</p>
                <p className="text-white/80 text-[11px] uppercase tracking-wider">Technologies</p>
              </div>
              <div className="bg-white/15 backdrop-blur-md border border-white/25 rounded-xl px-4 py-2 text-center text-white">
                <p className="font-extrabold text-base">Endless</p>
                <p className="text-white/80 text-[11px] uppercase tracking-wider">Innovations</p>
              </div>
              <div className="bg-white/15 backdrop-blur-md border border-white/25 rounded-xl px-4 py-2 text-center text-white">
                <p className="font-extrabold text-base">Peer</p>
                <p className="text-white/80 text-[11px] uppercase tracking-wider">Networking</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Overview */}
        <div ref={(el) => (sectionRefs.current.overview = el)} className="scroll-mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left 2 Cols: About & Domains */}
            <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm">
              <h2 className="text-2xl font-extrabold text-slate-900 mb-1 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#00C9E4]" />
                About Makeathon 7.0
              </h2>
              <p className="text-slate-500 text-sm mb-5">Organised by Dept. of ECE, SVCE</p>
              <p className="text-slate-700 leading-relaxed text-base">{data.longDescription}</p>

              <div className="mt-8">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Challenge Domains
                </p>
                <div className="flex flex-wrap gap-2">
                  {data.domains.map((domain) => (
                    <span
                      key={domain}
                      className="px-3.5 py-1.5 bg-cyan-50/70 border border-cyan-100 text-[#0067B1] rounded-xl text-sm font-semibold"
                    >
                      {domain}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col: Meet Upcheck & Organised by */}
            <div className="space-y-4">
              {/* Meet UpCheck */}
              <div
                style={{
                  background: "linear-gradient(135deg, #0067B1 0%, #00C9E4 100%)",
                }}
                className="rounded-3xl p-6 text-white shadow-md"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-extrabold text-sm">Meet UpCheck</p>
                    <p className="text-white/80 text-xs">at Makeathon 7.0</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/15 border border-white/20 rounded-xl p-3">
                    <p className="font-bold text-sm mb-0.5">🏭 Industry Sponsor</p>
                    <p className="text-white/80 text-xs">
                      Supporting innovation with industry resources and exposure.
                    </p>
                  </div>
                  <div className="bg-white/15 border border-white/20 rounded-xl p-3">
                    <p className="font-bold text-sm mb-0.5">⚖️ Jury Panel</p>
                    <p className="text-white/80 text-xs">
                      We evaluate and mentor participating teams.
                    </p>
                  </div>
                  <div className="bg-white/15 border border-white/20 rounded-xl p-3">
                    <p className="font-bold text-sm mb-0.5">💼 Internship Paths</p>
                    <p className="text-white/80 text-xs">
                      Top teams working on our challenge get internship opportunities.
                    </p>
                  </div>
                </div>
              </div>

              {/* Organised By */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#0067B1]" />
                  Organised by
                </p>
                <div className="space-y-3">
                  {data.organizingBodies.map((body, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span
                        style={{
                          background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)",
                        }}
                        className="mt-0.5 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md flex-shrink-0"
                      >
                        {body.name}
                      </span>
                      <p className="text-slate-600 text-xs leading-snug">{body.fullName}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Problem Statement */}
        <div ref={(el) => (sectionRefs.current.problem = el)} className="scroll-mt-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-cyan-100 rounded-2xl flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-[#0067B1]" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Industry Problem Statement</h2>
              <p className="text-slate-500 text-sm">Presented by UpCheck</p>
            </div>
          </div>

          <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-dashed border-amber-300 rounded-3xl p-12 text-center overflow-hidden">
            <div className="relative">
              <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-amber-200">
                <Lightbulb className="w-8 h-8 text-amber-500" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-3">
                Problem Statement Coming Soon
              </h3>
              <p className="text-slate-600 max-w-lg mx-auto text-sm leading-relaxed mb-6">
                We're crafting an exciting real-world challenge in technology. Our problem statement
                will be revealed during the hackathon kickoff session — stay tuned!
              </p>
              <div className="inline-flex items-center gap-2 bg-amber-100 border border-amber-200 text-amber-800 text-xs font-semibold px-4 py-2 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                <span>Announced at kickoff</span>
              </div>
            </div>
          </div>

          {/* Official Problem Statements Banner */}
          <div className="mt-6 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-[#0067B1] mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-bold text-slate-900 text-sm mb-1">
                  Official College Problem Statements
                </p>
                <p className="text-slate-500 text-xs leading-relaxed">
                  The organizers have published problem statements across IoT, AI/ML, Smart Cities,
                  and more on the official website.
                </p>
              </div>
            </div>
            <a
              href={`${data.website}/#problems`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)",
              }}
              className="flex-shrink-0 inline-flex items-center gap-2 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-xs hover:brightness-105 transition-all"
            >
              <span>View All</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Section: Highlights */}
        <div ref={(el) => (sectionRefs.current.highlights = el)} className="scroll-mt-20">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-6">Event Highlights</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.highlights.map((item, idx) => (
              <div
                key={idx}
                className="group bg-white border border-slate-200/80 rounded-2xl p-6 hover:border-cyan-300 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <p className="font-extrabold text-slate-900 mb-1">{item.label}</p>
                <p className="text-slate-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Coordinators */}
        <div ref={(el) => (sectionRefs.current.coordinators = el)} className="scroll-mt-20">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-extrabold text-slate-900">Student Coordinators</h2>
            <span className="bg-cyan-50 text-[#0067B1] border border-cyan-100 text-xs font-bold px-2.5 py-1 rounded-full">
              {data.coordinators.length}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.coordinators.map((coordinator, idx) => (
              <CoordinatorCard key={idx} {...coordinator} />
            ))}
          </div>
        </div>

        {/* Section: FAQ */}
        <div ref={(el) => (sectionRefs.current.faq = el)} className="scroll-mt-20">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3 max-w-3xl">
            {data.faqs.map((faq, idx) => (
              <FAQCard key={idx} title={faq.q}>
                <p className="pt-3">{faq.a}</p>
              </FAQCard>
            ))}
          </div>
        </div>
      </div>

      {/* Collaboration Call to Action (Actual Website Gradient) */}
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
            UpCheck loves supporting student innovation. Reach out to explore sponsorship,
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
