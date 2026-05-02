'use client';

import { useMemo } from 'react';
import FinanceRoutePage from '@/app/FinanceRoutePage';
import { useFinance } from '@/app/FinanceProvider';
import { formatCurrency } from '@/lib/calculations';
import styles from './page.module.css';

function toNumber(value: string): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

const INCOME_MONTH_OPTIONS = [12, 24, 36, 48, 60];
const TREATMENT_COST_OPTIONS = [1_000_000, 2_000_000, 3_000_000, 4_000_000, 5_000_000];

type ProcedureKind = 'bypass' | 'chemo' | 'kidney' | 'stroke';

function ProcedureIcon({ kind }: { kind: ProcedureKind }) {
  if (kind === 'bypass') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 20.2C10.8 19.2 6.6 15.8 5 13.5C3.9 11.9 4 9.7 5.2 8.3C6.5 6.8 8.8 6.7 10.2 8.1L12 9.9L13.8 8.1C15.2 6.7 17.5 6.8 18.8 8.3C20 9.7 20.1 11.9 19 13.5C17.4 15.8 13.2 19.2 12 20.2Z" />
        <path d="M8.6 12H10.6L11.4 10.3L12.7 13.6L13.6 12H15.4" />
      </svg>
    );
  }

  if (kind === 'chemo') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 3H16" />
        <path d="M9.2 3V7.4L5.3 13.9C3.7 16.5 5.6 20 8.7 20H15.3C18.4 20 20.3 16.5 18.7 13.9L14.8 7.4V3" />
        <path d="M8 11.2H16" />
      </svg>
    );
  }

  if (kind === 'kidney') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M10.6 6.8C8.5 5.2 5.3 6 4.2 8.3C3.3 10.1 3.2 12.7 4.3 14.8C5.5 17.2 8.3 18.7 10.8 17.6C12 17.1 12.9 16 13.3 14.8V9.8C13 8.5 12 7.4 10.6 6.8Z" />
        <path d="M13.4 6.8C15.5 5.2 18.7 6 19.8 8.3C20.7 10.1 20.8 12.7 19.7 14.8C18.5 17.2 15.7 18.7 13.2 17.6C12 17.1 11.1 16 10.7 14.8V9.8C11 8.5 12 7.4 13.4 6.8Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 4.5C8.6 4.5 6 7.1 6 10.5C6 13.1 7.5 15.2 9.7 16.2V19.5" />
      <path d="M12 4.5C15.4 4.5 18 7.1 18 10.5C18 13.1 16.5 15.2 14.3 16.2V19.5" />
      <path d="M12 12.5V20" />
      <path d="M9.5 20H14.5" />
    </svg>
  );
}

