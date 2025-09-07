import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MotionProvider } from "@/components/providers/MotionProvider";
import CookieBanner from "@/components/legal/CookieBanner";

export const metadata: Metadata = {
  title: "VINCERA Blog",
  description: "Ambitious interviews and insights.",
  openGraph: {
    title: "VINCERA Blog",
    description: "Ambitious interviews and insights.",
    url: "https://blog.vncra.com",
    siteName: "VINCERA Blog",
    images: [
      {
        url: "https://blog.vncra.com/og-default.jpg", // fallback image
        width: 1200,
        height: 630,
        alt: "VINCERA Blog",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VINCERA Blog",
    description: "Ambitious interviews and insights.",
    images: ["https://blog.vncra.com/og-default.jpg"], // zelfde fallback
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <MotionProvider>
          <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </MotionProvider>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
