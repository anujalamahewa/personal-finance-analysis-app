export type FinanceRouteId =
  | 'welcome'
  | 'overview'
  | 'dreams'
  | 'income'
  | 'risks'
  | 'profile'
  | 'needs'
  | 'retirement'
  | 'life-cover'
  | 'medical-critical-illness'
  | 'prioritise-your-needs'
  | 'financial-gap-report'
  | 'generate-report';

export interface FinanceRoute {
  id: FinanceRouteId;
  title: string;
  path: string;
  shortLabel: string;
}

export const financeRoutes: FinanceRoute[] = [
  { id: 'welcome', title: 'Welcome', path: '/welcome', shortLabel: 'Welcome' },
  {
    id: 'overview',
    title: 'Overview',
    path: '/overview',
    shortLabel: 'Overview',
  },
  {
    id: 'dreams',
    title: 'Dreams = Wealth',
    path: '/dreams',
    shortLabel: 'Dreams',
  },
  {
    id: 'income',
    title: 'The Income Cycle',
    path: '/income',
    shortLabel: 'Income',
  },
  {
    id: 'risks',
    title: 'Three Critical Risks',
    path: '/risks',
    shortLabel: 'Risks',
  },
  {
    id: 'profile',
    title: 'Client Profile',
    path: '/profile',
    shortLabel: 'Profile',
  },
  {
    id: 'needs',
    title: 'Four Major Needs',
    path: '/needs',
    shortLabel: 'Needs',
  },
  {
    id: 'retirement',
    title: 'Retirement Calculator',
    path: '/retirement-calculator',
    shortLabel: 'Retirement Calculator',
  },
  {
    id: 'life-cover',
    title: 'Life Cover Calculator',
    path: '/life-cover',
    shortLabel: 'Life Cover Calculator',
  },
  {
    id: 'medical-critical-illness',
    title: 'Medical Calculator',
    path: '/medical-critical-illness',
    shortLabel: 'Medical Calculator',
  },
  {
    id: 'prioritise-your-needs',
    title: 'Priority Needs',
    path: '/prioritise-your-needs',
    shortLabel: 'Priority',
  },
  {
    id: 'financial-gap-report',
    title: 'Gap Summary',
    path: '/financial-gap-report',
    shortLabel: 'Summary',
  },
  {
    id: 'generate-report',
    title: 'Generate Report',
    path: '/generate-report',
    shortLabel: 'Report',
  },
];

export function getRouteIndex(routeId: FinanceRouteId): number {
  return financeRoutes.findIndex((route) => route.id === routeId);
}

export function getRouteById(routeId: FinanceRouteId) {
  return financeRoutes.find((route) => route.id === routeId);
}
