'use client';

export function ConfirmSubmit({ action, fields, label, className, confirm }: { action: (formData: FormData) => void; fields: Record<string, string>; label: string; className: string; confirm: string }) {
  return <form action={action} onSubmit={(event) => { if (!window.confirm(confirm)) event.preventDefault(); }}>
    {Object.entries(fields).map(([name, value]) => <input key={name} type="hidden" name={name} value={value} />)}
    <button type="submit" className={className}>{label}</button>
  </form>;
}
