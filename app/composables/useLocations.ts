import type { Location } from '~~/types';
import locations from '~~/data/locations.json';

export function useLocations() {
  const selected = ref<Location | null>(null);

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

  return { locations, selected, focus, reset };
}
