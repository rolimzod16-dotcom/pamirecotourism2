/** Draft copy is marked with square brackets, e.g. "[Details to confirm]". */
export const isPlaceholder = (text: string | null | undefined) => !text || /\[[^\]]+\]/.test(text);
export const real = (text: string | null | undefined) => (isPlaceholder(text) ? '' : (text as string));
export const realList = (items: string[]) => items.filter((item) => !isPlaceholder(item));
