'use client';

import Card from '@/app/common/card/card';
import { RevealSection } from '@/app/common/animations/animations';
import FinanceRoutePage from '@/app/finance-route-page';
import SinglePageTitle from '@/app/common/single-page-title/single-page-title';
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
          <SinglePageTitle
            label="Key Risk Events"
            title="Three Events That Break Plans"
            description="Prioritize by impact and build protection where a single event could stop income the fastest."
          />

          <RevealSection className={styles.riskGrid}>
            {risks.map((risk, index) => (
              <Card
                key={risk.title}
                phase={`Risk 0${index + 1}`}
                title={risk.title}
                description={risk.body}
                icon={risk.icon}
                delay={index * 0.06}
              />
            ))}
          </RevealSection>
        </section>
      }
    />
  );
}
