import { getUrlByShortCode, recordUrlAccess } from "@/services/urlShortener";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
   request: NextRequest,
   { params }: { params: { shortCode: string } }
) {
   const { shortCode } = params;

   try {
      const urlData = await getUrlByShortCode(shortCode);

      if (!urlData) {
         const urlNotFound = new URL("/404", request.url);
         return NextResponse.redirect(urlNotFound);
      }
      console.info(request.geo);

      await recordUrlAccess({
         urlId: urlData.id,
         ipAddress: request.ip || null,
         referrer: request.referrer || request.headers.get("referer") || null,
         userAgent: request.headers.get("user-agent") || null,
      });

      return NextResponse.redirect(urlData.originalUrl);
   } catch (error) {
      console.error("Error in short code redirect:", error);
      return new NextResponse("Internal Server Error", { status: 500 });
   }
}
