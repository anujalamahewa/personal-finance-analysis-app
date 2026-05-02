import Card from '@/app/common/card/card';
import { RevealSection } from '@/app/common/animations/animations';
import SinglePageTitle from '@/app/common/single-page-title/single-page-title';
import FinanceRoutePage from '@/app/finance-route-page';
import styles from './page.module.css';

export default function OverviewPage() {
  return (
    <FinanceRoutePage
      routeId="overview"
      customBody={
        <>
          <SinglePageTitle
            label="How This Is Structured"
            title="Overview"
            description="We identify the right priorities by mapping each need, measuring your current position, and defining the exact gaps to close."
          />

          <RevealSection className={styles.discussionPhaseGrid}>
            <Card
              phase="Phase 01"
              title="Understand Your Situation"
              description="Capture your personal details, financial position, and life goals to build a complete view of your current situation."
              icon="👤"
              delay={0}
            />

            <Card
              phase="Phase 02"
              title="Identify Risks & Gaps"
              description="Evaluate key financial risks and calculate the gaps between your current position and what is needed to stay protected."
              icon="⚠️"
              delay={0.06}
            />

            <Card
              phase="Phase 03"
              title="Build Your Plan"
              description="Prioritize your needs and generate a structured financial plan with clear actions and recommended coverage."
              icon="🧭"
              delay={0.12}
            />
          </RevealSection>
        </>
      }
    />
  );
}
