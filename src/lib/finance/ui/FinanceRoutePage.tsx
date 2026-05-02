"use client";

import Link from "next/link";
import { type ReactNode, useEffect, useMemo } from "react";
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
  customBody?: ReactNode;
};

function toNumber(value: string): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export default function FinanceRoutePage({ routeId, customBody }: FinanceRoutePageProps) {
  const isWelcomeRoute = routeId === "welcome";
  const route = getRouteById(routeId);
  const routeIndex = getRouteIndex(routeId);
  const prevRoute = routeIndex > 0 ? financeRoutes[routeIndex - 1] : null;
  const nextRoute = routeIndex < financeRoutes.length - 1 ? financeRoutes[routeIndex + 1] : null;
  const {
    state,
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

  useEffect(() => {
    setLastRoute(routeId);
  }, [routeId]);

  const body =
    customBody !== undefined
      ? customBody
      : (() => {
          switch (routeId) {
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
    <div className={`${styles.shell} ${isWelcomeRoute ? styles.shellWelcome : ""}`}>
      {!isWelcomeRoute && (
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
      )}

      <main className={`${styles.main} ${isWelcomeRoute ? styles.mainWelcome : ""}`}>
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
