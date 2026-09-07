"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import type { Product } from "@/data/types";
import { useStore } from "@/lib/store";
import { StarRating } from "@/components/StarRating";
import { moneyRound } from "@/lib/format";

type Tab = "description" | "specs" | "reviews";

export function ProductDetailClient({ product }: { product: Product }) {
  const [frameIdx, setFrameIdx] = useState(0);
  const [variantIdx, setVariantIdx] = useState(0);
  const [storageIdx, setStorageIdx] = useState(0);
  const [sweep, setSweep] = useState(false);
  const [tab, setTab] = useState<Tab>("description");
  const [addedFlash, setAddedFlash] = useState(false);
  const railRef = useRef<HTMLDivElement>(null);
  const sweepTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const addTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const addToCart = useStore((s) => s.addToCart);
  const toggleWishlist = useStore((s) => s.toggleWishlist);
  const isWishlisted = useStore((s) => s.isWishlisted(product.id));

  const variant = product.variants[variantIdx];
  const storage = product.storageOptions?.[storageIdx];
  const frameCount = product.frames.length;

  function pickVariant(i: number) {
    setVariantIdx(i);
    setSweep(true);
    clearTimeout(sweepTimer.current);
    sweepTimer.current = setTimeout(() => setSweep(false), 300);
  }

  function jumpFrame(i: number) {
    setFrameIdx(Math.max(0, Math.min(frameCount - 1, i)));
  }

  function frameFromClientX(clientX: number) {
    const rail = railRef.current;
    if (!rail) return;
    const rect = rail.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(0.9999, (clientX - rect.left) / rect.width));
    jumpFrame(Math.floor(ratio * frameCount));
  }

  function onRailPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    (e.target as Element).setPointerCapture(e.pointerId);
    frameFromClientX(e.clientX);
  }
  function onRailPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.buttons !== 1) return;
    frameFromClientX(e.clientX);
  }

  function handleAddToCart() {
    addToCart(product.id, variant.name, storage, 1);
    setAddedFlash(true);
    clearTimeout(addTimer.current);
    addTimer.current = setTimeout(() => setAddedFlash(false), 1400);
  }

  const monthly = (product.price / 24).toFixed(2);

  return (
    <div>
      <div className="mx-auto max-w-6xl md:grid md:grid-cols-2 md:gap-10 md:px-8 md:pt-6">
        {/* GALLERY */}
        <div className="md:sticky md:top-20 md:self-start">
          <div className="flex items-center justify-between px-5 py-3 font-mono text-[11.5px] text-ink/70 md:hidden">
            <Link href={`/category/${product.category}`}>back</Link>
            <div>SKU {product.id.toUpperCase()}</div>
            <button type="button" onClick={() => toggleWishlist(product.id)}>
              {isWishlisted ? "saved" : "save"}
            </button>
          </div>

          <div className="relative overflow-hidden" style={{ background: variant.stage }}>
            <div
              className="flex"
              style={{
                width: `${frameCount * 100}%`,
                transform: `translateX(-${(100 / frameCount) * frameIdx}%)`,
                transition: "transform 520ms cubic-bezier(.16,.84,.24,1)",
              }}
            >
              {product.frames.map((f, i) => (
                <div
                  key={i}
                  className="stripe-dark flex h-[340px] flex-1 shrink-0 items-center justify-center md:h-[560px]"
                >
                  <div className="px-6 text-center font-mono text-[11px] leading-relaxed text-white/62">
                    {f.label}
                    <br />
                    {f.note}
                  </div>
                </div>
              ))}
            </div>
            <div
              className="pointer-events-none absolute inset-0 bg-paper mix-blend-overlay transition-opacity duration-[420ms]"
              style={{ opacity: sweep ? 0.34 : 0 }}
            />
            <div className="absolute bottom-4 left-[18px] font-mono text-[11px] tabular text-white/80">
              {String(frameIdx + 1).padStart(2, "0")} / {String(frameCount).padStart(2, "0")}
            </div>
          </div>

          <div className="flex flex-col gap-2.5 border-b border-ink/14 px-5 py-3.5">
            <div
              ref={railRef}
              onPointerDown={onRailPointerDown}
              onPointerMove={onRailPointerMove}
              className="relative h-[38px] cursor-pointer border-b border-ink/22"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, rgba(34,36,43,.3) 0 1px, rgba(34,36,43,0) 1px 9px)",
                backgroundSize: "100% 14px",
                backgroundPosition: "bottom",
                backgroundRepeat: "repeat-x",
              }}
            >
              <div
                className="absolute top-0 bottom-0 border-x-2 border-accent bg-accent/10 transition-[left] duration-500"
                style={{ width: `${100 / frameCount}%`, left: `${(100 / frameCount) * frameIdx}%` }}
              >
                <div className="absolute left-0 right-0 top-4 h-[2px] bg-accent" />
              </div>
            </div>
            <div className="flex justify-between font-mono text-[10.5px] text-ink/50">
              {product.frames.map((f, i) => (
                <button key={i} type="button" onClick={() => jumpFrame(i)} className={clsx(i === frameIdx && "text-ink")}>
                  {f.label.split(" · ")[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* INFO */}
        <div className="flex flex-col">
          <div className="hidden items-center justify-between px-0 pb-4 pt-6 font-mono text-[11.5px] text-ink/70 md:flex">
            <Link href={`/category/${product.category}`} className="hover:text-ink">back</Link>
            <div>SKU {product.id.toUpperCase()}</div>
            <button type="button" onClick={() => toggleWishlist(product.id)} className="hover:text-ink">
              {isWishlisted ? "saved" : "save"}
            </button>
          </div>

          <div className="flex flex-col gap-3.5 px-5 pt-6 md:px-0 md:pt-0">
            <div className="text-[30px] font-bold leading-none tracking-[-.03em] md:text-[36px]" style={{ fontStretch: "114%" }}>
              {product.name}
            </div>
            <StarRating rating={product.rating} count={product.reviewCount} />
            <div className="flex items-baseline gap-3">
              <div className="font-mono text-[24px] font-semibold tabular">{moneyRound(product.price)}</div>
              <div className="font-mono text-[12px] text-ink/50">or ${monthly} / mo · 24 mo</div>
            </div>
            <div className="text-[14.5px] leading-relaxed text-ink/74">{product.description}</div>
          </div>

          <div className="flex flex-col gap-3 px-5 py-5 md:px-0">
            <div className="flex items-baseline justify-between">
              <div className="font-mono text-[11px] text-ink/60">finish</div>
              <div className="text-[14px] font-semibold tracking-[-.012em]">{variant.name}</div>
            </div>
            <div className="flex gap-2.5">
              {product.variants.map((v, i) => (
                <button
                  key={v.name}
                  type="button"
                  onClick={() => pickVariant(i)}
                  aria-label={v.name}
                  className="flex-1 border p-[5px] transition-colors duration-200"
                  style={{ borderColor: i === variantIdx ? "var(--color-accent)" : "transparent" }}
                >
                  <div className="h-11" style={{ background: v.hex }} />
                </button>
              ))}
            </div>

            {product.storageOptions ? (
              <div className="mt-1 flex gap-2.5">
                {product.storageOptions.map((label, i) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setStorageIdx(i)}
                    className={clsx(
                      "flex-1 border py-3 text-center font-mono text-[12px]",
                      i === storageIdx ? "border-dark bg-dark text-paper" : "border-ink/22 text-ink/72"
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          {/* TABS */}
          <div className="px-5 md:px-0">
            <div className="flex gap-5 border-b border-ink/22 font-mono text-[11.5px]">
              {(["description", "specs", "reviews"] as Tab[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className={clsx(
                    "border-b-2 py-2.5 capitalize",
                    tab === t ? "border-dark text-ink" : "border-transparent text-ink/50"
                  )}
                >
                  {t === "reviews" ? `reviews (${product.reviews.length})` : t}
                </button>
              ))}
            </div>

            <div className="py-5">
              {tab === "description" ? (
                <p className="max-w-[58ch] text-[14.5px] leading-relaxed text-ink/74">{product.description}</p>
              ) : null}

              {tab === "specs" ? (
                <div className="flex flex-col">
                  {product.specs.map((s) => (
                    <div key={s.k} className="flex justify-between gap-5 border-b border-ink/10 py-2.5 font-mono text-[11.5px]">
                      <div className="text-ink/55">{s.k}</div>
                      <div className="text-right">{s.v}</div>
                    </div>
                  ))}
                </div>
              ) : null}

              {tab === "reviews" ? (
                <div className="flex flex-col divide-y divide-ink/10">
                  {product.reviews.map((rv) => (
                    <div key={rv.id} className="flex flex-col gap-1.5 py-4">
                      <div className="flex items-center justify-between">
                        <div className="text-[13.5px] font-semibold">{rv.title}</div>
                        <StarRating rating={rv.rating} />
                      </div>
                      <div className="font-mono text-[10.5px] text-ink/45">
                        {rv.author} · {rv.date}
                      </div>
                      <p className="text-[13.5px] leading-relaxed text-ink/72">{rv.body}</p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
          <div className="h-24 md:h-8" />
        </div>
      </div>

      {/* STICKY ADD TO BAG */}
      <div className="fixed inset-x-0 bottom-[57px] z-30 flex items-center gap-4 border-t border-ink/14 bg-dark px-5 py-3.5 text-paper md:sticky md:bottom-0 md:mt-0">
        <div className="flex flex-1 flex-col gap-1">
          <div className="font-mono text-[16px] font-semibold tabular">{moneyRound(product.price)}</div>
          <div className="font-mono text-[10.5px] text-paper/62">
            {variant.name}
            {storage ? ` · ${storage}` : ""} · ships Tue
          </div>
        </div>
        <button
          type="button"
          onClick={handleAddToCart}
          className="bg-accent px-6 py-3.5 text-[15px] font-semibold text-white transition-transform active:scale-[.97]"
        >
          {addedFlash ? "Added ✓" : "Add to bag"}
        </button>
      </div>
    </div>
  );
}
