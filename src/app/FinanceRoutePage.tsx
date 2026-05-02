'use client';

import Link from 'next/link';
import { type ReactNode, useEffect } from 'react';
import { financeRoutes, getRouteById, getRouteIndex, type FinanceRouteId } from '@/lib/routes';
import { useFinance } from './FinanceProvider';
import styles from './FinanceRoutePage.module.css';

type FinanceRoutePageProps = {
  routeId: FinanceRouteId;
  customBody?: ReactNode;
};

export default function FinanceRoutePage({ routeId, customBody }: FinanceRoutePageProps) {
  const isWelcomeRoute = routeId === 'welcome';
  const route = getRouteById(routeId);
  const routeIndex = getRouteIndex(routeId);
  const prevRoute = routeIndex > 0 ? financeRoutes[routeIndex - 1] : null;
  const nextRoute = routeIndex < financeRoutes.length - 1 ? financeRoutes[routeIndex + 1] : null;
  const { setLastRoute } = useFinance();

  useEffect(() => {
    setLastRoute(routeId);
  }, [routeId]);

  const body =
    customBody !== undefined
      ? customBody
      : (() => {
          switch (routeId) {
            default:
              return (
                <>
                  <div className={styles.heroLabel}>Financial Analysis</div>
                  <h1 className={styles.heroTitle}>{route?.title ?? 'Page'}</h1>
                </>
              );
          }
        })();

  return (
    <div className={`${styles.shell} ${isWelcomeRoute ? styles.shellWelcome : ''}`}>
      {!isWelcomeRoute && (
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
                  className={`${styles.routeLink} ${
                    routeOption.id === routeId ? styles.routeLinkActive : ''
                  }`}
                >
                  {routeOption.shortLabel}
                </Link>
              ))}
            </nav>
          </div>
        </header>
      )}

      <main className={`${styles.main} ${isWelcomeRoute ? styles.mainWelcome : ''}`}>
        {body}

        <div className={styles.navRow}>
          <div className={styles.navGroup}>
            {prevRoute ? (
              <Link href={prevRoute.path} className={styles.navLink}>
                Back: {prevRoute.shortLabel}
              </Link>
            ) : (
              <span />
            )}
          </div>
          <div className={styles.navGroup}>
            {nextRoute ? (
              <Link href={nextRoute.path} className={`${styles.navLink} ${styles.navLinkPrimary}`}>
                Next: {nextRoute.shortLabel}
              </Link>
            ) : (
              <span className={styles.badge}>End of Journey</span>
            )}
          </div>
        </div>

        <div className={styles.mobileNavSpacer} aria-hidden="true" />
      </main>

      <div className={styles.mobileNav} aria-label="Mobile page navigation">
        {prevRoute ? (
          <Link href={prevRoute.path} className={`${styles.mobileNavLink} ${styles.mobileNavBack}`}>
            Back
          </Link>
        ) : (
          <span className={`${styles.mobileNavLink} ${styles.mobileNavMuted}`}>Start</span>
        )}

        <div className={styles.mobileNavStep}>
          {routeIndex + 1}/{financeRoutes.length}
        </div>

        {nextRoute ? (
          <Link href={nextRoute.path} className={`${styles.mobileNavLink} ${styles.mobileNavNext}`}>
            Next
          </Link>
        ) : (
          <span className={`${styles.mobileNavLink} ${styles.mobileNavMuted}`}>Done</span>
        )}
      </div>
    </div>
  );
}
