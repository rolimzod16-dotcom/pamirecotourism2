import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAdminToken } from '@/lib/admin-token';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const headers = new Headers(request.headers);
  headers.set('x-pathname', pathname);
  const staffArea = (pathname.startsWith('/admin') && pathname !== '/admin/login') || pathname.startsWith('/api/admin');
  if (staffArea) {
    const token = request.cookies.get('eco_admin')?.value;
    const secret = process.env.AUTH_SECRET;
    const allowed = Boolean(secret && token && await verifyAdminToken(token, secret));
    if (!allowed) {
      if (pathname.startsWith('/api/')) return NextResponse.json({ error: 'Нужно войти.' }, { status: 401 });
      const login = request.nextUrl.clone();
      login.pathname = '/admin/login';
      login.search = '';
      return NextResponse.redirect(login);
    }
  }
  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|photos/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)'],
};
