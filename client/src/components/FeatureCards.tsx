import { motion, useInView } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Activity, Brain, Utensils, Users } from "lucide-react";
import { useRef, useState } from "react";

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

function FeatureCard({ feature, index, isInView }: { feature: typeof features[0]; index: number; isInView: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - left,
      y: e.clientY - top,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.2,
        ease: "easeOut" 
      }}
      whileHover={{ 
        scale: 1.03,
        y: -5,
        transition: { duration: 0.2 }
      }}
      data-testid={`card-feature-${index}`}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative overflow-hidden rounded-xl border border-border/50 bg-card p-6 h-full transition-all duration-300 hover:border-primary/50"
      >
        {/* Cursor Glow effect */}
        {isHovered && (
          <div
            className="pointer-events-none absolute -inset-px transition-opacity duration-300"
            style={{
              background: `radial-gradient(300px circle at ${coords.x}px ${coords.y}px, rgba(0, 201, 228, 0.15), transparent 80%)`
            }}
          />
        )}

        <motion.div
          animate={{ 
            y: [0, -6, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mb-4 relative z-10"
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
          className="text-xl font-bold mb-3 relative z-10" 
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
        <p className="text-muted-foreground relative z-10" data-testid={`text-feature-desc-${index}`}>
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
}

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
            <FeatureCard key={feature.title} feature={feature} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
