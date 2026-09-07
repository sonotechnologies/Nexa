import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts, products } from "@/data/products";
import { ProductDetailClient } from "@/components/ProductDetailClient";
import { ProductTile } from "@/components/ProductTile";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.slug }));
}

export default async function ProductPage(props: PageProps<"/product/[id]">) {
  const { id } = await props.params;
  const product = getProductBySlug(id);
  if (!product) notFound();
  const related = getRelatedProducts(product);

  return (
    <div className="pb-24 md:pb-0">
      <ProductDetailClient product={product} />

      {related.length > 0 ? (
        <section className="mx-auto max-w-6xl px-5 pb-16 pt-4 md:px-8">
          <div className="mb-1 text-[16px] font-semibold tracking-[-.01em]">You might also like</div>
          <div className="grid grid-cols-2 divide-x divide-y divide-ink/14 border border-ink/14 sm:grid-cols-4">
            {related.map((p) => (
              <ProductTile key={p.id} product={p} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
