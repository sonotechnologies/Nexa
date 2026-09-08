import { Suspense } from "react";
import { SignUpForm } from "@/components/SignUpForm";

export default function SignUpPage() {
  return (
    <div className="mx-auto max-w-sm px-5 py-16 md:px-8">
      <div className="mb-8 flex flex-col gap-1.5">
        <div className="text-[26px] font-bold tracking-[-.026em]" style={{ fontStretch: "112%" }}>
          Create account
        </div>
        <p className="font-mono text-[11.5px] text-ink/55">You&apos;ll need an account to add items to your bag.</p>
      </div>
      <Suspense fallback={null}>
        <SignUpForm />
      </Suspense>
    </div>
  );
}
