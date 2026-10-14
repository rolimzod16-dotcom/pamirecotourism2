/** Pamir Ecotourism mark: snow peaks, sun and the road into the valley. */
export function LogoMark({ className = 'h-10 w-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={`${className} shrink-0`} aria-hidden="true">
      <rect width="64" height="64" rx="16" fill="#A22900" />
      <circle cx="45" cy="17" r="7.5" fill="#E8A24A" />
      <path d="M26 50 L43 23 L60 50 Z" fill="#D9774E" />
      <path d="M43 23 L48.7 32 L45.8 30.4 L43 33 L40.2 30.4 L37.3 32 Z" fill="#FBF7F2" />
      <path d="M4 50 L24 15 L44 50 Z" fill="#F2BC9C" />
      <path d="M24 15 L31.4 28 L27.6 25.8 L24 29 L20.4 25.8 L16.6 28 Z" fill="#FBF7F2" />
      <path d="M13 58.5 C 23 57.5, 21 52, 31 50" fill="none" stroke="#E8A24A" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
