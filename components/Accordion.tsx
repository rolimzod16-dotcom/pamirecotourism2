'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
export function Accordion({ items }: { items: { title: string; content: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return <div className="divide-y divide-navy/15 border-y border-navy/15">{items.map((item, index) => <div key={`${item.title}-${index}`}><h3><button type="button" aria-expanded={open === index} aria-controls={`accordion-${index}-${item.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}`} onClick={() => setOpen(open === index ? null : index)} className="flex w-full items-center justify-between gap-4 py-5 text-left font-semibold"><span>{item.title}</span><ChevronDown size={20} className={`shrink-0 transition-transform ${open === index ? 'rotate-180' : ''}`} aria-hidden="true" /></button></h3><div id={`accordion-${index}-${item.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}`} hidden={open !== index} className="pb-5 text-sm leading-7 text-navy/75">{item.content}</div></div>)}</div>;
}
