import { useRoute } from "wouter";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

// Import posts from posts.json
import postsData from "./posts.json";

// Define article type
interface ArticleData {
  id: number;
  title: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  heroImage: string;
  content: string;
  tags: string[];
}

// Transform posts data to match the expected format
const articles: ArticleData[] = postsData.map((post) => ({
  id: post.id,
  title: post.translations.en.title,
  category: post.categories[0] || "General",
  author: post.author,
  date: new Date(post.publishedAt).toLocaleDateString(),
  readTime: "3 min read", // Default read time
  heroImage: post.thumbnail.replace("w=800", "w=1200"), // Use thumbnail but larger for hero
  content: post.translations.en.content,
  tags: post.tags,
}));

export default function Article() {
  const [, params] = useRoute("/resources/:id");
  const { toast } = useToast();
  const articleId = params?.id ? parseInt(params.id) : 1;
  const article = articles.find((a) => a.id === articleId) || articles[0];

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
      )}&text=${encodeURIComponent(article.title)}`,
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
                className="inline-flex items-center gap-2 text-white mb-6 hover:underline"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Resources
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      <main className="py-12 px-6">
        <div className="container mx-auto max-w-4xl">
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
                    <p className="mb-4 text-foreground leading-relaxed">
                      {children}
                    </p>
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
                  li: ({ children }) => (
                    <li className="text-foreground">{children}</li>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-bold text-foreground">
                      {children}
                    </strong>
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
