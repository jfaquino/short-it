"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@/components/ui/tooltip";
import { QrCode, Copy, ExternalLink } from "lucide-react";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";

export default function UrlShortener() {
   const { data: session } = useSession();
   const [loading, setLoading] = useState(false);
   const [shortenedUrl, setShortenedUrl] = useState<string | undefined>();

   const handleCopy = () => {
      if (shortenedUrl) {
         navigator.clipboard
            .writeText(shortenedUrl)
            .then(() => alert("Copied to clipboard!"))
            .catch((err) => console.error("Failed to copy: ", err));
      }
   };

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      const originalUrl = formData.get("original-url");
      const userId = session?.user?.id || undefined;

      const options: RequestInit = {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ originalUrl, userId: userId }),
      };

      try {
         setLoading(true);

         const response = await fetch("api/shorten", options);

         if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
         }

         const data = await response.json();

         if (data.shortUrl) {
            setShortenedUrl(data.shortUrl);
         }
      } catch (err) {
         console.error("Error:", err);
      } finally {
         setLoading(false);
      }
   };

   return (
      <>
         <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <Input
                  name="original-url"
                  type="url"
                  placeholder="Paste your long URL here"
                  className="flex-grow max-w-lg bg-gray-800 text-white border-indigo-500 focus:ring-indigo-400 focus:border-indigo-400"
                  required
               />
               <Button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
               >
                  Short-it!
                  {loading && (
                     <div className="spinner w-4 h-4 border-2 ml-2 border-white border-t-transparent rounded-full animate-spin" />
                  )}
               </Button>
            </div>
         </form>

         <TooltipProvider>
            <div
               className={cn(
                  "transition-all duration-500 ease-out transform",
                  shortenedUrl
                     ? "opacity-100 translate-y-0 h-auto"
                     : "opacity-0 translate-y-10 h-0"
               )}
            >
               <Card className="w-full max-w-lg mx-auto text-start ">
                  <CardContent className="space-y-4 pt-6">
                     <div
                        className={cn(
                           "flex flex-col lg:flex-row justify-between items-end gap-4",
                           "transition-all duration-500 ease-out delay-100",
                           shortenedUrl
                              ? "opacity-100 translate-y-0 "
                              : "opacity-0 translate-y-5"
                        )}
                     >
                        <div className="w-full max-w-lg">
                           <label
                              htmlFor="shortened-url"
                              className="text-sm font-medium"
                           >
                              Shortened URL
                           </label>
                           <div className="mt-1 flex rounded-md shadow-sm">
                              <Input
                                 type="text"
                                 id="shortened-url"
                                 value={shortenedUrl}
                                 readOnly
                                 className="flex-grow"
                              />
                           </div>
                        </div>

                        <div
                           className={cn(
                              "flex gap-2",
                              "transition-all duration-500 ease-out delay-200",
                              shortenedUrl
                                 ? "opacity-100 translate-y-0 "
                                 : "opacity-0 translate-y-5"
                           )}
                        >
                           <Tooltip>
                              <TooltipTrigger asChild>
                                 <Button variant="outline" size="icon">
                                    <QrCode className="h-4 w-4" />
                                 </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                 <p> Show QR Code</p>
                              </TooltipContent>
                           </Tooltip>
                           <Tooltip>
                              <TooltipTrigger asChild>
                                 <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={handleCopy}
                                 >
                                    <Copy className="h-4 w-4" />
                                 </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                 <p>Copy Link</p>
                              </TooltipContent>
                           </Tooltip>
                           <Tooltip>
                              <TooltipTrigger asChild>
                                 <Button variant="outline" size="icon" asChild>
                                    <a
                                       href={shortenedUrl}
                                       target="_blank"
                                       rel="noopener noreferrer"
                                    >
                                       <ExternalLink className="h-4 w-4" />
                                    </a>
                                 </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                 <p>Open Link</p>
                              </TooltipContent>
                           </Tooltip>
                        </div>
                     </div>
                  </CardContent>
               </Card>
            </div>
         </TooltipProvider>
      </>
   );
}
