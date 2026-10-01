import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "wouter";
import SignatureAnimation from "@/components/SignatureAnimation";
import { SITE_SOCIAL_LINKS } from "@/lib/seo";

const links = [
  { href: "/books", label: "Books" },
  { href: "/sports", label: "Athletics" },
  { href: "/speaking", label: "Speaking" },
  { href: "/author", label: "Bio" },
  { href: "/press", label: "Press" },
  { href: "/blog", label: "Blog" },
  { href: "/speaking", label: "KimYaps Podcast" },
  { href: "/now", label: "Now" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <footer
      ref={ref}
      className="border-t border-white/8 bg-black pt-20 pb-10"
      data-testid="footer"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-14 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h2
              className="font-serif text-3xl md:text-4xl font-light text-white mb-4"
              data-testid="footer-title"
            >
              Kiminou Knox
            </h2>
            <p
              className="text-xs uppercase tracking-[0.3em] text-amber-400/60 mb-6"
              data-testid="footer-subtitle"
            >
              Author · Athlete · Speaker · Podcast Host
            </p>
            <p className="text-sm text-white/35 leading-relaxed max-w-xs">
              Bay Area raised author and poet. Ten published books. Host of KimYaps. Director at AAFC.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-white/25 mb-6 font-medium">
              Navigate
            </p>
            <ul className="space-y-3">
              {links.map((l) => (
                <li key={`${l.href}-${l.label}`}>
                  <Link href={l.href}>
                    <span className="text-sm text-white/45 hover:text-amber-300 transition-colors duration-300 cursor-pointer">
                      {l.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-white/25 mb-6 font-medium">
              Connect
            </p>
            <ul className="space-y-3 mb-8">
              {SITE_SOCIAL_LINKS.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/45 hover:text-amber-300 transition-colors duration-300"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
            <Link href="/contact">
              <motion.span
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-amber-400/30 text-amber-400/80 text-xs uppercase tracking-[0.2em] cursor-pointer hover:bg-amber-400/10 hover:border-amber-400/60 transition-all duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Work With Me →
              </motion.span>
            </Link>
          </motion.div>
        </div>

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="flex justify-center mb-10"
        >
          <SignatureAnimation className="w-64 md:w-80" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border-t border-white/6 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p
            className="text-xs text-white/20"
            data-testid="footer-copyright"
          >
            © 2026 Kiminou Knox. All rights reserved.
          </p>
          <p className="text-xs text-white/15 tracking-widest uppercase">
            Bay Area · Class of 2025
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
