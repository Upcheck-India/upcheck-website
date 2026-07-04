import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Activity,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ShieldAlert,
  Sparkles,
  Target,
  TrendingUp,
  Waves,
} from "lucide-react";

type Product = {
  name: string;
  tagline: string;
  summary: string;
  benefits: string[];
  icon: typeof Waves;
};

const products: Product[] = [
  {
    name: "Pond Monitoring System",
    tagline: "Always-on water intelligence",
    summary:
      "Track the health of every pond with connected sensors that surface live readings, trends, and alerts in one familiar Upcheck view.",
    benefits: [
      "Live monitoring of water quality parameters",
      "Instant alerts for abnormal readings",
      "Historical trends for better farm decisions",
    ],
    icon: Waves,
  },
  {
    name: "Smart Feeding Assistant",
    tagline: "Feed with precision, not guesswork",
    summary:
      "Use intelligent feeding recommendations to improve growth, reduce waste, and keep feed timing aligned with farm conditions.",
    benefits: [
      "Adaptive feeding suggestions",
      "Reduced feed waste and operational cost",
      "Simple recommendations for daily use",
    ],
    icon: Target,
  },
  {
    name: "Farm Analytics Dashboard",
    tagline: "Clear insights for every level of the farm",
    summary:
      "Review performance across ponds, feeding, and environmental data in a dashboard that keeps decision-making fast and visual.",
    benefits: [
      "Cross-pond performance summaries",
      "Trend analysis and operational reporting",
      "A dashboard layout consistent with Upcheck",
    ],
    icon: BarChart3,
  },
  {
    name: "Disease & Risk Alert System",
    tagline: "Detect issues before they spread",
    summary:
      "Combine pattern detection and environmental signals to flag disease risks early, giving teams time to respond with confidence.",
    benefits: [
      "Early warning signals for risk patterns",
      "Clear alerts for team action",
      "Supports proactive farm management",
    ],
    icon: ShieldAlert,
  },
];

const detailedSections = [
  {
    name: "Pond Monitoring System",
    icon: Waves,
    description:
      "Upcheck’s monitoring layer keeps critical pond data visible throughout the day so farmers can act before small changes become costly problems.",
    points: [
      "24/7 monitoring view with live status updates",
      "Alert-first design for quick operational response",
      "Built to match the existing Upcheck visual system",
    ],
  },
  {
    name: "Smart Feeding Assistant",
    icon: Target,
    description:
      "The feeding assistant turns farm context into clear guidance, helping teams keep feeding efficient and predictable.",
    points: [
      "Practical recommendations for routine feeding",
      "Designed to lower waste without adding complexity",
      "Fits naturally into the existing app workflow",
    ],
  },
  {
    name: "Farm Analytics Dashboard",
    icon: BarChart3,
    description:
      "The analytics dashboard gives owners and operators a single place to review performance and understand what is changing across the farm.",
    points: [
      "Simple charts and summary cards for fast review",
      "Supports operational planning and reporting",
      "Uses the same card and spacing language as the rest of the site",
    ],
  },
  {
    name: "Disease & Risk Alert System",
    icon: ShieldAlert,
    description:
      "Risk alerts help teams detect unusual patterns early, improving response time and reducing the chance of larger losses.",
    points: [
      "Early indicators based on environmental changes",
      "Clear escalation path for farm teams",
      "Keeps the interface aligned with Upcheck’s current design",
    ],
  },
];

const reasons = [
  {
    title: "Built on the same product language",
    description:
      "The page reuses the same gradient, cards, spacing, and motion style already present in Upcheck.",
    icon: Sparkles,
  },
  {
    title: "Designed for aquaculture operators",
    description:
      "Each section speaks to practical farm workflows: monitoring, feeding, analysis, and risk alerts.",
    icon: Activity,
  },
  {
    title: "Clear next-step actions",
    description:
      "The page ends with the same call-to-action style used elsewhere in the site, keeping the experience consistent.",
    icon: TrendingUp,
  },
];

