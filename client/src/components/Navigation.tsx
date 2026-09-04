import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useHover } from "@/hooks/use-hover";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useLanguage, LANGUAGES } from "@/context/LanguageContext";
const logoUrl = "/attached_assets/upcheck-logo.png";

export default function Navigation({ transparentOnDark = false }: { transparentOnDark?: boolean }) {
  const { scrollY } = useScroll();
  const { language, setLanguage, t, currentLanguageOption } = useLanguage();
  const exploreHover = useHover();
  const participateHover = useHover();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isNavDark = transparentOnDark && !isScrolled;

  const navItemClass = `flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium focus-visible:ring-0 focus-visible:outline-none focus:outline-none focus:ring-0 transition-all duration-200 ${
    isNavDark 
      ? "text-white hover:text-cyan-200 hover:bg-white/15" 
      : "text-slate-700 hover:text-[#0067B1] hover:bg-slate-100/80"
  }`;

  const contactClass = `text-sm font-medium px-3 py-1.5 rounded-xl focus-visible:ring-0 focus-visible:outline-none focus:outline-none focus:ring-0 transition-all duration-200 ${
    isNavDark 
      ? "text-white hover:text-cyan-200 hover:bg-white/15" 
      : "text-slate-700 hover:text-[#0067B1] hover:bg-slate-100/80"
  }`;

  const langClass = `flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-xl focus-visible:ring-0 focus-visible:outline-none focus:outline-none focus:ring-0 transition-all duration-200 ${
    isNavDark 
      ? "text-white hover:text-cyan-200 hover:bg-white/15" 
      : "text-slate-700 hover:text-[#0067B1] hover:bg-slate-100/80"
  }`;

  const mobileMenuButtonClass = `md:hidden p-2 rounded-xl focus-visible:ring-0 focus-visible:outline-none focus:outline-none transition-all duration-200 ${
    isNavDark 
      ? "text-white hover:text-cyan-200 hover:bg-white/15" 
      : "text-slate-700 hover:text-[#0067B1] hover:bg-slate-100/80"
  }`;
  
  const logoScale = useTransform(scrollY, [0, 80], [1, 0.85]);
  const headerPadding = useTransform(scrollY, [0, 80], ["1.25rem", "0.75rem"]);

  return (
    <motion.header
      style={{
        paddingTop: headerPadding,
        paddingBottom: headerPadding,
      }}
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ${
        isNavDark 
          ? "bg-transparent border-b border-transparent" 
          : "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-md border-b border-slate-200/90 dark:border-slate-800"
      }`}
      data-testid="header-navigation"
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <motion.div style={{ scale: logoScale }} className="flex items-center gap-3">
          <Link href="/" className="cursor-pointer flex items-center gap-3 hover:opacity-90 transition-opacity" data-testid="link-nav-logo">
            <img src={logoUrl} alt="Upcheck" className="h-16 w-auto" data-testid="img-nav-logo" />
          </Link>
        </motion.div>

        <nav className="hidden md:flex items-center gap-6">
          <div 
            className="relative"
            onMouseEnter={exploreHover.onMouseEnter}
            onMouseLeave={exploreHover.onMouseLeave}
          >
            <DropdownMenu open={exploreHover.isOpen} modal={false} onOpenChange={(open) => { if (!open) exploreHover.onMouseLeave(); }}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className={navItemClass}>
                  Explore
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-52 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl p-1.5 z-50"
                onMouseEnter={exploreHover.onMouseEnter}
                onMouseLeave={exploreHover.onMouseLeave}
              >
                <DropdownMenuItem asChild className="cursor-pointer rounded-xl px-3 py-2 text-sm font-medium text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-[#0067B1] focus:bg-slate-100 focus:text-[#0067B1] transition-colors">
                  <Link href="/about" className="w-full text-inherit">About</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer rounded-xl px-3 py-2 text-sm font-medium text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-[#0067B1] focus:bg-slate-100 focus:text-[#0067B1] transition-colors">
                  <Link href="/resources" className="w-full text-inherit">Resources</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer rounded-xl px-3 py-2 text-sm font-medium text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-[#0067B1] focus:bg-slate-100 focus:text-[#0067B1] transition-colors">
                  <Link href="/products" className="w-full text-inherit">Products</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer rounded-xl px-3 py-2 text-sm font-medium text-[#0067B1] hover:bg-cyan-50 dark:hover:bg-cyan-950/40 focus:bg-cyan-50 focus:text-[#0067B1] transition-colors">
                  <Link href="/download" className="w-full flex items-center justify-between text-inherit">
                    <span>Download App</span>
                    <span className="text-[10px] bg-[#00C9E4]/20 text-[#0067B1] px-2 py-0.5 rounded-full font-bold">New</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div 
            className="relative"
            onMouseEnter={participateHover.onMouseEnter}
            onMouseLeave={participateHover.onMouseLeave}
          >
            <DropdownMenu open={participateHover.isOpen} modal={false} onOpenChange={(open) => { if (!open) participateHover.onMouseLeave(); }}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className={navItemClass}>
                  Participate
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-52 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl p-1.5 z-50"
                onMouseEnter={participateHover.onMouseEnter}
                onMouseLeave={participateHover.onMouseLeave}
              >
                <DropdownMenuItem asChild className="cursor-pointer rounded-xl px-3 py-2 text-sm font-medium text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-[#0067B1] focus:bg-slate-100 focus:text-[#0067B1] transition-colors">
                  <Link href="/participate/survey" className="w-full text-inherit">Surveys</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer rounded-xl px-3 py-2 text-sm font-medium text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-[#0067B1] focus:bg-slate-100 focus:text-[#0067B1] transition-colors">
                  <span>Polls</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer rounded-xl px-3 py-2 text-sm font-medium text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-[#0067B1] focus:bg-slate-100 focus:text-[#0067B1] transition-colors">
                  <span>Feedback</span>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer rounded-xl px-3 py-2 text-sm font-medium text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-[#0067B1] focus:bg-slate-100 focus:text-[#0067B1] transition-colors">
                  <Link href="/participate/events" className="w-full text-inherit">Events</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Link href="/contact" className={contactClass}>
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button 
            variant="default" 
            className="hidden md:inline-flex relative overflow-hidden font-medium" 
            data-testid="button-join"
            style={{
              background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)",
              border: "none"
            }}
          >
            Join us
          </Button>

          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={langClass}
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.6 9h16.8M3.6 15h16.8"
                  />
                </svg>
                <span>{currentLanguageOption.nativeLabel}</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-40 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl p-1.5 z-50"
            >
              {LANGUAGES.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`cursor-pointer rounded-xl px-3 py-2 text-sm font-medium transition-colors flex items-center justify-between ${
                    language === lang.code
                      ? "bg-cyan-50 dark:bg-cyan-950/50 text-[#0067B1] font-bold"
                      : "text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-[#0067B1] focus:bg-slate-100"
                  }`}
                >
                  <span>{lang.nativeLabel}</span>
                  {language === lang.code && (
                    <span className="w-2 h-2 rounded-full bg-[#00C9E4]" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>


          <Button 
            variant="ghost" 
            size="icon" 
            className={mobileMenuButtonClass} 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-full left-0 right-0 bg-background border-b border-border/50 shadow-lg md:hidden"
                style={{ backgroundColor: "white" }}
              >
                <div className="container mx-auto px-6 py-4 flex flex-col gap-2">
                  <div className="flex flex-col">
                    <button
                      onClick={() => setMobileExpanded(mobileExpanded === 'explore' ? null : 'explore')}
                      className="flex items-center justify-between py-2 text-sm font-medium"
                    >
                      {t("nav.solutions", "Explore")}
                      <ChevronRight className={`w-4 h-4 transition-transform ${mobileExpanded === 'explore' ? 'rotate-90' : ''}`} />
                    </button>
                    {mobileExpanded === 'explore' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="ml-4 flex flex-col gap-2 py-2"
                      >
                        <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="py-2 text-sm text-muted-foreground">{t("nav.about", "About")}</Link>
                        <Link href="/resources" onClick={() => setMobileMenuOpen(false)} className="py-2 text-sm text-muted-foreground">{t("nav.resources", "Resources")}</Link>
                        <Link href="/products" onClick={() => setMobileMenuOpen(false)} className="py-2 text-sm text-muted-foreground">{t("nav.products", "Products")}</Link>
                        <Link href="/download" onClick={() => setMobileMenuOpen(false)} className="py-2 text-sm font-semibold text-[#0067B1] flex items-center justify-between">
                          <span>{t("nav.download", "Download App")}</span>
                          <span className="text-[10px] bg-[#00C9E4]/20 text-[#0067B1] px-1.5 py-0.5 rounded-full font-semibold">New</span>
                        </Link>
                      </motion.div>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <button
                      onClick={() => setMobileExpanded(mobileExpanded === 'participate' ? null : 'participate')}
                      className="flex items-center justify-between py-2 text-sm font-medium"
                    >
                      {t("nav.participate", "Participate")}
                      <ChevronRight className={`w-4 h-4 transition-transform ${mobileExpanded === 'participate' ? 'rotate-90' : ''}`} />
                    </button>
                    {mobileExpanded === 'participate' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="ml-4 flex flex-col gap-2 py-2"
                      >
                        <Link href="/participate/survey" onClick={() => setMobileMenuOpen(false)} className="py-2 text-sm text-muted-foreground">{t("nav.survey", "Surveys")}</Link>
                        <Link href="/participate/events" onClick={() => setMobileMenuOpen(false)} className="py-2 text-sm text-muted-foreground">{t("nav.events", "Events")}</Link>
                      </motion.div>
                    )}
                  </div>

                  <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="py-2 text-sm font-medium">{t("nav.contact", "Contact")}</Link>
                  
                  <Button 
                    className="mt-2"
                    style={{
                      background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)",
                      border: "none"
                    }}
                  >
                    {t("common.getStarted", "Join us")}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
}
