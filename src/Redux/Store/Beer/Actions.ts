import Axios from "axios";
import {
  SET_NEW_BEER_ID,
  SET_NEW_BEER_NAME,
  SET_NEW_BEER_BREWERY,
  SET_NEW_BEER_STYLE,
  SET_NEW_BEER_QUANTITY,
  SET_NEW_BEER_HISTORIC_QUANTITY,
  WAIT_ON_BEER_REQUEST,
  FETCH_ALL_BEER_RECEIVED,
  FETCH_BY_ID_RECEIVED,
  UPDATE_BEER_BY_ID,
  BeerActionTypes,
} from "./Types";
import { Beer, BeerExpanded } from "../../../Interfaces/Beer.types";
import { BeerState } from "./Types";
import { getBeerById } from "./Selectors";

import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { RootState } from "../index";

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

const setWaitOnRequestStatus = (): BeerActionTypes => {
  return {
    type: WAIT_ON_BEER_REQUEST,
  };
};

const onFetchAllBeerReceived = (inventory: BeerExpanded[]): BeerActionTypes => {
  return {
    type: FETCH_ALL_BEER_RECEIVED,
    inventory,
  };
};

const onFetchByIdReceived = (byId: BeerExpanded): BeerActionTypes => {
  return {
    type: FETCH_BY_ID_RECEIVED,
    byId,
  };
};

export const fetchAllBeer = (): ThunkAction<Promise<BeerActionTypes>, {}, {}, BeerActionTypes> => {
  return (dispatch) => {
    setWaitOnRequestStatus();
    return Axios.get("http://localhost:3002/v1/beer?expand=brewery,style")
      .then((res) => res.data)
      .then((json) => dispatch(onFetchAllBeerReceived(json)));
  };
};

export const fetchBeerById = (id: string): ThunkAction<Promise<BeerActionTypes>, {}, {}, BeerActionTypes> => {
  return (dispatch) => {
    setWaitOnRequestStatus();
    return Axios.get(`http://localhost:3002/v1/beer/${id}?expand=brewery,style`)
      .then((res) => res.data)
      .then((json) => dispatch(onFetchByIdReceived(json)));
  };
};

export const updateBeerById = (id: string, beer: Partial<BeerExpanded>): BeerActionTypes => {
  return {
    type: UPDATE_BEER_BY_ID,
    id,
    beer,
  };
};

// Quantity actions
// const fetchIfNotFound = (id: string, state: BeerState) => {
//   const beer = state.inventory.find((beer) => beer._id === id);
//   if (beer) {
//     return Promise.resolve();
//   }
//   return fetchBeerById(id);
// };

// const getCurrentQuantity = (id: string, state: BeerState): number => {
//   fetchIfNotFound(id, state).then(() => {
//     return state.inventory.find((beer) => beer._id === id)!.quantity;
//   });
// };

export const incrementBeerQuantity = (id: string): ThunkAction<Promise<BeerActionTypes>, RootState, {}, BeerActionTypes> => {
  return (dispatch, getState) => {
    setWaitOnRequestStatus();

    const quantity = getBeerById(getState(), id)?.quantity;

    if (quantity === undefined) {
      throw new Error(`Unable to find quantity of beer with ID of <b>${id}</b> in Redux store`);
    }

    return Axios.put(`http://localhost:3002/v1/beer/${id}`, { quantity: quantity + 1, historicQuantity: quantity + 1 })
      .then((res) => res.data)
      .then((json) => {
        return dispatch(updateBeerById(id, json));
      });
  };
};

export const decrementBeerQuantity = (id: string): ThunkAction<Promise<BeerActionTypes>, RootState, {}, BeerActionTypes> => {
  return (dispatch, getState) => {
    setWaitOnRequestStatus();

    const quantity = getBeerById(getState(), id)?.quantity;

    if (quantity === undefined) {
      throw new Error(`Unable to find quantity of beer with ID of <b>${id}</b> in Redux store`);
    }

    return Axios.put(`http://localhost:3002/v1/beer/${id}`, { quantity: quantity - 1 })
      .then((res) => res.data)
      .then((json) => {
        return dispatch(updateBeerById(id, json));
      });
  };
};

export const updateBeerQuantity = (id: string, quantity: number): ThunkAction<Promise<BeerActionTypes>, {}, {}, BeerActionTypes> => {
  return (dispatch) => {
    setWaitOnRequestStatus();
    return Axios.put(`http://localhost:3002/v1/beer/${id}`, { quantity })
      .then((res) => res.data)
      .then((json) => {
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
