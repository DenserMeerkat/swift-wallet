"use client";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/components/context/app-context";
import { useEffect } from "react";

export default function Dashboard() {
  const { user, updateUser } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    } else {
    }
  }, [user, router]);

  return <main className="min-h-[90svh]"></main>;
}
