import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck } from "lucide-react";

interface LegalLayoutProps {
  content: string;
  badgeText?: string;
}

export default function LegalLayout({
  content,
  badgeText = "Legal Document",
}: LegalLayoutProps) {
  // Clean generator comments like <!-- GENERATED FROM ... --> if present
  const sanitizedContent = content.replace(/<!--[\s\S]*?-->/g, "").trim();

  return (
    <div className="min-h-screen bg-site-gradient flex flex-col justify-between text-foreground">
      <Navigation />

      <main className="flex-1 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <Badge
              variant="outline"
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary border-primary/30 bg-primary/10 rounded-full"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              {badgeText}
            </Badge>
          </motion.div>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card rounded-2xl p-6 sm:p-10 md:p-14 shadow-sm border border-border/70"
          >
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-10 mb-4 pb-2 border-b border-border/60">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-lg sm:text-xl font-semibold text-foreground mt-6 mb-3">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-foreground/85 leading-relaxed mb-4 text-base">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-outside pl-6 space-y-2 mb-4 text-foreground/85">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-outside pl-6 space-y-2 mb-4 text-foreground/85">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-foreground/85 leading-relaxed pl-1">
                      {children}
                    </li>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold text-foreground">
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic text-foreground/90">{children}</em>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-primary bg-primary/5 p-4 rounded-r-xl italic text-foreground/90 my-6 text-sm sm:text-base">
                      {children}
                    </blockquote>
                  ),
                  table: ({ children }) => (
                    <div className="overflow-x-auto my-6 rounded-xl border border-border bg-card shadow-sm">
                      <table className="w-full text-sm text-left border-collapse">
                        {children}
                      </table>
                    </div>
                  ),
                  thead: ({ children }) => (
                    <thead className="bg-muted/70 border-b border-border text-foreground font-semibold">
                      {children}
                    </thead>
                  ),
                  tbody: ({ children }) => (
                    <tbody className="divide-y divide-border/60">
                      {children}
                    </tbody>
                  ),
                  tr: ({ children }) => (
                    <tr className="hover:bg-muted/30 transition-colors">
                      {children}
                    </tr>
                  ),
                  th: ({ children }) => (
                    <th className="px-4 py-3 font-semibold text-foreground whitespace-nowrap">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="px-4 py-3 text-foreground/85">
                      {children}
                    </td>
                  ),
                  hr: () => <hr className="border-border/60 my-8" />,
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      className="text-primary font-medium hover:underline break-words"
                      target={href?.startsWith("http") ? "_blank" : undefined}
                      rel={
                        href?.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      {children}
                    </a>
                  ),
                  code: ({ children }) => (
                    <code className="bg-muted px-1.5 py-0.5 rounded text-xs sm:text-sm font-mono text-foreground">
                      {children}
                    </code>
                  ),
                }}
              >
                {sanitizedContent}
              </ReactMarkdown>
            </div>
          </motion.article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
