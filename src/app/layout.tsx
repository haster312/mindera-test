import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Banner from "@/layouts/banner";
import {HeroUIProvider} from "@heroui/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <HeroUIProvider>
        <Banner />
        <div className="pl-5 pr-5 mb-5">
            {children}
        </div>
      </HeroUIProvider>
      </body>
    </html>
  );
}
