export type FinanceRouteId =
  | 'welcome'
  | 'overview'
  | 'goals'
  | 'income'
  | 'risks'
  | 'needs'
  | 'profile'
  | 'retirement'
  | 'life'
  | 'medical'
  | 'priorities'
  | 'summary'
  | 'report';

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
    id: 'goals',
    title: 'Dreams = Wealth',
    path: '/goals',
    shortLabel: 'Goals',
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
    id: 'needs',
    title: 'Four Major Needs',
    path: '/needs',
    shortLabel: 'Needs',
  },
  {
    id: 'profile',
    title: 'Client Profile',
    path: '/profile',
    shortLabel: 'Profile',
  },
  {
    id: 'retirement',
    title: 'Retirement Calculator',
    path: '/retirement',
    shortLabel: 'Retirement',
  },
  {
    id: 'life',
    title: 'Life Cover Calculator',
    path: '/life',
    shortLabel: 'Life',
  },
  {
    id: 'medical',
    title: 'Medical Calculator',
    path: '/medical',
    shortLabel: 'Medical',
  },
  {
    id: 'priorities',
    title: 'Priority Needs',
    path: '/priorities',
    shortLabel: 'Priorities',
  },
  {
    id: 'summary',
    title: 'Gap Summary',
    path: '/summary',
    shortLabel: 'Summary',
  },
  {
    id: 'report',
    title: 'Generate Report',
    path: '/report',
    shortLabel: 'Report',
  },
];

export function getRouteIndex(routeId: FinanceRouteId): number {
  return financeRoutes.findIndex((route) => route.id === routeId);
}

export function getRouteById(routeId: FinanceRouteId) {
  return financeRoutes.find((route) => route.id === routeId);
}
