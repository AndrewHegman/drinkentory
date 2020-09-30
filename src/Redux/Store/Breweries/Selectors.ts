import { RootState } from "../index";

export const getNewBreweryName = (state: RootState): string => state.breweries.newBrewery?.name || "";

export const getNewBreweryCountry = (state: RootState): string => state.breweries.newBrewery?.country || "";

export const getNewBreweryState = (state: RootState): string => state.breweries.newBrewery?.state || "";

export const getNewBreweryCity = (state: RootState): string => state.breweries.newBrewery?.city || "";

export type BrewerySelectors = typeof getNewBreweryName | typeof getNewBreweryCountry | typeof getNewBreweryState | typeof getNewBreweryCity;
