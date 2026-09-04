import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/context/LanguageContext";
import Home from "@/pages/home";
import About from "@/pages/about";
import Resources from "@/pages/resources";
import Article from "@/pages/article";
import Products from "@/pages/products";
import Survey from "@/pages/survey";
import Events from "@/pages/events";
import Contact from "@/pages/contact";
import Download from "@/pages/download";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/resources" component={Resources} />
      <Route path="/resources/:id" component={Article} />
      <Route path="/products" component={Products} />
      <Route path="/download" component={Download} />
      <Route path="/app" component={Download} />
      <Route path="/participate/survey" component={Survey} />
      <Route path="/participate/events" component={Events} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
