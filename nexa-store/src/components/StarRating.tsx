export function StarRating({ rating, count, className }: { rating: number; count?: number; className?: string }) {
  return (
    <div className={"flex items-baseline gap-1.5 font-mono text-[10.5px] text-ink/55 " + (className ?? "")}>
      <span className="text-ink/75">{rating.toFixed(1)}</span>
      <span aria-hidden>{"★".repeat(Math.round(rating))}{"·".repeat(5 - Math.round(rating))}</span>
      {typeof count === "number" ? <span>({count})</span> : null}
    </div>
  );
}
