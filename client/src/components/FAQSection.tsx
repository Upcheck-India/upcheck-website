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
    answer: "Today, farmers record their daily round in the Neerani app — water readings, feed by meal, tray residue, mortality and treatments — and the app reads that record back as feeding guidance, disease risk and cycle economics. It works offline at the pond bank and syncs when signal returns. Neero, our solar-powered floating sensor, will automate the water readings (pH, dissolved oxygen and temperature) once it completes development; it is currently a bench prototype."
  },
  {
    question: "Is UpCheck available worldwide?",
    answer: "We are focused on India, and specifically on the Andhra Pradesh shrimp belt, which produces roughly 70–78% of the country's farmed shrimp and employs around 4 million people. Neerani works in English, Hindi, Bengali, Tamil, Telugu and Odia because that is where the ponds are. We would rather serve one region properly than claim coverage we do not have."
  },
  {
    question: "What does it cost?",
    answer: "The Neerani app is free to use — every farm, every pond, no limit. We may introduce paid plans for advanced features later, and we will say so clearly before anything changes. The Neero pond sensor is a separate paid product; it is still in development as a bench prototype, so its price will be announced closer to field trials."
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
