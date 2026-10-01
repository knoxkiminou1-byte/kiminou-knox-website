import { useRef } from "react";
import { Helmet } from "react-helmet-async";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { breadcrumbSchema, SITE_URL } from "@/lib/seo";

type Milestone = {
  date: string;
  pillar: "Author" | "Athletics" | "Community" | "Builder" | "Voice";
  title: string;
  detail: string;
  link?: { label: string; href: string };
};

const MILESTONES: Milestone[] = [
  {
    date: "2022",
    pillar: "Athletics",
    title: "Multi-Sport Athlete",
    detail: "Competing in basketball and football, building the versatility and conditioning that would carry into varsity.",
  },
  {
    date: "2023",
    pillar: "Athletics",
    title: "Back-to-Back Tournament MVP",
    detail: "Most Valuable Player at both the Pine Valley and Redwood Christian tournaments.",
  },
  {
    date: "June 2024",
    pillar: "Author",
    title: "First Book — Boys Raised in Silence",
    detail: "A collection on the cost of silence and the courage to speak, part of an official ten-book catalog.",
    link: { label: "Read the book", href: "/books/boys-raised-in-silence" },
  },
  {
    date: "September 2024",
    pillar: "Author",
    title: "Poems from a Black Boy",
    detail: "Raw verse on belonging, history, and becoming — the second collection, published the same year as the first.",
    link: { label: "Read the book", href: "/books/poems-black-boy" },
  },
  {
    date: "2024",
    pillar: "Athletics",
    title: "Varsity Captain & CaliHoop Top Team",
    detail: "Named team captain at Cristo Rey De La Salle and selected for CaliHoop's elite team recognition.",
    link: { label: "MaxPreps profile", href: "https://www.maxpreps.com/ca/concord/ygnacio-valley-wolves/athletes/kiminou-knox/?careerid=3flsq42m4bpcc" },
  },
  {
    date: "January – February 2025",
    pillar: "Author",
    title: "Five Books in One Winter",
    detail: "The Spirit of Solomon, The Adventures of Kiminou the Great and Chua the Wise, Black Boy Poems, Kiminou's World of Imagination, and Our Father? — five collections released within a few months of each other.",
    link: { label: "Browse the collection", href: "/books" },
  },
  {
    date: "February 2025",
    pillar: "Community",
    title: "Miles Hall Foundation Youth Summit — Top Essay Winner",
    detail: "Recognized for an essay on youth advocacy and mental health, addressing community issues through personal narrative.",
    link: { label: "See the announcement", href: "https://www.themileshallfoundation.org/post/youth-summit-essay-finalist" },
  },
  {
    date: "March 2025",
    pillar: "Author",
    title: "Eighth Book — Hopeless Romantic",
    detail: "An intimate collection on longing, closure, and the courage to stay tender — one of the most-read regular books.",
    link: { label: "Read the book", href: "/books/hopeless-romantic" },
  },
  {
    date: "May 2025",
    pillar: "Community",
    title: "Essay Recognition, Continued",
    detail: "A second recognition tied to youth advocacy and mental health work, continuing a grandmother's legacy of community leadership.",
    link: { label: "See the announcement", href: "https://www.themileshallfoundation.org/post/youth-summit-essay-finalist" },
  },
  {
    date: "2025",
    pillar: "Athletics",
    title: "Varsity Athlete, Cristo Rey De La Salle",
    detail: "Competing as a forward/center, 6'8\", representing Cristo Rey De La Salle in basketball and football.",
    link: { label: "NCSA profile", href: "https://www.ncsasports.org/mens-basketball-recruiting/california/concord/ygnacio-valley-high-school/kiminou-knox" },
  },
  {
    date: "Ongoing",
    pillar: "Builder",
    title: "Director, AAFC",
    detail: "Directing Artists & Athletes For Change — youth development work that connects the same pillars this timeline is built on.",
    link: { label: "View AAFC", href: "https://www.kiminouknox.com" },
  },
  {
    date: "Ongoing",
    pillar: "Voice",
    title: "Host, KimYaps Podcast",
    detail: "Honest conversations about pain, purpose, and grace — carrying the written voice from the page into audio.",
    link: { label: "Listen to KimYaps", href: "/speaking" },
  },
];

