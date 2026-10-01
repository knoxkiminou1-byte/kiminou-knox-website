import { Link } from "wouter";
import { Headphones, ArrowUpRight } from "lucide-react";
import { PageHero, Section, CtaBand } from "@/components/Page";
import Seo from "@/components/Seo";

/**
 * /speaking — the business page. Real talks, real podcast, booking CTA.
 * No FX, no fake players: the audio below is the actual episode file.
 */

export const talks = [
  {
    num: "01",
    title: "Discipline and Faith in Daily Practice",
    body: "A practical talk on building habits that hold up under real pressure. It connects athletics, writing, structure, and spiritual grounding without turning discipline into performance.",
    tags: ["Schools", "Teams", "Faith"],
    tagline: "Show up. Do the work. Leave every space better than you found it.",
  },
  {
    num: "02",
    title: "Black Boy Voice and the Cost of Silence",
    body: "A conversation about identity, pressure, tenderness, and the language many young men are never given. The focus is honesty, not slogans.",
    tags: ["Youth", "Schools", "Community"],
    tagline: "The most dangerous thing you can do is stay silent when you have something real to say.",
  },
  {
    num: "03",
    title: "Building Creative Work That Lasts",
    body: "A grounded session for young creators on developing a practice, finishing projects, sharing work, and keeping integrity in a fast-moving digital world.",
    tags: ["Youth", "Community", "Schools"],
    tagline: "Prepare seriously. Stay close to the people you serve. Finish what you start.",
  },
];

const faqs = [
  {
    q: "What kinds of events does Kiminou speak at?",
    a: "School assemblies, team events, youth programs, community gatherings, and faith-centered conversations are all a fit when the room wants a direct and grounded message.",
  },
  {
    q: "What does a typical talk cover?",
    a: "Most talks connect discipline, identity, faith, writing, grief, and the work of finding a voice without performing one.",
  },
  {
    q: "How do you book Kiminou Knox?",
    a: "Use the booking form on the contact page. Include the audience, date window, and what you want the room to leave with.",
  },
  {
    q: "What is KimYaps?",
    a: "KimYaps is Kiminou's podcast — honest conversations about navigating pain, finding purpose, and giving yourself and others a little extra grace. Available on Apple Podcasts, Spotify, and Amazon Music.",
  },
];

const podcastLinks = [
  { name: "Apple Podcasts", href: "https://podcasts.apple.com/us/podcast/kimyaps/id1850364308" },
  { name: "Spotify", href: "https://open.spotify.com/show/4TB8QKI52yaGIFDOCCkrYg" },
  { name: "Amazon Music", href: "https://music.amazon.com/podcasts/3db7d37c-3071-4eba-9fea-cadc50f5c543/kimyaps" },
  { name: "YouTube", href: "https://www.youtube.com/@KiminouKnoxOfficial" },
];

const episodes = [
  {
    title: "Studio Session",
    note: "Full episode · 35 min · KimYaps archive",
    src: "/audio/kimyaps-kiminou-09-studio.m4a",
  },
  {
    title: "Studio Cut",
    note: "Full episode · 32 min · KimYaps archive",
    src: "/audio/kimyaps-magic-episode-01.m4a",
  },
];

export default function Speaking() {
  return (
    <>
      <Seo
        title="Speaking & KimYaps Podcast - Kiminou Knox"
        description="Book Kiminou Knox for talks on discipline, Black boy voice, faith, youth leadership, writing, athletics, and creative work, or tune into KimYaps podcast episodes."
        path="/speaking"
        image="/photos/kiminou-knox/kiminou-knox-official-author-headshot-2026.jpg"
      />
      <main className="bg-(--kk-paper) text-(--kk-ink)">
      <PageHero
        eyebrow="Speaking & Voice"
        title={
          <>
            A voice the room <em className="italic">remembers.</em>
          </>
        }
        lede="Kiminou speaks to schools, teams, youth programs, and faith communities — on discipline, identity, and the work of finding a voice without performing one."
        stats={[
          { label: "Signature talks", value: "3" },
          { label: "Podcast", value: "KimYaps" },
          { label: "Home base", value: "New Orleans" },
        ]}
      />

      {/* ——— Talks ——— */}
      <Section eyebrow="Signature Talks" title="What he brings to the room">
        <ol className="divide-y divide-(--kk-ink)/12 border-y border-(--kk-ink)/12">
          {talks.map((t) => (
            <li key={t.num} className="py-10 md:py-12 grid gap-6 md:grid-cols-[80px_1fr] md:gap-10">
              <span className="font-serif text-4xl md:text-5xl text-(--kk-brass)">{t.num}</span>
              <div>
                <h3 className="font-serif text-2xl md:text-3xl leading-tight">{t.title}</h3>
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-(--kk-ink)/70">{t.body}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {t.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-semibold uppercase tracking-[0.18em] border border-(--kk-ink)/20 rounded-full px-3 py-1.5 text-(--kk-ink)/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="mt-6 border-l-2 border-(--kk-brass) pl-5 text-lg text-(--kk-ink)/75 max-w-xl">
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.22em] text-(--kk-ink)/50 not-italic mb-1.5">
                    The takeaway
                  </span>
                  <span className="font-serif italic text-xl text-(--kk-ink)/85">{t.tagline}</span>
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* ——— Podcast ——— */}
      <Section dark eyebrow="KimYaps" title="The podcast">
        <p className="max-w-2xl text-lg leading-relaxed text-(--kk-paper)/70">
          Honest conversations about navigating pain, finding purpose, and giving
          yourself — and others — a little extra grace.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {podcastLinks.map((p) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-(--kk-paper)/25 px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.14em] text-(--kk-paper)/85 transition-colors hover:border-(--kk-gold) hover:text-(--kk-gold)"
            >
              <Headphones className="w-4 h-4" aria-hidden />
              {p.name}
              <ArrowUpRight className="w-4 h-4" aria-hidden />
            </a>
          ))}
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {episodes.map((ep) => (
            <figure
              key={ep.src}
              className="rounded-sm border border-(--kk-paper)/15 bg-(--kk-paper)/5 p-6"
            >
              <figcaption>
                <p className="font-serif text-xl">{ep.title}</p>
                <p className="mt-1 text-sm uppercase tracking-[0.18em] text-(--kk-paper)/50">
                  {ep.note}
                </p>
              </figcaption>
              <audio controls preload="none" src={ep.src} className="mt-5 w-full">
                Your browser does not support the audio element.
              </audio>
            </figure>
          ))}
        </div>
      </Section>

      {/* ——— FAQ ——— */}
      <Section eyebrow="Booking Notes" title="Before you reach out">
        <dl className="grid gap-x-12 gap-y-10 md:grid-cols-2 max-w-5xl">
          {faqs.map((f) => (
            <div key={f.q}>
              <dt className="font-serif text-xl md:text-2xl">{f.q}</dt>
              <dd className="mt-3 text-(--kk-ink)/70 leading-relaxed">{f.a}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <CtaBand
        title="Bring Kiminou to your room."
        text="Schools, teams, youth programs, and faith communities — tell us the audience, the date window, and what the room should leave with."
        href="/contact"
        label="Start a booking inquiry"
      />
    </main>
    </>
  );
}
