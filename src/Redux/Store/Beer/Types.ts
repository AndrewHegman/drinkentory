import { BeerDocument, BreweryDocument, Container, NewBeer, StyleDocument } from "../../../Interfaces";
import { ActionType } from "../../Common";

export const actionTypes = {
  SET_NEW_BEER_NAME: "SET_NEW_BEER_NAME",
  SET_NEW_BEER_BREWERY: "SET_NEW_BEER_BREWERY",
  SET_NEW_BEER_STYLE: "SET_NEW_BEER_STYLE",
  SET_NEW_BEER_CONTAINER: "SET_NEW_BEER_CONTAINER",
  SET_NEW_BEER_QUANTITY: "SET_NEW_BEER_QUANTITY",

  WAIT_ON_BEER_FETCH: "WAIT_ON_BEER_FETCH",

  FETCH_ALL_BEER_RECEIVED: "FETCH_ALL_BEER_RECEIVED",
  FETCH_BY_ID_RECEIVED: "FETCH_BY_ID_RECEIVED",

  WAIT_ON_UPDATE_BEER: "WAIT_ON_UPDATE_BEER",
  UPDATE_BEER_FINISHED: "UPDATE_BEER_FINISHED",

  WAIT_ON_ADD_NEW_BEER: "WAIT_ON_ADD_NEW_BEER",
  ADD_NEW_BEER_FINISHED: "ADD_NEW_BEER_FINISHED",

  SET_BEER_BEING_EDITTED: "SET_BEER_BEING_EDITTED",
  CLEAR_BEER_BEING_EDITTED: "CLEAR_BEER_BEING_EDITTED",
} as const;

export interface BeerState {
  newBeer: NewBeer;
  inventory: BeerDocument[];
  isWaitingOnFetch: boolean;
  isWaitingOnBeerUpdate: boolean;
  isWaitingOnAddNewBeer: boolean;
  beerBeingEditted: BeerDocument;
}

export const BeerActions = {
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

  setNewBeerContainer: (container: Container) =>
    ({
      type: actionTypes.SET_NEW_BEER_CONTAINER,
      container,
    } as const),

  setNewBeerQuantity: (quantity: number) =>
    ({
      type: actionTypes.SET_NEW_BEER_QUANTITY,
      quantity,
    } as const),

  waitOnFetch: () =>
    ({
      type: actionTypes.WAIT_ON_BEER_FETCH,
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

  waitOnUpdateBeer: () =>
    ({
      type: actionTypes.WAIT_ON_UPDATE_BEER,
    } as const),

  updateBeerFinished: (id: string, beer: Partial<BeerDocument>) =>
    ({
      type: actionTypes.UPDATE_BEER_FINISHED,
      id,
      beer,
    } as const),

  waitOnAddNewBeer: () =>
    ({
      type: actionTypes.WAIT_ON_ADD_NEW_BEER,
    } as const),

  addNewBeerFinished: (newBeer: BeerDocument) =>
    ({
      type: actionTypes.ADD_NEW_BEER_FINISHED,
      newBeer,
    } as const),

  setBeerBeingEditted: (beer: BeerDocument) => ({
    type: actionTypes.SET_BEER_BEING_EDITTED,
    beer,
  }),

  // clearBeerBeingEditted: () => ({
  //   type: actionTypes.CLEAR_BEER_BEING_EDITTED,
  // }),
};

export type BeerActionTypes = ActionType<typeof BeerActions>;
