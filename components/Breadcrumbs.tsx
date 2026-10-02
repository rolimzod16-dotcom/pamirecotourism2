import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { routesCopy } from '@/content/routes';
export function Breadcrumbs({ items, light = false }: { items: { label: string; href?: string }[]; light?: boolean }) {
  return <nav aria-label={routesCopy.common.breadcrumb} className={`text-sm ${light ? 'text-white/85' : 'text-navy/70'}`}><ol className="flex flex-wrap items-center gap-2"><li><Link href="/" className="underline-offset-4 hover:underline">{routesCopy.common.home}</Link></li>{items.map((item) => <li key={item.href ?? item.label} className="flex items-center gap-2"><ChevronRight size={14} aria-hidden="true" />{item.href ? <Link href={item.href} className="underline-offset-4 hover:underline">{item.label}</Link> : <span aria-current="page">{item.label}</span>}</li>)}</ol></nav>;
}
