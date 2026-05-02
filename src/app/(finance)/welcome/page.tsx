'use client';

import { useMemo } from 'react';
import FinanceRoutePage from '@/app/finance-route-page';
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

  const phases = [
    {
      number: '01',
      title: 'Need Identification',
      body: 'We explore each of the 4 major financial needs and build the full picture of your current situation.',
      icon: 'Q',
      tone: styles.phaseSearch,
    },
    {
      number: '02',
      title: 'Gap Evaluation',
      body: 'We compare what you currently have against what you need. The difference is your financial vulnerability.',
      icon: 'B',
      tone: styles.phaseGap,
    },
    {
      number: '03',
      title: 'Solution Presentation',
      body: 'A tailored strategy to close the gaps, delivered as a written report you leave with today.',
      icon: 'R',
      tone: styles.phaseSolution,
    },
  ];

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

          <section className={styles.expectationPanel}>
            <div className={styles.expectationHeaderLabel}>What to Expect</div>
            <p className={styles.expectationHeaderBody}>
              We&apos;ll follow a proven 3-phase process to understand your financial needs and
              create a clear path forward.
            </p>

            <div className={styles.phaseList}>
              {phases.map((phase) => (
                <article key={phase.number} className={styles.phaseRow}>
                  <div className={`${styles.phaseIcon} ${phase.tone}`} aria-hidden="true">
                    {phase.icon}
                  </div>
                  <div className={styles.phaseContent}>
                    <div className={styles.phaseNumber}>{phase.number}</div>
                    <h3 className={styles.phaseTitle}>{phase.title}</h3>
                    <p className={styles.phaseBody}>{phase.body}</p>
                  </div>
                </article>
              ))}
            </div>

            <aside className={styles.securityBanner}>
              <div>
                <div className={styles.securityTitle}>Your information is secure</div>
                <p className={styles.securityBody}>
                  All data shared during this session is confidential and used only for your
                  financial analysis.
                </p>
              </div>
            </aside>
          </section>
        </div>
      }
    />
  );
}
