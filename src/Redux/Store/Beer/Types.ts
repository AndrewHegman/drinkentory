import { Beer } from "../../../Interfaces/Beer.types";

export const SET_NEW_BEER_ID = "SET_NEW_BEER_ID";
export const SET_NEW_BEER_NAME = "SET_NEW_BEER_NAME";
export const SET_NEW_BEER_BREWERY = "SET_NEW_BEER_BREWERY";
export const SET_NEW_BEER_STYLE = "SET_NEW_BEER_STYLE";
export const SET_NEW_BEER_QUANTITY = "SET_NEW_BEER_QUANTITY";
export const SET_NEW_BEER_HISTORIC_QUANTITY = "SET_NEW_BEER_HISTORIC_QUANTITY";

export const FETCH_CURRENT_BEER = "FETCH_CURRENT_BEER";
export const FETCH_BEER_BY_ID = "FETCH_BEER_BY_ID";

export const UPDATE_BEER_BY_ID = "UPDATE_BEER_BY_ID";

export const WAIT_ON_BEER_REQUEST = "WAIT_ON_REQUEST";

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

interface FetchCurrentBeer {
  type: typeof FETCH_CURRENT_BEER;
  inventory: Beer[];
}

interface WaitOnRequest {
  type: typeof WAIT_ON_BEER_REQUEST;
  isLoading: boolean;
  fieldToUpdate?: keyof BeerState | keyof Beer;
  payload?: any;
}

interface UpdateBeerById {
  type: typeof UPDATE_BEER_BY_ID;
  id: string;
  beer: Partial<Beer>;
}

export type BeerActionTypes =
  | SetNewBeerIdAction
  | SetNewBeerNameAction
  | SetNewBeerBreweryAction
  | SetNewBeerStyleAction
  | SetNewBeerQuantityAction
  | SetNewBeerHistoricQuantityAction
  | FetchCurrentBeer
  | WaitOnRequest
  | UpdateBeerById;
