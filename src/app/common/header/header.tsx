'use client';

import Link from 'next/link';
import { useTheme } from '@/app/theme-provider';
import { usePathname } from 'next/navigation';
import { financeRoutes, type FinanceRouteId } from '@/lib/routes';
import styles from '../../finance-route-page.module.css';

type HeaderProps = {
  routeId: FinanceRouteId;
};

export default function Header({ routeId }: HeaderProps) {
  const pathname = usePathname();
  const { isDarkMode, toggleTheme } = useTheme();
  const isHomeActive = pathname === '/' || pathname === '/dashboard';

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.headerControls}>
          <nav className={styles.routeMenu}>
            <div>
              <Link
                href="/dashboard"
                aria-label="Home"
                className={`${styles.routeLink} ${styles.routeLinkHome} ${isHomeActive ? styles.routeLinkActive : ''}`}
              >
                <span className={styles.homeIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" focusable="false" role="img">
                    <path d="M12.72 3.37a1 1 0 0 0-1.44 0L2.96 12.1A1 1 0 0 0 3.68 13.8H5v6.2c0 .55.45 1 1 1h4.3a1 1 0 0 0 1-1v-4.4h1.4V20c0 .55.45 1 1 1H18c.55 0 1-.45 1-1v-6.2h1.32a1 1 0 0 0 .72-1.7l-8.32-8.73Z" />
                  </svg>
                </span>
              </Link>
            </div>

            {financeRoutes.map((routeOption) => (
              <div key={routeOption.id}>
                <Link
                  href={routeOption.path}
                  className={`${styles.routeLink} ${routeOption.id === routeId ? styles.routeLinkActive : ''}`}
                >
                  {routeOption.shortLabel}
                </Link>
              </div>
            ))}
          </nav>

          <button
            type="button"
            className={styles.themeToggle}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-pressed={isDarkMode}
            onClick={toggleTheme}
          >
            <span className={styles.themeIcon} aria-hidden="true">
              {isDarkMode ? (
                <svg viewBox="0 0 24 24" focusable="false" role="img">
                  <path d="M12 5.4a1 1 0 0 0 1-1V2.8a1 1 0 1 0-2 0v1.6a1 1 0 0 0 1 1Zm0 13.2a1 1 0 0 0-1 1v1.6a1 1 0 1 0 2 0V19.6a1 1 0 0 0-1-1Zm6.6-5.6a1 1 0 0 0 0-2h-1.6a1 1 0 1 0 0 2h1.6Zm-11.6-1a1 1 0 0 0-1-1H4.4a1 1 0 1 0 0 2H6a1 1 0 0 0 1-1Zm8.36-4.78a1 1 0 0 0 1.42 0l1.12-1.12a1 1 0 0 0-1.42-1.42l-1.12 1.12a1 1 0 0 0 0 1.42Zm-8.48 8.48a1 1 0 0 0 1.42 0l1.12-1.12a1 1 0 0 0-1.42-1.42L6.88 14.3a1 1 0 0 0 0 1.42Zm9.9 1.12a1 1 0 1 0 1.42-1.42l-1.12-1.12a1 1 0 1 0-1.42 1.42l1.12 1.12Zm-8.48-8.48a1 1 0 0 0 0-1.42L7.18 4.74a1 1 0 1 0-1.42 1.42l1.12 1.12a1 1 0 0 0 1.42 0ZM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" focusable="false" role="img">
                  <path d="M14.53 3.56A1 1 0 0 0 13.2 4.9a7.4 7.4 0 1 1-9.3 9.3 1 1 0 0 0-1.34 1.33 9.4 9.4 0 1 0 11.97-11.97Z" />
                </svg>
              )}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
