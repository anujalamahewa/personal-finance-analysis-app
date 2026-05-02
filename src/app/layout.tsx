import type { Metadata } from 'next';
import { poppins } from '../lib/fonts';
import OrientationLock from './orientation-lock';
import { ThemeProvider } from './theme-provider';
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
    <html lang="en" className={poppins.variable}>
      <body>
        <ThemeProvider>
          <OrientationLock />
          <div className="app-landscape-root">{children}</div>
          <div className="portrait-lock-screen" role="alert" aria-live="assertive">
            <div className="portrait-lock-card">
              <h2>Landscape Mode Required</h2>
              <p>Rotate your device to landscape to continue using this app.</p>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
