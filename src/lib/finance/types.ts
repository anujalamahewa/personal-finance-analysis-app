export type NeedKey =
  | "retirement"
  | "life"
  | "disability"
  | "education"
  | "medical"
  | "criticalIllness";

export type LifeCoverageMode = "hlv" | "years";

export interface ChildProfile {
  id: string;
  name: string;
  age: number;
  universityAge: number;
  currentEducationCost: number;
}

export interface ClientProfile {
  fullName: string;
  dateOfBirth: string;
  age: number;
  retirementAge: number;
  occupation: string;
  spouseName: string;
  monthlyIncome: number;
  monthlyExpenses: number;
  monthlySavings: number;
  outstandingLoans: number;
}

export interface ExistingCoverage {
  life: number;
  disability: number;
  criticalIllness: number;
  medical: number;
  retirement: number;
  education: number;
}

export interface PlanningAssumptions {
  retirementExpenseRatio: number;
  inflationRate: number;
  investmentReturnRate: number;
  lifeExpectancy: number;
  lifeReplacementRatio: number;
  lifeCoverageMode: LifeCoverageMode;
  lifeCoverageYears: number;
  lifeFdRate: number;
  disabilityReplacementRatio: number;
  educationInflationRate: number;
  educationInvestmentReturnRate: number;
  ciIncomeMonths: number;
  ciTreatmentCost: number;
}

export interface NeedResult {
  key: NeedKey;
  label: string;
  need: number;
  have: number;
  gap: number;
}

export interface RetirementResult {
  monthlyNeedAtRetirement: number;
  retirementPeriodYears: number;
  corpusNeeded: number;
  monthlySavingsRequired: number;
}

export interface EducationResult {
  totalNeed: number;
  totalGap: number;
  totalMonthlyRequired: number;
  childBreakdown: Array<{
    childId: string;
    childName: string;
    yearsToUniversity: number;
    futureCost: number;
    allocatedExistingFund: number;
    gap: number;
    monthlyRequired: number;
  }>;
}

export interface FinanceState {
  profile: ClientProfile;
  children: ChildProfile[];
  coverage: ExistingCoverage;
  assumptions: PlanningAssumptions;
  priorities: NeedKey[];
}

export interface FinanceComputed {
  yearsToRetirement: number;
  familyMembers: number;
  retirement: RetirementResult;
  education: EducationResult;
  needs: NeedResult[];
  totalGap: number;
}
