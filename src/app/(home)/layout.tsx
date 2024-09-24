import Header from "@/components/home/header";
import type { Metadata } from "next";

export const metadata: Metadata = {
   icons: "/short-it.svg",
   title: "Short It - Simple and fast URL shortener!",
   description:
      "An user-friendly URL shortening service designed for speed and simplicity. Short It allows users to quickly shorten long URLs, making them easier to share and manage.",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <div>
         <Header />
         {children}
      </div>
   );
}
