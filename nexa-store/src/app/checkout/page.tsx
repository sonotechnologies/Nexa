"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { useStore } from "@/lib/store";
import { resolveCartLines, cartSubtotal } from "@/lib/cart-helpers";
import { money } from "@/lib/format";

const PAYMENT_METHODS = [
  { key: "card", label: "Card" },
  { key: "wallet", label: "Wallet" },
  { key: "nexa-credit", label: "Nexa credit" },
] as const;

function genOrderNumber() {
  const n = Math.floor(100000 + Math.random() * 900000);
  return `NX-${n}`;
}

export default function CheckoutPage() {
  const router = useRouter();
  const cart = useStore((s) => s.cart);
  const clearCart = useStore((s) => s.clearCart);
  const resolved = resolveCartLines(cart);
  const subtotal = cartSubtotal(resolved);
  const tax = subtotal * 0.085;
  const total = subtotal + tax;

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [method, setMethod] = useState<(typeof PAYMENT_METHODS)[number]["key"]>("card");
  const [submitting, setSubmitting] = useState(false);

  function placeOrder(e: React.FormEvent) {
    e.preventDefault();
    if (resolved.length === 0) return;
    setSubmitting(true);
    const order = genOrderNumber();
    const params = new URLSearchParams({ order, total: total.toFixed(2), items: String(resolved.reduce((n, r) => n + r.line.qty, 0)) });
    clearCart();
    router.push(`/order-confirmation?${params.toString()}`);
  }

  if (resolved.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-16 md:px-8">
        <div className="text-[14.5px] text-ink/65">Your bag is empty — add something before checking out.</div>
        <Link href="/category/all" className="mt-4 inline-block bg-dark px-5 py-3 text-[13.5px] font-semibold text-paper">
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={placeOrder} className="mx-auto max-w-3xl px-5 pb-28 pt-6 md:px-8 md:pb-16">
      <div className="flex flex-col gap-1.5 border-b border-ink/22 pb-5">
        <div className="text-[26px] font-bold tracking-[-.026em]" style={{ fontStretch: "112%" }}>
          Checkout
        </div>
      </div>

      <div className="flex flex-col gap-8 py-6">
        <div className="flex flex-col gap-3">
          <div className="font-mono text-[11px] text-ink/60">deliver to</div>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="full name"
            className="border-b border-ink/28 bg-transparent py-2 text-[14.5px] outline-none placeholder:text-ink/35"
          />
          <input
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="street address"
            className="border-b border-ink/28 bg-transparent py-2 text-[14.5px] outline-none placeholder:text-ink/35"
          />
          <div className="flex gap-4">
            <input
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="city"
              className="flex-1 border-b border-ink/28 bg-transparent py-2 text-[14.5px] outline-none placeholder:text-ink/35"
            />
            <input
              required
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              placeholder="ZIP"
              className="w-28 border-b border-ink/28 bg-transparent py-2 text-[14.5px] outline-none placeholder:text-ink/35"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="font-mono text-[11px] text-ink/60">pay with</div>
          <div className="flex gap-2.5">
            {PAYMENT_METHODS.map((m) => (
              <button
                key={m.key}
                type="button"
                onClick={() => setMethod(m.key)}
                className={clsx(
                  "flex-1 border py-3.5 text-center font-mono text-[11.5px]",
                  method === m.key ? "border-dark bg-dark text-paper" : "border-ink/22 text-ink/72"
                )}
              >
                {m.label}
              </button>
            ))}
          </div>
          {method === "card" ? (
            <div className="mt-1 flex flex-col gap-3">
              <input
                required
                placeholder="card number"
                inputMode="numeric"
                className="border-b border-ink/28 bg-transparent py-2 font-mono text-[14px] tracking-[.04em] outline-none placeholder:text-ink/35"
              />
              <div className="flex gap-4">
                <input
                  required
                  placeholder="MM / YY"
                  className="flex-1 border-b border-ink/28 bg-transparent py-2 font-mono text-[14px] outline-none placeholder:text-ink/35"
                />
                <input
                  required
                  placeholder="CVC"
                  className="w-24 border-b border-ink/28 bg-transparent py-2 font-mono text-[14px] outline-none placeholder:text-ink/35"
                />
              </div>
            </div>
          ) : (
            <div className="mt-1 font-mono text-[11.5px] text-ink/55">
              {method === "wallet" ? "You'll confirm this payment from your device wallet." : "24-month installments, 0% APR, subject to approval."}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 bg-panel p-4">
          {resolved.map(({ line, product }) => (
            <div key={line.key} className="flex justify-between gap-4 font-mono text-[11px] text-ink/70">
              <div>
                {product.name} · {line.variant}
                {line.storage ? ` · ${line.storage}` : ""} · qty {line.qty}
              </div>
              <div className="tabular shrink-0">{money(product.price * line.qty)}</div>
            </div>
          ))}
        </div>

        <div className="flex items-baseline justify-between border-t-2 border-dark pt-4">
          <div className="text-[16px] font-semibold tracking-[-.016em]">Due today</div>
          <div className="font-mono text-[22px] font-semibold tabular">{money(total)}</div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-[57px] z-30 flex flex-col gap-2 border-t border-ink/16 bg-paper/95 px-5 py-3.5 backdrop-blur md:static md:mt-2 md:border-0 md:bg-transparent md:p-0 md:backdrop-blur-none">
        <button type="submit" disabled={submitting} className="bg-accent py-4 text-center text-[15px] font-semibold text-white disabled:opacity-60">
          {submitting ? "Placing order…" : `Pay ${money(total)}`}
        </button>
        <div className="text-center font-mono text-[10px] text-ink/50">free returns within 14 days</div>
      </div>
    </form>
  );
}
