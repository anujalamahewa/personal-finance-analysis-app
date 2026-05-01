"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { computeFinance } from "@/lib/finance/calculations";
import {
  type ChildProfile,
  type ExistingCoverage,
  type FinanceState,
  type NeedKey,
  type PlanningAssumptions,
  type ClientProfile,
} from "@/lib/finance/types";
import {
  getRouteById,
  type FinanceRouteId,
} from "@/lib/finance/routes";

const STORAGE_KEY = "personal-finance-analysis-cache-v2";
const LEGACY_STORAGE_KEY = "personal-finance-analysis-state-v1";

const defaultProfile: ClientProfile = {
  fullName: "",
  dateOfBirth: "",
  age: 35,
  retirementAge: 60,
  occupation: "",
  spouseName: "",
  monthlyIncome: 150_000,
  monthlyExpenses: 120_000,
  monthlySavings: 30_000,
  outstandingLoans: 0,
};

const defaultCoverage: ExistingCoverage = {
  life: 0,
  disability: 0,
  criticalIllness: 0,
  medical: 0,
  retirement: 0,
  education: 0,
};

const defaultAssumptions: PlanningAssumptions = {
  retirementExpenseRatio: 0.7,
  inflationRate: 7,
  investmentReturnRate: 10,
  lifeExpectancy: 80,
  lifeReplacementRatio: 0.7,
  lifeCoverageMode: "hlv",
  lifeCoverageYears: 10,
  lifeFdRate: 8,
  disabilityReplacementRatio: 0.65,
  educationInflationRate: 10,
  educationInvestmentReturnRate: 10,
  ciIncomeMonths: 24,
  ciTreatmentCost: 3_000_000,
};

const defaultState: FinanceState = {
  profile: defaultProfile,
  children: [],
  coverage: defaultCoverage,
  assumptions: defaultAssumptions,
  priorities: [
    "retirement",
    "life",
    "education",
    "medical",
    "disability",
    "criticalIllness",
  ],
};

type FinanceUiState = {
  lastRouteId: FinanceRouteId;
  riskStep: number;
};

type PersistedFinanceCache = {
  state: FinanceState;
  ui: FinanceUiState;
};

const defaultUiState: FinanceUiState = {
  lastRouteId: "welcome",
  riskStep: 0,
};

function clampRiskStep(step: number): number {
  if (!Number.isFinite(step)) {
    return defaultUiState.riskStep;
  }

  return Math.min(2, Math.max(0, Math.floor(step)));
}

function createChild(overrides?: Partial<ChildProfile>): ChildProfile {
  const id =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

  return {
    id,
    name: "",
    age: 5,
    universityAge: 18,
    currentEducationCost: 3_000_000,
    ...overrides,
  };
}

function mergeState(raw: Partial<FinanceState>): FinanceState {
  const children = Array.isArray(raw.children)
    ? raw.children.map((child) => createChild(child))
    : [];

  return {
    profile: { ...defaultProfile, ...(raw.profile ?? {}) },
    coverage: { ...defaultCoverage, ...(raw.coverage ?? {}) },
    assumptions: { ...defaultAssumptions, ...(raw.assumptions ?? {}) },
    children,
    priorities:
      Array.isArray(raw.priorities) && raw.priorities.length > 0
        ? raw.priorities.filter(Boolean)
        : defaultState.priorities,
  };
}

function mergeUiState(raw?: Partial<FinanceUiState>): FinanceUiState {
  const candidateRoute = raw?.lastRouteId;
  const lastRouteId =
    typeof candidateRoute === "string" && getRouteById(candidateRoute as FinanceRouteId)
      ? (candidateRoute as FinanceRouteId)
      : defaultUiState.lastRouteId;

  const riskStep = clampRiskStep(raw?.riskStep ?? defaultUiState.riskStep);

  return {
    lastRouteId,
    riskStep,
  };
}

type FinanceContextValue = {
  state: FinanceState;
  ui: FinanceUiState;
  computed: ReturnType<typeof computeFinance>;
  setProfileField: <K extends keyof ClientProfile>(key: K, value: ClientProfile[K]) => void;
  setCoverageField: <K extends keyof ExistingCoverage>(
    key: K,
    value: ExistingCoverage[K]
  ) => void;
  setAssumptionField: <K extends keyof PlanningAssumptions>(
    key: K,
    value: PlanningAssumptions[K]
  ) => void;
  addChild: () => void;
  updateChild: <K extends keyof ChildProfile>(
    id: string,
    key: K,
    value: ChildProfile[K]
  ) => void;
  removeChild: (id: string) => void;
  movePriorityUp: (needKey: NeedKey) => void;
  movePriorityDown: (needKey: NeedKey) => void;
  setLastRoute: (routeId: FinanceRouteId) => void;
  setRiskStep: (step: number) => void;
  resetAll: () => void;
};

