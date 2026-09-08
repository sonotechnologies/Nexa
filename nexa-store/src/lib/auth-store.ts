"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AuthUser {
  email: string;
  name: string;
}

interface StoredUser extends AuthUser {
  passwordHash: string;
}

interface AuthState {
  users: StoredUser[];
  currentUser: AuthUser | null;
  signUp: (name: string, email: string, password: string) => Promise<{ ok: true } | { ok: false; error: string }>;
  signIn: (email: string, password: string) => Promise<{ ok: true } | { ok: false; error: string }>;
  signOut: () => void;
}

async function hashPassword(password: string): Promise<string> {
  const bytes = new TextEncoder().encode(password);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      users: [],
      currentUser: null,

      signUp: async (name, email, password) => {
        const normalized = normalizeEmail(email);
        if (!name.trim()) return { ok: false, error: "Enter your name." };
        if (!normalized.includes("@")) return { ok: false, error: "Enter a valid email." };
        if (password.length < 8) return { ok: false, error: "Password must be at least 8 characters." };
        if (get().users.some((u) => u.email === normalized)) {
          return { ok: false, error: "An account with that email already exists." };
        }
        const passwordHash = await hashPassword(password);
        const user: StoredUser = { email: normalized, name: name.trim(), passwordHash };
        set((state) => ({ users: [...state.users, user], currentUser: { email: user.email, name: user.name } }));
        return { ok: true };
      },

      signIn: async (email, password) => {
        const normalized = normalizeEmail(email);
        const user = get().users.find((u) => u.email === normalized);
        if (!user) return { ok: false, error: "No account found with that email." };
        const passwordHash = await hashPassword(password);
        if (passwordHash !== user.passwordHash) return { ok: false, error: "Incorrect password." };
        set({ currentUser: { email: user.email, name: user.name } });
        return { ok: true };
      },

      signOut: () => set({ currentUser: null }),
    }),
    { name: "nexa-auth" }
  )
);
