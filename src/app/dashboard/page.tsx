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
import { Copy, ExternalLink, Plus, Trash } from "lucide-react";

export default function Dashboard() {
   return (
      <main className="flex-1 p-8 mt-12 overflow-y-auto">
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
                     <div className="text-2xl font-bold">1,234</div>
                  </CardContent>
               </Card>
               <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                     <CardTitle className="text-sm font-medium">
                        Total Clicks
                     </CardTitle>
                  </CardHeader>
                  <CardContent>
                     <div className="text-2xl font-bold">287,654</div>
                  </CardContent>
               </Card>
               <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                     <CardTitle className="text-sm font-medium">
                        Avg. Clicks per URL
                     </CardTitle>
                  </CardHeader>
                  <CardContent>
                     <div className="text-2xl font-bold">233</div>
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
                     <TableRow>
                        <TableCell>short.url/abc123</TableCell>
                        <TableCell className="max-w-xs truncate">
                           https://www.example.com/very-long-url-that-needs-shortening
                        </TableCell>
                        <TableCell>1,234</TableCell>
                        <TableCell>
                           <div className="flex space-x-2">
                              <Button variant="outline" size="icon">
                                 <ExternalLink className="h-4 w-4" />
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
                     <TableRow>
                        <TableCell>short.url/def456</TableCell>
                        <TableCell className="max-w-xs truncate">
                           https://www.anotherexample.com/another-long-url-to-be-shortened
                        </TableCell>
                        <TableCell>5,678</TableCell>
                        <TableCell>
                           <div className="flex space-x-2">
                              <Button variant="outline" size="icon">
                                 <ExternalLink className="h-4 w-4" />
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
                  </TableBody>
               </Table>
            </div>
         </div>
      </main>
   );
}
