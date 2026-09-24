import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

import { cn } from "@/lib/utils";
import Header from "@/components/page/page-header";
import Footer from "@/components/page/page-footer";
import PageColor from "@/components/page/page-color";
import {
  APP_NAME,
  APP_ENG_NAME,
  APP_SLOGAN,
  APP_SITE_URL,
  APP_DESCRIPTION,
  APP_KEYWORDS,
} from "@/lib/constants";

const lineSeedKr = localFont({
  src: [
    {
      path: "../public/fonts/LINESeedKR-Th.woff2",
      weight: "250",
      style: "normal",
    },
    {
      path: "../public/fonts/LINESeedKR-Rg.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/LINESeedKR-Bd.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sans",
  display: "swap",
});

const nanumSquareNeo = localFont({
  src: "../public/fonts/nanum-square-neo.woff2",
  weight: "400",
  variable: "--font-nanum-square-neo",
  display: "swap",
});

const anyvid = localFont({
  src: "../public/fonts/anyvid.woff2",
  weight: "400",
  variable: "--font-anyvid",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const TITLE = `${APP_NAME} | ${APP_SLOGAN}`;

export const metadata: Metadata = {
  metadataBase: new URL(APP_SITE_URL),
  title: {
    default: TITLE,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  keywords: APP_KEYWORDS.split(", "),
  applicationName: APP_NAME,
  icons: {
    icon: [{ url: "/icons/favicon.svg", type: "image/svg+xml" }],
  },
  authors: [{ name: APP_ENG_NAME, url: APP_SITE_URL }],
  creator: APP_ENG_NAME,
  publisher: APP_ENG_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: APP_SITE_URL,
    siteName: APP_NAME,
    title: TITLE,
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: APP_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={cn(
        "h-full",
        "antialiased",
        lineSeedKr.variable,
        nanumSquareNeo.variable,
        anyvid.variable,
        geistMono.variable,
        "font-sans",
      )}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <div className="flex flex-1 flex-col">{children}</div>
        <PageColor />
        <Footer />
      </body>
    </html>
  );
}
