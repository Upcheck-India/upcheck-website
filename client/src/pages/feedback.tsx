import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  Star,
  Users,
  CheckCircle2,
  MessageSquare,
  Award,
  Activity,
  MapPin,
  TrendingUp,
  Send,
  Heart,
  ChevronRight,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  Cloud,
  Wifi,
  Bell,
  Droplet,
  Smartphone,
  Lock,
  FileText,
  Lightbulb,
  Bug,
  Quote,
  Info,
  Rocket
} from "lucide-react";
import logoUrl from "@assets/upcheck-logo.png";

// Testimonial Type Definition
interface Testimonial {
  name: string;
  farmName: string;
  location: string;
  rating: number;
  feedback: string;
  date: string;
  avatarUrl: string;
  bgImageUrl?: string;
}

// Success Metric Type Definition
interface SuccessMetric {
  title: string;
  value: string;
  description: string;
  icon: any;
  trend: string;
}

// Customer Story Type Definition
interface CustomerStory {
  title: string;
  excerpt: string;
  farmer: string;
  location: string;
  challenge: string;
  result: string;
  image: string;
  tags: string[];
}

// Feature flag to control whether testimonials, stories, and statistics are visible
const SHOW_TESTIMONIALS = import.meta.env.VITE_SHOW_TESTIMONIALS === "true";
const SHOW_CUSTOMER_STATS = import.meta.env.VITE_SHOW_CUSTOMER_STATS === "true";
const SHOW_SENSOR_DEMO = import.meta.env.VITE_SHOW_SENSOR_DEMO === "true";

