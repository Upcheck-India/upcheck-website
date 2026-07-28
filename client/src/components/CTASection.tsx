import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, Smartphone } from "lucide-react";
import { useRef } from "react";

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-20 px-6 bg-gradient-to-br from-primary/10 via-background to-[hsl(197,100%,36%)]/10" data-testid="section-cta">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 
              className="text-3xl md:text-5xl font-bold mb-6" 
              style={{ 
                background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}
              data-testid="text-cta-title"
            >
              Get Started Today
            </h2>
            <p className="text-lg text-muted-foreground mb-8" data-testid="text-cta-subtitle">
              Download the Upcheck app and start transforming your aquaculture operations with AI-powered insights.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="gap-2 relative overflow-hidden" 
                style={{
                  background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)",
                  border: "none"
                }}
                data-testid="button-cta-download"
              >
                <Download className="w-5 h-5" />
                Download Now
              </Button>
              <Button size="lg" variant="outline" className="gap-2" data-testid="button-cta-learn">
                <Smartphone className="w-5 h-5" />
                Learn More
              </Button>
            </div>

            {/* QR Code Pulse */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-8 inline-block"
            >
              <div className="w-32 h-32 bg-site-gradient bg-card border-2 border-primary rounded-md flex items-center justify-center" data-testid="placeholder-qr">
                <p className="text-xs text-center text-muted-foreground">QR Code<br/>Placeholder</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative mx-auto w-64 h-[500px] bg-site-gradient bg-card border-8 border-foreground/20 rounded-[3rem] overflow-hidden shadow-2xl"
              data-testid="mockup-phone"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-foreground/20 rounded-b-2xl" />
              
              {/* Screen Content */}
              <div className="p-6 pt-10">
                <motion.div
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="space-y-4"
                >
                  <div className="h-4 bg-primary/30 rounded w-3/4" />
                  <div className="h-4 bg-primary/20 rounded w-1/2" />
                  <div className="h-32 bg-gradient-to-br from-primary/20 to-[hsl(197,100%,36%)]/20 rounded-lg" />
                  <div className="space-y-2">
                    <div className="h-3 bg-muted rounded w-full" />
                    <div className="h-3 bg-muted rounded w-5/6" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
