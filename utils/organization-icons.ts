export const organizationIconMap: Record<string, string> = {
  'Røde Kors': '/logos/rode-kors.svg',
};

const fallbackIcon = '/logos/default.svg';

export function iconForOrganization(org?: string): string {
  if (!org) return fallbackIcon;
  return organizationIconMap[org] ?? fallbackIcon;
}
