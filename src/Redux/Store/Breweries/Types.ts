import { CountryDocument, BreweryDocument, StateDocument, CityDocument, SetBreweryCountryDto, NewBrewery } from "../../../Interfaces";

export const actionTypes = {
  SET_NEW_BREWERY_NAME: "SET_NEW_BREWERY_NAME",
  SET_NEW_BREWERY_COUNTRY: "SET_NEW_BREWERY_COUNTRY",
  SET_NEW_BREWERY_STATE: "SET_NEW_BREWERY_STATE",
  SET_NEW_BREWERY_CITY: "SET_NEW_BREWERY_CITY",
  FETCH_ALL_BREWERIES: "FETCH_ALL_BREWERIES",
  WAIT_ON_BREWERIES_REQUEST: "WAIT_ON_BREWERIES_REQUEST",
} as const;

export interface BreweryState {
  isLoading: boolean;
  newBrewery?: NewBrewery;
  breweries: BreweryDocument[];
}

export const BreweryActions = {
  setNewBreweryName: (name: string) =>
    ({
      type: actionTypes.SET_NEW_BREWERY_NAME,
      name,
    } as const),

  setNewBreweryCountry: (countryId: string) =>
    ({
      type: actionTypes.SET_NEW_BREWERY_COUNTRY,
      country: countryId,
    } as const),

  setNewBreweryState: (stateId: string) =>
    ({
      type: actionTypes.SET_NEW_BREWERY_STATE,
      state: stateId,
    } as const),

  setNewBreweryCity: (cityId: string) =>
    ({
      type: actionTypes.SET_NEW_BREWERY_CITY,
      city: cityId,
    } as const),

  waitOnRequest: (isLoading: boolean, fieldToUpdate?: keyof BreweryState | keyof BreweryDocument, payload?: any) =>
    ({
      type: actionTypes.WAIT_ON_BREWERIES_REQUEST,
      isLoading,
      fieldToUpdate,
      payload,
    } as const),
};

export type BreweryActionTypes =
  | ReturnType<typeof BreweryActions.setNewBreweryName>
  | ReturnType<typeof BreweryActions.setNewBreweryCountry>
  | ReturnType<typeof BreweryActions.setNewBreweryState>
  | ReturnType<typeof BreweryActions.setNewBreweryCity>
  | ReturnType<typeof BreweryActions.waitOnRequest>;
