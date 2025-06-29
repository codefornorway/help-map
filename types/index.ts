export interface Location {
  name: string;
  description: string;
  coordinates: [number, number];
  type: 'food' | 'clothing' | 'shelter';
  address: string;
}
