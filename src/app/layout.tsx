import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Providers } from "@/components/Providers";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Beauty-Store — Nail Polish (Test)",
  description:
    "Test build — animated nail polish storefront with quickview, cart, and wishlist.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} h-full`}>
      <body className="min-h-full bg-[#fafafa] font-sans text-[#111] antialiased">
        <Providers>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
