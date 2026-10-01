import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { PageHero, Section, CtaBand } from "@/components/Page";
import Seo from "@/components/Seo";

/**
 * /author — the bio page. Verified facts only:
 * short bio, ten books, the lanes, the timeline anchors.
 */

const lanes = [
  {
    title: "Author",
    body: "Ten published books across poetry, faith, identity, love, family, imagination, and youth storytelling — including the Black Boy Lie universe.",
    href: "/books",
    label: "Browse the library",
  },
  {
    title: "Speaker",
    body: "Three signature talks for schools, teams, youth programs, and faith communities — on discipline, voice, and the cost of silence.",
    href: "/speaking",
    label: "See the talks",
  },
  {
    title: "Athlete",
    body: "6\u20198\u2033 forward/center out of the Bay Area. The court was the first classroom \u2014 discipline, coaching, and showing up daily.",
    href: "/sports",
    label: "The discipline chapter",
  },
  {
    title: "Voice",
    body: "Host of KimYaps — honest conversations about navigating pain, finding purpose, and giving grace. On Apple Podcasts, Spotify, and Amazon Music.",
    href: "/speaking",
    label: "Listen to KimYaps",
  },
];

const anchors = [
  { year: "Bay Area", text: "Raised in the Bay Area, California — where the writing started and the game was built." },
  { year: "2024–2026", text: "Ten books published — poetry, children's stories, and confessions in verse." },
  { year: "2025", text: "Top essay winner at the Miles Hall Foundation's Breaking Barriers Youth Summit (February 2025), for writing on youth advocacy and mental health." },
  { year: "Next", text: "Writing, building, and speaking — the next chapter, wherever it lands." },
];

export default function Author() {
  return (
    <>
      <Seo
        title="Kiminou Knox | Author Profile"
        description="Author profile for Kiminou Knox, a young Bay Area writer with published books across poetry, faith, identity, love, and voice."
        path="/author"
        image="/photos/kiminou-knox/kiminou-knox-official-author-headshot-2026.jpg"
      />
      <main className="bg-(--kk-paper) text-(--kk-ink)">
      <PageHero
        eyebrow="Bio"
        title={
          <>
            Kiminou <em className="italic">Knox.</em>
          </>
        }
        lede="Bay Area raised. Author of ten books, speaker, 6\u20198\u2033 forward/center, and host of the KimYaps podcast \u2014 building a body of work about discipline, identity, and voice."
      />

      {/* ——— Portrait + bio ——— */}
      <Section>
        <div className="grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-16 items-start">
          <figure>
            <img
              src="/photos/kiminou-knox/kiminou-knox-author-casual-outdoor-portrait-2025.jpg"
              alt="Kiminou Knox, casual outdoor portrait, 2025"
              className="w-full max-w-sm rounded-sm shadow-lg"
              loading="lazy"
            />
            <figcaption className="mt-3 text-sm text-(--kk-ink)/55">
              Outdoor portrait, 2025.
            </figcaption>
          </figure>
          <div className="space-y-6 text-lg md:text-xl leading-relaxed text-(--kk-ink)/80 max-w-2xl">
            <p>
              Kiminou Knox is a Bay Area raised author and
              poet with ten published books. He writes across poetry, faith,
              identity, love, family, imagination, and youth storytelling, and
              is the creator of the Black Boy Lie universe.
            </p>
            <p>
              His essay was named the top essay at the Miles Hall
              Foundation's Breaking Barriers Youth Summit in February 2025.
              He speaks to schools, teams, and youth programs on
              discipline, voice, and the cost of silence — and hosts KimYaps, a
              podcast about navigating pain, finding purpose, and giving grace.
            </p>
            <p>
              Before the books, there was basketball: a 6'8" forward/center
              whose mornings in the gym became the template for everything —
              the writing, the building, the businesses.
            </p>
          </div>
        </div>
      </Section>

      {/* ——— Lanes ——— */}
      <Section eyebrow="The Lanes" title="One person, four fronts">
        <div className="grid gap-6 md:grid-cols-2">
          {lanes.map((l) => (
            <div
              key={l.title}
              className="rounded-sm border border-(--kk-ink)/12 bg-(--kk-card) p-8"
            >
              <h3 className="font-serif text-2xl">{l.title}</h3>
              <p className="mt-3 text-(--kk-ink)/70 leading-relaxed">{l.body}</p>
              <Link href={l.href}>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-(--kk-ink) underline underline-offset-4 decoration-(--kk-brass)/60 hover:decoration-(--kk-brass) cursor-pointer">
                  {l.label} <ArrowRight className="w-4 h-4" aria-hidden />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </Section>

      {/* ——— Anchors ——— */}
      <Section dark eyebrow="Anchors" title="Where the story stands">
        <ol className="max-w-3xl divide-y divide-(--kk-paper)/12 border-y border-(--kk-paper)/12">
          {anchors.map((a) => (
            <li key={a.year} className="py-7 grid gap-2 md:grid-cols-[160px_1fr] md:gap-8">
              <span className="font-serif text-2xl text-(--kk-gold)">{a.year}</span>
              <p className="text-lg leading-relaxed text-(--kk-paper)/75">{a.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <CtaBand
        title="Work with Kiminou."
        text="Speaking, press, collaborations, or just a real conversation — it all starts here."
        href="/contact"
        label="Get in touch"
      />
    </main>
    </>
  );
}
