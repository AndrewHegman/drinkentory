import Axios from "axios";
import {
  SET_NEW_BEER_ID,
  SET_NEW_BEER_NAME,
  SET_NEW_BEER_BREWERY,
  SET_NEW_BEER_STYLE,
  SET_NEW_BEER_QUANTITY,
  SET_NEW_BEER_HISTORIC_QUANTITY,
  REQUEST_ALL_BEER,
  RECEIVE_ALL_BEER,
  BeerActionTypes,
  Beer,
} from "./Types";
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

const requestAllBeer = (): BeerActionTypes => {
  return {
    type: REQUEST_ALL_BEER,
  };
};

const receiveAllBeer = (inventory: Beer[]): BeerActionTypes => {
  return {
    type: RECEIVE_ALL_BEER,
    inventory,
  };
};

export const fetchAllBeer = (): ThunkAction<Promise<BeerActionTypes>, {}, {}, BeerActionTypes> => {
  return (dispatch) => {
    dispatch(requestAllBeer());
    return Axios.get("http://localhost:3001/v1/beer")
      .then((res) => res.data)
      .then((json) => dispatch(receiveAllBeer(json)));
  };
};

export type BeerActionCallbacks =
  | typeof setNewBeerId
  | typeof setNewBeerName
  | typeof setNewBeerBrewery
  | typeof setNewBeerStyle
  | typeof setNewBeerQuantity
  | typeof setNewBeerHistoricQuantity
  | typeof fetchAllBeer
  | typeof requestAllBeer;
