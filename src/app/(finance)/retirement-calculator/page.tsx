'use client';

import { useState } from 'react';
import FinanceRoutePage from '@/app/FinanceRoutePage';
import Popup from '@/app/common/Popup';
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

export default function RetirementCalculatorPage() {
  const { state, computed, setProfileField, setAssumptionField } = useFinance();
  const retirementNeed = computed.needs.find((need) => need.key === 'retirement');
  const monthlySavingsRequired = computed.retirement.monthlySavingsRequired;
  const [activePopup, setActivePopup] = useState<'monthly' | 'target' | null>(null);

  const rawYearsToRetirement = Math.max(0, state.profile.retirementAge - state.profile.age);
  const inflationPercent = state.assumptions.inflationRate;
  const inflationFactor = Math.pow(1 + inflationPercent / 100, rawYearsToRetirement);
  const baseMonthlyAtRetirement =
    state.profile.monthlyExpenses * state.assumptions.retirementExpenseRatio;

  const annualIncomeNeeded = computed.retirement.monthlyNeedAtRetirement * 12;
  const rawRetirementPeriod = Math.max(
    0,
    state.assumptions.lifeExpectancy - state.profile.retirementAge,
  );
  const realReturnPercent =
    state.assumptions.investmentReturnRate - state.assumptions.inflationRate;

  let annuityFactor = 0;
  if (rawRetirementPeriod > 0) {
    if (realReturnPercent === 0) {
      annuityFactor = rawRetirementPeriod;
    } else {
      const realReturnDecimal = realReturnPercent / 100;
      annuityFactor =
        (1 - Math.pow(1 + realReturnDecimal, -rawRetirementPeriod)) / realReturnDecimal;
    }
  }

  const monthlyNeedSteps = [
    <>
      Current monthly expenses:{' '}
      <span className={styles.popupValue}>{formatCurrency(state.profile.monthlyExpenses)}</span>
    </>,
    <>
      Apply retirement expense ratio ({Math.round(state.assumptions.retirementExpenseRatio * 100)}
      %): <span className={styles.popupValue}>{formatCurrency(baseMonthlyAtRetirement)}</span> per
      month
    </>,
    <>
      Apply {inflationPercent}% inflation over {rawYearsToRetirement} years: multiply by (1 +{' '}
      {inflationPercent}%)^{rawYearsToRetirement} ={' '}
      <span className={styles.popupValue}>{inflationFactor.toFixed(3)}</span>
    </>,
    <>
      Monthly Need at Retirement ={' '}
      <span className={styles.popupValue}>
        {formatCurrency(computed.retirement.monthlyNeedAtRetirement)}
      </span>
    </>,
  ];

  const totalTargetSteps = [
    <>
      Monthly Need at Retirement:{' '}
      <span className={styles.popupValue}>
        {formatCurrency(computed.retirement.monthlyNeedAtRetirement)}
      </span>
    </>,
    <>
      Annual income needed: {formatCurrency(computed.retirement.monthlyNeedAtRetirement)} x 12 ={' '}
      <span className={styles.popupValue}>{formatCurrency(annualIncomeNeeded)}</span>
    </>,
    <>
      Real return = investment return ({state.assumptions.investmentReturnRate}%) minus inflation (
      {state.assumptions.inflationRate}%) ={' '}
      <span className={styles.popupValue}>{realReturnPercent.toFixed(1)}%</span>
    </>,
    <>
      Annuity factor for {rawRetirementPeriod} years at {realReturnPercent.toFixed(1)}% real return
      = <span className={styles.popupValue}>{annuityFactor.toFixed(3)}</span>
    </>,
    <>
      Total Retirement Savings Target = Annual need x Annuity factor ={' '}
      <span className={styles.popupValue}>{formatCurrency(computed.retirement.corpusNeeded)}</span>
    </>,
  ];

  return (
    <FinanceRoutePage
      routeId="retirement"
      customBody={
        <section className={styles.retirementLayout}>
          <aside className={styles.storyPanel}>
            <div className={styles.storyMeta}>
              <span className={styles.storyLabel}>Happy Retirement</span>
            </div>
            <h1 className={styles.storyTitle}>Will Your Savings Last As Long As You Do?</h1>
            <div className={styles.storyUnderline} aria-hidden="true" />
            <p className={styles.storyBody}>
              Sri Lanka is ageing rapidly. By 2040, 1 in 5 Sri Lankans will be over 60 yet most will
              reach retirement without enough set aside.
            </p>

            <div className={styles.storyStatCard}>
              <div className={styles.storyStatValue}>69%</div>
              <p className={styles.storyStatText}>
                of retirees in Sri Lanka depend on family support. Asian Development Bank, 2019
              </p>
            </div>

            <p className={styles.storyQuote}>
              "The key question isn't when you'll retire, it's whether your money will last for the
              last 20 years of your life."
            </p>
          </aside>

          <div className={styles.calcPanel}>
            <div className={styles.headerRow}>
              <h2 className={styles.pageTitle}>Retirement Calculator</h2>
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
                  onChange={(event) =>
                    setProfileField('retirementAge', toNumber(event.target.value))
                  }
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
                <button className={styles.workingBtn} onClick={() => setActivePopup('monthly')}>
                  See working ▸
                </button>
              </article>

              <article className={styles.resultCard}>
                <div className={styles.resultLabel}>Total Retirement Savings Target</div>
                <div className={styles.resultValue}>
                  {formatCurrency(computed.retirement.corpusNeeded)}
                </div>
                <button className={styles.workingBtn} onClick={() => setActivePopup('target')}>
                  See working ▸
                </button>
              </article>

              <article className={styles.resultCard}>
                <div className={styles.resultLabel}>Retirement Period</div>
                <div className={styles.resultValue}>
                  {computed.retirement.retirementPeriodYears} yrs
                </div>
              </article>
            </div>

            <div className={styles.bottomCards}>
              <article className={`${styles.bottomCard} ${styles.bottomNeed}`}>
                <div className={styles.bottomLabel}>I Need</div>
                <div className={styles.bottomValue}>
                  {formatCurrency(retirementNeed?.need ?? 0)}
                </div>
              </article>
              <article className={`${styles.bottomCard} ${styles.bottomHave}`}>
                <div className={styles.bottomLabel}>I Have</div>
                <div className={styles.bottomValue}>
                  {formatCurrency(retirementNeed?.have ?? 0)}
                </div>
              </article>
              <article className={`${styles.bottomCard} ${styles.bottomGap}`}>
                <div className={styles.bottomLabel}>My Gap</div>
                <div className={styles.bottomValue}>{formatCurrency(retirementNeed?.gap ?? 0)}</div>
              </article>
            </div>
          </div>

          <Popup
            isOpen={activePopup === 'monthly'}
            title="How We Calculate Monthly Need at Retirement"
            items={monthlyNeedSteps}
            onClose={() => setActivePopup(null)}
          />

          <Popup
            isOpen={activePopup === 'target'}
            title="How We Calculate Total Retirement Savings Target"
            items={totalTargetSteps}
            onClose={() => setActivePopup(null)}
          />
        </section>
      }
    />
  );
}
