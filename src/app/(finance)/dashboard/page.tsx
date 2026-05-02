import Link from 'next/link';
import { RevealSection } from '@/app/common/animations/animations';
import Card from '@/app/common/card/card';
import SinglePageTitle from '@/app/common/single-page-title/single-page-title';
import Header from '@/app/common/header/header';
import Footer from '@/app/common/footer/footer';
import styles from './page.module.css';

export default function DashboardPage() {
  return (
    <div className={styles.pageShell}>
      <Header showRouteMenu={false} showThemeToggle showClearStorageButton />

      <main className={styles.shell}>
        <section className={styles.panel}>
          <SinglePageTitle
            label="Dashboard"
            title="Choose Your Workspace"
            description="Select how you want to proceed:"
          />

          <RevealSection className={styles.cardGrid}>
            <div className={`${styles.cardDisabled} ${styles.cardStatic}`} aria-disabled="true">
              <Card
                phase="Admin"
                title="Admin Panel"
                description="Manage users, data, and system settings."
                icon="⚙️"
                className={styles.dashboardCard}
                delay={0}
              />
            </div>

            <Link href="/welcome" className={styles.cardLink}>
              <Card
                phase="Main"
                title="Personal Finance Analysis"
                description="Run client assessments and generate reports."
                icon="📊"
                className={styles.dashboardCard}
                delay={0.06}
              />
            </Link>

            <div className={`${styles.cardDisabled} ${styles.cardStatic}`} aria-disabled="true">
              <Card
                phase="Customer"
                title="Customer Portal"
                description="View client profiles, progress, and ongoing plans."
                icon="👥"
                className={styles.dashboardCard}
                delay={0.12}
              />
            </div>
          </RevealSection>
        </section>
      </main>

      <Footer
        prevRoute={null}
        nextRoute={null}
        routeIndex={0}
        totalSteps={0}
        showControls={false}
      />
    </div>
  );
}
