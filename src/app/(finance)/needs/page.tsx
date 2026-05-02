'use client';

import Link from 'next/link';
import Card from '@/app/common/card/card';
import FinanceRoutePage from '@/app/finance-route-page';
import { getRouteById } from '@/lib/routes';
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
    title: 'Medical Emergency Funds',
    body: 'Covering healthcare costs without destroying your savings',
    phase: 'Need 03',
  },
] as const;

export default function NeedsPage() {
  const retirementPath = getRouteById('retirement')?.path ?? '/retirement-calculator';

  return (
    <FinanceRoutePage
      routeId="needs"
      customBody={
        <section className={styles.needsLayout}>
          <div className={styles.needsLabel}>Before We Calculate</div>
          <h1 className={styles.needsTitle}>Understanding the 3 Major Life Needs</h1>
          <p className={styles.needsIntro}>
            Before we look at numbers, it&apos;s important to understand the three financial pillars
            that every complete financial plan must address.
          </p>

          <div className={styles.needsGrid}>
            {needCards.map((card) => (
              <Card
                key={card.title}
                phase={card.phase}
                title={card.title}
                description={card.body}
                icon={card.icon}
              />
            ))}
          </div>

          <Link href={retirementPath} className={styles.needsBanner}>
            Next: Build your retirement need
          </Link>
        </section>
      }
    />
  );
}
