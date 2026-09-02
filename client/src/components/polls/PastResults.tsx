import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Award, TrendingUp, Droplet } from "lucide-react";

const PAST_RESULTS = [
  {
    badge: "Community Favourite",
    winningOption: "AI Disease Detection",
    percentage: 58,
    votes: "58% of farmers voted for this feature.",
    icon: Award,
  },
  {
    badge: "Most Trusted Tool",
    winningOption: "Real-time Water Quality Monitoring",
    percentage: 72,
    votes: "72% community preference.",
    icon: Droplet,
  },
  {
    badge: "Sustainable Farming Choice",
    winningOption: "Reducing Feed Waste",
    percentage: 65,
    votes: "65% of farmers support this practice.",
    icon: TrendingUp,
  },
];

export default function PastResults() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 px-6 bg-[#F7FCFF] relative border-b border-border/40">
      <div className="container mx-auto max-w-6xl">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold pb-2 mb-2 bg-gradient-to-r from-primary to-[#0067B1] bg-clip-text text-transparent leading-[1.2]" data-testid="past-results-title">
            Past Poll Highlights
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Review community decisions and trending choices from our previous weekly polls.
          </p>
        </motion.div>

        {/* Achievement Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {PAST_RESULTS.map((poll, pollIdx) => {
            const Icon = poll.icon;
            return (
              <motion.div
                key={pollIdx}
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: pollIdx * 0.15 + 0.15 }}
                className="flex w-full"
              >
                <motion.div
                  className="group flex flex-col w-full rounded-xl border border-card-border/75 bg-site-gradient shadow-md p-8 md:p-10 relative overflow-hidden cursor-pointer"
                  data-testid={`past-result-card-${pollIdx}`}
                  whileHover={{
                    y: -10,
                    scale: 1.025,
                    boxShadow: "0 20px 30px -10px rgba(0, 103, 177, 0.15), 0 10px 15px -5px rgba(0, 201, 228, 0.1)",
                    borderColor: "rgba(0, 201, 228, 0.45)",
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                >
                  {/* Hover background brightening overlay */}
                  <div className="absolute inset-0 bg-white/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0" />

                  {/* Decorative Subtle Accent Grid Element */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-[#0067B1] z-10" />

                  <CardHeader className="p-0 mb-6 relative z-10">
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                        {poll.badge}
                      </span>
                      <Icon className="w-5 h-5 text-[#00B4D8] transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                    </div>
                    <CardTitle className="text-xl md:text-2xl font-bold leading-tight text-foreground min-h-[56px]">
                      {poll.winningOption}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="p-0 space-y-6 flex-grow flex flex-col justify-end relative z-10">
                    {/* Big Bold Percentage Row */}
                    <div className="flex items-baseline justify-between mb-1">
                      <span className="text-sm font-medium text-muted-foreground">Consensus Rate</span>
                      <span className="text-4xl md:text-5xl font-extrabold text-foreground" style={{ color: "hsl(var(--foreground))" }}>
                        {poll.percentage}%
                      </span>
                    </div>

                    {/* Single Premium Progress Bar with hover glow */}
                    <div className="h-3 w-full bg-muted rounded-full overflow-hidden border border-border/10 transition-all duration-300 group-hover:shadow-[0_0_10px_rgba(0,201,228,0.4)]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${poll.percentage}%` } : {}}
                        transition={{ type: "spring", stiffness: 60, damping: 15, delay: pollIdx * 0.15 + 0.1 }}
                        className="h-full rounded-full"
                        style={{
                          background: "linear-gradient(90deg, #00C9E4 0%, #0077B6 100%)"
                        }}
                      />
                    </div>

                    {/* Footer Votes Count */}
                    <div className="flex justify-between items-center text-xs text-muted-foreground pt-4 border-t border-border/40">
                      <span className="font-semibold">{poll.votes}</span>
                    </div>
                  </CardContent>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
