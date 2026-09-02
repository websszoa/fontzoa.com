import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import {
  APP_DESCRIPTION,
  APP_KEYWORDS,
  APP_NAME,
  APP_SITE_URL,
  APP_SLOGAN,
} from "@/lib/constants";

import "./globals.css";
import "./fonts.css";

import Header from "@/components/page/page-header";
import CustomCursor from "@/components/common/custom-cursor";
import Footer from "@/components/page/page-footer";

const lineSeed = localFont({
  src: [
    {
      path: "../public/fonts/LINESeedKR-Th.woff2",
      weight: "300",
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
  variable: "--font-line-seed",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

const anyvid = localFont({
  src: "../public/fonts/anyvid.woff2",
  variable: "--font-anyvid",
  display: "swap",
});

const nanumSquareNeo = localFont({
  src: "../public/fonts/nanum-square-neo.woff2",
  variable: "--font-nanum-square-neo",
  weight: "400",
  style: "normal",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(APP_SITE_URL),
  title: {
    default: `${APP_NAME} — ${APP_SLOGAN}`,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  keywords: APP_KEYWORDS.split(", "),
  applicationName: APP_NAME,
  authors: [{ name: "webstoryboy", url: "https://github.com/webstoryboy" }],
  creator: "webstoryboy",
  publisher: APP_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: APP_SITE_URL,
    siteName: APP_NAME,
    title: `${APP_NAME} — ${APP_SLOGAN}`,
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${APP_NAME} — ${APP_SLOGAN}`,
    description: APP_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/icons/favicon.svg",
    apple: "/icons/icon192.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${lineSeed.variable} ${anyvid.variable} ${nanumSquareNeo.variable}`}
    >
      <body>
        <CustomCursor />
        <Header />
        <main>{children}</main>
        <Footer />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1FWDDZBYEE"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1FWDDZBYEE');
          `}
        </Script>
      </body>
    </html>
  );
}
