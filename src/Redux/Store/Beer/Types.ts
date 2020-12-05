import { BeerDocument, BreweryDocument, StyleDocument } from "../../../Interfaces";

export const actionTypes = {
  SET_NEW_BEER_ID: "SET_NEW_BEER_ID",
  SET_NEW_BEER_NAME: "SET_NEW_BEER_NAME",
  SET_NEW_BEER_BREWERY: "SET_NEW_BEER_BREWERY",
  SET_NEW_BEER_STYLE: "SET_NEW_BEER_STYLE",
  SET_NEW_BEER_QUANTITY: "SET_NEW_BEER_QUANTITY",
  SET_NEW_BEER_HISTORIC_QUANTITY: "SET_NEW_BEER_HISTORIC_QUANTITY",

  FETCH_CURRENT_BEER: "FETCH_CURRENT_BEER",
  FETCH_BEER_BY_ID: "FETCH_BEER_BY_ID",

  UPDATE_BEER_BY_ID: "UPDATE_BEER_BY_ID",

  WAIT_ON_BEER_REQUEST: "WAIT_ON_REQUEST",
  FETCH_ALL_BEER_RECEIVED: "FETCH_ALL_BEER_RECEIVED",
  FETCH_BY_ID_RECEIVED: "FETCH_BY_ID_RECEIVED",
} as const;

export interface BeerState {
  newBeer?: BeerDocument;
  inventory: BeerDocument[];
  isLoading: boolean;
}

export const BeerActions = {
  setNewBeerId: (id: string) =>
    ({
      type: actionTypes.SET_NEW_BEER_ID,
      id,
    } as const),

  setNewBeerName: (name: string) =>
    ({
      type: actionTypes.SET_NEW_BEER_NAME,
      name,
    } as const),

  setNewBeerBrewery: (brewery: BreweryDocument) =>
    ({
      type: actionTypes.SET_NEW_BEER_BREWERY,
      brewery,
    } as const),

  setNewBeerStyle: (style: StyleDocument) =>
    ({
      type: actionTypes.SET_NEW_BEER_STYLE,
      style,
    } as const),

  setNewBeerQuantity: (quantity: number) =>
    ({
      type: actionTypes.SET_NEW_BEER_QUANTITY,
      quantity,
    } as const),

  setNewBeerHistoricQuantity: (historicQuantity: number) =>
    ({
      type: actionTypes.SET_NEW_BEER_HISTORIC_QUANTITY,
      historicQuantity,
    } as const),

  waitOnRequest: () =>
    ({
      type: actionTypes.WAIT_ON_BEER_REQUEST,
    } as const),

  fetchAllBeerReceived: (inventory: BeerDocument[]) =>
    ({
      type: actionTypes.FETCH_ALL_BEER_RECEIVED,
      inventory,
    } as const),

  fetchByIdReceived: (byId: BeerDocument) =>
    ({
      type: actionTypes.FETCH_BY_ID_RECEIVED,
      byId,
    } as const),

  updateBeerById: (id: string, beer: Partial<BeerDocument>) =>
    ({
      type: actionTypes.UPDATE_BEER_BY_ID,
      id,
      beer,
    } as const),
};

export type BeerActionTypes =
  | ReturnType<typeof BeerActions.setNewBeerId>
  | ReturnType<typeof BeerActions.setNewBeerName>
  | ReturnType<typeof BeerActions.setNewBeerBrewery>
  | ReturnType<typeof BeerActions.setNewBeerStyle>
  | ReturnType<typeof BeerActions.setNewBeerQuantity>
  | ReturnType<typeof BeerActions.setNewBeerHistoricQuantity>
  | ReturnType<typeof BeerActions.waitOnRequest>
  | ReturnType<typeof BeerActions.updateBeerById>
  | ReturnType<typeof BeerActions.fetchByIdReceived>
  | ReturnType<typeof BeerActions.fetchAllBeerReceived>;
