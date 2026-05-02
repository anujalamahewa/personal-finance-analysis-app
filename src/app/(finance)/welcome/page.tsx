import Card from '@/app/common/card/card';
import { RevealSection } from '@/app/common/animations/animations';
import FinanceRoutePage from '@/app/finance-route-page';
import SinglePageTitle from '@/app/common/single-page-title/single-page-title';
import styles from './page.module.css';

export default function WelcomePage() {
  return (
    <FinanceRoutePage
      routeId="welcome"
      customBody={
        <section className={styles.welcomeLayout}>
          <SinglePageTitle
            label="Financial Planning Session"
            title={
              <>
                Designing
                <br />
                Your Financial
                <br />
                Future
              </>
            }
            descriptionClassName={styles.welcomeDescription}
            description="A structured, data-driven need analysis to understand exactly where you are, where you need to be, and what it takes to get there."
          />

          <RevealSection className={styles.highlightGrid}>
            <Card
              phase="Point 01"
              title="Data-Driven"
              description="Insights that matter"
              icon="🛡️"
              delay={0}
            />
            <Card
              phase="Point 02"
              title="Personalized"
              description="Tailored to your unique goals"
              icon="🎯"
              delay={0.06}
            />
            <Card
              phase="Point 03"
              title="Actionable"
              description="Clear steps towards your future"
              icon="📈"
              delay={0.12}
            />
          </RevealSection>
        </section>
      }
    />
  );
}
