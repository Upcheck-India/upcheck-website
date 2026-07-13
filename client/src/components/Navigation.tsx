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
import { useState } from "react";
import logoUrl from "@assets/upcheck-logo.png";

export default function Navigation() {
  const { scrollY } = useScroll();
  const exploreHover = useHover();
  const participateHover = useHover();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["hsla(var(--background), 0)", "hsla(var(--background), 0.8)"]
  );
  
  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ["blur(0px)", "blur(12px)"]
  );

  const logoScale = useTransform(scrollY, [0, 100], [1, 0.8]);
  const headerPadding = useTransform(scrollY, [0, 100], ["1.5rem", "1rem"]);

  return (
    <motion.header
      style={{
        backgroundColor,
        backdropFilter: backdropBlur,
        WebkitBackdropFilter: backdropBlur,
        paddingTop: headerPadding,
        paddingBottom: headerPadding,
      }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/50"
      data-testid="header-navigation"
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <motion.div style={{ scale: logoScale }} className="flex items-center gap-3">
          <img src={logoUrl} alt="Upcheck" className="h-16 w-auto" data-testid="img-nav-logo" />
        </motion.div>

        <nav className="hidden md:flex items-center gap-6">
          <div 
            className="relative"
            onMouseEnter={exploreHover.onMouseEnter}
            onMouseLeave={exploreHover.onMouseLeave}
          >
            <DropdownMenu open={exploreHover.isOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1 px-3 py-2">
                  Explore
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-48 dropdown-content bg-background border border-border/50"
                style={{ backgroundColor: "white" }}
                onMouseEnter={exploreHover.onMouseEnter}
                onMouseLeave={exploreHover.onMouseLeave}
              >
                <DropdownMenuItem>
                  <a href="/about" className="w-full">About</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="/resources" className="w-full">Resources</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="/products" className="w-full">Products</a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div 
            className="relative"
            onMouseEnter={participateHover.onMouseEnter}
            onMouseLeave={participateHover.onMouseLeave}
          >
            <DropdownMenu open={participateHover.isOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1 px-3 py-2">
                  Participate
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-48 dropdown-content bg-background border border-border/50"
                style={{ backgroundColor: "white" }}
                onMouseEnter={participateHover.onMouseEnter}
                onMouseLeave={participateHover.onMouseLeave}
              >
                <DropdownMenuItem>
                  <a href="/participate/survey" className="w-full">Surveys</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Polls
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Feedback
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Events
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <a href="#contact" className="text-sm font-medium hover-elevate px-3 py-2 rounded-md">
            Contact
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <Button 
            variant="default" 
            className="hidden md:inline-flex relative overflow-hidden" 
            data-testid="button-join"
            style={{
              background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)",
              border: "none"
            }}
          >
            Join us
          </Button>

          <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button
      variant="ghost"
      className="flex items-center gap-2 text-sm font-medium px-2 py-1"
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
      <span>English</span>
      <ChevronDown className="w-4 h-4" />
    </Button>
  </DropdownMenuTrigger>

  <DropdownMenuContent
    align="end"
    className="w-32 bg-background border border-border/50"
    style={{ backgroundColor: "white" }}
  >
    <DropdownMenuItem>English</DropdownMenuItem>
    <DropdownMenuItem>தமிழ்</DropdownMenuItem>
    <DropdownMenuItem>తెలుగు</DropdownMenuItem>
    <DropdownMenuItem>हिन्दी</DropdownMenuItem>
    <DropdownMenuItem>বাংলা</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>


          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
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
                      Explore
                      <ChevronRight className={`w-4 h-4 transition-transform ${mobileExpanded === 'explore' ? 'rotate-90' : ''}`} />
                    </button>
                    {mobileExpanded === 'explore' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="ml-4 flex flex-col gap-2 py-2"
                      >
                        <a href="/about" className="py-2 text-sm text-muted-foreground">About</a>
                        <a href="/resources" className="py-2 text-sm text-muted-foreground">Resources</a>
                        <a href="/products" className="py-2 text-sm text-muted-foreground">Products</a>
                      </motion.div>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <button
                      onClick={() => setMobileExpanded(mobileExpanded === 'participate' ? null : 'participate')}
                      className="flex items-center justify-between py-2 text-sm font-medium"
                    >
                      Participate
                      <ChevronRight className={`w-4 h-4 transition-transform ${mobileExpanded === 'participate' ? 'rotate-90' : ''}`} />
                    </button>
                    {mobileExpanded === 'participate' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="ml-4 flex flex-col gap-2 py-2"
                      >
                        <a href="/participate/survey" className="py-2 text-sm text-muted-foreground">Surveys</a>
                        <a href="#" className="py-2 text-sm text-muted-foreground">Polls</a>
                        <a href="#" className="py-2 text-sm text-muted-foreground">Feedback</a>
                        <a href="#" className="py-2 text-sm text-muted-foreground">Events</a>
                      </motion.div>
                    )}
                  </div>

                  <a href="#contact" className="py-2 text-sm font-medium">Contact</a>
                  
                  <Button 
                    className="mt-2"
                    style={{
                      background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)",
                      border: "none"
                    }}
                  >
                    Join us
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
