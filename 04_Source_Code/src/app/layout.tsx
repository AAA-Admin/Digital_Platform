import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Inter, Sora } from "next/font/google";
import { Preloader } from "@/components/preloader";
import "./globals.css";

// Self-host Inter + Sora via next/font so the page no longer round-trips
// to fonts.googleapis.com / fonts.gstatic.com on first paint. Cuts ~160 KB
// of render-blocking third-party requests off the critical path.
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});
const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
  variable: "--font-sora",
});

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
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${inter.variable} ${sora.variable}`}
    >
      <head>
        {/* Restore theme before first paint — prevents flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('aaa-theme');if(t)document.documentElement.setAttribute('data-theme',t);})()`,
          }}
        />
      </head>
      <body>
        <Preloader />
        {children}
      </body>
    </html>
  );
}
