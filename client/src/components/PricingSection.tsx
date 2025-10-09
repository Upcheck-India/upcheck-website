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

  return (
  <section ref={ref} className="py-20 px-6 bg-site-gradient bg-muted/30" data-testid="section-pricing">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4" data-testid="text-pricing-title">
            Simple, Transparent Pricing
          </h2>
          <p className="text-muted-foreground text-lg mb-8" data-testid="text-pricing-subtitle">
            Choose the plan that fits your farm's needs
          </p>

          {/* Billing Toggle */}
          <motion.div 
            className="inline-flex gap-2 p-1 bg-muted rounded-md"
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant={billingCycle === "monthly" ? "default" : "ghost"}
              size="sm"
              onClick={() => setBillingCycle("monthly")}
              data-testid="button-billing-monthly"
            >
              Monthly
            </Button>
            <Button
              variant={billingCycle === "yearly" ? "default" : "ghost"}
              size="sm"
              onClick={() => setBillingCycle("yearly")}
              data-testid="button-billing-yearly"
            >
              Yearly
              <span className="ml-2 text-xs bg-primary-foreground text-primary px-2 py-0.5 rounded">
                Save 17%
              </span>
            </Button>
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.2 }}
              whileHover={{ scale: 1.03 }}
              className="relative"
            >
              {plan.popular && (
                <motion.div
                  animate={{ rotate: [0, 5, 0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium"
                  data-testid="badge-popular"
                >
                  Most Popular
                </motion.div>
              )}
              
              <Card className={`p-8 h-full ${plan.popular ? 'border-2' : ''}`} 
                style={{ borderColor: plan.popular ? '#00C9E4' : '' }}
                data-testid={`card-plan-${i}`}>
                <h3 className="text-2xl font-bold mb-2"
                    style={{ 
                      background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text"
                    }}
                    data-testid={`text-plan-name-${i}`}>{plan.name}</h3>
                <p className="text-muted-foreground mb-4">{plan.description}</p>
                
                <motion.div 
                  key={billingCycle}
                  initial={{ rotateY: 90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mb-6"
                >
                  <span className="text-4xl font-bold" data-testid={`text-plan-price-${i}`}>
                    {plan.price[billingCycle] === 0 ? 'Free' : `₹${plan.price[billingCycle]}`}
                  </span>
                  <span className="text-muted-foreground">
                    {plan.price[billingCycle] === 0 ? '' : `/${billingCycle === "monthly" ? "month" : "year"}`}
                  </span>
                </motion.div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <motion.li
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: i * 0.2 + j * 0.1 }}
                      className="flex items-start gap-3"
                      data-testid={`text-feature-${i}-${j}`}
                    >
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                <Button 
                  className="w-full relative overflow-hidden" 
                  variant={plan.popular ? "default" : "outline"}
                  data-testid={`button-select-plan-${i}`}
                  style={plan.popular ? {
                    background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)",
                    border: "none"
                  } : {}}
                >
                  {plan.name === "Basic" ? "Get Started" : "Contact team"}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
