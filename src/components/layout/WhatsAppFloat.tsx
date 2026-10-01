"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { waCustomLink } from "@/lib/whatsapp";

const waHref = waCustomLink("Halo, saya mau pesan ayam bakar.");

/**
 * Mobile: fixed bottom bar (respects iPhone safe area).
 * sm and up: floating pill bottom-right.
 * Body has matching padding-bottom so the bar never covers content.
 */
export function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Mobile bottom bar */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-black/5 bg-white/95 px-4 pt-2.5 backdrop-blur-md sm:hidden">
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-api-orange px-5 text-base font-semibold text-white shadow-lg shadow-api-orange/30 active:scale-[0.99]"
          style={{ marginBottom: "max(0.625rem, env(safe-area-inset-bottom))" }}
        >
          <MessageCircle className="h-5 w-5" aria-hidden />
          Pesan Sekarang
        </a>
      </div>

      {/* Desktop floating pill */}
      <div
        className={`fixed bottom-6 right-6 z-50 hidden flex-col items-end gap-3 sm:flex ${
          visible ? "opacity-100" : "pointer-events-none opacity-0"
        } transition duration-300`}
      >
        <Link
          href="/menu"
          className="inline-flex min-h-11 items-center rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-api-charcoal shadow-lg shadow-api-charcoal/15 transition hover:text-api-orange"
        >
          Lihat Semua Menu
        </Link>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-13 items-center gap-2 rounded-full bg-[#25D366] px-5 text-base font-semibold text-white shadow-xl shadow-[#25D366]/30 transition hover:brightness-105 active:scale-[0.98]"
        >
          <MessageCircle className="h-5 w-5" aria-hidden />
          Pesan via WA
        </a>
      </div>
    </>
  );
}
