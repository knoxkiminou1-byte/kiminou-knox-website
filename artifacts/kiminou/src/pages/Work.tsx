import { ArrowUpRight } from "lucide-react";
import { PageHero, Section, CtaBand } from "@/components/Page";
import Seo from "@/components/Seo";

/**
 * /work — the builder lane, paid off with real projects only.
 * Every entry links to a live site. Nothing conceptual, nothing "coming soon."
 */

const projects = [
  {
    name: "LONHA — Law Offices of Nicole Hodge Amey",
    kind: "Client website",
    body: "Full website rebuild for a New Orleans law office — new structure, new copy, direct inquiry paths. Designed and shipped through AAFC.",
    href: "https://www.lonhaca.com/",
    cta: "Visit lonhaca.com",
  },
  {
    name: "Drew Pharmacy",
    kind: "Client website",
    body: "Website for a community pharmacy — services, refills, and contact made simple for the people who rely on it. Designed and shipped through AAFC.",
    href: "https://www.drew-pharmacy.com/",
    cta: "Visit drew-pharmacy.com",
  },
  {
    name: "AAFC Engine",
    kind: "Internal tool",
    body: "The working engine behind the client work — the system that turns a business's scattered web presence into a plan, built and run in-house.",
    href: "https://aafc-engine.vercel.app/",
    cta: "See the engine",
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
            {projects.map((p) => (
              <li key={p.name} className="py-10 md:py-12 grid gap-4 md:grid-cols-[1fr_auto] md:gap-10 md:items-center">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-(--kk-brass)">
                    {p.kind}
                  </p>
                  <h2 className="font-serif text-2xl md:text-3xl leading-tight mt-3">
                    {p.name}
                  </h2>
                  <p className="mt-4 max-w-2xl text-lg leading-relaxed text-(--kk-ink)/70">
                    {p.body}
                  </p>
                </div>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-(--kk-ink)/25 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.16em] text-(--kk-ink) transition-colors hover:border-(--kk-ink)/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--kk-ink) whitespace-nowrap"
                >
                  {p.cta} <ArrowUpRight className="w-4 h-4" aria-hidden />
                </a>
              </li>
            ))}
          </ol>
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
