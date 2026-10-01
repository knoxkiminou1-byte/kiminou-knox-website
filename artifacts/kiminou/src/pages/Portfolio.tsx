import { Helmet } from "react-helmet-async";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, lazy, Suspense } from "react";
import { Twitter, ExternalLink, BookOpen, Trophy, Mic, Mail, Globe, FileText, ChevronDown } from "lucide-react";
const PageHero3D = lazy(() => import("@/components/LuxuryFX/PageHero3D"));
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CANONICAL_BOOK_TITLES } from "@/content/authorProfile";

const FILTERS = ["All", "Author", "Athlete", "Speaker", "Builder", "Editorial"];

const caseStudies = [
  {
    category: "Author",
    title: "The Black Boy Lie Universe",
    sub: "10-work authored catalog",
    desc: "A literary universe centered on faith, Black boyhood, family, love, grief, imagination, and legacy across poetry and children's storytelling.",
    detail: `The canonical ten-book bibliography is: ${CANONICAL_BOOK_TITLES.join("; ")}.`,
    tags: ["Poetry", "Fiction", "Children's"],
    metric: "10",
    metricLabel: "Published Books",
    link: "/books",
    cta: "View All Books",
    icon: BookOpen,
  },
  {
    category: "Athlete",
    title: "Cristo Rey De La Salle",
    sub: "Multi-Sport · 6'7\" · 235 lbs",
    desc: "Multi-sport athlete bringing the same operating standard to the court and field that governs every other arena: consistency, resilience, refusal to cut corners.",
    detail: "Forward / Center. Verified profiles on MaxPreps, NCSA Sports, and Prep Hoops. Basketball and football. Cristo Rey De La Salle captain.",
    tags: ["Basketball", "Football", "Athlete"],
    metric: "6'7\"",
    metricLabel: "Forward / Center",
    link: "/sports",
    cta: "Athletic Profile",
    icon: Trophy,
  },
  {
    category: "Speaker",
    title: "Public Speaking & Youth Work",
    sub: "Schools · Teams · Youth Summits",
    desc: "Talks on discipline, Black boy voice, and building creative work that lasts. Speaks with schools, teams, and community groups about telling the truth without performing it.",
    detail: "Talk topics: Discipline and Faith in Daily Practice; Black Boy Voice and the Cost of Silence; Building Creative Work That Lasts. Top Essay Winner, Miles Hall Foundation Breaking Barriers Youth Summit.",
    tags: ["Schools", "Teams", "Youth", "Faith"],
    metric: "2×",
    metricLabel: "Miles Hall Top Essay",
    link: "/speaking",
    cta: "Speaking Info",
    icon: Mic,
  },
  {
    category: "Builder",
    title: "AAFC & TeeShirtTeens",
    sub: "Artists and Athletes For Change",
    desc: "Director of AAFC and founder of The TeeShirtTeens. Serious developmental platforms that help young creators and athletes convert expression into opportunity.",
    detail: "AAFC refuses to treat young creators and athletes as content or spectacle. TeeShirtTeens and AAFC provide pathways, mentorship, and accountability that translate creativity into something durable.",
    tags: ["AAFC", "TeeShirtTeens", "Youth Dev"],
    metric: "2",
    metricLabel: "Platforms Founded",
    link: "/contact",
    cta: "Connect",
    icon: Mail,
  },
  {
    category: "Builder",
    title: "AAFC Builders",
    sub: "Web design & digital infrastructure",
    desc: "Websites, landing pages, digital infrastructure, and brand systems. The technical lane of Artists and Athletes For Change.",
    detail: "AAFC Builders provides web design and digital infrastructure for creators and community organizations. Building sites that match the seriousness of the work they represent.",
    tags: ["Web Design", "Infrastructure", "Branding"],
    metric: "AAFC",
    metricLabel: "Builders Lane",
    link: "/contact",
    cta: "Work Together",
    icon: Globe,
  },
  {
    category: "Editorial",
    title: "Chief Editorial Work",
    sub: "Rhythm & Roux · Voicing The Lens",
    desc: "Chief editor credits on client book projects. Editorial work that holds the same standards as the published literary catalog: substance, precision, and integrity.",
    detail: "Chief editor for Rhythm & Roux and Voicing The Lens. Both projects required structural editing, voice development, and publication-ready manuscript preparation.",
    tags: ["Editing", "Publishing", "Manuscripts"],
    metric: "2",
    metricLabel: "Editorial Credits",
    link: "/contact",
    cta: "Inquire",
    icon: FileText,
  },
];

