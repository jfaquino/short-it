/* eslint-disable @next/next/no-img-element */
"use client";

import { GithubIcon } from "@/components/icons/github-icon";
import { Button } from "@/components/ui/button";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";

interface AuthButtonProps {
   session: Session | null;
}

export default function AuthButton({ session }: AuthButtonProps) {
   if (session) {
      return (
         <div className="flex items-center gap-4 ">
            <Popover>
               <PopoverTrigger asChild>
                  <Button
                     variant="ghost"
                     className="hover:bg-slate-400/15 px-2"
                  >
                     {session.user?.image && (
                        <img
                           className="w-8 h-8 rounded-full"
                           src={session.user.image}
                           alt={`User profile of ${session.user?.name}`}
                        />
                     )}
                  </Button>
               </PopoverTrigger>
               <PopoverContent side="bottom" align="end">
                  <div className="flex items-center gap-2 mb-5 ">
                     {session.user?.image && (
                        <img
                           className="w-10 h-10 rounded-full "
                           src={session.user.image}
                           alt={`User profile of ${session.user?.name}`}
                        />
                     )}
                     <span className="text-sm">{session.user?.name}</span>
                  </div>
                  <hr />
                  <Button variant="ghost" onClick={() => signOut()}>
                     Sign out
                  </Button>
               </PopoverContent>
            </Popover>
         </div>
      );
   }

   return (
      <div className="flex items-center space-x-4">
         <Button
            variant="outline"
            size="sm"
            className="bg-white text-black hover:bg-white/85 border-gray-300 px-3 py-1 text-xs font-semibold transition-colors duration-300 ease-in-out "
            onClick={() => signIn("github")}
         >
            <GithubIcon className="mr-1.5 h-5 w-5" />
            Sign up
         </Button>
      </div>
   );
}
