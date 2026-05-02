'use client';

import FinanceRoutePage from '@/lib/FinanceRoutePage';
import { useFinance } from '@/lib/FinanceProvider';
import { formatCurrency } from '@/lib/calculations';
import styles from './page.module.css';

function toNumber(value: string): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export default function EducationFundPage() {
  const { state, computed, setAssumptionField } = useFinance();

  return (
    <FinanceRoutePage
      routeId="education-fund"
      customBody={
        <>
          <div className={styles.heroLabel}>Need 03</div>
          <h1 className={styles.heroTitle}>Education Fund Planning</h1>
          <div className={styles.formGrid}>
            <div>
              <label className={styles.label}>Education Inflation (%)</label>
              <input
                type="number"
                min={0}
                className={styles.input}
                value={state.assumptions.educationInflationRate}
                onChange={(event) =>
                  setAssumptionField('educationInflationRate', toNumber(event.target.value))
                }
              />
            </div>
            <div>
              <label className={styles.label}>Education Investment Return (%)</label>
              <input
                type="number"
                min={0}
                className={styles.input}
                value={state.assumptions.educationInvestmentReturnRate}
                onChange={(event) =>
                  setAssumptionField('educationInvestmentReturnRate', toNumber(event.target.value))
                }
              />
            </div>
          </div>
          <div className={styles.kpiGrid}>
            <div className={styles.kpiItem}>
              <div className={styles.kpiLabel}>Total Education Need</div>
              <div className={`${styles.kpiValue} ${styles.kpiNeed}`}>
                {formatCurrency(computed.education.totalNeed)}
              </div>
            </div>
            <div className={styles.kpiItem}>
              <div className={styles.kpiLabel}>Education Gap</div>
              <div className={`${styles.kpiValue} ${styles.kpiGap}`}>
                {formatCurrency(computed.education.totalGap)}
              </div>
            </div>
            <div className={styles.kpiItem}>
              <div className={styles.kpiLabel}>Monthly Required</div>
              <div className={`${styles.kpiValue} ${styles.kpiGap}`}>
                {formatCurrency(computed.education.totalMonthlyRequired)}
              </div>
            </div>
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Child</th>
                  <th>Years</th>
                  <th>Future Cost</th>
                  <th>Allocated Fund</th>
                  <th>Gap</th>
                  <th>Monthly</th>
                </tr>
              </thead>
              <tbody>
                {computed.education.childBreakdown.length === 0 && (
                  <tr>
                    <td colSpan={6}>Add children in Client Profile to compute this section.</td>
                  </tr>
                )}
                {computed.education.childBreakdown.map((child) => (
                  <tr key={child.childId}>
                    <td>{child.childName}</td>
                    <td>{child.yearsToUniversity}</td>
                    <td>{formatCurrency(child.futureCost)}</td>
                    <td>{formatCurrency(child.allocatedExistingFund)}</td>
                    <td>{formatCurrency(child.gap)}</td>
                    <td>{formatCurrency(child.monthlyRequired)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      }
    />
  );
}
