"use client";

import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CircleXIcon, LoaderIcon, Plus, RocketIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import {
   AddNewUrl,
   AddUrlFormState,
} from "@/server/actions/urlShortenerActions";
import { cn } from "@/lib/utils";
import { useResetableActionState } from "@/hooks/use-resetable-action-state";

const initialState: AddUrlFormState = {
   success: null,
   message: null,
   errors: {},
};

export default function AddUrlForm({ userId }: { userId: string }) {
   const [open, setOpen] = useState<boolean>(false);

   const [state, formAction, isPending, reset] = useResetableActionState(
      AddNewUrl,
      initialState
   );

   useEffect(() => {
      if (state.success) {
         setOpen(false);
      }
   }, [state.success]);

   const handleDialogToggle = (value: boolean) => {
      setOpen(value);
      if (!value) {
         reset();
      }
   };

   const hasErrorsOriginalUrl = Boolean(state.errors?.originalUrl);

   return (
      <Dialog open={open} onOpenChange={handleDialogToggle}>
         <DialogTrigger asChild>
            <Button>
               <Plus className="mr-2 h-4 w-4" /> <span>Add Url</span>
            </Button>
         </DialogTrigger>

         <DialogContent overlayClassName="backdrop-blur-sm backdrop-filter">
            <DialogHeader>
               <DialogTitle>Add New Url</DialogTitle>
            </DialogHeader>

            <form className="mt-10 space-y-10" action={formAction}>
               <div className="space-y-2">
                  <label
                     htmlFor="originalUrl"
                     className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                     Paste your url here to short it!
                  </label>

                  <Input
                     id="originalUrl"
                     name="originalUrl"
                     type="url"
                     autoFocus
                     autoComplete="url"
                     placeholder="https://"
                     aria-describedby={
                        hasErrorsOriginalUrl ? "originalUrl-error" : undefined
                     }
                     aria-invalid={hasErrorsOriginalUrl}
                     className={cn(
                        "w-full",
                        hasErrorsOriginalUrl &&
                           "border-red-500 focus:ring-red-500"
                     )}
                  />

                  {hasErrorsOriginalUrl && state?.errors?.originalUrl && (
                     <div
                        id="originalUrl-error"
                        role="alert"
                        className="text-sm text-red-500 space-y-1"
                     >
                        {state.errors.originalUrl.map((error) => (
                           <p key={error}>{error}</p>
                        ))}
                     </div>
                  )}
               </div>

               <input type="hidden" name="userId" value={userId} />

               <DialogDescription>
                  Enter the website url you want to shorten.
               </DialogDescription>

               {state.errors && Object.keys(state.errors).length > 0 && (
                  <div
                     role="alert"
                     className={cn(
                        "flex items-center mt-2 text-sm text-red-500 gap-2",
                        "animate-in fade-in duration-200"
                     )}
                  >
                     <CircleXIcon />
                     <p className="leading-tight">{state.message}</p>
                  </div>
               )}

               <footer className="mt-4 flex justify-end items-center gap-2">
                  <DialogClose asChild>
                     <Button variant="ghost" disabled={isPending}>
                        Cancel
                     </Button>
                  </DialogClose>

                  <Button
                     type="submit"
                     className="flex items-center gap-2"
                     disabled={isPending}
                  >
                     {isPending ? (
                        <LoaderIcon className="size-4 animate-spin" />
                     ) : (
                        <RocketIcon className="size-4" />
                     )}
                     <span>{isPending ? "Shortening..." : "Shorten"}</span>
                  </Button>
               </footer>
            </form>
         </DialogContent>
      </Dialog>
   );
}
