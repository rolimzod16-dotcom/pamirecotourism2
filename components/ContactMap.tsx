'use client';
import dynamic from 'next/dynamic';
import { pages } from '@/content/pages';
const OfficeLeaflet = dynamic(() => import('./OfficeLeaflet'), { ssr: false, loading: () => <div role="status" className="flex h-[380px] items-center justify-center rounded-brand bg-snow">{pages.contact.mapLoading}</div> });
export function ContactMap() { return <OfficeLeaflet />; }
