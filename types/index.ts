export type LocationType = string;

export interface Location {
  name: string;
  description: string;
  image: string;
  address: string;
  email: string;
  source: string;
  coordinates: [number, number];
  data_updated: string;
  notes: string;
  organization: string;
  city: string;
  type: LocationType[];
}
