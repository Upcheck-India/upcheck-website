interface PremiumCardProps {
  children: React.ReactNode;
  className?: string;
  reversed?: boolean;
}

// Premium section card with a clean, minimal hover lift.
export default function PremiumCard({ children, className = "", reversed = false }: PremiumCardProps) {
  // Auto-remove default card padding if custom padding is supplied
  const hasPadding = className.split(" ").some(c => c.startsWith("p-") || c.startsWith("px-") || c.startsWith("py-"));
  const paddingClass = hasPadding ? "" : "p-8 md:p-14";

  return (
    <div
      className={`group relative rounded-[32px] border border-slate-200/80 bg-white dark:bg-slate-900 h-full flex flex-col justify-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out overflow-hidden ${paddingClass} ${reversed ? "lg:[direction:ltr]" : ""} ${className}`}
    >
      <div className="relative z-10 w-full h-full flex flex-col justify-center">{children}</div>
    </div>
  );
}
