export const FINANCE_STORAGE_KEY = 'personal-finance-analysis-cache-v2';
export const FINANCE_LEGACY_STORAGE_KEY = 'personal-finance-analysis-state-v1';
export const THEME_STORAGE_KEY = 'personal-finance-theme-mode-v1';

const APP_LOCAL_CACHE_KEYS = [
  FINANCE_STORAGE_KEY,
  FINANCE_LEGACY_STORAGE_KEY,
  THEME_STORAGE_KEY,
] as const;

export function clearAppLocalCache(storage: Storage = window.localStorage) {
  for (const key of APP_LOCAL_CACHE_KEYS) {
    storage.removeItem(key);
  }
}
