"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { GithubIcon } from "@/components/icons/github-icon";
import ShorItButton from "@/components/common/shorItButton";

export default function LoginPage() {
   const handleGitHubSignIn = () => {
      signIn("github", { callbackUrl: "/dashboard" });
   };

   return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-2">
         <Card className="w-full max-w-[350px] ">
            <CardHeader>
               <div className="flex justify-center pb-8">
                  <ShorItButton />
               </div>

               <CardTitle className="text-xl">Sign in to Short It</CardTitle>
               <CardDescription>
                  Welcome back! Please sign in to continue
               </CardDescription>
            </CardHeader>
            <CardContent>
               <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleGitHubSignIn}
               >
                  <GithubIcon className="mr-2 h-4 w-4" />
                  GitHub
               </Button>
            </CardContent>
         </Card>
      </div>
   );
}
