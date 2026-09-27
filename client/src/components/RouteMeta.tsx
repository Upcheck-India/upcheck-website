import { useEffect } from "react";
import { useLocation } from "wouter";
import { useLanguage } from "@/context/LanguageContext";
import { getRouteMetadata, SITE_ORIGIN, DEFAULT_OG_IMAGE } from "@/seo/routes";

function setOrCreateMeta(attrName: "name" | "property", attrValue: string, content: string) {
  let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function removeMeta(attrName: "name" | "property", attrValue: string) {
  const element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
  if (element && element.parentNode) {
    element.parentNode.removeChild(element);
  }
}

function setOrCreateCanonical(href: string) {
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

export default function RouteMeta() {
  const [location] = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    const meta = getRouteMetadata(location, language);

    // Title
    document.title = meta.title;

    // Description
    setOrCreateMeta("name", "description", meta.description);

    // Canonical
    const canonicalUrl = meta.canonical || `${SITE_ORIGIN}${location.split("?")[0]}`;
    setOrCreateCanonical(canonicalUrl);

    // Open Graph
    setOrCreateMeta("property", "og:title", meta.title);
    setOrCreateMeta("property", "og:description", meta.description);
    setOrCreateMeta("property", "og:url", canonicalUrl);
    setOrCreateMeta("property", "og:image", meta.ogImage || DEFAULT_OG_IMAGE);

    // Twitter Card
    setOrCreateMeta("name", "twitter:title", meta.title);
    setOrCreateMeta("name", "twitter:description", meta.description);
    setOrCreateMeta("name", "twitter:url", canonicalUrl);
    setOrCreateMeta("name", "twitter:image", meta.ogImage || DEFAULT_OG_IMAGE);

    // Robots / Noindex
    if (meta.noindex) {
      setOrCreateMeta("name", "robots", "noindex, nofollow");
    } else {
      removeMeta("name", "robots");
    }
  }, [location, language]);

  return null;
}
