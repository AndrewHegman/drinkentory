import { BreweryDocument, NewBrewery, PlaceDocument } from "../../../Interfaces";
import { ActionType } from "../../Common";

export const actionTypes = {
  SET_NEW_BREWERY_NAME: "SET_NEW_BREWERY_NAME",
  SET_NEW_BREWERY_PLACE: "SET_NEW_BREWERY_PLACE",

  WAIT_ON_FETCH_ALL_BREWERIES: "WAIT_ON_FETCH_ALL_BREWERIES",
  FETCH_ALL_BREWERIES_FINISHED: "FETCH_ALL_BREWERIES_FINISHED",

  RESET_NEW_BREWERY: "RESET_NEW_BREWERY",

  WAIT_ON_UPDATING_NEW_BREWERY_LOCATION: "WAIT_ON_UPDATING_NEW_BREWERY_LOCATION",
  UPDATING_NEW_BREWERY_LOCATION_FINISHED: "UPDATING_NEW_BREWERY_LOCATION_FINISHED",

  WAIT_ON_CREATE_NEW_BREWERY: "WAIT_ON_CREATE_NEW_BREWERY",
  CREATE_NEW_BREWERY_FINISHED: "CREATE_NEW_BREWERY_FINISHED",
} as const;

export interface BreweryState {
  isBreweriesLoading: boolean;
  newBrewery: NewBrewery;
  breweries: BreweryDocument[];
  updatingNewBreweryLocation: boolean;
  isCreatingNewBrewery: boolean;
}

export const BreweryActions = {
  setNewBreweryName: (name: string) =>
    ({
      type: actionTypes.SET_NEW_BREWERY_NAME,
      name,
    } as const),

  setNewBreweryPlace: (place: PlaceDocument) =>
    ({
      type: actionTypes.SET_NEW_BREWERY_PLACE,
      place,
    } as const),

  waitOnFetchAllBreweries: () =>
    ({
      type: actionTypes.WAIT_ON_FETCH_ALL_BREWERIES,
    } as const),

  fetchAllBreweriesFinished: (breweries: BreweryDocument[]) =>
    ({
      type: actionTypes.FETCH_ALL_BREWERIES_FINISHED,
      breweries,
    } as const),

  resetNewBrewery: () =>
    ({
      type: actionTypes.RESET_NEW_BREWERY,
    } as const),

  waitOnUpdatingNewBreweryLocation: () =>
    ({
      type: actionTypes.WAIT_ON_UPDATING_NEW_BREWERY_LOCATION,
    } as const),

  updatingNewBreweryLocationFinished: () =>
    ({
      type: actionTypes.UPDATING_NEW_BREWERY_LOCATION_FINISHED,
    } as const),

  waitOnCreateNewBrewery: () =>
    ({
      type: actionTypes.WAIT_ON_CREATE_NEW_BREWERY,
    } as const),

  createNewBreweryFinished: (brewery: BreweryDocument) =>
    ({
      type: actionTypes.CREATE_NEW_BREWERY_FINISHED,
      brewery,
    } as const),
};

export type BreweryActionTypes = ActionType<typeof BreweryActions>;
