import { Component, type ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowUpRight } from "lucide-react";
import { PageHero, Section, CtaBand } from "@/components/Page";
import Seo from "@/components/Seo";

/**
 * /press — for media, schools, and collaborators.
 *
 * Hardened after the 2026-10-05 outage: the old page threw during render
 * (retired image-catalog id) and blanked the route. This version is static
 * first — every word is inline, the only asset is one local headshot, and
 * there are no data imports, no fetches, no remote dependencies.
 *
 * Two guarantees:
 * 1. <Seo> + JSON-LD always render, even if a body section fails.
 * 2. Each body section sits inside a SectionGuard, so one bad section can
 *    never blank the page again.
 *
 * Content rule: verified facts only. Anything unverifiable is omitted, never
 * invented. (See ~/workspace/personal-profile/fixes/05-press-page-content.md
 * for the draft and its NEEDS-FROM-KIMINOU list.)
 */

/** Localized error guard: a failing section degrades to nothing; the rest of
 *  the page — and always the SEO head — still renders. Exported for tests. */
export class SectionGuard extends Component<
  { children: ReactNode; label: string },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    // eslint-disable-next-line no-console
    console.error(`[Press] section "${this.props.label}" failed:`, error);
  }

  render() {
    if (this.state.failed) return null;
    return <>{this.props.children}</>;
  }
}

const shortBio =
  "Kiminou Knox is a 20-year-old author and poet from East Palo Alto. He grew up in the Bay Area, spent his senior year of high school in Concord, and is now based in New Orleans. He has published ten books, hosts the KimYaps podcast, and serves as Director of Artists and Athletes for Change. His work explores Black identity, resilience, masculinity, and faith.";

/** Canonical ten-book list, verified against src/content/books.json (the
 *  repo's locked book source). Hardcoded inline — no data import, so a
 *  malformed catalog file can never break this page. */
const books = [
  { title: "The Spirit of Solomon", year: "2025" },
  { title: "Our Father?", year: "2025" },
  { title: "Poems from a Black Boy", year: "2024" },
  { title: "Black Boy Poems", year: "2024" },
  { title: "Hopeless Romantic", year: "2025" },
  { title: "Boys Raised in Silence", year: "2024" },
  { title: "The Adventures of Kiminou the Great and Chua the Wise", year: "2025" },
  { title: "Kiminou's World of Imagination: The Basics", year: "2026" },
  { title: "Why Did You Ghost Me", year: "2026" },
  { title: "7.16.74: An Ode to Rashida", year: "2026" },
];

const facts = [
  { label: "Published books", value: "10" },
  { label: "From", value: "East Palo Alto" },
  { label: "Based", value: "New Orleans" },
  { label: "Role", value: "Director, AAFC" },
];

const recognition = [
  {
    date: "2025",
    source: "Miles Hall Foundation",
    headline: "Breaking Barriers Youth Summit — Top Essay Winner",
    detail:
      "His essay was named the top essay at the Miles Hall Foundation's February 2025 Breaking Barriers Youth Summit — writing on youth advocacy, mental health, and Black brotherhood through personal narrative and lived experience.",
    link: "https://www.themileshallfoundation.org/post/youth-summit-essay-finalist",
  },
];

