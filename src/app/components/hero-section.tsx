import { Scissors, BarChart2, Link as LinkIcon } from "lucide-react";
import Image from "next/image";
import UrlShortener from "./url-shortener";

export default function HeroSection() {
   return (
      <section className="w-full min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
         <div className="max-w-4xl w-full space-y-8 text-center">
            <div className="space-y-4">
               <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white">
                  Make Your Links
                  <br />
                  <span className="text-purple-400">Tiny and Eye-Catching</span>
               </h1>
               <p className="text-xl sm:text-2xl text-gray-300">
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
      </section>
   );
}
