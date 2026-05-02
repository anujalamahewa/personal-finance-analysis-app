import FinanceRoutePage from '@/app/finance-route-page';
import SinglePageTitle from '@/app/common/single-page-title/single-page-title';
import styles from './page.module.css';

export default function DreamsPage() {
  return (
    <FinanceRoutePage
      routeId="goals"
      customBody={
        <>
          <SinglePageTitle
            label="The Financial Reality"
            title={
              <>
                <span className={styles.goalsTitleAccent}>Your Life Goals</span>
              </>
            }
            description="Every life goal comes with a financial responsibility. Define what matters to you so we can understand the cost and plan how to achieve it."
          />

          <div className={styles.dreamsChartWrap}>
            <div className={styles.dreamsYAxisLabel}>Your Life Goals</div>
            <div className={styles.dreamsChart}>
              <div className={styles.dreamsGrid} aria-hidden="true" />

              <svg
                className={styles.dreamsTrendLine}
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <line x1="0" y1="100" x2="100" y2="0" />
              </svg>

              <span className={`${styles.dreamsIcon} ${styles.dreamsIconBaby}`}>👶</span>
              <span className={`${styles.dreamsIcon} ${styles.dreamsIconSchool}`}>🎒</span>
              <span className={`${styles.dreamsIcon} ${styles.dreamsIconRun}`}>🏃</span>
              <span className={`${styles.dreamsIcon} ${styles.dreamsIconRing}`}>💍</span>
              <span className={`${styles.dreamsIcon} ${styles.dreamsIconCareer}`}>👔</span>
              <span className={`${styles.dreamsIcon} ${styles.dreamsIconFamily}`}>👨‍👩‍👧</span>
              <span className={`${styles.dreamsIcon} ${styles.dreamsIconGrad}`}>🎓</span>
              <span className={`${styles.dreamsIcon} ${styles.dreamsIconTravel}`}>✈️</span>
              <span className={`${styles.dreamsIcon} ${styles.dreamsIconSenior}`}>👵</span>

              <div className={styles.dreamsXAxisTicks}>
                <span>0</span>
                <span>20</span>
                <span>40</span>
                <span>60</span>
                <span>80</span>
              </div>

              <div className={styles.dreamsXAxisLabel}>Age</div>
            </div>
          </div>
        </>
      }
    />
  );
}
