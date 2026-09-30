import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

const navItems = [
  { href: "/books", label: "Books" },
  { href: "/sports", label: "Athletics" },
  { href: "/speaking", label: "Voice" },
  { href: "/author", label: "Bio" },
  { href: "/press", label: "Press" },
  { href: "/contact", label: "Contact" },
];

/**
 * SiteHeader — the business-professional site chrome.
 * Cream paper, ink text, quiet confidence. No FX.
 */
export default function SiteHeader() {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#f2efe6]/90 backdrop-blur-md border-b border-[#101400]/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" data-testid="logo-button">
            <span className="font-sans text-sm md:text-base tracking-[0.3em] uppercase font-bold text-[#101400] cursor-pointer">
              Kiminou&nbsp;Knox
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navItems.map((item) => {
              const active = location === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <span
                    className={`text-[13px] uppercase tracking-[0.18em] cursor-pointer transition-colors ${
                      active ? "text-[#101400] font-semibold" : "text-[#101400]/55 hover:text-[#101400]"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          <button
            className="md:hidden p-1 text-[#101400]/70 hover:text-[#101400] transition-colors"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#f2efe6] border-t border-[#101400]/10" role="dialog" aria-label="Mobile navigation">
          <nav className="px-6 py-6 flex flex-col gap-5" aria-label="Mobile">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                <span
                  className={`block text-base uppercase tracking-[0.2em] cursor-pointer ${
                    location === item.href ? "text-[#101400] font-semibold" : "text-[#101400]/60"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
