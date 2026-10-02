import { Link } from "wouter";
import { ArrowRight, BookOpen, BriefcaseBusiness, Mic2, Trophy, Users } from "lucide-react";
import { PageHero, Section, CtaBand } from "@/components/Page";
import Seo from "@/components/Seo";

const lanes = [
  {
    icon: BookOpen,
    label: "Books",
    title: "The ten-book library",
    body: "The published catalog now spans poetry, faith, Black boyhood, love, family, imagination, and youth storytelling.",
    href: "/books",
    cta: "Browse the library",
  },
  {
    icon: Mic2,
    label: "Voice",
    title: "KimYaps",
    body: "The podcast carries the same conversations into audio — pain, purpose, discipline, identity, faith, and grace.",
    href: "/speaking",
    cta: "Listen and explore",
  },
  {
    icon: BriefcaseBusiness,
    label: "Builder",
    title: "Websites and systems",
    body: "Client websites and the AAFC engine are the working builder lane: real projects, real businesses, live links.",
    href: "/work",
    cta: "See the work",
  },
  {
    icon: Users,
    label: "Speaking",
    title: "Schools, teams, and youth rooms",
    body: "Three signature talks currently frame the speaking lane: discipline and faith, Black boy voice, and creative work that lasts.",
    href: "/speaking",
    cta: "See the talks",
  },
  {
    icon: Trophy,
    label: "Athletics",
    title: "The discipline chapter",
    body: "Basketball remains part of the public story — not as decoration, but as the training ground behind the writing and building.",
    href: "/sports",
    cta: "Open the athletic profile",
  },
];

export default function Now() {
  return (
    <>
      <Seo
        title="Now - Kiminou Knox"
        description="What Kiminou Knox is actively building across books, KimYaps, web work, speaking, and athletics."
        path="/now"
        image="/photos/kiminou-knox/kiminou-knox-official-author-headshot-2026.jpg"
      />
      <main className="bg-(--kk-paper) text-(--kk-ink)">
        <PageHero
          eyebrow="Now"
          title={
            <>
              What is active <em className="italic">right now.</em>
            </>
          }
          lede="A living snapshot of the lanes that are actually moving — the page, the mic, the work, the room, and the court."
          stats={[
            { label: "Published books", value: "10" },
            { label: "Signature talks", value: "3" },
            { label: "Builder projects shown", value: "3" },
          ]}
        />

        <Section eyebrow="Active Lanes" title="The work in motion">
          <div className="grid gap-5 md:grid-cols-2">
            {lanes.map((lane, index) => {
              const Icon = lane.icon;
              return (
                <Link
                  key={lane.label}
                  href={lane.href}
                  className="group rounded-sm border border-(--kk-ink)/12 bg-(--kk-card) p-7 transition-colors hover:border-(--kk-brass)/45 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--kk-ink)"
                >
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-(--kk-brass)">
                        {String(index + 1).padStart(2, "0")} · {lane.label}
                      </p>
                      <h2 className="mt-4 font-serif text-3xl leading-tight">{lane.title}</h2>
                    </div>
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-(--kk-ink)/15 text-(--kk-ink)/65">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                  </div>
                  <p className="mt-4 max-w-xl leading-relaxed text-(--kk-ink)/68">{lane.body}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-(--kk-ink)">
                    {lane.cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </span>
                </Link>
              );
            })}
          </div>
        </Section>

        <CtaBand
          title="Want to enter the story here?"
          text="Speaking, press, collaborations, books, basketball, or a website project — use the contact page and point to the lane."
          href="/contact"
          label="Start the conversation"
        />
      </main>
    </>
  );
}
