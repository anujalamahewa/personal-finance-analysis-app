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

  return (
    <FinanceRoutePage
      routeId="life-cover"
      customBody={
        <section className={styles.lifeLayout}>
          <aside className={styles.storyPanel}>
            <div className={styles.storyMeta}>
              <span className={styles.storyStep}>02</span>
              <span className={styles.storyLabel}>Income Protection</span>
            </div>

            <h1 className={styles.storyTitle}>
              <span>A Promise on a</span>
              <span className={styles.storyTitleAccent}>Lifestyle</span>
            </h1>

            <div className={styles.storyUnderline} aria-hidden="true" />

            <p className={styles.storyBody}>
              Money determines the quality of life we live. Every family deserves to feel safe about
              their lifestyle, even when the income earner can no longer provide it.
            </p>

            <div className={styles.realityCard}>
              <div className={styles.realityTitle}>Income vs Expenses Reality</div>
              <div className={styles.realityGrid}>
                <div className={`${styles.realityItem} ${styles.realityIncome}`}>
                  Salary / Business
                </div>
                <div className={`${styles.realityItem} ${styles.realityExpense}`}>
                  Food and Groceries
                </div>
                <div className={`${styles.realityItem} ${styles.realityIncome}`}>Rental Income</div>
                <div className={`${styles.realityItem} ${styles.realityExpense}`}>
                  Electricity / Water
                </div>
                <div className={`${styles.realityItem} ${styles.realityIncome}`}>Investments</div>
                <div className={`${styles.realityItem} ${styles.realityExpense}`}>
                  Rent / Mortgage
                </div>
              </div>
              <div className={styles.realityFooter}>If income stops - expenses don't.</div>
            </div>
          </aside>

          <div className={styles.calcPanel}>
            <div className={styles.headerRow}>
              <div className={styles.stepBadge}>02</div>
              <h2 className={styles.pageTitle}>Life Cover and Disability Calculator</h2>
            </div>

            <h3 className={styles.sectionTitle}>Life Cover (Death / Total Permanent Disability)</h3>
            <div className={styles.formGrid}>
              <div>
                <label className={styles.label}>Monthly Income (LKR)</label>
                <input
                  type="text"
                  inputMode="numeric"
                  className={styles.input}
                  placeholder="150,000"
                  value={formatNumber(state.profile.monthlyIncome)}
                  onChange={(event) =>
                    setProfileField('monthlyIncome', toNumber(event.target.value))
                  }
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
                  onChange={(event) =>
                    setAssumptionField('lifeFdRate', toNumber(event.target.value))
                  }
                />
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
          </div>
        </section>
      }
    />
  );
}
