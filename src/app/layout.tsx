import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import { FinanceProvider } from "@/lib/finance/ui/FinanceProvider";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

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
  icons: {
    icon: "/aia.svg",
    shortcut: "/aia.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <FinanceProvider>{children}</FinanceProvider>
      </body>
    </html>
  );
}
