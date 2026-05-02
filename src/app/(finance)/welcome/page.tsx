'use client';

import { useMemo } from 'react';
import FinanceRoutePage from '@/app/FinanceRoutePage';
import styles from './page.module.css';

export default function WelcomePage() {
  const formattedSessionDate = useMemo(
    () =>
      new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }).format(new Date()),
    [],
  );

  return (
    <FinanceRoutePage
      routeId="welcome"
      customBody={
        <div className={styles.welcomeLayout}>
          <section className={styles.welcomePanel}>
            <div className={styles.heroLabel}>Financial Planning Session</div>
            <h1 className={styles.welcomeTitle}>
              Designing
              <br />
              Your Financial
              <br />
              <span>Future</span>
            </h1>
            <div className={styles.welcomeAccent} aria-hidden="true" />
            <p className={styles.welcomeBody}>
              A structured, data-driven need analysis to understand exactly where you are, where you
              need to be, and what it takes to get there.
            </p>
            <div className={styles.welcomeMetaRow}>
              <div className={`${styles.welcomeMetaCard} ${styles.welcomeMetaPrimary}`}>
                <div className={styles.welcomeMetaLabel}>Session Type</div>
                <div className={styles.welcomeMetaValue}>Personal Financial Analysis</div>
              </div>
              <div className={styles.welcomeMetaCard}>
                <div className={styles.welcomeMetaLabel}>Date</div>
                <div className={styles.welcomeMetaValue}>{formattedSessionDate}</div>
              </div>
            </div>
          </section>
          <div className={styles.welcomeCanvas} aria-hidden="true" />
        </div>
      }
    />
  );
}
