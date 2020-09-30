export const SET_NEW_BEER_ID = "SET_NEW_BEER_ID";
export const SET_NEW_BEER_NAME = "SET_NEW_BEER_NAME";
export const SET_NEW_BEER_BREWERY = "SET_NEW_BEER_BREWERY";
export const SET_NEW_BEER_STYLE = "SET_NEW_BEER_STYLE";
export const SET_NEW_BEER_QUANTITY = "SET_NEW_BEER_QUANTITY";
export const SET_NEW_BEER_HISTORIC_QUANTITY = "SET_NEW_BEER_HISTORIC_QUANTITY";

export const FETCH_ALL_BEER = "FETCH_ALL_BEER";
export const FETCH_CURRENT_BEER = "FETCH_CURRENT_BEER";
export const FETCH_BEER_BY_ID = "FETCH_BEER_BY_ID";
export const RECEIVE_ALL_BEER = "RECEIVE_ALL_BEER";
export const REQUEST_ALL_BEER = "REQUEST_ALL_BEER";

export interface Beer {
  id: string;
  name: string;
  brewery: string;
  style: string;
  quantity: number;
  historicQuantity: number;
}

export interface BeerState {
  newBeer?: Beer;
  inventory: Beer[];
  isLoading: boolean;
}

interface SetNewBeerIdAction {
  type: typeof SET_NEW_BEER_ID;
  id: string;
}

interface SetNewBeerNameAction {
  type: typeof SET_NEW_BEER_NAME;
  name: string;
}

interface SetNewBeerBreweryAction {
  type: typeof SET_NEW_BEER_BREWERY;
  brewery: string;
}

interface SetNewBeerStyleAction {
  type: typeof SET_NEW_BEER_STYLE;
  style: string;
}

interface SetNewBeerQuantityAction {
  type: typeof SET_NEW_BEER_QUANTITY;
  quantity: number;
}

interface SetNewBeerHistoricQuantityAction {
  type: typeof SET_NEW_BEER_HISTORIC_QUANTITY;
  historicQuantity: number;
}

interface FetchAllBeer {
  type: typeof FETCH_ALL_BEER;
  inventory: Beer[];
}

interface FetchCurrentBeer {
  type: typeof FETCH_CURRENT_BEER;
  inventory: Beer[];
}

interface ReceiveAllBeer {
  type: typeof RECEIVE_ALL_BEER;
  inventory: Beer[];
}

interface RequestAllBeer {
  type: typeof REQUEST_ALL_BEER;
}

export type BeerActionTypes =
  | SetNewBeerIdAction
  | SetNewBeerNameAction
  | SetNewBeerBreweryAction
  | SetNewBeerStyleAction
  | SetNewBeerQuantityAction
  | SetNewBeerHistoricQuantityAction
  | FetchAllBeer
  | FetchCurrentBeer
  | ReceiveAllBeer
  | RequestAllBeer;
