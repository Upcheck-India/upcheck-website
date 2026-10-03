import type { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { bubbleConfigs } from "./data";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * The products page motion layer — one useGSAP scope, one matchMedia.
 *
 * Everything animates transforms and autoAlpha only. All entrance work is
 * ScrollTrigger-driven (once), the flow diagram is pinned and scrubbed on
 * desktop, and prefers-reduced-motion leaves the page in its natural state.
 */
export function useProductsMotion(pageRef: RefObject<HTMLDivElement>) {
  useGSAP(
    () => {
      const q = gsap.utils.selector(pageRef);
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          isMobile: "(max-width: 1023.98px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const conditions = (ctx.conditions ?? {}) as {
            isDesktop?: boolean;
            isMobile?: boolean;
            reduceMotion?: boolean;
          };
          const { isDesktop, reduceMotion } = conditions;

          // Reduced motion: everything stays at its natural, final state.
          if (reduceMotion) {
            gsap.set(q(".js-flow-dot"), { autoAlpha: 0 });
            return;
          }

          /* ── Hero intro: badge → headline lines → sub → water line draws ── */
          const wavePath = q(".js-hero-wave-path")[0] as unknown as SVGPathElement | undefined;
          const hero = gsap.timeline({ defaults: { ease: "power3.out" } });
          hero
            .from(".js-hero-badge", { y: 16, autoAlpha: 0, duration: 0.55 }, 0)
            .from(".js-hero-line", { y: 26, autoAlpha: 0, duration: 0.7, stagger: 0.12 }, 0.08)
            .from(".js-hero-sub", { y: 18, autoAlpha: 0, duration: 0.6 }, 0.26);
          if (wavePath) {
            const len = wavePath.getTotalLength();
            gsap.set(wavePath, { strokeDasharray: len, strokeDashoffset: len });
            hero.to(wavePath, { strokeDashoffset: 0, duration: 1.5, ease: "power2.inOut" }, 0.5);
          }

          /* ── Ambient water: rising bubbles ── */
          q(".js-bubble").forEach((node, i) => {
            const b = bubbleConfigs[i];
            if (!b) return;
            gsap.set(node, { autoAlpha: 0 });
            gsap.to(node, {
              x: "random(-16, 16)",
              duration: 2.4,
              repeat: -1,
              yoyo: true,
              repeatDelay: 0.5,
              ease: "sine.inOut",
              delay: b.delay,
            });
            gsap
              .timeline({ repeat: -1, delay: b.delay })
              .to(node, { autoAlpha: 0.5, duration: b.duration * 0.18, ease: "sine.out" }, 0)
              .to(node, { y: "-125vh", duration: b.duration, ease: "none" }, 0)
              .to(node, { autoAlpha: 0, duration: b.duration * 0.15, ease: "sine.in" }, b.duration * 0.82)
              .set(node, { y: 0 }, b.duration);
          });

          /* ── Ambient water: seamless flowing current ── */
          gsap.to(".js-wave-group", { xPercent: -50, duration: 22, repeat: -1, ease: "none" });

          /* ── Ambient light: drifting mesh blobs ── */
          q(".js-mesh").forEach((node, i) => {
            gsap.to(node, {
              x: () => gsap.utils.random(-35, 35),
              y: () => gsap.utils.random(-30, 30),
              scale: () => gsap.utils.random(0.92, 1.08),
              duration: 18 + i * 2,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            });
          });

          /* ── Section reveals on scroll ── */
          q(".js-reveal").forEach((node) => {
            gsap.from(node, {
              y: 40,
              autoAlpha: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: { trigger: node, start: "top 88%", once: true },
            });
          });

          if (isDesktop) {
            q(".js-from-left").forEach((node) => {
              gsap.from(node, {
                x: -50,
                autoAlpha: 0,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: { trigger: node, start: "top 85%", once: true },
              });
            });
            q(".js-from-right").forEach((node) => {
              gsap.from(node, {
                x: 50,
                autoAlpha: 0,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: { trigger: node, start: "top 85%", once: true },
              });
            });
          }

          /* ── Gentle idle floats (device render, phone mockup, signal rings) ── */
          gsap.to(".js-float-device", { y: -12, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut" });
          gsap.to(".js-float-phone", { y: -10, duration: 3.4, repeat: -1, yoyo: true, ease: "sine.inOut" });
          gsap.fromTo(
            ".js-signal-ring",
            { scale: 1, autoAlpha: 0.55 },
            { scale: 1.9, autoAlpha: 0, duration: 4, repeat: -1, ease: "power1.out", stagger: 2 }
          );

          /* ── Feature grids: detail cards, "also" ledger, reasons ── */
          gsap.from(".js-detail-card", {
            y: 24,
            autoAlpha: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: { trigger: ".js-detail-grid", start: "top 85%", once: true },
          });
          gsap.from(".js-also-item", {
            y: 18,
            autoAlpha: 0,
            duration: 0.55,
            ease: "power3.out",
            stagger: 0.05,
            scrollTrigger: { trigger: ".js-also-grid", start: "top 85%", once: true },
          });
          gsap.from(".js-reason", {
            y: 18,
            autoAlpha: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: { trigger: ".js-reasons", start: "top 85%", once: true },
          });

          /* ── Masonry showcase: batched entrances ── */
          gsap.set(".js-masonry-card", { y: 36, autoAlpha: 0 });
          ScrollTrigger.batch(".js-masonry-card", {
            start: "top 88%",
            once: true,
            onEnter: (els) =>
              gsap.to(els, { y: 0, autoAlpha: 1, duration: 0.7, ease: "power3.out", stagger: 0.09, overwrite: true }),
          });

          /* ── Analytics panel: bars sweep, values count up, chart draws ── */
          const analytics = gsap.timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: { trigger: ".js-analytics", start: "top 78%", once: true },
          });
          analytics.from(".js-stat-bar", {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 1.1,
            stagger: 0.15,
          });
          q(".js-counter").forEach((node) => {
            const el = node as HTMLElement;
            const target = parseFloat(el.dataset.value || "0");
            const decimals = parseInt(el.dataset.decimals || "0", 10);
            const state = { v: 0 };
            analytics.to(
              state,
              {
                v: target,
                duration: 1.4,
                ease: "power2.out",
                onUpdate: () => {
                  el.textContent = state.v.toFixed(decimals);
                },
              },
              0.15
            );
          });
          const chartLine = q(".js-chart-line")[0] as unknown as SVGPathElement | undefined;
          if (chartLine) {
            const len = chartLine.getTotalLength();
            gsap.set(chartLine, { strokeDasharray: len, strokeDashoffset: len });
            analytics.to(chartLine, { strokeDashoffset: 0, duration: 1.7, ease: "power2.inOut" }, 0.25);
          }
          const fcrRing = q(".js-fcr-ring")[0] as unknown as SVGPathElement | undefined;
          if (fcrRing) {
            gsap.set(fcrRing, { strokeDashoffset: 60 });
            analytics.to(fcrRing, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut" }, 0.4);
          }
          gsap.to(".js-chart-dot", {
            scale: 1.5,
            transformOrigin: "center center",
            duration: 1,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });

          /* ── The data flow: pond → tower → cloud → phone ── */
          const flowPath = q(".js-flow-path")[0] as unknown as SVGPathElement | undefined;
          if (flowPath) {
            const L = flowPath.getTotalLength();
            gsap.set(flowPath, { strokeDasharray: L, strokeDashoffset: L });
            const dot = q(".js-flow-dot")[0] as unknown as SVGCircleElement | undefined;
            const prog = { v: 0 };
            const placeDot = () => {
              if (!dot) return;
              const p = flowPath.getPointAtLength(L * prog.v);
              gsap.set(dot, { x: p.x, y: p.y });
            };
            placeDot();

            if (isDesktop) {
              const flow = gsap.timeline({
                scrollTrigger: {
                  trigger: ".js-flow-pin",
                  start: "top 96",
                  end: "+=1100",
                  scrub: 1,
                  pin: true,
                  anticipatePin: 1,
                },
              });
              flow
                .to(prog, { v: 1, duration: 3, ease: "none", onUpdate: placeDot }, 0)
                .to(flowPath, { strokeDashoffset: 0, duration: 3, ease: "none" }, 0)
                .fromTo(
                  ".js-flow-node",
                  { scale: 0.5, autoAlpha: 0.25 },
                  { scale: 1, autoAlpha: 1, duration: 0.18, ease: "back.out(2)", stagger: 0.94 },
                  0
                )
                .fromTo(
                  ".js-flow-caption",
                  { autoAlpha: 0, y: 10 },
                  { autoAlpha: 1, y: 0, duration: 0.2, ease: "power2.out", stagger: 0.94 },
                  0.06
                );
            } else {
              gsap.from(".js-flow-mobile-node", {
                y: 24,
                autoAlpha: 0,
                duration: 0.6,
                ease: "power3.out",
                stagger: 0.1,
                scrollTrigger: { trigger: ".js-flow-mobile", start: "top 85%", once: true },
              });
            }
          }
        }
      );

      return () => mm.revert();
    },
    { scope: pageRef }
  );
}
