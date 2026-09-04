import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, 
  CheckCircle2, 
  Smartphone, 
  ShieldCheck, 
  Sparkles, 
  Bell 
} from "lucide-react";
import { FaGooglePlay, FaAndroid } from "react-icons/fa";
import { IS_APP_LAUNCHED, APP_CONFIG } from "@/config/app-status";

const appScreenImg = "/attached_assets/upcheck-farm-app.jpg";
const logoUrl = "/attached_assets/upcheck-logo.png";

export default function DownloadPage() {
  // Boolean flag controlling whether the app is launched (true) or coming soon (false)
  // Default is initialized from the centralized config IS_APP_LAUNCHED
  const [isLaunched, setIsLaunched] = useState<boolean>(IS_APP_LAUNCHED);
  
  // State for pre-registration form (Case 2)
  const [contactInput, setContactInput] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handlePreRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactInput.trim()) return;
    setIsSubmitted(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="h-screen w-screen max-h-screen overflow-hidden bg-gradient-to-br from-[#00C9E4] via-[#0077B6] to-[#023E8A] text-white flex flex-col justify-between relative selection:bg-white/20 selection:text-white">
      
      {/* Ambient Lighting & Caustic Water Highlights */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.22),_transparent_60%)] opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff18_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-75" />
        
        <div className="absolute -bottom-[20%] left-[20%] w-[50vw] h-[50vw] max-w-[600px] rounded-full bg-cyan-300/20 blur-[130px]" />
      </div>

      {/* Top Header Bar */}
      <header className="relative z-30 w-full px-6 py-2 md:py-2.5 md:px-12 border-b border-white/20 bg-slate-950/20 backdrop-blur-md flex items-center justify-between shrink-0 shadow-sm">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 group cursor-pointer">
            <img 
              src={logoUrl} 
              alt="Upcheck" 
              className="h-14 md:h-16 w-auto drop-shadow-md group-hover:scale-105 transition-transform brightness-110" 
            />
          </Link>
          <div className="h-6 w-px bg-white/30 hidden sm:block" />
          <Link href="/" className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-white/85 hover:text-white transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>

        {/* Boolean Flag Switcher */}
        <div className="flex items-center">
          <div className="inline-flex p-1 rounded-full bg-black/20 border border-white/25 backdrop-blur-md shadow-inner text-xs font-semibold">
            <button
              type="button"
              onClick={() => { setIsLaunched(true); setIsSubmitted(false); }}
              className={`px-4 py-1.5 rounded-full transition-all duration-300 ${
                isLaunched 
                  ? "bg-white text-slate-900 shadow-md font-bold" 
                  : "text-white/70 hover:text-white"
              }`}
            >
              Available
            </button>
            <button
              type="button"
              onClick={() => { setIsLaunched(false); }}
              className={`px-4 py-1.5 rounded-full transition-all duration-300 ${
                !isLaunched 
                  ? "bg-gradient-to-r from-amber-400 to-orange-400 text-slate-950 shadow-md font-bold" 
                  : "text-white/70 hover:text-white"
              }`}
            >
              Coming Soon
            </button>
          </div>
        </div>
      </header>

      {/* Main Fit-to-Screen Content Layout */}
      <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-6 md:px-12 py-2 md:py-4 flex items-center justify-between gap-8 lg:gap-14 min-h-0">
        
        {/* LEFT COLUMN: Dynamic Content (Case 1: Available on Play Store vs Case 2: Coming Soon) */}
        <div className="w-full lg:w-[54%] flex flex-col justify-center space-y-4 text-left z-20">
          
          <AnimatePresence mode="wait">
            {isLaunched ? (
              /* ========================================================================= */
              /* CASE 1: App is Launched & Available in Google Play Store (Boolean = true) */
              /* ========================================================================= */
              <motion.div
                key="state-launched"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="space-y-6 md:space-y-7"
              >
                {/* Primary Heading */}
                <div className="space-y-3">
                  <h1 className="text-4xl sm:text-5xl lg:text-[52px] xl:text-[58px] font-black tracking-tight leading-[1.08] text-white drop-shadow-sm">
                    Smart Shrimp Farming <br className="hidden sm:inline" />
                    <span className="text-cyan-200">
                      In Your Pocket
                    </span>
                  </h1>
                  <p className="text-base sm:text-lg text-white/95 leading-relaxed font-medium max-w-2xl drop-shadow-xs">
                    Connect directly to your floating pond sensors. Get instant low pH & DO alerts, track molting windows, and calculate feeding amounts in real time.
                  </p>
                </div>

                {/* Main Download Actions */}
                <div className="pt-1 flex flex-wrap items-center gap-4">
                  {/* Official Google Play Store Button */}
                  <a
                    href={APP_CONFIG.playStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3.5 px-7 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 shadow-2xl shadow-black/30 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 group border border-white"
                    data-testid="btn-playstore-download"
                  >
                    <FaGooglePlay className="w-7 h-7 text-[#00875A] group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                      <div className="text-[10px] uppercase tracking-wider font-bold text-slate-500 leading-none mb-0.5">
                        GET IT ON
                      </div>
                      <div className="text-base sm:text-lg font-black text-slate-950 leading-tight">
                        Google Play
                      </div>
                    </div>
                  </a>
                </div>

                {/* Instant QR Code + Metadata Bar */}
                <div className="p-4 sm:p-5 md:p-6 rounded-3xl bg-white/20 hover:bg-white/25 border border-white/30 backdrop-blur-md flex items-center justify-between gap-5 max-w-2xl shadow-xl text-white transition-all">
                  {/* Mini QR Container */}
                  <a 
                    href={APP_CONFIG.playStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group cursor-pointer"
                  >
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-2xl p-1.5 border border-white/40 flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform overflow-hidden">
                      {/* Fully scannable QR code linking to Play Store */}
                      <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&margin=1&data=${encodeURIComponent(APP_CONFIG.playStoreUrl)}`}
                        alt="QR Code to open in Google Play Store"
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                    <div className="text-left">
                      <div className="text-sm sm:text-base md:text-lg font-black group-hover:text-cyan-200 transition-colors">
                        <span>Scan to Download from Play Store</span>
                      </div>
                      <p className="text-xs sm:text-sm text-white/85 font-medium leading-normal mt-1 max-w-md">
                        Point your camera to open the listing directly on Google Play
                      </p>
                    </div>
                  </a>

                  {/* App Version */}
                  <div className="text-right border-l border-white/25 pl-4 sm:pl-5 shrink-0">
                    <span className="text-xs sm:text-sm text-white/90 font-bold">
                      {APP_CONFIG.version}
                    </span>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* ========================================================================= */
              /* CASE 2: App is Coming Soon / Pre-registration Phase (Boolean = false)     */
              /* ========================================================================= */
              <motion.div
                key="state-coming-soon"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="space-y-4"
              >
                {/* Primary Heading */}
                <div className="space-y-1.5">
                  <h1 className="text-2.5xl sm:text-3xl lg:text-[42px] font-black tracking-tight leading-[1.12] text-white drop-shadow-sm">
                    Next-Gen Shrimp Farming <br className="hidden sm:inline" />
                    <span className="text-amber-300">
                      Coming Very Soon
                    </span>
                  </h1>
                  <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-medium max-w-xl">
                    We're finalizing our Android app with aquaculture farms across India. Pre-register now to get exclusive beta access and 3 months of free monitoring!
                  </p>
                </div>

                {/* Pre-Registration Waitlist Form */}
                <div className="p-4 rounded-2xl bg-white/15 border border-white/25 backdrop-blur-md max-w-xl shadow-md text-white">
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-3.5 text-left py-1"
                    >
                      <div className="w-10 h-10 rounded-full bg-emerald-400/20 border border-emerald-400/40 flex items-center justify-center shrink-0 text-emerald-300">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold">You're on the VIP Beta List! 🎉</h4>
                        <p className="text-[11px] text-white/85 font-medium">
                          We'll notify you via WhatsApp / SMS as soon as the Play Store link goes live.
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <form onSubmit={handlePreRegister} className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold flex items-center gap-1.5">
                          <Bell className="w-3.5 h-3.5 text-amber-300" />
                          Pre-Register for Early Access
                        </span>
                        <span className="text-[10px] font-bold text-white/80">
                          Expected: {APP_CONFIG.expectedRelease}
                        </span>
                      </div>
                      
                      <div className="flex gap-2">
                        <Input
                          type="text"
                          placeholder="Enter your phone or email..."
                          value={contactInput}
                          onChange={(e) => setContactInput(e.target.value)}
                          required
                          className="text-xs h-10 rounded-xl bg-white/20 border-white/30 text-white placeholder:text-white/60 focus-visible:ring-cyan-300"
                        />
                        <Button
                          type="submit"
                          className="h-10 px-5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-slate-950 text-xs font-bold shrink-0 shadow-md shadow-black/20"
                        >
                          Notify Me
                        </Button>
                      </div>
                    </form>
                  )}
                </div>

                {/* Beta Benefits List */}
                <div className="grid grid-cols-2 gap-2.5 max-w-xl pt-0.5">
                  <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md text-left text-white shadow-2xs">
                    <div className="p-1.5 rounded-lg bg-amber-400/20 text-amber-300 shrink-0 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold">3 Months Free IoT Sync</h4>
                      <p className="text-[10px] text-white/80 font-medium">Exclusive early adopter reward.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md text-left text-white shadow-2xs">
                    <div className="p-1.5 rounded-lg bg-cyan-400/20 text-cyan-300 shrink-0 mt-0.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold">Direct Engineer Access</h4>
                      <p className="text-[10px] text-white/80 font-medium">1-on-1 assistance with farm setup.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT COLUMN: Smartphone Mockup */}
        <div className="w-full lg:w-[46%] flex items-center justify-center relative min-h-0 h-full py-1">
          
          {/* Ambient Glow behind Phone */}
          <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-cyan-300/25 blur-[90px] pointer-events-none" />

          {/* Smartphone Frame Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative h-[440px] sm:h-[480px] lg:h-[510px] xl:h-[530px] aspect-[9/19] rounded-[42px] bg-slate-900 p-2.5 shadow-2xl border-[4px] border-slate-700 ring-1 ring-white/20 flex flex-col justify-between overflow-hidden group"
            style={{
              boxShadow: "0 25px 60px -12px rgba(0, 0, 0, 0.5), 0 0 35px rgba(0, 201, 228, 0.4)",
            }}
          >
            {/* Phone Screen Outer Bezel & Glare */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none z-20 rounded-[38px]" />

            {/* Camera Punch-hole Notch */}
            <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-16 h-3.5 bg-black/95 rounded-full z-30 flex items-center justify-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-slate-900 border border-slate-800" />
              <div className="w-1 h-1 rounded-full bg-blue-900/80" />
            </div>

            {/* Inner Screen Displaying User's Uploaded Image */}
            <div className="relative w-full h-full rounded-[32px] overflow-hidden bg-white shadow-inner flex flex-col">
              <img
                src={appScreenImg}
                alt="Upcheck Farm App Interface"
                className="w-full h-full object-cover object-top select-none pointer-events-none group-hover:scale-[1.02] transition-transform duration-500"
              />
            </div>

            {/* Bottom Home Indicator Bar */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/40 rounded-full z-30" />
          </motion.div>
        </div>

      </main>

      {/* Slim Footer Row */}
      <footer className="relative z-20 w-full px-6 py-2.5 md:px-12 border-t border-white/20 bg-slate-950/20 backdrop-blur-sm flex items-center justify-between text-[11px] text-white/80 shrink-0 font-medium">
        <div className="flex items-center gap-3">
          <span>© 2026 UpCheck Technologies</span>
          <span className="hidden sm:inline text-white/30">•</span>
          <span className="hidden sm:inline">Aquaculture IoT & Farm Intelligence</span>
        </div>
        
        <div className="flex items-center gap-4">
          <Link href="/products" className="hover:text-white transition-colors">
            Products
          </Link>
          <Link href="/contact" className="hover:text-white transition-colors">
            Support
          </Link>
          <button 
            type="button" 
            onClick={handleCopyLink}
            className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
          >
            {copiedLink ? <span className="text-cyan-200 font-bold">Copied!</span> : <span>Share Link</span>}
          </button>
        </div>
      </footer>

    </div>
  );
}
