import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useSpring } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

const navItems = [
  { href: "/books", label: "Books" },
  { href: "/sports", label: "Athletics" },
  { href: "/speaking", label: "Voice" },
  { href: "/work", label: "Work" },
  { href: "/blog", label: "Journal" },
  { href: "/now", label: "Now" },
  { href: "/author", label: "Bio" },
  { href: "/press", label: "Press" },
  { href: "/contact", label: "Contact" },
];

function isActive(location: string, href: string) {
  return location === href || location.startsWith(href + "/");
}

function MagneticNavLink({
  href,
  label,
  active,
  index,
}: {
  href: string;
  label: string;
  active: boolean;
  index: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useSpring(0, { stiffness: 380, damping: 28 });
  const y = useSpring(0, { stiffness: 380, damping: 28 });

  function onMove(event: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(((event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)) * 7);
    y.set(((event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)) * 4);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <Link href={href}>
      <motion.span
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={{ x, y }}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 + index * 0.045, duration: 0.4 }}
        className={
          "relative inline-block cursor-pointer text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors " +
          (active ? "text-(--kk-gold)" : "text-(--kk-paper)/55 hover:text-(--kk-paper)")
        }
      >
        {label}
        <motion.span
          className="absolute -bottom-1 left-0 h-px w-full origin-left bg-(--kk-gold)"
          initial={false}
          animate={{ scaleX: active ? 1 : 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.25 }}
        />
      </motion.span>
    </Link>
  );
}

export default function SiteHeader() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (!menuOpen) return;
    const first = menuRef.current?.querySelector<HTMLElement>("a, button");
    first?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuToggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !menuRef.current) return;
      const focusable = Array.from(
        menuRef.current.querySelectorAll<HTMLElement>("a, button")
      );
      if (!focusable.length) return;
      const firstItem = focusable[0];
      const lastItem = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault();
        lastItem.focus();
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault();
        firstItem.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <>
      <motion.header
        className={
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 " +
          (scrolled
            ? "border-b border-(--kk-paper)/10 bg-[#08040f]/88 backdrop-blur-xl"
            : "bg-transparent")
        }
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
        data-testid="header"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex h-16 items-center justify-between md:h-20">
            <Link href="/" data-testid="logo-button">
              <motion.span
                className="cursor-pointer font-serif text-base font-semibold uppercase tracking-[0.28em] text-(--kk-paper) md:text-lg"
                whileHover={{ y: -1, color: "var(--kk-gold)" }}
                transition={{ duration: 0.2 }}
              >
                Kiminou Knox
              </motion.span>
            </Link>

            <nav className="hidden items-center gap-5 lg:flex xl:gap-7" aria-label="Main navigation">
              {navItems.map((item, index) => (
                <MagneticNavLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  active={isActive(location, item.href)}
                  index={index}
                />
              ))}
            </nav>

            <button
              ref={menuToggleRef}
              type="button"
              className="p-2 text-(--kk-paper)/70 transition-colors hover:text-(--kk-paper) lg:hidden"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="professional-mobile-nav"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            id="professional-mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="fixed inset-0 z-40 flex flex-col items-center justify-center overflow-y-auto bg-[#08040f] px-6 py-24"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.48, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Link href="/" onClick={() => setMenuOpen(false)}>
              <span className="font-serif text-2xl uppercase tracking-[0.24em] text-(--kk-gold)">
                Kiminou Knox
              </span>
            </Link>
            <div className="my-7 h-px w-14 bg-(--kk-gold)/35" />
            <nav className="grid w-full max-w-sm gap-1" aria-label="Mobile">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + index * 0.04, duration: 0.34 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={
                      "block rounded-sm px-4 py-3 text-center text-base uppercase tracking-[0.22em] transition-colors " +
                      (isActive(location, item.href)
                        ? "bg-white/5 text-(--kk-gold)"
                        : "text-(--kk-paper)/65 hover:bg-white/5 hover:text-(--kk-paper)")
                    }
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
