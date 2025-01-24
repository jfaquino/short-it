"use client";

import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { useDebouncedCallback } from "use-debounce";

export default function SearchBar({ className }: { className?: string }) {
   const searchParams = useSearchParams();
   const pathname = usePathname();
   const router = useRouter();

   const handleSearch = useDebouncedCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
         const params = new URLSearchParams(searchParams);
         if (e.target.value) {
            params.set("query", e.target.value);
         } else {
            params.delete("query");
         }
         router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      },
      300
   );

   return (
      <div className={cn("relative", className)}>
         <SearchIcon className="size-4 absolute left-2 top-1/2 -translate-y-1/2 transform text-muted-foreground" />
         <Input
            type="search"
            autoComplete="off"
            placeholder="Search Urls"
            className="pl-8"
            onChange={handleSearch}
            defaultValue={searchParams.get("query")?.toString()}
         />
      </div>
   );
}
