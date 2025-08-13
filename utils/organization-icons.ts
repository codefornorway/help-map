export const organizationIconMap: Record<string, string> = {
  'Røde Kors': '/logos/rode-kors.svg',
};

const fallbackIcon = '/icons/community.svg';

export function iconForOrganization(org?: string): string {
  return (org && organizationIconMap[org]) || fallbackIcon;
}

