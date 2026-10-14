'use client';
import { ChevronDown } from 'lucide-react';
import { useCurrency } from '@/components/CurrencyProvider';
import { CURRENCIES, CURRENCY_LABEL, isCurrency } from '@/lib/currency';

export function CurrencySwitcher({ className = '' }: { className?: string }) {
  const { currency, setCurrency } = useCurrency();
  return (
    <label className={`relative items-center rounded-lg bg-mist font-display text-[11px] font-bold text-ink ${className}`}>
      <span className="sr-only">Currency</span>
      <select
        value={currency}
        onChange={(event) => isCurrency(event.target.value) && setCurrency(event.target.value)}
        className="cursor-pointer appearance-none bg-transparent py-1 pl-2 pr-6 outline-none"
      >
        {CURRENCIES.map((code) => (
          <option key={code} value={code} title={CURRENCY_LABEL[code]}>
            {code}
          </option>
        ))}
      </select>
      <ChevronDown size={14} className="pointer-events-none absolute right-1.5" aria-hidden="true" />
    </label>
  );
}
