import { useMemo, useState } from "react";
import { Link } from "wouter";
import booksData from "../content/books.json";
import Seo from "@/components/Seo";

export type BuyLinks = {
  amazon?: string | null;
  googleBooks?: string | null;
  bookshop?: string | null;
  bn?: string | null;
};

export type Book = {
  id: string;
  title: string;
  subtitle: string;
  year: number;
  isbn: string;
  cover: string;
  pdf: string | null;
  themes: string[];
  description: string;
  buyLinks: BuyLinks;
  featured?: boolean;
};

export const BOOKS: Book[] = booksData as Book[];

const RETAILERS: { key: keyof BuyLinks; label: string }[] = [
  { key: "amazon", label: "Amazon" },
  { key: "bookshop", label: "Bookshop" },
  { key: "googleBooks", label: "Google Books" },
  { key: "bn", label: "Barnes & Noble" },
];

export function buyTargets(links: BuyLinks): { label: string; href: string }[] {
  return RETAILERS.flatMap((r) => {
    const href = links[r.key];
    return href ? [{ label: r.label, href }] : [];
  });
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.32em] text-(--kk-brass)">
      {children}
    </p>
  );
}

function BuyButtons({ links, dark = false }: { links: BuyLinks; dark?: boolean }) {
  const targets = buyTargets(links);
  if (targets.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-3">
      {targets.map((t) => (
        <a
          key={t.label}
          href={t.href}
          target="_blank"
          rel="noopener noreferrer"
          className={
            dark
              ? "inline-flex items-center rounded-full bg-(--kk-ink) px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-(--kk-paper) transition-colors hover:bg-(--kk-ink-soft) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--kk-ink)"
              : "inline-flex items-center rounded-full border border-(--kk-ink)/25 px-5 py-2.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-(--kk-ink) transition-colors hover:border-(--kk-ink) hover:bg-(--kk-ink) hover:text-(--kk-paper) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--kk-ink)"
          }
        >
          {t.label}
        </a>
      ))}
    </div>
  );
}

