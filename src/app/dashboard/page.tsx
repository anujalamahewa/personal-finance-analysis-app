import Link from 'next/link';
import Card from '@/app/common/card/card';
import styles from './page.module.css';

export default function DashboardPage() {
  return (
    <main className={styles.shell}>
      <section className={styles.panel}>
        <div className={styles.eyebrow}>Dashboard</div>
        <h1 className={styles.title}>Choose Your Workspace</h1>
        <p className={styles.body}>Select how you want to proceed:</p>

        <div className={styles.cardGrid}>
          <div className={`${styles.cardDisabled} ${styles.cardStatic}`} aria-disabled="true">
            <Card
              phase="Admin"
              title="Admin Panel"
              description="Manage users, data, and system settings."
              icon="⚙️"
              className={styles.dashboardCard}
            />
          </div>

          <Link href="/welcome" className={styles.cardLink}>
            <Card
              phase="Main"
              title="Personal Finance Analysis"
              description="Run client assessments and generate reports."
              icon="📊"
              className={styles.dashboardCard}
            />
          </Link>

          <div className={`${styles.cardDisabled} ${styles.cardStatic}`} aria-disabled="true">
            <Card
              phase="Customer"
              title="Customer Portal"
              description="View client profiles, progress, and ongoing plans."
              icon="👥"
              className={styles.dashboardCard}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
