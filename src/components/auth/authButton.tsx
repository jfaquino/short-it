import { Button } from "@/components/ui/button";
import {
   ArrowRightIcon,
   HouseIcon,
   LayoutDashboardIcon,
   LogOutIcon,
} from "lucide-react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Image from "next/image";

interface AuthButtonProps {
   session: Session | null;
}

export default function AuthButton({ session }: AuthButtonProps) {
   if (session) {
      return (
         <div className="flex items-center gap-4 ">
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                     {session.user?.image && (
                        <Image
                           className="rounded-full"
                           src={session.user.image}
                           alt={`User profile of ${session.user?.name}`}
                           width={28}
                           height={28}
                        />
                     )}
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent align="end">
                  <div className="flex flex-col gap-1 p-2 ">
                     <span className="text-sm">{session.user?.name}</span>
                     <span className="text-sm opacity-70">
                        {session.user?.email}
                     </span>
                  </div>

                  <hr className="mb-1" />

                  <DropdownMenuItem className="flex items-center gap-3" asChild>
                     <Link href="/" className="flex items-center gap-2">
                        <HouseIcon className="size-4" />
                        <span>Home</span>
                     </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="flex items-center gap-3" asChild>
                     <Link
                        href="/dashboard"
                        className="flex items-center gap-2"
                     >
                        <LayoutDashboardIcon className="size-4" />{" "}
                        <span>Dashboard</span>
                     </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                     className="flex items-center gap-3"
                     onClick={() => signOut()}
                  >
                     <LogOutIcon className="size-4" />
                     <span>Sign out</span>
                  </DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>
         </div>
      );
   }

   return (
      <Button variant="ghost" size="sm" asChild>
         <Link className="flex items-center gap-2" href={"/dashboard"}>
            <span>Get Started</span>
            <ArrowRightIcon className="size-4" />
         </Link>
      </Button>
   );
}
