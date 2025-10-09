import { motion, useInView } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRef } from "react";

const faqs = [
  {
    question: "What is UpCheck?",
    answer: "UpCheck is an innovative aquaculture technology platform that provides real-time monitoring, AI-powered disease prediction, and smart feeding optimization for shrimp farmers. Our solution helps farmers make data-driven decisions to maximize yields and reduce environmental impact."
  },
  {
    question: "How does UpCheck work?",
    answer: "UpCheck uses IoT sensors installed in your ponds to continuously monitor water quality parameters like dissolved oxygen, pH, temperature, and chlorophyll-a levels. Our AI algorithms analyze this data to predict potential disease outbreaks, optimize feeding schedules, and provide actionable insights through our mobile app."
  },
  {
    question: "Is UpCheck available worldwide?",
    answer: "We are currently focused on serving shrimp farming communities in coastal regions. Our platform is expanding globally, and we're continuously working to bring our solutions to more farmers around the world. Contact us to learn about availability in your region."
  },
  {
    question: "What are the pricing plans?",
    answer: "We offer two main plans: Basic ($49/month) for up to 5 ponds with real-time monitoring, and Plus ($99/month) for unlimited ponds with AI disease prediction and smart feeding optimization. Annual plans are available with a 17% discount."
  },
  {
    question: "Do I need technical expertise to use UpCheck?",
    answer: "No technical expertise is required! Our platform is designed to be user-friendly and intuitive. We provide comprehensive onboarding, training materials, and dedicated support to help you get started. Our mobile app makes it easy to monitor your ponds from anywhere."
  }
];

export default function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 px-6 bg-background" data-testid="section-faq">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4" data-testid="text-faq-title">
            FAQs
          </h2>
          <p className="text-muted-foreground text-lg" data-testid="text-faq-subtitle">
            Answers to commonly asked questions about UpCheck
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem 
                key={i} 
                value={`item-${i}`} 
                className="bg-site-gradient bg-card border border-border rounded-lg px-6 hover-elevate"
                data-testid={`accordion-faq-${i}`}
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline" data-testid={`button-faq-${i}`}>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground" data-testid={`text-faq-answer-${i}`}>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
