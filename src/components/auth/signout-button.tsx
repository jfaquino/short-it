"use client";

import { LogOutIcon } from "lucide-react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

export default function SignoutButton({ className }: { className?: string }) {
   return (
      <Button
         className={cn("flex items-center gap-3", className)}
         onClick={() => signOut()}
         variant="ghost"
      >
         <LogOutIcon className="size-4" />
         <span>Sign out</span>
      </Button>
   );
}
