import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Calendar,
  Clock,
  MapPin,
  Search,
  BookOpen,
  Users,
  TrendingUp,
  Award,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

// Upcoming Program Interface
interface Program {
  id: string;
  title: string;
  type: "Webinar" | "Workshop" | "Training" | "Meet-up";
  dates: string;
  location: string;
  geographicFocus: string;
  deadline: string;
  description: string;
  highlights?: string[];
  status: "Open" | "Closed";
  image: string;
  partnerLogos: { name: string; color: string }[];
}

const PROGRAMS_DATA: Program[] = [
  {
    id: "1",
    title: "Smart Aquaculture Webinar",
    type: "Webinar",
    dates: "12. September, 2026",
    location: "Online via Zoom Link",
    geographicFocus: "Global Focus",
    deadline: "10. September, 2026",
    description: "Join industry experts to learn about the latest developments in smart aquaculture technology.",
    highlights: [
      "AI in aquaculture",
      "IoT monitoring",
      "Data-driven farming",
      "Industry experts"
    ],
    status: "Open",
    image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&w=800&q=80",
    partnerLogos: [
      { name: "UpCheck", color: "#00C9E4" }
    ]
  },
  {
    id: "2",
    title: "UpCheck Product Demo",
    type: "Workshop",
    dates: "05. October, 2026",
    location: "Online / Live Stream",
    geographicFocus: "Global Focus",
    deadline: "03. October, 2026",
    description: "See the UpCheck devices in action during this comprehensive walk-through and Q&A session.",
    highlights: [
      "Live demonstration of the UpCheck device",
      "Mobile app walkthrough",
      "Q&A session"
    ],
    status: "Open",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    partnerLogos: [
      { name: "UpCheck", color: "#00C9E4" }
    ]
  },
  {
    id: "3",
    title: "Student Innovation Challenge",
    type: "Workshop",
    dates: "14. November, 2026",
    location: "Online & On-site",
    geographicFocus: "National Focus",
    deadline: "12. November, 2026",
    description: "Showcase your IoT ideas and AI applications for building next-generation aquaculture solutions.",
    highlights: [
      "Build aquaculture solutions",
      "IoT ideas",
      "AI applications",
      "Project showcase"
    ],
    status: "Open",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    partnerLogos: [
      { name: "UpCheck", color: "#00C9E4" }
    ]
  },
  {
    id: "4",
    title: "Community Meet-up",
    type: "Meet-up",
    dates: "12. December, 2026",
    location: "Chennai, Tamil Nadu, India",
    geographicFocus: "Regional Focus",
    deadline: "08. December, 2026",
    description: "Connect with local shrimp farmers for knowledge sharing, networking, and discussions on the latest industry trends.",
    highlights: [
      "Meet local shrimp farmers",
      "Knowledge sharing",
      "Industry discussions"
    ],
    status: "Open",
    image: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&w=800&q=80",
    partnerLogos: [
      { name: "UpCheck", color: "#00C9E4" }
    ]
  }
];

// Past Programs Interface
interface PastProgram {
  title: string;
  subtitle: string;
  role: string;
  description: string;
  image: string;
}

const PAST_PROGRAMS_DATA: PastProgram[] = [
  {
    title: "Make-a-thon 7.0",
    subtitle: "National Level Hardware & Software Hackathon",
    role: "UPCHECK: INDUSTRIAL PARTNER & JURY",
    description: "A 24-hour national hackathon where student innovators develop hardware and software solutions to solve real-world challenges in aquaculture, sustainability, and smart farming.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Smart Aquaculture Webinar",
    subtitle: "Expert Session on AI & IoT in Aquaculture",
    role: "UPCHECK: KNOWLEDGE PARTNER",
    description: "An interactive webinar featuring industry experts discussing AI, IoT, and data-driven technologies that are transforming modern aquaculture and improving farm productivity.",
    image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Innovation Challenge",
    subtitle: "National Innovation Competition",
    role: "UPCHECK: ORGANIZER & MENTOR",
    description: "A competition inviting students, researchers, and startups to present innovative ideas and technology solutions that address key challenges in sustainable aquaculture and smart farming.",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=600&q=80",
  }
];



