"use client";

import FinanceRoutePage from "@/components/finance/FinanceRoutePage";
import styles from "./page.module.css";

export default function RisksPage() {
  const risks = [
    {
      title: "Death",
      icon: "💀",
      body: "Income stops immediately and your family relies on what is already planned.",
      scale:
        "Monthly income multiplied by years to retirement estimates the protection your family needs.",
    },
    {
      title: "Disease",
      icon: "🦠",
      body: "Critical illness can remove earning capacity while treatment costs rise.",
      scale:
        "Treatment costs plus at least 12-24 months of income replacement gives a realistic cover target.",
    },
    {
      title: "Disability",
      icon: "♿",
      body: "Permanent disability can wipe out future earnings while expenses continue.",
      scale: "Monthly income multiplied by years to retirement equals your true financial worth.",
    },
  ];

  return (
    <FinanceRoutePage
      routeId="risks"
      customBody={
        <section className={styles.riskLayout}>
          <div className={styles.riskLabel}>Key Risk Events</div>
          <h1 className={styles.riskTitle}>Three Events That Break Plans</h1>

          <div className={styles.riskGrid}>
            {risks.map((risk) => (
              <article key={risk.title} className={styles.riskCard}>
                <div className={styles.riskIcon} aria-hidden="true">
                  {risk.icon}
                </div>
                <h2 className={styles.riskCardTitle}>{risk.title}</h2>
                <p className={styles.riskCardBody}>{risk.body}</p>

                <hr className={styles.riskDivider} />

                <div className={styles.riskScaleLabel}>The Scale</div>
                <p className={styles.riskScaleBody}>{risk.scale}</p>
              </article>
            ))}
          </div>

          <div className={styles.riskHint}>
            Start with the highest-impact risk first, then build a complete protection plan.
          </div>
          <div className={styles.riskActions}>
            <div className={styles.riskStepPill}>3 risk cards</div>
            <div className={styles.riskStepPill}>Prioritize by impact</div>
          </div>
        </section>
      }
    />
  );
}