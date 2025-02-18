import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { NavigationProfile } from "../_components/NavigationProfile";
import SideBar from "../_components/SideBar";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <NavigationProfile />
      <div className="flex">
        <SideBar />
        <main className="flex-1 min-w-0 p-4">{children}</main>
      </div>
    </div>
  );
}
