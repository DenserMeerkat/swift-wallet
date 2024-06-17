import React from "react";
import ThemeButtons from "./theme-switcher";
import GitHubLink from "./github-link";

const Footer = () => {
  return (
    <footer className="border-t bg-gradient-to-b from-primary/10 dark:border-muted dark:from-muted/30">
      <div className="mx-auto flex max-w-8xl items-end justify-between px-4 pb-6 pt-4">
        <div className="flex flex-col gap-2 dark:opacity-60 md:gap-3">
          <span className="text-xs font-medium tracking-wider dark:font-normal sm:text-sm">
            &copy; 2024&nbsp;&nbsp;<span className="text-primary">Swift</span>
            Wallet
          </span>
          <GitHubLink />
        </div>
        <ThemeButtons />
      </div>
    </footer>
  );
};

export default Footer;
