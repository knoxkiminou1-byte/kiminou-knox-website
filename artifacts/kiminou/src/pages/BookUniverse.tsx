import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { PageHero, Section } from "@/components/Page";
import Seo from "@/components/Seo";
import { BOOKS } from "./Books";

const worlds = [
  {
    name: "Faith & Wisdom",
    caption: "Prayer, doubt, wisdom, temptation, and the cost of becoming.",
    bookIds: ["our-father", "spirit-solomon"],
  },
  {
    name: "Black Boyhood",
    caption: "Identity, inheritance, survival, and the pressure placed on Black boys early.",
    bookIds: ["poems-black-boy", "black-boy-poems"],
  },
  {
    name: "Voice",
    caption: "What happens when silence stops being safe.",
    bookIds: ["boys-raised-in-silence"],
  },
  {
    name: "Love & Loss",
    caption: "Longing, heartbreak, ghosting, healing, and the decision to stay tender.",
    bookIds: ["hopeless-romantic", "why-did-you-ghost-me"],
  },
  {
    name: "Family & Legacy",
    caption: "The people who shape a life, and what deserves to be carried forward.",
    bookIds: ["7-16-74-an-ode-to-rashida"],
  },
  {
    name: "Imagination & Growth",
    caption: "Friendship, play, courage, and the worlds built for younger readers.",
    bookIds: ["adventures-kiminou-chua", "world-of-imagination"],
  },
];

export default function BookUniverse() {
  return (
    <>
      <Seo
        title="Book Universe - Kiminou Knox"
        description="Explore the Kiminou Knox book universe by theme: faith, Black boyhood, voice, love, family, legacy, imagination, and growth."
        path="/books/universe"
        image="/kiminou-knox-book-universe-portal.png"
      />
      <main className="bg-(--kk-paper) text-(--kk-ink)">
        <PageHero
          eyebrow="The Book Universe"
          title={
            <>
              Ten books. <em className="italic">Six worlds.</em>
            </>
          }
          lede="The library makes more sense when you see the conversations running through it. Start with the world that sounds closest to where you are."
          stats={[
            { label: "Books", value: BOOKS.length },
            { label: "Worlds", value: worlds.length },
            { label: "Years", value: "2024–2026" },
          ]}
        />

        <Section eyebrow="Map the Library" title="Choose a world">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {worlds.map((world, index) => {
              const books = world.bookIds
                .map((id) => BOOKS.find((book) => book.id === id))
                .filter(Boolean);

              return (
                <article
                  key={world.name}
                  className="flex h-full flex-col rounded-sm border border-(--kk-ink)/12 bg-(--kk-card) p-7"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-(--kk-brass)">
                    {String(index + 1).padStart(2, "0")} · {books.length} {books.length === 1 ? "book" : "books"}
                  </p>
                  <h2 className="mt-4 font-serif text-3xl leading-tight">{world.name}</h2>
                  <p className="mt-3 leading-relaxed text-(--kk-ink)/65">{world.caption}</p>

                  <div className="mt-7 space-y-3 border-t border-(--kk-ink)/12 pt-5">
                    {books.map((book) =>
                      book ? (
                        <Link
                          key={book.id}
                          href={"/books/" + book.id}
                          className="group flex items-center gap-4 rounded-sm py-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--kk-ink)"
                        >
                          <img
                            src={book.cover}
                            alt=""
                            className="h-[4.7rem] w-14 shrink-0 rounded-sm object-cover shadow-sm"
                            loading="lazy"
                          />
                          <span className="min-w-0">
                            <span className="block font-serif text-xl leading-tight group-hover:text-(--kk-brass)">
                              {book.title}
                            </span>
                            <span className="mt-1 block text-[11px] font-semibold uppercase tracking-[0.16em] text-(--kk-ink)/45">
                              {book.year}
                            </span>
                          </span>
                        </Link>
                      ) : null
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </Section>

        <section className="bg-(--kk-ink) text-(--kk-paper)">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-16 md:flex-row md:items-center md:justify-between md:py-20 lg:px-10">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-(--kk-gold)">Prefer the full shelf?</p>
              <h2 className="mt-3 font-serif text-3xl md:text-4xl">Browse every title in one place.</h2>
            </div>
            <Link
              href="/books"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-(--kk-gold) px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-(--kk-ink)"
            >
              Full library <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
