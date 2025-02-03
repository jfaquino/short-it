import { getIpInfo } from "@/server/services/ipService";
import {
   getUrlByShortCode,
   recordUrlAccess,
} from "@/server/services/urlService";
import { NextRequest, NextResponse } from "next/server";
import { ipAddress as ipAddress1 } from "@vercel/functions";
import { UAParser } from "ua-parser-js";

export async function GET(
   request: NextRequest,
   props: { params: Promise<{ shortCode: string }> }
) {
   const params = await props.params;
   const { shortCode } = params;

   try {
      const urlData = await getUrlByShortCode(shortCode);
      const ipAddress =
         ipAddress1(request) || request.headers.get("x-forwarded-for") || null;
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
         deviceType: device.type || "desktop || laptop",
         os: os.name || null,
      });

      return NextResponse.redirect(urlData.originalUrl);
   } catch (error) {
      console.error("Error in short code redirect:", error);
      return new NextResponse("Internal Server Error", { status: 500 });
   }
}
