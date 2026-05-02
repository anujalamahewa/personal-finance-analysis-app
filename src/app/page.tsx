import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.shell}>
      <section className={styles.heroPanel}>
        <div className={styles.heroEyebrow}>Advisory Workspace</div>
        <h1 className={styles.heroTitle}>Plan smarter with a guided financial journey.</h1>
        <p className={styles.heroBody}>
          Navigate each life goal step-by-step and generate a complete gap report with actionable
          priorities.
        </p>
        <div className={styles.heroPills}>
          <span className={styles.heroPill}>iPad-ready workflow</span>
          <span className={styles.heroPill}>Guided calculations</span>
          <span className={styles.heroPill}>Advisor-style output</span>
        </div>
      </section>

      <section className={styles.loginCard}>
        <div className={styles.loginLabel}>Personal Financial Analysis</div>
        <h1 className={styles.loginTitle}>Sign in to begin</h1>
        <p className={styles.loginBody}>
          Continue with Google to access your planning session. Authentication will be wired in the
          next step.
        </p>

        <Link href="/welcome" className={styles.googleButton}>
          <span className={styles.googleGlyph} aria-hidden="true">
            G
          </span>
          Continue with Google
        </Link>
      </section>
    </main>
  );
}
