"use client";

import {
   Card,
   CardContent,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import {
   updateUser,
   UpdateUserNameFormState,
} from "@/server/actions/userActions";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { AlertTriangleIcon, LoaderIcon, SaveIcon } from "lucide-react";
import { toast } from "sonner";
import { useResetableActionState } from "@/hooks/use-resetable-action-state";

const initialState: UpdateUserNameFormState = {
   success: null,
   message: null,
   errors: {},
};

export default function UpdateUserForm({
   userId,
   userName,
   email,
}: {
   userId: string;
   userName: string;
   email: string;
}) {
   const updateUserWithId = updateUser.bind(null, userId);
   const [state, formAction, isPending, reset] = useResetableActionState(
      updateUserWithId,
      initialState
   );
   const [name, setName] = useState(userName);
   const hasErrors = Boolean(state.errors?.name);
   const hasNameChanged = !Boolean(name === userName);

   useEffect(() => {
      if (!!state.success) {
         toast.success("Name updated successfully", {
            duration: 10000,
            closeButton: true,
         });
         reset();
      }
   }, [reset, state.message, state.success]);

   return (
      <Card>
         <CardHeader>
            <CardTitle>Profile</CardTitle>
         </CardHeader>

         <form action={formAction}>
            <CardContent className="space-y-4">
               <div className="space-y-2">
                  <label
                     htmlFor="name"
                     className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                     Name:
                  </label>

                  <Input
                     id="name"
                     name="name"
                     aria-describedby={hasErrors ? "name-error" : undefined}
                     aria-invalid={hasErrors}
                     className={cn(
                        "w-full",
                        hasErrors && "border-red-500 focus:ring-red-500"
                     )}
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                  />
                  {hasErrors && state?.errors?.name && (
                     <div
                        id="name-error"
                        role="alert"
                        className="text-sm text-red-500 space-y-1"
                     >
                        {state.errors.name.map((error) => (
                           <p key={error}>{error}</p>
                        ))}
                     </div>
                  )}
               </div>

               <div className="space-y-2">
                  <label
                     htmlFor="email"
                     className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                     Email:
                  </label>

                  <Input
                     id="email"
                     name="email"
                     defaultValue={email}
                     readOnly
                     disabled
                     className={cn("w-full")}
                  />
                  <div className="flex items-center gap-2 pl-1 text-sm text-muted-foreground">
                     <AlertTriangleIcon className="size-4" />
                     <span>
                        Email address is managed by your OAuth provider.
                     </span>
                  </div>
               </div>
            </CardContent>

            <CardFooter className="justify-end">
               <Button
                  className="items-center gap-2"
                  type="submit"
                  disabled={isPending || !hasNameChanged}
               >
                  {isPending && (
                     <>
                        <LoaderIcon className="animate-spin size-4" /> Saving...
                     </>
                  )}
                  {!isPending && (
                     <>
                        <SaveIcon className="size-4" /> Save
                     </>
                  )}
               </Button>
            </CardFooter>
         </form>
      </Card>
   );
}
