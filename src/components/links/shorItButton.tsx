import Image from "next/image";
import Link from "next/link";

export default function ShorItButton({
   showBetaFlag = true,
}: {
   showBetaFlag?: boolean;
}) {
   return (
      <Link
         href="/"
         className="w-fit relative flex items-center gap-2 hover:opacity-80"
      >
         <Image
            className=" size-7 sm:size-9 aspect-square"
            src="/short-it.svg"
            width={36}
            height={36}
            alt="short-it logo"
         />
         <span className="text-base sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Short-it
         </span>

         {showBetaFlag && (
            <div className="absolute top-0 ml-1 left-full rounded-xl bg-gradient-to-br from-purple-400/50 to-pink-400/50 p-0.5">
               <div className="flex h-[0.9rem] items-center justify-center rounded-xl bg-black/60 px-2">
                  <span className="text-[0.55rem] sm:text-[0.6rem] font-mono tracking-widest text-white">
                     Beta
                  </span>
               </div>
            </div>
         )}
      </Link>
   );
}
