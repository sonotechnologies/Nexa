import { Suspense } from "react";
import { notFound } from "next/navigation";
import { categories, getCategory, getProductsByCategory, products } from "@/data/products";
import { ListingClient } from "@/components/ListingClient";

export function generateStaticParams() {
  return [{ slug: "all" }, ...categories.map((c) => ({ slug: c.slug }))];
}

export default async function CategoryPage(props: PageProps<"/category/[slug]">) {
  const { slug } = await props.params;

  if (slug === "all") {
    return (
      <Suspense fallback={null}>
        <ListingClient title="All products" items={products} />
      </Suspense>
    );
  }

  const category = getCategory(slug);
  if (!category) notFound();

  return (
    <Suspense fallback={null}>
      <ListingClient title={category.name} items={getProductsByCategory(slug)} />
    </Suspense>
  );
}
