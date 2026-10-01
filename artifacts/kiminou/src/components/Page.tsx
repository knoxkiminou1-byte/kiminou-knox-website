import { Link } from "wouter";
import type { ReactNode } from "react";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.32em] text-(--kk-brass)">
      {children}
    </p>
  );
}

export function PageHero({
  eyebrow,
  title,
  lede,
  stats,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  stats?: { label: string; value: ReactNode }[];
}) {
  return (
    <section className="pt-32 md:pt-44 pb-14 md:pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="font-serif text-[clamp(2.8rem,6vw,4.8rem)] leading-[1.02] mt-5 max-w-3xl">
          {title}
        </h1>
        {lede && (
          <p className="mt-6 max-w-2xl text-lg md:text-xl leading-relaxed text-(--kk-ink)/70">
            {lede}
          </p>
        )}
        {stats && stats.length > 0 && (
          <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-6 border-t border-(--kk-ink)/15 pt-8">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.24em] text-(--kk-ink)/45">
                  {s.label}
                </dt>
                <dd className="font-serif text-4xl mt-2">{s.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}

export function Section({
  eyebrow,
  title,
  children,
  dark = false,
}: {
  eyebrow?: string;
  title?: ReactNode;
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <section className={dark ? "bg-(--kk-ink) text-(--kk-paper)" : ""}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 md:py-24">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        {title && (
          <h2 className="font-serif text-[clamp(1.9rem,4vw,3rem)] leading-tight mt-4 max-w-2xl">
            {title}
          </h2>
        )}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

export function CtaBand({
  title,
  text,
  href,
  label,
}: {
  title: string;
  text: string;
  href: string;
  label: string;
}) {
  return (
    <section className="bg-(--kk-ink) text-(--kk-paper)">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 md:py-24 text-center">
        <h2 className="font-serif text-[clamp(2rem,4.5vw,3.4rem)] leading-tight max-w-2xl mx-auto">
          {title}
        </h2>
        <p className="mt-5 max-w-xl mx-auto text-(--kk-paper)/70 text-lg leading-relaxed">
          {text}
        </p>
        <Link href={href}>
          <span className="inline-block mt-8 bg-(--kk-gold) text-(--kk-ink) font-semibold text-sm uppercase tracking-[0.18em] px-8 py-4 rounded-full cursor-pointer hover:bg-(--kk-paper) transition-colors">
            {label}
          </span>
        </Link>
      </div>
    </section>
  );
}
