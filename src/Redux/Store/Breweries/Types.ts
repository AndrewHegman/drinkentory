export const SET_NEW_BREWERY_NAME = "SET_NEW_BREWERY_NAME";
export const SET_NEW_BREWERY_COUNTRY = "SET_NEW_BREWERY_COUNTRY";
export const SET_NEW_BREWERY_STATE = "SET_NEW_BREWERY_STATE";
export const SET_NEW_BREWERY_CITY = "SET_NEW_BREWERY_CITY";
export const FETCH_ALL_BREWERIES = "FETCH_ALL_BREWERIES";

export interface Brewery {
  name: string;
  country: string;
  state?: string;
  city?: string;
}

export interface BreweryState {
  newBrewery?: Brewery;
  breweries: Brewery[];
}

interface SetNewBreweryNameAction {
  type: typeof SET_NEW_BREWERY_NAME;
  name: string;
}

interface SetNewBreweryCountryAction {
  type: typeof SET_NEW_BREWERY_COUNTRY;
  country: string;
}

interface SetNewBreweryStateAction {
  type: typeof SET_NEW_BREWERY_STATE;
  state: string;
}

interface SetNewBreweryCityAction {
  type: typeof SET_NEW_BREWERY_CITY;
  city: string;
}

interface FetchAllBreweries {
  type: typeof FETCH_ALL_BREWERIES;
  breweries: Brewery[];
}

export type BreweryActionTypes =
  | SetNewBreweryNameAction
  | SetNewBreweryCountryAction
  | SetNewBreweryStateAction
  | SetNewBreweryCityAction
  | FetchAllBreweries;
