"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSent(true);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="font-mono text-[11px] text-paper/50">price drops, once a week</div>
      {sent ? (
        <div className="font-mono text-[12.5px] text-paper/85">you&apos;re on the list · {email}</div>
      ) : (
        <form onSubmit={submit} className="flex items-stretch border border-paper/25">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="w-full min-w-0 bg-transparent px-3 py-2.5 font-mono text-[12.5px] text-paper outline-none placeholder:text-paper/40"
          />
          <button type="submit" className="shrink-0 bg-accent px-4 font-mono text-[11.5px] font-medium text-white">
            join
          </button>
        </form>
      )}
    </div>
  );
}
