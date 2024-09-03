import { urls } from "@/db/schema/urls";
import { createShortUrl } from "@/services/urlShortener";
import { createInsertSchema } from "drizzle-zod";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const shortenRequestSchema = createInsertSchema(urls).pick({
   originalUrl: true,
   userId: true,
});

type ShortenResponse = {
   shortUrl: string;
};

export async function POST(request: NextRequest) {
   try {
      const body = await request.json();

      const { originalUrl, userId } = shortenRequestSchema.parse(body);

      const shortCode = await createShortUrl({
         originalUrl,
         userId: userId ?? undefined,
      });

      const shortUrl = new URL(
         `/${shortCode}`,
         request.nextUrl.origin
      ).toString();

      return NextResponse.json<ShortenResponse>({ shortUrl }, { status: 201 });
   } catch (error) {
      if (error instanceof z.ZodError) {
         return NextResponse.json(
            { error: "Invalid input", details: error.errors },
            { status: 400 }
         );
      }

      if (error instanceof Error) {
         return NextResponse.json(
            { error: "Response Error", details: error.message },
            { status: 422 }
         );
      }

      console.error("Error in shorten API:", error);
      return NextResponse.json(
         { error: "Internal server error" },
         { status: 500 }
      );
   }
}