const FinanceContext = createContext<FinanceContextValue | undefined>(undefined);

export function FinanceProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<FinanceState>(defaultState);
  const [ui, setUi] = useState<FinanceUiState>(defaultUiState);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const rawCache = window.localStorage.getItem(STORAGE_KEY);
      if (rawCache) {
        const parsed = JSON.parse(rawCache) as
          | Partial<PersistedFinanceCache>
          | Partial<FinanceState>;

        if (parsed && typeof parsed === "object" && "state" in parsed) {
          const cache = parsed as Partial<PersistedFinanceCache>;
          if (cache.state) {
            setState(mergeState(cache.state));
          }
          setUi(mergeUiState(cache.ui));
        } else if (parsed && typeof parsed === "object") {
          setState(mergeState(parsed as Partial<FinanceState>));
        }
      } else {
        const legacyRaw = window.localStorage.getItem(LEGACY_STORAGE_KEY);
        if (legacyRaw) {
          const legacyParsed = JSON.parse(legacyRaw) as Partial<FinanceState>;
          if (legacyParsed && typeof legacyParsed === "object") {
            setState(mergeState(legacyParsed));
          }
        }
      }
    } catch {
      setState(defaultState);
      setUi(defaultUiState);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    const cache: PersistedFinanceCache = {
      state,
      ui,
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
    window.localStorage.setItem(LEGACY_STORAGE_KEY, JSON.stringify(state));
  }, [state, ui, isHydrated]);

  const computed = useMemo(() => computeFinance(state), [state]);

  const value = useMemo<FinanceContextValue>(
    () => ({
      state,
      ui,
      computed,
      setProfileField: (key, value) => {
        setState((current) => ({
          ...current,
          profile: { ...current.profile, [key]: value },
        }));
      },
      setCoverageField: (key, value) => {
        setState((current) => ({
          ...current,
          coverage: { ...current.coverage, [key]: value },
        }));
      },
      setAssumptionField: (key, value) => {
        setState((current) => ({
          ...current,
          assumptions: { ...current.assumptions, [key]: value },
        }));
      },
      addChild: () => {
        setState((current) => ({
          ...current,
          children: [...current.children, createChild()],
        }));
      },
      updateChild: (id, key, value) => {
        setState((current) => ({
          ...current,
          children: current.children.map((child) =>
            child.id === id ? { ...child, [key]: value } : child
          ),
        }));
      },
      removeChild: (id) => {
        setState((current) => ({
          ...current,
          children: current.children.filter((child) => child.id !== id),
        }));
      },
      movePriorityUp: (needKey) => {
        setState((current) => {
          const index = current.priorities.indexOf(needKey);
          if (index <= 0) {
            return current;
          }

          const next = [...current.priorities];
          [next[index - 1], next[index]] = [next[index], next[index - 1]];
          return { ...current, priorities: next };
        });
      },
      movePriorityDown: (needKey) => {
        setState((current) => {
          const index = current.priorities.indexOf(needKey);
          if (index < 0 || index >= current.priorities.length - 1) {
            return current;
          }

          const next = [...current.priorities];
          [next[index + 1], next[index]] = [next[index], next[index + 1]];
          return { ...current, priorities: next };
        });
      },
      setLastRoute: (routeId) => {
        if (!getRouteById(routeId)) {
          return;
        }

        setUi((current) =>
          current.lastRouteId === routeId ? current : { ...current, lastRouteId: routeId }
        );
      },
      setRiskStep: (step) => {
        const safeStep = clampRiskStep(step);
        setUi((current) =>
          current.riskStep === safeStep ? current : { ...current, riskStep: safeStep }
        );
      },
      resetAll: () => {
        setState(defaultState);
        setUi((current) => ({
          ...defaultUiState,
          lastRouteId: current.lastRouteId,
        }));
      },
    }),
    [state, ui, computed]
  );

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>;
}

export function useFinance() {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error("useFinance must be used within FinanceProvider");
  }

  return context;
}
