'use client';

import FinanceRoutePage from '@/app/finance-route-page';
import styles from './page.module.css';

export default function WelcomePage() {
  const highlights = [
    {
      title: 'Data-Driven',
      body: 'Insights that matter',
      icon: 'shield',
    },
    {
      title: 'Personalized',
      body: 'Tailored to your unique goals',
      icon: 'target',
    },
    {
      title: 'Actionable',
      body: 'Clear steps towards your future',
      icon: 'trend',
    },
  ];

  function renderHighlightIcon(icon: string) {
    if (icon === 'shield') {
      return (
        <svg viewBox="0 0 24 24" role="img" focusable="false" aria-hidden="true">
          <path d="M12 3l7 3v5c0 4.6-2.8 8.5-7 10-4.2-1.5-7-5.4-7-10V6l7-3Z" />
          <path d="M8.6 12.2l2.1 2.1 4.6-4.6" />
        </svg>
      );
    }

    if (icon === 'target') {
      return (
        <svg viewBox="0 0 24 24" role="img" focusable="false" aria-hidden="true">
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
          <path d="M16.4 7.6L20 4" />
          <path d="M20 4h-2.4" />
          <path d="M20 4v2.4" />
        </svg>
      );
    }

    return (
      <svg viewBox="0 0 24 24" role="img" focusable="false" aria-hidden="true">
        <path d="M4 19h16" />
        <path d="M7 16v-3" />
        <path d="M12 16V9" />
        <path d="M17 16v-5" />
        <path d="M6 9l4-4 3 3 5-5" />
        <path d="M18 3h-2.4" />
        <path d="M18 3v2.4" />
      </svg>
    );
  }

  return (
    <FinanceRoutePage
      routeId="welcome"
      customBody={
        <section className={styles.sessionShell}>
          <div className={styles.sessionGrid}>
            <section className={styles.leftPanel}>
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
                A structured, data-driven need analysis to understand exactly where you are, where
                you need to be, and what it takes to get there.
              </p>
            </section>

            <section className={styles.rightPanel}>
              <div className={styles.visualCard} aria-hidden="true">
                <div className={styles.clipboardArt}>
                  <div className={styles.clipboardTop} />
                  <div className={styles.clipboardBody}>
                    <div className={styles.chartPie} />
                    <div className={styles.chartBars}>
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                    <div className={styles.listLines}>
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.highlightRow}>
                {highlights.map((item) => (
                  <article key={item.title} className={styles.highlightItem}>
                    <div className={styles.highlightIcon} aria-hidden="true">
                      <span className={styles.highlightIconInner}>
                        {renderHighlightIcon(item.icon)}
                      </span>
                    </div>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </section>
      }
    />
  );
}
