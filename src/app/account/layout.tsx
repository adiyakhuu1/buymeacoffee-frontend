import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "../globals.css";
import Half from "../_components/account-halfscreen";

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
const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Half />
      <div className="w-1/2 min-h-screen fixed top-0 right-0">{children}</div>
    </div>
  );
}
