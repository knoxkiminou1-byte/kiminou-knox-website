import { Link } from "wouter";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import booksData from "../content/books.json";
import { talks } from "../pages/Speaking";

/**
 * Below-the-portrait homepage sections.
 * The hero is the poster; this is the proof — one featured book, the three
 * talks, the measurable, the press line. Each links deeper. No FX.
 */

type Book = {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  cover?: string;
  featured?: boolean;
};

const BOOKS = booksData as Book[];

function Eyebrow({ children }: { children: string }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-(--kk-brass)">
      {children}
    </p>
  );
}

export default function HomeSections() {
  const featured = BOOKS.find((b) => b.featured) ?? BOOKS[0];

  return (
    <>
      {/* ——— Featured book ——— */}
      <section className="bg-(--kk-paper) text-(--kk-ink)">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 md:py-28 grid gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16 items-center">
          <Link
            href={`/books/${featured.id}`}
            className="block max-w-xs mx-auto md:mx-0 w-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--kk-ink)"
            aria-label={`${featured.title} — read more`}
          >
            {featured.cover ? (
              <img
                src={featured.cover}
                alt={`${featured.title} cover`}
                className="w-full aspect-[2/3] object-cover rounded-sm shadow-[0_18px_44px_rgba(16,20,0,0.22)]"
                loading="lazy"
              />
            ) : null}
          </Link>
          <div>
            <Eyebrow>The featured title</Eyebrow>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight mt-4">
              {featured.title}
            </h2>
            {featured.subtitle ? (
              <p className="mt-3 text-xl text-(--kk-ink)/60 font-serif italic">
                {featured.subtitle}
              </p>
            ) : null}
            {featured.description ? (
              <p className="mt-5 text-lg leading-relaxed text-(--kk-ink)/70 max-w-xl">
                {featured.description}
              </p>
            ) : null}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={`/books/${featured.id}`}
                className="inline-flex items-center gap-2 rounded-full bg-(--kk-ink) px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.16em] text-(--kk-paper) transition-colors hover:bg-(--kk-ink-soft) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--kk-ink)"
              >
                About the book <ArrowRight className="w-4 h-4" aria-hidden />
              </Link>
              <Link
                href="/books"
                className="inline-flex items-center gap-2 rounded-full border border-(--kk-ink)/25 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.16em] text-(--kk-ink) transition-colors hover:border-(--kk-ink)/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--kk-ink)"
              >
                All ten books
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ——— Talks ——— */}
      <section className="bg-(--kk-ink) text-(--kk-paper)">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 md:py-28">
          <Eyebrow>Speaking</Eyebrow>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-serif text-4xl md:text-5xl leading-tight max-w-xl">
              A voice the room remembers.
            </h2>
            <Link
              href="/speaking"
              className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.16em] text-(--kk-gold) hover:text-(--kk-paper) transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--kk-gold)"
            >
              Booking & podcast <ArrowUpRight className="w-4 h-4" aria-hidden />
            </Link>
          </div>
          <ol className="mt-12 grid gap-px bg-(--kk-paper)/12 rounded-sm overflow-hidden md:grid-cols-3">
            {talks.map((t) => (
              <li key={t.num} className="bg-(--kk-ink)">
                <Link
                  href="/speaking"
                  className="block h-full p-8 transition-colors hover:bg-(--kk-ink-soft) focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-(--kk-gold)"
                >
                  <span className="font-serif text-3xl text-(--kk-brass)">{t.num}</span>
                  <h3 className="font-serif text-2xl leading-snug mt-4">{t.title}</h3>
                  <p className="mt-3 text-(--kk-paper)/60 leading-relaxed">{t.body}</p>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ——— Sports + press lines ——— */}
      <section className="bg-(--kk-paper) text-(--kk-ink)">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 md:py-28 grid gap-12 md:grid-cols-2 md:gap-16">
          <Link
            href="/sports"
            className="group block border-t-2 border-(--kk-ink)/15 pt-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--kk-ink)"
          >
            <Eyebrow>The discipline chapter</Eyebrow>
            <p className="font-serif text-3xl md:text-4xl leading-tight mt-4">
              6'8", forward/center — and the work behind the work.
            </p>
            <p className="mt-4 text-lg text-(--kk-ink)/65 leading-relaxed">
              Basketball was the first masterclass: early mornings, film,
              reps. The same discipline built ten books.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.16em] text-(--kk-ink) group-hover:gap-3 transition-all">
              The court <ArrowRight className="w-4 h-4" aria-hidden />
            </span>
          </Link>
          <Link
            href="/press"
            className="group block border-t-2 border-(--kk-ink)/15 pt-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--kk-ink)"
          >
            <Eyebrow>Recognition</Eyebrow>
            <p className="font-serif text-3xl md:text-4xl leading-tight mt-4">
              Top essay winner — Miles Hall Foundation, 2025.
            </p>
            <p className="mt-4 text-lg text-(--kk-ink)/65 leading-relaxed">
              His essay was named the top essay at the Breaking Barriers Youth
              Summit — plus the verified bio, headshot, and media links.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.16em] text-(--kk-ink) group-hover:gap-3 transition-all">
              Press kit <ArrowRight className="w-4 h-4" aria-hidden />
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
