// STAGING COPY — kiminou-knox-website rebuild canvas.
//
// Rebuild order: hero → /books → /speaking → /press → /sports → /contact
// → court/craft toggle → business-site polish → red-button pixel world.
//
// The site ships with indexing disabled (noindex + X-Robots-Tag) until the
// rebuild is finished and promoted. Production stays untouched until then.

import { useEffect } from "react";
import { Switch, Route, Link, useLocation } from "wouter";
import ParticleHero from "./components/ParticleHero";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import Books from "./pages/Books";
import BookDetail from "./pages/BookDetail";
import Speaking from "./pages/Speaking";
import Press from "./pages/Press";
import Sports from "./pages/Sports";
import Contact from "./pages/Contact";
import Author from "./pages/Author";

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [location]);
  return null;
}

function Home() {
  useEffect(() => {
    document.title = "Kiminou Knox — Author · Athlete · Builder";
  }, []);
  return <ParticleHero />;
}

function NotFound() {
  useEffect(() => {
    document.title = "Page not found — Kiminou Knox";
  }, []);
  return (
    <main className="bg-(--kk-paper) text-(--kk-ink) min-h-[70vh]">
      <div className="max-w-3xl mx-auto px-6 pt-40 pb-24 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-(--kk-brass)">
          404
        </p>
        <h1 className="font-serif text-4xl md:text-5xl mt-5">Off the map.</h1>
        <p className="mt-4 text-lg text-(--kk-ink)/65">
          That page isn't part of the story. Start back at the beginning.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center rounded-full bg-(--kk-ink) px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.16em] text-(--kk-paper) transition-colors hover:bg-(--kk-ink-soft) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--kk-ink)"
        >
          Back home
        </Link>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-(--kk-paper) text-(--kk-ink) antialiased">
      <ScrollToTop />
      <SiteHeader />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/books" component={Books} />
        <Route path="/books/:id" component={BookDetail} />
        <Route path="/speaking" component={Speaking} />
        <Route path="/press" component={Press} />
        <Route path="/sports" component={Sports} />
        <Route path="/contact" component={Contact} />
        <Route path="/author" component={Author} />
        <Route component={NotFound} />
      </Switch>
      <SiteFooter />
    </div>
  );
}
