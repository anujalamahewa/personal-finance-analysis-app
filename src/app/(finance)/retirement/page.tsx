'use client';

import FinanceRoutePage from '@/app/FinanceRoutePage';
import { useFinance } from '@/app/FinanceProvider';
import { formatCurrency } from '@/lib/calculations';
import styles from './page.module.css';

function toNumber(value: string): number {
  const parsed = Number(value.replace(/,/g, '').trim());
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatNumber(value: number): string {
  if (!Number.isFinite(value) || value <= 0) {
    return '';
  }

  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  }).format(value);
}

const expenseRatioOptions = [
  { label: '60% of current', value: 0.6 },
  { label: '70% of current', value: 0.7 },
  { label: '80% of current', value: 0.8 },
  { label: '90% of current', value: 0.9 },
  { label: '100% of current', value: 1 },
] as const;

export default function RetirementPage() {
  const { state, computed, setProfileField, setAssumptionField } = useFinance();
  const retirementNeed = computed.needs.find((need) => need.key === 'retirement');

  const monthlySavingsRequired = computed.retirement.monthlySavingsRequired;

  return (
    <FinanceRoutePage
      routeId="retirement"
      customBody={
        <section className={styles.retirementLayout}>
          <div className={styles.headerRow}>
            <div className={styles.stepBadge}>01</div>
            <h1 className={styles.pageTitle}>Retirement Calculator</h1>
          </div>

          <div className={styles.formGrid}>
            <div>
              <label className={styles.label}>Monthly Expenses Today (LKR)</label>
              <input
                type="text"
                inputMode="numeric"
                className={styles.input}
                placeholder="120,000"
                value={formatNumber(state.profile.monthlyExpenses)}
                onChange={(event) =>
                  setProfileField('monthlyExpenses', toNumber(event.target.value))
                }
              />
            </div>
            <div>
              <label className={styles.label}>Expenses at Retirement</label>
              <select
                className={styles.select}
                value={state.assumptions.retirementExpenseRatio}
                onChange={(event) =>
                  setAssumptionField('retirementExpenseRatio', Number(event.target.value))
                }
              >
                {expenseRatioOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={styles.label}>Inflation Rate (% P.A.)</label>
              <input
                type="text"
                inputMode="numeric"
                className={styles.input}
                placeholder="7"
                value={formatNumber(state.assumptions.inflationRate)}
                onChange={(event) =>
                  setAssumptionField('inflationRate', toNumber(event.target.value))
                }
              />
            </div>
            <div>
              <label className={styles.label}>Investment Return (% P.A.)</label>
              <input
                type="text"
                inputMode="numeric"
                className={styles.input}
                placeholder="10"
                value={formatNumber(state.assumptions.investmentReturnRate)}
                onChange={(event) =>
                  setAssumptionField('investmentReturnRate', toNumber(event.target.value))
                }
              />
            </div>
            <div>
              <label className={styles.label}>Years to Retirement</label>
              <input
                type="text"
                inputMode="numeric"
                className={styles.input}
                placeholder="60"
                value={formatNumber(state.profile.retirementAge)}
                onChange={(event) => setProfileField('retirementAge', toNumber(event.target.value))}
              />
            </div>
            <div>
              <label className={styles.label}>Life Expectancy</label>
              <input
                type="text"
                inputMode="numeric"
                className={styles.input}
                placeholder="80"
                value={formatNumber(state.assumptions.lifeExpectancy)}
                onChange={(event) =>
                  setAssumptionField('lifeExpectancy', toNumber(event.target.value))
                }
              />
            </div>
          </div>

          <div className={styles.resultTopRow}>
            <article className={styles.resultCard}>
              <div className={styles.resultLabel}>Monthly Need at Retirement</div>
              <div className={styles.resultValue}>
                {formatCurrency(computed.retirement.monthlyNeedAtRetirement)}
              </div>
              <button className={styles.workingBtn}>See working ▸</button>
            </article>

            <article className={styles.resultCard}>
              <div className={styles.resultLabel}>Total Retirement Savings Target</div>
              <div className={styles.resultValue}>
                {formatCurrency(computed.retirement.corpusNeeded)}
              </div>
              <button className={styles.workingBtn}>See working ▸</button>
            </article>

            <article className={styles.resultCard}>
              <div className={styles.resultLabel}>Retirement Period</div>
              <div className={styles.resultValue}>
                {computed.retirement.retirementPeriodYears} yrs
              </div>
            </article>
          </div>

          <div className={styles.savingsBand}>
            <div className={styles.savingsBandLabel}>Monthly Savings Required</div>
            <div className={styles.savingsBandValue}>
              {monthlySavingsRequired > 0
                ? formatCurrency(monthlySavingsRequired)
                : 'Enter your details above'}
            </div>
          </div>

          <div className={styles.bottomCards}>
            <article className={`${styles.bottomCard} ${styles.bottomNeed}`}>
              <div className={styles.bottomLabel}>I Need</div>
              <div className={styles.bottomValue}>{formatCurrency(retirementNeed?.need ?? 0)}</div>
            </article>
            <article className={`${styles.bottomCard} ${styles.bottomHave}`}>
              <div className={styles.bottomLabel}>I Have</div>
              <div className={styles.bottomValue}>{formatCurrency(retirementNeed?.have ?? 0)}</div>
            </article>
            <article className={`${styles.bottomCard} ${styles.bottomGap}`}>
              <div className={styles.bottomLabel}>My Gap</div>
              <div className={styles.bottomValue}>{formatCurrency(retirementNeed?.gap ?? 0)}</div>
            </article>
          </div>
        </section>
      }
    />
  );
}
