import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import CountUp from "react-countup";

const stats = [
  { label: "Farms Monitored", value: 1250, suffix: "+" },
  { label: "Diseases Prevented", value: 98, suffix: "%" },
  { label: "Feed Waste Reduced", value: 35, suffix: "%" },
];

export default function StatisticsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
  <section ref={ref} className="py-20 px-6 bg-site-gradient bg-background" data-testid="section-statistics">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4" data-testid="text-stats-title">
            Trusted by Farmers Worldwide
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto" data-testid="text-stats-subtitle">
            Join thousands of aquaculture professionals revolutionizing their operations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              className="text-center"
              data-testid={`stat-item-${i}`}
            >
              <motion.div
                className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-[hsl(197,100%,36%)] bg-clip-text text-transparent mb-3"
                data-testid={`text-stat-value-${i}`}
              >
                {isInView && (
                  <CountUp
                    end={stat.value}
                    duration={2.5}
                    delay={i * 0.2}
                    suffix={stat.suffix}
                  />
                )}
              </motion.div>
              <p className="text-lg text-muted-foreground" data-testid={`text-stat-label-${i}`}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
