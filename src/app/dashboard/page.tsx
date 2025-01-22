import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { formatDate, formatNumber, generateShortUrl } from "@/lib/utils";
import { auth } from "@/server/services/auth";
import { getUrlByUser } from "@/server/services/urlShortener";
import { Copy, ExternalLink, EyeIcon, Plus, Trash } from "lucide-react";
import { redirect } from "next/navigation";

export default async function Dashboard() {
   const session = await auth();
   if (!session) return redirect("/login");

   const data = session.user?.id && (await getUrlByUser(session.user?.id));

   const totalUrlCount = data?.length ?? 0;
   const totalClicks = data
      ? (data?.map((item) => item.urlStats ?? []) ?? []).flat().length
      : 0;
   const avgClicks = totalClicks / totalUrlCount || 0;

   return (
      <>
         {/* Stats overview */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                     Total URLs
                  </CardTitle>
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

         {/* URL Management */}
         <div className="bg-white dark:bg-gray-800/40 rounded-lg shadow p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4 dark:text-white">
               Manage URLs
            </h3>
            <div className="flex space-x-4 mb-4">
               <Input placeholder="Enter long URL" className="flex-grow" />
               <Button>
                  <Plus className="mr-2 h-4 w-4" /> Shorten
               </Button>
            </div>

            <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
               {data &&
                  data.map((item) => (
                     <Card key={item.shortCode}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                           <CardTitle className="text-lg font-medium ">
                              {`/${item.shortCode}`}
                           </CardTitle>
                           <div className="flex space-x-2">
                              <Button
                                 variant="outline"
                                 className="size-8"
                                 size="icon"
                                 asChild
                              >
                                 <a
                                    href={generateShortUrl(item.shortCode).url}
                                    target="_blank"
                                 >
                                    <ExternalLink className="size-4" />
                                 </a>
                              </Button>
                              <Button
                                 variant="outline"
                                 className="size-8"
                                 size="icon"
                              >
                                 <Copy className="size-4" />
                              </Button>
                              <Button
                                 variant="outline"
                                 className="size-8"
                                 size="icon"
                              >
                                 <Trash className="size-4" />
                              </Button>
                           </div>
                        </CardHeader>

                        <CardContent className="overflow-hidden truncate text-neutral-500 dark:text-neutral-400 ">
                           <span
                              className="truncate select-all font-mono text-sm "
                              title={item.originalUrl}
                           >
                              {item.originalUrl}
                           </span>
                        </CardContent>

                        <CardFooter
                           className="flex items-center justify-between gap-4
                                          text-xs text-neutral-500 dark:text-neutral-400 
                                          font-mono"
                        >
                           <div
                              className="flex items-center gap-1"
                              title="visits"
                           >
                              <EyeIcon className="size-4" />
                              <span>
                                 {formatNumber(item.urlStats.length, {
                                    notation: "compact",
                                 })}
                              </span>
                           </div>

                           <span title="Created On">
                              {formatDate(new Date(item.createdAt))}
                           </span>
                        </CardFooter>
                     </Card>
                  ))}
            </div>
         </div>
      </>
   );
}