const linkGroups = [
  {
    label: "Books",
    items: [
      { name: "Amazon Author Store", href: "https://www.amazon.com/author/kiminou" },
      { name: "Goodreads Author Profile", href: "https://www.goodreads.com/author/show/55621683.Kiminou_Knox" },
    ],
  },
  {
    label: "Athletics",
    items: [
      { name: "MaxPreps Profile", href: "https://www.maxpreps.com/ca/concord/ygnacio-valley-wolves/athletes/kiminou-knox/?careerid=3flsq42m4bpcc" },
      { name: "NCSA Recruiting Profile", href: "https://www.ncsasports.org/mens-basketball-recruiting/california/concord/ygnacio-valley-high-school/kiminou-knox" },
      { name: "Prep Hoops Profile", href: "https://prephoops.com/player/kiminou-knox/" },
    ],
  },
  {
    label: "Voice",
    items: [
      { name: "KimYaps on Apple Podcasts", href: "https://podcasts.apple.com/us/podcast/kimyaps/id1850364308" },
      { name: "KimYaps on Spotify", href: "https://open.spotify.com/show/4TB8QKI52yaGIFDOCCkrYg" },
      { name: "YouTube — @KiminouKnoxOfficial", href: "https://www.youtube.com/@KiminouKnoxOfficial" },
      { name: "Medium Essays", href: "https://medium.com/@knoxkiminou1" },
    ],
  },
  {
    label: "Profiles",
    items: [
      { name: "LinkedIn", href: "https://www.linkedin.com/in/kiminou-knox-50691a394/" },
      { name: "TikTok", href: "https://www.tiktok.com/@kiminou.knox" },
    ],
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Kiminou Knox",
  url: "https://kiminouknox.com",
  jobTitle: "Director, Artists and Athletes for Change",
  worksFor: {
    "@type": "Organization",
    name: "Artists and Athletes for Change",
  },
  sameAs: [
    "https://www.amazon.com/author/kiminou",
    "https://www.goodreads.com/author/show/55621683.Kiminou_Knox",
    "https://podcasts.apple.com/us/podcast/kimyaps/id1850364308",
    "https://open.spotify.com/show/4TB8QKI52yaGIFDOCCkrYg",
    "https://www.youtube.com/@KiminouKnoxOfficial",
    "https://www.linkedin.com/in/kiminou-knox-50691a394/",
  ],
};

export default function Press() {
  return (
    <>
      {/* SEO head renders unconditionally — it is outside every guard. */}
      <Seo
        title="Press & Recognition - Kiminou Knox"
        description="Press, recognition, biography, official links, and media resources for Kiminou Knox."
        path="/press"
        image="/photos/kiminou-knox/kiminou-knox-official-author-headshot-2026.jpg"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <main className="bg-(--kk-paper) text-(--kk-ink)">
        <PageHero
          eyebrow="Press & Recognition"
          title={
            <>
              The record, <em className="italic">verified.</em>
            </>
          }
          lede="Everything on this page is real and checkable: the bio, the recognition, the profiles. For anything else, ask — don't assume."
        />

        <SectionGuard label="Biography">
          <Section eyebrow="Biography" title="Short bio">
            <div className="grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-16 items-start">
              <figure>
                <img
                  src="/photos/kiminou-knox/kiminou-knox-official-author-headshot-2026.jpg"
                  alt="Official author headshot of Kiminou Knox, 2026"
                  className="w-full max-w-sm rounded-sm shadow-lg"
                  loading="lazy"
                />
                <figcaption className="mt-3 text-sm text-(--kk-ink)/55">
                  Official headshot, 2026. Free to use with credit.
                </figcaption>
              </figure>
              <div>
                <p className="text-xl md:text-2xl leading-relaxed font-serif">{shortBio}</p>
                <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6 max-w-md">
                  {facts.map((f) => (
                    <div key={f.label} className="border-t border-(--kk-ink)/15 pt-4">
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.24em] text-(--kk-ink)/45">
                        {f.label}
                      </dt>
                      <dd className="font-serif text-2xl mt-1">{f.value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-8 text-(--kk-ink)/60 leading-relaxed max-w-xl">
                  For interviews, features, or event programs: a full press kit with
                  high-resolution photos is available on request.
                </p>
              </div>
            </div>
          </Section>
        </SectionGuard>

        <SectionGuard label="Books">
          <Section eyebrow="Catalog" title="Ten published books">
            <ol className="max-w-3xl divide-y divide-(--kk-ink)/12 border-y border-(--kk-ink)/12">
              {books.map((b, i) => (
                <li key={b.title} className="py-4 flex items-baseline gap-6">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-(--kk-ink)/45 w-8 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-serif text-xl">{b.title}</span>
                  <span className="ml-auto text-sm text-(--kk-ink)/50 shrink-0">{b.year}</span>
                </li>
              ))}
            </ol>
          </Section>
        </SectionGuard>

        <SectionGuard label="Recognition">
          <Section eyebrow="Recognition" title="On the record">
            <ul className="max-w-3xl divide-y divide-(--kk-ink)/12 border-y border-(--kk-ink)/12">
              {recognition.map((r) => (
                <li key={r.headline} className="py-8">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-(--kk-brass)">
                    {r.date} · {r.source}
                  </p>
                  <h3 className="font-serif text-2xl mt-2">{r.headline}</h3>
                  <p className="mt-3 text-(--kk-ink)/70 leading-relaxed">{r.detail}</p>
                  <a
                    href={r.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.16em] text-(--kk-ink) underline underline-offset-4 decoration-(--kk-brass)/60 hover:decoration-(--kk-brass)"
                  >
                    View announcement <ArrowUpRight className="w-4 h-4" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </Section>
        </SectionGuard>

        <SectionGuard label="Verified links">
          <Section dark eyebrow="Verify Everything" title="Public profiles">
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
              {linkGroups.map((g) => (
                <div key={g.label}>
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-(--kk-gold)">
                    {g.label}
                  </h3>
                  <ul className="mt-5 space-y-3">
                    {g.items.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-1.5 text-(--kk-paper)/85 hover:text-(--kk-gold) transition-colors"
                        >
                          <span className="underline underline-offset-4 decoration-(--kk-paper)/20 group-hover:decoration-(--kk-gold)/60">
                            {item.name}
                          </span>
                          <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>
        </SectionGuard>

        <CtaBand
          title="Working on a story?"
          text="For interviews, features, photos, or fact-checking, reach out directly — you'll hear back from the source."
          href="/contact"
          label="Contact for press"
        />
      </main>
    </>
  );
}
