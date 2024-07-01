"use client";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/components/context/app-context";
import { useEffect } from "react";
import WelcomeCard from "@/components/dashboard/welcome_card";
import { WalletCarousel } from "@/components/dashboard/wallet_carousel";
import TransactionTable from "@/components/dashboard/transaction_table";

export default function Dashboard() {
  const { user, updateUser } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    } else {
    }
  }, [user, router]);

  return (
    <main className="min-h-[90svh] items-center space-y-16 p-4 lg:p-8">
      <WelcomeCard />
      <WalletCarousel />
      <TransactionTable />
    </main>
  );
}
