import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Activity, Brain, Utensils, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Activity,
    num: "01",
    tagline: "MONITORING",
    title: "Pond Parameters Tracking",
    description: "Track water quality parameters 24/7 with IoT sensors. Get instant alerts on dissolved oxygen, pH, temperature, and chlorophyll-a levels.",
  },
  {
    icon: Brain,
    num: "02",
    tagline: "AI ANALYTICS",
    title: "Disease Prediction Models",
    description: "AI-powered early warning system detects disease patterns before visible symptoms appear, preventing outbreaks and saving crops.",
  },
  {
    icon: Utensils,
    num: "03",
    tagline: "OPTIMIZATION",
    title: "Smart Feed Management",
    description: "Optimize feed usage with intelligent recommendations based on growth patterns, reducing waste by up to 30% while maximizing yield.",
  },
  {
    icon: Users,
    num: "04",
    tagline: "NETWORK",
    title: "Farmer Community Hub",
    description: "Connect with fellow farmers, share insights, and learn best practices from a thriving community of aquaculture professionals.",
  },
];

function CardWrapper({ item, index, isInView }: { item: typeof features[0]; index: number; isInView: boolean }) {
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
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1] // premium easeOutQuint
      }}
      whileHover={{
        scale: 1.02,
        y: -6,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className="h-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative overflow-hidden rounded-2xl border border-border/40 bg-[#0c1424]/40 backdrop-blur-md p-8 h-full transition-all duration-300 hover:border-primary/50 flex flex-col justify-between"
      >
        {/* Glow effect */}
        {isHovered && (
          <div
            className="pointer-events-none absolute -inset-px transition-opacity duration-300"
            style={{
              background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, rgba(0, 201, 228, 0.15), transparent 80%)`
            }}
          />
        )}

        <div className="relative z-10">
          {/* Card Header with index number */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-xs font-bold tracking-[0.2em] text-[#00C9E4]">
              {item.num} / {item.tagline}
            </span>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#00C9E4]/10">
              <item.icon className="w-5 h-5 text-[#00C9E4]" />
            </div>
          </div>

          {/* Large Title */}
          <h3 className="text-2xl font-bold mb-4 tracking-tight text-white group-hover:text-primary transition-colors">
            {item.title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Dynamic ambient background light inside the card */}
        <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-tr from-[#00C9E4]/5 to-[#0067B1]/5 rounded-full blur-xl pointer-events-none" />
      </div>
    </motion.div>
  );
}

export default function PredictiveIntelligence() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-24 px-6 bg-gradient-to-b from-background to-[#050b14] relative overflow-hidden">
      {/* Decorative background gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00C9E4]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-20"
        >
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
            style={{
              background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}
          >
            Predictive Intelligence at Work
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
            Empower your organization with UpCheck's outcome-oriented analytics. Explore how we reduce uncertainty and drive yield across diverse aquaculture environments.
          </p>
        </motion.div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <CardWrapper key={feature.title} item={feature} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
