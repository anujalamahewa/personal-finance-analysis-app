'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import type { FinanceRoute } from '@/lib/routes';
import styles from '../../finance-route-page.module.css';

type FooterProps = {
  prevRoute: FinanceRoute | null;
  nextRoute: FinanceRoute | null;
  routeIndex: number;
  totalSteps: number;
};

export default function Footer({ prevRoute, nextRoute, routeIndex, totalSteps }: FooterProps) {
  const reducedMotion = useReducedMotion();

  return (
    <>
      <div className={styles.navRow}>
        <div className={styles.navGroup}>
          {prevRoute ? (
            <motion.div
              whileHover={reducedMotion ? undefined : { scale: 1.02 }}
              whileTap={reducedMotion ? undefined : { scale: 0.98 }}
            >
              <Link href={prevRoute.path} className={styles.navLink}>
                Back: {prevRoute.shortLabel}
              </Link>
            </motion.div>
          ) : (
            <span />
          )}
        </div>
        <div className={styles.navGroup}>
          {nextRoute ? (
            <motion.div
              whileHover={reducedMotion ? undefined : { scale: 1.02 }}
              whileTap={reducedMotion ? undefined : { scale: 0.98 }}
            >
              <Link href={nextRoute.path} className={`${styles.navLink} ${styles.navLinkPrimary}`}>
                Next: {nextRoute.shortLabel}
              </Link>
            </motion.div>
          ) : (
            <span className={styles.badge}>End of Journey</span>
          )}
        </div>
      </div>

      <div className={styles.mobileNavSpacer} aria-hidden="true" />

      <div className={styles.mobileNav} aria-label="Mobile page navigation">
        {prevRoute ? (
          <motion.div
            whileHover={reducedMotion ? undefined : { scale: 1.02 }}
            whileTap={reducedMotion ? undefined : { scale: 0.98 }}
          >
            <Link
              href={prevRoute.path}
              className={`${styles.mobileNavLink} ${styles.mobileNavBack}`}
            >
              Back
            </Link>
          </motion.div>
        ) : (
          <span className={`${styles.mobileNavLink} ${styles.mobileNavMuted}`}>Start</span>
        )}

        <div className={styles.mobileNavStep}>
          {routeIndex + 1}/{totalSteps}
        </div>

        {nextRoute ? (
          <motion.div
            whileHover={reducedMotion ? undefined : { scale: 1.02 }}
            whileTap={reducedMotion ? undefined : { scale: 0.98 }}
          >
            <Link
              href={nextRoute.path}
              className={`${styles.mobileNavLink} ${styles.mobileNavNext}`}
            >
              Next
            </Link>
          </motion.div>
        ) : (
          <span className={`${styles.mobileNavLink} ${styles.mobileNavMuted}`}>Done</span>
        )}
      </div>
    </>
  );
}
