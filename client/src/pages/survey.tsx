import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useMotionTemplate } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import fishFarmBg from "@assets/fish-farm-background.jpg";
import survey1 from "@assets/survey_1.png";

import { 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  HelpCircle,
  Database,
  Wrench,
  Users,
  Compass,
  ArrowLeft,
  X,
  Clock,
  ClipboardList
} from "lucide-react";

// Survey Data Types
interface SurveyQuestion {
  id: string;
  question: string;
  options: string[];
}

interface SurveyDetails {
  id: string;
  title: string;
  description: string;
  duration: string;
  questionsCount: number;
  status: "Open" | "Closing Soon" | "Closed";
  questions: SurveyQuestion[];
}

const SURVEYS_DATA: SurveyDetails[] = [
  {
    id: "water_quality",
    title: "Pond Water Quality Practices",
    description: "Tell us how you monitor and manage essential water quality parameters such as pH, dissolved oxygen, temperature, and overall pond health.",
    duration: "5 Minutes",
    questionsCount: 12,
    status: "Open",
    questions: [
      {
        id: "wq_q1",
        question: "How often do you measure Dissolved Oxygen (DO) in your ponds?",
        options: ["Multiple times daily", "Once daily", "Weekly", "Only when issues arise"]
      },
      {
        id: "wq_q2",
        question: "What equipment do you use for pH measurements?",
        options: ["Continuous floating telemetry sensors", "Handheld digital probes", "Chemical titration kits / test strips", "Do not measure pH regularly"]
      },
      {
        id: "wq_q3",
        question: "What is your target minimum Dissolved Oxygen level?",
        options: ["Above 5.0 mg/L", "4.0 to 5.0 mg/L", "3.0 to 4.0 mg/L", "Below 3.0 mg/L"]
      }
    ]
  },
  {
    id: "shrimp_health",
    title: "Shrimp Health & Disease Management",
    description: "Share your experience with disease prevention, health monitoring, antibiotic usage, and early warning signs observed during cultivation.",
    duration: "7 Minutes",
    questionsCount: 15,
    status: "Closing Soon",
    questions: [
      {
        id: "sh_q1",
        question: "Have you experienced crop loss due to disease in the last 2 cycles?",
        options: ["Yes, severe loss (over 50%)", "Yes, moderate loss (10-50%)", "Yes, minor loss (under 10%)", "No disease issues"]
      },
      {
        id: "sh_q2",
        question: "How do you detect early warning signs of disease in your ponds?",
        options: ["AI anomalies / predictive software alerts", "Visual inspection of shrimp & feed trays", "Periodic lab testing", "No early detection mechanism"]
      },
      {
        id: "sh_q3",
        question: "What is your primary method for disease prevention?",
        options: ["Strict biosecurity / water filtration", "Probiotics & water treatments", "Antibiotic treatments", "Immunostimulants & special feed"]
      }
    ]
  },
  {
    id: "feeding_ops",
    title: "Feeding & Farm Operations",
    description: "Help us understand your feeding practices, feed management strategies, and operational challenges throughout the farming cycle.",
    duration: "6 Minutes",
    questionsCount: 14,
    status: "Open",
    questions: [
      {
        id: "fo_q1",
        question: "How do you determine daily feed portions?",
        options: ["Acoustic / hydrophone feedback sensors", "AI / digital feeding tables & models", "Visual checks of feed trays", "Fixed feeding schedules"]
      },
      {
        id: "fo_q2",
        question: "What is your typical target Feed Conversion Ratio (FCR)?",
        options: ["Below 1.2", "1.2 to 1.5", "1.5 to 1.8", "Above 1.8"]
      },
      {
        id: "fo_q3",
        question: "How many times a day do you feed?",
        options: ["1 to 2 times", "3 to 4 times", "5 or more times", "Continuous automatic feeder"]
      }
    ]
  },
  {
    id: "tech_adoption",
    title: "Farm Technology & Digital Adoption",
    description: "Tell us about your experience with IoT devices, farm management software, mobile applications, and digital farming solutions.",
    duration: "5 Minutes",
    questionsCount: 10,
    status: "Open",
    questions: [
      {
        id: "ta_q1",
        question: "What software do you primarily use for farm record-keeping?",
        options: ["Dedicated aquaculture app (like UpCheck)", "General sheets / Excel files", "Traditional paper logbooks", "No formal record-keeping"]
      },
      {
        id: "ta_q2",
        question: "What is your biggest barrier to adopting automated IoT devices?",
        options: ["High upfront capital cost", "Lack of stable internet/power in remote ponds", "Technical complexity / training requirements", "Unsure of return on investment (ROI)"]
      },
      {
        id: "ta_q3",
        question: "Would you trust automated aerator controls linked to live DO sensors?",
        options: ["Yes, fully automated", "Yes, but with manual overrides", "No, prefer manual aerator schedule controls", "Do not use aerators"]
      }
    ]
  }
];

