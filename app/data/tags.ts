export const TAGS = [
  { key: 'Rescue', label: 'Rescue' },
  { key: 'Care', label: 'Care' },
  { key: 'Community', label: 'Community' },
] as const;

export type TagKey = (typeof TAGS)[number]['key'];
