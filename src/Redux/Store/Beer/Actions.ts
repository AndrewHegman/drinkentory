import Axios from "axios";
import {
  SET_NEW_BEER_ID,
  SET_NEW_BEER_NAME,
  SET_NEW_BEER_BREWERY,
  SET_NEW_BEER_STYLE,
  SET_NEW_BEER_QUANTITY,
  SET_NEW_BEER_HISTORIC_QUANTITY,
  WAIT_ON_BEER_REQUEST,
  UPDATE_BEER_BY_ID,
  BeerActionTypes,
} from "./Types";
import { Beer } from "../../../Interfaces/Beer.types";
import { BeerState } from "./Types";

import { ThunkAction, ThunkDispatch } from "redux-thunk";

export const setNewBeerId = (id: string): BeerActionTypes => {
  return {
    type: SET_NEW_BEER_ID,
    id,
  };
};

export const setNewBeerName = (name: string): BeerActionTypes => {
  return {
    type: SET_NEW_BEER_NAME,
    name,
  };
};

export const setNewBeerBrewery = (brewery: string): BeerActionTypes => {
  return {
    type: SET_NEW_BEER_BREWERY,
    brewery,
  };
};

export const setNewBeerStyle = (style: string): BeerActionTypes => {
  return {
    type: SET_NEW_BEER_STYLE,
    style,
  };
};

export const setNewBeerQuantity = (quantity: number): BeerActionTypes => {
  return {
    type: SET_NEW_BEER_QUANTITY,
    quantity,
  };
};

export const setNewBeerHistoricQuantity = (historicQuantity: number): BeerActionTypes => {
  return {
    type: SET_NEW_BEER_HISTORIC_QUANTITY,
    historicQuantity,
  };
};

const setWaitOnRequestStatus = (isLoading: boolean, fieldToUpdate?: keyof BeerState | keyof Beer, payload?: any): BeerActionTypes => {
  return {
    type: WAIT_ON_BEER_REQUEST,
    isLoading,
    fieldToUpdate,
    payload,
  };
};

export const fetchAllBeer = (expandFields?: [keyof Beer]): ThunkAction<Promise<BeerActionTypes>, {}, {}, BeerActionTypes> => {
  return (dispatch) => {
    setWaitOnRequestStatus(true);
    return Axios.get(`http://localhost:3002/v1/beer${expandFields ? `?expand=${expandFields.join(",")}` : ""}`)
      .then((res) => res.data)
      .then((json) => dispatch(setWaitOnRequestStatus(false, "inventory", json)));
  };
};

export const fetchBeerById = (expandFields?: [keyof Beer]): ThunkAction<Promise<BeerActionTypes>, {}, {}, BeerActionTypes> => {
  return (dispatch) => {
    setWaitOnRequestStatus(true);
    return Axios.get(`http://localhost:3002/v1/beer${expandFields ? `?expand=${expandFields.join(",")}` : ""}`)
      .then((res) => res.data)
      .then((json) => dispatch(setWaitOnRequestStatus(false, "inventory", json)));
  };
};

export const updateBeerById = (id: string, beer: Partial<Beer>): BeerActionTypes => {
  return {
    type: UPDATE_BEER_BY_ID,
    id,
    beer,
  };
};

export const updateBeerQuantity = (id: string, quantity: number): ThunkAction<Promise<BeerActionTypes>, {}, {}, BeerActionTypes> => {
  return (dispatch) => {
    setWaitOnRequestStatus(true);
    return Axios.put(`http://localhost:3002/v1/beer/${id}`, { quantity })
      .then((res) => res.data)
      .then((json) => {
        setWaitOnRequestStatus(false);
        return dispatch(updateBeerById(id, json));
      });
  };
};

export type BeerActionCallbacks =
  | typeof setNewBeerId
  | typeof setNewBeerName
  | typeof setNewBeerBrewery
  | typeof setNewBeerStyle
  | typeof setNewBeerQuantity
  | typeof setNewBeerHistoricQuantity
  | typeof fetchAllBeer;
