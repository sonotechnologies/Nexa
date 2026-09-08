"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/lib/auth-store";

export function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/";
  const signIn = useAuthStore((s) => s.signIn);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const result = await signIn(email, password);
    setSubmitting(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.push(next);
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <input
        required
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
        autoComplete="email"
        className="border-b border-ink/28 bg-transparent py-2 text-[14.5px] outline-none placeholder:text-ink/35"
      />
      <input
        required
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
        autoComplete="current-password"
        className="border-b border-ink/28 bg-transparent py-2 text-[14.5px] outline-none placeholder:text-ink/35"
      />

      {error ? <div className="font-mono text-[11.5px] text-red-600">{error}</div> : null}

      <button type="submit" disabled={submitting} className="mt-2 bg-dark py-3.5 text-center text-[14.5px] font-semibold text-paper disabled:opacity-60">
        {submitting ? "Signing in…" : "Sign in"}
      </button>

      <div className="text-center font-mono text-[11.5px] text-ink/60">
        New to Nexa?{" "}
        <Link href={`/sign-up?next=${encodeURIComponent(next)}`} className="text-accent hover:underline">
          Create an account
        </Link>
      </div>
    </form>
  );
}
