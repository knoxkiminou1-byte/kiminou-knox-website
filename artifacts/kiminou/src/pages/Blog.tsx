import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, ArrowUpRight, Search } from "lucide-react";
import { PageHero, Section } from "@/components/Page";
import Seo from "@/components/Seo";
import { blogCategories, publishedBlogPosts } from "@/content/blogContent";

type MediumPost = {
  title: string;
  link: string;
  pubDate?: string;
  excerpt?: string;
  categories?: string[];
};

function formatDate(value: Date | string | null | undefined) {
  if (!value) return "";
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default function Blog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [mediumPosts, setMediumPosts] = useState<MediumPost[]>([]);

  useEffect(() => {
    let cancelled = false;
    fetch("/medium-posts.json", { cache: "no-cache" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && Array.isArray(data?.items)) {
          setMediumPosts(data.items.slice(0, 6));
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return publishedBlogPosts.filter((post) => {
      const matchesCategory = category === "all" || post.categoryId === category;
      const haystack = [post.title, post.excerpt, ...(post.tags ?? [])].join(" ").toLowerCase();
      const matchesQuery = !needle || haystack.includes(needle);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <>
      <Seo
        title="Journal & Essays - Kiminou Knox"
        description="Essays and reflections by Kiminou Knox on faith, identity, discipline, love, writing, and the life behind the work."
        path="/blog"
        image="/photos/kiminou-knox/kiminou-knox-official-author-headshot-2026.jpg"
      />
      <main className="bg-(--kk-paper) text-(--kk-ink)">
        <PageHero
          eyebrow="Journal"
          title={
            <>
              The writing between <em className="italic">the books.</em>
            </>
          }
          lede="Essays, notes, and arguments from the same world as the books — faith, Black boyhood, discipline, love, the court, and the work of becoming."
          stats={[
            { label: "On-site essays", value: publishedBlogPosts.length },
            { label: "Categories", value: blogCategories.length },
            { label: "Also publishing", value: "Medium" },
          ]}
        />

        <Section eyebrow="On This Site" title="Essays from the archive">
          <div className="flex flex-col gap-5 border-y border-(--kk-ink)/12 py-6 md:flex-row md:items-center md:justify-between">
            <label className="relative block w-full md:max-w-sm">
              <span className="sr-only">Search essays</span>
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-(--kk-ink)/40"
                aria-hidden
              />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search essays"
                className="w-full rounded-full border border-(--kk-ink)/20 bg-transparent py-3 pl-11 pr-4 text-base outline-none transition-colors placeholder:text-(--kk-ink)/35 focus:border-(--kk-brass)"
              />
            </label>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter essays by category">
              <button
                type="button"
                onClick={() => setCategory("all")}
                aria-pressed={category === "all"}
                className={
                  category === "all"
                    ? "rounded-full bg-(--kk-ink) px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-(--kk-paper)"
                    : "rounded-full border border-(--kk-ink)/20 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-(--kk-ink)/60 hover:border-(--kk-ink)/50"
                }
              >
                All
              </button>
              {blogCategories.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCategory(item.id)}
                  aria-pressed={category === item.id}
                  className={
                    category === item.id
                      ? "rounded-full bg-(--kk-ink) px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-(--kk-paper)"
                      : "rounded-full border border-(--kk-ink)/20 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-(--kk-ink)/60 hover:border-(--kk-ink)/50"
                  }
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-x-10 gap-y-12 md:grid-cols-2">
            {filtered.map((post) => {
              const postCategory = blogCategories.find((item) => item.id === post.categoryId);
              return (
                <article key={post.id} className="border-t-2 border-(--kk-ink)/15 pt-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-(--kk-brass)">
                    {postCategory?.name ?? "Journal"} · {formatDate(post.publishedAt)}
                  </p>
                  <h2 className="mt-4 font-serif text-3xl leading-tight">
                    <Link href={"/blog/" + post.slug} className="hover:text-(--kk-brass)">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-(--kk-ink)/68">{post.excerpt}</p>
                  <Link
                    href={"/blog/" + post.slug}
                    className="mt-6 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-(--kk-ink)"
                  >
                    Read essay <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </article>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <p className="mt-10 text-lg text-(--kk-ink)/60">
              Nothing matches that search yet.
            </p>
          )}
        </Section>

        {mediumPosts.length > 0 && (
          <Section dark eyebrow="Elsewhere" title="Recent writing on Medium">
            <div className="grid gap-px overflow-hidden rounded-sm bg-(--kk-paper)/12 md:grid-cols-2 lg:grid-cols-3">
              {mediumPosts.map((post) => (
                <a
                  key={post.link}
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-(--kk-ink) p-7 transition-colors hover:bg-(--kk-ink-soft)"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-(--kk-gold)">
                    Medium {post.pubDate ? "· " + formatDate(post.pubDate) : ""}
                  </p>
                  <h3 className="mt-4 font-serif text-2xl leading-tight text-(--kk-paper)">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="mt-4 line-clamp-4 leading-relaxed text-(--kk-paper)/60">
                      {post.excerpt}
                    </p>
                  )}
                  <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-(--kk-gold)">
                    Read on Medium <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </span>
                </a>
              ))}
            </div>
          </Section>
        )}
      </main>
    </>
  );
}
