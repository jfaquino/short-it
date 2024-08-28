import Link from "next/link";
// import {
//   Sheet,
//   SheetContent,
//   SheetTrigger,
// } from "@/components/ui/sheet"
import Image from "next/image";
import { auth } from "@/services/auth";
import AuthButton from "./authButton";

export default async function Header() {
   // const [isOpen, setIsOpen] = useState(false);
   const session = await auth();

   const navItems = [
      { name: "Features", href: "/features" },
      { name: "Pricing", href: "/pricing" },
      { name: "API", href: "/api" },
      { name: "Blog", href: "/blog" },
   ];

   return (
      <header className="fixed w-full bg-gradient-to-r from-gray-900 to-purple-900 text-white z-10">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
               <div className="flex items-center">
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
               </div>
               <nav className="flex space-x-8">
                  {navItems.map((item) => (
                     <Link
                        key={item.name}
                        href={item.href}
                        className="text-sm font-medium text-gray-300 hover:text-white hover:underline underline-offset-4 transition-colors"
                     >
                        {item.name}
                     </Link>
                  ))}
               </nav>
               <AuthButton session={session} />

               {/* <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white focus:outline-none">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open main menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-gray-900">
                <nav className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-gray-300 hover:text-white transition-colors text-lg"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Link
                    href="/login"
                    className="text-gray-300 hover:text-white transition-colors text-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Log in
                  </Link>
                  <Button 
                    className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div> */}
            </div>
         </div>
      </header>
   );
}
