import { getIpInfo } from "@/services/ipService";
import { getUrlByShortCode, recordUrlAccess } from "@/services/urlShortener";
import { NextRequest, NextResponse } from "next/server";
import { UAParser } from "ua-parser-js";

export async function GET(
   request: NextRequest,
   { params }: { params: { shortCode: string } }
) {
   const { shortCode } = params;

   try {
      const urlData = await getUrlByShortCode(shortCode);
      const ipAddress =
         request.ip || request.headers.get("x-forwarded-for") || null;
      const referrer =
         request.referrer || request.headers.get("referer") || null;
      const userAgent = request.headers.get("user-agent") || null;

      if (!urlData) {
         const urlNotFound = new URL("/404", request.url);
         return NextResponse.redirect(urlNotFound);
      }

      const ipInfo = ipAddress ? await getIpInfo(ipAddress) : null;
      const { browser, device, os } = UAParser(userAgent ?? undefined);

      await recordUrlAccess({
         urlId: urlData.id,
         ipAddress,
         referrer,
         userAgent,
         country: ipInfo ? ipInfo.country : null,
         city: ipInfo ? ipInfo.city : null,
         browser: browser.name || null,
         deviceType: device.type || null,
         os: os.name || null,
      });

      return NextResponse.redirect(urlData.originalUrl);
   } catch (error) {
      console.error("Error in short code redirect:", error);
      return new NextResponse("Internal Server Error", { status: 500 });
   }
}
