"use client";

import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/auth-store";

export function useAuthGate() {
  const router = useRouter();
  const pathname = usePathname();
  const isSignedIn = useAuthStore((s) => !!s.currentUser);

  function requireAuth(): boolean {
    if (isSignedIn) return true;
    router.push(`/sign-in?next=${encodeURIComponent(pathname)}`);
    return false;
  }

  return { isSignedIn, requireAuth };
}
