import { SET_NEW_BREWERY_NAME, SET_NEW_BREWERY_COUNTRY, SET_NEW_BREWERY_STATE, SET_NEW_BREWERY_CITY, BreweryActionTypes } from "./Types";

export const setNewBreweryName = (name: string): BreweryActionTypes => {
  return {
    type: SET_NEW_BREWERY_NAME,
    name,
  };
};

export const setNewBreweryCountry = (country: string): BreweryActionTypes => {
  return {
    type: SET_NEW_BREWERY_COUNTRY,
    country,
  };
};

export const setNewBreweryState = (state: string): BreweryActionTypes => {
  return {
    type: SET_NEW_BREWERY_STATE,
    state,
  };
};

export const setNewBreweryCity = (city: string): BreweryActionTypes => {
  return {
    type: SET_NEW_BREWERY_CITY,
    city,
  };
};

export type BreweryActionCallbacks = typeof setNewBreweryName | typeof setNewBreweryCountry | typeof setNewBreweryState | typeof setNewBreweryCity;
