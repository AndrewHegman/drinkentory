import { CountryDocument, BreweryDocument, StateDocument, CityDocument, NewBrewery } from "../../../Interfaces";

export const actionTypes = {
  SET_NEW_BREWERY_NAME: "SET_NEW_BREWERY_NAME",
  SET_NEW_BREWERY_COUNTRY: "SET_NEW_BREWERY_COUNTRY",
  SET_NEW_BREWERY_STATE: "SET_NEW_BREWERY_STATE",
  SET_NEW_BREWERY_CITY: "SET_NEW_BREWERY_CITY",
  FETCH_ALL_BREWERIES: "FETCH_ALL_BREWERIES",
  WAIT_ON_BREWERIES_REQUEST: "WAIT_ON_BREWERIES_REQUEST",
  RESET_NEW_BREWERY: "RESET_NEW_BREWERY",
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

  setNewBreweryCountry: (country: CountryDocument) =>
    ({
      type: actionTypes.SET_NEW_BREWERY_COUNTRY,
      country,
    } as const),

  setNewBreweryState: (state: StateDocument) =>
    ({
      type: actionTypes.SET_NEW_BREWERY_STATE,
      state: state,
    } as const),

  setNewBreweryCity: (city: CityDocument) =>
    ({
      type: actionTypes.SET_NEW_BREWERY_CITY,
      city: city,
    } as const),

  waitOnRequest: (isLoading: boolean, fieldToUpdate?: keyof BreweryState | keyof BreweryDocument, payload?: any) =>
    ({
      type: actionTypes.WAIT_ON_BREWERIES_REQUEST,
      isLoading,
      fieldToUpdate,
      payload,
    } as const),

  resetNewBrewery: () =>
    ({
      type: actionTypes.RESET_NEW_BREWERY,
    } as const),
};

export type BreweryActionTypes =
  | ReturnType<typeof BreweryActions.setNewBreweryName>
  | ReturnType<typeof BreweryActions.setNewBreweryCountry>
  | ReturnType<typeof BreweryActions.setNewBreweryState>
  | ReturnType<typeof BreweryActions.setNewBreweryCity>
  | ReturnType<typeof BreweryActions.waitOnRequest>
  | ReturnType<typeof BreweryActions.resetNewBrewery>;
