import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import { formatNumber } from "@/lib/utils";
import { auth } from "@/services/auth";
import { getUrlByUser } from "@/services/urlShortener";
import { Copy, ExternalLink, Plus, Trash } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const host = process.env.HOST_URL;

export default async function Dashboard() {
   const session = await auth();
   if (!session) return redirect("/login");

   const data = session.user?.id && (await getUrlByUser(session.user?.id));

   const totalUrlCount = data?.length ?? 0;
   const totalClicks = data
      ? (data?.map((item) => item.urlStats ?? []) ?? []).flat().length
      : 0;
   const avgClicks = totalClicks / totalUrlCount || 0;

   const generateShortUrl = (
      shortCode: string
   ): { label: string; url: string } => {
      if (!host || !shortCode) return { label: "", url: "" };

      try {
         const url = new URL(shortCode, host);
         return { label: `${url.host}${url.pathname}`, url: url.toString() };
      } catch (error) {
         console.error("Invalid URL:", error);
         return { label: "", url: "" };
      }
   };

   return (
      <main className="flex-1 p-8 overflow-y-auto">
         <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
               <h2 className="text-3xl font-bold dark:text-white">Dashboard</h2>
               {/* <Button variant="outline" size="icon" onClick={toggleDarkMode}>
           {darkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
         </Button> */}
            </div>

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
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
               <h3 className="text-xl font-semibold mb-4 dark:text-white">
                  Manage URLs
               </h3>
               <div className="flex space-x-4 mb-4">
                  <Input placeholder="Enter long URL" className="flex-grow" />
                  <Button>
                     <Plus className="mr-2 h-4 w-4" /> Shorten
                  </Button>
               </div>
               <Table>
                  <TableHeader>
                     <TableRow>
                        <TableHead>Short URL</TableHead>
                        <TableHead>Original URL</TableHead>
                        <TableHead>Clicks</TableHead>
                        <TableHead>Actions</TableHead>
                     </TableRow>
                  </TableHeader>
                  <TableBody>
                     {data &&
                        data.map((item) => (
                           <TableRow key={item.id}>
                              <TableCell>
                                 {generateShortUrl(item.shortCode).label}
                              </TableCell>
                              <TableCell className="max-w-xs truncate">
                                 {item.originalUrl}
                              </TableCell>
                              <TableCell>
                                 {formatNumber(item.urlStats.length ?? 0, {
                                    notation: "compact",
                                 })}
                              </TableCell>
                              <TableCell>
                                 <div className="flex space-x-2">
                                    <Button
                                       variant="outline"
                                       size="icon"
                                       asChild
                                    >
                                       <Link
                                          href={
                                             generateShortUrl(item.shortCode)
                                                .url
                                          }
                                          target="_blank"
                                       >
                                          <ExternalLink className="h-4 w-4" />
                                       </Link>
                                    </Button>
                                    <Button variant="outline" size="icon">
                                       <Copy className="h-4 w-4" />
                                    </Button>
                                    <Button variant="outline" size="icon">
                                       <Trash className="h-4 w-4" />
                                    </Button>
                                 </div>
                              </TableCell>
                           </TableRow>
                        ))}
                  </TableBody>
               </Table>
            </div>
         </div>
      </main>
   );
}
