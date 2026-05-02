import Card from '@/app/common/card/card';
import FinanceRoutePage from '@/app/finance-route-page';
import styles from './page.module.css';

export default function OverviewPage() {
  return (
    <FinanceRoutePage
      routeId="overview"
      customBody={
        <>
          <div className={styles.heroLabel}>How This Is Structured</div>
          <h1 className={styles.heroTitle}>Overview</h1>
          <div className={styles.heroAccent} aria-hidden="true" />
          <p className={styles.heroBody}>
            We identify the right priorities by mapping each need, measuring your current position,
            and defining the exact gaps to close.
          </p>

          <div className={styles.discussionPhaseGrid}>
            <Card
              phase="Phase 01"
              title="Understand Your Situation"
              description="Capture your personal details, financial position, and life goals to build a complete view of your current situation."
              icon="👤"
            />

            <Card
              phase="Phase 02"
              title="Identify Risks & Gaps"
              description="Evaluate key financial risks and calculate the gaps between your current position and what is needed to stay protected."
              icon="⚠️"
            />

            <Card
              phase="Phase 03"
              title="Build Your Plan"
              description="Prioritize your needs and generate a structured financial plan with clear actions and recommended coverage."
              icon="🧭"
            />
          </div>
        </>
      }
    />
  );
}
