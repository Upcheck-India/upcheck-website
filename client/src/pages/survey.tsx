import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft,
  ArrowRight, 
  CheckCircle2, 
  ClipboardList, 
  HelpCircle, 
  Layers, 
  MapPin, 
  Network, 
  ShieldAlert, 
  Sparkles, 
  User 
} from "lucide-react";

// Form Interface
interface SurveyForm {
  farmName: string;
  location: string;
  cultureType: string;
  challenges: string[];
  iotUsage: string;
  coDevOptions: string[];
  fullName: string;
  email: string;
  phone: string;
  comments: string;
}

const initialFormState: SurveyForm = {
  farmName: "",
  location: "",
  cultureType: "shrimp",
  challenges: [],
  iotUsage: "none",
  coDevOptions: [],
  fullName: "",
  email: "",
  phone: "",
  comments: ""
};

const CHALLENGE_OPTIONS = [
  { id: "disease", label: "Disease outbreaks and crop losses" },
  { id: "feed_waste", label: "Feed management & feed overuse/waste" },
  { id: "oxygen_drops", label: "Sudden Dissolved Oxygen drops" },
  { id: "temp_fluc", label: "Water quality fluctuations (pH, Temp)" },
  { id: "energy_cost", label: "High electrical / aeration costs" },
  { id: "labor", label: "Manual data collection & logging labor" }
];

const CODEV_OPTIONS = [
  { id: "beta_sensors", label: "Beta-test floating IoT sensor devices on my farm" },
  { id: "app_feedback", label: "Give feedback on new mobile application UI/UX releases" },
  { id: "feed_assistant", label: "Test and suggest features for the Smart Feeding Assistant" },
  { id: "research", label: "Co-author case studies or operational reports on aquaculture tech" },
  { id: "developer_api", label: "Developer APIs / integration with existing management software" }
];

// Procedural floating bubble configurations (matching products page style)
const bubbleConfigs = [
  { size: 28, left: 8, duration: 14, delay: 0 },
  { size: 16, left: 18, duration: 10, delay: 3 },
  { size: 34, left: 28, duration: 18, delay: 1 },
  { size: 20, left: 45, duration: 12, delay: 5 },
  { size: 24, left: 62, duration: 15, delay: 2 },
  { size: 14, left: 74, duration: 9, delay: 4 },
  { size: 30, left: 85, duration: 16, delay: 1.5 },
  { size: 18, left: 93, duration: 11, delay: 6 },
];

