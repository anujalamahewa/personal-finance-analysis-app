'use client';

import Card from '@/app/common/Card';
import FinanceRoutePage from '@/app/FinanceRoutePage';
import styles from './page.module.css';

export default function RisksPage() {
  const risks = [
    {
      title: 'Death',
      icon: '💀',
      body: 'Income stops immediately and your family relies on what is already planned.',
    },
    {
      title: 'Disease',
      icon: '🦠',
      body: 'Critical illness can remove earning capacity while treatment costs rise.',
    },
    {
      title: 'Disability',
      icon: '♿',
      body: 'Permanent disability can wipe out future earnings while expenses continue.',
    },
  ];

  return (
    <FinanceRoutePage
      routeId="risks"
      customBody={
        <section className={styles.riskLayout}>
          <div className={styles.riskLabel}>Key Risk Events</div>
          <h1 className={styles.riskTitle}>Three Events That Break Plans</h1>
          <p className={styles.riskDescription}>
            Prioritize by impact and build protection where a single event could stop income the
            fastest.
          </p>

          <div className={styles.riskGrid}>
            {risks.map((risk, index) => (
              <Card
                key={risk.title}
                phase={`Risk 0${index + 1}`}
                title={risk.title}
                description={risk.body}
                icon={risk.icon}
              />
            ))}
          </div>
        </section>
      }
    />
  );
}
