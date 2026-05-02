'use client';

import Link from 'next/link';
import type { FinanceRoute } from '@/lib/routes';
import styles from '../../FinanceRoutePage.module.css';

type FooterProps = {
  prevRoute: FinanceRoute | null;
  nextRoute: FinanceRoute | null;
  routeIndex: number;
  totalSteps: number;
};

export default function Footer({ prevRoute, nextRoute, routeIndex, totalSteps }: FooterProps) {
  return (
    <>
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

      <div className={styles.mobileNav} aria-label="Mobile page navigation">
        {prevRoute ? (
          <Link href={prevRoute.path} className={`${styles.mobileNavLink} ${styles.mobileNavBack}`}>
            Back
          </Link>
        ) : (
          <span className={`${styles.mobileNavLink} ${styles.mobileNavMuted}`}>Start</span>
        )}

        <div className={styles.mobileNavStep}>
          {routeIndex + 1}/{totalSteps}
        </div>

        {nextRoute ? (
          <Link href={nextRoute.path} className={`${styles.mobileNavLink} ${styles.mobileNavNext}`}>
            Next
          </Link>
        ) : (
          <span className={`${styles.mobileNavLink} ${styles.mobileNavMuted}`}>Done</span>
        )}
      </div>
    </>
  );
}