export default function Survey() {
  const [form, setForm] = useState<SurveyForm>(initialFormState);
  const [errors, setErrors] = useState<Partial<Record<keyof SurveyForm, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  // Handle Input Changes
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof SurveyForm]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // Handle Checkboxes
  const handleCheckboxChange = (field: "challenges" | "coDevOptions", optionId: string, checked: boolean) => {
    setForm(prev => {
      const currentList = prev[field];
      const updatedList = checked 
        ? [...currentList, optionId]
        : currentList.filter(id => id !== optionId);
      return { ...prev, [field]: updatedList };
    });
  };

  // Handle Radio group
  const handleRadioChange = (value: string) => {
    setForm(prev => ({ ...prev, iotUsage: value }));
  };

  const handleCultureSelect = (value: string) => {
    setForm(prev => ({ ...prev, cultureType: value }));
  };

  // Form Validations
  const validateForm = () => {
    const newErrors: Partial<Record<keyof SurveyForm, string>> = {};
    if (!form.farmName.trim()) newErrors.farmName = "Farm Name is required";
    if (!form.location.trim()) newErrors.location = "Location is required";
    if (!form.fullName.trim()) newErrors.fullName = "Contact Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill out all required fields marked with *",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API Submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      toast({
        title: "Survey Submitted!",
        description: "Thank you for participating and developing with Upcheck.",
      });
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-site-gradient relative overflow-hidden text-slate-800 dark:text-slate-100">
      <Navigation />

      {/* Decorative ambient background overlays (Matching brand caustics) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#00c9e40c_1.5px,transparent_1.5px)] [background-size:32px_32px] opacity-90" />
        
        {/* Floating background bubble particles */}
        {bubbleConfigs.map((bubble, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-white/20 dark:border-white/5 bg-gradient-to-tr from-[#00C9E4]/10 to-transparent pointer-events-none"
            style={{
              width: bubble.size,
              height: bubble.size,
              left: `${bubble.left}%`,
              bottom: "-10%",
            }}
            animate={{
              y: ["0vh", "-120vh"],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0, 0.45, 0.45, 0],
            }}
            transition={{
              duration: bubble.duration,
              delay: bubble.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        {/* Ambient mesh blur rings */}
        <motion.div
          className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-gradient-to-br from-[#00C9E4]/10 to-transparent blur-[80px]"
          animate={{
            x: [0, 35, -25, 0],
            y: [0, -35, 15, 0],
            scale: [1, 1.05, 0.95, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[40%] -right-[5%] w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] rounded-full bg-gradient-to-br from-[#0067B1]/8 to-transparent blur-[100px]"
          animate={{
            x: [0, -35, 25, 0],
            y: [0, 25, -25, 0],
            scale: [1, 0.92, 1.08, 1],
          }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <main className="relative z-10 pt-36 pb-24 px-6">
        <div className="container mx-auto max-w-4xl space-y-12">
          
          {/* Header Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="bg-gradient-to-r from-[#00C9E4] to-[#0067B1] rounded-[32px] p-6 md:p-12 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.15),_transparent_60%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:20px_20px] opacity-70" />
            
            <div className="bg-white/95 dark:bg-black/80 backdrop-blur-md rounded-[24px] shadow-lg p-8 md:p-12 text-center relative z-10 border border-[#0077B6]/10">
              <Badge className="bg-[#00C9E4]/10 text-[#0067B1] hover:bg-[#00C9E4]/15 border border-[#00C9E4]/20 px-3 py-1 text-xs font-semibold rounded-full mb-4 shadow-sm inline-flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Participate & Develop
              </Badge>
              <h1 
                className="text-3xl md:text-5xl font-black mb-6 tracking-tight leading-tight"
                style={{ 
                  background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text"
                }}
              >
                Aquaculture Tech & Innovation Survey
              </h1>
              <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-medium">
                Upcheck is built for farmers, by co-developing telemetry tools that address actual pond conditions. By completing this 3-minute survey, you directly participate in prioritizing feature releases, software recommendations, and beta hardware testing programs.
              </p>
            </div>
          </motion.div>

          {/* Form / Success Views Container */}
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="survey-form"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -25 }}
                transition={{ duration: 0.5 }}
              >
                <form onSubmit={handleSubmit} className="space-y-8">
                  
                  {/* Section 1: Farm Profile */}
                  <Card className="border border-slate-200/60 dark:border-slate-800/80 bg-white/80 dark:bg-black/60 backdrop-blur-md shadow-sm rounded-3xl overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-8 md:p-10 space-y-6">
                      <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800/60 pb-4">
                        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-[#0067B1] flex items-center justify-center">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                          <h2 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white">Farm Profile</h2>
                          <p className="text-xs text-muted-foreground">General details about your aquaculture setup.</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2 text-left">
                          <Label htmlFor="farmName" className="font-semibold text-slate-700 dark:text-slate-200">
                            Farm Name / Organization <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="farmName"
                            name="farmName"
                            placeholder="e.g. Blue Lagoon Shrimp Farm"
                            value={form.farmName}
                            onChange={handleTextChange}
                            className={`rounded-xl h-11 border-slate-200 ${errors.farmName ? "border-red-500 ring-1 ring-red-500" : ""}`}
                          />
                          {errors.farmName && (
                            <span className="text-xs font-medium text-red-500 mt-1 block">{errors.farmName}</span>
                          )}
                        </div>

                        <div className="space-y-2 text-left">
                          <Label htmlFor="location" className="font-semibold text-slate-700 dark:text-slate-200">
                            Location (Region / Country) <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="location"
                            name="location"
                            placeholder="e.g. Andhra Pradesh, India"
                            value={form.location}
                            onChange={handleTextChange}
                            className={`rounded-xl h-11 border-slate-200 ${errors.location ? "border-red-500 ring-1 ring-red-500" : ""}`}
                          />
                          {errors.location && (
                            <span className="text-xs font-medium text-red-500 mt-1 block">{errors.location}</span>
                          )}
                        </div>
                      </div>

                      <div className="space-y-3 text-left">
                        <Label className="font-semibold text-slate-700 dark:text-slate-200">Principal Aquaculture Culture</Label>
                        <RadioGroup 
                          value={form.cultureType} 
                          onValueChange={handleCultureSelect}
                          className="grid grid-cols-2 md:grid-cols-4 gap-4"
                        >
                          {["shrimp", "fish", "both", "other"].map((type) => (
                            <div key={type} className="flex items-center space-x-2">
                              <RadioGroupItem value={type} id={`culture-${type}`} className="text-[#0067B1] border-slate-300 animate-none" />
                              <Label 
                                htmlFor={`culture-${type}`} 
                                className="capitalize cursor-pointer font-medium text-slate-600 dark:text-slate-300 text-sm"
                              >
                                {type}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Section 2: Farm Operational Challenges */}
                  <Card className="border border-slate-200/60 dark:border-slate-800/80 bg-white/80 dark:bg-black/60 backdrop-blur-md shadow-sm rounded-3xl overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-8 md:p-10 space-y-6">
                      <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800/60 pb-4">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                          <ShieldAlert className="w-5 h-5" />
                        </div>
                        <div>
                          <h2 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white">Daily Operational Challenges</h2>
                          <p className="text-xs text-muted-foreground">Select the major pain points that affect your farm yield or daily labor (Select all that apply).</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 text-left">
                        {CHALLENGE_OPTIONS.map((challenge) => (
                          <div 
                            key={challenge.id} 
                            className="flex items-start space-x-3 p-3 rounded-2xl border border-slate-100 dark:border-slate-800/40 bg-slate-50/50 dark:bg-slate-900/30 hover:bg-slate-100/50 transition-colors"
                          >
                            <Checkbox 
                              id={`challenge-${challenge.id}`} 
                              checked={form.challenges.includes(challenge.id)}
                              onCheckedChange={(checked) => 
                                handleCheckboxChange("challenges", challenge.id, !!checked)
                              }
                              className="mt-1 text-[#0067B1] border-slate-300 rounded-md"
                            />
                            <Label 
                              htmlFor={`challenge-${challenge.id}`} 
                              className="text-sm font-semibold text-slate-700 dark:text-slate-200 cursor-pointer select-none leading-tight"
                            >
                              {challenge.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Section 3: Smart Tech & IoT Readiness */}
                  <Card className="border border-slate-200/60 dark:border-slate-800/80 bg-white/80 dark:bg-black/60 backdrop-blur-md shadow-sm rounded-3xl overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-8 md:p-10 space-y-6">
                      <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800/60 pb-4">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
                          <Layers className="w-5 h-5" />
                        </div>
                        <div>
                          <h2 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white">Smart Technology & IoT Usage</h2>
                          <p className="text-xs text-muted-foreground">What describes your current setup for environmental tracking?</p>
                        </div>
                      </div>

                      <div className="space-y-4 text-left">
                        <RadioGroup 
                          value={form.iotUsage} 
                          onValueChange={handleRadioChange}
                          className="space-y-3"
                        >
                          {[
                            { value: "automated", label: "Automated continuous systems (floating IoT sensors monitoring 24/7)" },
                            { value: "manual", label: "Manual testing (probes or chemical testing kits manually performed daily)" },
                            { value: "planning", label: "No current IoT setup, but planning to integrate sensors/automation soon" },
                            { value: "none", label: "No automated sensors used and no current plans to acquire them" }
                          ].map((option) => (
                            <div 
                              key={option.value} 
                              className="flex items-center space-x-3 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800/40 bg-slate-50/50 dark:bg-slate-900/30 hover:bg-slate-100/50 transition-colors"
                            >
                              <RadioGroupItem value={option.value} id={`iot-${option.value}`} className="text-[#0067B1] border-slate-300" />
                              <Label 
                                htmlFor={`iot-${option.value}`} 
                                className="text-sm font-semibold text-slate-700 dark:text-slate-200 cursor-pointer select-none"
                              >
                                {option.label}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Section 4: Co-Development Options */}
                  <Card className="border border-slate-200/60 dark:border-slate-800/80 bg-white/80 dark:bg-black/60 backdrop-blur-md shadow-sm rounded-3xl overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-8 md:p-10 space-y-6">
                      <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800/60 pb-4">
                        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-[#0067B1] flex items-center justify-center">
                          <Network className="w-5 h-5" />
                        </div>
                        <div>
                          <h2 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white">Participate & Co-Develop</h2>
                          <p className="text-xs text-muted-foreground">How would you like to collaborate with the Upcheck engineering and research team?</p>
                        </div>
                      </div>

                      <div className="space-y-3 text-left">
                        {CODEV_OPTIONS.map((option) => (
                          <div 
                            key={option.id} 
                            className="flex items-start space-x-3 p-3 rounded-2xl border border-slate-100 dark:border-slate-800/40 bg-slate-50/50 dark:bg-slate-900/30 hover:bg-slate-100/50 transition-colors"
                          >
                            <Checkbox 
                              id={`codev-${option.id}`} 
                              checked={form.coDevOptions.includes(option.id)}
                              onCheckedChange={(checked) => 
                                handleCheckboxChange("coDevOptions", option.id, !!checked)
                              }
                              className="mt-1 text-[#0067B1] border-slate-300 rounded-md"
                            />
                            <Label 
                              htmlFor={`codev-${option.id}`} 
                              className="text-sm font-semibold text-slate-700 dark:text-slate-200 cursor-pointer select-none leading-tight"
                            >
                              {option.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Section 5: Personal Details */}
                  <Card className="border border-slate-200/60 dark:border-slate-800/80 bg-white/80 dark:bg-black/60 backdrop-blur-md shadow-sm rounded-3xl overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-8 md:p-10 space-y-6">
                      <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800/60 pb-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <h2 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white">Contact & Get Involved</h2>
                          <p className="text-xs text-muted-foreground">Please share your contact details so we can reach out for co-development invites.</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="space-y-2 text-left">
                          <Label htmlFor="fullName" className="font-semibold text-slate-700 dark:text-slate-200">
                            Your Name <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="fullName"
                            name="fullName"
                            placeholder="John Doe"
                            value={form.fullName}
                            onChange={handleTextChange}
                            className={`rounded-xl h-11 border-slate-200 ${errors.fullName ? "border-red-500 ring-1 ring-red-500" : ""}`}
                          />
                          {errors.fullName && (
                            <span className="text-xs font-medium text-red-500 mt-1 block">{errors.fullName}</span>
                          )}
                        </div>

                        <div className="space-y-2 text-left">
                          <Label htmlFor="email" className="font-semibold text-slate-700 dark:text-slate-200">
                            Email Address <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="john@farm.com"
                            value={form.email}
                            onChange={handleTextChange}
                            className={`rounded-xl h-11 border-slate-200 ${errors.email ? "border-red-500 ring-1 ring-red-500" : ""}`}
                          />
                          {errors.email && (
                            <span className="text-xs font-medium text-red-500 mt-1 block">{errors.email}</span>
                          )}
                        </div>

                        <div className="space-y-2 text-left">
                          <Label htmlFor="phone" className="font-semibold text-slate-700 dark:text-slate-200">Phone / WhatsApp</Label>
                          <Input
                            id="phone"
                            name="phone"
                            placeholder="+1 (555) 019-2834"
                            value={form.phone}
                            onChange={handleTextChange}
                            className="rounded-xl h-11 border-slate-200"
                          />
                        </div>
                      </div>

                      <div className="space-y-2 text-left">
                        <Label htmlFor="comments" className="font-semibold text-slate-700 dark:text-slate-200">Additional Features or Feedback</Label>
                        <Textarea
                          id="comments"
                          name="comments"
                          placeholder="What features or support would you love to see in Upcheck to improve your daily farming operations?"
                          value={form.comments}
                          onChange={handleTextChange}
                          rows={4}
                          className="rounded-xl border-slate-200 focus-visible:ring-1"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Submission Row */}
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="h-12 px-8 font-bold text-white rounded-2xl shadow-lg border-none hover:scale-[1.02] active:scale-[0.98] transition-all relative overflow-hidden group"
                      style={{
                        background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)",
                      }}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 border-2 border-white/35 border-t-white rounded-full animate-spin" />
                          Submitting...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          Submit Survey
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      )}
                    </Button>
                  </div>
                </form>
              </motion.div>
            ) : (
              // Success feedback screen
              <motion.div
                key="survey-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Card className="border border-[#00C9E4]/25 bg-white/95 dark:bg-black/80 backdrop-blur-md shadow-2xl rounded-[32px] p-8 md:p-16 text-center max-w-2xl mx-auto relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,201,228,0.06),_transparent_55%)] pointer-events-none" />
                  
                  <div className="relative space-y-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-500 mb-2">
                      <CheckCircle2 className="w-12 h-12" />
                    </div>

                    <div className="space-y-3">
                      <h2 className="text-3xl font-black text-slate-800 dark:text-white leading-tight">Thank you, {form.fullName}!</h2>
                      <p className="text-[#0067B1] font-bold text-sm tracking-wide uppercase">Your participation helps us build a smarter system</p>
                      <p className="text-slate-500 text-sm md:text-base max-w-md mx-auto leading-relaxed">
                        We have recorded your details for <strong>{form.farmName}</strong>. Our developer relations and engineering team reviews survey inputs weekly to inform prioritize hardware updates and app dashboard parameters.
                      </p>
                    </div>

                    {/* What's Next Box */}
                    <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-800/40 text-left space-y-4 max-w-md mx-auto">
                      <h3 className="font-bold text-sm text-slate-700 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
                        <ClipboardList className="w-4 h-4 text-[#0067B1]" />
                        What happens next?
                      </h3>
                      <ul className="space-y-3 text-xs text-slate-500 dark:text-slate-400">
                        <li className="flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                          <span><strong>Developer Check</strong>: We will check your location to evaluate sensor beta testing compatibility.</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                          <span><strong>Feedback Integration</strong>: Your challenges have been logged into our operational priorities matrix.</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                          <span><strong>Join Network</strong>: If you checked co-development, look out for an email invite within 5-7 business days.</span>
                        </li>
                      </ul>
                    </div>

                    <div className="flex justify-center gap-4 pt-2">
                      <Button
                        onClick={() => {
                          setForm(initialFormState);
                          setIsSuccess(false);
                        }}
                        variant="outline"
                        className="rounded-xl gap-2 font-semibold h-11"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Submit Another
                      </Button>
                      
                      <a href="/products">
                        <Button
                          className="rounded-xl gap-2 font-semibold text-white h-11 border-none shadow-md"
                          style={{
                            background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)",
                          }}
                        >
                          View Our Products
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </a>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </main>

      <Footer />
    </div>
  );
}
