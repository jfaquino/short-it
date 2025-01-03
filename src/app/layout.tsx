import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import { ThemeProvider } from "@/components/layout/theme-provider";

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
   return (
      <html lang="en" suppressHydrationWarning>
         <body className={inter.className}>
            <ThemeProvider
               attribute="class"
               defaultTheme="system"
               enableSystem
               disableTransitionOnChange
            >
               <div className="min-h-screen max-w-full  ">
                  <Header />
                  {children}
               </div>
            </ThemeProvider>
         </body>
      </html>
   );
}
