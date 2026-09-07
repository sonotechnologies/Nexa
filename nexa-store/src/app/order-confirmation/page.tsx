import Link from "next/link";

export default async function OrderConfirmationPage(props: PageProps<"/order-confirmation">) {
  const params = await props.searchParams;
  const order = typeof params.order === "string" ? params.order : "NX-000000";
  const total = typeof params.total === "string" ? params.total : null;
  const items = typeof params.items === "string" ? params.items : null;

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center gap-6 px-5 py-24 text-center md:px-8">
      <div className="h-11 w-11 border-2 border-accent" />
      <div className="text-[28px] font-bold leading-tight tracking-[-.026em]" style={{ fontStretch: "112%" }}>
        Order placed
      </div>
      <p className="max-w-[42ch] text-[14.5px] leading-relaxed text-ink/70">
        We&apos;ve emailed a confirmation for order <span className="font-mono text-ink">{order}</span>. This is a demo
        storefront — no charge was made and nothing ships.
      </p>

      <div className="flex w-full max-w-xs flex-col gap-2 border-y border-ink/14 py-4 font-mono text-[11.5px]">
        <div className="flex justify-between">
          <span className="text-ink/55">order</span>
          <span>{order}</span>
        </div>
        {items ? (
          <div className="flex justify-between">
            <span className="text-ink/55">items</span>
            <span>{items}</span>
          </div>
        ) : null}
        {total ? (
          <div className="flex justify-between">
            <span className="text-ink/55">total</span>
            <span className="tabular">${total}</span>
          </div>
        ) : null}
      </div>

      <div className="flex gap-3">
        <Link href="/" className="bg-dark px-5 py-3 text-[13.5px] font-semibold text-paper">
          Continue shopping
        </Link>
        <Link href="/category/all" className="border border-ink/22 px-5 py-3 text-[13.5px] font-semibold">
          Browse more
        </Link>
      </div>
    </div>
  );
}
