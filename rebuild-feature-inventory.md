# Kiminou Knox — Feature Inventory for the Rebuild
Prepared 2026-09-30. Two source repos. A blank-canvas staging copy of Repo A now lives at
github.com/knoxkiminou1-byte/kiminou-knox-website (indexing disabled, separate Vercel project).
The live site (kiminouknox.com, Vercel project knoxfolio-elite, repo KimPossible) is untouched.

## REPO A — "KimPossible" (THE LIVE SITE, kiminouknox.com)
Stack: pnpm monorepo, React 19 + Vite + TypeScript, Tailwind CSS, Framer Motion, wouter routing,
@tanstack/react-query, react-helmet-async. Build: pnpm install -> generate:seo -> typecheck ->
vite build -> prerender:seo. Deployed on Vercel (project: knoxfolio-elite). 304 MB.

### Pages / routes (20+)
- / (home), /splash, /about, /author, /basketball (redirects to /sports), /blog (+ individual
  blog post pages), /books, /book-universe, /book detail pages, /contact, /kimyaps (redirects
  to /speaking), /legacy (legacy timeline), /media (media gallery), /now, /podcast (redirects
  to /speaking), /portfolio, /press (press kit; /press-kit and /presskit redirect here),
  /reading-list, /speaking, /sports, /works, /recruiting, /home (redirects to /)

### Components (153 .tsx files)
- Book experience: BookShelf3D (3D bookshelf), FlipbookModal (flipbook reader), BookPreview,
  ChapterScroll, FreeChapterCapture (email capture for a free chapter), FeaturedBookPromo,
  FirstEditionOverlay
- Storytelling: ConstellationTimeline, LegacyTimeline, ChapterScroll, LiteraryTrail
- Contact: Contact, ContactForm, ContactFAB (floating action button)
- Media: FilmStripGallery, MediaGallery, GenerativeArtPanel, AmbientAudio (background audio)
- "LuxuryFX" suite: GoldParticles, GoldMarquee, GoldUnmask, Cursor, CursorSpotlight,
  GlitchHeading, GlobalScene3D, LockerRoom + LockerRoom3D, GreenRoomStage, MessageBottle,
  AuctionProvenance, ApplausePhysics, Formations, GenerativeScore, ImpossibleLoop, CMYKReveal,
  BlurReveal, MagneticElement, BackToTop, Scene3DToggle, PageTransition
- Site chrome: Hero, Header, Footer, ScrollProgress, ScrollProgressArc, SectionDotNav,
  RouteErrorBoundary, AdminGate, ui/toaster, ui/tooltip

### Backend / data
- api/contact.js — one Vercel serverless function (Nodemailer + Zod) powering the contact form
- 10-book catalog from ONE canonical file (src/content/books.json); build regenerates
  public/books.json and public/books-full.json from it
- medium-posts.json, poems.json data files
- lib/api-spec/openapi.yaml with generated API client + Zod schemas (Orval)

### SEO machinery (the skeleton worth preserving)
- scripts/generate-seo.mjs + scripts/prerender-seo.mjs — generate 65 static SEO HTML files
  across 33 routes on every build
- sitemap.xml, image-sitemap.xml, rss.xml, feed.xml, manifest.webmanifest, robots.txt
- Per-route title/description/keywords, canonical URLs, Open Graph, Twitter cards, JSON-LD,
  robots meta, theme-color, Google site-verification x2, favicons
- vercel.json redirects: /podcast and /kimyaps -> /speaking, /basketball -> /sports,
  /press-kit + /presskit -> /press, /home -> /, one blog slug rename redirect

### Tooling
- pnpm --filter workspace, Node >= 24, TypeScript 5.9 strict typecheck
- scripts/check-assets.mjs (fails build on missing local asset), Playwright e2e tests,
  prettier, sharp image optimization

## REPO B — "kiminou-knox-site" (LOCAL ONLY, NEVER DEPLOYED)
Stack: hand-written static HTML/CSS/JS, no framework, no build step. GSAP + Lenis +
ScrollTrigger + Three.js via CDN. 221 MB (mostly assets: photos, video, book covers).

### index.html — one long single page (514 lines)
- Preloader, custom cursor, nav, scroll-choreographed background wash
- HERO: particle portrait of Kiminou built from ~8,700 particles. It assembles, waves like
  a flag, freezes into a clean portrait; tap/click makes it explode into a vortex and
  reassemble. (Built 2026-09-29 — his newest, favorite piece. Exists ONLY here.)
- Sections: manifesto, court-vs-craft fork, books, reel (video), instruments (interactive),
  kimyaps (podcast), scrapbook, game (interactive), work, socials, footer

### lab.html — interactive toybox (181 lines)
- 8 interactive 3D asset experiments (Three.js): fan, puzzle, depth, court-lines instruments, etc.

### SEO
- Basically none: title + meta description + humans.txt. No sitemap, robots, canonical, OG.

## THE REBUILD SETUP (already done)
- New repo kiminou-knox-website = exact copy of KimPossible (full git history), then stripped
  to a blank canvas: App.tsx renders an empty <main>. All 153 components, 20+ pages, assets,
  and SEO scripts still exist in the repo files/history as building blocks.
- Indexing disabled three ways before the first Vercel deploy: noindex,nofollow meta on all
  65 prerendered pages, X-Robots-Tag: noindex,nofollow header in vercel.json, robots.txt
  blocks all crawlers. The SEO generators were edited so builds keep emitting noindex while
  this is a staging copy.
- Staging will live on a separate Vercel project (kiminou-knox-website). No custom domain,
  no DNS changes, live site untouched.

## THE QUESTION FOR THE AI CREW
Kiminou is rebuilding his entire website from this blank canvas. Given both feature
inventories above: which specific features from EACH repo should he keep, port, or drop
in the rebuild? Consider: his lanes are author (10 books), athlete (basketball), speaker,
podcast host (KimYaps), and builder (AAFC). His craft bar is award-tier. Name concrete
keeps/ports/drops per repo, flag anything redundant between the two repos, and say what
the new homepage hero should be.