// Why Participate Cards Data
const WHY_PARTICIPATE_CARDS = [
  {
    title: "Improve Farm Productivity",
    description: "By sharing your operational data, you help us identify critical bottlenecks in pond performance, survival rates, and harvest outcomes. Your inputs allow us to refine predictive algorithms for daily pond management.",
    icon: Compass
  },
  {
    title: "Support Product Innovation",
    description: "Directly influence the roadmap of UpCheck's next-generation sensors and automated feeding controllers. Your real-world feedback ensures that we build practical features that address actual challenges on the farm.",
    icon: Wrench
  },
  {
    title: "Strengthen the Farming Community",
    description: "Join a network of progressive aquaculturists sharing knowledge and benchmarks. Aggregated, anonymized survey findings are shared back with the community, empowering farmers to learn from regional trends.",
    icon: Users
  },
  {
    title: "Enable Data-Driven Decisions",
    description: "Help accelerate the transition to sustainable and highly profitable precision aquaculture. Your data enables us to develop better environmental models and reduce feed waste.",
    icon: Database
  }
];

export default function Survey() {
  const [selectedSurveyId, setSelectedSurveyId] = useState<string>(SURVEYS_DATA[0].id);
  const [activeSurveyModal, setActiveSurveyModal] = useState<SurveyDetails | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [surveyAnswers, setSurveyAnswers] = useState<Record<string, string>>({});
  const [surveySubmitted, setSurveySubmitted] = useState(false);
  const { toast } = useToast();

  // Mouse tilt values for Hero Showcase
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-200, 200], [12, -12]);
  const rotateY = useTransform(mouseX, [-200, 200], [-12, 12]);

  // Spotlight coordinates mapped from center offset for liquid glass glare
  const spotlightX = useTransform(mouseX, [-200, 200], [0, 380]);
  const spotlightY = useTransform(mouseY, [-250, 250], [0, 460]);
  const spotlightBg = useMotionTemplate`radial-gradient(circle 140px at ${spotlightX}px ${spotlightY}px, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 80%)`;

  function handleHeroMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = e.clientX - rect.left - width / 2;
    const y = e.clientY - rect.top - height / 2;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleHeroMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  // Cinematic Perspective Variants (from previous turn instruction details)
  const cinematicTitleVariants = {
    hidden: {
      rotateX: 65,
      rotateY: -18,
      x: -220,
      y: 160,
      z: -900,
      scale: 2.2,
      opacity: 0,
      filter: "blur(18px)",
    },
    visible: {
      rotateX: 0,
      rotateY: 0,
      x: 0,
      y: 0,
      z: 0,
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 85,
        damping: 18,
        mass: 1.1,
        duration: 1.8,
      },
    },
  };

  const handleStartSurveyClick = () => {
    const element = document.getElementById("active-surveys-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLearnMoreClick = () => {
    const element = document.getElementById("why-participate-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleTakeSurvey = (survey: SurveyDetails) => {
    setActiveSurveyModal(survey);
    setCurrentQuestionIndex(0);
    setSurveyAnswers({});
    setSurveySubmitted(false);
  };

  const handleAnswerSelect = (questionId: string, option: string) => {
    setSurveyAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const handleNextQuestion = () => {
    if (!activeSurveyModal) return;
    const currentQuestion = activeSurveyModal.questions[currentQuestionIndex];
    if (!surveyAnswers[currentQuestion.id]) {
      toast({
        title: "Selection Required",
        description: "Please select an answer to proceed.",
        variant: "destructive"
      });
      return;
    }

    if (currentQuestionIndex < activeSurveyModal.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Final Submit
      setSurveySubmitted(true);
      toast({
        title: "Survey Completed!",
        description: `Thank you for completing the ${activeSurveyModal.title} survey.`
      });
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-site-gradient relative overflow-hidden text-slate-800 dark:text-slate-100">
      <Navigation transparentOnDark={true} />

      {/* Embedded CSS animations for border-beam card tracking */}
      <style>{`
        @keyframes border-beam {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-border-beam {
          animation: border-beam 6s linear infinite;
        }
        @keyframes caustic-move {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(4%, -6%) scale(1.1); }
          100% { transform: translate(0, 0) scale(1); }
        }
        .animate-caustic {
          animation: caustic-move 18s ease-in-out infinite;
        }
        @keyframes stroke-draw {
          to { stroke-dashoffset: 0; }
        }
        .animate-stroke {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: stroke-draw 2s ease-out forwards;
        }
      `}</style>

      {/* Decorative ambient background overlays (Matching brand caustics & grids) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#00c9e40c_1.5px,transparent_1.5px)] [background-size:32px_32px] opacity-90" />
        
        {/* Soft caustic mesh blur circles */}
        <div className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-gradient-to-br from-[#00C9E4]/12 to-transparent blur-[90px] animate-caustic" />
        <div className="absolute top-[35%] -right-[5%] w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] rounded-full bg-gradient-to-br from-[#0067B1]/10 to-transparent blur-[110px] animate-caustic" style={{ animationDelay: "-4s" }} />
      </div>

      {/* Main hero background photo (exactly like the reference solar panel slide) */}
      <div className="absolute top-0 inset-x-0 h-screen pointer-events-none overflow-hidden z-0 border-b border-slate-200/10 dark:border-slate-800/40">
        <img 
          src={fishFarmBg} 
          alt="Aquaculture Background" 
          className="w-full h-full object-cover" 
        />
        {/* Dark overlay for full-bleed high-contrast text */}
        <div className="absolute inset-0 bg-slate-950/60" />
      </div>

      {/* MAIN CONTAINER */}
      <main className="relative z-10 pt-32 pb-24 px-6">
        <div className="container mx-auto space-y-32">
          
          {/* SECTION 1: HERO SECTION */}
          <section 
            className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-12 items-center min-h-[70vh] pt-8"
            style={{ perspective: 1200, transformStyle: "preserve-3d" }}
          >
            {/* Left Side: Title, description, CTAs */}
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.15 }
                }
              }}
              initial="hidden"
              animate="visible"
              className="lg:col-span-7 space-y-8 text-left relative z-10"
            >
              <Badge className="bg-white/10 text-white border border-white/20 hover:bg-white/15 px-3 py-1.5 text-xs font-semibold rounded-full shadow-sm">
                SURVEY CENTER
              </Badge>

              <motion.h1
                variants={cinematicTitleVariants}
                className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight origin-bottom-left select-none"
                style={{
                  background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text"
                }}
              >
                Help Shape the Future of Smart Aquaculture
              </motion.h1>

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
                }}
                className="text-base md:text-lg text-white/85 max-w-2xl leading-relaxed font-medium"
              >
                Your farming experience matters. Participate in UpCheck surveys to help us understand real-world challenges, improve our smart aquaculture solutions, and build technology that truly supports shrimp farmers.
              </motion.p>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
                }}
                className="flex flex-wrap items-center gap-4 pt-2"
              >
                <Button
                  onClick={handleStartSurveyClick}
                  size="lg"
                  className="font-bold shadow-lg text-white border-none hover:scale-105 active:scale-95 transition-transform px-8"
                  style={{
                    background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)"
                  }}
                >
                  Start Survey
                </Button>
                <Button
                  onClick={handleLearnMoreClick}
                  size="lg"
                  variant="outline"
                  className="font-semibold border-white/25 text-white hover:bg-white/10 px-8"
                >
                  Learn More
                </Button>
              </motion.div>
            </motion.div>

            {/* Right Side: Floating Glass Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.25 }}
              className="lg:col-span-5 flex justify-center items-center relative z-10"
            >
              <div className="absolute w-72 h-72 rounded-full bg-cyan-400/10 blur-[60px] pointer-events-none z-0" />
              
              <motion.div
                animate={{
                  y: [0, -12, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                onMouseMove={handleHeroMouseMove}
                onMouseLeave={handleHeroMouseLeave}
                className="w-full max-w-[380px] rounded-[32px] border border-white/25 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.45)] bg-gradient-to-br from-white/15 via-[#00C9E4]/15 to-[#0067B1]/25 dark:from-slate-900/40 dark:via-[#00C9E4]/10 dark:to-[#0067B1]/25 backdrop-blur-xl relative z-10 overflow-hidden group transition-all duration-500 ease-out"
              >
                {/* Decorative corner brackets (Top-Left & Top-Right) */}
                <div className="absolute top-5 left-5 w-8 h-8 border-t-2 border-l-2 border-white/30 rounded-tl-xl pointer-events-none z-10" />
                <div className="absolute top-5 right-5 w-8 h-8 border-t-2 border-r-2 border-white/30 rounded-tr-xl pointer-events-none z-10" />

                {/* 1. Behind-glass layer: ambient light animations */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                  <motion.div
                    className="absolute -top-20 -left-20 w-48 h-48 rounded-full bg-white/10 blur-2xl"
                    animate={{
                      x: [0, 30, -15, 0],
                      y: [0, -30, 15, 0],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div
                    className="absolute -bottom-20 -right-20 w-52 h-52 rounded-full bg-[#00C9E4]/20 blur-2xl"
                    animate={{
                      x: [0, -40, 20, 0],
                      y: [0, 40, -20, 0],
                    }}
                    transition={{
                      duration: 12,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>

                {/* 2. Mouse-tracking glare / reflection highlight */}
                <motion.div
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
                  style={{ background: spotlightBg }}
                />

                {/* 3. Forefront card content */}
                <div className="p-7 relative z-30 space-y-6 text-white text-left">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                      <span className="text-xs uppercase tracking-widest font-black text-white/90">Pond Health Survey</span>
                    </div>
                    <Badge className="bg-white/20 text-white border border-white/30 hover:bg-white/25 px-2 py-0.5 text-[10px] font-bold rounded-full">
                      Active
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-sm font-extrabold text-white">Water Quality Tracking</p>
                      <div className="flex items-center justify-between text-xs text-white/80 font-semibold">
                        <span>Progress Indicator</span>
                        <span>67% Complete</span>
                      </div>
                      <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-white rounded-full" 
                          initial={{ width: 0 }}
                          animate={{ width: "67%" }}
                          transition={{ duration: 1.8, delay: 0.8, ease: "easeOut" }}
                        />
                      </div>
                    </div>

                    <div className="space-y-2.5 pt-2">
                      {[
                        { label: "Dissolved Oxygen practices", checked: true },
                        { label: "pH sensor utilization", checked: true },
                        { label: "Aerator activation criteria", checked: false }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-white/10 border border-white/10 shadow-xs backdrop-blur-md">
                          <span className="text-xs font-semibold text-white/90">{item.label}</span>
                          {item.checked ? (
                            <CheckCircle2 className="w-4.5 h-4.5 text-emerald-300 flex-shrink-0" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-white/30 flex-shrink-0" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="flex justify-between items-center text-[10px] font-black text-slate-400">
                      <span>EST. TIME: 5 MIN</span>
                      <span>12 QUESTIONS</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </section>

          {/* SECTION 2: WHY YOUR FEEDBACK MATTERS */}
          <section id="why-participate-section" className="space-y-16 max-w-7xl mx-auto w-full relative pt-20 md:pt-28">
            
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto space-y-4"
            >
              <span className="text-xs font-bold tracking-[0.2em] text-[#0067B1] uppercase">Every Response Drives Better Farming Solutions</span>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                Why Your Feedback Matters
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base font-medium leading-relaxed max-w-2xl mx-auto">
                At UpCheck, every survey response helps us better understand the daily challenges faced by shrimp farmers. From water quality management to disease prevention and farm operations, your feedback enables us to build smarter tools, deliver meaningful insights, and create solutions that address real farming needs.
              </p>
            </motion.div>

            {/* Redesigned Cards Section: Image Left, 2-Column Content Right */}
            <div className="grid lg:grid-cols-2 gap-12 items-stretch max-w-6xl mx-auto pt-8">
              {/* Left side: Image (fully occupying the section height) */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8 }}
                className="w-full flex"
              >
                <div className="relative group overflow-hidden rounded-3xl border border-slate-200/60 dark:border-slate-800/40 shadow-xl w-full min-h-[350px] lg:min-h-[420px]">
                  <img 
                    src={survey1} 
                    alt="Why Your Feedback Matters" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent pointer-events-none" />
                </div>
              </motion.div>

              {/* Right side: 2x2 Content Grid without icons (vertically centered next to image) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10 text-left items-center">
                {WHY_PARTICIPATE_CARDS.map((card, i) => {
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
                      className="space-y-3"
                    >
                      <h3 className="text-xl font-bold tracking-tight text-slate-800 dark:text-white leading-tight">
                        {card.title}
                      </h3>
                      <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">
                        {card.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* SECTION 3: AVAILABLE SURVEYS (Core Accordion Cards) */}
          <section id="active-surveys-section" className="space-y-16 max-w-7xl mx-auto w-full">
            
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto space-y-4"
            >
              <span className="text-xs font-bold tracking-[0.2em] text-[#0067B1] uppercase font-black">Participate in Active Surveys</span>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                Available Surveys
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base font-medium leading-relaxed">
                Choose a survey that matches your farming experience and share your valuable feedback.
              </p>
            </motion.div>

            {/* Accordion Stack Cards replaced with Split-Screen Dashboard Portal */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto pt-6">
              {/* Left Column: Tabs Directory (lg:col-span-5) */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                {SURVEYS_DATA.map((survey, i) => {
                  const isSelected = selectedSurveyId === survey.id;
                  return (
                    <motion.div
                      key={survey.id}
                      onClick={() => setSelectedSurveyId(survey.id)}
                      whileHover={{ x: isSelected ? 0 : 4 }}
                      className={`p-5 rounded-3xl border text-left cursor-pointer select-none transition-all duration-300 flex items-start gap-4 ${
                        isSelected 
                          ? "border-[#00C9E4] bg-white/95 dark:bg-black/60 shadow-md border-l-4 border-l-[#00C9E4]" 
                          : "border-slate-200/60 dark:border-slate-800/40 bg-white/45 dark:bg-black/20 hover:bg-white/60 dark:hover:bg-black/35 hover:shadow-sm"
                      } backdrop-blur-md`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black flex-shrink-0 text-sm ${
                        isSelected 
                          ? "bg-[#00C9E4]/15 text-[#0067B1]" 
                          : "bg-slate-200/60 dark:bg-slate-800/60 text-slate-500"
                      }`}>
                        {i + 1}
                      </div>
                      <div className="space-y-1">
                        <h4 className={`text-base font-bold leading-tight ${
                          isSelected ? "text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-300"
                        }`}>
                          {survey.title}
                        </h4>
                        <div className="flex items-center gap-3 text-xs text-slate-500 font-semibold">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {survey.duration}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <ClipboardList className="w-3.5 h-3.5" />
                            {survey.questionsCount} Qs
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Right Column: Live Preview Console (lg:col-span-7) */}
              <div className="lg:col-span-7 flex">
                {(() => {
                  const selectedSurvey = SURVEYS_DATA.find(s => s.id === selectedSurveyId) || SURVEYS_DATA[0];
                  return (
                    <div className="w-full">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={selectedSurvey.id}
                          initial={{ opacity: 0, y: 15, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -15, scale: 0.98 }}
                          transition={{ duration: 0.35, ease: "easeOut" }}
                          className="bg-white/70 dark:bg-black/40 backdrop-blur-xl rounded-[32px] border border-slate-200/60 dark:border-slate-800/40 p-8 flex flex-col justify-between shadow-xl min-h-[380px] lg:h-full text-left relative overflow-hidden"
                        >
                          {/* Soft pulsing color background glow in corner based on survey id */}
                          <div className={`absolute -right-24 -top-24 w-48 h-48 rounded-full blur-3xl opacity-15 pointer-events-none ${
                            selectedSurvey.id === "water_quality" ? "bg-[#00C9E4]" :
                            selectedSurvey.id === "shrimp_health" ? "bg-amber-500" :
                            selectedSurvey.id === "feeding_ops" ? "bg-emerald-500" : "bg-indigo-500"
                          }`} />

                          <div className="space-y-6 relative z-10">
                            <div className="flex justify-between items-center">
                              <Badge className="bg-[#00C9E4]/15 text-[#0067B1] dark:text-[#00C9E4] border border-[#00C9E4]/20 rounded-full font-bold px-3 py-0.5 text-[10px]">
                                SURVEY MODULE
                              </Badge>
                              <Badge 
                                className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full border ${
                                  selectedSurvey.status === "Closing Soon"
                                    ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                                    : "bg-[#00C9E4]/10 text-[#0067B1] border-[#00C9E4]/20"
                                }`}
                              >
                                {selectedSurvey.status}
                              </Badge>
                            </div>

                            <div className="space-y-3">
                              <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                                {selectedSurvey.title}
                              </h3>
                              <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base font-semibold leading-relaxed leading-[1.6]">
                                {selectedSurvey.description}
                              </p>
                            </div>

                            {/* Metrics Grid */}
                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800/40">
                              <div className="space-y-1">
                                <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider">Estimated Time</span>
                                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-bold text-sm">
                                  <Clock className="w-4 h-4 text-[#0067B1]" />
                                  {selectedSurvey.duration}
                                </div>
                              </div>
                              <div className="space-y-1">
                                <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider">Total Length</span>
                                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-bold text-sm">
                                  <ClipboardList className="w-4 h-4 text-[#0067B1]" />
                                  {selectedSurvey.questionsCount} Questions
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="pt-8 relative z-10 flex justify-end">
                            <Button
                              onClick={() => handleTakeSurvey(selectedSurvey)}
                              className="font-bold text-white rounded-xl gap-2 shadow-md border-none flex items-center px-6 h-11 hover:scale-[1.03] active:scale-[0.98] transition-transform"
                              style={{
                                background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)"
                              }}
                            >
                              Take Survey
                              <ArrowRight className="w-4 h-4" />
                            </Button>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  );
                })()}
              </div>
            </div>
          </section>

          {/* SECTION 4: CALL TO ACTION (CTA) */}
          <section className="max-w-7xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="relative rounded-[32px] overflow-hidden bg-gradient-to-r from-[#00C9E4] to-[#0067B1] text-white p-8 md:p-16 shadow-2xl text-center"
            >
              {/* Caustics wave texture */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_65%)] opacity-85 pointer-events-none z-0" />
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:20px_20px] opacity-70 pointer-events-none z-0" />

              <div className="relative z-10 space-y-6 max-w-3xl mx-auto">
                <Badge className="bg-white/10 text-white border border-white/20 px-3 py-1 text-xs font-semibold rounded-full shadow-sm">
                  SHAPE THE ECOSYSTEM
                </Badge>
                
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
                  Your Experience Can Help Transform Aquaculture
                </h2>
                
                <p className="text-white/80 text-base md:text-lg leading-relaxed font-semibold max-w-2xl mx-auto">
                  Every survey response contributes to building smarter technologies, improving farming practices, and supporting sustainable shrimp farming. Join the UpCheck community by sharing your insights today.
                </p>

                <div className="pt-4 flex justify-center">
                  <Button
                    onClick={handleStartSurveyClick}
                    size="lg"
                    className="bg-white text-[#0067B1] hover:bg-slate-50 hover:text-[#005a9c] font-bold rounded-2xl h-12 px-8 shadow-lg border-none hover:scale-105 active:scale-95 transition-transform"
                  >
                    Start Survey
                  </Button>
                </div>
              </div>
            </motion.div>
          </section>

        </div>
      </main>

      <Footer />

      {/* STEP-BY-STEP INTERACTIVE SURVEY QUESTIONNAIRE MODAL */}
      <AnimatePresence>
        {activeSurveyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveSurveyModal(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-3xl overflow-hidden relative z-10"
            >
              {/* Close Button */}
              <button 
                onClick={() => setActiveSurveyModal(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-transparent border-none p-1 cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-6 md:p-8 space-y-6">
                
                {/* Header title */}
                <div className="space-y-1 text-left">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#0067B1]">Upcheck Active Survey</span>
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight text-slate-800 dark:text-white leading-tight">
                    {activeSurveyModal.title}
                  </h3>
                </div>

                {!surveySubmitted ? (
                  // Steps Form
                  <div className="space-y-6">
                    {/* Progress Bar & Indicators */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
                        <span>Question {currentQuestionIndex + 1} of {activeSurveyModal.questions.length}</span>
                        <span>{Math.round(((currentQuestionIndex + 1) / activeSurveyModal.questions.length) * 100)}% Complete</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-[#00C9E4] to-[#0067B1] rounded-full"
                          animate={{ width: `${((currentQuestionIndex + 1) / activeSurveyModal.questions.length) * 100}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </div>

                    {/* Question Card */}
                    <div className="space-y-4 text-left">
                      <h4 className="text-base font-extrabold text-slate-800 dark:text-slate-200 leading-tight">
                        {activeSurveyModal.questions[currentQuestionIndex].question}
                      </h4>

                      <div className="space-y-2.5 pt-1">
                        {activeSurveyModal.questions[currentQuestionIndex].options.map((option, index) => {
                          const questionId = activeSurveyModal.questions[currentQuestionIndex].id;
                          const isSelected = surveyAnswers[questionId] === option;

                          return (
                            <div
                              key={index}
                              onClick={() => handleAnswerSelect(questionId, option)}
                              className={`p-3.5 rounded-2xl border cursor-pointer select-none transition-all duration-300 font-semibold text-sm ${
                                isSelected
                                  ? "border-[#00C9E4] bg-[#00C9E4]/5 text-[#0067B1] shadow-xs"
                                  : "border-slate-200/80 dark:border-slate-800/40 bg-slate-50/50 dark:bg-slate-900/30 hover:bg-slate-100/50"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center ${
                                  isSelected ? "border-[#00C9E4]" : "border-slate-300"
                                }`}>
                                  {isSelected && <div className="w-2.5 h-2.5 bg-[#00C9E4] rounded-full" />}
                                </div>
                                <span className="leading-tight">{option}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between items-center border-t border-slate-100 dark:border-slate-800/40 pt-4">
                      <Button
                        onClick={handlePrevQuestion}
                        disabled={currentQuestionIndex === 0}
                        variant="outline"
                        className="rounded-xl h-10 gap-1.5 font-semibold text-xs border-slate-200 dark:border-slate-800"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Previous
                      </Button>

                      <Button
                        onClick={handleNextQuestion}
                        className="rounded-xl h-10 gap-1.5 font-bold text-xs text-white border-none shadow-md"
                        style={{
                          background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)"
                        }}
                      >
                        {currentQuestionIndex === activeSurveyModal.questions.length - 1 ? (
                          <>
                            Submit
                            <CheckCircle2 className="w-4 h-4" />
                          </>
                        ) : (
                          <>
                            Next
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ) : (
                  // Submitted Success screen
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center space-y-6 py-4"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500">
                      <CheckCircle2 className="w-9 h-9" />
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-xl font-bold text-slate-800 dark:text-white leading-tight">Response Submitted!</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
                        Thank you for contributing your insights. Your responses have been added to our development repository.
                      </p>
                    </div>

                    <div className="pt-2">
                      <Button
                        onClick={() => setActiveSurveyModal(null)}
                        className="rounded-xl h-10 px-6 font-bold text-white border-none shadow-md"
                        style={{
                          background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)"
                        }}
                      >
                        Close Window
                      </Button>
                    </div>
                  </motion.div>
                )}

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
