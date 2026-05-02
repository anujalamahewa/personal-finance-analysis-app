import type { Metadata } from 'next';
import { geistSans, poppins } from '../lib/fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Personal Financial Analysis',
  description: 'Personal financial need analysis presentation and calculator',
  icons: {
    icon: '/aia.svg',
    shortcut: '/aia.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${geistSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
