import { motion, useInView } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Activity, Brain, Utensils, Users } from "lucide-react";
import { useRef } from "react";

const features = [
  {
    icon: Activity,
    title: "Real-time Monitoring",
    description: "Track water quality parameters 24/7 with IoT sensors. Get instant alerts on dissolved oxygen, pH, temperature, and chlorophyll-a levels.",
  },
  {
    icon: Brain,
    title: "Disease Prediction",
    description: "AI-powered early warning system detects disease patterns before visible symptoms appear, preventing outbreaks and saving crops.",
  },
  {
    icon: Utensils,
    title: "Smart Feeding",
    description: "Optimize feed usage with intelligent recommendations based on growth patterns, reducing waste by up to 30% while maximizing yield.",
  },
  {
    icon: Users,
    title: "Farmer Network",
    description: "Connect with fellow farmers, share insights, and learn best practices from a thriving community of aquaculture professionals.",
  },
];

export default function FeatureCards() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
  <section ref={ref} className="py-20 px-6 bg-site-gradient bg-background" data-testid="section-features">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 
            className="text-3xl md:text-5xl font-bold mb-4" 
            style={{ 
              background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }} 
            data-testid="text-features-title"
          >
            Powerful Features
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto" data-testid="text-features-subtitle">
            Everything you need to revolutionize your aquaculture operations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.2,
                ease: "easeOut" 
              }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              data-testid={`card-feature-${index}`}
            >
              <Card className="p-6 h-full hover-elevate active-elevate-2 overflow-visible">
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="mb-4"
                >
                  <div className="w-14 h-14 rounded-md flex items-center justify-center"
                    style={{ background: "rgba(0, 201, 228, 0.1)" }}
                  >
                    <feature.icon 
                      className="w-7 h-7" 
                      style={{ color: "#00C9E4" }}
                      data-testid={`icon-feature-${index}`} 
                    />
                  </div>
                </motion.div>
                
                <h3 
                  className="text-xl font-bold mb-3" 
                  style={{ 
                    background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  }}
                  data-testid={`text-feature-title-${index}`}
                >
                  {feature.title}
                </h3>
                <p className="text-muted-foreground" data-testid={`text-feature-desc-${index}`}>
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
