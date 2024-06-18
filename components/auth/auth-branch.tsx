import React from "react";
import { useSearchParams } from "next/navigation";
import { SignInForm } from "./sign-in";
import { SignUpForm } from "./sign-up";

const AuthBranch = () => {
  const searchParams = useSearchParams();
  const auth = searchParams.get("auth") ?? "signin";

  if (auth == "signin") {
    return <SignInForm />;
  } else {
    return <SignUpForm />;
  }
};

export default AuthBranch;
