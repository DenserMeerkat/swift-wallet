import React, { Suspense } from "react";
import Account from "./account";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

const Header = () => {
  return (
    <header className="sticky top-0 w-full border-b bg-gradient-to-b from-primary/20 to-primary/10 backdrop-blur-md dark:border-muted dark:from-muted/30 dark:to-muted/10">
      <div className="mx-auto flex max-w-8xl items-center justify-between gap-4 px-4 pb-3 pt-3">
        <Link
          href="/?auth=signin"
          className="text-2xl font-semibold tracking-widest"
        >
          <span className="text-primary">Swift</span>Wallet
        </Link>
        <Suspense
          fallback={
            <Button variant={"secondary"}>
              <LoadingSpinner />
            </Button>
          }
        >
          <Account />
        </Suspense>
      </div>
    </header>
  );
};

export default Header;
