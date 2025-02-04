import AddUrlForm from "@/components/dashboard/add-url-form";
import DeleteUrlButton from "@/components/dashboard/delete-url-form";
import SearchBar from "@/components/dashboard/search-bar";
import ExternalLink from "@/components/links/external-link";
import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { formatDate, formatNumber, generateShortUrl } from "@/lib/utils";
import { auth } from "@/server/services/auth";
import { getUrlByUser } from "@/server/services/urlService";
import {
   ArrowUpRightIcon,
   Copy,
   EyeIcon,
   PackageOpenIcon,
   SparklesIcon,
} from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
   title: "Dashboard",
};

export default async function Dashboard(props: {
   searchParams?: Promise<{
      query?: string;
   }>;
}) {
   const session = await auth();
   const searchParams = await props.searchParams;
   const searchQuery = searchParams?.query;

   const data =
      session && session.user?.id && (await getUrlByUser(session.user?.id));
   if (!data) {
      return <div>Error</div>;
   }

   const filteredUrlData = !searchParams?.query
      ? data
      : data.filter((url) => {
           if (!searchParams?.query) return true;

           const matchQuery = searchParams.query.toLowerCase();

           // Filter Urls by shortCode or originalUrl
           const matchShortCode =
              matchQuery && url.shortCode.toLowerCase().includes(matchQuery);

           const matchOriginalUrl =
              matchQuery && url.originalUrl.toLowerCase().includes(matchQuery);

           return matchShortCode || matchOriginalUrl;
        });

   return (
      <div className="bg-white dark:bg-gray-800/40 rounded-lg shadow p-6 mb-8">
         <header className="mb-3 flex w-full items-center space-x-2 md:justify-between">
            <SearchBar className="w-full md:w-72 md:max-w-72" />

            {session?.user?.id && <AddUrlForm userId={session.user?.id} />}
         </header>

         <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
            {filteredUrlData.map((item) => (
               <Card key={item.shortCode}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                     <CardTitle className="flex items-center gap-2">
                        <div className="size-11 p-1 flex justify-center items-center rounded-full overflow-hidden ">
                           <Image
                              src={`https://icon.horse/icon/${
                                 new URL(item.originalUrl).hostname
                              }`}
                              className="h-auto w-full aspect-square"
                              alt="link favicon"
                              width={40}
                              height={40}
                              unoptimized
                           />
                        </div>
                        <Button
                           className="space-x-1 group hover:no-underline "
                           variant="link"
                           asChild
                        >
                           <ExternalLink
                              href={generateShortUrl(item.shortCode).url}
                           >
                              <span className="text-xl opacity-60">{"/"}</span>

                              <span className="text-base font-bold tracking-wider ">
                                 {`${item.shortCode}`}
                              </span>
                              <ArrowUpRightIcon
                                 className="size-5 ml-3 scale-75 transition duration-300 
                                                   group-hover:rotate-6 group-hover:scale-100"
                              />
                           </ExternalLink>
                        </Button>
                     </CardTitle>

                     <div className="flex space-x-2">
                        <Button
                           variant="outline"
                           className="size-8"
                           size="icon"
                        >
                           <Copy className="size-4" />
                        </Button>

                        <DeleteUrlButton
                           urlId={item.id}
                           shortCode={item.shortCode}
                        />
                     </div>
                  </CardHeader>

                  <CardContent className="overflow-hidden truncate text-secondary-foreground">
                     <span
                        className="truncate select-all font-mono text-sm"
                        title={item.originalUrl}
                     >
                        {item.originalUrl}
                     </span>
                  </CardContent>

                  <CardFooter
                     className="flex items-center justify-between gap-4
                                          text-xs text-muted-foreground font-mono"
                  >
                     <div className="flex items-center gap-1" title="visits">
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

            {filteredUrlData.length === 0 && (
               <div className="mt-4 flex flex-col items-center justify-center space-y-3 text-center">
                  {searchQuery ? (
                     <PackageOpenIcon size={48} strokeWidth={0.5} />
                  ) : (
                     <SparklesIcon size={48} strokeWidth={0.5} />
                  )}
                  {searchQuery ? (
                     <p>
                        No links found with{" "}
                        <span className="font-mono">{searchQuery}</span>
                     </p>
                  ) : (
                     <p>No links found in your account, create one now!</p>
                  )}
               </div>
            )}
         </div>
      </div>
   );
}
