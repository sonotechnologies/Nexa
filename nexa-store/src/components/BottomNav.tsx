"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "@/lib/store";
import clsx from "clsx";
import { HomeIcon, GridIcon, HeartIcon, BagIcon } from "@/components/NavIcons";

const TABS = [
  { href: "/", label: "store", Icon: HomeIcon },
  { href: "/category/all", label: "browse", Icon: GridIcon },
  { href: "/wishlist", label: "saved", Icon: HeartIcon },
  { href: "/cart", label: "bag", Icon: BagIcon },
];

export function BottomNav() {
  const pathname = usePathname();
  const cartCount = useStore((s) => s.cart.reduce((n, l) => n + l.qty, 0));
  const wishCount = useStore((s) => s.wishlist.length);

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t border-ink/16 bg-paper/95 px-2 pb-[max(env(safe-area-inset-bottom),10px)] pt-2.5 font-mono text-[11px] backdrop-blur md:hidden">
      {TABS.map((tab) => {
        const active = tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href.split("?")[0]);
        const count = tab.label === "bag" ? cartCount : tab.label === "saved" ? wishCount : 0;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={clsx("flex flex-1 flex-col items-center gap-1", active ? "text-ink" : "text-ink/50")}
          >
            <div className={clsx("mb-0.5 h-[2px] w-4", active ? "bg-accent" : "bg-transparent")} />
            <tab.Icon className="h-[19px] w-[19px]" />
            <span>
              {tab.label}
              {count > 0 ? <span className="ml-1 text-accent">{count}</span> : null}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
