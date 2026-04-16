// app/utils/text.ts
export function normalizeText(input: unknown): string {
  if (input == null) return '';
  return String(input)
    .toLowerCase()
    .normalize('NFKD') // diacritics ayır
    .replace(/[\u0300-\u036f]/g, ''); // diacritics temizle
}
