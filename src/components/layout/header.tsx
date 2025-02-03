import AnimatedNav from "@/components/layout/animated-nav";
import dynamic from "next/dynamic";
import { GITHUB_URL } from "@/lib/constants";
import ShorItButton from "@/components/links/shorItButton";
import ExternalLink from "@/components/links/external-link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { GithubIcon } from "@/components/icons/github-icon";
import AuthButton from "@/components/auth/authButton";

const ThemeToggler = dynamic(
   () => import("../theme-toggler").then((mod) => mod.ThemeToggler),
   {
      loading: () => (
         <Skeleton className="size-10 dark:bg-white/10 backdrop-blur-sm" />
      ),
   }
);

export default async function Header() {
   return (
      <header className="w-full sticky top-4 pb-4 z-10">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedNav className="flex items-center justify-between h-16 ">
               <div>
                  <ShorItButton />
               </div>

               <div className="flex items-center gap-0 sm:gap-1">
                  <Button variant="ghost" size="icon" asChild>
                     <ExternalLink href={GITHUB_URL}>
                        <GithubIcon className="size-5" />
                     </ExternalLink>
                  </Button>

                  <ThemeToggler />

                  <AuthButton />
               </div>
            </AnimatedNav>
         </div>
      </header>
   );
}
