import clsx from "clsx";
import type { CategorySlug } from "@/data/types";

const TONE = {
  dark: "stripe-dark",
  light: "stripe-light",
  tint: "stripe-tint",
} as const;

const CATEGORY_LABEL: Record<CategorySlug, string> = {
  phones: "phone",
  laptops: "laptop",
  headsets: "headset",
  "power-banks": "power bank",
};

/**
 * Placeholder product art — a striped pattern standing in for real
 * photography. Swap in real shots later by replacing this component's
 * rendering (or wiring it to actual image files) once photography exists.
 */
export function PlaceholderArt({
  category,
  tone = "light",
  className,
}: {
  category: CategorySlug;
  tone?: keyof typeof TONE;
  className?: string;
}) {
  const textTone = tone === "dark" ? "text-white/55" : "text-ink/45";
  return (
    <div
      className={clsx(
        TONE[tone],
        "flex items-center justify-center text-center font-mono text-[10px] leading-relaxed",
        textTone,
        className
      )}
    >
      <div>{CATEGORY_LABEL[category]} photo</div>
    </div>
  );
}
