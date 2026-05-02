export type FinanceRouteId =
  | 'welcome'
  | 'needs-assessment'
  | 'dreams'
  | 'income'
  | 'risks'
  | 'profile'
  | 'needs'
  | 'retirement'
  | 'life-cover'
  | 'education-fund'
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
    id: 'needs-assessment',
    title: 'Needs Assessment',
    path: '/needs-assessment',
    shortLabel: 'Assess',
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
    shortLabel: 'Retirement',
  },
  {
    id: 'life-cover',
    title: 'Life Cover and Disability',
    path: '/life-cover',
    shortLabel: 'Life Cover',
  },
  {
    id: 'education-fund',
    title: 'Education Fund',
    path: '/education-fund',
    shortLabel: 'Education',
  },
  {
    id: 'medical-critical-illness',
    title: 'Medical and Critical Illness',
    path: '/medical-critical-illness',
    shortLabel: 'Medical',
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
