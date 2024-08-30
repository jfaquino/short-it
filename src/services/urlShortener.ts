import { db } from "@/db";
import { urls } from "@/db/schema/urls";
import { urlStats } from "@/db/schema/urlStats";
import { users } from "@/db/schema/users";
import { eq } from "drizzle-orm";

const HOST_URL = "https://short-it-kappa.vercel.app/";
const CHARACTERS =
   "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const CODE_LENGTH = 6;

export type UrlData = {
   originalUrl: string;
   userId?: string;
};

export async function createShortUrl(data: UrlData): Promise<string> {
   if (!isValidUrl(data.originalUrl)) {
      throw new Error("Invalid URL");
   }

   const shortenedUrl = await generateUniqueShortenedUrl();

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

         await trx.insert(urls).values({ ...data, shortenedUrl });
      });

      return shortenedUrl;
   } catch (error) {
      console.error("Error creating short URL:", error);
      throw new Error("Failed to create short URL");
   }
}

export async function getOriginalUrl(
   shortenedUrl: string
): Promise<string | null> {
   const result = await db
      .select()
      .from(urls)
      .where(eq(urls.shortenedUrl, shortenedUrl))
      .limit(1);

   if (result.length === 0) {
      return null;
   }

   return result[0].originalUrl;
}

export type UrlAccessInfo = {
   urlId: number;
   referrer: string | null;
   userAgent: string | null;
   ipAddress: string | null;
};
export async function recordUrlAccess(
   accessInfo: UrlAccessInfo
): Promise<void> {
   const { urlId, referrer, userAgent, ipAddress } = accessInfo;

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
         });
      });
   } catch (error) {
      console.error("Error recording URL access:", error);
      throw error;
   }
}

async function generateUniqueShortenedUrl(): Promise<string> {
   let shortenedUrl: string;
   let isUnique = false;

   do {
      const shortCode = generateShortCode();
      shortenedUrl = HOST_URL + shortCode;
      const existing = await db
         .select()
         .from(urls)
         .where(eq(urls.shortenedUrl, shortenedUrl));
      isUnique = !existing[0];
   } while (!isUnique);

   return shortenedUrl;
}

function generateShortCode(): string {
   let result = "";
   for (let i = 0; i < CODE_LENGTH; i++) {
      result += CHARACTERS.charAt(
         Math.floor(Math.random() * CHARACTERS.length)
      );
   }
   return result;
}

function isValidUrl(url: string): boolean {
   try {
      new URL(url);
      return true;
   } catch {
      return false;
   }
}
