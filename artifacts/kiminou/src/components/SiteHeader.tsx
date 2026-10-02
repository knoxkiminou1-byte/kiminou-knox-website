import { useState } from "react";
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
  if (href === "/") return location === "/";
  return location === href || location.startsWith(href + "/");
}

/**
 * SiteHeader — the business-professional site chrome.
 * Cream paper, ink text, quiet confidence. No Pixel-world UI.
 */
export default function SiteHeader() {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-(--kk-paper)/90 backdrop-blur-md border-b border-(--kk-ink)/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" data-testid="logo-button">
            <span className="font-sans text-sm md:text-base tracking-[0.3em] uppercase font-bold text-(--kk-ink) cursor-pointer">
              Kiminou&nbsp;Knox
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-5 xl:gap-7" aria-label="Main navigation">
            {navItems.map((item) => {
              const active = isActive(location, item.href);
              return (
                <Link key={item.href} href={item.href}>
                  <span
                    className={
                      "text-[12px] uppercase tracking-[0.16em] cursor-pointer transition-colors whitespace-nowrap " +
                      (active
                        ? "text-(--kk-ink) font-semibold"
                        : "text-(--kk-ink)/55 hover:text-(--kk-ink)")
                    }
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          <button
            className="lg:hidden p-2 -mr-2 text-(--kk-ink)/70 hover:text-(--kk-ink) transition-colors"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-(--kk-paper) border-t border-(--kk-ink)/10" role="dialog" aria-label="Mobile navigation">
          <nav className="px-6 py-6 grid gap-1 sm:grid-cols-2" aria-label="Mobile">
            {navItems.map((item) => {
              const active = isActive(location, item.href);
              return (
                <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                  <span
                    className={
                      "block rounded-sm px-3 py-3 text-sm uppercase tracking-[0.18em] cursor-pointer " +
                      (active
                        ? "bg-(--kk-card) text-(--kk-ink) font-semibold"
                        : "text-(--kk-ink)/60 hover:bg-(--kk-card)/70 hover:text-(--kk-ink)")
                    }
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
