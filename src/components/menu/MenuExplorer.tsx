"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import {
  categories,
  menu,
  categoryLabels,
  type MenuCategory,
} from "@/data/menu";
import { MenuCard } from "./MenuCard";

type Filter = MenuCategory | "semua";

export function MenuExplorer({ initialCategory = "semua" }: { initialCategory?: Filter }) {
  const [category, setCategory] = useState<Filter>(initialCategory);
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return menu.filter((item) => {
      const matchesCategory =
        category === "semua" ? true : item.category === category;
      if (!matchesCategory) return false;
      if (!normalized) return true;

      return (
        item.name.toLowerCase().includes(normalized) ||
        item.description.toLowerCase().includes(normalized) ||
        categoryLabels[item.category].toLowerCase().includes(normalized)
      );
    });
  }, [category, query]);

  const hasFilter = query.trim().length > 0 || category !== "semua";

  const reset = () => {
    setCategory("semua");
    setQuery("");
  };

  return (
    <>
      <div className="mb-8 flex flex-col gap-4">
        <div className="relative">
          <Search
            className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-stone-400"
            aria-hidden
          />
          <label htmlFor="menu-search" className="sr-only">
            Cari menu
          </label>
          <input
            id="menu-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari ayam bakar, paket, es teh..."
            className="min-h-13 w-full rounded-2xl border border-api-charcoal/10 bg-white pr-12 pl-12 text-base text-api-charcoal placeholder:text-stone-400 focus:border-api-orange focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-api-honey"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Bersihkan pencarian"
              className="absolute top-1/2 right-3 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-stone-400 transition hover:bg-stone-100 hover:text-stone-700"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          ) : null}
        </div>

        <div
          role="group"
          aria-label="Filter kategori menu"
          className="snap-x-rail -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
        >
          {categories.map((item) => {
            const active = category === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setCategory(item.id)}
                aria-pressed={active}
                className={`snap-item inline-flex min-h-11 shrink-0 items-center rounded-full px-5 text-sm font-semibold transition ${
                  active
                    ? "bg-api-charcoal text-white shadow-md shadow-api-charcoal/20"
                    : "bg-white text-stone-600 ring-1 ring-api-charcoal/10 hover:text-api-orange hover:ring-api-orange/40"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <p aria-live="polite" className="sr-only">
        {results.length} menu ditemukan
      </p>

      {results.length > 0 ? (
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((item) => (
            <li key={item.id} id={item.id} className="scroll-mt-24">
              <MenuCard item={item} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-3xl border border-dashed border-api-charcoal/20 bg-white px-6 py-14 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-api-orange/10 text-api-orange">
            <Search className="h-6 w-6" aria-hidden />
          </div>
          <h3 className="mt-4 font-display text-xl font-bold text-api-charcoal">
            Menu tidak ditemukan
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-stone-600">
            {hasFilter
              ? `Belum ada menu yang cocok${
                  query.trim() ? ` dengan kata kunci "${query.trim()}"` : ""
                }. Coba kategori lain atau tanya langsung ke kasir kami.`
              : "Belum ada menu di kategori ini."}
          </p>
          {hasFilter ? (
            <button
              type="button"
              onClick={reset}
              className="mt-6 inline-flex min-h-11 items-center rounded-full bg-api-charcoal px-5 text-sm font-semibold text-white transition hover:bg-api-orange"
            >
              Reset Filter
            </button>
          ) : null}
        </div>
      )}
    </>
  );
}
