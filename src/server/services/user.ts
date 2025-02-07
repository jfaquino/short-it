import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

const userUpdateSchema = createInsertSchema(users).pick({
   id: true,
   name: true,
});

export const updateUserName = async (
   user: z.infer<typeof userUpdateSchema>
): Promise<void> => {
   const validatedFields = userUpdateSchema.safeParse(user);

   if (!validatedFields.success) {
      const errors = validatedFields.error.flatten().fieldErrors;
      throw new Error(`Invalid fields: ${JSON.stringify(errors)}`);
   }

   const { id, name } = user;

   try {
      await db.transaction(async (trx) => {
         const userExists = await trx
            .select({ id: users.id })
            .from(users)
            .where(eq(users.id, id));

         if (userExists.length === 0) {
            throw new Error("User not found");
         }

         await trx.update(users).set({ name }).where(eq(users.id, id));
      });
   } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error("Error updating user:", message);
      throw new Error(`Failed to update user: ${message}`);
   }
};
