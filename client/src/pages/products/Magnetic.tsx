import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/**
 * Magnetic hover wrapper. quickTo keeps one reusable tween per axis instead
 * of spawning a tween on every pointer move; useGSAP scopes and reverts it.
 */
export default function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" });
      const clampX = gsap.utils.clamp(-18, 18);
      const clampY = gsap.utils.clamp(-14, 14);

      const onMove = (e: Event) => {
        const me = e as MouseEvent;
        const rect = el.getBoundingClientRect();
        xTo(clampX((me.clientX - (rect.left + rect.width / 2)) * 0.25));
        yTo(clampY((me.clientY - (rect.top + rect.height / 2)) * 0.3));
      };
      const onLeave = () => {
        xTo(0);
        yTo(0);
      };

      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      return () => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: ref }
  );

  return <div ref={ref} className="inline-block will-change-transform">{children}</div>;
}
