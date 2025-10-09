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
  className="py-20 px-6 bg-site-gradient bg-gradient-to-r from-[hsl(194,100%,43%)] to-[hsl(197,100%,36%)] text-white" 
      data-testid="section-app-download"
    >
      <div className="container mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4" data-testid="text-app-download-title">
            Download the UpCheck App
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto" data-testid="text-app-download-subtitle">
            Experience the future of shrimp farming. Our app is currently in development, but stay tuned!
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 gap-2"
                data-testid="button-download-android"
              >
                <SiAndroid className="w-5 h-5" />
                Download for Android
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 gap-2"
                data-testid="button-download-ios"
              >
                <SiApple className="w-5 h-5" />
                Download for iOS
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
