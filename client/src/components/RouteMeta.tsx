import { useEffect } from "react";
import { useLocation } from "wouter";

/**
 * Keeps the document title, description and canonical URL in step with the route.
 *
 * Note on scope: this runs in the browser, so it improves tab titles, browser
 * history and bookmarks — but social scrapers (WhatsApp, LinkedIn, Slack) and
 * some crawlers do not execute JavaScript, so they only ever see the static tags
 * in index.html. Genuine per-route link previews need prerendering or SSR; that
 * is a larger change and is tracked separately.
 */

const SITE = "https://upcheck.in";
const SUFFIX = "Upcheck";

type Meta = { title: string; description: string };

const ROUTES: Record<string, Meta> = {
  "/": {
    title: "Upcheck — Precision aquaculture for shrimp farmers",
    description:
      "Neerani keeps every pond's water, feed, growth, health and money in one record — offline, in six languages. Neero, our solar-powered pond sensor, is in development.",
  },
  "/products": {
    title: `Products — Neerani app and Neero pond sensor · ${SUFFIX}`,
    description:
      "Neerani handles daily logging, feed advice, disease risk and cycle economics. Neero, a solar-powered floating sensor, is a bench prototype in development.",
  },
  "/about": {
    title: `About — why we built Upcheck · ${SUFFIX}`,
    description:
      "Upcheck Technologies Private Limited builds tools for shrimp and fish producers in India. Our story, our values and the team behind Neerani.",
  },
  "/download": {
    title: `Get Neerani — closed beta · ${SUFFIX}`,
    description:
      "Neerani is in Google Play closed testing with pilot farms while we work through a full crop cycle. Request access to join the tester list.",
  },
  "/resources": {
    title: `Resources — articles and guides for shrimp farmers · ${SUFFIX}`,
    description:
      "Practical guides on pond water quality, feeding, disease management and cycle economics for shrimp and fish producers.",
  },
  "/contact": {
    title: `Contact Upcheck · ${SUFFIX}`,
    description:
      "Questions about Neerani, the Neero sensor, pilots or partnerships — reach the Upcheck team in Chennai.",
  },
  "/participate/events": {
    title: `Events · ${SUFFIX}`,
    description: "Workshops, field days and industry events for the shrimp farming community.",
  },
  "/participate/survey": {
    title: `Farmer survey · ${SUFFIX}`,
    description:
      "Tell us how your farm runs. Survey responses shape what we build into Neerani next.",
  },
  "/feedback": {
    title: `Feedback · ${SUFFIX}`,
    description: "Tell the Upcheck team what is working, what is missing and what is broken.",
  },
  "/privacy": {
    title: `Privacy Policy · ${SUFFIX}`,
    description:
      "How Upcheck Technologies Private Limited collects, uses and protects your data, under India's DPDP Act.",
  },
  "/terms": {
    title: `Terms of Service · ${SUFFIX}`,
    description: "The terms governing use of Neerani and the Upcheck website.",
  },
  "/account-deletion": {
    title: `Account & Data Deletion · ${SUFFIX}`,
    description: "How to delete your Neerani account and the data held against it.",
  },
};

const FALLBACK: Meta = {
  title: `${SUFFIX} — Precision aquaculture for shrimp farmers`,
  description:
    "Upcheck builds Neerani, the farm-management app for shrimp and fish producers, and Neero, a solar-powered pond sensor in development.",
};

function setTag(selector: string, attr: string, value: string) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

export default function RouteMeta() {
  const [location] = useLocation();

  useEffect(() => {
    // Article pages and other dynamic routes fall back to the site default
    // rather than showing a stale title from the previous page.
    const meta = ROUTES[location] ?? FALLBACK;

    document.title = meta.title;
    setTag('meta[name="description"]', "content", meta.description);
    setTag('meta[property="og:title"]', "content", meta.title);
    setTag('meta[property="og:description"]', "content", meta.description);
    setTag('meta[name="twitter:title"]', "content", meta.title);
    setTag('meta[name="twitter:description"]', "content", meta.description);

    const url = `${SITE}${location === "/" ? "/" : location}`;
    setTag('link[rel="canonical"]', "href", url);
    setTag('meta[property="og:url"]', "content", url);
  }, [location]);

  return null;
}
