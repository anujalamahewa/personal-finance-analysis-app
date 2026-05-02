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

type RealityTone = 'income' | 'expense';
type RealityIcon = 'briefcase' | 'cart' | 'home' | 'bolt' | 'chart' | 'house';

const realityItems: Array<{
  title: string;
  tone: RealityTone;
  icon: RealityIcon;
}> = [
  {
    title: 'Salary / Business',
    tone: 'income',
    icon: 'briefcase',
  },
  {
    title: 'Food and Groceries',
    tone: 'expense',
    icon: 'cart',
  },
  {
    title: 'Rental Income',
    tone: 'income',
    icon: 'home',
  },
  {
    title: 'Electricity / Water',
    tone: 'expense',
    icon: 'bolt',
  },
  {
    title: 'Investments',
    tone: 'income',
    icon: 'chart',
  },
  {
    title: 'Rent / Mortgage',
    tone: 'expense',
    icon: 'house',
  },
];

function RealitySvgIcon({ icon }: { icon: RealityIcon }) {
  if (icon === 'briefcase') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9 7V5.8C9 4.8 9.8 4 10.8 4h2.4C14.2 4 15 4.8 15 5.8V7" />
        <rect x="3.5" y="7" width="17" height="12.5" rx="2.4" />
        <path d="M3.5 11.5H20.5" />
      </svg>
    );
  }

  if (icon === 'cart') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 5H6L8.2 15.2H18.5L20 8H7" />
        <circle cx="9.8" cy="18.2" r="1.6" />
        <circle cx="17.2" cy="18.2" r="1.6" />
      </svg>
    );
  }

  if (icon === 'home') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4.5 10.2L12 4L19.5 10.2" />
        <path d="M6.5 9.4V20H17.5V9.4" />
        <path d="M10.5 20V14H13.5V20" />
      </svg>
    );
  }

  if (icon === 'bolt') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M13.8 3L6.8 13.1H11.5L10.2 21L17.2 10.9H12.5L13.8 3Z" />
      </svg>
    );
  }

  if (icon === 'chart') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 20H20" />
        <path d="M7 17V12" />
        <path d="M12 17V9" />
        <path d="M17 17V6" />
        <path d="M6.8 9.4L11.6 6.4L16.2 3.8" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4.5 10.2L12 4L19.5 10.2" />
      <path d="M6.5 9.4V20H17.5V9.4" />
      <path d="M10.5 20V14H13.5V20" />
    </svg>
  );
}

function RealityFooterIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3L19 6V11.2C19 15.4 16.3 19.2 12 21C7.7 19.2 5 15.4 5 11.2V6L12 3Z" />
      <path d="M12 8.2V14.8" />
      <path d="M12 17.3V17.4" />
    </svg>
  );
}

export default function LifeCoverPage() {
  const { state, computed, setProfileField, setAssumptionField } = useFinance();

  const lifeNeed = computed.needs.find((need) => need.key === 'life');
  const disabilityNeed = computed.needs.find((need) => need.key === 'disability');

  return (
    <FinanceRoutePage
      routeId="life-cover"
      customBody={
        <section className={styles.lifeLayout}>
          <aside className={styles.storyPanel}>
            <div className={styles.storyMeta}>
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
              <div className={styles.realityHeader}>
                <div>
                  <div className={styles.realityTitle}>Income vs Expenses Reality</div>
                  <div className={styles.realityHeaderUnderline} aria-hidden="true" />
                </div>
              </div>
              <div className={styles.realityGrid}>
                {realityItems.map((item) => {
                  const toneClass =
                    item.tone === 'income' ? styles.realityIncome : styles.realityExpense;

                  return (
                    <article key={item.title} className={`${styles.realityItem} ${toneClass}`}>
                      <div className={styles.realityItemIconWrap}>
                        <div className={styles.realityItemIcon}>
                          <RealitySvgIcon icon={item.icon} />
                        </div>
                      </div>
                      <div>
                        <h4 className={styles.realityItemTitle}>{item.title}</h4>
                      </div>
                    </article>
                  );
                })}
              </div>
              <div className={styles.realityFooter}>
                <div className={styles.realityFooterIconWrap}>
                  <div className={styles.realityFooterIcon}>
                    <RealityFooterIcon />
                  </div>
                </div>
                <div>
                  <div className={styles.realityFooterTitle}>
                    If income stops - expenses don&apos;t.
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <div className={styles.calcPanel}>
            <div className={styles.headerRow}>
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

            <div className={styles.sectionDivider} />

            <h3 className={styles.sectionTitle}>Disability Income Protection</h3>
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
                  onChange={(event) =>
                    setProfileField('retirementAge', toNumber(event.target.value))
                  }
                />
              </div>
            </div>

            <div className={styles.summaryCards}>
              <article className={`${styles.summaryCard} ${styles.cardNeed}`}>
                <div className={styles.summaryLabel}>I Need</div>
                <div className={styles.summaryValue}>
                  {formatCurrency(disabilityNeed?.need ?? 0)}
                </div>
              </article>
              <article className={`${styles.summaryCard} ${styles.cardHave}`}>
                <div className={styles.summaryLabel}>I Have</div>
                <div className={styles.summaryValue}>
                  {formatCurrency(disabilityNeed?.have ?? 0)}
                </div>
              </article>
              <article className={`${styles.summaryCard} ${styles.cardGap}`}>
                <div className={styles.summaryLabel}>My Gap</div>
                <div className={styles.summaryValue}>
                  {formatCurrency(disabilityNeed?.gap ?? 0)}
                </div>
              </article>
            </div>
          </div>
        </section>
      }
    />
  );
}
