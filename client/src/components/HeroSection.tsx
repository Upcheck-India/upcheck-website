import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, PlayCircle } from "lucide-react";
// Logo path used directly: /attached_assets/upcheck-logo.png

const HERO_POSTER = "/attached_assets/hero-poster.jpg";

/**
 * Farmers on the coast are frequently on metered 4G. Load the video only when
 * it is actually wanted: after paint, not on a save-data or slow connection,
 * and never when the viewer has asked for reduced motion.
 */
function useHeroVideo() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const conn = (navigator as any).connection;
    if (conn?.saveData) return;
    if (conn?.effectiveType && /2g/.test(conn.effectiveType)) return;

    // Let the poster and the rest of the hero paint first.
    const id = window.setTimeout(() => setShow(true), 600);
    return () => window.clearTimeout(id);
  }, []);

  return show;
}

export default function HeroSection() {
  const showVideo = useHeroVideo();

  return (
  <section className="dark text-foreground relative min-h-[80vh] md:min-h-[95vh] py-28 flex items-center justify-center overflow-hidden bg-site-gradient bg-background">
      {/* Background video.
          The poster paints immediately, so the hero is never blank; the video itself
          is only fetched once the poster is up, and is skipped entirely for viewers
          who have asked for reduced motion or are on a metered/slow connection. */}
      <img
        src={HERO_POSTER}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      />
      {showVideo && (
        <video
          src="/attached_assets/hero.mp4"
          poster={HERO_POSTER}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        />
      )}

      {/* Dark Overlay (50% opacity) */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* UpCheck Blue Tint Overlay (15% opacity) */}
      <div className="absolute inset-0 bg-[#00C9E4]/15 z-10" />

      {/* White gradient bottom overlay to blend into the next white section */}
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white/30 to-transparent z-10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 text-center">
        {/* Logo Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex justify-center mb-8"
        >
          <img 
            src="/attached_assets/upcheck-logo.png" 
            alt="Upcheck Logo" 
            className="h-32 md:h-20 "
            data-testid="img-logo"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight pb-3"
          style={{ 
            background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            paddingBottom: "0.15em"
          }}
          data-testid="text-hero-headline"
        >
          Reinventing Aquaculture!
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8"
          data-testid="text-hero-subtext"
        >
          Monitor your pond parameters in real-time, predict diseases, optimize feeding, and connect with fellow farmers - all in one powerful app.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex flex-wrap gap-4 justify-center items-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.5 }}
          >
            <a href="/download">
              <Button 
                size="lg" 
                className="gap-2 relative overflow-hidden shadow-lg shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all duration-300"
                data-testid="button-download-app"
                style={{
                  background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)",
                  border: "none"
                }}
              >
                <Download className="w-5 h-5" />
                Download App
              </Button>
            </a>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <a href="/contact?subject=demo">
              <Button
                size="lg"
                variant="outline"
                className="gap-2 backdrop-blur-sm"
                data-testid="button-request-demo"
              >
                <PlayCircle className="w-5 h-5" />
                Request a Demo
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
