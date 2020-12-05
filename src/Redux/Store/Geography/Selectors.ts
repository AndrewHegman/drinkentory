import { RootState } from "../index";

export const geography = {
  isLoading: (state: RootState) => state.geography.isCitiesLoading || state.geography.isCountriesLoading || state.geography.isStatesLoading,
  byId: (state: RootState, id: string) => {
    state.geography.countries.find((country) => country._id === id);
  },
};
