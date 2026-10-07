import Link from 'next/link';
import { headers } from 'next/headers';
import { logoutAction } from './actions';

export const metadata = { title: 'Админка | Pamir Ecotourism', robots: { index: false, follow: false } };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const path = headers().get('x-pathname') ?? '';
  if (path === '/admin/login') return children;
  return <div className="min-h-screen bg-sand text-ink">
    <header className="bg-pine text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4">
        <p className="font-display text-xl font-bold">Pamir Ecotourism</p>
        <nav className="flex flex-wrap items-center gap-4 text-sm font-semibold">
          <Link href="/admin">Туры</Link>
          <Link href="/admin/motorcycles">Мото</Link>
          <Link href="/admin/inquiries">Заявки</Link>
          <Link href="/" target="_blank">Открыть сайт</Link>
          <form action={logoutAction}><button type="submit" className="rounded-lg border border-white/40 px-3 py-1.5">Выйти</button></form>
        </nav>
      </div>
    </header>
    <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
  </div>;
}
