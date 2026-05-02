'use client';

import Link from 'next/link';
import Card from '@/app/common/card/card';
import FinanceRoutePage from '@/app/finance-route-page';
import SinglePageTitle from '@/app/common/single-page-title/single-page-title';
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
    title: 'Medical Emergency Fund',
    body: 'Covering healthcare costs without destroying your savings',
    phase: 'Need 03',
  },
] as const;

export default function NeedsPage() {
  const retirementPath = getRouteById('retirement')?.path ?? '/retirement';

  return (
    <FinanceRoutePage
      routeId="needs"
      customBody={
        <section className={styles.needsLayout}>
          <SinglePageTitle
            label="Before We Calculate"
            title="Understanding the 3 Major Life Needs"
            description="Before we look at numbers, it's important to understand the three financial pillars that every complete financial plan must address."
          />

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
