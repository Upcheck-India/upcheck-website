import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function OurStory() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 px-6 bg-slate-50/50 relative overflow-hidden" data-testid="section-our-story">
      {/* Background radial blobs to match other sections */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-[#00C9E4]/5 to-[#0067B1]/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-bold tracking-[0.25em] text-[#0067B1] uppercase block mb-3">
            HOW IT ALL BEGAN
          </span>
          <h2 
            className="text-4xl md:text-5xl font-black mb-6 tracking-tight" 
            data-testid="text-story-title"
            style={{
              background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}
          >
            Our Story
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div 
            className="relative p-8 md:p-12 bg-gradient-to-br from-[#00C9E4] to-[#0067B1] text-white shadow-[0_24px_60px_rgba(0,103,177,0.2)] rounded-3xl overflow-hidden flex flex-col justify-center"
            data-testid="card-story"
          >
            {/* Subtle geometric line patterns inside the box */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-white/20 rounded-tl-lg pointer-events-none" />
            <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-white/20 rounded-tr-lg pointer-events-none" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-white/20 rounded-bl-lg pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-white/20 rounded-br-lg pointer-events-none" />

            <div className="relative z-10 space-y-6 text-white/95 leading-relaxed text-base md:text-lg font-medium">
              <p data-testid="text-story-para-1">
                One day, we happened to meet the father of a mutual neighborhood friend, a hardworking shrimp farmer 
                from a small town near ours. What began as casual small talk soon turned into something deeper as he 
                opened up about the struggles he faced every day.
              </p>
              
              <p data-testid="text-story-para-2">
                His words stayed with us long after the conversation ended. That evening, as we discussed what we 
                had heard, we couldn't shake off a feeling, we had to do something. Shrimp farming shouldn't be this 
                hard. Farmers like him deserved better tools, better support, and a way to make their hard work pay off.
              </p>
              
              <p data-testid="text-story-para-3">
                That's how UpCheck was born. We started with one clear goal: to help shrimp farmers like him take 
                control of their ponds and their future. From that one conversation, we've come a long way. But our 
                purpose remains the same: to bring hope, support, and change to the hardworking farmers who are the 
                backbone of aquaculture.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
