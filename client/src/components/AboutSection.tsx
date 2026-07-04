import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import farmImage from "@assets/shrimpfarm.png";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
  <section ref={ref} className="py-20 px-6 bg-site-gradient bg-muted/30" data-testid="section-about">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              className="text-3xl md:text-5xl font-bold mb-4"
              style={{
                background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}
              data-testid="text-about-title"
            >
              About UpCheck
            </motion.h2>

            <h3
              className="text-2xl font-bold mb-6"
              style={{
                background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}
              data-testid="text-mission-title"
            >
              Our Mission & Vision
            </h3>
            
            <p className="text-muted-foreground leading-relaxed" data-testid="text-mission-desc">
              UpCheck is dedicated to transforming shrimp farming through innovative solutions that empower farmers. 
              We enable sustainable aquaculture, higher yields, and reduced environmental impact by providing real-time data, 
              optimized farming practices, and market connectivity. Our mission is to revolutionize shrimp farming by fostering 
              smarter practices, improving pond conditions, and supporting farmers in building a sustainable and prosperous 
              aquaculture ecosystem.
            </p>
            {/* CTAs removed as requested */}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-lg overflow-hidden"
            >
              {/* Aerial pond image for shrimp farm */}
              <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 via-muted to-[hsl(197,100%,36%)]/20 flex items-center justify-center" data-testid="img-about-pond">
                <img
                  src={farmImage}
                  alt="Aerial view of shrimp farm with monitoring sensors"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Animated overlay grid effect */}
              <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 opacity-30">
                {Array.from({ length: 48 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="border border-primary/20"
                    whileHover={{ backgroundColor: "hsl(194 100% 43% / 0.2)" }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
