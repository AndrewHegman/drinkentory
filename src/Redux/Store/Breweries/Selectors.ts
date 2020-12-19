import { BreweryDocument, CityDocument, CountryDocument, StateDocument } from "../../../Interfaces";
import { RootState } from "../index";

export const breweries = {
  getNewBreweryName: (state: RootState): string => state.breweries.newBrewery?.name || "",

  getNewBreweryCountry: (state: RootState): CountryDocument | undefined => state.breweries.newBrewery?.country,

  getNewBreweryState: (state: RootState): StateDocument | undefined => state.breweries.newBrewery?.state,

  getNewBreweryCity: (state: RootState): CityDocument | undefined => state.breweries.newBrewery?.city,

  byId: (state: RootState, id: string): BreweryDocument | undefined => state.breweries.breweries.find((brewery) => brewery._id === id),
};
