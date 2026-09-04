import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Calendar, User } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

// Define article type
interface Article {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  author: string;
  date: string;
  tags: string[];
}

function ArticleCardSkeleton() {
  return (
    <Card className="overflow-hidden bg-card border-card-border shadow-sm flex flex-col h-full">
      {/* Top Image Skeleton */}
      <div className="relative h-48 w-full overflow-hidden bg-muted/40">
        <Skeleton className="w-full h-full rounded-none" />
        <Skeleton className="absolute top-4 left-4 h-5 w-20 rounded-full" />
      </div>

      {/* Header Skeleton */}
      <CardHeader className="space-y-3 pb-3">
        <Skeleton className="h-6 w-11/12 rounded" />
        <Skeleton className="h-6 w-3/4 rounded" />
        <div className="space-y-2 pt-1">
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-5/6 rounded" />
          <Skeleton className="h-4 w-2/3 rounded" />
        </div>
      </CardHeader>

      {/* Content Skeleton */}
      <CardContent className="space-y-4 pt-1 flex-1">
        <div className="flex items-center gap-4">
          <Skeleton className="h-4 w-24 rounded" />
          <Skeleton className="h-4 w-20 rounded" />
        </div>
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-5 w-14 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-12 rounded-full" />
        </div>
      </CardContent>

      {/* Footer Skeleton */}
      <CardFooter className="pt-2 pb-5 border-t border-border/20">
        <Skeleton className="h-9 w-full rounded-lg" />
      </CardFooter>
    </Card>
  );
}

import initialPostsData from "./posts.json";

function transformPosts(postsData: any[], lang: string): Article[] {
  return postsData.map((post: any) => ({
    id: post.id,
    title:
      post.translations?.[lang]?.title ??
      post.translations?.en?.title ??
      post.title ??
      "",
    description:
      post.translations?.[lang]?.content ??
      post.translations?.en?.content ??
      post.description ??
      "",
    category: post.categories?.[0] ?? "General",
    image: post.thumbnail ?? "",
    author: post.author ?? "Unknown",
    date: new Date(post.publishedAt).toLocaleDateString(),
    tags: post.tags ?? [],
  }));
}

