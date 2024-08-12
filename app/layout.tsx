import * as React from "react";
import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import SiteNav from '@/app/components/sitenav';

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Adsense from "./components/adsense";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Reaction Hub",
  description: "The Hub for Reactions and Reviews for Anime, Movies and more from KrowTV!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Adsense />
      </head>
      <body className={rubik.className}>
        <NextUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
            <SiteNav />
            {children}
          </NextThemesProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
