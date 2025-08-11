import type { Location } from '~~/types';
import locationsData from '~~/data/locations.json';

export function useLocations() {
  const allLocations = locationsData as Location[];
  const selected = ref<Location | null>(null);
  const searchQuery = ref('');
  const filterType = ref('');
  const filterOrg = ref('');

  const types = computed(() =>
    Array.from(new Set(allLocations.map(l => l.type))).sort()
  );
  const organizations = computed(() =>
    Array.from(new Set(allLocations.map(l => l.organization))).sort()
  );

  const locations = computed(() =>
    allLocations.filter(l => {
      const query = searchQuery.value.toLowerCase();
      const matchesQuery = !query ||
        [l.name, l.city, l.address, l.description]
          .some(v => v.toLowerCase().includes(query));
      const matchesType = !filterType.value || l.type === filterType.value;
      const matchesOrg = !filterOrg.value || l.organization === filterOrg.value;
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

  return { locations, selected, focus, reset, searchQuery, filterType, filterOrg, types, organizations };
}
