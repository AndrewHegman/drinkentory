import {
  CountryDocument,
  BreweryDocument,
  StateDocument,
  CityDocument,
  NewBrewery,
  PlaceDocument,
  AddPlaceDto,
} from "../../../Interfaces";
import { ActionType } from "../../Common";

export const actionTypes = {
  SET_NEW_BREWERY_NAME: "SET_NEW_BREWERY_NAME",
  // SET_NEW_BREWERY_COUNTRY: "SET_NEW_BREWERY_COUNTRY",
  // SET_NEW_BREWERY_STATE: "SET_NEW_BREWERY_STATE",
  // SET_NEW_BREWERY_CITY: "SET_NEW_BREWERY_CITY",
  SET_NEW_BREWERY_PLACE: "SET_NEW_BREWERY_PLACE",
  FETCH_ALL_BREWERIES: "FETCH_ALL_BREWERIES",
  WAIT_ON_BREWERIES_REQUEST: "WAIT_ON_BREWERIES_REQUEST",
  RESET_NEW_BREWERY: "RESET_NEW_BREWERY",
  WAIT_ON_UPDATING_NEW_BREWERY_LOCATION: "WAIT_ON_UPDATING_NEW_BREWERY_LOCATION",
  UPDATING_NEW_BREWERY_LOCATION_FINISHED: "UPDATING_NEW_BREWERY_LOCATION_FINISHED",
  CREATE_NEW_BREWERY: "CREATE_NEW_BREWERY",
  WAIT_ON_CREATE_NEW_BREWERY: "WAIT_ON_CREATE_NEW_BREWERY",
  CREATE_NEW_BREWERY_FINISHED: "CREATE_NEW_BREWERY_FINISHED",
} as const;

export interface BreweryState {
  isLoading: boolean;
  newBrewery: NewBrewery;
  breweries: BreweryDocument[];
  updatingNewBreweryLocation: boolean;
}

export const BreweryActions = {
  setNewBreweryName: (name: string) =>
    ({
      type: actionTypes.SET_NEW_BREWERY_NAME,
      name,
    } as const),

  // setNewBreweryCountry: (country: CountryDocument) =>
  //   ({
  //     type: actionTypes.SET_NEW_BREWERY_COUNTRY,
  //     country,
  //   } as const),

  // setNewBreweryState: (state: StateDocument) =>
  //   ({
  //     type: actionTypes.SET_NEW_BREWERY_STATE,
  //     state: state,
  //   } as const),
  // setNewBreweryCity: (city: CityDocument) =>
  //   ({
  //     type: actionTypes.SET_NEW_BREWERY_CITY,
  //     city: city,
  //   } as const),
  setNewBreweryPlace: (place: PlaceDocument) =>
    ({
      type: actionTypes.SET_NEW_BREWERY_PLACE,
      place,
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

  waitOnUpdatingNewBreweryLocation: () =>
    ({
      type: actionTypes.WAIT_ON_UPDATING_NEW_BREWERY_LOCATION,
    } as const),

  updatingNewBreweryLocationFinished: (place: AddPlaceDto) =>
    ({
      type: actionTypes.UPDATING_NEW_BREWERY_LOCATION_FINISHED,
      place,
    } as const),

  createNewBrewery: () =>
    ({
      type: actionTypes.CREATE_NEW_BREWERY,
    } as const),

  waitOnCreateNewBrewery: () =>
    ({
      type: actionTypes.WAIT_ON_CREATE_NEW_BREWERY,
    } as const),

  createNewBreweryFinished: () =>
    ({
      type: actionTypes.CREATE_NEW_BREWERY_FINISHED,
    } as const),
};

export type BreweryActionTypes = ActionType<typeof BreweryActions>;
