import {
  SET_NEW_BEER_ID,
  SET_NEW_BEER_NAME,
  SET_NEW_BEER_BREWERY,
  SET_NEW_BEER_STYLE,
  SET_NEW_BEER_QUANTITY,
  SET_NEW_BEER_HISTORIC_QUANTITY,
  FETCH_ALL_BEER,
  BeerActionTypes,
  Beer,
} from "./Types";

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

export const fetchAllBeer = (): BeerActionTypes => {
  const inventory: Beer[] = [];
  return {
    type: FETCH_ALL_BEER,
    inventory,
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
