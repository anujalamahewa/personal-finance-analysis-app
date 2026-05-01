export type FinanceRouteId =
  | "welcome"
  | "discussion-design"
  | "dreams-and-wealth"
  | "income-cycle"
  | "three-critical-risks"
  | "client-profile"
  | "four-major-needs"
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
    id: "dreams-and-wealth",
    title: "Dreams and Wealth",
    path: "/dreams-and-wealth",
    shortLabel: "Life Cycle",
  },
  {
    id: "income-cycle",
    title: "The Income Cycle",
    path: "/income-cycle",
    shortLabel: "Income",
  },
  {
    id: "three-critical-risks",
    title: "Three Critical Risks",
    path: "/three-critical-risks",
    shortLabel: "Risks",
  },
  {
    id: "client-profile",
    title: "Client Profile",
    path: "/client-profile",
    shortLabel: "Profile",
  },
  {
    id: "four-major-needs",
    title: "Four Major Needs",
    path: "/four-major-needs",
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
