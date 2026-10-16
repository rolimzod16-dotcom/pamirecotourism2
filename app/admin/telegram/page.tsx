import { ConfirmSubmit } from '@/components/admin/ConfirmSubmit';
import { connectWebhookAction, forgetChatsAction } from '../telegram-actions';
import { readChatIds, telegramApi, telegramConfig } from '@/lib/telegram';

export const dynamic = 'force-dynamic';

const errors: Record<string, string> = {
  config: 'На Vercel не заданы TELEGRAM_BOT_TOKEN и TELEGRAM_BOT_PASSWORD.',
  webhook: 'Telegram не принял вебхук. Проверьте токен бота.',
  save: 'Не удалось сохранить список чатов.',
};

export default async function TelegramPage({ searchParams }: { searchParams: { connected?: string; cleared?: string; error?: string } }) {
  const { token, password, siteUrl } = telegramConfig();
  const chats = await readChatIds();
  const bot = token ? await telegramApi<{ username?: string }>('getMe').catch(() => null) : null;
  const hook = token ? await telegramApi<{ url?: string; last_error_message?: string }>('getWebhookInfo').catch(() => null) : null;
  const hookReady = hook?.url === `${siteUrl}/api/telegram`;
  const row = (label: string, ok: boolean, value: React.ReactNode) => <li className="flex flex-wrap justify-between gap-2 border-b border-pine/10 py-3 last:border-0"><span>{label}</span><span className={ok ? 'font-semibold text-green-800' : 'font-semibold text-red-800'}>{value}</span></li>;
  return <div className="max-w-2xl">
    <h1 className="font-display text-3xl font-bold">Telegram-бот</h1>
    <p className="mt-2 text-sm text-slate">Бот присылает новые заявки и подписки. Получают их только те, кто отправил боту пароль в личном чате.</p>
    {searchParams.connected && <p role="status" className="mt-4 rounded-xl bg-white px-4 py-3 text-sm">Бот подключён. Откройте его в Telegram и отправьте пароль.</p>}
    {searchParams.cleared && <p role="status" className="mt-4 rounded-xl bg-white px-4 py-3 text-sm">Все чаты отключены. Чтобы снова получать заявки, нужно заново отправить пароль.</p>}
    {searchParams.error && errors[searchParams.error] && <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">{errors[searchParams.error]}</p>}
    <ul className="mt-6 rounded-2xl bg-white px-5 text-sm shadow-sm">
      {row('Токен бота', Boolean(bot), bot ? `@${bot.username}` : token ? 'неверный токен' : 'не задан')}
      {row('Пароль для входа', Boolean(password), password ? 'задан' : 'не задан')}
      {row('Вебхук', hookReady, hookReady ? 'подключён' : 'не подключён')}
      {row('Подключённые чаты', chats.length > 0, chats.length)}
    </ul>
    {hook?.last_error_message && <p className="mt-3 text-xs text-slate">Последняя ошибка Telegram: {hook.last_error_message}</p>}
    <div className="mt-6 flex flex-wrap gap-3">
      <form action={connectWebhookAction}><button type="submit" className="rounded-xl bg-forest px-5 py-3 font-semibold text-white">{hookReady ? 'Переподключить бота' : 'Подключить бота'}</button></form>
      {chats.length > 0 && <ConfirmSubmit action={forgetChatsAction} fields={{}} label="Отключить все чаты" className="rounded-xl border border-red-800/30 px-5 py-3 font-semibold text-red-800" confirm="Отключить всех от уведомлений? Им придётся снова ввести пароль." />}
    </div>
    {bot && <p className="mt-6 text-sm">Как подключиться: откройте <a className="text-pine underline" href={`https://t.me/${bot.username}`} target="_blank" rel="noreferrer">t.me/{bot.username}</a>, нажмите «Старт» и отправьте пароль. Сообщение с паролем бот сразу удалит. Отключиться: /stop.</p>}
  </div>;
}
