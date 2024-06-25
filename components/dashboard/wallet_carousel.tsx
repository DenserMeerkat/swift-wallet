import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import WalletCard from "./wallet_card";
import { Wallet } from "@/lib/types";
import { AddWalletCard } from "./add_wallet";

export function WalletCarousel() {
  const wallets: Wallet[] = [];
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-[clamp(200px,70vw,2000px)] max-w-7xl select-none"
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
  );
}
