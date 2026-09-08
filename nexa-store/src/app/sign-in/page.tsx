import { Suspense } from "react";
import { SignInForm } from "@/components/SignInForm";

export default function SignInPage() {
  return (
    <div className="mx-auto max-w-sm px-5 py-16 md:px-8">
      <div className="mb-8 flex flex-col gap-1.5">
        <div className="text-[26px] font-bold tracking-[-.026em]" style={{ fontStretch: "112%" }}>
          Sign in
        </div>
        <p className="font-mono text-[11.5px] text-ink/55">Sign in to add items to your bag and check out.</p>
      </div>
      <Suspense fallback={null}>
        <SignInForm />
      </Suspense>
    </div>
  );
}
