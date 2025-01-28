"use server";
import { z } from "zod";
import { createShortUrl } from "../services/urlShortener";
import { createInsertSchema } from "drizzle-zod";
import { urls } from "@/db/schema";
import { revalidatePath } from "next/cache";

export type AddUrlFormState = {
   success: boolean | null;
   errors?: {
      userId?: string[];
      originalUrl?: string[];
   };
   message?: string | null;
};

const AddUrlSchema = createInsertSchema(urls)
   .pick({
      originalUrl: true,
      userId: true,
   })
   .extend({
      userId: z.string().nonempty(),
      originalUrl: z.string().url(),
   });

export async function AddNewUrl(
   prevState: AddUrlFormState,
   formData: FormData
) {
   const validatedFields = AddUrlSchema.safeParse({
      originalUrl: formData.get("originalUrl"),
      userId: formData.get("userId"),
   });

   if (!validatedFields.success) {
      return {
         success: false,
         errors: validatedFields.error.flatten().fieldErrors,
         message: "Please check highlighted fields to continue",
      };
   }

   const { originalUrl, userId } = validatedFields.data;

   try {
      const shortCode = await createShortUrl({ originalUrl, userId });

      revalidatePath("/dashboard");
      return {
         success: true,
         message: shortCode,
      };
   } catch (error) {
      console.error(error);
      if (error instanceof Error) {
         return { success: false, message: error.message };
      }
      return {
         success: false,
         message: "Failed to create short URL.",
      };
   }
}
