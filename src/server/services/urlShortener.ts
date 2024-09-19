import { db } from "@/db";
import { urls } from "@/db/schema/urls";
import { urlStats } from "@/db/schema/urlStats";
import { users } from "@/db/schema/users";
import { generateShortCode, isValidUrl } from "@/lib/utils";
import { eq } from "drizzle-orm";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export type UrlData = {
   originalUrl: string;
   userId?: string;
};

export async function createShortUrl(data: UrlData): Promise<string> {
   if (!isValidUrl(data.originalUrl)) {
      throw new Error("Invalid URL");
   }

   const shortCode = await generateUniqueShortCode();

   try {
      await db.transaction(async (trx) => {
         if (data.userId) {
            const userExists = await trx
               .select({ id: users.id })
               .from(users)
               .where(eq(users.id, data.userId))
               .execute();

            if (userExists.length === 0) {
               throw new Error("User not found");
            }
         }

         await trx.insert(urls).values({ ...data, shortCode });
      });

      return shortCode;
   } catch (error) {
      console.error("Error creating short URL:", error);
      throw new Error("Failed to create short URL");
   }
}

const urlSchema = createSelectSchema(urls);

export async function getUrlByShortCode(
   shortCode: string
): Promise<z.infer<typeof urlSchema> | null> {
   const result = await db
      .select()
      .from(urls)
      .where(eq(urls.shortCode, shortCode))
      .limit(1);

   if (result.length === 0) {
      return null;
   }

   return result[0];
}

export type UrlAccessInfo = {
   urlId: number;
   referrer: string | null;
   userAgent: string | null;
   ipAddress: string | null;
   country: string | null;
   city: string | null;
   deviceType: string | null;
   browser: string | null;
   os: string | null;
};
export async function recordUrlAccess(
   accessInfo: UrlAccessInfo
): Promise<void> {
   const {
      urlId,
      referrer,
      userAgent,
      ipAddress,
      country,
      city,
      deviceType,
      browser,
      os,
   } = accessInfo;

   if (!urlId || typeof urlId !== "number") {
      throw new Error("Invalid urlId");
   }

   try {
      await db.transaction(async (tx) => {
         const urlExists = await tx
            .select({ exists: urls.id })
            .from(urls)
            .where(eq(urls.id, urlId))
            .limit(1);

         if (urlExists.length === 0) {
            throw new Error("URL not found");
         }

         await tx.insert(urlStats).values({
            urlId,
            referrer,
            userAgent,
            ipAddress,
            country,
            city,
            deviceType,
            browser,
            os,
         });
      });
   } catch (error) {
      console.error("Error recording URL access:", error);
      throw error;
   }
}

const urlStatsSchema = createSelectSchema(urlStats);

const getUrlResponse = urlSchema
   .extend({
      urlStats: urlStatsSchema.array(),
   })
   .array();

export async function getUrlByUser(userId: string) {
   const urlList = await db.query.urls.findMany({
      with: { urlStats: true },
      where: eq(urls.userId, userId),
   });

   return getUrlResponse.parse(urlList);
}

async function generateUniqueShortCode(): Promise<string> {
   let shortCode: string;
   let isUnique = false;

   do {
      shortCode = generateShortCode();
      const existing = await db
         .select()
         .from(urls)
         .where(eq(urls.shortCode, shortCode));
      isUnique = !existing[0];
   } while (!isUnique);

   return shortCode;
}