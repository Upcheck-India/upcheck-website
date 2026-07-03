import { motion, useInView } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useRef, useState } from "react";

const plans = [
  {
    name: "Basic",
    price: { monthly: 0, yearly: 0 },
    description: "Perfect for getting started",
    features: [
      "Basic pond monitoring",
      "Community access",
      "Market updates",
      "Basic alerts"
    ]
  },
  {
    name: "Plus",
    price: { monthly: 1000, yearly: 10000 },
    popular: true,
    description: "Dedicated hardware for your pond for the best service",
    features: [
      "Advanced monitoring",
      "AI predictions",
      "Hardware integration",
      "Premium support",
      "Custom alerts",
      "Data analytics"
    ]
  }
];

export default function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null); // Track hovered plan index

  return (
    <section ref={ref} className="py-24 px-6 bg-white relative overflow-hidden" data-testid="section-pricing">
      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900" data-testid="text-pricing-title">
            Simple, Transparent Pricing
          </h2>
          <p className="text-slate-500 text-lg mb-8" data-testid="text-pricing-subtitle">
            Choose the plan that fits your farm's needs
          </p>

          {/* Billing Toggle */}
          <motion.div 
            className="inline-flex gap-2 p-1 bg-white/80 border border-slate-100 rounded-xl shadow-sm"
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant={billingCycle === "monthly" ? "default" : "ghost"}
              size="sm"
              onClick={() => setBillingCycle("monthly")}
              data-testid="button-billing-monthly"
              className="rounded-lg transition-all duration-200"
            >
              Monthly
            </Button>
            <Button
              variant={billingCycle === "yearly" ? "default" : "ghost"}
              size="sm"
              onClick={() => setBillingCycle("yearly")}
              data-testid="button-billing-yearly"
              className="rounded-lg transition-all duration-200"
            >
              Yearly
              <span className="ml-2 text-xs bg-primary-foreground text-primary px-2 py-0.5 rounded">
                Save 17%
              </span>
            </Button>
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch pt-4">
          {plans.map((plan, i) => {
            const isActive = hoveredPlan === i;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { 
                  opacity: 1, 
                  y: isActive ? -12 : 0,
                  scale: isActive ? 1.04 : 0.98,
                  zIndex: isActive ? 10 : 1
                } : {}}
                transition={{ 
                  type: "spring", 
                  stiffness: 260, 
                  damping: 24,
                  delay: isInView ? 0 : i * 0.1
                }}
                onMouseEnter={() => setHoveredPlan(i)}
                onMouseLeave={() => setHoveredPlan(null)}
                className="relative flex flex-col cursor-pointer select-none"
              >
                {plan.popular && (
                  <motion.div
                    animate={{ rotate: [0, 2, 0, -2, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className={`absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full text-sm font-semibold shadow-md z-20 transition-colors duration-500 ${
                      isActive 
                        ? 'bg-white text-primary' 
                        : 'bg-primary text-primary-foreground'
                    }`}
                    data-testid="badge-popular"
                  >
                    Most Popular
                  </motion.div>
                )}
                
                <Card 
                  className="p-8 h-full flex flex-col justify-between transition-all duration-500" 
                  style={{ 
                    background: isActive 
                      ? "linear-gradient(135deg, #00C9E4 0%, #0067B1 100%)" 
                      : "#ffffff",
                    color: isActive ? "#ffffff" : "#0f172a",
                    borderRadius: "24px",
                    border: isActive ? "none" : "1px solid rgba(0, 103, 177, 0.08)",
                    boxShadow: isActive 
                      ? "0 25px 50px -12px rgba(0, 103, 177, 0.25)" 
                      : "0 10px 30px rgba(0, 0, 0, 0.04)"
                  }}
                  data-testid={`card-plan-${i}`}
                >
                  <div>
                    <h3 
                      className="text-2xl font-bold mb-2 transition-colors duration-500"
                      style={isActive ? { 
                        color: "#ffffff"
                      } : { 
                        background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text"
                      }}
                      data-testid={`text-plan-name-${i}`}
                    >
                      {plan.name}
                    </h3>
                    <p className={`mb-6 text-sm transition-colors duration-500 ${isActive ? 'text-white/80' : 'text-slate-500'}`}>
                      {plan.description}
                    </p>
                    
                    {plan.price[billingCycle] === 0 && (
                      <div className="mb-6 flex items-baseline gap-1">
                        <span className={`text-4xl font-extrabold transition-colors duration-500 ${isActive ? 'text-white' : 'text-slate-900'}`} data-testid={`text-plan-price-${i}`}>
                          Free
                        </span>
                      </div>
                    )}

                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, j) => (
                        <motion.li
                          key={feature}
                          className="flex items-start gap-3 text-sm"
                          data-testid={`text-feature-${i}-${j}`}
                        >
                          <Check className={`w-5 h-5 shrink-0 mt-0.5 transition-colors duration-500 ${isActive ? 'text-white' : 'text-primary'}`} />
                          <span className={`transition-colors duration-500 ${isActive ? 'text-white/90' : 'text-slate-700'}`}>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <Button 
                    className="w-full relative overflow-hidden h-11 text-sm font-semibold rounded-xl transition-all duration-300" 
                    variant={isActive ? "default" : "outline"}
                    data-testid={`button-select-plan-${i}`}
                    style={isActive ? {
                      background: "#ffffff",
                      color: "#0067B1",
                      border: "none"
                    } : {
                      border: "1px solid rgba(0, 103, 177, 0.2)",
                      color: "#0067B1"
                    }}
                  >
                    {plan.name === "Basic" ? "Get Started" : "Contact team"}
                  </Button>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
