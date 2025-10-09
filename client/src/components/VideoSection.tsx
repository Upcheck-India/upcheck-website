import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function VideoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
  <section ref={ref} className="py-20 px-6 bg-site-gradient bg-background" data-testid="section-video">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 
            className="text-3xl md:text-5xl font-bold mb-4"
            style={{ 
              background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}
            data-testid="text-video-title"
          >
            See Upcheck in Action
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto" data-testid="text-video-subtitle">
            Watch how Upcheck is revolutionizing shrimp farming through smart technology and data-driven insights.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative aspect-video w-full max-w-5xl mx-auto rounded-xl overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#00C9E4]/10 to-[#0067B1]/10" />
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/sxu62fm_Z5E"
            title="Upcheck - Reinventing Shrimp Aquaculture"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="relative z-10"
          />
        </motion.div>
      </div>
    </section>
  );
}