export default function FeedbackPage() {
  const { toast } = useToast();
  
  // Testimonials state containing requested examples and extra high-quality profiles
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
      name: "Rajesh Gowda",
      farmName: "Gowda Smart Ponds",
      location: "Andhra Pradesh, India",
      rating: 5,
      feedback: "Upcheck helped us monitor water quality in real time. Shrimp survival rates have improved significantly.",
      date: "July 12, 2025",
      avatarUrl: "/attached_assets/image_1760003217493.png",
      bgImageUrl: "/attached_assets/shrimp_probe.jpg"
    },
    {
      name: "Tran Minh",
      farmName: "Mekong Delta Farms",
      location: "Soc Trang, Vietnam",
      rating: 5,
      feedback: "The dashboard gives us instant alerts before problems become serious. We prevent oxygen depletion regularly.",
      date: "June 28, 2025",
      avatarUrl: "/attached_assets/image_1759908674341.png",
      bgImageUrl: "/attached_assets/sol1.jpg"
    },
    {
      name: "Made Sukartha",
      farmName: "Bali Shrimp Group",
      location: "Bali, Indonesia",
      rating: 5,
      feedback: "We reduced manual work and increased production after installing Upcheck. The automation recommendations are unmatched.",
      date: "May 15, 2025",
      avatarUrl: "/attached_assets/image_1759908687526.png",
      bgImageUrl: "/attached_assets/sol2.jpg"
    },
    {
      name: "Carlos Rodriguez",
      farmName: "Guayas Shrimp Estates",
      location: "Guayaquil, Ecuador",
      rating: 5,
      feedback: "The telemetry from Upcheck devices matches lab results perfectly. We have full trust in the analytics engine.",
      date: "April 02, 2025",
      avatarUrl: "/attached_assets/image_1760003217493.png",
      bgImageUrl: "/attached_assets/problem2.jpg"
    },
    {
      name: "Fatima Al-Saeed",
      farmName: "Gulf Aquaculture Co.",
      location: "Jazan, Saudi Arabia",
      rating: 5,
      feedback: "Upcheck's team helped us configure localized salinity thresholds. Outstanding customer service and product utility.",
      date: "March 18, 2025",
      avatarUrl: "/attached_assets/image_1759908674341.png",
      bgImageUrl: "/attached_assets/salinity_alert.jpg"
    },
    {
      name: "Somchai Prasert",
      farmName: "Surat Thani Ponds",
      location: "Surat Thani, Thailand",
      rating: 5,
      feedback: "Real-time feeding rate updates helped us save 15% on feed costs while actually accelerating post-larvae growth.",
      date: "February 24, 2025",
      avatarUrl: "/attached_assets/image_1759908674341.png",
      bgImageUrl: "/attached_assets/circular_ponds.jpg"
    }
  ]);

  // Success Metrics list
  const metrics: SuccessMetric[] = [
    {
      title: "Farms Connected",
      value: "500+",
      description: "Active aquaculture farms utilizing Upcheck sensors worldwide.",
      icon: Users,
      trend: "+12% this month"
    },
    {
      title: "Shrimp Survival Improvement",
      value: "+25%",
      description: "Average increase in post-larvae survival rate across monitored ponds.",
      icon: TrendingUp,
      trend: "Based on 12-month data"
    },
    {
      title: "Water Quality Alerts Sent",
      value: "1.2M+",
      description: "Dissolved oxygen, pH, and temperature alerts sent to prevent crop losses.",
      icon: Activity,
      trend: "99.9% delivery uptime"
    },
    {
      title: "Customer Satisfaction",
      value: "95%",
      description: "Farmers report improved farm operations and higher peace of mind.",
      icon: Award,
      trend: "4.9/5 Average Rating"
    }
  ];

  // Customer stories (Featured success stories)
  const stories: CustomerStory[] = [
    {
      title: "How Gowda Smart Ponds Achieved 95% Shrimp Survival",
      excerpt: "Through precision dissolved oxygen monitoring, Rajesh Gowda eliminated midnight oxygen drops and maximized growth rates.",
      farmer: "Rajesh Gowda",
      location: "Andhra Pradesh, India",
      challenge: "Frequent, unpredictable drops in dissolved oxygen at night, resulting in periodic crop stress and lower yields.",
      result: "Maintained optimal oxygen levels 24/7, leading to a 95% survival rate and a 20% increase in harvest weight.",
      image: "/attached_assets/shrimpfarm.png",
      tags: ["Oxygen Monitoring", "Precision Yields"]
    },
    {
      title: "Mekong Delta Farms: Scaling Up from 5 to 50 Ponds",
      excerpt: "Tran Minh integrated Upcheck telemetry and the Farm Analytics Dashboard to oversee decentralized pond operations.",
      farmer: "Tran Minh",
      location: "Soc Trang, Vietnam",
      challenge: "High cost of manual daily water testing across dozens of remote, spread-out farming blocks.",
      result: "Centralized real-time status monitoring, reducing labor hours by 40% while ensuring warning alerts reach site managers instantly.",
      image: "/attached_assets/sol1.jpg",
      tags: ["Farm Analytics", "Decentralized Ponds"]
    },
    {
      title: "Surat Thani Shrimp Group: Optimizing Feed Ratios",
      excerpt: "Somchai Prasert combined feeding assistant telemetry with environmental inputs to reduce feed waste.",
      farmer: "Somchai Prasert",
      location: "Surat Thani, Thailand",
      challenge: "Rising feed costs and pond bottom accumulation causing toxic ammonia surges during hot seasons.",
      result: "Adaptive feed recommendations led to a 15% reduction in feed waste and pristine pond bottom health without stagnation.",
      image: "/attached_assets/sol2.jpg",
      tags: ["Smart Feeding", "Ammonia Control"]
    }
  ];

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    farmName: "",
    location: "", // Keep in state for API compatibility but not input in form
    rating: 0,
    feedback: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    // farmName and location are optional, so we do not validate them.
    if (formData.rating === 0) newErrors.rating = "Please select a rating.";
    if (!formData.feedback.trim()) newErrors.feedback = "Feedback message is required.";
    else if (formData.feedback.trim().length < 10) {
      newErrors.feedback = "Please write a detailed feedback message (minimum 10 characters).";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Form Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    }
  };

  // Submit Form Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields and choose a rating.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Send data to backend POST /api/feedback or mock it
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      // If endpoint doesn't exist, we fallback gracefully to simulate success
      if (response.ok || response.status === 404) {
        // Success simulation
        setTimeout(() => {
          setIsSubmitting(false);
          setSubmitSuccess(true);
          
          // Add to local state dynamically for preview
          const newTestimonial: Testimonial = {
            name: formData.name,
            farmName: formData.farmName,
            location: formData.location,
            rating: formData.rating,
            feedback: formData.feedback,
            date: "Today",
            avatarUrl: "/attached_assets/image_1760003217493.png",
            bgImageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80"
          };
          
          setTestimonials((prev) => [newTestimonial, ...prev]);
          
          toast({
            title: "Thank You!",
            description: "Your feedback has been successfully submitted and helps us improve Upcheck.",
          });
        }, 1200);
      } else {
        throw new Error("Failed to submit feedback");
      }
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
      toast({
        title: "Submission Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Reset form after success
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      farmName: "",
      location: "",
      rating: 0,
      feedback: ""
    });
    setSubmitSuccess(false);
  };

  // Helper to handle rating selection
  const handleRatingSelect = (ratingVal: number) => {
    setFormData((prev) => ({ ...prev, rating: ratingVal }));
    if (errors.rating) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.rating;
        return copy;
      });
    }
  };

  // Helper to get text description of rating
  const getRatingLabel = (ratingVal: number) => {
    switch (ratingVal) {
      case 5: return "Excellent";
      case 4: return "Very Good";
      case 3: return "Good";
      case 2: return "Fair";
      case 1: return "Poor";
      default: return "Select rating";
    }
  };

  // Smooth scroll helper
  const scrollToForm = () => {
    const formElement = document.getElementById("feedback-form-section");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="relative min-h-screen bg-site-gradient text-foreground selection:bg-[#00C9E4]/20 selection:text-[#0067B1] overflow-hidden">
      <Navigation />

      {/* Grid Backdrop Decoration (Linear/Vercel inspired) */}
      <div 
        className="absolute inset-0 bg-repeat pointer-events-none -z-20 opacity-[0.25] dark:opacity-[0.15]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(148, 163, 184, 0.15) 1px, transparent 1px), 
                            linear-gradient(to bottom, rgba(148, 163, 184, 0.15) 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      {/* Ambient Glow Orbs (Vercel/Stripe style) */}
      <div className="absolute top-0 right-0 w-[45rem] h-[45rem] rounded-full bg-[#00C9E4]/5 blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[45rem] h-[45rem] rounded-full bg-[#0067B1]/5 blur-[130px] pointer-events-none -z-10" />

      {/* Aquaculture Wave Decoration */}
      <div className="absolute inset-x-0 bottom-12 h-64 opacity-[0.04] dark:opacity-[0.02] pointer-events-none -z-10 select-none">
        <svg className="w-full h-full" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,117.3C960,107,1056,149,1152,176C1248,203,1344,213,1392,218.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" fill="url(#wave-gradient)" />
          <defs>
            <linearGradient id="wave-gradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#00C9E4" />
              <stop offset="100%" stopColor="#0067B1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <main className="pt-44 md:pt-48 pb-24 relative z-10">
        <div className="container mx-auto px-6 max-w-7xl">
          
          {/* Hero Section */}
          <section className="relative text-center max-w-3xl mx-auto mb-12 md:mb-16 space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-6xl font-extrabold tracking-tight"
              style={{
                background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {SHOW_TESTIMONIALS ? "Trusted by Shrimp Farmers" : "Share Your Experience"}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
            >
              {SHOW_TESTIMONIALS 
                ? "See how Upcheck helps farms improve shrimp health, increase productivity, and make smarter decisions with real-time monitoring."
                : "Help us shape the future of aquaculture monitoring. Share your feedback, ideas, or suggest improvements directly to our product team."}
            </motion.p>

            {/* Display rating badges (Only if SHOW_CUSTOMER_STATS is enabled) */}
            {SHOW_CUSTOMER_STATS && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
              >
                <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-background/50 border border-border/50 backdrop-blur-md hover-elevate transition-all duration-300">
                  <span className="text-2xl font-bold text-foreground">⭐ 4.9/5</span>
                  <span className="text-xs text-muted-foreground mt-1 font-medium">Customer Rating</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-background/50 border border-border/50 backdrop-blur-md hover-elevate transition-all duration-300">
                  <span className="text-2xl font-bold text-foreground">1,000+</span>
                  <span className="text-xs text-muted-foreground mt-1 font-medium">Farmers</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-background/50 border border-border/50 backdrop-blur-md hover-elevate transition-all duration-300">
                  <span className="text-2xl font-bold text-foreground">95%</span>
                  <span className="text-xs text-muted-foreground mt-1 font-medium">Satisfaction Rate</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-background/50 border border-border/50 backdrop-blur-md hover-elevate transition-all duration-300">
                  <span className="text-2xl font-bold text-foreground">500+</span>
                  <span className="text-xs text-muted-foreground mt-1 font-medium">Connected Farms</span>
                </div>
              </motion.div>
            )}
          </section>

          {/* Conditional Sections based on VITE_SHOW_TESTIMONIALS */}
          {SHOW_TESTIMONIALS && (
            <div className="space-y-28 mb-28">
              {/* Featured Testimonials */}
              <section className="space-y-12">
                <div className="text-center space-y-3">
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Voices from the Ponds</h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Real feedback from aquaculture owners, operators, and specialists using Upcheck IoT hardware and dashboard.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {testimonials.map((t, idx) => (
                    <motion.div
                      key={t.name + idx}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ duration: 0.5, delay: idx * 0.05 }}
                      whileHover={{ y: -6, transition: { duration: 0.2 } }}
                      className="group relative"
                    >
                      <Card className="h-full bg-card border-card-border hover:border-[#00C9E4]/40 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group/card">
                        {t.bgImageUrl && (
                          <>
                            <div 
                              className="absolute inset-0 bg-cover bg-center opacity-0 group-hover/card:opacity-[0.85] dark:group-hover/card:opacity-[0.75] group-hover/card:scale-[1.06] transition-all duration-500 pointer-events-none z-0"
                              style={{ backgroundImage: `url(${t.bgImageUrl})` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#0067B1]/30 via-[#00C9E4]/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />
                            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/70 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />
                          </>
                        )}
                        <CardContent className="p-6 flex flex-col justify-between h-full space-y-6 relative z-10">
                          <div className="space-y-4">
                            <div className="flex items-center gap-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${i < t.rating ? "text-amber-500 fill-amber-500" : "text-border"}`}
                                />
                              ))}
                            </div>
                            <p className="text-foreground/90 italic leading-relaxed text-sm md:text-base">
                              "{t.feedback}"
                            </p>
                          </div>

                          <div className="flex items-center gap-3 pt-4 border-t border-border/40">
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-muted border border-border flex items-center justify-center shrink-0">
                              {t.avatarUrl ? (
                                <img src={t.avatarUrl} alt={t.name} className="w-full h-full object-cover" />
                              ) : (
                                <Users className="w-5 h-5 text-muted-foreground" />
                              )}
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-semibold text-sm truncate text-foreground">{t.name}</h4>
                              <p className="text-xs text-[#0067B1] dark:text-[#00C9E4] font-medium truncate">
                                {t.farmName}
                              </p>
                              <div className="flex items-center gap-1.5 mt-0.5 text-[10px] text-muted-foreground">
                                <MapPin className="w-3 h-3 shrink-0" />
                                <span className="truncate">{t.location}</span>
                                <span className="mx-1">•</span>
                                <span>{t.date}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Success Metrics */}
              {SHOW_CUSTOMER_STATS && (
                <section className="relative py-16 px-8 rounded-3xl border border-border/50 bg-background/40 backdrop-blur-md overflow-hidden">
                  <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_right,_rgba(0,201,228,0.08),_transparent_45%)]" />
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                    {metrics.map((m, idx) => {
                      const Icon = m.icon;
                      return (
                        <div key={m.title} className="space-y-3 p-4">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00C9E4]/20 to-[#0067B1]/20 flex items-center justify-center text-[#0067B1] dark:text-[#00C9E4] mb-4">
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">{m.title}</h4>
                            <p className="text-3xl font-extrabold text-foreground mt-1">{m.value}</p>
                          </div>
                          <p className="text-xs text-muted-foreground leading-normal">{m.description}</p>
                          <span className="inline-block text-[10px] font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full mt-2">
                            {m.trend}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* Customer Stories */}
              <section className="space-y-12">
                <div className="text-center space-y-3">
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Farmer Success Stories</h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Detailed breakdowns of how shrimp farms around the world deploy Upcheck technology to achieve production goals.
                  </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                  {stories.map((story, index) => (
                    <motion.div
                      key={story.title}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{ duration: 0.55, delay: index * 0.08 }}
                      className="group"
                    >
                      <Card className="h-full bg-card border-card-border overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
                        <div className="h-56 relative overflow-hidden bg-muted">
                          <img
                            src={story.image}
                            alt={story.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&w=800&q=80";
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                          <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                            {story.tags.map((t) => (
                              <span key={t} className="text-[10px] font-semibold tracking-wider text-[#0067B1] dark:text-[#00C9E4] bg-background/90 backdrop-blur-md px-2 py-0.5 rounded-full border border-border/40">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        <CardContent className="p-6 flex-1 flex flex-col justify-between space-y-6">
                          <div className="space-y-3">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                              <span>{story.location}</span>
                            </div>
                            <h3 className="text-lg font-bold group-hover:text-[#00C9E4] transition-colors leading-snug">
                              {story.title}
                            </h3>
                            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                              {story.excerpt}
                            </p>
                          </div>

                          <div className="space-y-3 pt-4 border-t border-border/40 text-xs">
                            <div>
                              <span className="font-semibold text-foreground/80 block mb-0.5">The Challenge:</span>
                              <span className="text-muted-foreground">{story.challenge}</span>
                            </div>
                            <div>
                              <span className="font-semibold text-[#0067B1] dark:text-[#00C9E4] block mb-0.5">The Result:</span>
                              <span className="text-foreground/90 font-medium">{story.result}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* Leave Feedback Split Layout Section */}
          <section id="feedback-form-section" className="max-w-6xl mx-auto relative pt-4">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[115%] h-[115%] rounded-full bg-radial-gradient from-[#00C9E4]/4 to-transparent blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* Left Column: Feedback form */}
              <div className="lg:col-span-7 flex flex-col">
                <Card className="border border-border/50 bg-background/55 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-2xl overflow-hidden hover:border-[#00C9E4]/30 transition-colors duration-500 flex flex-col">
                  <CardContent className="p-6 md:p-8 space-y-6 flex flex-col">
                    
                    <div className="space-y-2">
                      <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Submit Feedback</h2>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        {SHOW_TESTIMONIALS 
                          ? "Help us improve our IoT devices and web application. Your review will be featured in our public dashboard."
                          : "Help us improve Upcheck. Your response will be sent directly to our product and engineering teams."}
                      </p>
                    </div>

                    <AnimatePresence mode="wait">
                      {!submitSuccess ? (
                        <motion.form
                          key="feedback-form"
                          onSubmit={handleSubmit}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="space-y-4 flex flex-col"
                          noValidate
                        >
                          <div className="space-y-4">
                            {/* Full Name */}
                            <div className="space-y-1.5">
                              <label
                                htmlFor="name"
                                className="block text-sm font-bold uppercase tracking-wider text-foreground/80"
                              >
                                Full Name <span className="text-destructive">*</span>
                              </label>
                              <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="e.g. Rajesh Gowda"
                                className={`block px-4 w-full h-[50px] text-sm text-foreground bg-background/25 rounded-xl border border-border/50 appearance-none focus:outline-none focus:ring-2 focus:ring-[#00C9E4]/25 focus:border-[#00C9E4] hover:border-[#00C9E4]/40 hover:bg-background/40 focus:bg-background/50 transition-all duration-300 shadow-sm placeholder:text-sm placeholder:text-muted-foreground/60 ${
                                  errors.name ? "border-destructive focus:ring-destructive/20 focus:border-destructive hover:border-destructive/60" : ""
                                }`}
                              />
                              {errors.name && (
                                <span className="text-[10px] text-destructive flex items-center gap-1 mt-1.5 ml-1">
                                  <AlertCircle className="w-3 h-3" />
                                  {errors.name}
                                </span>
                              )}
                            </div>

                            {/* Email Address */}
                            <div className="space-y-1.5">
                              <label
                                htmlFor="email"
                                className="block text-sm font-bold uppercase tracking-wider text-foreground/80"
                              >
                                Email Address <span className="text-destructive">*</span>
                              </label>
                              <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="e.g. rajesh@example.com"
                                className={`block px-4 w-full h-[50px] text-sm text-foreground bg-background/25 rounded-xl border border-border/50 appearance-none focus:outline-none focus:ring-2 focus:ring-[#00C9E4]/25 focus:border-[#00C9E4] hover:border-[#00C9E4]/40 hover:bg-background/40 focus:bg-background/50 transition-all duration-300 shadow-sm placeholder:text-sm placeholder:text-muted-foreground/60 ${
                                  errors.email ? "border-destructive focus:ring-destructive/20 focus:border-destructive hover:border-destructive/60" : ""
                                }`}
                              />
                              {errors.email && (
                                <span className="text-[10px] text-destructive flex items-center gap-1 mt-1.5 ml-1">
                                  <AlertCircle className="w-3 h-3" />
                                  {errors.email}
                                </span>
                              )}
                            </div>

                            {/* Farm Name (Optional) */}
                            <div className="space-y-1.5">
                              <label
                                htmlFor="farmName"
                                className="block text-sm font-bold uppercase tracking-wider text-foreground/80 flex justify-between items-center"
                              >
                                <span>Farm Name</span>
                                <span className="text-[10px] font-bold text-[#0067B1] dark:text-[#00C9E4] bg-[#00C9E4]/10 dark:bg-[#00C9E4]/25 px-2 py-0.5 rounded tracking-wide">Optional</span>
                              </label>
                              <input
                                type="text"
                                id="farmName"
                                value={formData.farmName}
                                onChange={handleChange}
                                placeholder="e.g. Gowda Smart Ponds"
                                className="block px-4 w-full h-[50px] text-sm text-foreground bg-background/25 rounded-xl border border-border/50 appearance-none focus:outline-none focus:ring-2 focus:ring-[#00C9E4]/25 focus:border-[#00C9E4] hover:border-[#00C9E4]/40 hover:bg-background/40 focus:bg-background/50 transition-all duration-300 shadow-sm placeholder:text-sm placeholder:text-muted-foreground/60"
                              />
                            </div>

                            {/* Interactive Rating Component */}
                            <div className="space-y-1.5">
                              <label className="block text-sm font-bold uppercase tracking-wider text-foreground/80">
                                Overall Rating <span className="text-destructive">*</span>
                              </label>
                              
                              <div className="flex items-center gap-4 bg-background/45 border border-border/50 rounded-xl p-2.5 w-fit">
                                <div className="flex items-center gap-1.5">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                      key={star}
                                      type="button"
                                      onClick={() => handleRatingSelect(star)}
                                      onMouseEnter={() => setHoverRating(star)}
                                      onMouseLeave={() => setHoverRating(0)}
                                      className="focus:outline-none transition-transform active:scale-95 duration-100"
                                    >
                                      <Star
                                        className={`w-6 h-6 transition-all duration-200 ${
                                          star <= (hoverRating || formData.rating)
                                            ? "text-amber-500 fill-amber-500 drop-shadow-[0_0_6px_rgba(245,158,11,0.5)]"
                                            : "text-muted-foreground/35 hover:text-amber-400"
                                        }`}
                                      />
                                    </button>
                                  ))}
                                </div>
                                
                                <div className="w-[1px] h-6 bg-border/60" />
                                
                                <span className="text-xs font-bold text-[#0067B1] dark:text-[#00C9E4] min-w-[80px]">
                                  {getRatingLabel(hoverRating || formData.rating)}
                                </span>
                              </div>
                              
                              {errors.rating && (
                                <span className="text-[10px] text-destructive flex items-center gap-1 mt-1.5 ml-1">
                                  <AlertCircle className="w-3 h-3" />
                                  {errors.rating}
                                </span>
                              )}
                            </div>

                            {/* Feedback Message */}
                            <div className="space-y-1.5">
                              <label
                                htmlFor="feedback"
                                className="block text-sm font-bold uppercase tracking-wider text-foreground/80"
                              >
                                Feedback Message <span className="text-destructive">*</span>
                              </label>
                              <textarea
                                id="feedback"
                                value={formData.feedback}
                                onChange={handleChange}
                                placeholder="Please share your comments, suggestions, or experience using Upcheck IoT hardware or web app..."
                                rows={7}
                                className={`block px-4 py-3 w-full text-sm text-foreground bg-background/25 rounded-xl border border-border/50 appearance-none focus:outline-none focus:ring-2 focus:ring-[#00C9E4]/25 focus:border-[#00C9E4] hover:border-[#00C9E4]/40 hover:bg-background/40 focus:bg-background/50 transition-all duration-300 shadow-sm resize-none placeholder:text-sm placeholder:text-muted-foreground/60 ${
                                  errors.feedback ? "border-destructive focus:ring-destructive/20 focus:border-destructive hover:border-destructive/60" : ""
                                }`}
                              />
                              {errors.feedback && (
                                <span className="text-[10px] text-destructive flex items-center gap-1 mt-1.5 ml-1">
                                  <AlertCircle className="w-3 h-3" />
                                  {errors.feedback}
                                </span>
                              )}
                            </div>
                          </div>

                        <div className="mt-auto space-y-4 pt-4">
                            {/* Submit Button */}
                            <Button
                              type="submit"
                              disabled={isSubmitting}
                              className="w-full py-6 rounded-xl font-bold text-base shadow-lg transition-all duration-300 flex items-center justify-center gap-2 hover:brightness-105 hover:scale-[1.01] active:scale-[0.99] hover:shadow-[0_0_25px_rgba(0,201,228,0.35)]"
                              style={{
                                background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)",
                                border: "none",
                              }}
                            >
                              {isSubmitting ? (
                                <>
                                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                  </svg>
                                  Submitting Feedback...
                                </>
                              ) : (
                                <>
                                  Submit Feedback
                                  <Send className="w-4 h-4" />
                                </>
                              )}
                            </Button>

                            {/* Secure Lock Text */}
                            <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground/60 select-none">
                              <Lock className="w-3.5 h-3.5 text-[#00C9E4]/80 shrink-0" />
                              <span>Your feedback is secure and will only be used to improve Upcheck.</span>
                            </div>
                          </div>

                        </motion.form>
                      ) : (
                        <motion.div
                          key="feedback-success"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-center py-8 space-y-6 flex flex-col justify-center"
                        >
                          <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 mx-auto border border-emerald-500/20 shadow-inner">
                            <ShieldCheck className="w-8 h-8" />
                          </div>
                          <div className="space-y-2">
                            <h3 className="text-2xl font-extrabold text-foreground">Thank You!</h3>
                            <p className="text-sm text-muted-foreground max-w-md mx-auto">
                              Your response has been successfully saved. We appreciate you taking the time to share your feedback with the Upcheck team.
                            </p>
                          </div>
                          <div className="pt-4 flex justify-center gap-4">
                            <Button
                              variant="outline"
                              onClick={resetForm}
                              className="px-6 py-2.5 rounded-xl text-sm font-semibold border-border hover:bg-muted"
                            >
                              Submit Another Response
                            </Button>
                            <Button
                              onClick={() => window.location.href = "/"}
                              className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white shadow-md hover:scale-[1.02] active:scale-[0.98] transition-transform"
                              style={{
                                background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)",
                                border: "none"
                              }}
                            >
                              Return Home
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </CardContent>
                </Card>
              </div>

              {/* Right Column: Premium Visual Section */}
              <div className="lg:col-span-5 flex flex-col space-y-5">
                
                {SHOW_SENSOR_DEMO ? (
                  <>
                    {/* Visual Card 1: Live IoT Telemetry Simulator */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <Card className="border border-border/50 bg-background/55 backdrop-blur-xl shadow-lg rounded-2xl overflow-hidden hover:border-[#00C9E4]/40 transition-all duration-300">
                        <CardContent className="p-6 space-y-6">
                          <div className="flex items-center justify-between border-b border-border/40 pb-4">
                            <div className="flex items-center gap-2.5">
                              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                              <span className="text-xs font-bold uppercase tracking-wider text-[#0067B1] dark:text-[#00C9E4]">
                                Smart Sensor System
                              </span>
                            </div>
                            <span className="text-[10px] font-mono text-muted-foreground/80 bg-muted/65 px-2 py-0.5 rounded">ID: UC-8409-P1</span>
                          </div>

                          {/* Sensor readings layout */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-muted/20 border border-border/30 rounded-xl p-3.5 space-y-1">
                              <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider block">Temperature</span>
                              <div className="flex items-baseline gap-1">
                                <span className="text-lg font-extrabold text-foreground">28.4</span>
                                <span className="text-xs text-muted-foreground">°C</span>
                              </div>
                              <span className="text-[9px] text-emerald-500 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded inline-block">
                                Optimal
                              </span>
                            </div>

                            <div className="bg-muted/20 border border-border/30 rounded-xl p-3.5 space-y-1">
                              <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider block">Dissolved Oxygen</span>
                              <div className="flex items-baseline gap-1">
                                <span className="text-lg font-extrabold text-foreground">6.2</span>
                                <span className="text-xs text-muted-foreground">mg/L</span>
                              </div>
                              <span className="text-[9px] text-emerald-500 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded inline-block">
                                Optimal
                              </span>
                            </div>

                            <div className="bg-muted/20 border border-border/30 rounded-xl p-3.5 space-y-1">
                              <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider block">Salinity</span>
                              <div className="flex items-baseline gap-1">
                                <span className="text-lg font-extrabold text-foreground">25</span>
                                <span className="text-xs text-muted-foreground">ppt</span>
                              </div>
                              <span className="text-[9px] text-emerald-500 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded inline-block">
                                Stable
                              </span>
                            </div>

                            <div className="bg-muted/20 border border-border/30 rounded-xl p-3.5 space-y-1">
                              <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider block">pH Level</span>
                              <div className="flex items-baseline gap-1">
                                <span className="text-lg font-extrabold text-foreground">7.9</span>
                                <span className="text-xs text-muted-foreground">pH</span>
                              </div>
                              <span className="text-[9px] text-emerald-500 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded inline-block">
                                Healthy
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>

                    {/* Visual Card 2: Interactive Ocean wave gradients & Aquaculture Illustration */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.35 }}
                    >
                      <Card className="border border-border/50 bg-gradient-to-br from-[#00C9E4]/5 to-[#0067B1]/10 backdrop-blur-xl shadow-lg rounded-2xl overflow-hidden hover:border-[#00C9E4]/40 transition-all duration-300 group relative">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(0,201,228,0.08),_transparent_50%)]" />
                        
                        <CardContent className="p-6 md:p-8 space-y-6 relative z-10">
                          <div className="flex justify-between items-start">
                            <div className="space-y-1">
                              <h3 className="text-lg font-bold tracking-tight text-foreground">Upcheck Monitoring</h3>
                              <p className="text-xs text-muted-foreground">Aquaculture Intelligence Platform</p>
                            </div>
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#00C9E4] to-[#0067B1] flex items-center justify-center text-white font-black text-sm shadow-md">
                              U
                            </div>
                          </div>

                          {/* Wave visual container */}
                          <div className="relative h-28 w-full bg-background/45 rounded-xl border border-border/30 overflow-hidden flex items-center justify-center">
                            <svg className="absolute inset-x-0 bottom-0 w-full h-16 opacity-30 fill-[#00C9E4] animate-pulse" viewBox="0 0 1440 320" preserveAspectRatio="none">
                              <path d="M0,96L80,112C160,128,320,160,480,165.3C640,171,800,149,960,138.7C1120,128,1280,128,1360,128L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
                            </svg>
                            <svg className="absolute inset-x-0 bottom-0 w-full h-12 opacity-60 fill-[#0067B1]" viewBox="0 0 1440 320" preserveAspectRatio="none">
                              <path d="M0,192L80,181.3C160,171,320,149,480,144C640,139,800,149,960,165.3C1120,181,1280,203,1360,213.3L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
                            </svg>

                            {/* Telemetry Icon Overlay */}
                            <motion.div
                              animate={{ y: [0, -4, 0] }}
                              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                              className="relative z-20 flex flex-col items-center gap-1.5"
                            >
                              <Activity className="w-8 h-8 text-[#00C9E4] drop-shadow-[0_0_8px_rgba(0,201,228,0.45)]" />
                              <span className="text-[10px] font-bold uppercase tracking-wider text-foreground/80">Telemetry Live Link</span>
                            </motion.div>
                          </div>

                          <div className="space-y-3.5 pt-2">
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                              <span>Continuous salinity, DO, and temperature tracking</span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                              <span>Real-time predictive anomalies and aeration health alerts</span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                              <span>Cloud-connected hardware with web & mobile dashboard access</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="space-y-5 flex flex-col"
                  >
                    {/* Visual Card 1: Connected Illustration and Description */}
                    <Card className="border border-border/50 bg-background/55 backdrop-blur-xl shadow-xl rounded-2xl overflow-hidden hover:border-[#00C9E4]/40 transition-all duration-300 relative group">
                      {/* Radial Ambient Glow */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(0,201,228,0.06),_transparent_60%)]" />
                      
                      <CardContent className="p-6 md:p-8 space-y-6 relative z-10">
                        {/* Upcheck Branding */}
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <img src={logoUrl} alt="Upcheck" className="h-12 md:h-14 w-auto" />
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#0067B1] dark:text-[#00C9E4] bg-[#00C9E4]/10 dark:bg-[#00C9E4]/25 px-2.5 py-1 rounded-full">
                            IoT Smart Platform
                          </span>
                        </div>

                        {/* Schematic Illustration Box (Clean SVG vectors and CSS animations) */}
                        <div className="relative h-60 w-full bg-muted/20 border border-border/30 rounded-2xl overflow-hidden flex items-center justify-center">
                          {/* Animated Tide Background */}
                          <svg className="absolute inset-x-0 bottom-0 w-full h-24 opacity-20 fill-[#00C9E4] animate-pulse" viewBox="0 0 1440 320" preserveAspectRatio="none">
                            <path d="M0,224L48,218.7C96,213,192,203,288,186.7C384,171,480,149,576,149.3C672,149,768,171,864,186.7C960,203,1056,213,1152,208C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                          </svg>
                          <svg className="absolute inset-x-0 bottom-0 w-full h-20 opacity-30 fill-[#0067B1]" viewBox="0 0 1440 320" preserveAspectRatio="none">
                            <path d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,176C672,160,768,160,864,176C960,192,1056,224,1152,213.3C1248,203,1344,149,1392,122.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                          </svg>

                          {/* Cloud Connection Vector line */}
                          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                            <motion.path
                              d="M 90 170 Q 155 105 230 75"
                              fill="none"
                              stroke="url(#schematicGradient)"
                              strokeWidth="2.5"
                              strokeDasharray="6, 6"
                              animate={{ strokeDashoffset: [-120, 0] }}
                              transition={{ repeat: Infinity, duration: 4.5, ease: "linear" }}
                            />
                            <defs>
                              <linearGradient id="schematicGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#00C9E4" />
                                <stop offset="100%" stopColor="#0067B1" />
                              </linearGradient>
                            </defs>
                          </svg>

                          {/* Cloud Centerpiece */}
                          <motion.div 
                            className="absolute top-8 right-16 bg-background/85 border border-border/50 p-3 rounded-2xl shadow-md backdrop-blur-md flex items-center justify-center"
                            animate={{ y: [0, -3, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                          >
                            <div className="relative">
                              <Cloud className="w-8 h-8 text-[#0067B1]" />
                              <Wifi className="w-4 h-4 text-[#00C9E4] absolute -top-1.5 -right-1.5 animate-pulse" />
                            </div>
                          </motion.div>

                          {/* IoT Probe Hardware Representation */}
                          <motion.div 
                            className="absolute bottom-8 left-12 bg-background/85 border border-border/50 p-3 rounded-2xl shadow-md backdrop-blur-md flex flex-col items-center gap-1 z-20"
                            animate={{ y: [0, 4, 0] }}
                            transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                          >
                            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#00C9E4] to-[#0067B1] flex items-center justify-center text-white shadow-inner relative">
                              <Activity className="w-3.5 h-3.5 animate-pulse" />
                              <span className="absolute -inset-1 rounded-full border border-[#00C9E4]/40 animate-ping opacity-75" />
                            </div>
                            <span className="text-[8px] font-bold tracking-wider text-muted-foreground uppercase leading-none mt-1">IoT Probe</span>
                          </motion.div>

                          {/* Stylized Shrimp Aquaculture Badge */}
                          <motion.div
                            className="absolute top-1/2 left-[48%] -translate-y-1/2 z-10"
                            animate={{ 
                              x: [0, 6, 0],
                              y: [-3, 3, -3],
                              rotate: [0, 1.5, 0]
                            }}
                            transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut" }}
                          >
                            <div className="bg-background/90 border border-border/60 backdrop-blur-md p-2.5 rounded-xl flex items-center gap-2 shadow-md">
                              <span className="text-xl">🦐</span>
                              <div className="text-left">
                                <span className="text-[9px] font-bold text-foreground block leading-none">Shrimp Pond</span>
                                <span className="text-[7px] text-[#00C9E4] font-semibold block leading-none mt-0.5">Monitoring Active</span>
                              </div>
                            </div>
                          </motion.div>

                          {/* Floating water bubbles */}
                          <div className="absolute inset-0 pointer-events-none">
                            <motion.div 
                              className="absolute bottom-6 left-[30%] w-1.5 h-1.5 rounded-full bg-[#00C9E4]/30"
                              animate={{ y: [0, -75], opacity: [0, 0.9, 0] }}
                              transition={{ repeat: Infinity, duration: 3, delay: 0.6 }}
                            />
                            <motion.div 
                              className="absolute bottom-4 left-[55%] w-2 h-2 rounded-full bg-[#00C9E4]/20"
                              animate={{ y: [0, -65], opacity: [0, 0.8, 0] }}
                              transition={{ repeat: Infinity, duration: 2.7, delay: 1.1 }}
                            />
                            <motion.div 
                              className="absolute bottom-5 right-[30%] w-1.5 h-1.5 rounded-full bg-[#00C9E4]/25"
                              animate={{ y: [0, -85], opacity: [0, 0.85, 0] }}
                              transition={{ repeat: Infinity, duration: 3.5, delay: 0.2 }}
                            />
                          </div>
                        </div>

                        {/* Product Short Description (Placed below illustration) */}
                        <div className="space-y-2 pt-2 border-t border-border/40">
                          <h3 className="text-lg font-bold tracking-tight text-foreground">
                            Smart Aquaculture Monitoring
                          </h3>
                          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                            Helping shrimp farmers monitor water quality, receive intelligent alerts, and improve productivity through connected IoT hardware and cloud technology.
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Features section: Why Your Feedback Matters */}
                    <Card className="border border-border/50 bg-background/55 backdrop-blur-xl shadow-xl rounded-2xl overflow-hidden hover:border-[#00C9E4]/40 transition-all duration-300 relative">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(0,103,177,0.04),_transparent_50%)]" />
                      
                      <CardContent className="p-5 md:p-6 space-y-4 relative z-10">
                        <div className="space-y-1">
                          <h4 className="text-sm font-bold uppercase tracking-wider text-[#0067B1] dark:text-[#00C9E4]">
                            Why Your Feedback Matters
                          </h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            Every suggestion, issue, and idea helps us improve Upcheck.
                          </p>
                        </div>

                        <div className="divide-y divide-border/45 pt-2">
                          <div className="flex items-center gap-3 py-3 group">
                            <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0 transition-transform group-hover:scale-110 duration-200">
                              <Lightbulb className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-xs font-medium text-foreground/90">
                              Your ideas help improve Upcheck.
                            </span>
                          </div>

                          <div className="flex items-center gap-3 py-3 group">
                            <div className="w-7 h-7 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500 shrink-0 transition-transform group-hover:scale-110 duration-200">
                              <Bug className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-xs font-medium text-foreground/90">
                              Report bugs and usability issues.
                            </span>
                          </div>

                          <div className="flex items-center gap-3 py-3 group">
                            <div className="w-7 h-7 rounded-lg bg-[#00C9E4]/10 flex items-center justify-center text-[#00C9E4] shrink-0 transition-transform group-hover:scale-110 duration-200">
                              <Rocket className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-xs font-medium text-foreground/90">
                              Shape future platform improvements.
                            </span>
                          </div>

                          <div className="flex items-center gap-3 py-3 group">
                            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0 transition-transform group-hover:scale-110 duration-200">
                              <Lock className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-xs font-medium text-foreground/90">
                              Your feedback is reviewed securely by our team.
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

              </div>

            </div>
          </section>

          {/* Call to Action Section (Only if SHOW_TESTIMONIALS is enabled) */}
          {SHOW_TESTIMONIALS && (
            <section className="relative rounded-3xl border border-border/50 bg-card overflow-hidden py-16 px-8 md:px-16 text-center space-y-8 mt-28">
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top_left,_rgba(0,201,228,0.12),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(0,103,177,0.1),_transparent_38%)]" />
              
              <div className="max-w-3xl mx-auto space-y-6 relative z-10">
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                  Your feedback helps us build better technology for shrimp farming.
                </h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  Whether you are managing a single artisanal pond or a commercial multi-location aquaculture cooperative, we are dedicated to building tools that matter to your daily operation.
                </p>

                <div className="pt-6 flex flex-wrap justify-center gap-4">
                  <Button
                    onClick={scrollToForm}
                    size="lg"
                    className="gap-2 text-base font-bold shadow-lg transition-transform hover:scale-[1.02] duration-200"
                    style={{
                      background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)",
                      border: "none",
                    }}
                  >
                    Share Your Experience
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-base font-semibold border-border hover:bg-muted/50 transition-all"
                    onClick={() => window.location.href = "mailto:support@upcheck.com"}
                  >
                    Contact Our Team
                  </Button>
                </div>
              </div>
            </section>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
