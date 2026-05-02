"use client";

import { useMemo } from "react";
import FinanceRoutePage from "@/lib/finance/ui/FinanceRoutePage";
import { useFinance } from "@/lib/finance/ui/FinanceProvider";
import { formatCurrency } from "@/lib/finance/calculations";
import styles from "./page.module.css";

function toNumber(value: string): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

const INCOME_MONTH_OPTIONS = [12, 24, 36, 48, 60];
const TREATMENT_COST_OPTIONS = [1_000_000, 2_000_000, 3_000_000, 4_000_000, 5_000_000];

export default function MedicalCriticalIllnessPage() {
  const { state, computed, setProfileField, setAssumptionField } = useFinance();

  const needsByKey = useMemo(() => {
    const map = new Map(computed.needs.map((need) => [need.key, need]));
    return map;
  }, [computed.needs]);

  const age = state.profile.age;
  const familyMembers = computed.familyMembers;
  const perPersonMedicalCover = age < 40 ? 1_500_000 : age < 55 ? 2_000_000 : 3_000_000;

  const medicalNeed = needsByKey.get("medical");
  const criticalIllnessNeed = needsByKey.get("criticalIllness");

  return (
    <FinanceRoutePage
      routeId="medical-critical-illness"
      customBody={
        <section className={styles.pageWrap}>
          <div className={styles.headerRow}>
            <span className={styles.stepBadge}>04</span>
            <h1 className={styles.pageTitle}>Medical and Critical Illness Calculator</h1>
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
                  onChange={(event) => setProfileField("age", toNumber(event.target.value))}
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

            <article className={`${styles.coverCard} ${styles.medicalCard}`}>
              <div className={styles.coverLabel}>Annual Medical Cover Required</div>
              <div className={styles.coverValue}>{formatCurrency(medicalNeed?.need ?? 0)}</div>
              <div className={styles.coverMeta}>
                {formatCurrency(perPersonMedicalCover)} per person x {familyMembers} members
              </div>
            </article>

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
                    setAssumptionField("ciIncomeMonths", toNumber(event.target.value))
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
                    setAssumptionField("ciTreatmentCost", toNumber(event.target.value))
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

            <article className={`${styles.coverCard} ${styles.criticalIllnessCard}`}>
              <div className={styles.coverLabel}>Critical Illness Cover Required</div>
              <div className={styles.coverValue}>{formatCurrency(criticalIllnessNeed?.need ?? 0)}</div>
            </article>

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
        </section>
      }
    />
  );
}