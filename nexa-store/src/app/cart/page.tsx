"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import { resolveCartLines, cartSubtotal } from "@/lib/cart-helpers";
import { PlaceholderArt } from "@/components/PlaceholderArt";
import { moneyRound, money } from "@/lib/format";
import { products } from "@/data/products";

export default function CartPage() {
  const cart = useStore((s) => s.cart);
  const setQty = useStore((s) => s.setQty);
  const removeFromCart = useStore((s) => s.removeFromCart);
  const addToCart = useStore((s) => s.addToCart);

  const resolved = resolveCartLines(cart);
  const subtotal = cartSubtotal(resolved);
  const tax = subtotal * 0.085;
  const total = subtotal + tax;

  const upsell = products.find((p) => p.category === "power-banks" && !cart.some((l) => l.productId === p.id));

  return (
    <div className="mx-auto max-w-3xl px-5 pb-28 pt-6 md:px-8 md:pb-16">
      <div className="flex items-baseline justify-between border-b border-ink/22 pb-4">
        <div className="text-[26px] font-bold tracking-[-.026em]" style={{ fontStretch: "112%" }}>
          Bag
        </div>
        <div className="font-mono text-[11px] text-ink/55">
          {resolved.reduce((n, r) => n + r.line.qty, 0)} items
        </div>
      </div>

      {resolved.length === 0 ? (
        <div className="flex flex-col items-start gap-4 py-16">
          <div className="text-[14.5px] text-ink/65">Your bag is empty.</div>
          <Link href="/category/all" className="bg-dark px-5 py-3 text-[13.5px] font-semibold text-paper">
            Browse products
          </Link>
        </div>
      ) : (
        <>
          <div className="divide-y divide-ink/12">
            {resolved.map(({ line, product }) => (
              <div key={line.key} className="flex gap-4 py-5">
                <PlaceholderArt tone="light" label={product.frames[0]?.label ?? ""} className="h-[100px] w-[84px] shrink-0" />
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between gap-3">
                      <Link href={`/product/${product.slug}`} className="text-[16px] font-semibold tracking-[-.016em] hover:text-accent">
                        {product.name}
                      </Link>
                      <div className="font-mono text-[15px] font-semibold tabular">{moneyRound(product.price * line.qty)}</div>
                    </div>
                    <div className="font-mono text-[10.5px] text-ink/55">
                      {line.variant}
                      {line.storage ? ` · ${line.storage}` : ""}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-stretch border border-ink/22 font-mono text-[12px]">
                      <button
                        type="button"
                        onClick={() => setQty(line.key, line.qty - 1)}
                        className="px-3 py-1.5 border-r border-ink/22"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <div className="px-3.5 py-1.5">{line.qty}</div>
                      <button
                        type="button"
                        onClick={() => setQty(line.key, line.qty + 1)}
                        className="px-3 py-1.5 border-l border-ink/22"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(line.key)}
                      className="font-mono text-[11px] text-ink/50 hover:text-ink"
                    >
                      remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {upsell ? (
            <div className="my-5 flex items-center gap-3.5 border border-ink/18 p-4">
              <PlaceholderArt tone="tint" label={upsell.frames[0]?.label ?? ""} className="h-[52px] w-[52px] shrink-0" />
              <div className="flex flex-1 flex-col gap-0.5">
                <div className="text-[13.5px] font-semibold tracking-[-.01em]">Add {upsell.name}</div>
                <div className="font-mono text-[10.5px] text-ink/55">
                  {moneyRound(upsell.price)} · {upsell.specs[1]?.v}
                </div>
              </div>
              <button
                type="button"
                onClick={() => addToCart(upsell.id, upsell.variants[0].name, upsell.storageOptions?.[0])}
                className="font-mono text-[11px] font-medium text-accent"
              >
                add
              </button>
            </div>
          ) : null}

          <div className="flex flex-col font-mono text-[11.5px]">
            <div className="flex justify-between border-t border-ink/12 py-2.5">
              <div className="text-ink/60">subtotal</div>
              <div className="tabular">{money(subtotal)}</div>
            </div>
            <div className="flex justify-between border-t border-ink/12 py-2.5">
              <div className="text-ink/60">delivery</div>
              <div>free, Tue</div>
            </div>
            <div className="flex justify-between border-t border-ink/12 py-2.5">
              <div className="text-ink/60">estimated tax</div>
              <div className="tabular">{money(tax)}</div>
            </div>
          </div>
          <div className="mt-1.5 flex items-baseline justify-between border-t-2 border-dark pt-4">
            <div className="text-[17px] font-semibold tracking-[-.018em]">Total</div>
            <div className="font-mono text-[22px] font-semibold tabular">{money(total)}</div>
          </div>

          <div className="fixed inset-x-0 bottom-[57px] z-30 border-t border-ink/16 bg-paper/95 px-5 py-3.5 backdrop-blur md:static md:mt-6 md:border-0 md:bg-transparent md:p-0 md:backdrop-blur-none">
            <Link href="/checkout" className="block bg-dark py-4 text-center text-[15px] font-semibold text-paper">
              Check out
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
