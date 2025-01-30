"use client";

import { MoonIcon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggler() {
   const { setTheme } = useTheme();

   const toggleTheme = () => {
      setTheme((oldTheme) => (oldTheme === "dark" ? "light" : "dark"));
   };

   return (
      <Button
         variant="ghost"
         size="icon"
         aria-label="Toggle theme"
         onClick={toggleTheme}
      >
         <Sun className="absolute size-5 dark:scale-0" strokeWidth={1.5} />
         <MoonIcon
            className="absolute size-5 scale-0 dark:scale-100"
            strokeWidth={1.5}
         />
      </Button>
   );
}
