import { useEffect } from "react";
import LegalLayout from "@/components/LegalLayout";
import { deletionContent } from "@/legal/deletionContent";

export default function AccountDeletion() {
  useEffect(() => {
    document.title = "Account & Data Deletion — Upcheck / Neerani";
    window.scrollTo(0, 0);
  }, []);

  return (
    <LegalLayout
      content={deletionContent}
      badgeText="Account & Data Management"
    />
  );
}
