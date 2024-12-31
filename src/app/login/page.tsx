import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import ShorItButton from "@/components/links/shorItButton";
import { auth } from "@/server/services/auth";
import { redirect } from "next/navigation";
import GithubSigninButton from "@/components/auth/github-signin-button";

export default async function LoginPage() {
   const session = await auth();

   if (session) return redirect("/dashboard");

   return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-2">
         <Card className="w-full max-w-[350px] ">
            <CardHeader>
               <div className="flex justify-center pb-8">
                  <ShorItButton />
               </div>

               <CardTitle className="text-xl">Sign in to Short It</CardTitle>
               <CardDescription>
                  Welcome back! Please sign in to continue
               </CardDescription>
            </CardHeader>
            <CardContent>
               <GithubSigninButton />
            </CardContent>
         </Card>
      </div>
   );
}
