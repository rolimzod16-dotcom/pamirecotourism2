'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { tours as fallbackTours, type Tour, type TourCategory } from '@/data/tours';
import { routesCopy as copy } from '@/content/routes';
import { TourCard } from './TourCard';
import { Reveal } from './Reveal';
type Category = 'all' | TourCategory;
const filters: { value: Category; label: string }[] = [
  { value: 'all', label: copy.tours.all }, { value: 'trekking', label: copy.tours.trekking }, { value: 'driving', label: copy.tours.driving },
];
export function TourFilters({ tours = fallbackTours }: { tours?: Tour[] }) {
  const router = useRouter(), pathname = usePathname(), params = useSearchParams();
  const category = (params.get('category') ?? 'all') as Category;
  const sort = params.get('sort') ?? 'default';
  const update = (key: string, value: string) => { const next = new URLSearchParams(params.toString()); if (value === 'all' || value === 'default') next.delete(key); else next.set(key, value); router.replace(`${pathname}${next.size ? `?${next}` : ''}`, { scroll: false }); };
  const filtered = tours.filter((tour) => category === 'all' || tour.category === category).sort((a, b) => {
    if (sort === 'price') return (typeof a.price === 'number' ? a.price : Infinity) - (typeof b.price === 'number' ? b.price : Infinity);
    if (sort === 'duration') return (a.days ?? Infinity) - (b.days ?? Infinity);
    if (sort === 'difficulty') return (a.difficulty ?? 'zzz').localeCompare(b.difficulty ?? 'zzz');
    return 0;
  });
  return <div><div className="flex flex-col gap-5 border-b border-navy/15 pb-6 md:flex-row md:items-end md:justify-between"><div role="group" aria-label={copy.tours.filterLabel} className="flex gap-2 overflow-x-auto pb-1">{filters.map((filter) => <button key={filter.value} type="button" aria-pressed={category === filter.value} onClick={() => update('category', filter.value)} className={`shrink-0 min-h-11 rounded-full border px-5 py-2.5 text-sm font-semibold ${category === filter.value ? 'border-navy bg-navy text-white' : 'border-navy/20 hover:border-navy'}`}>{filter.label}</button>)}</div><div className="flex items-center gap-3"><label htmlFor="tour-sort" className="text-sm font-semibold">{copy.tours.sortLabel}</label><select id="tour-sort" value={sort} onChange={(event) => update('sort', event.target.value)} className="min-h-11 min-w-0 rounded-brand border border-navy/25 bg-white px-3 text-sm"><option value="default">{copy.tours.sort.default}</option><option value="price">{copy.tours.sort.price}</option><option value="duration">{copy.tours.sort.duration}</option><option value="difficulty">{copy.tours.sort.difficulty}</option></select></div></div><p className="mt-6 text-sm text-navy/70" aria-live="polite">{filtered.length} {copy.tours.results}</p>{(sort === 'duration' || sort === 'difficulty') && <p className="mt-2 text-xs text-navy/65">{copy.tours.unknownSort}</p>}{filtered.length ? <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{filtered.map((tour) => <Reveal key={tour.slug}><TourCard tour={tour} /></Reveal>)}</div> : <p className="mt-8 rounded-brand bg-snow p-10 text-center">{copy.tours.empty}</p>}</div>;
}
