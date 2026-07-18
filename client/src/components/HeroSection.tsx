import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, PlayCircle } from "lucide-react";
// Logo path used directly: /attached_assets/upcheck-logo.png

export default function HeroSection() {
  return (
  <section className="dark text-foreground relative min-h-[80vh] md:min-h-[95vh] py-28 flex items-center justify-center overflow-hidden bg-site-gradient bg-background">
      {/* Background Video */}
      <video
        src="/attached_assets/herovideo.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      />

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
            <Button 
              size="lg" 
              className="gap-2 relative overflow-hidden"
              data-testid="button-download-app"
              style={{
                background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)",
                border: "none"
              }}
            >
              <Download className="w-5 h-5" />
              Download App
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <Button 
              size="lg" 
              variant="outline"
              className="gap-2 backdrop-blur-sm"
              data-testid="button-watch-demo"
            >
              <PlayCircle className="w-5 h-5" />
              Watch Demo
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
