import { RootState } from "../index";

export const breweries = {
  getNewBreweryName: (state: RootState): string => state.breweries.newBrewery?.name || "",

  getNewBreweryCountry: (state: RootState): string => state.breweries.newBrewery?.country || "",

  getNewBreweryState: (state: RootState): string => state.breweries.newBrewery?.state || "",

  getNewBreweryCity: (state: RootState): string => state.breweries.newBrewery?.city || "",
};
