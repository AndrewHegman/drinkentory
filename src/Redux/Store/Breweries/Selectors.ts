import { RootState } from "../index";

export const getBreweryName = (state: RootState): string => state.breweries.name;

export const getBreweryCountry = (state: RootState): string => state.breweries.country;

export const getBreweryState = (state: RootState): string => state.breweries.state || "";

export const getBreweryCity = (state: RootState): string => state.breweries.city || "";

export type BrewerySelectors = typeof getBreweryName | typeof getBreweryCountry | typeof getBreweryState | typeof getBreweryCity;
