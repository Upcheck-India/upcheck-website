import postsData from "@/pages/posts.json";

export interface RouteMetadata {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
  lastmod: string;
}

export const SITE_ORIGIN = "https://www.upcheck.in";
export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/attached_assets/upcheck-logo.png`;
export const DEFAULT_ARTICLE_IMAGE = `${SITE_ORIGIN}/attached_assets/shrimpfarm.png`;

export const ROUTES: Record<string, RouteMetadata> = {
  "/": {
    title: "Upcheck - Reinventing Aquaculture",
    description:
      "Revolutionary aquaculture technology platform for real-time monitoring, disease prediction, and smart feeding solutions for shrimp farmers.",
    canonical: `${SITE_ORIGIN}/`,
    ogImage: DEFAULT_OG_IMAGE,
    lastmod: "2026-03-01",
  },
  "/about": {
    title: "About Us · Upcheck",
    description:
      "Learn about Upcheck Technologies, our mission to empower shrimp farmers with connected IoT hardware and sustainable aquaculture technology.",
    canonical: `${SITE_ORIGIN}/about`,
    ogImage: DEFAULT_OG_IMAGE,
    lastmod: "2026-03-01",
  },
  "/products": {
    title: "Products · Upcheck",
    description:
      "Explore Neerani mobile aquaculture software and Neero IoT water quality monitoring hardware engineered for shrimp farmers.",
    canonical: `${SITE_ORIGIN}/products`,
    ogImage: DEFAULT_OG_IMAGE,
    lastmod: "2026-03-01",
  },
  "/download": {
    title: "Download Neerani App · Upcheck",
    description:
      "Download Neerani, the mobile farm management app for shrimp farmers. Track water parameters, feeding, and pond health.",
    canonical: `${SITE_ORIGIN}/download`,
    ogImage: DEFAULT_OG_IMAGE,
    lastmod: "2026-03-01",
  },
  "/app": {
    title: "Download Neerani App · Upcheck",
    description:
      "Download Neerani, the mobile farm management app for shrimp farmers. Track water parameters, feeding, and pond health.",
    canonical: `${SITE_ORIGIN}/download`,
    ogImage: DEFAULT_OG_IMAGE,
    lastmod: "2026-03-01",
  },
  "/resources": {
    title: "Aquaculture Resources & Insights · Upcheck",
    description:
      "Practical guides, water quality insights, disease prevention strategies, and expert articles for sustainable shrimp farming.",
    canonical: `${SITE_ORIGIN}/resources`,
    ogImage: DEFAULT_OG_IMAGE,
    lastmod: "2026-03-01",
  },
  "/participate/events": {
    title: "Events & Hackathons · Upcheck",
    description:
      "Discover upcoming hackathons, innovation challenges, and student technology events partnered with Upcheck Technologies.",
    canonical: `${SITE_ORIGIN}/participate/events`,
    ogImage: DEFAULT_OG_IMAGE,
    lastmod: "2026-03-01",
  },
  "/events": {
    title: "Events & Hackathons · Upcheck",
    description:
      "Discover upcoming hackathons, innovation challenges, and student technology events partnered with Upcheck Technologies.",
    canonical: `${SITE_ORIGIN}/participate/events`,
    ogImage: DEFAULT_OG_IMAGE,
    lastmod: "2026-03-01",
  },
  "/contact": {
    title: "Contact Us · Upcheck",
    description:
      "Get in touch with the Upcheck Technologies team in Chennai. Reach out for product inquiries, partnerships, and farm support.",
    canonical: `${SITE_ORIGIN}/contact`,
    ogImage: DEFAULT_OG_IMAGE,
    lastmod: "2026-03-01",
  },
  "/privacy": {
    title: "Privacy Policy · Upcheck",
    description:
      "Read the Upcheck Technologies privacy policy regarding data collection, protection, and privacy rights on our website and apps.",
    canonical: `${SITE_ORIGIN}/privacy`,
    ogImage: DEFAULT_OG_IMAGE,
    lastmod: "2026-03-01",
  },
  "/terms": {
    title: "Terms & Conditions · Upcheck",
    description:
      "Review the terms and conditions governing the use of Upcheck Technologies websites, products, and services.",
    canonical: `${SITE_ORIGIN}/terms`,
    ogImage: DEFAULT_OG_IMAGE,
    lastmod: "2026-03-01",
  },
  "/account-deletion": {
    title: "Account Deletion · Upcheck",
    description:
      "Instructions for permanently deleting your Neerani account and associated farm data in accordance with Google Play policies.",
    canonical: `${SITE_ORIGIN}/account-deletion`,
    ogImage: DEFAULT_OG_IMAGE,
    lastmod: "2026-03-01",
  },
  "/technology": {
    title: "Aquaculture Technology · Upcheck",
    description:
      "Connected IoT sensors and predictive analytics delivering real-time water quality monitoring and feed optimization for shrimp ponds.",
    canonical: `${SITE_ORIGIN}/technology`,
    ogImage: DEFAULT_OG_IMAGE,
    lastmod: "2026-03-01",
  },
  "/welfare": {
    title: "Shrimp Welfare & Sustainable Farming · Upcheck",
    description:
      "Responsible aquaculture standards, water management practices, and biosecurity protocols designed to improve shrimp health.",
    canonical: `${SITE_ORIGIN}/welfare`,
    ogImage: DEFAULT_OG_IMAGE,
    lastmod: "2026-03-01",
  },
  "/feedback": {
    title: "Feedback · Upcheck",
    description:
      "Share your thoughts and feedback on Upcheck products and aquaculture services.",
    canonical: `${SITE_ORIGIN}/feedback`,
    noindex: true,
    ogImage: DEFAULT_OG_IMAGE,
    lastmod: "2026-03-01",
  },
  "/participate/survey": {
    title: "Farmer Survey · Upcheck",
    description:
      "Participate in the Upcheck shrimp farmer survey to help us understand field challenges and build better tools.",
    canonical: `${SITE_ORIGIN}/participate/survey`,
    noindex: true,
    ogImage: DEFAULT_OG_IMAGE,
    lastmod: "2026-03-01",
  },
  "404": {
    title: "Page Not Found · Upcheck",
    description:
      "The page you are looking for does not exist on Upcheck Technologies.",
    canonical: `${SITE_ORIGIN}/404`,
    noindex: true,
    ogImage: DEFAULT_OG_IMAGE,
    lastmod: "2026-03-01",
  },
};

function stripMarkdown(markdown: string): string {
  return markdown
    .replace(/#+\s+/g, "")
    .replace(/[*_~`]/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function getArticleMeta(id: string | number, lang: string = "en"): RouteMetadata | null {
  const target = String(id).trim();
  const post = (postsData as any[]).find(
    (p) =>
      String(p.id) === target ||
      String(p._id) === target ||
      (!isNaN(Number(target)) && Number(p.id) === Number(target))
  );

  if (!post) return null;

  const rawTitle =
    post.translations?.[lang]?.title ??
    post.translations?.en?.title ??
    post.title ??
    "Article";
  const title = `${rawTitle} · Upcheck`;

  const rawContent =
    post.translations?.[lang]?.content ??
    post.translations?.en?.content ??
    post.content ??
    post.description ??
    "";
  const plainText = stripMarkdown(rawContent);
  const description =
    plainText.length > 150 ? `${plainText.slice(0, 147)}...` : plainText || "Upcheck aquaculture article.";

  let ogImage = DEFAULT_ARTICLE_IMAGE;
  if (post.thumbnail && typeof post.thumbnail === "string") {
    if (post.thumbnail.startsWith("http://") || post.thumbnail.startsWith("https://")) {
      ogImage = post.thumbnail;
    } else if (post.thumbnail.startsWith("/")) {
      ogImage = `${SITE_ORIGIN}${post.thumbnail}`;
    }
  }

  const postId = post.id ?? post._id;
  const canonical = `${SITE_ORIGIN}/resources/${postId}`;
  const lastmod = post.publishedAt || "2026-03-01";

  return {
    title,
    description,
    canonical,
    ogImage,
    lastmod,
  };
}

