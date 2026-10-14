/** Prices are stored in USD; visitors see them converted to the chosen currency. */
export const CURRENCIES = ['EUR', 'USD', 'GBP', 'RUB', 'TJS'] as const;
export type Currency = (typeof CURRENCIES)[number];
export const DEFAULT_CURRENCY: Currency = 'EUR';

/** Units of each currency per 1 USD. */
export type Rates = Record<Currency, number>;

/** Used only if the live rates request fails. */
export const FALLBACK_RATES: Rates = { USD: 1, EUR: 0.86, GBP: 0.75, RUB: 80, TJS: 9.3 };

export const CURRENCY_LABEL: Record<Currency, string> = {
  EUR: 'Euro',
  USD: 'US dollar',
  GBP: 'British pound',
  RUB: 'Russian ruble',
  TJS: 'Tajik somoni',
};

// Round converted prices to tidy numbers in currencies with small units.
const STEP: Record<Currency, number> = { EUR: 1, USD: 1, GBP: 1, RUB: 100, TJS: 10 };

export function isCurrency(value: unknown): value is Currency {
  return typeof value === 'string' && (CURRENCIES as readonly string[]).includes(value);
}

export function formatMoney(usd: number, currency: Currency, rates: Rates) {
  const step = STEP[currency];
  const amount = Math.round((usd * rates[currency]) / step) * step;
  return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);
}
