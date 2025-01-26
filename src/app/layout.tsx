import type { Metadata } from "next";
import {Inter} from 'next/font/google'
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
  title: "TimeTable",
  description: "Manage your schedule efficiently",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Analytics />
      <body className={inter.className}>
        <Navbar />
        {children}
        <Toaster position="bottom-right"/>
      </body>
    </html>
  );
}
