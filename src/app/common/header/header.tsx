'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { financeRoutes, type FinanceRouteId } from '@/lib/routes';
import styles from '../../finance-route-page.module.css';

type HeaderProps = {
  routeId: FinanceRouteId;
};

export default function Header({ routeId }: HeaderProps) {
  const pathname = usePathname();
  const isHomeActive = pathname === '/' || pathname === '/dashboard';

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <nav className={styles.routeMenu}>
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

          {financeRoutes.map((routeOption) => (
            <Link
              key={routeOption.id}
              href={routeOption.path}
              className={`${styles.routeLink} ${routeOption.id === routeId ? styles.routeLinkActive : ''}`}
            >
              {routeOption.shortLabel}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
