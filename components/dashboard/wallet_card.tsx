import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Wallet } from "@/lib/types";

const WalletCard = (props: Wallet) => {
  return (
    <Card className="relative m-1 border-2 bg-gradient-to-b from-muted/40 to-primary/10">
      <span className="absolute min-w-40 max-w-52 self-start truncate rounded-br-md rounded-tl-sm border-b-2 border-r-2 bg-background p-2 font-bold text-primary">
        {props.name}
      </span>
      <CardContent className="flex aspect-video flex-col justify-end p-3">
        <span className="text-right text-[clamp(32px,100%,64px)] font-bold">
          <span className="text-primary">₹</span> {props.balance}
        </span>
      </CardContent>
    </Card>
  );
};

export default WalletCard;
