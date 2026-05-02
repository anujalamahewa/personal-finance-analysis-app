import {
  type ChildProfile,
  type EducationResult,
  type FinanceComputed,
  type FinanceState,
  type NeedResult,
  type NeedKey,
  type RetirementResult,
} from './types';

const NEED_LABELS: Record<NeedKey, string> = {
  retirement: 'Happy Retirement',
  life: 'Life Cover (Death/TPD)',
  disability: 'Disability Protection',
  education: 'Higher Education Fund',
  medical: 'Medical Cover',
  criticalIllness: 'Critical Illness Cover',
};

export function formatCurrency(amount: number): string {
  return `LKR ${Math.round(amount).toLocaleString('en-US')}`;
}

function pmt(annualRate: number, months: number, fv: number, pv = 0): number {
  if (months <= 0) {
    return 0;
  }

  const monthlyRate = annualRate / 12 / 100;
  if (monthlyRate === 0) {
    return Math.max(0, (fv - pv) / months);
  }

  const growth = Math.pow(1 + monthlyRate, months);
  return Math.max(0, ((fv - pv * growth) * monthlyRate) / (growth - 1));
}

function yearsToRetirement(age: number, retirementAge: number): number {
  return Math.max(1, retirementAge - age);
}

function familyMembers(children: ChildProfile[], spouseName: string): number {
  return 1 + (spouseName.trim() ? 1 : 0) + children.length;
}

function calcRetirement(state: FinanceState): RetirementResult {
  const expenses = state.profile.monthlyExpenses;
  if (expenses <= 0) {
    return {
      monthlyNeedAtRetirement: 0,
      retirementPeriodYears: 0,
      corpusNeeded: 0,
      monthlySavingsRequired: 0,
    };
  }

  const years = yearsToRetirement(state.profile.age, state.profile.retirementAge);
  const retirementPeriodYears = Math.max(
    5,
    state.assumptions.lifeExpectancy - state.profile.retirementAge,
  );
  const monthlyNeedAtRetirement =
    expenses *
    state.assumptions.retirementExpenseRatio *
    Math.pow(1 + state.assumptions.inflationRate / 100, years);

  const realReturn = Math.max(
    0.005,
    (state.assumptions.investmentReturnRate - state.assumptions.inflationRate) / 100,
  );

  const corpusNeeded =
    monthlyNeedAtRetirement *
    12 *
    ((1 - Math.pow(1 + realReturn, -retirementPeriodYears)) / realReturn);

  const monthlySavingsRequired = pmt(
    state.assumptions.investmentReturnRate,
    years * 12,
    corpusNeeded,
    -state.coverage.retirement,
  );

  return {
    monthlyNeedAtRetirement,
    retirementPeriodYears,
    corpusNeeded,
    monthlySavingsRequired,
  };
}

function calcEducation(state: FinanceState): EducationResult {
  if (state.children.length === 0) {
    return {
      totalNeed: 0,
      totalGap: 0,
      totalMonthlyRequired: 0,
      childBreakdown: [],
    };
  }

  const allocatedPerChild = state.coverage.education / state.children.length;
  const childBreakdown = state.children.map((child) => {
    const years = Math.max(1, child.universityAge - child.age);
    const futureCost =
      child.currentEducationCost *
      Math.pow(1 + state.assumptions.educationInflationRate / 100, years);
    const gap = Math.max(0, futureCost - allocatedPerChild);

    return {
      childId: child.id,
      childName: child.name.trim() || 'Child',
      yearsToUniversity: years,
      futureCost,
      allocatedExistingFund: allocatedPerChild,
      gap,
      monthlyRequired: pmt(
        state.assumptions.educationInvestmentReturnRate,
        years * 12,
        futureCost,
        -allocatedPerChild,
      ),
    };
  });

  return {
    totalNeed: childBreakdown.reduce((sum, child) => sum + child.futureCost, 0),
    totalGap: childBreakdown.reduce((sum, child) => sum + child.gap, 0),
    totalMonthlyRequired: childBreakdown.reduce((sum, child) => sum + child.monthlyRequired, 0),
    childBreakdown,
  };
}

function calcNeedResults(state: FinanceState, education: EducationResult): NeedResult[] {
  const years = yearsToRetirement(state.profile.age, state.profile.retirementAge);
  const retirement = calcRetirement(state);

  const income = state.profile.monthlyIncome;
  const lifeNeed =
    state.assumptions.lifeCoverageMode === 'hlv'
      ? (income * 12 * state.assumptions.lifeReplacementRatio) /
          Math.max(0.01, state.assumptions.lifeFdRate / 100) +
        state.profile.outstandingLoans
      : income * 12 * state.assumptions.lifeReplacementRatio * state.assumptions.lifeCoverageYears +
        state.profile.outstandingLoans;

  const disabilityNeed = income * state.assumptions.disabilityReplacementRatio * 12 * years;

  const members = familyMembers(state.children, state.profile.spouseName);
  const medicalBase =
    state.profile.age < 40 ? 1_500_000 : state.profile.age < 55 ? 2_000_000 : 3_000_000;
  const medicalNeed = medicalBase * members;

  const criticalIllnessNeed =
    income * state.assumptions.ciIncomeMonths + state.assumptions.ciTreatmentCost;

  const needs: NeedResult[] = [
    {
      key: 'retirement',
      label: NEED_LABELS.retirement,
      need: retirement.corpusNeeded,
      have: state.coverage.retirement,
      gap: Math.max(0, retirement.corpusNeeded - state.coverage.retirement),
    },
    {
      key: 'life',
      label: NEED_LABELS.life,
      need: lifeNeed,
      have: state.coverage.life,
      gap: Math.max(0, lifeNeed - state.coverage.life),
    },
    {
      key: 'disability',
      label: NEED_LABELS.disability,
      need: disabilityNeed,
      have: state.coverage.disability,
      gap: Math.max(0, disabilityNeed - state.coverage.disability),
    },
    {
      key: 'education',
      label: NEED_LABELS.education,
      need: education.totalNeed,
      have: state.coverage.education,
      gap: Math.max(0, education.totalNeed - state.coverage.education),
    },
    {
      key: 'medical',
      label: NEED_LABELS.medical,
      need: medicalNeed,
      have: state.coverage.medical,
      gap: Math.max(0, medicalNeed - state.coverage.medical),
    },
    {
      key: 'criticalIllness',
      label: NEED_LABELS.criticalIllness,
      need: criticalIllnessNeed,
      have: state.coverage.criticalIllness,
      gap: Math.max(0, criticalIllnessNeed - state.coverage.criticalIllness),
    },
  ];

  return needs;
}

export function computeFinance(state: FinanceState): FinanceComputed {
  const years = yearsToRetirement(state.profile.age, state.profile.retirementAge);
  const members = familyMembers(state.children, state.profile.spouseName);
  const retirement = calcRetirement(state);
  const education = calcEducation(state);
  const needs = calcNeedResults(state, education);

  return {
    yearsToRetirement: years,
    familyMembers: members,
    retirement,
    education,
    needs,
    totalGap: needs.reduce((sum, need) => sum + need.gap, 0),
  };
}
