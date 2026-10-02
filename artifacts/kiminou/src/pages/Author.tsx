import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { PageHero, Section, CtaBand } from "@/components/Page";
import Seo from "@/components/Seo";

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
    body: "6’8″ forward/center out of the Bay Area. The court was the first classroom — discipline, coaching, and showing up daily.",
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
  { year: "2024–2026", text: "Ten books published across poetry, children’s storytelling, faith, identity, love, and family." },
  { year: "2025", text: "Top essay winner at the Miles Hall Foundation’s Breaking Barriers Youth Summit in February 2025." },
  { year: "Now", text: "Writing, building, speaking, recording, and carrying the discipline of the court into every lane." },
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
          lede="Bay Area raised. Author of ten books, speaker, 6’8″ forward/center, and host of the KimYaps podcast — building a body of work about discipline, identity, and voice."
        />

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
                Kiminou Knox is a Bay Area raised author and poet with ten published books.
                He writes across poetry, faith, identity, love, family, imagination, and youth
                storytelling, and is the creator of the Black Boy Lie universe.
              </p>
              <p>
                His essay was named the top essay at the Miles Hall Foundation’s Breaking
                Barriers Youth Summit in February 2025. He speaks to schools, teams, and youth
                programs on discipline, voice, and the cost of silence — and hosts KimYaps, a
                podcast about navigating pain, finding purpose, and giving grace.
              </p>
              <p>
                Before the books, there was basketball: a 6'8" forward/center whose mornings
                in the gym became the template for everything — the writing, the building, and
                the businesses.
              </p>
            </div>
          </div>
        </Section>

        <Section eyebrow="Two Disciplines" title="The court and the page use the same muscle">
          <div className="grid overflow-hidden rounded-sm border border-(--kk-ink)/12 md:grid-cols-2">
            <div className="bg-(--kk-ink) p-8 text-(--kk-paper) md:p-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-(--kk-gold)">The athlete</p>
              <h3 className="mt-4 font-serif text-4xl">Reps before applause.</h3>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-(--kk-paper)/68">
                Film, training, recovery, correction, another rep. Basketball made repetition normal
                before the books ever asked for it.
              </p>
              <Link
                href="/sports"
                className="mt-7 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-(--kk-gold)"
              >
                Open the athletic chapter <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <div className="bg-(--kk-card) p-8 md:p-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-(--kk-brass)">The author</p>
              <h3 className="mt-4 font-serif text-4xl">Pages before permission.</h3>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-(--kk-ink)/68">
                Draft, revise, publish, learn, write again. Ten books came from treating the page
                with the same daily seriousness as the gym.
              </p>
              <Link
                href="/books"
                className="mt-7 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-(--kk-ink)"
              >
                Open the library <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </Section>

        <Section eyebrow="The Lanes" title="One person, four fronts">
          <div className="grid gap-6 md:grid-cols-2">
            {lanes.map((lane) => (
              <div
                key={lane.title}
                className="rounded-sm border border-(--kk-ink)/12 bg-(--kk-card) p-8"
              >
                <h3 className="font-serif text-2xl">{lane.title}</h3>
                <p className="mt-3 text-(--kk-ink)/70 leading-relaxed">{lane.body}</p>
                <Link href={lane.href}>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-(--kk-ink) underline underline-offset-4 decoration-(--kk-brass)/60 hover:decoration-(--kk-brass) cursor-pointer">
                    {lane.label} <ArrowRight className="w-4 h-4" aria-hidden />
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </Section>

        <Section dark eyebrow="The Constellation" title="The record connects">
          <div className="relative max-w-5xl">
            <div
              className="absolute left-5 top-5 bottom-5 w-px bg-(--kk-paper)/18 md:left-[7%] md:right-[7%] md:top-5 md:bottom-auto md:h-px md:w-auto"
              aria-hidden
            />
            <ol className="relative grid gap-8 md:grid-cols-4 md:gap-6">
              {anchors.map((anchor, index) => (
                <li key={anchor.year} className="relative pl-12 md:pl-0 md:pt-12">
                  <span
                    className="absolute left-[14px] top-1.5 h-3 w-3 rounded-full border-2 border-(--kk-gold) bg-(--kk-ink) md:left-1/2 md:top-[-1px] md:-translate-x-1/2"
                    aria-hidden
                  />
                  <p className="font-serif text-2xl text-(--kk-gold)">{anchor.year}</p>
                  <p className="mt-3 leading-relaxed text-(--kk-paper)/68">{anchor.text}</p>
                  <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-(--kk-paper)/35">
                    Point {String(index + 1).padStart(2, "0")}
                  </p>
                </li>
              ))}
            </ol>
          </div>
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
