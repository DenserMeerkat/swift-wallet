import React from "react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { githubLink } from "@/lib/constants";

const GitHubLink = () => {
  return (
    <div className="flex items-center text-xs font-medium tracking-wide dark:font-normal sm:text-sm">
      <a
        href={githubLink}
        className="opacity-70 hover:opacity-100"
        target="_blank"
      >
        <GitHubLogoIcon className="md:h-5 md:w-5" />
      </a>
      <span className="mx-2.5 h-4 w-[1px] bg-foreground opacity-40 sm:h-5" />

      <a
        href={githubLink}
        className={
          "ml-1 underline-offset-4 opacity-90 hover:underline dark:font-normal"
        }
        target="_blank"
      >
        Link to Code
      </a>
    </div>
  );
};

export default GitHubLink;
