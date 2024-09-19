import Image from "next/image";
import Link from "next/link";

export default function ShorItButton() {
   return (
      <Link href="/" className="flex items-center space-x-2">
         <Image
            src="/short-it.svg"
            width={36}
            height={36}
            alt="short-it logo"
         />
         <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Short-it
         </span>
      </Link>
   );
}
