import { ArrowUpRight } from "lucide-react";
import { PageHero, Section, CtaBand } from "@/components/Page";
import Seo from "@/components/Seo";

/**
 * /sports — the discipline chapter, not a sports resume.
 * Verified measurables and real recruiting profiles only. No invented stats.
 */

const measurables = [
  { label: "Height", value: "6'8\"", source: "as listed on his NCSA recruiting profile" },
  { label: "Position", value: "F / C", source: "via MaxPreps" },
  { label: "High school", value: "Ygnacio Valley", source: "via MaxPreps" },
];

const profiles = [
  {
    name: "NCSA Sports",
    desc: "Complete athletic profile — measurements, position, and school.",
    href: "https://www.ncsasports.org/mens-basketball-recruiting/california/concord/ygnacio-valley-high-school/kiminou-knox",
  },
  {
    name: "MaxPreps",
    desc: "Public career profile and high school basketball record.",
    href: "https://www.maxpreps.com/ca/concord/ygnacio-valley-wolves/athletes/kiminou-knox/?careerid=3flsq42m4bpcc",
  },
];

const photos = [
  {
    src: "/photos/kiminou-knox/kiminou-knox-basketball-game-action.jpg",
    alt: "Kiminou Knox in game action on the basketball court",
    caption: "Game action",
  },
  {
    src: "/photos/kiminou-knox/kiminou-knox-basketball-huddle.jpg",
    alt: "Kiminou Knox with teammates in a courtside huddle",
    caption: "With the team",
  },
  {
    src: "/photos/kiminou-knox/kiminou-knox-basketball-jump-shot.jpg",
    alt: "Kiminou Knox rising for a jump shot",
    caption: "Rising up",
  },
];

export default function Sports() {
  return (
    <>
      <Seo
        title="Sports & Athletics - Kiminou Knox"
        description="Athletic profile for Kiminou Knox, Bay Area basketball player and multi-sport athlete with recruiting and performance links."
        path="/sports"
        image="/photos/kiminou-knox/kiminou-knox-basketball-jump-shot.jpg"
      />
      <main className="bg-(--kk-paper) text-(--kk-ink)">
      <PageHero
        eyebrow="Athletics"
        title={
          <>
            The court made <em className="italic">the builder.</em>
          </>
        }
        lede="Before the ten books and the businesses, there was the gym — early mornings, film sessions, and the daily proof that showing up compounds."
        stats={[
          { label: "Height", value: "6'8\"" },
          { label: "Position", value: "Forward / Center" },
          { label: "Game", value: "Basketball" },
        ]}
      />

      {/* ——— The discipline chapter ——— */}
      <Section eyebrow="The Discipline Chapter" title="What basketball taught him">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16 max-w-5xl">
          <div className="space-y-6 text-lg leading-relaxed text-(--kk-ink)/75">
            <p>
              Basketball was Kiminou's first masterclass in work ethic. The
              routine was non-negotiable: train, study film, lift, recover,
              repeat. Nobody claps for the sixth morning workout in a row —
              that's the point.
            </p>
            <p>
              The same discipline runs everything he builds now. Ten books
              didn't happen by inspiration; they happened the way a jump shot
              gets built — reps, correction, more reps. The businesses run the
              same way. The podcast runs the same way.
            </p>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-(--kk-ink)/75">
            <p>
              The court also taught him how to take coaching — to hear hard
              feedback without flinching and turn it into the next rep. And it
              taught him the team lesson: individual talent means nothing if
              the five don't move as one.
            </p>
            <p className="font-serif italic text-xl text-(--kk-ink)/85 border-l-2 border-(--kk-brass) pl-5">
              &ldquo;Discipline is just remembering what you want most over
              what you want now — every single morning.&rdquo;
            </p>
          </div>
        </div>
      </Section>

      {/* ——— Photos ——— */}
      <section>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 md:py-24">
          <div className="grid gap-6 md:grid-cols-3">
            {photos.map((p) => (
              <figure key={p.src}>
                <img
                  src={p.src}
                  alt={p.alt}
                  className="w-full aspect-[4/5] object-cover rounded-sm shadow-md"
                  loading="lazy"
                />
                <figcaption className="mt-3 text-sm uppercase tracking-[0.18em] text-(--kk-ink)/55">
                  {p.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Measurables + profiles ——— */}
      <Section dark eyebrow="The Profile" title="Measurables & verified profiles">
        <dl className="grid gap-8 sm:grid-cols-3 max-w-4xl">
          {measurables.map((m) => (
            <div key={m.label} className="border-t border-(--kk-paper)/20 pt-5">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.24em] text-(--kk-paper)/50">
                {m.label}
              </dt>
              <dd className="font-serif text-4xl mt-2">{m.value}</dd>
              <dd className="mt-2 text-sm text-(--kk-paper)/50">{m.source}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-12 grid gap-6 md:grid-cols-2 max-w-3xl">
          {profiles.map((p) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-sm border border-(--kk-paper)/15 bg-(--kk-paper)/5 p-6 transition-colors hover:border-(--kk-gold)/60"
            >
              <p className="inline-flex items-center gap-2 font-serif text-xl text-(--kk-paper)">
                {p.name}
                <ArrowUpRight className="w-4 h-4 text-(--kk-gold)" aria-hidden />
              </p>
              <p className="mt-3 text-(--kk-paper)/60 leading-relaxed">{p.desc}</p>
            </a>
          ))}
        </div>
        <p className="mt-8 text-sm text-(--kk-paper)/45 max-w-2xl">
          Full stats, game logs, and recruiting details live on the verified
          profiles above — the record stays where it can be checked.
        </p>
      </Section>

      <CtaBand
        title="The same discipline, your program."
        text="Kiminou speaks to teams and athletic programs on the work behind the work — the mornings nobody sees."
        href="/contact"
        label="Book Kiminou for your team"
      />
    </main>
    </>
  );
}
