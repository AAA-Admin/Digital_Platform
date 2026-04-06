import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Preloader } from "@/components/preloader";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://aaa-events.in"),
  title: "AAA Events & Production",
  description:
    "AAA Events & Production builds reliable event infrastructure for stages, live environments, and on-ground event execution across India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        {/* Restore theme before first paint — prevents flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('aaa-theme');if(t)document.documentElement.setAttribute('data-theme',t);})()`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Sora:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Preloader />
        {children}
      </body>
    </html>
  );
}
