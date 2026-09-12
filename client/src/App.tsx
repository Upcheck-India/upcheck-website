import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/context/LanguageContext";
import { Analytics } from "@vercel/analytics/react";
import RouteMeta from "@/components/RouteMeta";
import Home from "@/pages/home";
import About from "@/pages/about";
import Resources from "@/pages/resources";
import Article from "@/pages/article";
import Products from "@/pages/products";
import Feedback from "@/pages/feedback";
import Survey from "@/pages/survey";
import Events from "@/pages/events";
import EventDetail from "@/pages/event-detail";
import Contact from "@/pages/contact";
import Download from "@/pages/download";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import AccountDeletion from "@/pages/account-deletion";
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
      {/* Polls page hidden as requested */}
      <Route path="/feedback" component={Feedback} />
      <Route path="/participate/survey" component={Survey} />
      <Route path="/events" component={Events} />
      <Route path="/events/:slug" component={EventDetail} />
      <Route path="/participate/events" component={Events} />
      <Route path="/participate/events/:slug" component={EventDetail} />
      <Route path="/contact" component={Contact} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/account-deletion" component={AccountDeletion} />
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
            <RouteMeta />
            <Analytics />
            <Toaster />
            <Router />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;