import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { FinanceProvider } from "@/components/finance/FinanceProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Personal Financial Analysis",
  description: "Personal financial need analysis presentation and calculator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <FinanceProvider>{children}</FinanceProvider>
      </body>
    </html>
  );
}
