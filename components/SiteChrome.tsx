'use client';
import { usePathname } from 'next/navigation';

/**
 * Hides the public header and footer inside /admin. Deciding this in the browser keeps the root
 * layout free of request headers, so public pages can be cached instead of rendered on every visit.
 */
export function SiteChrome({ header, footer, children }: { header: React.ReactNode; footer: React.ReactNode; children: React.ReactNode }) {
  const pathname = usePathname() ?? '';
  if (pathname.startsWith('/admin')) return <>{children}</>;
  return <>{header}{children}{footer}</>;
}
