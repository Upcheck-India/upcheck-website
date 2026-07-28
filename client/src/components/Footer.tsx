import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Check } from "lucide-react";
import logoUrl from "@assets/upcheck-logo.png";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribe:", email);
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail("");
    }, 3000);
  };

  return (
  <footer className="relative py-16 px-6 bg-site-gradient bg-card border-t" data-testid="footer">
      {/* Wave Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <img src={logoUrl} alt="Upcheck" className="h-8 mb-4" data-testid="img-footer-logo" />
            <p className="text-muted-foreground mb-6 max-w-md" data-testid="text-footer-desc">
              Revolutionizing aquaculture with AI-powered monitoring and insights for sustainable shrimp farming.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4" data-testid="text-newsletter-title">
              Subscribe to Our Newsletter
            </h3>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <motion.div 
                className="flex-1 relative"
                whileFocus={{ scale: 1.02 }}
              >
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pr-10"
                  data-testid="input-newsletter-email"
                />
                {subscribed && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <Check className="w-5 h-5 text-green-500" />
                  </motion.div>
                )}
              </motion.div>
              
              <Button 
                type="submit" 
                disabled={subscribed}
                data-testid="button-newsletter-subscribe"
              >
                {subscribed ? "Subscribed!" : "Subscribe"}
              </Button>
            </form>
            
            {subscribed && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ duration: 0.5 }}
                  className="inline-block"
                >
                  🎉
                </motion.div>
                <span className="ml-2 text-sm text-green-500" data-testid="text-subscribe-success">
                  Thanks for subscribing!
                </span>
              </motion.div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="font-semibold mb-3" data-testid="text-footer-product">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover-elevate inline-block px-2 py-1 rounded" data-testid="link-features-footer">Features</a></li>
              <li><a href="#" className="hover-elevate inline-block px-2 py-1 rounded" data-testid="link-pricing-footer">Pricing</a></li>
              <li><a href="#" className="hover-elevate inline-block px-2 py-1 rounded" data-testid="link-integrations">Integrations</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3" data-testid="text-footer-company">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover-elevate inline-block px-2 py-1 rounded" data-testid="link-about-footer">About</a></li>
              <li><a href="#" className="hover-elevid inline-block px-2 py-1 rounded" data-testid="link-blog">Blog</a></li>
              <li><a href="#" className="hover-elevate inline-block px-2 py-1 rounded" data-testid="link-careers">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3" data-testid="text-footer-resources">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover-elevate inline-block px-2 py-1 rounded" data-testid="link-documentation">Documentation</a></li>
              <li><a href="#" className="hover-elevate inline-block px-2 py-1 rounded" data-testid="link-guides">Guides</a></li>
              <li><a href="#" className="hover-elevate inline-block px-2 py-1 rounded" data-testid="link-support">Support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3" data-testid="text-footer-legal">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover-elevate inline-block px-2 py-1 rounded" data-testid="link-privacy">Privacy</a></li>
              <li><a href="#" className="hover-elevate inline-block px-2 py-1 rounded" data-testid="link-terms">Terms</a></li>
              <li><a href="#" className="hover-elevate inline-block px-2 py-1 rounded" data-testid="link-security">Security</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t text-center text-sm text-muted-foreground" data-testid="text-copyright">
          <p>© 2025 Upcheck. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
