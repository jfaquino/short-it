"use server";

import { users } from "@/db/schema";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { updateUserName } from "../services/user";
import { revalidatePath } from "next/cache";

export type UpdateUserNameFormState = {
   success: boolean | null;
   errors?: {
      name?: string[];
   };
   message?: string | null;
};

const updateUserSchema = createInsertSchema(users)
   .pick({
      name: true,
   })
   .extend({
      name: z
         .string()
         .nonempty("Name cannot be empty")
         .max(40, "Name must contain at most 40 character(s)"),
   });

export async function updateUser(
   id: string,
   prevState: UpdateUserNameFormState,
   formData: FormData
) {
   const validatedFields = updateUserSchema.safeParse({
      name: formData.get("name"),
   });

   if (!validatedFields.success) {
      return {
         success: false,
         errors: validatedFields.error.flatten().fieldErrors,
         message: "Please check highlighted fields to continue",
      };
   }

   const { name } = validatedFields.data;

   try {
      await updateUserName({ id, name });

      revalidatePath("/dashboard/settings");

      return {
         success: true,
         message: "User name updated successfully",
      };
   } catch (error) {
      console.error(error);
      if (error instanceof Error) {
         return { success: false, message: error.message };
      }
      return {
         success: false,
         message: "Failed to update user name.",
      };
   }
}
