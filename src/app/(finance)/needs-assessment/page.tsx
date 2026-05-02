import Card from '@/app/common/Card';
import Banner from '@/app/common/Banner';
import FinanceRoutePage from '@/app/FinanceRoutePage';
import { getRouteById } from '@/lib/routes';
import styles from './page.module.css';

export default function NeedsAssessmentPage() {
  const dreamsPath = getRouteById('dreams')?.path ?? '/dreams';

  return (
    <FinanceRoutePage
      routeId="needs-assessment"
      customBody={
        <>
          <div className={styles.heroLabel}>How This Is Structured</div>
          <h1 className={styles.heroTitle}>Needs Assessment</h1>

          <div className={styles.discussionPhaseGrid}>
            <Card
              phase="Phase 01"
              title="Need Identification"
              description="We explore each of the 4 major financial needs, building the full picture of what you require with real numbers."
              icon="🔎"
            />

            <Card
              phase="Phase 02"
              title="Gap Evaluation"
              description="We compare what you currently have against what you need. The difference is your financial vulnerability."
              icon="📊"
            />

            <Card
              phase="Phase 03"
              title="Solution Presentation"
              description="A tailored strategy to close the gaps, delivered as a written report you leave with today."
              icon="🧾"
            />
          </div>

          <Banner href={dreamsPath} label="Let's begin with your profile." />
        </>
      }
    />
  );
}