export default function Products() {
  return (
    <div className="min-h-screen bg-site-gradient">
      <Navigation />

      <main className="pt-32 pb-20 px-6">
        <div className="container mx-auto space-y-24">
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-5 bg-background/80 text-foreground border border-border/50">
              Upcheck Products
            </Badge>
            <h1
              className="text-4xl md:text-6xl font-bold mb-6"
              style={{
                background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Everything you need to run a smarter farm
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Upcheck brings monitoring, feeding, analytics, and risk alerts together in one connected experience built for aquaculture teams.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="gap-2"
                style={{
                  background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)",
                  border: "none",
                }}
              >
                Explore Products
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline">
                Contact Sales
              </Button>
            </div>
          </motion.section>

          <section>
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">Product Overview</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Four core products work together to keep operations visible, efficient, and responsive.
              </p>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
              {products.map((product, index) => {
                const Icon = product.icon;

                return (
                  <motion.div
                    key={product.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: index * 0.08 }}
                  >
                    <Card className="h-full bg-card border-card-border overflow-hidden hover:shadow-lg transition-shadow">
                      <CardContent className="p-6 space-y-5">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#00C9E4] to-[#0067B1] text-white shadow-lg">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
                            {product.tagline}
                          </p>
                          <h3 className="text-xl font-bold mb-3">{product.name}</h3>
                          <p className="text-sm text-muted-foreground leading-6">
                            {product.summary}
                          </p>
                        </div>
                        <div className="space-y-2">
                          {product.benefits.map((benefit) => (
                            <div key={benefit} className="flex items-start gap-2 text-sm text-foreground/90">
                              <CheckCircle2 className="w-4 h-4 text-[#00C9E4] mt-0.5 shrink-0" />
                              <span>{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </section>

          <section className="space-y-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">Detailed Product Sections</h2>
              <p className="text-muted-foreground">
                Each product extends the same platform foundation, so the experience stays familiar across the site.
              </p>
            </div>

            <div className="space-y-6">
              {detailedSections.map((section, index) => {
                const Icon = section.icon;
                const reversed = index % 2 === 1;

                return (
                  <motion.div
                    key={section.name}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.5 }}
                    className={`grid lg:grid-cols-2 gap-6 items-stretch ${reversed ? "lg:[direction:rtl]" : ""}`}
                  >
                    <Card className="bg-card border-card-border overflow-hidden">
                      <CardContent className={`p-8 h-full flex flex-col justify-center ${reversed ? "lg:[direction:ltr]" : ""}`}>
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-[#00C9E4] to-[#0067B1] text-white mb-6 shadow-lg">
                          <Icon className="w-7 h-7" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">{section.name}</h3>
                        <p className="text-muted-foreground leading-7 mb-6">{section.description}</p>
                        <div className="space-y-3">
                          {section.points.map((point) => (
                            <div key={point} className="flex items-start gap-3">
                              <div className="mt-1 w-5 h-5 rounded-full bg-[#00C9E4]/10 flex items-center justify-center shrink-0">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#00C9E4]" />
                              </div>
                              <p className="text-sm text-foreground/90 leading-6">{point}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-card border-card-border overflow-hidden">
                      <CardContent className={`p-8 h-full flex items-center ${reversed ? "lg:[direction:ltr]" : ""}`}>
                        <div className="w-full rounded-3xl border border-border/50 bg-site-gradient p-8 relative overflow-hidden">
                          <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_top_right,_rgba(0,201,228,0.16),_transparent_40%),radial-gradient(circle_at_bottom_left,_rgba(0,103,177,0.14),_transparent_38%)]" />
                          <div className="relative space-y-5">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-xl bg-background/80 border border-border/60 flex items-center justify-center">
                                <Icon className="w-6 h-6 text-[#0067B1]" />
                              </div>
                              <div>
                                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Upcheck Module</p>
                                <h4 className="text-xl font-semibold">{section.name}</h4>
                              </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                              <div className="rounded-2xl bg-background/85 border border-border/60 p-4">
                                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Status</p>
                                <p className="font-medium">Connected</p>
                              </div>
                              <div className="rounded-2xl bg-background/85 border border-border/60 p-4">
                                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Style</p>
                                <p className="font-medium">Same as Upcheck UI</p>
                              </div>
                              <div className="rounded-2xl bg-background/85 border border-border/60 p-4">
                                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Use Case</p>
                                <p className="font-medium">Daily farm operations</p>
                              </div>
                              <div className="rounded-2xl bg-background/85 border border-border/60 p-4">
                                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Outcome</p>
                                <p className="font-medium">Faster decisions</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </section>

          <section>
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">Why Choose Upcheck</h2>
              <p className="text-muted-foreground">
                The product experience stays focused, familiar, and consistent from section to section.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {reasons.map((reason, index) => {
                const Icon = reason.icon;

                return (
                  <motion.div
                    key={reason.title}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.45, delay: index * 0.08 }}
                  >
                    <Card className="h-full bg-card border-card-border">
                      <CardContent className="p-6 space-y-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#00C9E4]/10 text-[#0067B1]">
                          <Icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold">{reason.title}</h3>
                        <p className="text-muted-foreground leading-6">{reason.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </section>

          <CTASection />
        </div>
      </main>

      <Footer />
    </div>
  );
}