export function getEventMeta(slug: string): RouteMetadata | null {
  const normalizedSlug = slug.toLowerCase().trim();
  if (normalizedSlug === "makeathon-7" || normalizedSlug === "makeathon-7.0") {
    return {
      title: "Makeathon 7.0 · Upcheck",
      description:
        "A 24-hour innovation-driven hackathon where student innovators from institutions across India tackle real-world, industry-oriented challenges.",
      canonical: `${SITE_ORIGIN}/participate/events/${normalizedSlug}`,
      ogImage:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      lastmod: "2026-04-15",
    };
  }
  return null;
}

export function getRouteMetadata(pathname: string, lang: string = "en"): RouteMetadata {
  const cleanPath = pathname.split("?")[0].replace(/\/+$/, "") || "/";

  if (ROUTES[cleanPath]) {
    return ROUTES[cleanPath];
  }

  const articleMatch = cleanPath.match(/^\/resources\/([^/]+)$/);
  if (articleMatch) {
    const meta = getArticleMeta(articleMatch[1], lang);
    if (meta) return meta;
  }

  const eventMatch = cleanPath.match(/^\/(?:participate\/events|events)\/([^/]+)$/);
  if (eventMatch) {
    const meta = getEventMeta(eventMatch[1]);
    if (meta) return meta;
  }

  return ROUTES["404"];
}
