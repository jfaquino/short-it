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

            <div className="w-full min-h-screen z-10 backdrop-blur-lg  flex justify-center items-start sm:items-center py-24  px-4 sm:px-6 lg:px-8 ">
               <div className=" max-w-4xl w-full space-y-8 text-center ">
                  <div className="space-y-4">
                     <h1 className="flex flex-col text-2xl sm:text-3xl md:text-5xl ">
                        <span className="font-mono font-extrabold tracking-tighter">
                           Shorten. Share. Track. Simplify
                        </span>
                        <span className="font-bold text-purple-500 dark:text-purple-400">
                           your Urls with ease!
                        </span>
                     </h1>
                     <p className="text-sm sm:text-lg text-balance">
                        Shorten long Urls, track analytics, and manage links
                        effortlessly—all open-source and free!
                     </p>
                  </div>

                  {/* <div className="mt-12 flex flex-wrap justify-center gap-6">
                  <div className="flex items-center space-x-2 ">
                     <Scissors className="h-6 w-6 text-indigo-400" />
                     <span>Manage your urls </span>
                  </div>
                  <div className="flex items-center space-x-2 ">
                     <BarChart2 className="h-6 w-6 text-indigo-400" />
                     <span>Detailed analytics</span>
                  </div>
                  <div className="flex items-center space-x-2 ">
                     <LinkIcon className="h-6 w-6 text-indigo-400" />
                     <span>Open source</span>
                  </div>
               </div> */}

                  <div className="mt-8 flex items-center justify-center duration-700 animate-in fade-in-30 md:space-x-3 space-x-2">
                     <Button asChild>
                        <Link
                           href="/dashboard"
                           className="group flex items-center gap-4"
                        >
                           <LinkIcon
                              size={18}
                              className="duration-300 group-hover:rotate-6"
                           />
                           <span>Create a Short Url</span>
                        </Link>
                     </Button>

                     <Button asChild variant="outline">
                        <ExternalLink
                           className="group flex items-center gap-4"
                           href={GITHUB_URL}
                        >
                           <GithubIcon
                              height={18}
                              className="duration-300 group-hover:rotate-4"
                           />
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
