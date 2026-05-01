"use client";

import { useEffect, useState } from "react";
import FinanceRoutePage from "@/components/finance/FinanceRoutePage";
import { getRouteById, type FinanceRouteId } from "@/lib/finance/routes";

const STORAGE_KEY = "personal-finance-analysis-cache-v2";

type PersistedHomeCache = {
  ui?: {
    lastRouteId?: string;
  };
};

function readCachedRoute(): FinanceRouteId {
  if (typeof window === "undefined") {
    return "welcome";
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return "welcome";
    }

    const parsed = JSON.parse(raw) as PersistedHomeCache;
    const candidate = parsed?.ui?.lastRouteId;
    if (typeof candidate === "string" && getRouteById(candidate as FinanceRouteId)) {
      return candidate as FinanceRouteId;
    }
  } catch {
    return "welcome";
  }

  return "welcome";
}

export default function Home() {
  const [routeId, setRouteId] = useState<FinanceRouteId>("welcome");

  useEffect(() => {
    setRouteId(readCachedRoute());
  }, []);

  return <FinanceRoutePage routeId={routeId} />;
}
