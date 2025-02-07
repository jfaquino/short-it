import UpdateUserForm from "@/components/settings/update-user-form";
import { auth } from "@/server/services/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Settings",
};

export default async function Settings() {
   const session = await auth();
   if (
      !session ||
      !session.user ||
      !session.user.id ||
      !session.user.name ||
      !session.user.email
   ) {
      return null;
   }

   return (
      <div>
         <UpdateUserForm
            userId={session.user?.id}
            userName={session.user?.name}
            email={session.user?.email}
         />
      </div>
   );
}
