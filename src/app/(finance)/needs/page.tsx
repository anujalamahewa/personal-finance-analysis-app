'use client';

import FinanceRoutePage from '@/app/FinanceRoutePage';
import styles from './page.module.css';

const needCards = [
  {
    icon: '💰',
    title: 'Happy Retirement',
    body: 'Having enough to live comfortably after you stop working',
    tone: 'retirement',
  },
  {
    icon: '👨‍👩‍👧',
    title: 'Family Income Protection',
    body: "Protecting your family's lifestyle if you can no longer provide",
    tone: 'family',
  },
  {
    icon: '🎓',
    title: 'Higher Education Funds',
    body: "Ensuring your children's education is funded regardless of what happens",
    tone: 'education',
  },
  {
    icon: '🏥',
    title: 'Medical Emergency Funds',
    body: 'Covering healthcare costs without destroying your savings',
    tone: 'medical',
  },
] as const;

const toneClassByKey = {
  retirement: styles.toneRetirement,
  family: styles.toneFamily,
  education: styles.toneEducation,
  medical: styles.toneMedical,
} as const;

export default function NeedsPage() {
  return (
    <FinanceRoutePage
      routeId="needs"
      customBody={
        <section className={styles.needsLayout}>
          <div className={styles.needsLabel}>Before We Calculate</div>
          <h1 className={styles.needsTitle}>
            <span>Understanding the</span>
            <span className={styles.needsTitleAccent}>4 Major Life Risks</span>
          </h1>
          <div className={styles.needsTitleUnderline} aria-hidden="true" />
          <p className={styles.needsIntro}>
            Before we look at numbers, it&apos;s important to understand the four financial pillars
            that every complete financial plan must address.
          </p>

          <div className={styles.needsGrid}>
            {needCards.map((card) => (
              <article
                key={card.title}
                className={`${styles.needCard} ${toneClassByKey[card.tone]}`}
              >
                <div className={styles.needIcon} aria-hidden="true">
                  {card.icon}
                </div>
                <h2 className={styles.needTitle}>{card.title}</h2>
                <p className={styles.needBody}>{card.body}</p>
              </article>
            ))}
          </div>

          <div className={styles.needsCallout}>
            We will now calculate your exact position for each of these four needs.
          </div>
        </section>
      }
    />
  );
}
