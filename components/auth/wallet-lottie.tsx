import React from "react";
import { useLottie } from "lottie-react";
import walletLottie from "@/public/animations/wallet-lottie.json";

const WalletLottie = () => {
  const walletOptions = {
    animationData: walletLottie,
    loop: true,
  };

  const { View } = useLottie(walletOptions);

  return <div className="w-96 max-w-sm">{View}</div>;
};

export default WalletLottie;
