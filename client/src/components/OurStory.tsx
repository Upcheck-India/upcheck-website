import { motion, useInView } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useRef } from "react";

export default function OurStory() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
  <section ref={ref} className="py-20 px-6 bg-site-gradient bg-background" data-testid="section-our-story">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6" data-testid="text-story-title">
            Our Story
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="p-8 md:p-12" data-testid="card-story">
            <div className="space-y-6 text-muted-foreground leading-relaxed">
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
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
