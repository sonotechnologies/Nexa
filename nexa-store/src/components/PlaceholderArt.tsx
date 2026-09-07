import clsx from "clsx";

const TONE = {
  dark: "stripe-dark",
  light: "stripe-light",
  tint: "stripe-tint",
} as const;

export function PlaceholderArt({
  label,
  note,
  tone = "light",
  className,
  align = "center",
}: {
  label: string;
  note?: string;
  tone?: keyof typeof TONE;
  className?: string;
  align?: "center" | "end";
}) {
  const textTone = tone === "dark" ? "text-white/55" : "text-ink/45";
  return (
    <div
      className={clsx(
        TONE[tone],
        "flex font-mono text-[10px] leading-relaxed",
        align === "center" ? "items-center justify-center text-center" : "items-end p-2",
        textTone,
        className
      )}
    >
      <div>
        {label}
        {note ? (
          <>
            <br />
            {note}
          </>
        ) : null}
      </div>
    </div>
  );
}
