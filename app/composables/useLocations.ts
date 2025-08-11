import type { Location } from '~~/types';
import locationsData from '~~/data/locations.json';

export function useLocations() {
  const allLocations = locationsData as Location[];
  const selected = ref<Location | null>(null);
  const searchQuery = ref('');
  const filterTypes = ref<string[]>([]);
  const filterOrgs = ref<string[]>([]);

  const types = computed(() => Array.from(new Set(allLocations.map(l => l.type))).sort());
  const organizations = computed(() => Array.from(new Set(allLocations.map(l => l.organization))).sort());

  const locations = computed(() =>
    allLocations.filter(l => {
      const query = searchQuery.value.toLowerCase();
      const matchesQuery = !query || [l.name, l.city, l.address, l.description].some(v => v.toLowerCase().includes(query));
      const matchesType = filterTypes.value.length === 0 || filterTypes.value.includes(l.type);
      const matchesOrg = filterOrgs.value.length === 0 || filterOrgs.value.includes(l.organization);
      return matchesQuery && matchesType && matchesOrg;
    })
  );

  function focus(location: Location) {
    selected.value = location;
    useMapbox('main-map', map => {
      map?.flyTo({ center: location.coordinates, zoom: 10 });
    });
  }

  function reset() {
    selected.value = null;
    useMapbox('main-map', map => {
      map?.flyTo({ center: [8.49, 64.63], zoom: 4.38 });
    });
  }

  return {
    locations,
    selected,
    focus,
    reset,
    searchQuery,
    filterTypes,
    filterOrgs,
    types,
    organizations,
  };
}
