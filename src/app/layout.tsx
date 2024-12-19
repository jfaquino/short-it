import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/server/services/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
   icons: "/short-it.svg",
   title: "Short It - Simple and fast URL shortener!",
   description:
      "An user-friendly URL shortening service designed for speed and simplicity. Short It allows users to quickly shorten long URLs, making them easier to share and manage.",
};

export default async function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   const session = await auth();

   return (
      <html lang="en">
         <body className={inter.className}>
            <SessionProvider session={session}>
               <div className="min-h-screen max-w-full  ">{children}</div>
            </SessionProvider>
         </body>
      </html>
   );
}
