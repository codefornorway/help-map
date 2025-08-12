export type LocationType = 'community' | 'foodbank' | 'health' | 'shelter';

export interface Location {
  name: string;
  description: string;
  organization: string;
  type: LocationType;
  address: string;
  city: string;
  coordinates: [number, number];
  source: string;
}