const PILLAR_COLOR: Record<Milestone["pillar"], string> = {
  Author: "text-amber-300 border-amber-400/30",
  Athletics: "text-sky-300 border-sky-400/25",
  Community: "text-rose-300 border-rose-400/25",
  Builder: "text-emerald-300 border-emerald-400/25",
  Voice: "text-violet-300 border-violet-400/25",
};

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>
      {children}
    </motion.div>
  );
}

function MilestoneRow({ milestone, index }: { milestone: Milestone; index: number }) {
  const Content = (
    <div className="group flex flex-col md:flex-row gap-4 md:gap-10 py-8 border-t border-white/8 first:border-t-0">
      <div className="md:w-40 flex-shrink-0">
        <p className="text-xs uppercase tracking-[0.3em] text-white/30">{milestone.date}</p>
        <span className={`inline-block mt-2 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] border rounded-full ${PILLAR_COLOR[milestone.pillar]}`}>
          {milestone.pillar}
        </span>
      </div>
      <div className="flex-1">
        <h3 className="font-serif text-2xl text-white/90 mb-2 group-hover:text-amber-100 transition-colors duration-300">
          {milestone.title}
        </h3>
        <p className="text-sm text-white/40 leading-relaxed max-w-2xl">{milestone.detail}</p>
        {milestone.link && (
          <span className="inline-flex items-center gap-1.5 mt-4 text-xs uppercase tracking-[0.2em] text-amber-400/60 group-hover:text-amber-300 transition-colors duration-300">
            {milestone.link.label} <ArrowUpRight className="w-3 h-3" />
          </span>
        )}
      </div>
    </div>
  );

  return (
    <Reveal delay={Math.min(index, 4) * 0.05}>
      {milestone.link?.href.startsWith("/") ? (
        <Link href={milestone.link.href}>
          <div className="cursor-pointer">{Content}</div>
        </Link>
      ) : milestone.link ? (
        <a href={milestone.link.href} target="_blank" rel="noopener noreferrer external" className="block">
          {Content}
        </a>
      ) : (
        Content
      )}
    </Reveal>
  );
}

export default function LegacyTimeline() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Legacy Timeline — Kiminou Knox",
    "url": `${SITE_URL}/legacy`,
    "itemListElement": MILESTONES.map((m, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": m.title,
      "description": m.detail,
    })),
  };

  return (
    <>
      <Helmet>
        <title>Legacy Timeline — Kiminou Knox</title>
        <meta
          name="description"
          content="The record so far: books, athletic milestones, community recognition, and builder work from Kiminou Knox — author, athlete, speaker, and program director."
        />
        <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
        <link rel="canonical" href={`${SITE_URL}/legacy`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Legacy Timeline — Kiminou Knox" />
        <meta property="og:description" content="Books, athletic milestones, community recognition, and builder work — the record so far." />
        <meta property="og:url" content={`${SITE_URL}/legacy`} />
        <meta property="og:site_name" content="Kiminou Knox" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@KnoxKiminou" />
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema([
            { name: "Home", url: SITE_URL },
            { name: "Author", url: `${SITE_URL}/author` },
            { name: "Legacy Timeline", url: `${SITE_URL}/legacy` },
          ]))}
        </script>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Header />

      <main id="main-content" className="min-h-screen bg-black text-white">
        <section className="relative pt-40 pb-20 overflow-hidden" ref={heroRef}>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-amber-500/4 rounded-full blur-[160px]" />
          </div>
          <div className="max-w-4xl mx-auto px-6 lg:px-10">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
              <p className="text-xs uppercase tracking-[0.4em] text-amber-400/60 mb-5 font-medium">The Record So Far</p>
              <h1 className="font-serif text-6xl md:text-8xl font-light leading-tight mb-6">
                Legacy <span className="italic text-amber-200/90">Timeline</span>
              </h1>
              <div className="w-12 h-px bg-amber-400/50 mb-8" />
              <p className="text-base text-white/45 max-w-xl leading-relaxed">
                Author, athlete, speaker, builder — one thread, told in order. Books, milestones, recognition, and the work still in motion.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="pb-28 border-t border-white/6">
          <div className="max-w-4xl mx-auto px-6 lg:px-10 pt-4">
            {MILESTONES.map((milestone, i) => (
              <MilestoneRow key={`${milestone.date}-${milestone.title}`} milestone={milestone} index={i} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
