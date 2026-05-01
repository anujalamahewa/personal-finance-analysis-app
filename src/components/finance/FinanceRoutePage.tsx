"use client";

import Link from "next/link";
import { useEffect, useMemo } from "react";
import { computeFinance, formatCurrency } from "@/lib/finance/calculations";
import {
  financeRoutes,
  getRouteById,
  getRouteIndex,
  type FinanceRouteId,
} from "@/lib/finance/routes";
import { type NeedKey } from "@/lib/finance/types";
import { useFinance } from "./FinanceProvider";
import styles from "./FinanceRoutePage.module.css";

type FinanceRoutePageProps = {
  routeId: FinanceRouteId;
};

function toNumber(value: string): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export default function FinanceRoutePage({ routeId }: FinanceRoutePageProps) {
  const route = getRouteById(routeId);
  const routeIndex = getRouteIndex(routeId);
  const prevRoute = routeIndex > 0 ? financeRoutes[routeIndex - 1] : null;
  const nextRoute = routeIndex < financeRoutes.length - 1 ? financeRoutes[routeIndex + 1] : null;
  const {
    state,
    ui,
    computed,
    setProfileField,
    setCoverageField,
    setAssumptionField,
    addChild,
    updateChild,
    removeChild,
    movePriorityUp,
    movePriorityDown,
    setLastRoute,
    setRiskStep,
    resetAll,
  } = useFinance();

  const needsByKey = useMemo(() => {
    const map = new Map<NeedKey, (typeof computed.needs)[number]>();
    computed.needs.forEach((need) => {
      map.set(need.key, need);
    });
    return map;
  }, [computed.needs]);

  const sortedPriorityNeeds = useMemo(() => {
    return state.priorities
      .map((key) => needsByKey.get(key))
      .filter((need): need is NonNullable<typeof need> => Boolean(need));
  }, [state.priorities, needsByKey]);

  const threeRisks = [
    {
      title: "Death",
      icon: "💀",
      body: "Income stops immediately and your family relies on what is already planned.",
    },
    {
      title: "Disease",
      icon: "🦠",
      body: "Critical illness can remove earning capacity while treatment costs rise.",
    },
    {
      title: "Disability",
      icon: "♿",
      body: "Permanent disability can wipe out future earnings while expenses continue.",
    },
  ];

  const riskStep = Math.min(threeRisks.length - 1, Math.max(0, ui.riskStep));
  const currentRisk = threeRisks[riskStep];

  useEffect(() => {
    setLastRoute(routeId);
  }, [routeId]);

  const body = (() => {
    switch (routeId) {
      case "welcome":
        return (
          <>
            <div className={styles.heroLabel}>Financial Planning Session</div>
            <h1 className={styles.heroTitle}>Designing Your Financial Future</h1>
            <p className={styles.heroBody}>
              This experience walks through every major need area, quantifies the gap between
              required and existing cover, and helps you prioritize action with real numbers.
            </p>
            <div className={styles.grid2}>
              <div className={styles.statCard}>
                <div className={styles.statValue}>{formatCurrency(computed.totalGap)}</div>
                <div className={styles.statLabel}>Current total protection gap across all needs.</div>
              </div>
              <div className={styles.card}>
                <div className={styles.cardTitle}>What You Get</div>
                <p className={styles.cardMuted}>
                  A guided profile, retirement and protection calculations, education and medical
                  projections, then a clear priority order and report-ready summary.
                </p>
              </div>
            </div>
          </>
        );

      case "discussion-design":
        return (
          <>
            <div className={styles.heroLabel}>How This Is Structured</div>
            <h1 className={styles.heroTitle}>Discussion Design</h1>
            <div className={styles.grid3}>
              <div className={styles.card}>
                <div className={styles.cardTitle}>Phase 01</div>
                <p className={styles.cardMuted}>
                  Need identification across retirement, protection, education, and medical risks.
                </p>
              </div>
              <div className={styles.card}>
                <div className={styles.cardTitle}>Phase 02</div>
                <p className={styles.cardMuted}>
                  Gap analysis comparing required cover with your current financial position.
                </p>
              </div>
              <div className={styles.card}>
                <div className={styles.cardTitle}>Phase 03</div>
                <p className={styles.cardMuted}>
                  Priority and solution design that can be implemented in a realistic sequence.
                </p>
              </div>
            </div>
          </>
        );

      case "dreams-and-wealth":
        return (
          <>
            <div className={styles.heroLabel}>Financial Life Cycle</div>
            <h1 className={styles.heroTitle}>Dreams = Wealth</h1>
            <p className={styles.heroBody}>
              Every life milestone has a cost. The objective is to ensure wealth growth is strong
              enough to fund each phase without creating debt pressure.
            </p>
            <div className={styles.grid4}>
              <div className={styles.card}>
                <div className={styles.cardTitle}>0-20</div>
                <p className={styles.cardMuted}>Foundation years and family-supported expenses.</p>
              </div>
              <div className={styles.card}>
                <div className={styles.cardTitle}>20-40</div>
                <p className={styles.cardMuted}>Income starts, responsibilities grow quickly.</p>
              </div>
              <div className={styles.card}>
                <div className={styles.cardTitle}>40-60</div>
                <p className={styles.cardMuted}>Peak earnings with peak obligations.</p>
              </div>
              <div className={styles.card}>
                <div className={styles.cardTitle}>60+</div>
                <p className={styles.cardMuted}>Retirement years requiring stored wealth.</p>
              </div>
            </div>
          </>
        );

      case "income-cycle":
        return (
          <>
            <div className={styles.heroLabel}>The Financial Reality</div>
            <h1 className={styles.heroTitle}>The Income Cycle</h1>
            <div className={styles.grid2}>
              <div className={styles.statCard}>
                <div className={styles.statValue}>50%</div>
                <div className={styles.statLabel}>
                  Half of life often has no active income, so planning must fund non-working years.
                </div>
              </div>
              <div className={styles.card}>
                <div className={styles.cardTitle}>What This Means</div>
                <p className={styles.cardMuted}>
                  You earn for a limited window, but spend for much longer. Long-term funds and
                  protection are not optional if lifestyle continuity matters.
                </p>
              </div>
            </div>
          </>
        );

      case "three-critical-risks":
        return (
          <>
            <div className={styles.heroLabel}>Key Risk Events</div>
            <h1 className={styles.heroTitle}>Three Events That Break Plans</h1>
            <div className={styles.card}>
              <div className={styles.cardTitle}>
                {currentRisk.icon} {currentRisk.title}
              </div>
              <p className={styles.cardMuted}>{currentRisk.body}</p>
              <div className={styles.rowActions} style={{ marginTop: 12 }}>
                <button
                  className={styles.btn}
                  onClick={() => setRiskStep(riskStep - 1)}
                >
                  Previous
                </button>
                <button
                  className={`${styles.btn} ${styles.btnPrimary}`}
                  onClick={() => setRiskStep(riskStep + 1)}
                >
                  Next Risk
                </button>
              </div>
            </div>
          </>
        );

      case "client-profile":
        return (
          <>
            <div className={styles.heroLabel}>Step 1</div>
            <h1 className={styles.heroTitle}>Client Profile</h1>
            <div className={styles.formGrid}>
              <div>
                <label className={styles.label}>Full Name</label>
                <input
                  className={styles.input}
                  value={state.profile.fullName}
                  onChange={(event) => setProfileField("fullName", event.target.value)}
                />
              </div>
              <div>
                <label className={styles.label}>Occupation</label>
                <input
                  className={styles.input}
                  value={state.profile.occupation}
                  onChange={(event) => setProfileField("occupation", event.target.value)}
                />
              </div>
              <div>
                <label className={styles.label}>Date of Birth</label>
                <input
                  type="date"
                  className={styles.input}
                  value={state.profile.dateOfBirth}
                  onChange={(event) => {
                    const dob = event.target.value;
                    setProfileField("dateOfBirth", dob);
                    if (dob) {
                      const birthDate = new Date(dob);
                      const age = Math.floor(
                        (Date.now() - birthDate.getTime()) / (365.25 * 24 * 3600 * 1000)
                      );
                      setProfileField("age", Math.max(0, age));
                    }
                  }}
                />
              </div>
              <div>
                <label className={styles.label}>Current Age</label>
                <input
                  type="number"
                  min={0}
                  className={styles.input}
                  value={state.profile.age}
                  onChange={(event) => setProfileField("age", toNumber(event.target.value))}
                />
              </div>
              <div>
                <label className={styles.label}>Target Retirement Age</label>
                <input
                  type="number"
                  min={45}
                  className={styles.input}
                  value={state.profile.retirementAge}
                  onChange={(event) =>
                    setProfileField("retirementAge", toNumber(event.target.value))
                  }
                />
              </div>
              <div>
                <label className={styles.label}>Spouse or Partner Name</label>
                <input
                  className={styles.input}
                  value={state.profile.spouseName}
                  onChange={(event) => setProfileField("spouseName", event.target.value)}
                />
              </div>
              <div>
                <label className={styles.label}>Monthly Income (LKR)</label>
                <input
                  type="number"
                  min={0}
                  className={styles.input}
                  value={state.profile.monthlyIncome}
                  onChange={(event) =>
                    setProfileField("monthlyIncome", toNumber(event.target.value))
                  }
                />
              </div>
              <div>
                <label className={styles.label}>Monthly Expenses (LKR)</label>
                <input
                  type="number"
                  min={0}
                  className={styles.input}
                  value={state.profile.monthlyExpenses}
                  onChange={(event) =>
                    setProfileField("monthlyExpenses", toNumber(event.target.value))
                  }
                />
              </div>
              <div>
                <label className={styles.label}>Monthly Savings (LKR)</label>
                <input
                  type="number"
                  min={0}
                  className={styles.input}
                  value={state.profile.monthlySavings}
                  onChange={(event) =>
                    setProfileField("monthlySavings", toNumber(event.target.value))
                  }
                />
              </div>
              <div>
                <label className={styles.label}>Outstanding Loans (LKR)</label>
                <input
                  type="number"
                  min={0}
                  className={styles.input}
                  value={state.profile.outstandingLoans}
                  onChange={(event) =>
                    setProfileField("outstandingLoans", toNumber(event.target.value))
                  }
                />
              </div>
            </div>

            <h2 className={styles.sectionTitle}>Children</h2>
            <div className={styles.rowActions}>
              <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={addChild}>
                Add Child
              </button>
              <span className={styles.badge}>Family members: {computed.familyMembers}</span>
            </div>
            <div className={styles.childrenWrap}>
              {state.children.length === 0 && (
                <div className={styles.cardMuted}>No children added yet.</div>
              )}
              {state.children.map((child, index) => (
                <div key={child.id} className={styles.childRow}>
                  <div className={styles.childHeader}>
                    <div className={styles.childTitle}>Child {index + 1}</div>
                    <button className={styles.btn} onClick={() => removeChild(child.id)}>
                      Remove
                    </button>
                  </div>
                  <div className={styles.formGrid}>
                    <div>
                      <label className={styles.label}>Name</label>
                      <input
                        className={styles.input}
                        value={child.name}
                        onChange={(event) =>
                          updateChild(child.id, "name", event.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label className={styles.label}>Age</label>
                      <input
                        type="number"
                        min={0}
                        className={styles.input}
                        value={child.age}
                        onChange={(event) =>
                          updateChild(child.id, "age", toNumber(event.target.value))
                        }
                      />
                    </div>
                    <div>
                      <label className={styles.label}>University Age</label>
                      <input
                        type="number"
                        min={15}
                        className={styles.input}
                        value={child.universityAge}
                        onChange={(event) =>
                          updateChild(child.id, "universityAge", toNumber(event.target.value))
                        }
                      />
                    </div>
                    <div>
                      <label className={styles.label}>Education Cost Today (LKR)</label>
                      <input
                        type="number"
                        min={0}
                        className={styles.input}
                        value={child.currentEducationCost}
                        onChange={(event) =>
                          updateChild(child.id, "currentEducationCost", toNumber(event.target.value))
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <h2 className={styles.sectionTitle}>Existing Coverage</h2>
            <div className={styles.formGrid}>
              <div>
                <label className={styles.label}>Life Cover</label>
                <input
                  type="number"
                  min={0}
                  className={styles.input}
                  value={state.coverage.life}
                  onChange={(event) => setCoverageField("life", toNumber(event.target.value))}
                />
              </div>
              <div>
                <label className={styles.label}>Disability Cover</label>
                <input
                  type="number"
                  min={0}
                  className={styles.input}
                  value={state.coverage.disability}
                  onChange={(event) =>
                    setCoverageField("disability", toNumber(event.target.value))
                  }
                />
              </div>
              <div>
                <label className={styles.label}>Critical Illness Cover</label>
                <input
                  type="number"
                  min={0}
                  className={styles.input}
                  value={state.coverage.criticalIllness}
                  onChange={(event) =>
                    setCoverageField("criticalIllness", toNumber(event.target.value))
                  }
                />
              </div>
              <div>
                <label className={styles.label}>Medical Cover</label>
                <input
                  type="number"
                  min={0}
                  className={styles.input}
                  value={state.coverage.medical}
                  onChange={(event) =>
                    setCoverageField("medical", toNumber(event.target.value))
                  }
                />
              </div>
              <div>
                <label className={styles.label}>Retirement Fund</label>
                <input
                  type="number"
                  min={0}
                  className={styles.input}
                  value={state.coverage.retirement}
                  onChange={(event) =>
                    setCoverageField("retirement", toNumber(event.target.value))
                  }
                />
              </div>
              <div>
                <label className={styles.label}>Education Savings</label>
                <input
                  type="number"
                  min={0}
                  className={styles.input}
                  value={state.coverage.education}
                  onChange={(event) =>
                    setCoverageField("education", toNumber(event.target.value))
                  }
                />
              </div>
            </div>
          </>
        );

      case "four-major-needs":
        return (
          <>
            <div className={styles.heroLabel}>Before Calculation</div>
            <h1 className={styles.heroTitle}>The Four Major Need Areas</h1>
            <div className={styles.grid4}>
              <div className={styles.card}>
                <div className={styles.cardTitle}>💰 Happy Retirement</div>
                <p className={styles.cardMuted}>Income replacement for non-working years.</p>
              </div>
              <div className={styles.card}>
                <div className={styles.cardTitle}>👨‍👩‍👧 Family Protection</div>
                <p className={styles.cardMuted}>Lifestyle security if income stops unexpectedly.</p>
              </div>
              <div className={styles.card}>
                <div className={styles.cardTitle}>🎓 Education Fund</div>
                <p className={styles.cardMuted}>Future-ready funding for higher education costs.</p>
              </div>
              <div className={styles.card}>
                <div className={styles.cardTitle}>🏥 Medical Emergency</div>
                <p className={styles.cardMuted}>Protection against large treatment and hospitalization bills.</p>
              </div>
            </div>
          </>
        );

      case "retirement-planning":
        return (
          <>
            <div className={styles.heroLabel}>Need 01</div>
            <h1 className={styles.heroTitle}>Retirement Planning</h1>
            <div className={styles.formGrid}>
              <div>
                <label className={styles.label}>Retirement Expense Ratio</label>
                <input
                  type="number"
                  min={0.4}
                  max={1.2}
                  step={0.05}
                  className={styles.input}
                  value={state.assumptions.retirementExpenseRatio}
                  onChange={(event) =>
                    setAssumptionField("retirementExpenseRatio", toNumber(event.target.value))
                  }
                />
              </div>
              <div>
                <label className={styles.label}>Inflation Rate (%)</label>
                <input
                  type="number"
                  min={0}
                  className={styles.input}
                  value={state.assumptions.inflationRate}
                  onChange={(event) =>
                    setAssumptionField("inflationRate", toNumber(event.target.value))
                  }
                />
              </div>
              <div>
                <label className={styles.label}>Investment Return (%)</label>
                <input
                  type="number"
                  min={0}
                  className={styles.input}
                  value={state.assumptions.investmentReturnRate}
                  onChange={(event) =>
                    setAssumptionField("investmentReturnRate", toNumber(event.target.value))
                  }
                />
              </div>
              <div>
                <label className={styles.label}>Life Expectancy</label>
                <input
                  type="number"
                  min={65}
                  className={styles.input}
                  value={state.assumptions.lifeExpectancy}
                  onChange={(event) =>
                    setAssumptionField("lifeExpectancy", toNumber(event.target.value))
                  }
                />
              </div>
            </div>

            <div className={styles.kpiGrid}>
              <div className={styles.kpiItem}>
                <div className={styles.kpiLabel}>Monthly Need at Retirement</div>
                <div className={`${styles.kpiValue} ${styles.kpiNeed}`}>
                  {formatCurrency(computed.retirement.monthlyNeedAtRetirement)}
                </div>
              </div>
              <div className={styles.kpiItem}>
                <div className={styles.kpiLabel}>Corpus Needed</div>
                <div className={`${styles.kpiValue} ${styles.kpiNeed}`}>
                  {formatCurrency(computed.retirement.corpusNeeded)}
                </div>
              </div>
              <div className={styles.kpiItem}>
                <div className={styles.kpiLabel}>Monthly Savings Required</div>
                <div className={`${styles.kpiValue} ${styles.kpiGap}`}>
                  {formatCurrency(computed.retirement.monthlySavingsRequired)}
                </div>
              </div>
            </div>
          </>
        );

      case "income-protection": {
        const lifeNeed = needsByKey.get("life");
        const disabilityNeed = needsByKey.get("disability");
        return (
          <>
            <div className={styles.heroLabel}>Need 02</div>
            <h1 className={styles.heroTitle}>Income Protection</h1>
            <div className={styles.formGrid}>
              <div>
                <label className={styles.label}>Life Replacement Ratio</label>
                <input
                  type="number"
                  min={0.5}
                  max={1}
                  step={0.05}
                  className={styles.input}
                  value={state.assumptions.lifeReplacementRatio}
                  onChange={(event) =>
                    setAssumptionField("lifeReplacementRatio", toNumber(event.target.value))
                  }
                />
              </div>
              <div>
                <label className={styles.label}>Coverage Method</label>
                <select
                  className={styles.select}
                  value={state.assumptions.lifeCoverageMode}
                  onChange={(event) =>
                    setAssumptionField("lifeCoverageMode", event.target.value as "hlv" | "years")
                  }
                >
                  <option value="hlv">HLV (lump sum return model)</option>
                  <option value="years">Fixed years of income</option>
                </select>
              </div>
              {state.assumptions.lifeCoverageMode === "years" && (
                <div>
                  <label className={styles.label}>Coverage Years</label>
                  <input
                    type="number"
                    min={1}
                    max={30}
                    className={styles.input}
                    value={state.assumptions.lifeCoverageYears}
                    onChange={(event) =>
                      setAssumptionField("lifeCoverageYears", toNumber(event.target.value))
                    }
                  />
                </div>
              )}
              {state.assumptions.lifeCoverageMode === "hlv" && (
                <div>
                  <label className={styles.label}>Expected Lump Sum Return (%)</label>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    className={styles.input}
                    value={state.assumptions.lifeFdRate}
                    onChange={(event) =>
                      setAssumptionField("lifeFdRate", toNumber(event.target.value))
                    }
                  />
                </div>
              )}
              <div>
                <label className={styles.label}>Disability Replacement Ratio</label>
                <input
                  type="number"
                  min={0.4}
                  max={0.8}
                  step={0.05}
                  className={styles.input}
                  value={state.assumptions.disabilityReplacementRatio}
                  onChange={(event) =>
                    setAssumptionField("disabilityReplacementRatio", toNumber(event.target.value))
                  }
                />
              </div>
            </div>

            <div className={styles.kpiGrid}>
              <div className={styles.kpiItem}>
                <div className={styles.kpiLabel}>Life Cover Need</div>
                <div className={`${styles.kpiValue} ${styles.kpiNeed}`}>
                  {formatCurrency(lifeNeed?.need ?? 0)}
                </div>
              </div>
              <div className={styles.kpiItem}>
                <div className={styles.kpiLabel}>Life Gap</div>
                <div className={`${styles.kpiValue} ${styles.kpiGap}`}>
                  {formatCurrency(lifeNeed?.gap ?? 0)}
                </div>
              </div>
              <div className={styles.kpiItem}>
                <div className={styles.kpiLabel}>Disability Gap</div>
                <div className={`${styles.kpiValue} ${styles.kpiGap}`}>
                  {formatCurrency(disabilityNeed?.gap ?? 0)}
                </div>
              </div>
            </div>
          </>
        );
      }

      case "education-fund":
        return (
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
                    setAssumptionField("educationInflationRate", toNumber(event.target.value))
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
                    setAssumptionField("educationInvestmentReturnRate", toNumber(event.target.value))
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
        );

      case "medical-critical-illness": {
        const medical = needsByKey.get("medical");
        const ci = needsByKey.get("criticalIllness");
        return (
          <>
            <div className={styles.heroLabel}>Need 04</div>
            <h1 className={styles.heroTitle}>Medical and Critical Illness</h1>
            <div className={styles.formGrid}>
              <div>
                <label className={styles.label}>CI Income Replacement (Months)</label>
                <input
                  type="number"
                  min={6}
                  className={styles.input}
                  value={state.assumptions.ciIncomeMonths}
                  onChange={(event) =>
                    setAssumptionField("ciIncomeMonths", toNumber(event.target.value))
                  }
                />
              </div>
              <div>
                <label className={styles.label}>CI Treatment Cost (LKR)</label>
                <input
                  type="number"
                  min={0}
                  className={styles.input}
                  value={state.assumptions.ciTreatmentCost}
                  onChange={(event) =>
                    setAssumptionField("ciTreatmentCost", toNumber(event.target.value))
                  }
                />
              </div>
            </div>
            <div className={styles.kpiGrid}>
              <div className={styles.kpiItem}>
                <div className={styles.kpiLabel}>Medical Cover Need</div>
                <div className={`${styles.kpiValue} ${styles.kpiNeed}`}>
                  {formatCurrency(medical?.need ?? 0)}
                </div>
              </div>
              <div className={styles.kpiItem}>
                <div className={styles.kpiLabel}>Medical Gap</div>
                <div className={`${styles.kpiValue} ${styles.kpiGap}`}>
                  {formatCurrency(medical?.gap ?? 0)}
                </div>
              </div>
              <div className={styles.kpiItem}>
                <div className={styles.kpiLabel}>Critical Illness Gap</div>
                <div className={`${styles.kpiValue} ${styles.kpiGap}`}>
                  {formatCurrency(ci?.gap ?? 0)}
                </div>
              </div>
            </div>
          </>
        );
      }

      case "priority-needs":
        return (
          <>
            <div className={styles.heroLabel}>Priority Ordering</div>
            <h1 className={styles.heroTitle}>Rank Your Needs</h1>
            <p className={styles.heroBody}>
              Move each need up or down. This order drives what gets solved first in the final
              recommendation.
            </p>
            <div className={styles.priorityList}>
              {sortedPriorityNeeds.map((need, index) => (
                <div key={need.key} className={styles.priorityItem}>
                  <div>
                    <div className={styles.priorityName}>
                      {index + 1}. {need.label}
                    </div>
                    <div className={styles.cardMuted}>Gap: {formatCurrency(need.gap)}</div>
                  </div>
                  <div className={styles.rowActions}>
                    <button className={styles.btn} onClick={() => movePriorityUp(need.key)}>
                      Up
                    </button>
                    <button className={styles.btn} onClick={() => movePriorityDown(need.key)}>
                      Down
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        );

      case "gap-summary":
        return (
          <>
            <div className={styles.heroLabel}>Need Analysis Summary</div>
            <h1 className={styles.heroTitle}>Financial Gap Report</h1>
            <div className={styles.badge}>Total gap: {formatCurrency(computed.totalGap)}</div>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Need Area</th>
                    <th>Required</th>
                    <th>Have</th>
                    <th>Gap</th>
                    <th>Coverage</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedPriorityNeeds.map((need) => {
                    const coveragePct = need.need > 0 ? (need.have / need.need) * 100 : 0;
                    return (
                      <tr key={need.key}>
                        <td>{need.label}</td>
                        <td>{formatCurrency(need.need)}</td>
                        <td>{formatCurrency(need.have)}</td>
                        <td>{need.gap > 0 ? formatCurrency(need.gap) : "Covered"}</td>
                        <td>{Math.min(100, Math.max(0, coveragePct)).toFixed(0)}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        );

      case "report-ready":
        return (
          <>
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
            <div className={styles.rowActions} style={{ marginTop: 14 }}>
              <button className={styles.btn} onClick={resetAll}>
                Reset all data
              </button>
            </div>
          </>
        );

      default:
        return (
          <>
            <div className={styles.heroLabel}>Financial Analysis</div>
            <h1 className={styles.heroTitle}>{route?.title ?? "Page"}</h1>
          </>
        );
    }
  })();

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.titleRow}>
            <div className={styles.appTitle}>Personal Financial Analysis</div>
            <div className={styles.progress}>
              Step {routeIndex + 1} / {financeRoutes.length}
            </div>
          </div>
          <nav className={styles.routeMenu}>
            {financeRoutes.map((routeOption) => (
              <Link
                key={routeOption.id}
                href={routeOption.path}
                className={`${styles.routeLink} ${
                  routeOption.id === routeId ? styles.routeLinkActive : ""
                }`}
              >
                {routeOption.shortLabel}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className={styles.main}>
        {body}

        <div className={styles.navRow}>
          <div className={styles.navGroup}>
            {prevRoute ? (
              <Link href={prevRoute.path} className={styles.navLink}>
                Back: {prevRoute.shortLabel}
              </Link>
            ) : (
              <span />
            )}
          </div>
          <div className={styles.navGroup}>
            {nextRoute ? (
              <Link
                href={nextRoute.path}
                className={`${styles.navLink} ${styles.navLinkPrimary}`}
              >
                Next: {nextRoute.shortLabel}
              </Link>
            ) : (
              <span className={styles.badge}>End of Journey</span>
            )}
          </div>
        </div>

        <div className={styles.mobileNavSpacer} aria-hidden="true" />
      </main>

      <div className={styles.mobileNav} aria-label="Mobile page navigation">
        {prevRoute ? (
          <Link href={prevRoute.path} className={`${styles.mobileNavLink} ${styles.mobileNavBack}`}>
            Back
          </Link>
        ) : (
          <span className={`${styles.mobileNavLink} ${styles.mobileNavMuted}`}>Start</span>
        )}

        <div className={styles.mobileNavStep}>
          {routeIndex + 1}/{financeRoutes.length}
        </div>

        {nextRoute ? (
          <Link href={nextRoute.path} className={`${styles.mobileNavLink} ${styles.mobileNavNext}`}>
            Next
          </Link>
        ) : (
          <span className={`${styles.mobileNavLink} ${styles.mobileNavMuted}`}>Done</span>
        )}
      </div>
    </div>
  );
}