export default function Resources() {
  const { language, t } = useLanguage();
  const [articles, setArticles] = useState<Article[]>(() =>
    transformPosts(initialPostsData, language)
  );
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [postsPerPage, setPostsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);

  // Update articles immediately when language changes
  useEffect(() => {
    setArticles((prev) => transformPosts(initialPostsData, language));
  }, [language]);

  // Fetch posts from API in background to keep data fresh without blocking UI
  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/posts");
        const postsData = await res.json();
        if (Array.isArray(postsData) && postsData.length > 0) {
          setArticles(transformPosts(postsData, language));
        }
      } catch (error) {
        console.error("Failed to fetch latest posts:", error);
      }
    }

    fetchPosts();
  }, [language]);

  // Get categories dynamically
  const uniqueCategories = Array.from(
    new Set(articles.flatMap((article) => article.category || ["General"]))
  );
  const categories: string[] = ["All", ...uniqueCategories];

  // Filter articles based on category and search query
  const filteredArticles = articles.filter((article) => {
    const matchesCategory =
      selectedCategory === "All" || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // PAGINATION LOGIC
  const totalPages = Math.ceil(filteredArticles.length / postsPerPage);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentArticles = filteredArticles.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) handlePageChange(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) handlePageChange(currentPage - 1);
  };

  // Reset to first page when filters or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, postsPerPage]);

  return (
    <div className="min-h-screen bg-site-gradient">
      <Navigation />

      <main className="pt-32 pb-20 px-6">
        <div className="container mx-auto">
          {/* Title Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1
              className="text-4xl md:text-6xl font-bold mb-4"
              style={{
                background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {t("resources.title", "Resources")}
            </h1>
            <p className="text-muted-foreground text-lg">
              {t(
                "resources.subtitle",
                "Explore articles, guides, and tips to enhance your shrimp farming."
              )}
            </p>
          </motion.div>

          {/* Search + Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder={t("common.searchPlaceholder", "Search Posts...")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background/50 border-border/50"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : ""
                  }
                  style={
                    selectedCategory === category
                      ? {
                          background:
                            "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)",
                          border: "none",
                        }
                      : {}
                  }
                >
                  {category === "All" ? t("common.all", "All") : category}
                </Button>
              ))}
            </div>

            {/* Posts Per Page + Total Count */}
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <div>
                {t("common.showing", "Showing")}{" "}
                <span className="font-semibold text-foreground">
                  {filteredArticles.length === 0
                    ? 0
                    : indexOfFirstPost + 1}
                </span>{" "}
                {t("common.to", "to")}{" "}
                <span className="font-semibold text-foreground">
                  {Math.min(indexOfLastPost, filteredArticles.length)}
                </span>{" "}
                {t("common.of", "of")}{" "}
                <span className="font-semibold text-foreground">
                  {filteredArticles.length}
                </span>{" "}
                {t("common.posts", "posts")}
              </div>

              {/* Pagination (Top) */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1 || loading}
                >
                  {t("common.prev", "Prev")}
                </Button>
                {Array.from({ length: totalPages || 1 }, (_, i) => (
                  <Button
                    key={i}
                    variant={currentPage === i + 1 ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(i + 1)}
                    disabled={loading}
                    style={
                      currentPage === i + 1
                        ? {
                            background:
                              "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)",
                            border: "none",
                            color: "white",
                          }
                        : {}
                    }
                  >
                    {i + 1}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages || loading}
                >
                  {t("common.next", "Next")}
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Articles Grid / Skeletons */}
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {Array.from({ length: postsPerPage }).map((_, idx) => (
                <ArticleCardSkeleton key={idx} />
              ))}
            </div>
          ) : currentArticles.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
            >
              {currentArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow bg-card border-card-border h-full flex flex-col justify-between">
                    <div>
                      <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
                        <img
                          src={article.image || "/attached_assets/shrimpfarm.png"}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          onError={(e) => {
                            const target = e.currentTarget;
                            if (!target.src.includes("shrimpfarm.png")) {
                              target.src = "/attached_assets/shrimpfarm.png";
                            }
                          }}
                        />
                        <Badge className="absolute top-4 left-4 bg-background/90 text-foreground border-0 shadow-xs">
                          {article.category}
                        </Badge>
                      </div>
                      <CardHeader>
                        <h3 className="text-xl font-bold mb-2 leading-snug">{article.title}</h3>
                        <p className="text-muted-foreground text-sm line-clamp-3">
                          {article.description}
                        </p>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span>{article.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{article.date}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {article.tags.slice(0, 4).map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </div>
                    <CardFooter className="pt-2 border-t border-border/20">
                      <a href={`/resources/${article.id}`} className="w-full">
                        <Button
                          variant="ghost"
                          className="w-full text-primary hover:text-primary font-semibold"
                          style={{
                            color: "#00C9E4",
                          }}
                        >
                          {t("common.readMore", "Read More →")}
                        </Button>
                      </a>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16 space-y-4">
              <p className="text-muted-foreground text-lg">
                {t(
                  "common.noArticlesFound",
                  "No articles found matching your search."
                )}
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
              >
                {t("common.resetFilters", "Reset Filters")}
              </Button>
            </div>
          )}

          {/* Pagination Controls (Bottom) */}
          {filteredArticles.length > postsPerPage && (
            <div className="flex flex-col items-center justify-center gap-4 mt-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{t("common.postsPerPage", "Posts per page:")}</span>
                <select
                  className="border rounded px-2 py-1 bg-background"
                  value={postsPerPage}
                  onChange={(e) => setPostsPerPage(Number(e.target.value))}
                >
                  <option value={3}>3</option>
                  <option value={6}>6</option>
                  <option value={9}>9</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                >
                  {t("common.prev", "Prev")}
                </Button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <Button
                    key={i}
                    variant={currentPage === i + 1 ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(i + 1)}
                    style={
                      currentPage === i + 1
                        ? {
                            background:
                              "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)",
                            border: "none",
                            color: "white",
                          }
                        : {}
                    }
                  >
                    {i + 1}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  {t("common.next", "Next")}
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
