import { Button } from "@/components/ui/button";
import { ArrowRightIcon, HouseIcon, LayoutDashboardIcon } from "lucide-react";
import Link from "next/link";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Image from "next/image";
import SignoutButton from "./signout-button";
import { auth } from "@/server/services/auth";

export default async function AuthButton() {
   const session = await auth();

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

                  <DropdownMenuItem asChild>
                     <SignoutButton className="w-full justify-start gap-3" />
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
