import DashboardNav from "@/components/dashboard/dashboard-nav";

export default function DashboardLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <>
         <div className="max-w-6xl container mx-auto w-full px-4 sm:px-6 lg:px-8  ">
            <DashboardNav />
         </div>

         <main className="flex-1 p-8 overflow-y-auto">
            <div className="max-w-4xl mx-auto">{children}</div>
         </main>
      </>
   );
}
