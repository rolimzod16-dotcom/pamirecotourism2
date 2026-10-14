import { CURRENCIES, FALLBACK_RATES, type Rates } from '@/lib/currency';

/** Daily exchange rates against USD, cached for 12 hours. */
export async function getRates(): Promise<Rates> {
  try {
    const response = await fetch('https://open.er-api.com/v6/latest/USD', { next: { revalidate: 43200 } });
    if (!response.ok) return FALLBACK_RATES;
    const data = (await response.json()) as { result?: string; rates?: Record<string, number> };
    if (data.result !== 'success' || !data.rates) return FALLBACK_RATES;
    const rates = { ...FALLBACK_RATES };
    for (const code of CURRENCIES) {
      const value = data.rates[code];
      if (typeof value === 'number' && value > 0) rates[code] = value;
    }
    return rates;
  } catch {
    return FALLBACK_RATES;
  }
}
