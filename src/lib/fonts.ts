import { Geist, Poppins } from 'next/font/google';

export const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});
