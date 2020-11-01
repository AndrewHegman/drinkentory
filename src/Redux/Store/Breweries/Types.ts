import { Brewery } from "../../../Interfaces/Brewery.types";

export const SET_NEW_BREWERY_NAME = "SET_NEW_BREWERY_NAME";
export const SET_NEW_BREWERY_COUNTRY = "SET_NEW_BREWERY_COUNTRY";
export const SET_NEW_BREWERY_STATE = "SET_NEW_BREWERY_STATE";
export const SET_NEW_BREWERY_CITY = "SET_NEW_BREWERY_CITY";
export const FETCH_ALL_BREWERIES = "FETCH_ALL_BREWERIES";

export const WAIT_ON_BREWERIES_REQUEST = "WAIT_ON_BREWERIES_REQUEST";

// export interface Brewery {
//   name: string;
//   country: string;
//   state?: string;
//   city?: string;
// }

export interface BreweryState {
  isLoading: boolean;
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

interface WaitOnRequest {
  type: typeof WAIT_ON_BREWERIES_REQUEST;
  isLoading: boolean;
  fieldToUpdate?: keyof BreweryState | keyof Brewery;
  payload?: any;
}

export type BreweryActionTypes =
  | SetNewBreweryNameAction
  | SetNewBreweryCountryAction
  | SetNewBreweryStateAction
  | SetNewBreweryCityAction
  | FetchAllBreweries
  | WaitOnRequest;
