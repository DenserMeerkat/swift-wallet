"use client";
import React, { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppContext } from "../context/app-context";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

const Account = () => {
  const { user, updateUser } = useAppContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const auth = searchParams.get("auth");

  function getAuthLink() {
    if (auth === "signin") {
      const params = new URLSearchParams();
      params.append("auth", "signup");
      return "/" + "?" + params.toString();
    } else if (auth === "signup") {
      const params = new URLSearchParams();
      params.append("auth", "signin");
      return "/" + "?" + params.toString();
    }
    return "/?auth=signin";
  }

  if (user)
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"secondary"}>
            <span>Account</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>
            <span className="text-destructive">Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  else {
    return (
      <Link
        href={getAuthLink()!}
        className={buttonVariants({
          variant: "secondary",
        })}
      >
        {auth === "signin" ? "Sign Up" : "Sign In"}
      </Link>
    );
  }
};

export default Account;
