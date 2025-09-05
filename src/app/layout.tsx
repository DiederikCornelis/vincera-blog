import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MotionProvider } from "@/components/providers/MotionProvider";
import CookieBanner from "@/components/legal/CookieBanner";

export const metadata: Metadata = {
  title: "VINCERA Blog",
  description: "Ambitious interviews and insights.",
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
