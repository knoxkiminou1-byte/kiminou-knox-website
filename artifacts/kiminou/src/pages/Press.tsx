import { ArrowUpRight, Download } from "lucide-react";
import { PageHero, Section, CtaBand } from "@/components/Page";
import Seo from "@/components/Seo";

/**
 * /press — for media, schools, and collaborators.
 * Verified bio, real recognition, real links. No invented coverage.
 */

const shortBio =
  "Kiminou Knox is a Bay Area raised author and poet with ten published books. He writes across poetry, faith, identity, love, family, imagination, and youth storytelling, and is the creator of the Black Boy Lie universe. His essay was named the top essay at the Miles Hall Foundation's Breaking Barriers Youth Summit in February 2025.";

const facts = [
  { label: "Published books", value: "10" },
  { label: "Raised", value: "Bay Area" },
  { label: "Based", value: "New Orleans" },
  { label: "Universe", value: "Black Boy Lie" },
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

export default function Press() {
  return (
    <>
      <Seo
        title="Press & Recognition - Kiminou Knox"
        description="Press, recognition, biography, official links, and media resources for Kiminou Knox."
        path="/press"
        image="/photos/kiminou-knox/kiminou-knox-official-author-headshot-2026.jpg"
      />
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

      {/* ——— Bio ——— */}
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

      {/* ——— Recognition ——— */}
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

      {/* ——— Verified links ——— */}
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
