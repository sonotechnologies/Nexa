import Link from "next/link";
import type { Product } from "@/data/types";
import { PlaceholderArt } from "@/components/PlaceholderArt";
import { moneyRound } from "@/lib/format";

export function ProductTile({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.slug}`} className="group flex flex-col gap-3 p-4 md:p-5">
      <PlaceholderArt
        tone="light"
        align="end"
        label={product.frames[0]?.label ?? "product shot"}
        className="h-32 md:h-40"
      />
      <div className="flex flex-col gap-1">
        <div className="flex items-baseline justify-between gap-2">
          <div className="text-[14px] font-semibold leading-tight tracking-[-.012em] group-hover:text-accent">
            {product.name}
          </div>
          {product.isNew ? <span className="shrink-0 font-mono text-[9.5px] text-accent">new</span> : null}
        </div>
        <div className="font-mono text-[10.5px] text-ink/50">{product.tagline}</div>
        <div className="mt-0.5 flex items-baseline gap-2 font-mono text-[14px] font-medium tabular">
          {moneyRound(product.price)}
          {product.compareAt ? (
            <span className="font-mono text-[11px] text-ink/40 line-through">{moneyRound(product.compareAt)}</span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
