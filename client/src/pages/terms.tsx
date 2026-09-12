import { useEffect } from "react";
import LegalLayout from "@/components/LegalLayout";
import { termsContent } from "@/legal/termsContent";

export default function Terms() {
  useEffect(() => {
    document.title = "Terms of Service — Upcheck / Neerani";
    window.scrollTo(0, 0);
  }, []);

  return (
    <LegalLayout
      content={termsContent}
      badgeText="Terms & Conditions"
    />
  );
}
