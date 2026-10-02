import { Link } from "wouter";
import { SITE_SOCIAL_LINKS } from "@/lib/seo";
import SignatureAnimation from "@/components/SignatureAnimation";

const links = [
  { href: "/books", label: "Books" },
  { href: "/books/universe", label: "Book Universe" },
  { href: "/sports", label: "Athletics" },
  { href: "/speaking", label: "Voice" },
  { href: "/work", label: "Work" },
  { href: "/blog", label: "Journal" },
  { href: "/now", label: "Now" },
  { href: "/author", label: "Bio" },
  { href: "/press", label: "Press" },
  { href: "/contact", label: "Contact" },
];

/**
 * SiteFooter — ink-dark footer grounding the business-professional pages.
 * The animated signature is retained from the earlier site as a quiet brand detail.
 */
export default function SiteFooter() {
  return (
    <footer className="bg-(--kk-ink) text-(--kk-paper)" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 md:pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12 mb-12">
          <div>
            <p className="font-serif text-3xl md:text-4xl font-light mb-4">Kiminou Knox</p>
            <p className="text-(--kk-paper)/60 max-w-md leading-relaxed">
              Author of ten books. Athlete. Builder. Writing the story in real
              time — one book, one game, one project at a time.
            </p>
          </div>
          <nav aria-label="Footer">
            <p className="text-xs uppercase tracking-[0.25em] text-(--kk-paper)/40 mb-5">Explore</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-1">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>
                    <span className="text-(--kk-paper)/70 hover:text-(--kk-paper) transition-colors cursor-pointer text-sm tracking-wide">
                      {l.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-(--kk-paper)/40 mb-5">Follow</p>
            <ul className="space-y-3">
              {SITE_SOCIAL_LINKS.slice(0, 7).map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-(--kk-paper)/70 hover:text-(--kk-paper) transition-colors text-sm tracking-wide"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex justify-center border-t border-(--kk-paper)/10 py-8 md:py-10">
          <SignatureAnimation className="w-64 max-w-full md:w-80" />
        </div>

        <div className="border-t border-(--kk-paper)/10 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs tracking-[0.2em] uppercase text-(--kk-paper)/40">
            © 2026 Kiminou Knox. All rights reserved.
          </p>
          <p className="text-xs tracking-[0.2em] uppercase text-(--kk-paper)/40">
            Author · Athlete · Builder
          </p>
        </div>
      </div>
    </footer>
  );
}