function BookCard({ book }: { book: Book }) {
  return (
    <article className="group flex flex-col">
      <Link
        href={`/books/${book.id}`}
        className="block overflow-hidden rounded-sm bg-(--kk-card) shadow-[0_2px_10px_rgba(16,20,0,0.08)] transition-shadow duration-300 group-hover:shadow-[0_14px_36px_rgba(16,20,0,0.18)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--kk-ink)"
        aria-label={`${book.title} — details`}
      >
        <img
          src={book.cover}
          alt={`${book.title} cover`}
          loading="lazy"
          className="aspect-[2/3] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      </Link>
      <div className="flex flex-1 flex-col pt-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-(--kk-ink)/45">
          {book.year}
        </p>
        <h3 className="font-serif text-[1.65rem] leading-tight mt-2">
          <Link
            href={`/books/${book.id}`}
            className="transition-colors hover:text-(--kk-brass) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--kk-ink)"
          >
            {book.title}
          </Link>
        </h3>
        <p className="mt-2 text-[15px] leading-relaxed text-(--kk-ink)/65 line-clamp-3">
          {book.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
          {buyTargets(book.buyLinks).map((t) => (
            <a
              key={t.label}
              href={t.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] font-semibold uppercase tracking-[0.16em] text-(--kk-ink)/60 underline decoration-(--kk-ink)/25 underline-offset-4 transition-colors hover:text-(--kk-ink) hover:decoration-(--kk-ink) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--kk-ink)"
            >
              {t.label}
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function Books() {
  const [theme, setTheme] = useState<string>("All");

  const featured = useMemo(() => BOOKS.find((b) => b.featured) ?? BOOKS[0], []);
  const rest = useMemo(() => BOOKS.filter((b) => b.id !== featured.id), [featured]);

  // Four broad shelves instead of two dozen micro-tags — a buyer can use these.
  const themeGroups = useMemo(
    () => [
      { label: "Faith & Wisdom", themes: ["Faith", "Wisdom", "Heritage", "Legacy"] },
      {
        label: "Identity & Voice",
        themes: ["Identity", "Black boyhood", "Masculinity", "Silence", "Reckoning", "Survival", "Resilience"],
      },
      {
        label: "Love & Family",
        themes: ["Love", "Heartbreak", "Family", "Motherhood", "Absence", "Friendship"],
      },
      {
        label: "Imagination & Growth",
        themes: ["Imagination", "Adventure", "Children", "Creativity", "Healing", "Searching", "Growth"],
      },
    ],
    []
  );

  const filtered = useMemo(() => {
    if (theme === "All") return rest;
    const group = themeGroups.find((g) => g.label === theme);
    if (!group) return rest;
    return rest.filter((b) => b.themes.some((t) => group.themes.includes(t)));
  }, [theme, rest, themeGroups]);

  const years = BOOKS.map((b) => b.year);
  const span = `${Math.min(...years)}–${Math.max(...years)}`;

  return (
    <>
      <Seo
        title="Published Books - Kiminou Knox"
        description="Explore published books by Kiminou Knox, including The Spirit of Solomon, Our Father?, Hopeless Romantic, and Poems from a Black Boy."
        path="/books"
        image="/kiminou-knox-book-universe-portal.png"
      />
      <main className="bg-(--kk-paper) text-(--kk-ink)">
      {/* ——— Page hero ——— */}
      <section className="pt-32 md:pt-44 pb-14 md:pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Eyebrow>The Library</Eyebrow>
          <h1 className="font-serif text-[clamp(2.8rem,6vw,4.8rem)] leading-[1.02] mt-5 max-w-3xl">
            Ten books. One voice.
          </h1>
          <p className="mt-6 max-w-2xl text-lg md:text-xl leading-relaxed text-(--kk-ink)/70">
            Poetry, children's stories, and confessions in verse — written between
            the court and the page, each one a letter that couldn't be delivered
            any other way.
          </p>
          <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-6 border-t border-(--kk-ink)/15 pt-8">
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.24em] text-(--kk-ink)/45">
                Published works
              </dt>
              <dd className="font-serif text-4xl mt-2">{BOOKS.length}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.24em] text-(--kk-ink)/45">
                Years
              </dt>
              <dd className="font-serif text-4xl mt-2">{span}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.24em] text-(--kk-ink)/45">
                Shelf
              </dt>
              <dd className="font-serif text-4xl mt-2">Poetry &amp; Story</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ——— Featured ——— */}
      <section className="bg-(--kk-ink) text-(--kk-paper)">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 md:py-24 grid gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16 items-center">
          <div className="max-w-sm mx-auto md:mx-0 w-full">
            <img
              src={featured.cover}
              alt={`${featured.title} cover`}
              className="aspect-[2/3] w-full object-cover rounded-sm shadow-[0_24px_60px_rgba(0,0,0,0.5)]"
            />
          </div>
          <div>
            <p className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.32em] text-(--kk-gold)">
              Featured
            </p>
            <h2 className="font-serif text-[clamp(2.2rem,4.5vw,3.6rem)] leading-[1.05] mt-4">
              {featured.title}
            </h2>
            {featured.subtitle && (
              <p className="mt-3 text-lg italic text-(--kk-paper)/70 font-serif">
                {featured.subtitle}
              </p>
            )}
            <p className="mt-6 text-lg leading-relaxed text-(--kk-paper)/80 max-w-xl">
              {featured.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-[13px] uppercase tracking-[0.18em] text-(--kk-paper)/55">
              <span>{featured.year}</span>
              <span>ISBN {featured.isbn}</span>
              <span>{featured.themes.join(" · ")}</span>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <BuyButtons links={featured.buyLinks} dark />
              {featured.pdf && (
                <a
                  href={featured.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] font-semibold uppercase tracking-[0.16em] text-(--kk-paper)/70 underline decoration-(--kk-paper)/30 underline-offset-4 transition-colors hover:text-(--kk-paper) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--kk-paper)"
                >
                  Read a sample
                </a>
              )}
              <Link
                href={`/books/${featured.id}`}
                className="text-[13px] font-semibold uppercase tracking-[0.16em] text-(--kk-gold) underline decoration-(--kk-gold)/40 underline-offset-4 transition-colors hover:text-(--kk-paper) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--kk-paper)"
              >
                About this book
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ——— Collection ——— */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>The Collection</Eyebrow>
              <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] leading-tight mt-4">
                Every title
              </h2>
            </div>
            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Filter books by theme"
            >
              {["All", ...themeGroups.map((g) => g.label)].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTheme(t)}
                  aria-pressed={theme === t}
                  className={`rounded-full px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.14em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--kk-ink) ${
                    theme === t
                      ? "bg-(--kk-ink) text-(--kk-paper)"
                      : "border border-(--kk-ink)/20 text-(--kk-ink)/60 hover:border-(--kk-ink)/60 hover:text-(--kk-ink)"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="mt-12 text-lg text-(--kk-ink)/60">
              No titles under this theme yet.
            </p>
          )}
        </div>
      </section>

      {/* ——— Writing timeline ——— */}
      <section className="bg-(--kk-card) border-y border-(--kk-ink)/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 md:py-24">
          <Eyebrow>The Arc</Eyebrow>
          <h2 className="font-serif text-[clamp(1.9rem,4vw,3rem)] leading-tight mt-4 max-w-2xl">
            Ten books, one becoming.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-(--kk-ink)/70">
            The order they arrived in — each one written from wherever life had
            him standing at the time.
          </p>
          <ol className="mt-12 relative border-l-2 border-(--kk-brass)/40 ml-2 md:ml-4 space-y-10">
            {[...BOOKS]
              .sort((a, b) => a.year - b.year)
              .map((book, i) => (
                <li key={book.id} className="relative pl-8 md:pl-12">
                  <span
                    aria-hidden
                    className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-(--kk-paper) border-2 border-(--kk-brass)"
                  />
                  <div className="flex items-start gap-5">
                    <Link href={`/books/${book.id}`} className="shrink-0">
                      <img
                        src={book.cover}
                        alt=""
                        className="w-14 h-[4.7rem] object-cover rounded-sm shadow-md"
                        loading="lazy"
                      />
                    </Link>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-(--kk-brass)">
                        Book {i + 1} of {BOOKS.length} · {book.year}
                      </p>
                      <Link href={`/books/${book.id}`}>
                        <span className="font-serif text-xl md:text-2xl mt-1 block cursor-pointer hover:underline underline-offset-4">
                          {book.title}
                        </span>
                      </Link>
                      <p className="mt-1 text-sm text-(--kk-ink)/60">
                        {(book.themes ?? []).slice(0, 3).join(" · ")}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
          </ol>
        </div>
      </section>

      {/* ——— Closing strip ——— */}
      <section className="border-t border-(--kk-ink)/15">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 md:py-16 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <p className="font-serif text-2xl md:text-3xl italic text-(--kk-ink)/80 max-w-xl">
            &ldquo;Every book is a letter I couldn&rsquo;t deliver any other way.&rdquo;
          </p>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center rounded-full bg-(--kk-ink) px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.16em] text-(--kk-paper) transition-colors hover:bg-(--kk-ink-soft) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--kk-ink)"
          >
            Book Kiminou to speak
          </Link>
        </div>
      </section>
    </main>
    </>
  );
}
