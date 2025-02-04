"use client";

import { LoaderIcon, TrashIcon } from "lucide-react";
import { Button } from "../ui/button";
import { deleteUrl, DeleteUrlFormState } from "@/server/actions/urlActions";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";

const initialState: DeleteUrlFormState = {
   success: null,
   message: null,
};

export default function DeleteUrlButton({
   urlId,
   shortCode,
}: {
   urlId: number;
   shortCode: string;
}) {
   const deleteUrlWithId = deleteUrl.bind(null, urlId);
   const [state, formAction, isPending] = useActionState(
      deleteUrlWithId,
      initialState
   );

   useEffect(() => {
      if (state.message) {
         if (!state.success) {
            toast.error("Something happened", {
               description: state.message,
               duration: 10000,
               closeButton: true,
            });
         }
      }
   }, [state]);

   console.log(state);

   return (
      <Dialog>
         <DialogTrigger asChild>
            <Button variant="outline" className="size-8" size="icon">
               <TrashIcon className="size-4" />
            </Button>
         </DialogTrigger>

         <DialogContent>
            <DialogHeader>
               <DialogTitle>{`Delete /${shortCode}`}</DialogTitle>
               <DialogDescription className="text-red-500 dark:text-red-400">
                  This will permanently delete the link and its stats. This
                  action cannot be undone.
               </DialogDescription>
            </DialogHeader>

            <DialogFooter>
               <DialogClose asChild>
                  <Button variant="ghost" disabled={isPending}>
                     Cancel
                  </Button>
               </DialogClose>

               <form action={formAction}>
                  <Button
                     type="submit"
                     variant="destructive"
                     disabled={isPending}
                     className="flex items-center gap-2"
                  >
                     {isPending ? (
                        <LoaderIcon className="size-4 animate-spin" />
                     ) : (
                        <TrashIcon className="size-4" />
                     )}
                     <span>{isPending ? "Deleting..." : "Delete"}</span>
                  </Button>
               </form>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
}
