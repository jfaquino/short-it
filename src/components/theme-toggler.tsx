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
   const { theme, setTheme } = useTheme();

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Toggle theme">
               {theme === "light" ? (
                  <Sun className="size-5" strokeWidth={1.5} />
               ) : (
                  <MoonIcon className="absolute size-5" strokeWidth={1.5} />
               )}
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
