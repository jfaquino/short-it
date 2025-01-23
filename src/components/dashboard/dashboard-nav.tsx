"use client";

import { cn } from "@/lib/utils";
import { LinkIcon, SettingsIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DashboardRoutes = [
   {
      title: "Links",
      path: "/dashboard",
      icon: LinkIcon,
   },
   {
      title: "Settings",
      path: "/dashboard/settings",
      icon: SettingsIcon,
   },
];

export default function DashboardNav() {
   const pathname = usePathname();

   return (
      <nav className="flex items-center space-x-8 border-b">
         {DashboardRoutes.map((route) => (
            <Link
               key={route.path}
               href={route.path}
               className={cn(
                  "group relative px-1 pb-4 pt-3 text-sm font-medium outline-2 outline-current transition-colors duration-100 hover:bg-transparent hover:text-neutral-900 focus-visible:outline dark:hover:text-white",
                  pathname === route.path
                     ? "border-b border-purple-400 dark:border-purple-500"
                     : "text-neutral-500"
               )}
            >
               <div className=" relative  flex items-center space-x-2">
                  <route.icon
                     size={18}
                     className="duration-300 group-hover:rotate-6"
                  />
                  <span>{route.title}</span>
               </div>
            </Link>
         ))}
      </nav>
   );
}
