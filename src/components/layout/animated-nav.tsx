"use client";

import { useEffect, useRef } from "react";
import ShorItButton from "../links/shorItButton";
import AuthButton from "../auth/authButton";
import { Session } from "next-auth";
import dynamic from "next/dynamic";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { GithubIcon } from "../icons/github-icon";
import { GITHUB_URL } from "@/lib/constants";
import ExternalLink from "@/components/links/external-link";

const ThemeToggler = dynamic(
   () => import("../theme-toggler").then((mod) => mod.ThemeToggler),
   {
      ssr: false,
      loading: () => (
         <Skeleton className="size-10 dark:bg-white/10 backdrop-blur-sm" />
      ),
   }
);

interface AnimatedNavProps {
   session: Session | null;
   className?: string;
}

const AnimatedNav: React.FC<AnimatedNavProps> = ({
   session,
   className = "",
}) => {
   const navRef = useRef<HTMLElement | null>(null);

   useEffect(() => {
      if (!navRef.current) return;

      const handleScroll = () => {
         const scrolled = window.scrollY > 0;
         if (scrolled) {
            navRef.current?.classList.add(
               "rounded-lg",
               "shadow-lg",
               "ring-1",
               "backdrop-blur",
               "ring-white/10",
               "transition-all",
               "duration-300"
            );
            // Check dark mode preference
            if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
               navRef.current?.classList.add("bg-black/5");
               navRef.current?.classList.remove("bg-white/20");
            } else {
               navRef.current?.classList.add("bg-white/20");
               navRef.current?.classList.remove("bg-black/5");
            }
         } else {
            navRef.current?.classList.remove(
               "rounded-lg",
               "shadow-lg",
               "ring-1",
               "backdrop-blur",
               "ring-white/10",
               "bg-black/5",
               "bg-white/20"
            );
         }
      };

      // Initial check
      handleScroll();

      // Add scroll event listener
      window.addEventListener("scroll", handleScroll, { passive: true });

      // Handle dark mode changes
      const darkModeMediaQuery = window.matchMedia(
         "(prefers-color-scheme: dark)"
      );
      const handleDarkModeChange = () => handleScroll();
      darkModeMediaQuery.addEventListener("change", handleDarkModeChange);

      // Cleanup
      return () => {
         window.removeEventListener("scroll", handleScroll);
         darkModeMediaQuery.removeEventListener("change", handleDarkModeChange);
      };
   }, []);

   return (
      <nav ref={navRef} className={`transition-all duration-300 ${className}`}>
         <div>
            <ShorItButton />
         </div>

         <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" asChild>
               <ExternalLink href={GITHUB_URL}>
                  <GithubIcon className="size-5" />
               </ExternalLink>
            </Button>

            <ThemeToggler />

            <AuthButton session={session} />
         </div>
      </nav>
   );
};

export default AnimatedNav;
