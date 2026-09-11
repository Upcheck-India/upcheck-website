import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowLeft,
  Calendar,
  User,
  Clock,
  Twitter,
  Linkedin,
  Facebook,
  Link2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";

// Define article type
interface ArticleData {
  id: number | string;
  title: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  heroImage: string;
  content: string;
  tags: string[];
}

import initialPostsData from "./posts.json";

function matchesPostId(post: any, targetId: string | undefined): boolean {
  if (!targetId || !post) return false;
  const target = String(targetId).trim();
  return (
    String(post.id) === target ||
    String(post._id) === target ||
    (!isNaN(Number(target)) && Number(post.id) === Number(target))
  );
}

function transformSinglePost(post: any, lang: string, defaultReadTime: string): ArticleData {
  return {
    id: post.id ?? post._id,
    title:
      post.translations?.[lang]?.title ??
      post.translations?.en?.title ??
      post.title ??
      "",
    category: post.categories?.[0] ?? "General",
    author: post.author ?? "Unknown",
    date: post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : "",
    readTime: defaultReadTime,
    heroImage: (post.thumbnail ?? "/attached_assets/shrimpfarm.png").replace("w=800", "w=1200"),
    content:
      post.translations?.[lang]?.content ??
      post.translations?.en?.content ??
      post.description ??
      "",
    tags: post.tags ?? [],
  };
}

export default function Article() {
  const [, params] = useRoute("/resources/:id");
  const rawId = params?.id;
  const { toast } = useToast();
  const { language, t } = useLanguage();

  const [article, setArticle] = useState<ArticleData | null>(() => {
    const post = (initialPostsData as any[]).find((p: any) => matchesPostId(p, rawId));
    if (post) {
      return transformSinglePost(post, language, "3 min read");
    }
    return null;
  });
  const [loading, setLoading] = useState<boolean>(!article);

  // Sync article when language or id changes
  useEffect(() => {
    const post = (initialPostsData as any[]).find((p: any) => matchesPostId(p, rawId));
    if (post) {
      setArticle(transformSinglePost(post, language, t("common.readTime", "3 min read")));
      setLoading(false);
    }
  }, [rawId, language, t]);

  // Fetch article from server / MongoDB for latest content or if not in local posts
  useEffect(() => {
    if (!rawId) return;
    const currentId = rawId;
    let isMounted = true;

    async function fetchArticle() {
      try {
        let foundPost: any = null;
        try {
          const res = await fetch(`/api/posts/${encodeURIComponent(currentId)}`);
          if (res.ok) {
            const data = await res.json();
            if (data && !data.error) {
              foundPost = data;
            }
          }
        } catch {
          // ignore single fetch error
        }

        if (!foundPost) {
          const resAll = await fetch("/api/posts");
          if (resAll.ok) {
            const postsData = await resAll.json();
            if (Array.isArray(postsData)) {
              foundPost = postsData.find((p: any) => matchesPostId(p, currentId));
            }
          }
        }

        if (isMounted) {
          if (foundPost) {
            setArticle(transformSinglePost(foundPost, language, t("common.readTime", "3 min read")));
          }
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch article updates:", error);
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchArticle();

    return () => {
      isMounted = false;
    };
  }, [rawId, language, t]);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "The article link has been copied to your clipboard.",
    });
  };

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        window.location.href
      )}&text=${encodeURIComponent(article?.title ?? "")}`,
      "_blank"
    );
  };

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        window.location.href
      )}`,
      "_blank"
    );
  };

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        window.location.href
      )}`,
      "_blank"
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-site-gradient">
        <Navigation />
        <div className="relative h-96 bg-muted/40">
          <Skeleton className="w-full h-full rounded-none" />
        </div>
        <main className="py-12 px-6">
          <div className="container mx-auto max-w-4xl space-y-6">
            <div className="bg-card rounded-lg p-8 md:p-12 shadow-lg border border-card-border space-y-6">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-10 w-4/5 rounded" />
              <div className="flex items-center gap-6 py-2 border-b border-border/40">
                <Skeleton className="h-4 w-28 rounded" />
                <Skeleton className="h-4 w-24 rounded" />
                <Skeleton className="h-4 w-20 rounded" />
              </div>
              <div className="space-y-3 pt-4">
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-11/12 rounded" />
                <Skeleton className="h-4 w-4/5 rounded" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col justify-between bg-site-gradient text-foreground">
        <Navigation />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4">
          <h2 className="text-3xl font-bold">Article not found</h2>
          <p className="text-muted-foreground max-w-md">
            The requested resource could not be found or may have been moved.
          </p>
          <a href="/resources">
            <Button variant="outline" className="gap-2 mt-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Resources
            </Button>
          </a>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-site-gradient">
      <Navigation />

      <div
        className="relative h-96 bg-cover bg-center"
        style={{ backgroundImage: `url(${article.heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <a
                href="/resources"
                className="inline-flex items-center gap-2 text-white mb-6 hover:underline font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                {t("common.backToResources", "Back to Resources")}
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      <main className="py-12 px-6">
        <div className="container mx-auto max-w-4xl">
          {/* The existing article content code remains unchanged*/}
          {/* Use `article` variable for all content */}
          {/* ...existing JSX with article props... */}
          {/* For example: */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-card rounded-lg p-8 md:p-12 shadow-lg border border-card-border"
          >
            <Badge
              className="mb-4"
              style={{
                background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)",
                color: "white",
                border: "none",
              }}
            >
              {article.category}
            </Badge>

            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{article.readTime}</span>
              </div>
            </div>

            <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-ul:text-foreground prose-ol:text-foreground prose-li:text-foreground">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-3xl font-bold mb-4 text-foreground">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-bold mb-3 text-foreground">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-bold mb-2 text-foreground">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="mb-4 text-foreground leading-relaxed">{children}</p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside mb-4 text-foreground space-y-2">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside mb-4 text-foreground space-y-2">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => <li className="text-foreground">{children}</li>,
                  strong: ({ children }) => (
                    <strong className="font-bold text-foreground">{children}</strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic text-foreground">{children}</em>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground mb-4">
                      {children}
                    </blockquote>
                  ),
                  code: ({ children }) => (
                    <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
                      {children}
                    </code>
                  ),
                }}
              >
                {article.content}
              </ReactMarkdown>
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="text-xl font-bold mb-4">Related Topics</h3>
              <div className="flex flex-wrap gap-2 mb-8">
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-sm">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between flex-wrap gap-4">
                <h3 className="text-lg font-semibold">Share this post</h3>
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={shareOnTwitter}
                    className="hover:text-primary"
                  >
                    <Twitter className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={shareOnLinkedIn}
                    className="hover:text-primary"
                  >
                    <Linkedin className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={shareOnFacebook}
                    className="hover:text-primary"
                  >
                    <Facebook className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyLink}
                    className="flex items-center gap-2"
                  >
                    <Link2 className="w-4 h-4" />
                    Copy link
                  </Button>
                </div>
              </div>
            </div>
          </motion.article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
