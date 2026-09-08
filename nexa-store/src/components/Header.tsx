"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { useAuthStore } from "@/lib/auth-store";
import { categories } from "@/data/products";

export function Header() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const cartCount = useStore((s) => s.cart.reduce((n, l) => n + l.qty, 0));
  const wishCount = useStore((s) => s.wishlist.length);
  const currentUser = useAuthStore((s) => s.currentUser);
  const signOut = useAuthStore((s) => s.signOut);

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    const query = q.trim();
    router.push(query ? `/category/all?q=${encodeURIComponent(query)}` : "/category/all");
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-ink/12 bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-5 py-3 md:px-8">
        <Link
          href="/"
          className="font-display text-[19px] font-extrabold tracking-[.02em]"
          style={{ fontStretch: "88%" }}
        >
          NEXA
        </Link>

        <nav className="hidden items-center gap-5 font-mono text-[12.5px] text-ink/72 md:flex">
          {categories.map((c) => (
            <Link key={c.slug} href={`/category/${c.slug}`} className="hover:text-ink">
              {c.name}
            </Link>
          ))}
        </nav>

        <form onSubmit={submitSearch} className="ml-auto hidden max-w-xs flex-1 items-center border border-ink/22 md:flex">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="search Nexa"
            className="w-full bg-transparent px-3 py-2 font-mono text-[12px] outline-none placeholder:text-ink/40"
          />
          <button type="submit" className="px-3 font-mono text-[11px] text-ink/55 hover:text-ink">
            go
          </button>
        </form>

        <div className="ml-auto flex items-center gap-4 font-mono text-[12px] text-ink/72 md:ml-0">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Search"
            className="hover:text-ink md:hidden"
          >
            search
          </button>
          <Link href="/wishlist" className="hover:text-ink">
            saved{wishCount > 0 ? <span className="ml-1 font-semibold text-accent">{wishCount}</span> : null}
          </Link>
          <Link href="/cart" className="hover:text-ink">
            bag{cartCount > 0 ? <span className="ml-1 font-semibold text-accent">{cartCount}</span> : null}
          </Link>
          <div className="hidden items-center gap-4 border-l border-ink/14 pl-4 md:flex">
            {currentUser ? (
              <>
                <span className="text-ink/55">hi, {currentUser.name.split(" ")[0]}</span>
                <button type="button" onClick={signOut} className="hover:text-ink">
                  sign out
                </button>
              </>
            ) : (
              <Link href="/sign-in" className="hover:text-ink">
                sign in
              </Link>
            )}
          </div>
        </div>
      </div>

      {menuOpen ? (
        <div className="border-t border-ink/12 px-5 py-3 md:hidden">
          <form onSubmit={submitSearch} className="flex items-center border border-ink/22">
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="search Nexa"
              className="w-full bg-transparent px-3 py-2 font-mono text-[12px] outline-none placeholder:text-ink/40"
            />
            <button type="submit" className="px-3 font-mono text-[11px] text-ink/55">
              go
            </button>
          </form>
          <nav className="mt-3 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[12.5px] text-ink/72">
            {categories.map((c) => (
              <Link key={c.slug} href={`/category/${c.slug}`} onClick={() => setMenuOpen(false)} className="hover:text-ink">
                {c.name}
              </Link>
            ))}
          </nav>
          <div className="mt-3 flex items-center gap-4 border-t border-ink/12 pt-3 font-mono text-[12.5px] text-ink/72">
            {currentUser ? (
              <>
                <span className="text-ink/55">hi, {currentUser.name.split(" ")[0]}</span>
                <button type="button" onClick={signOut} className="hover:text-ink">
                  sign out
                </button>
              </>
            ) : (
              <Link href="/sign-in" onClick={() => setMenuOpen(false)} className="hover:text-ink">
                sign in
              </Link>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}
