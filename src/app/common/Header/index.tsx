'use client';

import Link from 'next/link';
import { financeRoutes, type FinanceRouteId } from '@/lib/routes';
import styles from '../../FinanceRoutePage.module.css';

type HeaderProps = {
  routeId: FinanceRouteId;
  routeIndex: number;
};

export default function Header({ routeId, routeIndex }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.titleRow}>
          <div className={styles.appTitle}>Personal Financial Analysis</div>
          <div className={styles.progress}>
            Step {routeIndex + 1} / {financeRoutes.length}
          </div>
        </div>
        <nav className={styles.routeMenu}>
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
