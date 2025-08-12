import type { LocationType } from '~~/types';

export const locationIconMap: Record<LocationType, string> = {
  health: '/icons/health.svg',
  foodbank: '/icons/food.svg',
  shelter: '/icons/shelter.svg',
  community: '/icons/community.svg',
};

export function iconFor(type: LocationType): string {
  return locationIconMap[type] ?? locationIconMap.community;
}
