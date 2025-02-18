import type { Metadata } from "next";
import { Flow_Circular, Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { cookies, headers } from "next/headers";
import { Loading } from "./_components/loading";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Buy Me a Coffee",
  description:
    "Buy Me a Coffee is the best way for creators and artists to accept support and membership from their fans.",
};
const inter = Flow_Circular({ subsets: ["latin"], weight: "400" });
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        {/* <Loading /> */}
        <Suspense fallback={<div></div>}>{children}</Suspense>
      </body>
    </html>
  );
}
