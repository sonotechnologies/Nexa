import type { CategorySlug } from "@/data/types";

const FILE_BY_CATEGORY: Record<CategorySlug, string> = {
  phones: "phone",
  laptops: "laptop",
  headsets: "headset",
  "power-banks": "power",
};

export type ArtTone = "light" | "dark";

/**
 * Placeholder art standing in for real product photography — swap by
 * replacing the files at these paths (or point elsewhere) once real shots
 * are ready.
 */
export function categoryArt(category: CategorySlug, tone: ArtTone): string {
  return `/products/${FILE_BY_CATEGORY[category]}-${tone}.svg`;
}
