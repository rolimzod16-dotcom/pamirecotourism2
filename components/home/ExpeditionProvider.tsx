'use client';
import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

export type ExpeditionFilters = {
  region: string;
  activity: string;
  season: string;
  tab: 'all' | '4x4' | 'trekking' | 'winter';
};

type ExpeditionContextValue = {
  tour: string;
  setTour: (slug: string) => void;
  filters: ExpeditionFilters;
  setFilters: (filters: ExpeditionFilters) => void;
  chooseTour: (slug: string) => void;
};

const ExpeditionContext = createContext<ExpeditionContextValue | null>(null);

export function ExpeditionProvider({ children }: { children: ReactNode }) {
  const [tour, setTour] = useState('pamir-classical-4x4');
  const [filters, setFilters] = useState<ExpeditionFilters>({ region: 'all', activity: 'all', season: 'may-oct', tab: 'all' });
  const value = useMemo<ExpeditionContextValue>(() => ({
    tour,
    setTour,
    filters,
    setFilters,
    chooseTour: (slug: string) => {
      setTour(slug);
      document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' });
    },
  }), [tour, filters]);
  return <ExpeditionContext.Provider value={value}>{children}</ExpeditionContext.Provider>;
}

export function useExpedition() {
  const value = useContext(ExpeditionContext);
  if (!value) throw new Error('useExpedition must be used inside ExpeditionProvider');
  return value;
}
