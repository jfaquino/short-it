"use client";

import { Monitor, MoonIcon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggler() {
   const { setTheme } = useTheme();

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Toggle theme">
               <Sun
                  className="absolute size-5 dark:scale-0"
                  strokeWidth={1.5}
               />
               <MoonIcon
                  className="absolute size-5 scale-0 dark:scale-100"
                  strokeWidth={1.5}
               />
            </Button>
         </DropdownMenuTrigger>

         <DropdownMenuContent align="end">
            <DropdownMenuItem
               className="flex items-center gap-3"
               onClick={() => setTheme("light")}
            >
               <Sun className="size-6" />
               Light
            </DropdownMenuItem>

            <DropdownMenuItem
               className="flex items-center gap-3"
               onClick={() => setTheme("dark")}
            >
               <MoonIcon className="size-6" />
               Dark
            </DropdownMenuItem>

            <DropdownMenuItem
               className="flex items-center gap-3"
               onClick={() => setTheme("system")}
            >
               <Monitor className="size-6" />
               System
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
}
