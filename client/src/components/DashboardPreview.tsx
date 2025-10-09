import { motion, useInView } from "framer-motion";
import { Card } from "@/components/ui/card";
import { AlertCircle, CheckCircle, TrendingUp } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const notifications = [
  { type: "alert", message: "Disease Alert: Early signs detected in Pond 3", icon: AlertCircle, color: "text-destructive" },
  { type: "success", message: "Feed Optimization: 15% reduction achieved", icon: CheckCircle, color: "text-green-500" },
  { type: "info", message: "Water Quality: All parameters optimal", icon: TrendingUp, color: "text-primary" },
];

export default function DashboardPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [visibleNotif, setVisibleNotif] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    
    const interval = setInterval(() => {
      setVisibleNotif(prev => (prev + 1) % notifications.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isInView]);

  return (
  <section ref={ref} className="py-20 px-6 bg-site-gradient bg-muted/30" data-testid="section-dashboard">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4" data-testid="text-dashboard-title">
            Real-Time Dashboard
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto" data-testid="text-dashboard-subtitle">
            Monitor all your ponds from a single, intuitive interface
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            { label: "Dissolved Oxygen", value: "7.2", unit: "mg/L", target: 80 },
            { label: "pH Level", value: "8.1", unit: "", target: 90 },
            { label: "Chlorophyll-a", value: "12.4", unit: "μg/L", target: 65 },
          ].map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.2 }}
            >
              <Card className="p-6" data-testid={`card-metric-${i}`}>
                <p className="text-sm text-muted-foreground mb-2" data-testid={`text-metric-label-${i}`}>
                  {metric.label}
                </p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: i * 0.2 + 0.3 }}
                  className="text-3xl font-bold text-primary"
                  data-testid={`text-metric-value-${i}`}
                >
                  {metric.value}
                  <span className="text-lg ml-1 text-muted-foreground">{metric.unit}</span>
                </motion.p>
                
                {/* Animated Progress Bar */}
                <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${metric.target}%` } : {}}
                    transition={{ delay: i * 0.2 + 0.5, duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-primary to-[hsl(197,100%,36%)]"
                  />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Notification Cards */}
        <div className="relative h-24">
          {notifications.map((notif, i) => (
            <motion.div
              key={i}
              initial={{ x: 300, opacity: 0 }}
              animate={
                visibleNotif === i
                  ? { x: 0, opacity: 1 }
                  : { x: -300, opacity: 0 }
              }
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Card className="p-4 flex items-center gap-4" data-testid={`card-notification-${i}`}>
                <notif.icon className={`w-6 h-6 ${notif.color}`} data-testid={`icon-notification-${i}`} />
                <p className="font-medium" data-testid={`text-notification-${i}`}>{notif.message}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
