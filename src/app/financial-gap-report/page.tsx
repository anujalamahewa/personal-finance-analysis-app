"use client";

import { useMemo } from "react";
import FinanceRoutePage from "@/lib/finance/ui/FinanceRoutePage";
import { useFinance } from "@/lib/finance/ui/FinanceProvider";
import { formatCurrency } from "@/lib/finance/calculations";
import { type NeedKey } from "@/lib/finance/types";
import styles from "./page.module.css";

export default function FinancialGapReportPage() {
  const { computed, state } = useFinance();

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

  return (
    <FinanceRoutePage
      routeId="financial-gap-report"
      customBody={
        <section className={styles.pageWrap}>
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
        </section>
      }
    />
  );
}