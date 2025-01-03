import { auth } from "@/server/services/auth";
import AnimatedNav from "@/components/layout/animated-nav";

export default async function Header() {
   const session = await auth();

   return (
      <header className="w-full sticky top-4 pb-4 z-10">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedNav
               className="flex items-center justify-between h-16 px-4"
               session={session}
            />
         </div>
      </header>
   );
}
