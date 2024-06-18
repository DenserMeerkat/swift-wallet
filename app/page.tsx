"use client";
import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/components/context/app-context";
import AuthBranch from "@/components/auth/auth-branch";
import WalletLottie from "@/components/auth/wallet-lottie";

export default function Home() {
  const { user, updateUser } = useAppContext();
  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
      return;
    }
    const params = new URLSearchParams();
    params.append("auth", "signin");
    router.push("/" + "?" + params.toString());
  }, [user, router]);

  return (
    <main className="mx-auto h-full min-h-[80svh] max-w-5xl px-2 py-[10vh]">
      <div className="flex flex-col-reverse items-center justify-center gap-4 sm:flex-row">
        <WalletLottie />
        <Suspense>
          <AuthBranch />
        </Suspense>
      </div>
    </main>
  );
}
