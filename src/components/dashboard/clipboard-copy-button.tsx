"use client";

import { Button } from "@/components/ui/button";
import { CopyIcon } from "lucide-react";
import { toast } from "sonner";

export default function ClipboardCopyButton({ url }: { url: string }) {
   const handleCopy = async () => {
      try {
         await navigator.clipboard.writeText(url);
         toast.success("Copied to clipboard", {
            description: `Url: ${url}`,
            duration: 5000,
            closeButton: true,
         });
      } catch (error) {
         console.error("Error copying to clipboard", error);
         toast.error("Error copying to clipboard", {
            description: `Url: ${url}`,
            duration: 5000,
            closeButton: true,
         });
      }
   };
   return (
      <Button
         variant="outline"
         className="size-8"
         size="icon"
         onClick={handleCopy}
      >
         <CopyIcon className="size-4" />
      </Button>
   );
}