export default function MedicalCriticalIllnessPage() {
  const { state, computed, setProfileField, setAssumptionField } = useFinance();

  const needsByKey = useMemo(() => {
    const map = new Map(computed.needs.map((need) => [need.key, need]));
    return map;
  }, [computed.needs]);

  const age = state.profile.age;
  const familyMembers = computed.familyMembers;

  const medicalNeed = needsByKey.get('medical');
  const criticalIllnessNeed = needsByKey.get('criticalIllness');

  return (
    <FinanceRoutePage
      routeId="medical-critical-illness"
      customBody={
        <section className={styles.pageWrap}>
          <aside className={styles.storyPanel}>
            <div className={styles.storyMeta}>
              <span className={styles.storyLabel}>Medical Funds</span>
            </div>

            <h1 className={styles.storyTitle}>
              <span>87% Pay</span>
              <span>From Their</span>
              <span className={styles.storyTitleAccent}>Own Savings</span>
            </h1>

            <div className={styles.storyUnderline} aria-hidden="true" />

            <p className={styles.storyBody}>
              87% of all hospital bills in Sri Lanka are paid from household savings. Only 5% are
              covered by insurance.
            </p>

            <div className={styles.costsCard}>
              <div className={styles.costsTitle}>Healthcare Costs Sri Lanka</div>
              <div className={styles.costsHeader}>
                <span>Procedure</span>
                <span>2021</span>
                <span>2025</span>
              </div>

              <div className={styles.costsRow}>
                <span className={styles.procedureCell}>
                  <span className={styles.procedureIcon}>
                    <ProcedureIcon kind="bypass" />
                  </span>
                  <span className={styles.procedureText}>Bypass Surgery</span>
                </span>
                <span className={styles.previousCost}>750,000</span>
                <span className={styles.currentCost}>2,000,000</span>
              </div>
              <div className={styles.costsRow}>
                <span className={styles.procedureCell}>
                  <span className={styles.procedureIcon}>
                    <ProcedureIcon kind="chemo" />
                  </span>
                  <span className={styles.procedureText}>Chemotherapy</span>
                </span>
                <span className={styles.previousCost}>2,000,000</span>
                <span className={styles.currentCost}>3,000,000</span>
              </div>
              <div className={styles.costsRow}>
                <span className={styles.procedureCell}>
                  <span className={styles.procedureIcon}>
                    <ProcedureIcon kind="kidney" />
                  </span>
                  <span className={styles.procedureText}>Kidney Transplant</span>
                </span>
                <span className={styles.previousCost}>1,500,000</span>
                <span className={styles.currentCost}>3,500,000</span>
              </div>
              <div className={styles.costsRow}>
                <span className={styles.procedureCell}>
                  <span className={styles.procedureIcon}>
                    <ProcedureIcon kind="stroke" />
                  </span>
                  <span className={styles.procedureText}>Stroke Surgery</span>
                </span>
                <span className={styles.previousCost}>3,000,000</span>
                <span className={styles.currentCost}>5,000,000</span>
              </div>
            </div>
          </aside>

          <div className={styles.calcPanel}>
            <div className={styles.headerRow}>
              <h2 className={styles.pageTitle}>Medical and Critical Illness Calculator</h2>
            </div>

            <section className={styles.blockSection}>
              <p className={styles.blockLabel}>Annual Hospitalisation Cover</p>

              <div className={styles.inputGrid}>
                <div>
                  <label className={styles.inputLabel}>Client&apos;s Age</label>
                  <input
                    type="number"
                    min={0}
                    className={styles.inputField}
                    value={age}
                    onChange={(event) => setProfileField('age', toNumber(event.target.value))}
                  />
                </div>

                <div>
                  <label className={styles.inputLabel}>Family Members</label>
                  <input
                    type="number"
                    className={styles.inputField}
                    value={familyMembers}
                    readOnly
                  />
                </div>
              </div>

              <div className={styles.statRow}>
                <article className={`${styles.statCard} ${styles.needCard}`}>
                  <div className={styles.statLabel}>I Need</div>
                  <div className={styles.statValue}>{formatCurrency(medicalNeed?.need ?? 0)}</div>
                </article>

                <article className={`${styles.statCard} ${styles.haveCard}`}>
                  <div className={styles.statLabel}>I Have</div>
                  <div className={styles.statValue}>{formatCurrency(medicalNeed?.have ?? 0)}</div>
                </article>

                <article className={`${styles.statCard} ${styles.gapCard}`}>
                  <div className={styles.statLabel}>My Gap</div>
                  <div className={`${styles.statValue} ${styles.gapValue}`}>
                    {formatCurrency(medicalNeed?.gap ?? 0)}
                  </div>
                </article>
              </div>
            </section>

            <section className={`${styles.blockSection} ${styles.dividerTop}`}>
              <p className={styles.blockLabel}>Critical Illness Lump Sum</p>

              <div className={styles.inputGrid}>
                <div>
                  <label className={styles.inputLabel}>Income Replacement Period</label>
                  <select
                    className={styles.selectField}
                    value={state.assumptions.ciIncomeMonths}
                    onChange={(event) =>
                      setAssumptionField('ciIncomeMonths', toNumber(event.target.value))
                    }
                  >
                    {INCOME_MONTH_OPTIONS.map((months) => (
                      <option key={months} value={months}>
                        {months} months
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={styles.inputLabel}>Estimated Treatment Cost</label>
                  <select
                    className={styles.selectField}
                    value={state.assumptions.ciTreatmentCost}
                    onChange={(event) =>
                      setAssumptionField('ciTreatmentCost', toNumber(event.target.value))
                    }
                  >
                    {TREATMENT_COST_OPTIONS.map((cost) => (
                      <option key={cost} value={cost}>
                        {formatCurrency(cost)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.statRow}>
                <article className={`${styles.statCard} ${styles.needCard}`}>
                  <div className={styles.statLabel}>I Need</div>
                  <div className={styles.statValue}>
                    {formatCurrency(criticalIllnessNeed?.need ?? 0)}
                  </div>
                </article>

                <article className={`${styles.statCard} ${styles.haveCard}`}>
                  <div className={styles.statLabel}>I Have</div>
                  <div className={styles.statValue}>
                    {formatCurrency(criticalIllnessNeed?.have ?? 0)}
                  </div>
                </article>

                <article className={`${styles.statCard} ${styles.gapCard}`}>
                  <div className={styles.statLabel}>My Gap</div>
                  <div className={`${styles.statValue} ${styles.gapValue}`}>
                    {formatCurrency(criticalIllnessNeed?.gap ?? 0)}
                  </div>
                </article>
              </div>
            </section>
          </div>
        </section>
      }
    />
  );
}
