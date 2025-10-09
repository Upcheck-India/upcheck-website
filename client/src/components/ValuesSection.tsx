import { motion, useInView } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Sprout, Zap, DollarSign } from "lucide-react";
import { useRef } from "react";

const values = [
  {
    icon: Sprout,
    title: "Sustainability",
    description: "We promote sustainable practices to ensure long-term environmental benefits.",
    color: "text-green-500"
  },
  {
    icon: Zap,
    title: "Empowerment",
    description: "We empower farmers with actionable data and tools for better decision-making.",
    color: "text-amber-500"
  },
  {
    icon: DollarSign,
    title: "Affordability",
    description: "We offer solutions that are accessible and affordable for all farmers.",
    color: "text-orange-500"
  }
];

export default function ValuesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
  <section ref={ref} className="py-20 px-6 bg-site-gradient bg-muted/30" data-testid="section-values">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4" data-testid="text-values-title">
            The Values We Add
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto" data-testid="text-values-subtitle">
            Our core principles that drive everything we do
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              whileHover={{ scale: 1.05, y: -5 }}
              data-testid={`card-value-${i}`}
            >
              <Card className="p-8 h-full hover-elevate active-elevate-2 overflow-visible">
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="mb-6"
                >
                  <div className={`w-16 h-16 rounded-md bg-primary/10 flex items-center justify-center ${value.color}`}>
                    <value.icon className="w-8 h-8" data-testid={`icon-value-${i}`} />
                  </div>
                </motion.div>
                
                <h3 className="text-xl font-bold mb-3" data-testid={`text-value-title-${i}`}>
                  {value.title}
                </h3>
                <p className="text-muted-foreground" data-testid={`text-value-desc-${i}`}>
                  {value.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
