import { Scissors, BarChart2, Link as LinkIcon } from "lucide-react";
import UrlShortener from "./url-shortener";
import GooBackground from "@/components/common/goo-background";

export default function HeroSection() {
   return (
      <section className="relative w-full h-screen bg-gradient-to-br from-gray-900 via-purple-950 to-indigo-900 overflow-hidden">
         {/* <!-- Background animation --/> */}
         <GooBackground />

         <div className="w-full h-full absolute top-0 left-0 flex justify-center items-start sm:items-center pt-24 sm:pt-0  px-4 sm:px-6 lg:px-8 ">
            <div className="flex-1 h-1/2 max-w-4xl w-full space-y-8 text-center ">
               <div className="space-y-4">
                  <h1 className="text-2xl sm:text-5xl md:text-6xl font-extrabold text-white">
                     Make Your Links
                     <br />
                     <span className="text-purple-400">
                        Tiny and Eye-Catching
                     </span>
                  </h1>
                  <p className="text-lg sm:text-2xl text-gray-300 text-balance">
                     Create short, powerful links in seconds
                  </p>
               </div>

               <UrlShortener />

               <div className="mt-12 flex flex-wrap justify-center gap-6">
                  <div className="flex items-center space-x-2 text-gray-300">
                     <Scissors className="h-6 w-6 text-indigo-400" />
                     <span>Quick link trimming</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300">
                     <BarChart2 className="h-6 w-6 text-indigo-400" />
                     <span>Detailed analytics</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300">
                     <LinkIcon className="h-6 w-6 text-indigo-400" />
                     <span>Custom short links</span>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}
