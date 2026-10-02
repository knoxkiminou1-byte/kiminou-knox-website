import { useState } from "react";
import { Link, useParams } from "wouter";
import { ArrowLeft, Link2, Linkedin, Twitter } from "lucide-react";
import Seo from "@/components/Seo";
import {
  blogCategories,
  findPublishedBlogPost,
  relatedPublishedBlogPosts,
} from "@/content/blogContent";

function formatDate(value: Date | null | undefined) {
  if (!value) return "";
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(value);
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = findPublishedBlogPost(slug);
  const [copied, setCopied] = useState(false);

  if (!post) {
    return (
      <>
        <Seo
          title="Essay not found — Kiminou Knox"
          description="That essay is no longer on this shelf. Browse the Kiminou Knox journal."
          path="/blog"
        />
        <main className="min-h-[70vh] bg-(--kk-paper) text-(--kk-ink)">
          <div className="mx-auto max-w-3xl px-6 pb-24 pt-40 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-(--kk-brass)">Journal</p>
            <h1 className="mt-5 font-serif text-4xl md:text-5xl">That page moved.</h1>
            <p className="mt-4 text-lg text-(--kk-ink)/65">
              The rest of the writing is still here.
            </p>
            <Link
              href="/blog"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-(--kk-ink) px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.16em] text-(--kk-paper)"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden /> Back to the journal
            </Link>
          </div>
        </main>
      </>
    );
  }

  const category = blogCategories.find((item) => item.id === post.categoryId);
  const related = relatedPublishedBlogPosts(post);
  const path = "/blog/" + post.slug;
  const shareUrl = typeof window !== "undefined" ? window.location.href : "https://www.kiminouknox.com" + path;
  const shareText = post.title + " by Kiminou Knox";

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <>
      <Seo
        title={post.title + " - Kiminou Knox"}
        description={post.excerpt}
        path={path}
        image={post.featuredImage || "/og-image.png"}
      />
      <main className="bg-(--kk-paper) text-(--kk-ink)">
        <article>
          <header className="mx-auto max-w-4xl px-6 pb-12 pt-32 md:pb-16 md:pt-44 lg:px-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-(--kk-ink)/55 hover:text-(--kk-ink)"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden /> Journal
            </Link>
            <p className="mt-10 text-[11px] font-semibold uppercase tracking-[0.28em] text-(--kk-brass)">
              {category?.name ?? "Journal"} · {formatDate(post.publishedAt)}
            </p>
            <h1 className="mt-5 max-w-4xl font-serif text-[clamp(2.8rem,6vw,5rem)] leading-[1.02]">
              {post.title}
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-(--kk-ink)/68">
              {post.excerpt}
            </p>
          </header>

          <div className="border-y border-(--kk-ink)/10 bg-(--kk-card)">
            <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-4 px-6 py-5 lg:px-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-(--kk-ink)/45">
                Share the essay
              </p>
              <div className="flex flex-wrap gap-2">
                <a
                  href={"https://twitter.com/intent/tweet?text=" + encodeURIComponent(shareText) + "&url=" + encodeURIComponent(shareUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-(--kk-ink)/20 hover:border-(--kk-ink)/55"
                  aria-label="Share on X"
                >
                  <Twitter className="h-4 w-4" aria-hidden />
                </a>
                <a
                  href={"https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(shareUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-(--kk-ink)/20 hover:border-(--kk-ink)/55"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="h-4 w-4" aria-hidden />
                </a>
                <button
                  type="button"
                  onClick={copyLink}
                  className="inline-flex min-h-10 items-center gap-2 rounded-full border border-(--kk-ink)/20 px-4 text-[11px] font-semibold uppercase tracking-[0.16em] hover:border-(--kk-ink)/55"
                >
                  <Link2 className="h-4 w-4" aria-hidden />
                  {copied ? "Copied" : "Copy link"}
                </button>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
            <div className="space-y-7 font-serif text-[1.35rem] leading-[1.75] text-(--kk-ink)/82">
              {post.content
                .split(/\n\s*\n/)
                .filter(Boolean)
                .map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
            </div>

            {(post.tags ?? []).length > 0 && (
              <div className="mt-14 flex flex-wrap gap-2 border-t border-(--kk-ink)/12 pt-7">
                {(post.tags ?? []).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-(--kk-ink)/15 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-(--kk-ink)/55"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </article>

        {related.length > 0 && (
          <section className="bg-(--kk-ink) text-(--kk-paper)">
            <div className="mx-auto max-w-7xl px-6 py-16 md:py-24 lg:px-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-(--kk-gold)">Keep reading</p>
              <h2 className="mt-4 font-serif text-4xl">From the same shelf</h2>
              <div className="mt-10 grid gap-px overflow-hidden rounded-sm bg-(--kk-paper)/12 md:grid-cols-3">
                {related.map((item) => (
                  <Link
                    key={item.id}
                    href={"/blog/" + item.slug}
                    className="block bg-(--kk-ink) p-7 transition-colors hover:bg-(--kk-ink-soft)"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-(--kk-gold)">
                      {formatDate(item.publishedAt)}
                    </p>
                    <h3 className="mt-4 font-serif text-2xl leading-tight">{item.title}</h3>
                    <p className="mt-4 line-clamp-3 text-(--kk-paper)/60">{item.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
