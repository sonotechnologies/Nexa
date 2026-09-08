import Link from "next/link";
import { categories, getHeroProduct, getProductsByCategory, products } from "@/data/products";
import { PlaceholderArt } from "@/components/PlaceholderArt";
import { ProductTile } from "@/components/ProductTile";
import { moneyRound } from "@/lib/format";

export default function Home() {
  const hero = getHeroProduct();
  const editorial = products.find((p) => p.id === "vue")!;
  const featured = products.filter((p) => p.isFeatured && p.id !== hero.id && p.id !== editorial.id).slice(0, 6);

  return (
    <div className="pb-20 md:pb-0">
      {/* HERO */}
      <section className="relative overflow-hidden bg-dark text-paper">
        <PlaceholderArt category={hero.category} tone="dark" className="h-[380px] md:h-[520px]" />
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-7 md:px-8 md:py-10">
          <div className="font-display text-[34px] font-bold leading-none tracking-[-.026em] md:text-[52px]" style={{ fontStretch: "114%" }}>
            {hero.name}
          </div>
          <div className="max-w-md text-[14.5px] leading-relaxed text-paper/72">{hero.description}</div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 border-y border-paper/16 py-3 font-mono text-[11.5px] text-paper/70 sm:max-w-md">
            {hero.specs.slice(0, 4).map((s) => (
              <div key={s.k}>{s.v}</div>
            ))}
          </div>
          <div className="flex items-center justify-between gap-6 sm:max-w-md">
            <div className="font-mono text-[22px] font-medium tabular">{moneyRound(hero.price)}</div>
            <Link href={`/product/${hero.slug}`} className="bg-paper px-6 py-3 text-[14px] font-semibold text-dark">
              View the {hero.name.replace("Nexa ", "")}
            </Link>
          </div>
        </div>
      </section>

      {/* CATEGORY STRIP */}
      <section className="mx-auto max-w-6xl border-y border-ink/14 px-5 md:px-8">
        <div className="grid grid-cols-2 divide-x divide-y divide-ink/14 sm:grid-cols-4 sm:divide-y-0">
          {categories.map((c) => (
            <Link key={c.slug} href={`/category/${c.slug}`} className="flex flex-col items-start gap-1.5 py-5 pr-2">
              <div className="text-[14.5px] font-semibold tracking-[-.01em]">{c.name}</div>
              <div className="font-mono text-[10.5px] text-ink/48">
                {String(getProductsByCategory(c.slug).length).padStart(2, "0")} items
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* NEW THIS SEASON HEADER */}
      <section className="mx-auto max-w-6xl px-5 pb-2 pt-8 md:px-8">
        <div className="flex items-baseline justify-between">
          <div className="text-[20px] font-bold tracking-[-.02em]" style={{ fontStretch: "106%" }}>
            New this season
          </div>
          <div className="font-mono text-[11px] text-ink/50">{products.filter((p) => p.isNew).length} items</div>
        </div>
      </section>

      {/* EDITORIAL TILE */}
      <section className="mx-auto max-w-6xl px-5 md:px-8">
        <Link href={`/product/${editorial.slug}`} className="grid overflow-hidden bg-tint md:grid-cols-2">
          <PlaceholderArt category={editorial.category} tone="tint" className="h-[190px] md:h-full" />
          <div className="flex flex-col justify-center gap-2.5 p-6 md:p-10">
            <div className="text-[24px] font-bold leading-[1.04] tracking-[-.024em] md:text-[30px]" style={{ fontStretch: "110%" }}>
              {editorial.name}
              <br />
              spatial headset
            </div>
            <div className="max-w-[32ch] text-[13.5px] leading-relaxed text-ink/70">{editorial.tagline}</div>
            <div className="mt-1 font-mono text-[17px] font-medium tabular">{moneyRound(editorial.price)}</div>
          </div>
        </Link>
      </section>

      {/* FEATURED GRID */}
      <section className="mx-auto max-w-6xl px-5 pb-16 pt-10 md:px-8">
        <div className="mb-1 text-[16px] font-semibold tracking-[-.01em]">Best sellers</div>
        <div className="grid grid-cols-2 divide-x divide-y divide-ink/14 border border-ink/14 sm:grid-cols-3 md:grid-cols-4">
          {featured.map((p) => (
            <ProductTile key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
