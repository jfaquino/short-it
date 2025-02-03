"use client";

import { LoaderIcon, TrashIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
   deleteUrl,
   DeleteUrlFormState,
} from "@/server/actions/urlShortenerActions";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const initialState: DeleteUrlFormState = {
   success: null,
   message: null,
};

export default function DeleteUrlButton({ urlId }: { urlId: number }) {
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

   return (
      <form action={formAction}>
         <Button type="submit" variant="outline" className="size-8" size="icon">
            {isPending ? (
               <LoaderIcon className="size-4 animate-spin" />
            ) : (
               <TrashIcon className="size-4" />
            )}
         </Button>
      </form>
   );
}
