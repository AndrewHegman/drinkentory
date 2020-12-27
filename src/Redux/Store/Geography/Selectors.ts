import { CountryDocument, PlaceDocument, StateDocument } from "../../../Interfaces";
import { RootState } from "../index";

export const geography = {
  isLoading: (state: RootState) =>
    state.geography.isCitiesLoading || state.geography.isCountriesLoading || state.geography.isStatesLoading,

  countryById: (state: RootState, id: string): CountryDocument | undefined => {
    return state.geography.places.find((place) => place.country?._id === id)?.country;
  },
  stateById: (state: RootState, id: string): StateDocument | undefined => {
    return state.geography.places.find((place) => place.state?._id === id)?.state;
  },

  placeById: (state: RootState, id: string): PlaceDocument | undefined => {
    return state.geography.places.find((place) => place._id === id);
  },

  countries: (state: RootState): CountryDocument[] => {
    return state.geography.places.map((place: PlaceDocument) => place.country || undefined) as CountryDocument[];
  },

  states: (state: RootState): StateDocument[] => {
    return state.geography.places.map((place: PlaceDocument) => place.state || undefined) as StateDocument[];
  },

  // Just here for solidarity and consistency
  places: (state: RootState): PlaceDocument[] => {
    return state.geography.places;
  },
};
