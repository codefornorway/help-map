export const organizationIconMap: Record<string, string> = {
  'Røde Kors': '/icons/rode-kors.png',
};

const fallbackIcon = '/icons/community.svg';

export function iconForOrganization(org?: string): string {
  return (org && organizationIconMap[org]) || fallbackIcon;
}
