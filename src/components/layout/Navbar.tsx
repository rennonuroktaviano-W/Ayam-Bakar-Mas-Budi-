"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
import { navLinks, isActivePath } from "@/lib/nav";
import { waCustomLink } from "@/lib/whatsapp";
import { site } from "@/data/site";
import { Logo } from "./Logo";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll and support Esc while the drawer is open.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition duration-300 ${
        solid
          ? "bg-api-cream/95 backdrop-blur-md shadow-md shadow-api-charcoal/5"
          : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Navigasi utama"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >
        <Logo tone={solid ? "dark" : "dark"} />

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const active = isActivePath(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`relative inline-flex min-h-11 items-center rounded-full px-4 text-sm font-semibold transition ${
                  active
                    ? "text-api-orange"
                    : "text-api-charcoal hover:text-api-orange"
                }`}
              >
                {link.label}
                {active ? (
                  <span
                    aria-hidden
                    className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-api-orange"
                  />
                ) : null}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={waCustomLink("Halo, saya mau pesan ayam bakar.")}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-11 items-center gap-2 rounded-full bg-api-orange px-5 text-sm font-semibold text-white shadow-lg shadow-api-orange/30 transition hover:bg-api-orange-dark active:scale-[0.98] sm:inline-flex lg:hidden xl:inline-flex"
          >
            <Phone className="h-4 w-4" aria-hidden />
            Pesan Sekarang
          </a>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-drawer"
            aria-label={open ? "Tutup menu navigasi" : "Buka menu navigasi"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-api-charcoal/10 bg-white/80 text-api-charcoal transition hover:border-api-orange/40 hover:text-api-orange lg:hidden"
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden />
            ) : (
              <Menu className="h-5 w-5" aria-hidden />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        id="mobile-drawer"
        className={`fixed inset-x-0 top-16 bottom-0 z-50 lg:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <button
          type="button"
          tabIndex={open ? 0 : -1}
          onClick={() => setOpen(false)}
          aria-label="Tutup menu"
          className={`absolute inset-0 bg-api-charcoal/50 transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          role="dialog"
          aria-modal={open}
          aria-label="Menu navigasi"
          className={`absolute inset-x-0 top-0 flex h-full flex-col bg-api-cream pb-[calc(1rem+env(safe-area-inset-bottom))] transition-transform duration-300 ${
            open ? "translate-y-0" : "-translate-y-4 opacity-0"
          }`}
        >
          <ul className="flex flex-col gap-1 p-4 pt-6">
            {navLinks.map((link) => {
              const active = isActivePath(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    tabIndex={open ? 0 : -1}
                    aria-current={active ? "page" : undefined}
                    className={`flex min-h-13 items-center justify-between rounded-2xl px-4 py-3.5 text-base font-semibold transition ${
                      active
                        ? "bg-api-orange/10 text-api-orange"
                        : "text-api-charcoal hover:bg-api-charcoal/5"
                    }`}
                  >
                    {link.label}
                    {active ? (
                      <span
                        aria-hidden
                        className="h-2 w-2 rounded-full bg-api-orange"
                      />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-auto flex flex-col gap-3 p-4 pt-0">
            <a
              href={waCustomLink("Halo, saya mau pesan ayam bakar.")}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={open ? 0 : -1}
              className="inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-2xl bg-api-orange px-5 py-3.5 text-base font-semibold text-white shadow-lg shadow-api-orange/30"
            >
              <Phone className="h-5 w-5" aria-hidden />
              Pesan via WhatsApp
            </a>
            <p className="text-center text-xs text-stone-500">
              {site.phoneDisplay} · Buka 10.00&ndash;23.00 WIB
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
