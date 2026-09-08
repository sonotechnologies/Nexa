"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import { useAuthGate } from "@/lib/use-auth-gate";
import { getProductById } from "@/data/products";
import { PlaceholderArt } from "@/components/PlaceholderArt";
import { moneyRound } from "@/lib/format";

export default function WishlistPage() {
  const wishlist = useStore((s) => s.wishlist);
  const moveToCart = useStore((s) => s.moveToCart);
  const toggleWishlist = useStore((s) => s.toggleWishlist);
  const { requireAuth } = useAuthGate();

  const saved = wishlist.map((id) => getProductById(id)).filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="mx-auto max-w-3xl px-5 pb-28 pt-6 md:px-8 md:pb-16">
      <div className="flex items-baseline justify-between border-b border-ink/22 pb-4">
        <div className="text-[26px] font-bold tracking-[-.026em]" style={{ fontStretch: "112%" }}>
          Saved
        </div>
        <div className="font-mono text-[11px] text-ink/55">{saved.length} items</div>
      </div>

      {saved.length === 0 ? (
        <div className="flex flex-col items-start gap-4 py-16">
          <div className="text-[14.5px] text-ink/65">Nothing saved yet.</div>
          <Link href="/category/all" className="bg-dark px-5 py-3 text-[13.5px] font-semibold text-paper">
            Browse products
          </Link>
        </div>
      ) : (
        <div className="divide-y divide-ink/12">
          {saved.map((product) => (
            <div key={product.id} className="flex gap-4 py-5">
              <PlaceholderArt category={product.category} tone="light" className="h-[92px] w-[76px] shrink-0" />
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex flex-col gap-1.5">
                  <Link href={`/product/${product.slug}`} className="text-[15.5px] font-semibold tracking-[-.015em] hover:text-accent">
                    {product.name}
                  </Link>
                  <div className="font-mono text-[10.5px] text-ink/55">{product.tagline}</div>
                </div>
                <div className="flex items-end justify-between gap-3">
                  <div className="font-mono text-[15px] font-semibold tabular">{moneyRound(product.price)}</div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => toggleWishlist(product.id)}
                      className="font-mono text-[11px] text-ink/50 hover:text-ink"
                    >
                      remove
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (!requireAuth()) return;
                        moveToCart(product.id, product.variants[0].name, product.storageOptions?.[0]);
                      }}
                      className="border border-ink/28 px-3 py-1.5 font-mono text-[11px]"
                    >
                      add to bag
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
