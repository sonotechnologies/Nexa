"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import clsx from "clsx";
import type { Product } from "@/data/types";
import { categories } from "@/data/products";
import { ProductRow } from "@/components/ProductRow";

type PriceBand = "all" | "under-300" | "300-900" | "900-1500" | "1500-plus";
type SortKey = "newest" | "price-asc" | "price-desc" | "rating";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "newest", label: "newest" },
  { key: "price-asc", label: "price ↑" },
  { key: "price-desc", label: "price ↓" },
  { key: "rating", label: "top rated" },
];

const PRICE_BANDS: { key: PriceBand; label: string; test: (p: number) => boolean }[] = [
  { key: "all", label: "any", test: () => true },
  { key: "under-300", label: "< $300", test: (p) => p < 300 },
  { key: "300-900", label: "$300–900", test: (p) => p >= 300 && p <= 900 },
  { key: "900-1500", label: "$900–1500", test: (p) => p > 900 && p <= 1500 },
  { key: "1500-plus", label: "$1500+", test: (p) => p > 1500 },
];

export function ListingClient({ title, items }: { title: string; items: Product[] }) {
  const searchParams = useSearchParams();
  const [q, setQ] = useState(searchParams.get("q") ?? "");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sortIdx, setSortIdx] = useState(0);
  const [priceBand, setPriceBand] = useState<PriceBand>("all");
  const [onlyNew, setOnlyNew] = useState(false);
  const [onlySale, setOnlySale] = useState(false);
  const [activeCats, setActiveCats] = useState<Set<string>>(new Set());

  const band = PRICE_BANDS.find((b) => b.key === priceBand)!;
  const sort = SORTS[sortIdx];

  const filtered = useMemo(() => {
    let list = items.filter((p) => band.test(p.price));
    if (onlyNew) list = list.filter((p) => p.isNew);
    if (onlySale) list = list.filter((p) => p.compareAt);
    if (activeCats.size > 0) list = list.filter((p) => activeCats.has(p.category));
    if (q.trim()) {
      const needle = q.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(needle) ||
          p.tagline.toLowerCase().includes(needle) ||
          p.category.includes(needle)
      );
    }
    const sorted = [...list];
    if (sort.key === "price-asc") sorted.sort((a, b) => a.price - b.price);
    else if (sort.key === "price-desc") sorted.sort((a, b) => b.price - a.price);
    else if (sort.key === "rating") sorted.sort((a, b) => b.rating - a.rating);
    else sorted.sort((a, b) => Number(b.isNew) - Number(a.isNew));
    return sorted;
  }, [items, band, onlyNew, onlySale, activeCats, q, sort.key]);

  const activeTags: { label: string; onClear: () => void }[] = [];
  if (priceBand !== "all") activeTags.push({ label: band.label, onClear: () => setPriceBand("all") });
  if (onlyNew) activeTags.push({ label: "new", onClear: () => setOnlyNew(false) });
  if (onlySale) activeTags.push({ label: "on sale", onClear: () => setOnlySale(false) });
  activeCats.forEach((c) =>
    activeTags.push({
      label: c,
      onClear: () => setActiveCats((s) => new Set([...s].filter((x) => x !== c))),
    })
  );
  if (q.trim()) activeTags.push({ label: `"${q.trim()}"`, onClear: () => setQ("") });

  const filterCount = activeTags.length;

  function toggleCat(slug: string) {
    setActiveCats((s) => {
      const next = new Set(s);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  }

  return (
    <div className="relative pb-24 md:pb-0">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-col gap-4 border-b border-ink/14 py-6">
          <div className="flex items-baseline justify-between">
            <div className="text-[26px] font-bold tracking-[-.026em]" style={{ fontStretch: "112%" }}>
              {title}
            </div>
            <div className="font-mono text-[11px] text-ink/55">
              {String(filtered.length).padStart(2, "0")} of {String(items.length).padStart(2, "0")}
            </div>
          </div>

          <div className="flex items-stretch border border-ink/22">
            <button
              type="button"
              onClick={() => setSheetOpen(true)}
              className="flex shrink-0 items-center gap-2.5 border-r border-ink/22 px-4 py-2.5 font-mono text-[11.5px] font-medium"
            >
              <span className="h-2.5 w-2.5 bg-accent" />
              Filter {filterCount > 0 ? `(${filterCount})` : ""}
            </button>
            <button
              type="button"
              onClick={() => setSortIdx((i) => (i + 1) % SORTS.length)}
              className="flex flex-1 items-center justify-between px-4 py-2.5 font-mono text-[11.5px] text-ink/70"
            >
              <span>sort: {sort.label}</span>
              <span className="flex flex-col items-end gap-[3px]">
                <span className="h-[1.5px] w-2.5 bg-ink/55" />
                <span className="h-[1.5px] w-[9px] bg-ink/55" />
                <span className="h-[1.5px] w-1.5 bg-ink/55" />
              </span>
            </button>
          </div>

          {activeTags.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {activeTags.map((t) => (
                <button
                  key={t.label}
                  onClick={t.onClear}
                  type="button"
                  className="flex items-center gap-2 bg-tint px-2.5 py-1.5 font-mono text-[11px]"
                >
                  <span className="h-2.5 w-[1.5px] bg-accent" />
                  {t.label}
                  <span className="text-ink/45">×</span>
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="divide-y divide-ink/12">
          {filtered.map((p) => (
            <ProductRow key={p.id} product={p} />
          ))}
          {filtered.length === 0 ? (
            <div className="py-16 text-center font-mono text-[12.5px] text-ink/50">no products match those filters</div>
          ) : null}
        </div>
      </div>

      {sheetOpen ? (
        <>
          <div className="fixed inset-0 z-40 bg-dark/40" onClick={() => setSheetOpen(false)} />
          <div className="fixed inset-x-0 bottom-0 z-50 flex max-h-[85vh] flex-col gap-6 overflow-y-auto border-t-2 border-dark bg-paper px-5 pb-8 pt-5 md:inset-x-auto md:left-1/2 md:bottom-auto md:top-1/2 md:w-[420px] md:-translate-x-1/2 md:-translate-y-1/2 md:border-2">
            <div className="flex items-baseline justify-between">
              <div className="text-[20px] font-bold tracking-[-.022em]" style={{ fontStretch: "110%" }}>
                Filter
              </div>
              <button type="button" onClick={() => setSheetOpen(false)} className="font-mono text-[11.5px] text-ink/60">
                close
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <div className="font-mono text-[11px] text-ink/60">price</div>
              <div className="flex flex-wrap gap-2">
                {PRICE_BANDS.map((b) => (
                  <button
                    key={b.key}
                    type="button"
                    onClick={() => setPriceBand(b.key)}
                    className={clsx(
                      "border px-3 py-2 font-mono text-[11.5px]",
                      priceBand === b.key ? "border-dark bg-dark text-paper" : "border-ink/22 text-ink/72"
                    )}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {items.some((p) => p.category !== items[0]?.category) || title === "All products" ? (
              <div className="flex flex-col gap-3">
                <div className="font-mono text-[11px] text-ink/60">category</div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((c) => (
                    <button
                      key={c.slug}
                      type="button"
                      onClick={() => toggleCat(c.slug)}
                      className={clsx(
                        "border px-3 py-2 font-mono text-[11.5px]",
                        activeCats.has(c.slug) ? "border-dark bg-dark text-paper" : "border-ink/22 text-ink/72"
                      )}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="flex flex-col">
              <button
                type="button"
                onClick={() => setOnlyNew((v) => !v)}
                className="flex items-center justify-between border-b border-ink/12 py-3"
              >
                <span className="text-[14.5px] font-medium tracking-[-.01em]">New this season</span>
                <span className={clsx("h-[15px] w-[15px] border border-ink/35", onlyNew && "bg-accent")} />
              </button>
              <button
                type="button"
                onClick={() => setOnlySale((v) => !v)}
                className="flex items-center justify-between border-b border-ink/12 py-3"
              >
                <span className="text-[14.5px] font-medium tracking-[-.01em]">On sale</span>
                <span className={clsx("h-[15px] w-[15px] border border-ink/35", onlySale && "bg-accent")} />
              </button>
            </div>

            <button
              type="button"
              onClick={() => setSheetOpen(false)}
              className="bg-dark py-4 text-center text-[15px] font-semibold text-paper"
            >
              Show {filtered.length} {filtered.length === 1 ? "product" : "products"}
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}
