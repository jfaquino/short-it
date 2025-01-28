"use client";

import { useTheme } from "next-themes";
import { Toaster } from "sonner";

export const ToasterProvider = () => {
   const { theme } = useTheme();
   return (
      <Toaster
         position="bottom-right"
         theme={theme === "light" ? "light" : "dark"}
      />
   );
};
