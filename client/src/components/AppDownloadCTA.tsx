import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { SiAndroid, SiApple } from "react-icons/si";
import { useRef } from "react";

export default function AppDownloadCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section 
      ref={ref} 
      className="relative py-20 px-6 bg-site-gradient bg-gradient-to-r from-[hsl(194,100%,43%)] to-[hsl(197,100%,36%)] text-white overflow-hidden" 
      data-testid="section-app-download"
    >
      {/* Subtle dark overlay for premium readability of white text */}
      <div className="absolute inset-0 bg-slate-900/35 z-0 pointer-events-none" />

      <div className="container mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 
            className="text-3xl md:text-5xl font-bold mb-4 text-white" 
            style={{ textShadow: "0 2px 4px rgba(0,0,0,0.15)" }}
            data-testid="text-app-download-title"
          >
            Download the UpCheck App
          </h2>
          <p 
            className="text-lg mb-8 opacity-100 max-w-2xl mx-auto text-white" 
            style={{ textShadow: "0 1px 2px rgba(0,0,0,0.15)" }}
            data-testid="text-app-download-subtitle"
          >
            Experience the future of shrimp farming. Our app is currently in development, but stay tuned!
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a href="/download">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 gap-2 cursor-pointer"
                  data-testid="button-download-android"
                >
                  <SiAndroid className="w-5 h-5" />
                  Download for Android
                </Button>
              </a>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a href="/download">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 gap-2 cursor-pointer"
                  data-testid="button-download-ios"
                >
                  <SiApple className="w-5 h-5" />
                  Download for iOS
                </Button>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
