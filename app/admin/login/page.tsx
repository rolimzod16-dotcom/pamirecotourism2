import { loginAction } from '../actions';

const messages: Record<string, string> = {
  credentials: 'Неверная почта или пароль.',
  config: 'Админка на сервере ещё не настроена.',
  rate: 'Слишком много попыток. Подождите минуту.',
};

export default function LoginPage({ searchParams }: { searchParams: { error?: string } }) {
  const message = searchParams.error ? messages[searchParams.error] : '';
  return <main className="flex min-h-screen items-center justify-center bg-sand px-4">
    <form action={loginAction} className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
      <p className="font-display text-xs font-bold uppercase tracking-widest text-leaf">Pamir Ecotourism</p>
      <h1 className="mt-2 font-display text-3xl font-bold text-ink">Вход для команды</h1>
      <p className="mt-2 text-sm text-slate">Здесь можно менять туры, фото и смотреть заявки.</p>
      {message && <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">{message}</p>}
      <label className="mt-6 block text-sm font-semibold" htmlFor="email">Почта<input id="email" name="email" type="email" autoComplete="username" required defaultValue="admin@pamirecotourism.com" className="mt-1 w-full rounded-xl border border-pine/15 px-3 py-3 text-sm" /></label>
      <label className="mt-4 block text-sm font-semibold" htmlFor="password">Пароль<input id="password" name="password" type="password" autoComplete="current-password" required className="mt-1 w-full rounded-xl border border-pine/15 px-3 py-3 text-sm" /></label>
      <button type="submit" className="mt-6 w-full rounded-xl bg-forest py-3 font-display font-bold text-white">Войти</button>
    </form>
  </main>;
}
