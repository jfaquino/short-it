import Image from "next/image";
import Link from "next/link";

export default function ShorItButton() {
   return (
      <Link
         href="/"
         className="relative flex items-center space-x-2 hover:opacity-80"
      >
         <Image
            src="/short-it.svg"
            width={36}
            height={36}
            alt="short-it logo"
         />
         <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Short-it
         </span>

         <div className="absolute top-0 left-full rounded-xl bg-gradient-to-br from-purple-400/50 to-pink-400/50 p-0.5">
            <div className="flex h-full w-full items-center justify-center rounded-xl bg-black/60 px-2">
               <span className="text-[0.6rem] font-mono tracking-widest text-white">
                  Beta
               </span>
            </div>
         </div>
      </Link>
   );
}
