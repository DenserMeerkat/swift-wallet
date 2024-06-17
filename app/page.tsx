"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/components/context/app-context";

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
  }, [user]);

  return <main className="min-h-[90svh]"></main>;
}
