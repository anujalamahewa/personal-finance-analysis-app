import FinanceRoutePage from '@/app/finance-route-page';
import RedLine from '@/app/common/red-line/red-line';
import styles from './page.module.css';

export default function IncomeCyclePage() {
  return (
    <FinanceRoutePage
      routeId="income"
      customBody={
        <>
          <section className={styles.incomeHeader}>
            <div className={styles.incomeHeroLabel}>The Financial Reality</div>
            <h1 className={styles.incomeTitle}>The Income Cycle</h1>
            <p className={styles.incomeBody}>
              Of your 80-year life, you only have roughly <strong>40 active earning years</strong>
              &nbsp;to fund all 80 years of living.
            </p>
          </section>

          <section className={styles.incomeLayout}>
            <div className={styles.incomeLeft}>
              <div className={styles.incomeStatCard}>
                <div className={styles.incomeStatIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" className={styles.incomeStatIconSvg}>
                    <rect
                      x="4"
                      y="4"
                      width="16"
                      height="16"
                      rx="2.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                    <path
                      d="M8 14L11 11L13 13L17 9"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14 9H17V12"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className={styles.incomeStatValue}>50%</div>
                <RedLine className={styles.incomeStatAccent} />
                <p className={styles.incomeStatText}>
                  of your life requires income you will not be actively earning. Planning today is
                  the only solution.
                </p>
              </div>
            </div>

            <div className={styles.incomeCenter}>
              <div className={styles.incomeChart} aria-label="Income cycle by age bands">
                <div className={styles.incomeDividerHorizontal} aria-hidden="true" />
                <div className={`${styles.incomeSliceValue} ${styles.sliceTopLeft}`}>
                  <span className={styles.incomeSlicePercent}>20%</span>
                  <span className={styles.incomeSliceName}>Retirement</span>
                </div>
                <div className={`${styles.incomeSliceValue} ${styles.sliceTopRight}`}>
                  <span className={styles.incomeSlicePercent}>20%</span>
                  <span className={styles.incomeSliceName}>Students</span>
                </div>
                <div className={`${styles.incomeSliceValue} ${styles.sliceBottomLeft}`}>
                  <span className={styles.incomeSlicePercent}>20%</span>
                  <span className={styles.incomeSliceName}>Youth</span>
                </div>
                <div className={`${styles.incomeSliceValue} ${styles.sliceBottomRight}`}>
                  <span className={styles.incomeSlicePercent}>20%</span>
                  <span className={styles.incomeSliceName}>Adult</span>
                </div>

                <div className={styles.incomeChartCenter}>
                  <span className={styles.incomeCenterYears}>80 YEARS</span>
                </div>
              </div>
            </div>

            <div className={styles.incomeLegend}>
              <div className={`${styles.incomeLegendItem} ${styles.legendStudent}`}>
                <span
                  className={`${styles.incomeLegendDot} ${styles.dotStudent}`}
                  aria-hidden="true"
                />
                <div>
                  <div className={styles.incomeLegendTitle}>Student (0-20)</div>
                  <div className={styles.incomeLegendText}>Learning phase</div>
                </div>
              </div>

              <div className={`${styles.incomeLegendItem} ${styles.legendYouth}`}>
                <span
                  className={`${styles.incomeLegendDot} ${styles.dotYouth}`}
                  aria-hidden="true"
                />
                <div>
                  <div className={styles.incomeLegendTitle}>Youth (20-40)</div>
                  <div className={styles.incomeLegendText}>Active income begins</div>
                </div>
              </div>

              <div className={`${styles.incomeLegendItem} ${styles.legendAdult}`}>
                <span
                  className={`${styles.incomeLegendDot} ${styles.dotAdult}`}
                  aria-hidden="true"
                />
                <div>
                  <div className={styles.incomeLegendTitle}>Adult (40-60)</div>
                  <div className={styles.incomeLegendText}>Peak earning years</div>
                </div>
              </div>

              <div className={`${styles.incomeLegendItem} ${styles.legendRetirement}`}>
                <span
                  className={`${styles.incomeLegendDot} ${styles.dotRetirement}`}
                  aria-hidden="true"
                />
                <div>
                  <div className={styles.incomeLegendTitle}>Retirement (60-80)</div>
                  <div className={styles.incomeLegendText}>No active income</div>
                </div>
              </div>
            </div>
          </section>
        </>
      }
    />
  );
}
