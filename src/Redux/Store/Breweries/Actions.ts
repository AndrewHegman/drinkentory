import Axios from "axios";
import { Brewery } from "../../../Interfaces/Brewery.types";
import {
  SET_NEW_BREWERY_NAME,
  SET_NEW_BREWERY_COUNTRY,
  SET_NEW_BREWERY_STATE,
  SET_NEW_BREWERY_CITY,
  WAIT_ON_BREWERIES_REQUEST,
  BreweryActionTypes,
  BreweryState,
} from "./Types";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

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

const setWaitOnRequestStatus = (isLoading: boolean, fieldToUpdate?: keyof BreweryState | keyof Brewery, payload?: any): BreweryActionTypes => {
  return {
    type: WAIT_ON_BREWERIES_REQUEST,
    isLoading,
    fieldToUpdate,
    payload,
  };
};

export const fetchAllBreweries = (expandFields?: [keyof Brewery]): ThunkAction<Promise<BreweryActionTypes>, {}, {}, BreweryActionTypes> => {
  return (dispatch) => {
    setWaitOnRequestStatus(true);
    return Axios.get(`http://localhost:3002/v1/brewery${expandFields ? `?expand=${expandFields.join(",")}` : ""}`)
      .then((res) => res.data)
      .then((json) => dispatch(setWaitOnRequestStatus(false, "breweries", json)));
  };
};

export type BreweryActionCallbacks =
  | typeof setNewBreweryName
  | typeof setNewBreweryCountry
  | typeof setNewBreweryState
  | typeof setNewBreweryCity
  | typeof fetchAllBreweries;
