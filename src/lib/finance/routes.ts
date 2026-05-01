export type FinanceRouteId =
  | "welcome"
  | "discussion-design"
  | "dreams"
  | "income"
  | "risks"
  | "profile"
  | "needs"
  | "retirement-planning"
  | "income-protection"
  | "education-fund"
  | "medical-critical-illness"
  | "priority-needs"
  | "gap-summary"
  | "report-ready";

export interface FinanceRoute {
  id: FinanceRouteId;
  title: string;
  path: string;
  shortLabel: string;
}

export const financeRoutes: FinanceRoute[] = [
  { id: "welcome", title: "Welcome", path: "/welcome", shortLabel: "Welcome" },
  {
    id: "discussion-design",
    title: "Discussion Design",
    path: "/discussion-design",
    shortLabel: "Design",
  },
  {
    id: "dreams",
    title: "Dreams = Wealth",
    path: "/dreams",
    shortLabel: "Dreams",
  },
  {
    id: "income",
    title: "The Income Cycle",
    path: "/income",
    shortLabel: "Income",
  },
  {
    id: "risks",
    title: "Three Critical Risks",
    path: "/risks",
    shortLabel: "Risks",
  },
  {
    id: "profile",
    title: "Client Profile",
    path: "/profile",
    shortLabel: "Profile",
  },
  {
    id: "needs",
    title: "Four Major Needs",
    path: "/needs",
    shortLabel: "Needs",
  },
  {
    id: "retirement-planning",
    title: "Retirement Planning",
    path: "/retirement-planning",
    shortLabel: "Retirement",
  },
  {
    id: "income-protection",
    title: "Income Protection",
    path: "/income-protection",
    shortLabel: "Protection",
  },
  {
    id: "education-fund",
    title: "Education Fund",
    path: "/education-fund",
    shortLabel: "Education",
  },
  {
    id: "medical-critical-illness",
    title: "Medical and Critical Illness",
    path: "/medical-critical-illness",
    shortLabel: "Medical",
  },
  {
    id: "priority-needs",
    title: "Priority Needs",
    path: "/priority-needs",
    shortLabel: "Priority",
  },
  {
    id: "gap-summary",
    title: "Gap Summary",
    path: "/gap-summary",
    shortLabel: "Summary",
  },
  {
    id: "report-ready",
    title: "Report Ready",
    path: "/report-ready",
    shortLabel: "Report",
  },
];

export function getRouteIndex(routeId: FinanceRouteId): number {
  return financeRoutes.findIndex((route) => route.id === routeId);
}

export function getRouteById(routeId: FinanceRouteId) {
  return financeRoutes.find((route) => route.id === routeId);
}
