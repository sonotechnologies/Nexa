import Link from "next/link";
import type { Product } from "@/data/types";
import { PlaceholderArt } from "@/components/PlaceholderArt";
import { moneyRound } from "@/lib/format";

export function ProductRow({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.slug}`} className="group flex gap-4 py-5">
      <PlaceholderArt category={product.category} tone="light" className="h-[132px] w-[108px] shrink-0" />
      <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
        <div className="flex flex-col gap-1.5">
          <div className="text-[16px] font-semibold leading-tight tracking-[-.016em] group-hover:text-accent">
            {product.name}
          </div>
          <div className="font-mono text-[10.5px] leading-relaxed text-ink/58">
            {product.specs.slice(0, 2).map((s) => s.v).join(" · ")}
          </div>
        </div>
        <div className="flex items-end justify-between gap-3">
          <div className="flex items-baseline gap-2 font-mono tabular">
            <span className="text-[16px] font-semibold">{moneyRound(product.price)}</span>
            {product.compareAt ? (
              <span className="text-[11px] text-ink/40 line-through">{moneyRound(product.compareAt)}</span>
            ) : null}
          </div>
          <div className="flex gap-1">
            {product.variants.slice(0, 4).map((v) => (
              <div key={v.name} className="h-2.5 w-2.5" style={{ background: v.hex }} title={v.name} />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
