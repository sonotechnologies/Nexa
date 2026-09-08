"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const KEY_PREFIX = "nexa:scroll:";
const CLICK_LOCK_MS = 500;

/**
 * Next's own popstate scroll restoration lands at the wrong offset in this
 * app, so we track scroll position per pathname ourselves and reassert it
 * on browser back/forward.
 *
 * The tricky part: clicking a link makes the browser focus the anchor and
 * auto-scroll it fully into view *before* navigation starts. That transient
 * scroll fires its own 'scroll' event, which would otherwise overwrite the
 * position the user actually meant to return to. We snapshot scrollY on
 * pointerdown (which always fires before that focus-scroll) and briefly
 * ignore 'scroll' events right after, so the pre-click position wins.
 */
export function ScrollRestorationFix() {
  const pathname = usePathname();
  const pathRef = useRef(pathname);
  pathRef.current = pathname;
  const isBackForward = useRef(false);
  const lockUntil = useRef(0);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    function onPopState() {
      isBackForward.current = true;
    }
    window.addEventListener("popstate", onPopState);

    function onPointerDown() {
      sessionStorage.setItem(KEY_PREFIX + pathRef.current, String(window.scrollY));
      lockUntil.current = Date.now() + CLICK_LOCK_MS;
    }
    window.addEventListener("pointerdown", onPointerDown, { capture: true });

    let raf = 0;
    function onScroll() {
      if (Date.now() < lockUntil.current) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        sessionStorage.setItem(KEY_PREFIX + pathRef.current, String(window.scrollY));
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("pointerdown", onPointerDown, { capture: true });
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (!isBackForward.current) return;
    isBackForward.current = false;

    const saved = sessionStorage.getItem(KEY_PREFIX + pathname);
    const y = saved ? Number(saved) : 0;

    let attempts = 0;
    let raf = 0;
    function apply() {
      window.scrollTo(0, y);
      attempts += 1;
      if (attempts < 8) raf = requestAnimationFrame(apply);
    }
    raf = requestAnimationFrame(apply);
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return null;
}
