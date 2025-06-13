import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Header from "@/components/Header";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MyWaifu",
  description: "There are national wives waiting for you to discover.",
  keywords: ["waifu", "anime", "hình ảnh anime", "ảnh đẹp", "tải ảnh waifu"],
  authors: [{ name: "hnamhocit" }],
  creator: "hnamhocit",
  publisher: "MyWaifu",
  robots: "index, follow",

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/site.webmanifest",

  openGraph: {
    title: "MyWaifu",
    description: "There are national wives waiting for you to discover.",
    url: "https://mywaifu.vercel.app",
    siteName: "MyWaifu",
    images: [
      {
        url: "https://mywaifu.vercel.app/logo.png",
        width: 1200,
        height: 630,
        alt: "MyWaifu Cover Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    title: "MyWaifu",
    description: "There are national wives waiting for you to discover.",
    card: "summary_large_image",
    site: "@hnamhocit",
    creator: "@hnamhocit",
    images: ["https://mywaifu.vercel.app/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <Header />

        <Toaster />

        <div className="p-4 overflow-x-hidden min-h-[calc(100vh-64px)]">
          {children}
        </div>
      </body>
    </html>
  );
}
