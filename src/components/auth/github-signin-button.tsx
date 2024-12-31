"use client";

import { GithubIcon } from "../icons/github-icon";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

export default function GithubSigninButton() {
   const handleGitHubSignIn = () => {
      signIn("github", { callbackUrl: "/dashboard" });
   };

   return (
      <Button variant="outline" className="w-full" onClick={handleGitHubSignIn}>
         <GithubIcon className="mr-2 h-4 w-4" />
         GitHub
      </Button>
   );
}
