import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
   icons: "/short-it.svg",
   title: "Short It - Simple and fast URL shortener!",
   description:
      "A (WIP) user-friendly URL shortening service designed for speed and simplicity. Short It allows users to quickly shorten long URLs, making them easier to share and manage.",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body className={inter.className}>{children}</body>
      </html>
   );
}
