'use client';

import Card from '@/app/common/card/card';
import { RevealSection } from '@/app/common/animations/animations';
import FinanceRoutePage from '@/app/finance-route-page';
import SinglePageTitle from '@/app/common/single-page-title/single-page-title';
import styles from './page.module.css';

const needCards = [
  {
    icon: '🏖️',
    title: 'Happy Retirement',
    body: 'Having enough to live comfortably after you stop working',
    phase: 'Need 01',
  },
  {
    icon: '👨‍👩‍👧',
    title: 'Family Income Protection',
    body: "Protecting your family's lifestyle if you can no longer provide",
    phase: 'Need 02',
  },
  {
    icon: '🏥',
    title: 'Medical Emergency Fund',
    body: 'Covering healthcare costs without destroying your savings',
    phase: 'Need 03',
  },
] as const;

export default function NeedsPage() {
  return (
    <FinanceRoutePage
      routeId="needs"
      customBody={
        <section className={styles.needsLayout}>
          <SinglePageTitle
            label="Before We Calculate"
            title="Understanding the 3 Major Life Needs"
            description="Before we look at numbers, it's important to understand the three financial pillars that every financial plan must address."
          />

          <RevealSection className={styles.needsGrid}>
            {needCards.map((card, index) => (
              <Card
                key={card.title}
                phase={card.phase}
                title={card.title}
                description={card.body}
                icon={card.icon}
                delay={index * 0.06}
              />
            ))}
          </RevealSection>
        </section>
      }
    />
  );
}
