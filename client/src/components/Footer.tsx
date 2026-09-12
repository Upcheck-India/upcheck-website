import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Check } from "lucide-react";
import { Link } from "wouter";
import {
  WEB3FORMS_KEY,
  WEB3FORMS_ENDPOINT,
  FORMS_CONFIGURED,
  CONTACT_EMAIL,
} from "@/config/forms";

const logoUrl = "/attached_assets/upcheck-logo.png";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    if (!FORMS_CONFIGURED) {
      setError(`Newsletter signup isn't configured yet — email ${CONTACT_EMAIL} to be added.`);
      return;
    }

    setError(null);
    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `[upcheck.in] Newsletter signup — ${email}`,
          from_name: "Upcheck website",
          email,
          message: `Newsletter subscription request from ${email}`,
        }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.success) throw new Error(result?.message ?? "Signup failed");

      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail("");
      }, 3000);
    } catch (err) {
      setError("Couldn't sign you up just now — please try again shortly.");
      console.error("Newsletter signup failed:", err);
    }
  };

  return (
  <footer className="relative py-16 px-6 bg-site-gradient bg-card border-t" data-testid="footer">
      {/* Wave Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <Link href="/" className="inline-block cursor-pointer hover:opacity-90 transition-opacity">
              <img src={logoUrl} alt="Upcheck" className="h-8 mb-4" data-testid="img-footer-logo" />
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md" data-testid="text-footer-desc">
              Upcheck builds Neerani, the farm-management app for shrimp and fish producers, and Neero, the solar-powered pond sensor now in development.
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
            {error && (
              <p role="alert" className="mt-3 text-sm font-medium text-red-600 dark:text-red-400">
                {error}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="font-semibold mb-3" data-testid="text-footer-product">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/products" className="hover-elevate inline-block px-2 py-1 rounded" data-testid="link-features-footer">Products</a></li>
              <li><a href="/download" className="hover-elevate inline-block px-2 py-1 rounded text-primary font-medium" data-testid="link-app-download-footer">Mobile App (Download)</a></li>
              <li><a href="/#pricing" className="hover-elevate inline-block px-2 py-1 rounded" data-testid="link-pricing-footer">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3" data-testid="text-footer-company">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover-elevate inline-block px-2 py-1 rounded" data-testid="link-about-footer">About</Link></li>
              <li><Link href="/contact" className="hover-elevate inline-block px-2 py-1 rounded" data-testid="link-contact-footer">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3" data-testid="text-footer-resources">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/resources" className="hover-elevate inline-block px-2 py-1 rounded" data-testid="link-blog">Articles &amp; Guides</Link></li>
              <li><Link href="/participate/events" className="hover-elevate inline-block px-2 py-1 rounded" data-testid="link-events-footer">Events</Link></li>
              <li><Link href="/contact" className="hover-elevate inline-block px-2 py-1 rounded" data-testid="link-support">Support</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3" data-testid="text-footer-legal">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/privacy" className="hover-elevate inline-block px-2 py-1 rounded" data-testid="link-privacy">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover-elevate inline-block px-2 py-1 rounded" data-testid="link-terms">Terms of Service</Link></li>
              <li><Link href="/account-deletion" className="hover-elevate inline-block px-2 py-1 rounded" data-testid="link-account-deletion">Account & Data Deletion</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t text-center text-sm text-muted-foreground space-y-1" data-testid="text-copyright">
          <p>© {new Date().getFullYear()} Upcheck Technologies Private Limited. All rights reserved.</p>
          <p>Chennai, Tamil Nadu, India · <a href="mailto:admin@upcheck.in" className="hover:text-primary underline underline-offset-2">admin@upcheck.in</a></p>
        </div>
      </div>
    </footer>
  );
}
