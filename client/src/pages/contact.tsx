import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sendFormNotification, honeypotFieldProps } from "@/config/forms";
import { 
  MapPin, 
  Mail,
  Clock,
  Send, 
  CheckCircle2, 
  User, 
  Building2, 
  Info,
  ChevronRight,
  Sparkles
} from "lucide-react";

const SUBJECT_BY_SLUG: Record<string, string> = {
  demo: "Schedule a Demo",
  support: "Technical Support",
  general: "General Inquiry",
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    orgName: "",
    subject: "General Inquiry",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState(false);

  // Deep links like /contact?subject=demo preselect the subject and jump to the form.
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("subject");
    if (!requested) return;
    const match = SUBJECT_BY_SLUG[requested.toLowerCase()];
    if (!match) return;
    setFormData(prev => ({ ...prev, subject: match }));
    document
      .getElementById("contact-content-section")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    if (isSubmitting) return; // guard against double-submit

    setIsSubmitting(true);
    setSubmitError(null);

    const result = await sendFormNotification({
      subject: `[upcheck.in] ${formData.subject} — ${formData.name}`,
      replyto: formData.email,
      name: formData.name,
      email: formData.email,
      organisation: formData.orgName || "—",
      enquiry_type: formData.subject,
      message: formData.message,
      [honeypotFieldProps.name]: honeypot ? "true" : "",
    });

    setIsSubmitting(false);
    if (result.ok) setIsSubmitted(true);
    else setSubmitError(result.error);
  };

  const handleScrollToForm = (subjectOption?: string) => {
    if (subjectOption) {
      setFormData(prev => ({
        ...prev,
        subject: subjectOption
      }));
    }
    
    const formSection = document.getElementById("contact-content-section");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-site-gradient text-[#0F172A] dark:text-[#F8FAFC] flex flex-col font-sans overflow-x-hidden relative">
      <Navigation />

      {/* Floating blurs for visual depth */}
      <div className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] bg-[#00C9E4]/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 right-[-10%] w-[600px] h-[600px] bg-[#0067B1]/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Hero Section */}
      <section 
        className="relative min-h-[55vh] md:min-h-[60vh] pt-48 pb-32 px-6 flex items-center justify-center overflow-hidden border-b border-white/10"
        style={{ background: "linear-gradient(135deg, #00C9E4 0%, #0067B1 100%)" }}
      >
        {/* Animated Background blobs inside Hero */}
        <div className="absolute top-[-20%] left-[-10%] w-[450px] h-[450px] bg-white/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-30%] right-[-10%] w-[550px] h-[550px] bg-[#00C9E4]/25 rounded-full blur-[120px] pointer-events-none animate-pulse" />
        
        <div className="container mx-auto max-w-4xl text-center relative z-10 space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin duration-1000" />
            Active Support Platform
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6"
          >
            Get in Touch
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-white/95 max-w-2xl mx-auto leading-relaxed font-semibold"
          >
            We're here to support your aquaculture journey. Whether you have questions about UpCheck, need technical assistance, or are interested in collaborating, our team is ready to help.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              onClick={() => handleScrollToForm("General Inquiry")}
              className="px-8 h-14 bg-white hover:bg-slate-50 text-[#0067B1] border-none shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 font-bold"
            >
              Contact Us
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              onClick={() => handleScrollToForm("Schedule a Demo")}
              className="px-8 h-14 backdrop-blur-sm border-white/40 hover:border-white hover:bg-white/10 text-white bg-transparent font-bold hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
            >
              Schedule a Demo
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <section id="contact-content-section" className="py-24 px-6 bg-white dark:bg-[#0B1321] scroll-mt-20 relative z-20">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Side: Contact Information cards */}
            <div className="lg:col-span-5 space-y-6">
              <div className="text-left mb-8 space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-[#0067B1] dark:text-[#00C9E4]">Reach Out</span>
                <h2 className="text-4xl font-extrabold tracking-tight text-[#0F172A] dark:text-white">
                  Contact Information
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                  Connect with us through any of our channels below. Our team is ready to respond.
                </p>
              </div>

              {/* 1. Visit Us */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="flex items-start gap-5 p-6 rounded-2xl border border-border/50 bg-[#F8FAFC]/40 dark:bg-slate-900/30 backdrop-blur-md shadow-xs hover:shadow-xl hover:shadow-cyan-500/5 transition-all duration-300 hover:border-[#00C9E4]/30 group"
              >
                <div className="p-3 bg-gradient-to-br from-[#00C9E4]/10 to-[#0067B1]/10 text-[#0067B1] dark:text-[#00C9E4] rounded-xl group-hover:scale-110 transition-transform duration-300 border border-[#00C9E4]/20">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h4 className="font-extrabold text-slate-400 dark:text-slate-500 mb-1 text-xs tracking-wider uppercase">Visit Us</h4>
                  <p className="text-base text-slate-900 dark:text-slate-100 font-extrabold">UpCheck Team</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Chennai, Tamil Nadu, India</p>
                </div>
              </motion.div>

              {/* 2. Email Us */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="flex items-start gap-5 p-6 rounded-2xl border border-border/50 bg-[#F8FAFC]/40 dark:bg-slate-900/30 backdrop-blur-md shadow-xs hover:shadow-xl hover:shadow-cyan-500/5 transition-all duration-300 hover:border-[#00C9E4]/30 group"
              >
                <div className="p-3 bg-gradient-to-br from-[#00C9E4]/10 to-[#0067B1]/10 text-[#0067B1] dark:text-[#00C9E4] rounded-xl group-hover:scale-110 transition-transform duration-300 border border-[#00C9E4]/20">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h4 className="font-extrabold text-slate-400 dark:text-slate-500 mb-1 text-xs tracking-wider uppercase">Email Us</h4>
                  <a 
                    href="mailto:support@upcheck.in" 
                    className="text-base text-[#0067B1] dark:text-[#00C9E4] font-extrabold hover:underline"
                  >
                    support@upcheck.in
                  </a>
                </div>
              </motion.div>

              {/* 3. Working Hours */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="flex items-start gap-5 p-6 rounded-2xl border border-border/50 bg-[#F8FAFC]/40 dark:bg-slate-900/30 backdrop-blur-md shadow-xs hover:shadow-xl hover:shadow-cyan-500/5 transition-all duration-300 hover:border-[#00C9E4]/30 group"
              >
                <div className="p-3 bg-gradient-to-br from-[#00C9E4]/10 to-[#0067B1]/10 text-[#0067B1] dark:text-[#00C9E4] rounded-xl group-hover:scale-110 transition-transform duration-300 border border-[#00C9E4]/20">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h4 className="font-extrabold text-slate-400 dark:text-slate-500 mb-1 text-xs tracking-wider uppercase">Working Hours</h4>
                  <p className="text-base text-slate-900 dark:text-slate-100 font-extrabold">Monday – Friday</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold">9:00 AM – 6:00 PM IST</p>
                </div>
              </motion.div>
            </div>

            {/* Right Side: Contact Form Card */}
            <div className="lg:col-span-7">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white/60 dark:bg-slate-950/40 backdrop-blur-lg p-8 md:p-10 rounded-3xl border border-border/50 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#00C9E4] to-[#0067B1]" />
                
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.div
                      key="form-container"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                    >
                      <div className="text-left mb-6 space-y-1">
                        <h3 className="text-3xl font-black text-slate-900 dark:text-white">
                          Send Us a Message
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                          Fill out the form below and our team will get back to you shortly.
                        </p>
                      </div>

                      <form onSubmit={handleFormSubmit} className="space-y-6">
                        
                        {/* Name Field */}
                        <div className="space-y-1.5 text-left">
                          <label htmlFor="contact-name" className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <div className="relative group/input">
                            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-[#00C9E4] transition-colors duration-200">
                              <User className="w-4 h-4" />
                            </div>
                            <Input
                              id="contact-name"
                              name="name"
                              required
                              placeholder="e.g. Anand Kumar"
                              value={formData.name}
                              onChange={handleInputChange}
                              className="pl-11 bg-slate-50/40 dark:bg-slate-900/30 border-border/70 focus-visible:ring-cyan-500/20 focus-visible:border-cyan-500 h-11 text-sm text-slate-900 dark:text-white transition-all duration-200"
                            />
                          </div>
                        </div>

                        {/* Email Field */}
                        <div className="space-y-1.5 text-left">
                          <label htmlFor="contact-email" className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <div className="relative group/input">
                            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-[#00C9E4] transition-colors duration-200">
                              <Mail className="w-4 h-4" />
                            </div>
                            <Input
                              id="contact-email"
                              name="email"
                              required
                              type="email"
                              placeholder="e.g. anand@aquafarm.com"
                              value={formData.email}
                              onChange={handleInputChange}
                              className="pl-11 bg-slate-50/40 dark:bg-slate-900/30 border-border/70 focus-visible:ring-cyan-500/20 focus-visible:border-cyan-500 h-11 text-sm text-slate-900 dark:text-white transition-all duration-200"
                            />
                          </div>
                        </div>

                        {/* Organization / Farm Name */}
                        <div className="space-y-1.5 text-left">
                          <label htmlFor="contact-org" className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                            Organization / Farm Name (Optional)
                          </label>
                          <div className="relative group/input">
                            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-[#00C9E4] transition-colors duration-200">
                              <Building2 className="w-4 h-4" />
                            </div>
                            <Input
                              id="contact-org"
                              name="orgName"
                              placeholder="e.g. Anand Aquaculture Farms"
                              value={formData.orgName}
                              onChange={handleInputChange}
                              className="pl-11 bg-slate-50/40 dark:bg-slate-900/30 border-border/70 focus-visible:ring-cyan-500/20 focus-visible:border-cyan-500 h-11 text-sm text-slate-900 dark:text-white transition-all duration-200"
                            />
                          </div>
                        </div>

                        {/* Subject Select Dropdown */}
                        <div className="space-y-1.5 text-left">
                          <label htmlFor="contact-subject" className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                            Subject <span className="text-red-500">*</span>
                          </label>
                          <div className="relative group/input">
                            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-[#00C9E4] transition-colors duration-200">
                              <Info className="w-4 h-4" />
                            </div>
                            <select
                              id="contact-subject"
                              name="subject"
                              required
                              value={formData.subject}
                              onChange={handleInputChange}
                              className="pl-11 pr-10 w-full rounded-md border border-border/70 bg-slate-50/40 dark:bg-slate-900/30 h-11 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all duration-200 appearance-none cursor-pointer"
                            >
                              <option value="General Inquiry">General Inquiry</option>
                              <option value="Technical Support">Technical Support</option>
                              <option value="Schedule a Demo">Schedule a Demo</option>
                              <option value="Partnership / Collaboration">Partnership / Collaboration</option>
                              <option value="Feedback">Feedback</option>
                            </select>
                            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>
                        </div>

                        {/* Message Textarea */}
                        <div className="space-y-1.5 text-left">
                          <label htmlFor="contact-message" className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                            Message <span className="text-red-500">*</span>
                          </label>
                          <textarea
                            id="contact-message"
                            name="message"
                            required
                            placeholder="Type your message here..."
                            value={formData.message}
                            onChange={handleInputChange}
                            className="w-full rounded-md border border-border/70 bg-slate-50/40 dark:bg-slate-900/30 p-3 h-32 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all duration-200 resize-none placeholder:text-muted-foreground"
                          />
                        </div>

                        {/* Honeypot — hidden from people, irresistible to bots */}
                        <input
                          {...honeypotFieldProps}
                          checked={honeypot}
                          onChange={(e) => setHoneypot(e.target.checked)}
                        />

                        {/* Submission error */}
                        {submitError && (
                          <p
                            role="alert"
                            className="rounded-xl border border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/40 px-4 py-3 text-sm font-semibold text-red-700 dark:text-red-300"
                          >
                            {submitError}
                          </p>
                        )}

                        {/* Submit Button */}
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full h-12 text-white font-bold text-sm uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] duration-300 flex items-center justify-center gap-2 border-none"
                          style={{
                            background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)"
                          }}
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4 text-white animate-bounce" />
                              Send Message
                            </>
                          )}
                        </Button>

                      </form>
                    </motion.div>
                  ) : (
                    /* Success State Card */
                    <motion.div
                      key="success-container"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      className="text-center py-12 space-y-6"
                    >
                      <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto text-green-600">
                        <CheckCircle2 className="w-12 h-12" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-extrabold text-2xl text-slate-900 dark:text-white">Message Sent!</h3>
                        <p className="text-sm text-[#475569] dark:text-[#94A3B8] max-w-sm mx-auto font-medium">
                          Thank you for reaching out, <strong>{formData.name}</strong>. Our team will review your message regarding <strong>{formData.subject}</strong> and respond to <strong>{formData.email}</strong> shortly.
                        </p>
                      </div>
                      <Button
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({
                            name: "",
                            email: "",
                            orgName: "",
                            subject: "General Inquiry",
                            message: ""
                          });
                        }}
                        className="bg-[#0067B1] hover:bg-cyan-700 text-white font-bold px-6 h-11 rounded-lg"
                      >
                        Send Another Message
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
