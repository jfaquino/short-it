import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";

export default function NotFound() {
   return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-background to-muted px-4 text-center">
         <div className="space-y-4 sm:space-y-6 md:space-y-8">
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold text-primary animate-pulse">
               404
            </h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
               Oops! Page Not Found
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-md mx-auto">
               {"The page you're looking for doesn't exist or has been moved."}
            </p>
            <div className="pt-4 sm:pt-6">
               <Button asChild>
                  <Link href="/" className="inline-flex items-center space-x-2">
                     <HomeIcon className="w-5 h-5" />
                     <span>Return Home</span>
                  </Link>
               </Button>
            </div>
         </div>
         <div className="mt-12 sm:mt-16 md:mt-20">
            <div className="relative">
               <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
               >
                  <div className="w-full border-t border-muted-foreground/20"></div>
               </div>
               <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-background text-muted-foreground">
                     Lost? Try searching or check our sitemap
                  </span>
               </div>
            </div>
         </div>
      </div>
   );
}
