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
  showControls?: boolean;
};

export default function Footer({
  prevRoute,
  nextRoute,
  routeIndex,
  totalSteps,
  showControls = true,
}: FooterProps) {
  const reducedMotion = useReducedMotion();

  if (!showControls) {
    return (
      <>
        <div className={styles.navRow} aria-hidden="true">
          <div className={styles.navGroup}>
            <span />
          </div>
          <div className={styles.navGroup}>
            <span />
          </div>
        </div>

        <div className={styles.mobileNavSpacer} aria-hidden="true" />

        <div className={styles.mobileNav} aria-hidden="true" />
      </>
    );
  }

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
            <motion.div
              whileHover={reducedMotion ? undefined : { scale: 1.02 }}
              whileTap={reducedMotion ? undefined : { scale: 0.98 }}
            >
              <Link href="/dashboard" className={`${styles.navLink} ${styles.navLinkPrimary}`}>
                End of Journey
              </Link>
            </motion.div>
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
          <motion.div
            whileHover={reducedMotion ? undefined : { scale: 1.02 }}
            whileTap={reducedMotion ? undefined : { scale: 0.98 }}
          >
            <Link href="/dashboard" className={`${styles.mobileNavLink} ${styles.mobileNavNext}`}>
              Done
            </Link>
          </motion.div>
        )}
      </div>
    </>
  );
}