// FAQs
const FAQS = [
  {
    question: "Is registration free?",
    answer: "Most of our online webinars and virtual community meetups are completely free. Certain specialized, hands-on offline workshops and certification programs may have a nominal fee to cover local logistics, catering, and printed reference materials."
  },
  {
    question: "Who can attend UpCheck events?",
    answer: "Our events are open to shrimp and fish farmers, hatchery managers, agricultural extension officers, researchers, students, and anyone interested in sustainable aquaculture and smart IoT farming technologies."
  },
  {
    question: "Will participation certificates be provided?",
    answer: "Yes, verified digital participation certificates are provided to attendees of our core Training Camps and hands-on Workshops after attendance verification."
  },
  {
    question: "Are online events recorded?",
    answer: "Yes, all our webinars are recorded. A link to access the video recording, presentation slides, and shared resource guidelines will be emailed to all registered participants within 24 hours of the live session."
  },
  {
    question: "How do I join online events?",
    answer: "Once you register for an online event, you will receive a confirmation email with a unique Zoom or Google Meet link, along with calendar invitation files to set a reminder."
  }
];

export default function Events() {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // Registration Dialog State
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    pondCount: "1-3",
    notes: ""
  });

  // Carousel Index state for Past Programs
  const [pastIndex, setPastIndex] = useState(0);

  const nextPast = () => {
    setPastIndex((prev) => (prev + 1) % PAST_PROGRAMS_DATA.length);
  };

  const prevPast = () => {
    setPastIndex((prev) => (prev - 1 + PAST_PROGRAMS_DATA.length) % PAST_PROGRAMS_DATA.length);
  };

  const handleRegisterClick = (eventId: string) => {
    setSelectedEventId(eventId);
    setIsRegistered(false);
    setIsDialogOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;
    
    // Simulate API registration call
    setTimeout(() => {
      setIsRegistered(true);
    }, 400);
  };

  const selectedEvent = PROGRAMS_DATA.find(e => e.id === selectedEventId) || PROGRAMS_DATA[0];

  const filteredPrograms = PROGRAMS_DATA.filter(prog => {
    const matchesFilter = selectedFilter === "All" || prog.type === selectedFilter;
    const matchesSearch = prog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          prog.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          prog.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const scrollEvents = () => {
    const section = document.getElementById("our-programs-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-site-gradient text-[#0F172A] dark:text-[#F8FAFC] flex flex-col font-sans">
      <Navigation />

      {/* 1. HERO SECTION */}
      <section 
        className="relative min-h-[50vh] md:min-h-[60vh] pt-48 pb-32 md:pt-56 md:pb-40 px-6 flex items-center justify-center overflow-hidden border-b border-white/10"
        style={{ background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)" }}
      >
        {/* Subtle mesh background grid */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none -z-10" />
        
        <div className="container mx-auto max-w-4xl text-center relative z-10">

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-white"
          >
            Events
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-white/95 max-w-2xl mx-auto mb-10 leading-relaxed font-semibold"
          >
            Join webinars, workshops, training sessions, and community events designed to help aquaculture professionals learn, connect, and grow.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              onClick={scrollEvents}
              className="px-8 h-14 bg-white hover:bg-slate-50 text-[#0067B1] border-none shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 font-bold"
            >
              View Programs
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => handleRegisterClick("1")}
              className="px-8 h-14 backdrop-blur-sm border-white/40 hover:border-white text-white bg-transparent hover:bg-white/10 font-bold transition-all duration-300"
            >
              Register
            </Button>
          </motion.div>
        </div>
      </section>

      {/* 2. OUR PROGRAMS SECTION (Inspired by Hatch Blue) */}
      <section id="our-programs-section" className="py-24 px-6 bg-white dark:bg-[#0B1321] scroll-mt-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#0F172A] dark:text-white mb-4">
              Our Programs
            </h2>
            <p className="text-[#475569] dark:text-[#94A3B8] text-lg max-w-xl mx-auto">
              Incubating ideas, connecting farmers, and validating aquaculture technologies.
            </p>
          </div>

          {/* Search + Filter chip toolbar */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-12 max-w-4xl mx-auto bg-[#F1F5F9]/60 dark:bg-[#1E293B]/40 p-4 rounded-2xl border border-[#E2E8F0] dark:border-[#334155]/60">
            {/* Filter Chips */}
            <div className="flex flex-wrap gap-2 items-center w-full md:w-auto">
              {["All", "Webinar", "Workshop", "Training", "Meet-up"].map(filter => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-200 ${
                    selectedFilter === filter
                      ? "bg-[#0067B1] text-white shadow-sm"
                      : "bg-[#E2E8F0]/80 dark:bg-[#1E293B]/80 text-[#64748B] dark:text-[#94A3B8] hover:bg-[#CBD5E1] hover:text-[#0F172A] dark:hover:bg-[#334155] dark:hover:text-white"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4.5 h-4.5" />
              <Input
                type="text"
                placeholder="Search programs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 h-10 bg-white dark:bg-[#152033] border-[#E2E8F0] dark:border-[#334155] focus-visible:ring-cyan-500 rounded-full text-xs"
              />
            </div>
          </div>

          {/* Programs Grid */}
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {filteredPrograms.length > 0 ? (
              filteredPrograms.map((prog) => (
                <div key={prog.id} className="flex flex-col group space-y-4">
                  {/* Hatch Blue Landscape Overlay Card */}
                  <div className="relative aspect-[1.5] w-full rounded-2xl overflow-hidden shadow-md border border-[#E2E8F0]/80 dark:border-[#1E293B]">
                    <img
                      src={prog.image}
                      alt={prog.title}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                    
                    {/* Blue Catalyst styled overlay */}
                    <div className="absolute inset-0 bg-[#0F172A]/70 flex flex-col justify-between p-8 text-white z-10">
                      
                      {/* Top Corner Title */}
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
                          {prog.title}
                        </h3>
                      </div>

                      {/* Middle metadata block */}
                      <div className="space-y-2 mt-4">
                        <div className="text-xs font-semibold text-white/90 flex flex-col space-y-1">
                          <div>
                            <span className="text-[#90E0EF] uppercase font-bold mr-1">Dates:</span> {prog.dates}
                          </div>
                          <div>
                            <span className="text-[#90E0EF] uppercase font-bold mr-1">Location:</span> {prog.location}
                          </div>
                          <div>
                            <span className="text-[#90E0EF] uppercase font-bold mr-1">Geographic Focus:</span> {prog.geographicFocus}
                          </div>
                        </div>

                        {/* Thin horizontal divider */}
                        <div className="border-t border-white/20 my-3" />

                        {/* Application deadline */}
                        <div className="text-xs font-bold text-white/95">
                          <span className="text-[#00C9E4] uppercase mr-1">Application Deadline:</span> {prog.deadline}
                        </div>
                      </div>


                    </div>
                  </div>

                  {/* Below Card Layout */}
                  <div className="space-y-3 text-left">
                    <h4 className="text-2xl font-extrabold tracking-tight text-[#0F172A] dark:text-white">
                      {prog.title}
                    </h4>
                    
                    <p className="text-sm text-[#475569] dark:text-[#94A3B8] leading-relaxed">
                      {prog.description}
                    </p>

                    {prog.highlights && prog.highlights.length > 0 && (
                      <ul className="text-sm space-y-1.5 text-[#475569] dark:text-[#94A3B8] list-disc list-inside pl-1 py-1">
                        {prog.highlights.map((highlight, idx) => (
                          <li key={idx} className="font-medium">
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Double Split Buttons */}
                    <div className="flex gap-4 pt-2">
                      <Button
                        onClick={scrollEvents} // Smooth scroll or focus
                        className="w-1/2 h-11 bg-white border border-[#CBD5E1] dark:border-[#334155] text-[#0067B1] hover:bg-slate-50 dark:hover:bg-slate-800 dark:bg-transparent font-bold text-xs uppercase tracking-wider rounded-lg transition-colors"
                      >
                        View Program
                      </Button>
                      
                      {prog.status === "Open" ? (
                        <Button
                          onClick={() => handleRegisterClick(prog.id)}
                          className="w-1/2 h-11 bg-[#0067B1] hover:bg-[#005c9e] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-transform hover:scale-[1.02] shadow-sm"
                        >
                          Apply Now
                        </Button>
                      ) : (
                        <Button
                          disabled
                          className="w-1/2 h-11 bg-[#E2E8F0] dark:bg-[#1E293B] text-[#94A3B8] font-bold text-xs uppercase tracking-wider rounded-lg border border-[#CBD5E1] dark:border-transparent cursor-not-allowed"
                        >
                          Applications Closed
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-16 bg-[#F8FAFC] dark:bg-[#152033] border border-[#E2E8F0] dark:border-[#1E293B] rounded-2xl max-w-md mx-auto shadow-xs">
                <Search className="w-10 h-10 text-[#94A3B8] mx-auto mb-4" />
                <h3 className="text-base font-bold">No programs match filters</h3>
                <p className="text-xs text-muted-foreground mt-1">Try another category or keyword search query.</p>
              </div>
            )}
          </div>
        </div>
      </section>



      {/* 4. PAST PROGRAMS SECTION (Hatch Blue Inspired Carousel Slider) */}
      <section className="py-24 px-6 border-t border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#0B1321]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#0F172A] dark:text-white mb-4">
              Past Programs
            </h2>
            <p className="text-[#475569] dark:text-[#94A3B8] text-lg max-w-xl mx-auto">
              Learn about previous aquaculture labs, cohorts, and accelerator studios.
            </p>
          </div>

          {/* Carousel Wrapper */}
          <div className="relative max-w-5xl mx-auto overflow-hidden px-4">
            <motion.div
              animate={{ x: `-${pastIndex * 33.33}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex gap-6 w-full cursor-grab active:cursor-grabbing"
              style={{ display: "flex" }}
            >
              {PAST_PROGRAMS_DATA.map((item, i) => (
                <div
                  key={i}
                  tabIndex={0}
                  className="w-[calc(100%-12px)] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 relative aspect-[0.8] rounded-2xl overflow-hidden group shadow-md border border-[#E2E8F0] dark:border-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#00C9E4]"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  {/* Interactive details overlay */}
                  <div className="absolute inset-0 bg-[#0F2C59]/70 group-hover:bg-[#0F2C59]/90 group-focus:bg-[#0F2C59]/90 flex flex-col justify-end p-6 text-white transition-all duration-300 ease-in-out z-10">
                    <h4 className="text-lg md:text-xl font-bold tracking-tight text-white transition-transform duration-300 group-hover:-translate-y-2 group-focus:-translate-y-2">
                      {item.title}
                    </h4>
                    
                    {/* Content visible only on hover / focus */}
                    <div className="max-h-0 opacity-0 overflow-hidden group-hover:max-h-[300px] group-focus:max-h-[300px] group-hover:opacity-100 group-focus:opacity-100 transition-all duration-500 ease-in-out mt-1 space-y-2">
                      <p className="text-xs font-bold text-[#00C9E4] uppercase tracking-wider">
                        {item.subtitle}
                      </p>
                      <div className="text-xs font-extrabold text-[#90E0EF]">
                        {item.role}
                      </div>
                      <p className="text-xs text-white/90 leading-relaxed font-medium">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Slider Controls Footer */}
          <div className="max-w-5xl mx-auto flex items-center justify-between mt-10 px-4 lg:hidden">
            {/* Dots left */}
            <div className="flex gap-2">
              {PAST_PROGRAMS_DATA.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setPastIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    pastIndex === idx
                      ? "bg-[#F06A3A] w-6"
                      : "bg-[#CBD5E1] dark:bg-[#334155] hover:bg-[#94A3B8]"
                  }`}
                />
              ))}
            </div>

            {/* Arrows right */}
            <div className="flex items-center gap-3">
              <button
                onClick={prevPast}
                className="w-10 h-10 rounded-full border border-[#CBD5E1] dark:border-[#334155] flex items-center justify-center text-[#475569] dark:text-[#94A3B8] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Previous past program"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextPast}
                className="w-10 h-10 rounded-full border border-[#CBD5E1] dark:border-[#334155] flex items-center justify-center text-[#475569] dark:text-[#94A3B8] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Next past program"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FREQUENTLY ASKED QUESTIONS SECTION */}
      <section className="py-24 px-6 border-t border-[#E2E8F0] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#0B1524]">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#0F172A] dark:text-white mb-4 flex items-center justify-center gap-2">
              <HelpCircle className="w-8 h-8 text-[#0067B1]" />
              FAQ
            </h2>
            <p className="text-[#475569] dark:text-[#94A3B8] text-lg">
              Have questions about attending our sessions? Check out details below.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#1E293B] rounded-xl px-6 hover:shadow-sm transition-all duration-200"
              >
                <AccordionTrigger className="text-left font-bold text-base hover:no-underline py-4 text-[#0F172A] dark:text-white">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#475569] dark:text-[#94A3B8] leading-relaxed pb-4 text-sm font-medium">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* 6. CALL TO ACTION SECTION */}
      <section className="relative py-24 px-6 overflow-hidden text-white"
               style={{ background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)" }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-60 pointer-events-none" />
        
        <div className="container mx-auto max-w-4xl text-center relative z-10 space-y-8">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-white">
            Ready to Join Our Next Event?
          </h2>
          <p className="text-lg text-white/90 max-w-xl mx-auto leading-relaxed font-semibold">
            Stay connected with the UpCheck community and never miss an opportunity to learn, improve yield metrics, and grow.
          </p>
          <Button
            size="lg"
            onClick={() => handleRegisterClick("1")}
            className="h-14 px-8 bg-white hover:bg-slate-50 text-cyan-800 rounded-xl font-bold shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center gap-2 mx-auto"
          >
            Register Now
            <ArrowRight className="w-5 h-5 text-cyan-800" />
          </Button>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />

      {/* REGISTRATION MODAL */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[450px] bg-white dark:bg-[#0F172A] border-none text-[#0F172A] dark:text-white p-6 rounded-2xl shadow-xl">
          <DialogHeader className="space-y-2 mb-4">
            <DialogTitle className="text-2xl font-extrabold tracking-tight">
              {isRegistered ? "Application Confirmed!" : "Program Application"}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm font-medium">
              {isRegistered 
                ? "You have successfully registered for the program. Check your email for details."
                : `Applying for: ${selectedEvent.title}`}
            </DialogDescription>
          </DialogHeader>

          {isRegistered ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto text-green-600">
                <CheckCircle className="w-10 h-10" />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-lg">See you there!</h4>
                <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                  A verification email containing calendar files and the access link has been sent to <strong>{formData.email}</strong>.
                </p>
              </div>
              <Button
                onClick={() => setIsDialogOpen(false)}
                className="w-full bg-[#0067B1] hover:bg-cyan-700 text-white mt-6 font-bold"
              >
                Close Window
              </Button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="name-input" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Full Name</label>
                <Input
                  id="name-input"
                  required
                  placeholder="e.g. Anand Kumar"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-slate-50 dark:bg-slate-800 border-none text-[#0F172A] dark:text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="email-input" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email Address</label>
                <Input
                  id="email-input"
                  required
                  type="email"
                  placeholder="e.g. anand@aquafarm.com"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="bg-slate-50 dark:bg-slate-800 border-none text-[#0F172A] dark:text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="phone-input" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Phone Number</label>
                <Input
                  id="phone-input"
                  required
                  type="tel"
                  placeholder="e.g. +91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="bg-slate-50 dark:bg-slate-800 border-none text-[#0F172A] dark:text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="pond-select" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">How many ponds do you manage?</label>
                <select
                  id="pond-select"
                  value={formData.pondCount}
                  onChange={(e) => setFormData(prev => ({ ...prev, pondCount: e.target.value }))}
                  className="w-full rounded-md border-none bg-slate-50 dark:bg-slate-800 px-3 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 text-[#0F172A] dark:text-white"
                >
                  <option value="1-3">1 to 3 ponds</option>
                  <option value="4-7">4 to 7 ponds</option>
                  <option value="8+">8 or more ponds</option>
                  <option value="None">I am not a farmer (Student/Scientist/Other)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="notes-textarea" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Special Request or Questions</label>
                <textarea
                  id="notes-textarea"
                  placeholder="Optional questions for experts..."
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  className="w-full rounded-md border-none bg-slate-50 dark:bg-slate-800 p-3 h-20 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none text-[#0F172A] dark:text-white"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="w-1/2 border-[#CBD5E1] dark:border-[#334155]"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="w-1/2 bg-[#0067B1] hover:bg-cyan-700 text-white font-bold"
                >
                  Apply Now
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
