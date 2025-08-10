export interface Location {
  name: string;
  description: string;
  coordinates: [number, number];
  /**
   * Category of location. Historically only "food", "clothing" and "shelter"
   * were allowed, but the dataset now includes many more categories (e.g.
   * community, youth, mental health).  Using a narrow union here caused
   * TypeScript to reject valid entries from `data/locations.json`, preventing
   * the application from compiling when new categories were added.  Allow any
   * string to ensure the type stays in sync with the data source.
   */
  type: string;
  address: string;
}
