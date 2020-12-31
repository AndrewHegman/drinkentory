import { BreweryDocument, CountryDocument, PlaceDocument, StateDocument, AddPlaceDto } from "../../../Interfaces";
import { RootState } from "../index";

export const breweries = {
  getNewBreweryName: (state: RootState): string => state.breweries.newBrewery.name,

  getNewBreweryCountry: (state: RootState): CountryDocument | CountryDocument | undefined => state.breweries.newBrewery.place.country,

  getNewBreweryState: (state: RootState): StateDocument | StateDocument | undefined => state.breweries.newBrewery.place.state,

  getNewBreweryCity: (state: RootState): PlaceDocument | AddPlaceDto | undefined => state.breweries.newBrewery.place,

  byId: (state: RootState, id: string): BreweryDocument | undefined => state.breweries.breweries.find((brewery) => brewery._id === id),
};
