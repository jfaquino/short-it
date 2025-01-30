import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ToasterProvider } from "@/components/providers/toaster-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
   icons: "/short-it.svg",
   title: {
      default:
         "Short It - Open-Source URL Shortener with Analytics & Link Management",
      template: "%s - Short It",
   },
   description:
      "Short-It is a fast and user-friendly URL shortener that makes sharing and managing links effortless. Shorten long URLs in seconds and track real-time analytics—all for free.",
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
               defaultTheme="dark"
               enableSystem
               disableTransitionOnChange
            >
               <div className="min-h-screen max-w-full  ">
                  <Header />
                  {children}
               </div>

               <ToasterProvider />
            </ThemeProvider>
         </body>
      </html>
   );
}