const QUICK_FACTS = [
  { label: "From", value: "Oakland / East Palo Alto community" },
  { label: "Roles", value: "Writer, Athlete, Program Builder, Author, Chief Editor, Podcast Host, Creator" },
  { label: "Known For", value: "Books, KimYaps, Medium essays, AAFC, AAFC Builders, web design, athletics" },
];

const socials = [
  { icon: Twitter, label: "Twitter / X", href: "https://x.com/KnoxKiminou", handle: "@KnoxKiminou" },
];

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}>
      {children}
    </motion.div>
  );
}

function CaseCard({ item, index }: { item: typeof caseStudies[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [open, setOpen] = useState(false);
  const Icon = item.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 3) * 0.09, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group border border-white/8 hover:border-amber-400/20 transition-all duration-500 flex flex-col">
      <button className="text-left p-7 flex-1" onClick={() => setOpen(o => !o)}>
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="w-10 h-10 rounded-full border border-amber-400/20 flex items-center justify-center flex-shrink-0 group-hover:border-amber-400/40 transition-colors duration-300">
            <Icon className="w-4 h-4 text-amber-400/50 group-hover:text-amber-400 transition-colors duration-300" />
          </div>
          <div className="text-right">
            <div className="font-serif text-2xl text-amber-300/80 leading-none">{item.metric}</div>
            <div className="text-[9px] uppercase tracking-[0.25em] text-white/25 mt-0.5">{item.metricLabel}</div>
          </div>
        </div>
        <p className="text-[10px] uppercase tracking-[0.3em] text-amber-400/50 mb-2">{item.category}</p>
        <h3 className="font-serif text-xl text-white font-light mb-1 group-hover:text-amber-100 transition-colors duration-300 leading-snug">
          {item.title}
        </h3>
        <p className="text-xs text-white/30 mb-4 italic">{item.sub}</p>
        <p className="text-sm text-white/50 leading-relaxed mb-5">{item.desc}</p>

        {/* Expanded detail */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="overflow-hidden">
              <div className="border-t border-white/8 pt-4 pb-2">
                <p className="text-sm text-white/40 leading-relaxed">{item.detail}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-wrap gap-1.5 mt-3">
          {item.tags.map(tag => (
            <span key={tag} className="px-2.5 py-1 border border-white/8 text-[10px] uppercase tracking-[0.15em] text-white/25 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </button>

      <div className="flex items-center justify-between px-7 py-4 border-t border-white/6">
        <Link href={item.link}>
          <span className="text-[10px] uppercase tracking-[0.25em] text-amber-400/50 hover:text-amber-300 transition-colors cursor-pointer">
            {item.cta} →
          </span>
        </Link>
        <button onClick={() => setOpen(o => !o)}
          className="flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] text-white/20 hover:text-white/50 transition-colors">
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronDown className="w-3 h-3" />
          </motion.span>
          {open ? "Less" : "More"}
        </button>
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All");
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  const filtered = activeFilter === "All" ? caseStudies : caseStudies.filter(c => c.category === activeFilter);

  return (
    <>
      <Helmet>
        <title>Kiminou Knox | Portfolio — Author, Athlete, Builder & Entrepreneur</title>
        <meta name="description" content="The full portfolio of Kiminou Knox — author of ten books, multi-sport athlete, public speaker, AAFC Director, and Bay Area raised creative." />
        <link rel="canonical" href="https://www.kiminouknox.com/portfolio" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.kiminouknox.com/portfolio" />
        <meta property="og:title" content="Kiminou Knox | Portfolio — Author, Athlete & Builder" />
        <meta property="og:description" content="Ten published books, multi-sport athletics, public speaking, and AAFC. The complete work of Kiminou Knox." />
        <meta property="og:image" content="https://www.kiminouknox.com/kiminou-knox-social-share.png" />
        <meta property="og:site_name" content="Kiminou Knox" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@KiminouKnox" />
        <meta name="twitter:title" content="Kiminou Knox | Portfolio" />
        <meta name="twitter:description" content="Ten published books, multi-sport athletics, public speaking, and AAFC. The complete work of Kiminou Knox." />
        <meta name="twitter:image" content="https://www.kiminouknox.com/kiminou-knox-social-share.png" />
      </Helmet>
      <Header />
      <main id="main-content" className="min-h-screen bg-black text-white">

        {/* ─── HERO (full-viewport 3D showstopper) ─── */}
        <section className="relative flex min-h-screen items-center overflow-hidden pt-32 pb-20" ref={heroRef}>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-500/4 rounded-full blur-[160px]" />
          </div>
          {/* Foreground 3D — a ring of monolith "work" slabs orbiting a glass core */}
          <Suspense fallback={null}>
            <PageHero3D variant="portfolio" />
          </Suspense>
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <motion.div initial={{ opacity: 0, y: 24 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}>
                <p className="text-xs uppercase tracking-[0.4em] text-amber-400/60 mb-5 font-medium">Portfolio</p>
                <h1 className="font-serif text-6xl md:text-7xl font-light leading-tight mb-6">
                  Kiminou<br />
                  <span className="italic text-amber-200/90">Knox</span>
                </h1>
                <div className="w-12 h-px bg-amber-400/50 mb-8" />
                <p className="text-lg text-white/55 leading-relaxed max-w-md mb-8">
                  Bay Area writer, athlete, program builder, author, chief editor, podcast host, and creator from the Oakland / East Palo Alto community. Building across books, essays, KimYaps, AAFC, web design, athletics, and youth centered storytelling.
                </p>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="px-3 py-1.5 border border-amber-400/25 text-xs uppercase tracking-[0.2em] text-amber-400/70">Bay Area</span>
                  <span className="px-3 py-1.5 border border-white/10 text-xs uppercase tracking-[0.2em] text-white/40">Class of 2025</span>
                  <span className="px-3 py-1.5 border border-white/10 text-xs uppercase tracking-[0.2em] text-white/40">Multi-Sport</span>
                  <span className="px-3 py-1.5 border border-white/10 text-xs uppercase tracking-[0.2em] text-white/40">Author of Ten Books</span>
                </div>
              </motion.div>

              {/* Quick Facts */}
              <motion.div initial={{ opacity: 0, x: 32 }}
                animate={heroInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.15 }}>
                <p className="text-[10px] uppercase tracking-[0.35em] text-white/20 mb-5">Quick Facts</p>
                <div className="space-y-0">
                  {QUICK_FACTS.map((fact, i) => (
                    <div key={i} className="grid grid-cols-[140px_1fr] gap-4 border-t border-white/6 py-4">
                      <span className="text-xs uppercase tracking-[0.15em] text-white/25">{fact.label}</span>
                      <span className="text-sm text-white/65 leading-snug">{fact.value}</span>
                    </div>
                  ))}
                  <div className="border-t border-white/6" />
                </div>
                <div className="flex gap-3 mt-6">
                  {socials.map(s => {
                    const Icon = s.icon;
                    return (
                      <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 border border-white/8 hover:border-amber-400/25 transition-colors duration-300 group">
                        <Icon className="w-3.5 h-3.5 text-white/25 group-hover:text-amber-400/60 transition-colors duration-300" />
                        <span className="text-xs text-white/40 group-hover:text-amber-200 transition-colors duration-300">{s.handle}</span>
                      </a>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── FILTERABLE CASE STUDIES ─── */}
        <section className="py-20 border-t border-white/6">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <Reveal className="mb-12">
              <div className="flex flex-col md:flex-row md:items-end gap-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-amber-400/60 mb-3 font-medium">Work Lanes</p>
                  <h2 className="font-serif text-3xl md:text-4xl font-light text-white">What I Do</h2>
                  <div className="w-12 h-px bg-amber-400/40 mt-5" />
                </div>
                <div className="flex flex-wrap gap-2 md:ml-auto">
                  {FILTERS.map(f => (
                    <button key={f} onClick={() => setActiveFilter(f)}
                      className={`px-4 py-2 text-xs uppercase tracking-[0.18em] border transition-all duration-300 ${
                        activeFilter === f
                          ? "border-amber-400/60 bg-amber-400/10 text-amber-300"
                          : "border-white/10 text-white/35 hover:border-white/25 hover:text-white/65"
                      }`}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>

            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <AnimatePresence mode="popLayout">
                {filtered.map((item, i) => (
                  <motion.div key={item.title} layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}>
                    <CaseCard item={item} index={i} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="py-24 border-t border-white/6">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <Reveal className="text-center">
              <p className="text-xs uppercase tracking-[0.4em] text-amber-400/60 mb-6 font-medium">Connect</p>
              <h2 className="font-serif text-4xl md:text-6xl font-light text-white mb-10">
                Let's Build<br />
                <span className="italic text-amber-200/90">Something Together</span>
              </h2>
              <Link href="/contact">
                <motion.span
                  className="inline-flex items-center gap-3 px-12 py-5 border border-amber-400/40 text-amber-400/80 text-xs uppercase tracking-[0.2em] hover:bg-amber-400 hover:text-black hover:border-amber-400 transition-all duration-400 cursor-pointer"
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  Get in Touch
                </motion.span>
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
