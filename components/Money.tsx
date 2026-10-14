'use client';
import { useCurrency } from '@/components/CurrencyProvider';
import { formatMoney } from '@/lib/currency';

/** A USD price shown in the visitor's chosen currency. */
export function Money({ usd, prefix = '', suffix = '' }: { usd: number; prefix?: string; suffix?: string }) {
  const { currency, rates } = useCurrency();
  const text = formatMoney(usd, currency, rates);
  const title = currency === 'USD' ? undefined : `≈ ${formatMoney(usd, 'USD', rates)} at today's rate`;
  return <span title={title}>{prefix}{text}{suffix}</span>;
}

/** Motorcycle daily rate, or "On request" when the admin left it empty. */
export function MotoPrice({ usd }: { usd: number | null }) {
  return usd === null ? <>On request</> : <Money usd={usd} suffix=" / day" />;
}
