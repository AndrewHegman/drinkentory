import { CityDocument, CountryDocument, StateDocument } from "../../../Interfaces";
import { RootState } from "../index";

export const geography = {
  isLoading: (state: RootState) => state.geography.isCitiesLoading || state.geography.isCountriesLoading || state.geography.isStatesLoading,
  countryById: (state: RootState, id: string): CountryDocument | undefined => {
    return state.geography.countries.find((country) => country._id === id);
  },
  stateById: (state: RootState, id: string): StateDocument | undefined => {
    return state.geography.states.find((state) => state._id === id);
  },
  cityById: (state: RootState, id: string): CityDocument | undefined => {
    return state.geography.cities.find((city) => city._id === id);
  },
};
