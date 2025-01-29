import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";
import { auth } from "@/server/services/auth";
import { getUrlByUser } from "@/server/services/urlShortener";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Analytics",
};

export default async function page() {
   const session = await auth();

   const data =
      (session && session.user?.id && (await getUrlByUser(session.user?.id))) ??
      [];

   const totalUrlCount = data?.length ?? 0;
   const totalClicks = data
      ? (data?.map((item) => item.urlStats ?? []) ?? []).flat().length
      : 0;
   const avgClicks = totalClicks / totalUrlCount || 0;

   return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
               <CardTitle className="text-sm font-medium">Total URLs</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="text-2xl font-bold">
                  {formatNumber(totalUrlCount, {
                     notation: "compact",
                  })}
               </div>
            </CardContent>
         </Card>
         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
               <CardTitle className="text-sm font-medium">
                  Total Clicks
               </CardTitle>
            </CardHeader>
            <CardContent>
               <div className="text-2xl font-bold">
                  {formatNumber(totalClicks, {
                     notation: "compact",
                  })}
               </div>
            </CardContent>
         </Card>
         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
               <CardTitle className="text-sm font-medium">
                  Avg. Clicks per URL
               </CardTitle>
            </CardHeader>
            <CardContent>
               <div className="text-2xl font-bold">
                  {formatNumber(avgClicks, {
                     notation: "compact",
                  })}
               </div>
            </CardContent>
         </Card>
      </div>
   );
}
