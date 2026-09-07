import Link from "next/link";
import { categories } from "@/data/products";
import { NewsletterForm } from "@/components/NewsletterForm";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-ink/14 bg-dark pb-24 text-paper/90 md:pb-10">
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div className="flex flex-col gap-4">
            <div className="font-display text-[19px] font-extrabold tracking-[.02em]" style={{ fontStretch: "88%" }}>
              NEXA
            </div>
            <p className="max-w-[26ch] text-[13.5px] leading-relaxed text-paper/62">
              Phones, laptops, headsets, and power delivery. Built for precision, priced without theatre.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="font-mono text-[11px] text-paper/50">shop</div>
            <nav className="flex flex-col gap-2 text-[13.5px]">
              {categories.map((c) => (
                <Link key={c.slug} href={`/category/${c.slug}`} className="text-paper/78 hover:text-paper">
                  {c.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-3">
            <div className="font-mono text-[11px] text-paper/50">account</div>
            <nav className="flex flex-col gap-2 text-[13.5px]">
              <Link href="/cart" className="text-paper/78 hover:text-paper">Bag</Link>
              <Link href="/wishlist" className="text-paper/78 hover:text-paper">Saved</Link>
              <Link href="/checkout" className="text-paper/78 hover:text-paper">Checkout</Link>
            </nav>
          </div>

          <NewsletterForm />
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-paper/14 pt-6 font-mono text-[10.5px] text-paper/45 md:flex-row md:items-center md:justify-between">
          <div>Nexa is a demo storefront. No orders are real.</div>
          <div>© 2026 Nexa</div>
        </div>
      </div>
    </footer>
  );
}
