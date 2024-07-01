import * as React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import WalletCard from "./wallet_card";
import { AddWalletButton, AddWalletCard } from "./add_wallet";
import { useAppContext } from "../context/app-context";

export function WalletCarousel() {
  const { wallets } = useAppContext();

  return (
    <Card className="mx-auto max-w-6xl border-none shadow-none">
      <div className="flex flex-col justify-between xs:flex-row">
        <CardHeader className="px-6 py-2 sm:p-6">
          <CardTitle>Wallets</CardTitle>
          <CardDescription>Manage your wallets.</CardDescription>
        </CardHeader>
        <CardHeader className="px-6 py-2 sm:p-6">
          <AddWalletButton />
        </CardHeader>
      </div>
      <Carousel
        opts={{
          align: "start",
        }}
        className="mx-auto w-[clamp(200px,70vw,2000px)] max-w-7xl select-none"
      >
        <CarouselContent>
          {wallets.map((wallet, index) => (
            <CarouselItem
              key={index}
              className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <WalletCard {...wallet} />
            </CarouselItem>
          ))}
          <CarouselItem
            key={"add"}
            className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
          >
            <AddWalletCard />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </Card>
  );
}
