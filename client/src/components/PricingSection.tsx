import { motion, useInView } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useRef, useState } from "react";

const plans = [
  {
    name: "Neerani app",
    priceLabel: "Free",
    priceNote: "For every farm, every pond, no limit",
    description:
      "The full farm-management app. Free to use while we grow — advanced plans may follow later, and we will say so clearly before anything changes.",
    cta: "Request beta access",
    ctaHref: "/download",
    features: [
      "Daily water, feed, tray and mortality logging",
      "Works offline at the pond bank",
      "Feed advisor and disease symptom checker",
      "Cycle economics — FCR, survival, cost per kg",
      "Owner, manager, worker and viewer roles",
      "Six languages",
    ],
  },
  {
    name: "Neero device",
    priceLabel: "Pricing to be announced",
    priceNote: "Solar-powered pond sensor · in development",
    popular: true,
    description:
      "The floating sensor that feeds Neerani automatically. Currently a bench prototype — pricing will be announced closer to field trials.",
    cta: "Talk to us about pilots",
    ctaHref: "/contact?subject=demo",
    features: [
      "Continuous pH, dissolved oxygen and temperature",
      "Solar powered, no cabling to the pond",
      "GSM uplink, batches through dead patches",
      "Duty-cycled — wakes only when a reading is due",
      "Streams straight into your Neerani dashboard",
    ],
  },
];

export default function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);

  return (
    <section
      id="pricing"
      ref={ref}
      className="py-24 px-6 bg-white relative overflow-hidden scroll-mt-24"
      data-testid="section-pricing"
    >
      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2
            className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight"
            style={{
              background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
            data-testid="text-pricing-title"
          >
            The app is free. The hardware isn't built yet.
          </h2>
          <p
            className="text-lg text-slate-500 max-w-2xl mx-auto"
            data-testid="text-pricing-subtitle"
          >
            We would rather tell you exactly where we are than quote a number we cannot stand behind.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {plans.map((plan, i) => {
            const isActive = hoveredPlan === i;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: isActive ? -12 : 0,
                  scale: isActive ? 1.03 : 1,
                  zIndex: isActive ? 10 : 1,
                }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
                onMouseEnter={() => setHoveredPlan(i)}
                onMouseLeave={() => setHoveredPlan(null)}
                className="relative"
              >
                {plan.popular && (
                  <div
                    className={`absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full text-sm font-semibold shadow-md z-20 transition-colors duration-500 ${
                      isActive ? "bg-white text-primary" : "bg-primary text-primary-foreground"
                    }`}
                  >
                    In development
                  </div>
                )}

                <Card
                  className="h-full p-8 flex flex-col transition-all duration-500"
                  style={{
                    background: isActive
                      ? "linear-gradient(135deg, #00C9E4 0%, #0067B1 100%)"
                      : "#ffffff",
                    color: isActive ? "#ffffff" : "#0f172a",
                    borderRadius: "24px",
                    border: isActive ? "none" : "1px solid rgba(0, 103, 177, 0.08)",
                    boxShadow: isActive
                      ? "0 25px 50px -12px rgba(0, 103, 177, 0.25)"
                      : "0 10px 30px rgba(0, 0, 0, 0.04)",
                  }}
                  data-testid={`card-plan-${i}`}
                >
                  <div className="flex-1">
                    <h3
                      className="text-2xl font-extrabold mb-1"
                      style={
                        isActive
                          ? { color: "#ffffff" }
                          : {
                              background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                              backgroundClip: "text",
                            }
                      }
                    >
                      {plan.name}
                    </h3>

                    <div className="mb-4">
                      <span
                        className={`block text-3xl font-extrabold transition-colors duration-500 ${
                          isActive ? "text-white" : "text-slate-900"
                        }`}
                        data-testid={`text-plan-price-${i}`}
                      >
                        {plan.priceLabel}
                      </span>
                      <span
                        className={`text-xs font-semibold uppercase tracking-wider transition-colors duration-500 ${
                          isActive ? "text-white/70" : "text-slate-400"
                        }`}
                      >
                        {plan.priceNote}
                      </span>
                    </div>

                    <p
                      className={`mb-6 text-sm leading-relaxed transition-colors duration-500 ${
                        isActive ? "text-white/85" : "text-slate-500"
                      }`}
                    >
                      {plan.description}
                    </p>

                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-sm">
                          <Check
                            className={`w-5 h-5 shrink-0 mt-0.5 transition-colors duration-500 ${
                              isActive ? "text-white" : "text-primary"
                            }`}
                          />
                          <span
                            className={`transition-colors duration-500 ${
                              isActive ? "text-white/90" : "text-slate-700"
                            }`}
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a href={plan.ctaHref} className="block">
                    <Button
                      className="w-full font-bold"
                      variant={isActive ? "default" : "outline"}
                      style={
                        isActive
                          ? { background: "#ffffff", color: "#0067B1", border: "none" }
                          : { border: "1px solid rgba(0, 103, 177, 0.2)", color: "#0067B1" }
                      }
                      data-testid={`button-plan-cta-${i}`}
                    >
                      {plan.cta}
                    </Button>
                  </a>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
