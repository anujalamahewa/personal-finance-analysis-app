'use client';

import FinanceRoutePage from '@/lib/FinanceRoutePage';
import { useFinance } from '@/lib/FinanceProvider';
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

  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(value);
}

const lifeRatioOptions = [
  { label: '50% of income', value: 0.5 },
  { label: '60% of income', value: 0.6 },
  { label: '70% of income', value: 0.7 },
  { label: '80% of income', value: 0.8 },
  { label: '90% of income', value: 0.9 },
  { label: '100% of income', value: 1 },
] as const;

const disabilityRatioOptions = [
  { label: '50% of income', value: 0.5 },
  { label: '60% of income', value: 0.6 },
  { label: '65% of income', value: 0.65 },
  { label: '70% of income', value: 0.7 },
  { label: '75% of income', value: 0.75 },
] as const;

export default function LifeCoverPage() {
  const { state, computed, setProfileField, setAssumptionField } = useFinance();

  const lifeNeed = computed.needs.find((need) => need.key === 'life');
  const disabilityNeed = computed.needs.find((need) => need.key === 'disability');

  return (
    <FinanceRoutePage
      routeId="life-cover"
      customBody={
        <section className={styles.lifeLayout}>
          <div className={styles.headerRow}>
            <div className={styles.stepBadge}>02</div>
            <h1 className={styles.pageTitle}>Life Cover and Disability Calculator</h1>
          </div>

          <h2 className={styles.sectionTitle}>Life Cover (Death / Total Permanent Disability)</h2>
          <div className={styles.formGrid}>
            <div>
              <label className={styles.label}>Monthly Income (LKR)</label>
              <input
                type="text"
                inputMode="numeric"
                className={styles.input}
                placeholder="150,000"
                value={formatNumber(state.profile.monthlyIncome)}
                onChange={(event) => setProfileField('monthlyIncome', toNumber(event.target.value))}
              />
            </div>
            <div>
              <label className={styles.label}>Family Income Replacement</label>
              <select
                className={styles.select}
                value={state.assumptions.lifeReplacementRatio}
                onChange={(event) =>
                  setAssumptionField('lifeReplacementRatio', Number(event.target.value))
                }
              >
                {lifeRatioOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={styles.label}>Coverage Duration</label>
              <select
                className={styles.select}
                value={state.assumptions.lifeCoverageMode}
                onChange={(event) =>
                  setAssumptionField('lifeCoverageMode', event.target.value as 'hlv' | 'years')
                }
              >
                <option value="hlv">Full Life Value (HLV)</option>
                <option value="years">Fixed Years of Income</option>
              </select>
            </div>
            <div>
              <label className={styles.label}>Outstanding Loans (LKR)</label>
              <input
                type="text"
                inputMode="numeric"
                className={styles.input}
                placeholder="0"
                value={formatNumber(state.profile.outstandingLoans)}
                onChange={(event) =>
                  setProfileField('outstandingLoans', toNumber(event.target.value))
                }
              />
            </div>
            <div className={styles.fullRow}>
              <label className={styles.label}>Expected Return on Lump Sum (%)</label>
              <input
                type="text"
                inputMode="numeric"
                className={styles.input}
                placeholder="8"
                value={formatNumber(state.assumptions.lifeFdRate)}
                onChange={(event) => setAssumptionField('lifeFdRate', toNumber(event.target.value))}
              />
            </div>
          </div>

          <div className={`${styles.resultBand} ${styles.resultBandLife}`}>
            <div className={styles.resultBandLabel}>Life Cover Required</div>
            <div className={styles.resultBandValue}>
              {(lifeNeed?.need ?? 0) > 0
                ? formatCurrency(lifeNeed?.need ?? 0)
                : 'Enter income above'}
            </div>
          </div>

          <div className={styles.summaryCards}>
            <article className={`${styles.summaryCard} ${styles.cardNeed}`}>
              <div className={styles.summaryLabel}>I Need</div>
              <div className={styles.summaryValue}>{formatCurrency(lifeNeed?.need ?? 0)}</div>
            </article>
            <article className={`${styles.summaryCard} ${styles.cardHave}`}>
              <div className={styles.summaryLabel}>I Have</div>
              <div className={styles.summaryValue}>{formatCurrency(lifeNeed?.have ?? 0)}</div>
            </article>
            <article className={`${styles.summaryCard} ${styles.cardGap}`}>
              <div className={styles.summaryLabel}>My Gap</div>
              <div className={styles.summaryValue}>{formatCurrency(lifeNeed?.gap ?? 0)}</div>
            </article>
          </div>

          <div className={styles.sectionDivider} />

          <h2 className={styles.sectionTitle}>Disability Insurance</h2>
          <div className={styles.formGrid}>
            <div>
              <label className={styles.label}>Income Replacement Rate</label>
              <select
                className={styles.select}
                value={state.assumptions.disabilityReplacementRatio}
                onChange={(event) =>
                  setAssumptionField('disabilityReplacementRatio', Number(event.target.value))
                }
              >
                {disabilityRatioOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
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
          </div>

          <div className={`${styles.resultBand} ${styles.resultBandDisability}`}>
            <div className={styles.resultBandLabel}>Disability Income Protection Required</div>
            <div className={styles.resultBandValue}>
              {formatCurrency(disabilityNeed?.need ?? 0)}
            </div>
          </div>

          <div className={styles.summaryCards}>
            <article className={`${styles.summaryCard} ${styles.cardNeed}`}>
              <div className={styles.summaryLabel}>I Need</div>
              <div className={styles.summaryValue}>{formatCurrency(disabilityNeed?.need ?? 0)}</div>
            </article>
            <article className={`${styles.summaryCard} ${styles.cardHave}`}>
              <div className={styles.summaryLabel}>I Have</div>
              <div className={styles.summaryValue}>{formatCurrency(disabilityNeed?.have ?? 0)}</div>
            </article>
            <article className={`${styles.summaryCard} ${styles.cardGap}`}>
              <div className={styles.summaryLabel}>My Gap</div>
              <div className={styles.summaryValue}>{formatCurrency(disabilityNeed?.gap ?? 0)}</div>
            </article>
          </div>
        </section>
      }
    />
  );
}
