import { GithubIcon } from "@/components/icons/github-icon";
import GooBackground from "@/components/layout/goo-background";
import ExternalLink from "@/components/links/external-link";
import { Button } from "@/components/ui/button";
import { GITHUB_URL } from "@/lib/constants";
import { LinkIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
   return (
      <main className="absolute top-0 w-full">
         <section className="relative w-full min-h-screen dark:bg-gradient-to-br dark:from-gray-900/15 dark:via-purple-950/15 dark:to-indigo-900/15">
            {/* <!-- Background animation --/> */}
            <div className="absolute top-0 left-0 w-full h-screen min-h-[450px] z-0 overflow-hidden pointer-events-none">
               <GooBackground />
            </div>

            <div className="w-full min-h-screen z-10 backdrop-blur-lg flex justify-center items-center px-4 sm:px-6 lg:px-8">
               <div className="max-w-3xl w-full space-y-4 sm:space-y-5 text-center">
                  <h1 className="font-extrabold text-2xl sm:text-4xl md:text-5xl text-balance text-purple-500 dark:text-purple-400">
                     <span className=" inline-flex flex-col overflow-hidden h-[calc(theme(fontSize.2xl)*theme(lineHeight.tight))] sm:h-[calc(theme(fontSize.4xl)*theme(lineHeight.tight))] md:h-[calc(theme(fontSize.5xl)*theme(lineHeight.tight))] ">
                        <ul className="block animate-text-slide-4 text-center sm:text-right leading-tight [&_li]:block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 ">
                           <li>Shorten</li>
                           <li>Share</li>
                           <li>Track</li>
                           <li>Handle</li>
                           <li aria-hidden="true">Shorten</li>
                        </ul>
                     </span>
                     {" your Urls with ease!"}
                  </h1>
                  <p className="text-sm sm:text-lg text-balance">
                     Shorten long Urls, track analytics, and manage links
                     effortlessly—all open-source and free!
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-2 md:gap-3 ">
                     <Button asChild>
                        <Link
                           href="/dashboard"
                           className="group flex items-center gap-3"
                        >
                           <LinkIcon className="size-4 duration-300 group-hover:rotate-6" />
                           <span>Get started now!</span>
                        </Link>
                     </Button>

                     <Button asChild variant="outline">
                        <ExternalLink
                           className="group flex items-center gap-3"
                           href={GITHUB_URL}
                        >
                           <GithubIcon className="size-4 duration-300 group-hover:rotate-4" />
                           <span>Star on GitHub</span>
                        </ExternalLink>
                     </Button>
                  </div>
               </div>
            </div>
         </section>
      </main>
   );
}
