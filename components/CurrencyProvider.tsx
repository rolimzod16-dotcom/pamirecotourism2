'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { DEFAULT_CURRENCY, FALLBACK_RATES, isCurrency, type Currency, type Rates } from '@/lib/currency';

const STORAGE_KEY = 'pe-currency';
const CurrencyContext = createContext<{ currency: Currency; rates: Rates; setCurrency: (next: Currency) => void }>({
  currency: DEFAULT_CURRENCY,
  rates: FALLBACK_RATES,
  setCurrency: () => {},
});

export function CurrencyProvider({ rates, children }: { rates: Rates; children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(DEFAULT_CURRENCY);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (isCurrency(saved)) setCurrencyState(saved);
    } catch {}
  }, []);

  function setCurrency(next: Currency) {
    setCurrencyState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  }

  return <CurrencyContext.Provider value={{ currency, rates, setCurrency }}>{children}</CurrencyContext.Provider>;
}

export const useCurrency = () => useContext(CurrencyContext);
