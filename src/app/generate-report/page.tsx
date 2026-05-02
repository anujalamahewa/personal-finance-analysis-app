"use client";

import FinanceRoutePage from "@/lib/finance/ui/FinanceRoutePage";
import { useFinance } from "@/lib/finance/ui/FinanceProvider";
import { formatCurrency } from "@/lib/finance/calculations";
import styles from "./page.module.css";

export default function GenerateReportPage() {
  const { state, computed, resetAll } = useFinance();

  return (
    <FinanceRoutePage
      routeId="generate-report"
      customBody={
        <section className={styles.pageWrap}>
          <div className={styles.heroLabel}>Final Step</div>
          <h1 className={styles.heroTitle}>Report Ready</h1>
          <p className={styles.heroBody}>
            All numbers are now consolidated in React state and route-based pages. You can wire
            these values to your backend or generate a PDF/report from this summary view.
          </p>

          <div className={styles.grid2}>
            <div className={styles.card}>
              <div className={styles.cardTitle}>Client</div>
              <p className={styles.cardMuted}>
                {state.profile.fullName || "Unnamed client"}
                <br />
                Age {state.profile.age}, Retirement {state.profile.retirementAge}
              </p>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statValue}>{formatCurrency(computed.totalGap)}</div>
              <div className={styles.statLabel}>Total gap requiring action</div>
            </div>
          </div>

          <div className={styles.rowActions}>
            <button className={styles.btn} onClick={resetAll}>
              Reset all data
            </button>
          </div>
        </section>
      }
    />
  );
}