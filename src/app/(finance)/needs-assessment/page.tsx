import Link from 'next/link';
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
            <article className={`${styles.discussionPhaseCard} ${styles.discussionPhaseNeed}`}>
              <div className={styles.discussionPhaseTag}>Phase 01</div>
              <h2 className={styles.discussionPhaseTitle}>Need Identification</h2>
              <p className={styles.discussionPhaseBody}>
                We explore each of the 4 major financial needs, building the full picture of what
                you require with real numbers.
              </p>
            </article>

            <article className={`${styles.discussionPhaseCard} ${styles.discussionPhaseGap}`}>
              <div className={styles.discussionPhaseTag}>Phase 02</div>
              <h2 className={styles.discussionPhaseTitle}>Gap Evaluation</h2>
              <p className={styles.discussionPhaseBody}>
                We compare what you currently have against what you need. The difference is your
                financial vulnerability.
              </p>
            </article>

            <article className={`${styles.discussionPhaseCard} ${styles.discussionPhaseSolution}`}>
              <div className={styles.discussionPhaseTag}>Phase 03</div>
              <h2 className={styles.discussionPhaseTitle}>Solution Presentation</h2>
              <p className={styles.discussionPhaseBody}>
                A tailored strategy to close the gaps, delivered as a written report you leave with
                today.
              </p>
            </article>
          </div>

          <Link href={dreamsPath} className={styles.discussionBeginLink}>
            Let&apos;s begin with your profile.
          </Link>
        </>
      }
    />
  );
}
