import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.shell}>
      <section className={styles.heroPanel}>
        <div className={styles.heroEyebrow}>ADVISORY WORKSPACE</div>
        <h1 className={styles.heroTitle}>Plan smarter with a guided financial journey.</h1>
        <p className={styles.heroBody}>
          Capture client needs, assess protection gaps, and generate structured financial reports --
          all in one place. Built for advisors to manage relationships and for clients to track
          their financial progress.
        </p>
      </section>

      <section className={styles.loginCard}>
        <div className={styles.loginLabel}>PERSONAL FINANCIAL ANALYSIS</div>
        <h1 className={styles.loginTitle}>Sign in to start your session</h1>
        <p className={styles.loginBody}>
          Access your client workspace to run assessments, manage profiles, and generate reports.
          Your data is securely stored for ongoing advisory and relationship management.
        </p>

        <Link href="/dashboard" className={styles.googleButton}>
          <span className={styles.googleGlyph} aria-hidden="true">
            G
          </span>
          Continue to Dashboard
        </Link>
      </section>
    </main>
  );
}
