'use client';
import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
export function Accordion({ items }: { items: { title: string; content: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();
  return <div className="divide-y divide-navy/15 border-y border-navy/15">{items.map((item, index) => <div key={`${item.title}-${index}`}><h3><button type="button" aria-expanded={open === index} aria-controls={`${id}-panel-${index}`} onClick={() => setOpen(open === index ? null : index)} className="flex w-full items-center justify-between gap-4 py-5 text-left font-semibold"><span>{item.title}</span><ChevronDown size={20} className={`shrink-0 transition-transform ${open === index ? 'rotate-180' : ''}`} aria-hidden="true" /></button></h3><div id={`${id}-panel-${index}`} hidden={open !== index} className="pb-5 text-sm leading-7 text-navy/75">{item.content}</div></div>)}</div>;
}
