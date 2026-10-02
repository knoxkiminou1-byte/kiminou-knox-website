import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import SignatureAnimation from "@/components/SignatureAnimation";
import { SITE_SOCIAL_LINKS } from "@/lib/seo";

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

export default function SiteFooter() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer
      ref={ref}
      className="relative z-10 overflow-hidden border-t border-(--kk-paper)/10 bg-[#050209] text-(--kk-paper)"
      data-testid="footer"
    >
      <div className="pointer-events-none absolute -right-24 top-12 h-72 w-72 rounded-full border border-(--kk-gold)/15" aria-hidden />
      <div className="pointer-events-none absolute -right-10 top-24 h-48 w-48 rounded-full border border-(--kk-gold)/10" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-6 pb-10 pt-20 lg:px-10">
        <div className="mb-16 grid grid-cols-1 gap-14 md:grid-cols-[2fr_1fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="font-serif text-3xl font-light md:text-4xl">Kiminou Knox</p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.28em] text-(--kk-gold)/75">
              Author · Athlete · Builder · Voice
            </p>
            <p className="mt-6 max-w-sm leading-relaxed text-(--kk-paper)/42">
              Ten books, basketball, KimYaps, speaking, and live builder work —
              one body of work, still being written.
            </p>
          </motion.div>

          <motion.nav
            aria-label="Footer"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08 }}
          >
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.28em] text-(--kk-paper)/30">
              Explore
            </p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-1">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm tracking-wide text-(--kk-paper)/48 transition-colors hover:text-(--kk-gold)"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.14 }}
          >
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.28em] text-(--kk-paper)/30">
              Follow
            </p>
            <ul className="space-y-3">
              {SITE_SOCIAL_LINKS.slice(0, 7).map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm tracking-wide text-(--kk-paper)/48 transition-colors hover:text-(--kk-gold)"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="mt-7 inline-flex border border-(--kk-gold)/30 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-(--kk-gold) transition-all hover:border-(--kk-gold)/65 hover:bg-(--kk-gold)/8"
            >
              Work with me →
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center border-y border-(--kk-paper)/8 py-8 text-(--kk-gold)"
        >
          <SignatureAnimation className="w-64 max-w-full md:w-80" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="flex flex-col items-start justify-between gap-4 pt-8 sm:flex-row sm:items-center"
        >
          <p className="text-xs text-(--kk-paper)/22">© 2026 Kiminou Knox. All rights reserved.</p>
          <p className="text-[10px] uppercase tracking-[0.24em] text-(--kk-paper)/20">
            The professional side
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
