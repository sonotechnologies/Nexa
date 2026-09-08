import Image from "next/image";
import clsx from "clsx";
import type { CategorySlug } from "@/data/types";
import { categoryArt, type ArtTone } from "@/lib/category-art";

const BG = {
  dark: "bg-dark",
  light: "bg-panel",
  tint: "bg-tint",
} as const;

const ICON_TONE: Record<keyof typeof BG, ArtTone> = {
  dark: "dark",
  light: "light",
  tint: "light",
};

/**
 * Placeholder product art — a themed line-art icon standing in for real
 * photography. Swap the files under public/products/ once real shots are
 * ready; nothing here needs to change.
 */
export function PlaceholderArt({
  category,
  tone = "light",
  className,
  iconScale = "52%",
}: {
  category: CategorySlug;
  tone?: keyof typeof BG;
  className?: string;
  iconScale?: string;
}) {
  return (
    <div className={clsx(BG[tone], "relative flex items-center justify-center overflow-hidden", className)}>
      <div className="relative" style={{ width: iconScale, height: iconScale }}>
        <Image src={categoryArt(category, ICON_TONE[tone])} alt="" fill sizes="300px" className="object-contain" />
      </div>
    </div>
  );
}
