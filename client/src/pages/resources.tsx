import { useState } from "react";
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
import { Search, Calendar, User } from "lucide-react";

// Import posts from posts.json
import postsData from "./posts.json";

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

// Transform posts data to match the expected format
const articles: Article[] = postsData.map((post) => ({
  id: post.id,
  title: post.translations.en.title,
  description: post.translations.en.description,
  category: post.categories[0] || "General",
  image: post.thumbnail, // Use the thumbnail from posts.json
  author: post.author,
  date: new Date(post.publishedAt).toLocaleDateString(),
  tags: post.tags,
}));

// Get unique categories from posts data
const uniqueCategories = Array.from(
  new Set(postsData.flatMap((post) => post.categories || ["General"]))
);
const categories: string[] = ["All", ...uniqueCategories];

export default function Resources() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [postsPerPage] = useState(6);
  const [currentPage] = useState(1);

  const filteredArticles = articles.filter((article) => {
    const matchesCategory =
      selectedCategory === "All" || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-site-gradient">
      <Navigation />

      <main className="pt-32 pb-20 px-6">
        <div className="container mx-auto">
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
              Resources
            </h1>
            <p className="text-muted-foreground text-lg">
              Explore articles, guides, and tips to enhance your shrimp farming.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <div className="relative max-w-xl mx-auto mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search Posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background/50 border-border/50"
              />
            </div>

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
                  {category}
                </Button>
              ))}
            </div>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Posts per page:</span>
                <select className="border rounded px-2 py-1 bg-background">
                  <option value="6">{postsPerPage}</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-8 h-8 p-0 rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)",
                    color: "white",
                    border: "none",
                  }}
                >
                  {currentPage}
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          >
            {filteredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow bg-card border-card-border">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-4 left-4 bg-background/90 text-foreground border-0">
                      {article.category}
                    </Badge>
                  </div>
                  <CardHeader>
                    <h3 className="text-xl font-bold mb-2">{article.title}</h3>
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
                  <CardFooter>
                    <a href={`/resources/${article.id}`} className="w-full">
                      <Button
                        variant="ghost"
                        className="w-full text-primary hover:text-primary"
                        style={{
                          color: "#00C9E4",
                        }}
                      >
                        Read More →
                      </Button>
                    </a>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span>Posts per page:</span>
            <select className="border rounded px-2 py-1 bg-background">
              <option value="6">{postsPerPage}</option>
            </select>
            <Button
              variant="outline"
              size="sm"
              className="w-8 h-8 p-0 rounded-full ml-4"
              style={{
                background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)",
                color: "white",
                border: "none",
              }}
            >
              {currentPage}
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
