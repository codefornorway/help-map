import type { Location, LocationType } from '~~/types';
import locationsData from '~~/data/locations.json';

export function useLocations() {
  const allLocations = useState<Location[]>('allLocations', () => locationsData as Location[]);

  const selected = useState<Location | null>('selectedLocation', () => null);
  const searchQuery = useState('searchQuery', () => '');
  const filterTypes = useState<LocationType[]>('filterTypes', () => []);
  const filterOrgs = useState<string[]>('filterOrgs', () => []);

  const types = computed<LocationType[]>(() => Array.from(new Set(allLocations.value.map(l => l.type))).sort());
  const organizations = computed(() => Array.from(new Set(allLocations.value.map(l => l.organization))).sort());

  const locations = computed(() => {
    const query = searchQuery.value.toLowerCase();
    return allLocations.value.filter(l => {
      const matchesQuery = !query || [l.name, l.city, l.address, l.description].some(v => v.toLowerCase().includes(query));
      const matchesType = filterTypes.value.length === 0 || filterTypes.value.includes(l.type);
      const matchesOrg = filterOrgs.value.length === 0 || filterOrgs.value.includes(l.organization);
      return matchesQuery && matchesType && matchesOrg;
    });
  });

  function focus(location: Location) {
    selected.value = location;
    useMapbox('main-map', map => {
      map?.flyTo({ center: location.coordinates, zoom: 15 });
    });
  }

  function reset() {
    selected.value = null;
    useMapbox('main-map', map => {
      map?.flyTo({ center: [8.49, 64.63], zoom: 4.38 });
    });
  }

  function locateMe() {
    if (!('geolocation' in navigator)) return;
    navigator.geolocation.getCurrentPosition(pos => {
      const { latitude, longitude } = pos.coords;
      useMapbox('main-map', map => {
        map?.flyTo({ center: [longitude, latitude], zoom: 12 });
      });
    });
  }

  return {
    locations,
    selected,
    focus,
    reset,
    locateMe,
    searchQuery,
    filterTypes,
    filterOrgs,
    types,
    organizations,
  };
}
