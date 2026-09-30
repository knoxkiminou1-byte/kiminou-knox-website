import { useEffect } from "react";
import { useRoute, Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BOOKS, buyTargets } from "./Books";

/**
 * BookDetail — clean, professional per-title page.
 * Cover, story, facts, real buy links, prev/next through the catalog.
 */
export default function BookDetail() {
  const [, params] = useRoute("/books/:id");
  const id = params?.id ?? "";
  const idx = BOOKS.findIndex((b) => b.id === id);
  const book = idx >= 0 ? BOOKS[idx] : null;

  useEffect(() => {
    document.title = book ? `${book.title} — Kiminou Knox` : "Book not found — Kiminou Knox";
  }, [book]);

  if (!book) {
    return (
      <main className="bg-(--kk-paper) text-(--kk-ink) min-h-[70vh]">
        <div className="max-w-3xl mx-auto px-6 pt-40 pb-24 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-(--kk-brass)">
            The Library
          </p>
          <h1 className="font-serif text-4xl md:text-5xl mt-5">That shelf is empty.</h1>
          <p className="mt-4 text-lg text-(--kk-ink)/65">
            We couldn't find that title. The full collection is this way.
          </p>
          <Link
            href="/books"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-(--kk-ink) px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.16em] text-(--kk-paper) transition-colors hover:bg-(--kk-ink-soft) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--kk-ink)"
          >
            <ArrowLeft className="w-4 h-4" /> All books
          </Link>
        </div>
      </main>
    );
  }

  const prev = BOOKS[(idx - 1 + BOOKS.length) % BOOKS.length];
  const next = BOOKS[(idx + 1) % BOOKS.length];
  const targets = buyTargets(book.buyLinks);

  return (
    <main className="bg-(--kk-paper) text-(--kk-ink)">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-28 md:pt-36 pb-16 md:pb-24">
        <Link
          href="/books"
          className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-(--kk-ink)/55 transition-colors hover:text-(--kk-ink) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--kk-ink)"
        >
          <ArrowLeft className="w-4 h-4" /> The Library
        </Link>

        <div className="mt-10 grid gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
          <div className="max-w-sm w-full">
            <img
              src={book.cover}
              alt={`${book.title} cover`}
              className="aspect-[2/3] w-full object-cover rounded-sm shadow-[0_18px_44px_rgba(16,20,0,0.22)]"
            />
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-(--kk-brass)">
              {book.year} · {book.themes.join(" · ")}
            </p>
            <h1 className="font-serif text-[clamp(2.4rem,5vw,4rem)] leading-[1.04] mt-4">
              {book.title}
            </h1>
            {book.subtitle && (
              <p className="mt-3 font-serif italic text-xl text-(--kk-ink)/65">
                {book.subtitle}
              </p>
            )}
            <p className="mt-6 text-lg leading-relaxed text-(--kk-ink)/75 max-w-xl">
              {book.description}
            </p>

            <dl className="mt-8 grid max-w-xl grid-cols-2 gap-6 border-t border-(--kk-ink)/15 pt-6 text-sm">
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-(--kk-ink)/45">
                  Published
                </dt>
                <dd className="mt-1 font-medium">{book.year}</dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-(--kk-ink)/45">
                  ISBN
                </dt>
                <dd className="mt-1 font-medium">{book.isbn}</dd>
              </div>
            </dl>

            {targets.length > 0 && (
              <div className="mt-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-(--kk-ink)/45 mb-4">
                  Get the book
                </p>
                <div className="flex flex-wrap gap-3">
                  {targets.map((t) => (
                    <a
                      key={t.label}
                      href={t.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-full bg-(--kk-ink) px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-(--kk-paper) transition-colors hover:bg-(--kk-ink-soft) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--kk-ink)"
                    >
                      {t.label}
                    </a>
                  ))}
                  {book.pdf && (
                    <a
                      href={book.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-full border border-(--kk-ink)/25 px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-(--kk-ink) transition-colors hover:border-(--kk-ink) hover:bg-(--kk-ink) hover:text-(--kk-paper) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--kk-ink)"
                    >
                      Read a sample
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* prev / next */}
        <nav
          aria-label="More books"
          className="mt-20 md:mt-28 grid gap-4 sm:grid-cols-2 border-t border-(--kk-ink)/15 pt-10"
        >
          <Link
            href={`/books/${prev.id}`}
            className="group flex items-center gap-4 rounded-sm p-4 transition-colors hover:bg-(--kk-ink)/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--kk-ink)"
          >
            <ArrowLeft className="w-5 h-5 shrink-0 text-(--kk-ink)/40 transition-transform group-hover:-translate-x-1" />
            <span>
              <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-(--kk-ink)/45">
                Previous
              </span>
              <span className="block font-serif text-xl mt-1">{prev.title}</span>
            </span>
          </Link>
          <Link
            href={`/books/${next.id}`}
            className="group flex items-center justify-end gap-4 rounded-sm p-4 text-right transition-colors hover:bg-(--kk-ink)/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--kk-ink)"
          >
            <span>
              <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-(--kk-ink)/45">
                Next
              </span>
              <span className="block font-serif text-xl mt-1">{next.title}</span>
            </span>
            <ArrowRight className="w-5 h-5 shrink-0 text-(--kk-ink)/40 transition-transform group-hover:translate-x-1" />
          </Link>
        </nav>
      </div>
    </main>
  );
}
