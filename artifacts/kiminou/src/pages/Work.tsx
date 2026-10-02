import { ArrowUpRight } from "lucide-react";
import { PageHero, Section, CtaBand } from "@/components/Page";
import Seo from "@/components/Seo";

const projects = [
  {
    name: "LONHA — Law Offices of Nicole Hodge Amey",
    kind: "Client website",
    body: "Full website rebuild for a New Orleans law office — new structure, new copy, direct inquiry paths. Designed and shipped through AAFC.",
    delivered: ["Site structure", "Website copy", "Direct inquiry paths"],
    href: "https://www.lonhaca.com/",
    cta: "Visit lonhaca.com",
  },
  {
    name: "Drew Pharmacy",
    kind: "Client website",
    body: "Website for a community pharmacy — services, refills, and contact made simple for the people who rely on it. Designed and shipped through AAFC.",
    delivered: ["Service clarity", "Refill path", "Contact path"],
    href: "https://www.drew-pharmacy.com/",
    cta: "Visit drew-pharmacy.com",
  },
  {
    name: "AAFC Engine",
    kind: "Internal tool",
    body: "The working engine behind the client work — the system that turns a business's scattered web presence into a plan, built and run in-house.",
    delivered: ["Presence review", "Planning system", "Internal workflow"],
    href: "https://aafc-engine.vercel.app/",
    cta: "See the engine",
  },
];

const principles = [
  {
    title: "Clarity first",
    body: "A visitor should understand what the business does, who it serves, and what to do next without hunting for the answer.",
  },
  {
    title: "Paths that lead somewhere",
    body: "Pages are built around useful actions — inquiry, contact, refill, booking, or the next piece of information somebody actually needs.",
  },
  {
    title: "Live work over concept work",
    body: "The portfolio shows things people can open and use. The standard is shipped work, not a deck explaining what might exist.",
  },
];

export default function Work() {
  return (
    <>
      <Seo
        title="Work — Kiminou Knox"
        description="Selected builder work by Kiminou Knox: client websites and the AAFC engine — every project live, nothing conceptual."
        path="/work"
      />
      <main className="bg-(--kk-paper) text-(--kk-ink)">
        <PageHero
          eyebrow="Builder"
          title={
            <>
              He doesn't just write. <em className="italic">He ships.</em>
            </>
          }
          lede="Websites for real businesses and the engine behind them — designed, built, and live. Every project below is somewhere you can visit right now."
          stats={[
            { label: "Client sites live", value: "2" },
            { label: "Internal engine", value: "1" },
            { label: "Concept decks", value: "0" },
          ]}
        />

        <Section eyebrow="Selected Work" title="Live, not promised">
          <ol className="divide-y divide-(--kk-ink)/12 border-y border-(--kk-ink)/12">
            {projects.map((project, index) => (
              <li key={project.name} className="py-10 md:py-12">
                <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-(--kk-brass)">
                      {String(index + 1).padStart(2, "0")} · {project.kind}
                    </p>
                    <h2 className="font-serif text-2xl md:text-3xl leading-tight mt-3">
                      {project.name}
                    </h2>
                    <p className="mt-4 max-w-2xl text-lg leading-relaxed text-(--kk-ink)/70">
                      {project.body}
                    </p>
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-7 inline-flex items-center gap-2 rounded-full border border-(--kk-ink)/25 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.16em] text-(--kk-ink) transition-colors hover:border-(--kk-ink)/60 hover:bg-(--kk-ink) hover:text-(--kk-paper) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--kk-ink)"
                    >
                      {project.cta} <ArrowUpRight className="w-4 h-4" aria-hidden />
                    </a>
                  </div>
                  <aside className="rounded-sm bg-(--kk-card) p-6">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-(--kk-brass)">
                      What shipped
                    </p>
                    <ul className="mt-4 space-y-3">
                      {project.delivered.map((item) => (
                        <li key={item} className="border-t border-(--kk-ink)/10 pt-3 text-sm font-medium text-(--kk-ink)/70 first:border-t-0 first:pt-0">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </aside>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section dark eyebrow="The Builder Standard" title="What the work is trying to do">
          <div className="grid gap-px overflow-hidden rounded-sm bg-(--kk-paper)/12 md:grid-cols-3">
            {principles.map((principle) => (
              <article key={principle.title} className="bg-(--kk-ink) p-7">
                <h3 className="font-serif text-2xl">{principle.title}</h3>
                <p className="mt-4 leading-relaxed text-(--kk-paper)/62">{principle.body}</p>
              </article>
            ))}
          </div>
        </Section>

        <CtaBand
          title="Need something built?"
          text="If your business needs a website that actually works — clear, fast, and built to bring people in — start the conversation."
          href="/contact"
          label="Start a project inquiry"
        />
      </main>
    </>
  );
}
