import { useEffect } from "react";
import LegalLayout from "@/components/LegalLayout";
import { privacyPolicyContent } from "@/legal/privacyContent";

export default function Privacy() {
  useEffect(() => {
    document.title = "Privacy Policy — Upcheck / Neerani";
    window.scrollTo(0, 0);
  }, []);

  return (
    <LegalLayout
      content={privacyPolicyContent}
      badgeText="Privacy & Data Protection"
    />
  );
}
