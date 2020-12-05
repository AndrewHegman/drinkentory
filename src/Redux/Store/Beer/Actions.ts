import Axios from "axios";
import { BeerActions, BeerActionTypes } from "./Types";
import { BeerDocument } from "../../../Interfaces/Beer.types";
import { beer as beerSelectors } from "./Selectors";

import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { RootState } from "../index";
import { BreweryDocument, StyleDocument } from "../../../Interfaces";

// const onFetchByIdReceived = (byId: BeerDocument): BeerActionTypes => {
//   return {
//     type: BeerActions.FETCH_BY_ID_RECEIVED,
//     byId,
//   };
// };

// const onFetchAllBeerReceived = (inventory: BeerDocument[]): BeerActionTypes => {
//   return {
//     type: BeerActions.FETCH_ALL_BEER_RECEIVED,
//     inventory,
//   };
// };

// const updateBeerById = (id: string, beer: Partial<BeerDocument>): BeerActionTypes => {
//   return {
//     type: BeerActions.UPDATE_BEER_BY_ID,
//     id,
//     beer,
//   };
// };

export const beer = {
  setNewBeerId: (id: string): BeerActionTypes => {
    return BeerActions.setNewBeerId(id);
  },

  setNewBeerName: (name: string): BeerActionTypes => {
    return BeerActions.setNewBeerName(name);
  },

  setNewBeerBrewery: (brewery: BreweryDocument): BeerActionTypes => {
    return BeerActions.setNewBeerBrewery(brewery);
  },

  setNewBeerStyle: (style: StyleDocument): BeerActionTypes => {
    return BeerActions.setNewBeerStyle(style);
  },

  setNewBeerQuantity: (quantity: number): BeerActionTypes => {
    return BeerActions.setNewBeerQuantity(quantity);
  },

  setNewBeerHistoricQuantity: (historicQuantity: number): BeerActionTypes => {
    return BeerActions.setNewBeerHistoricQuantity(historicQuantity);
  },

  fetchAllBeer: (): ThunkAction<Promise<BeerActionTypes>, RootState, {}, BeerActionTypes> => {
    return (dispatch) => {
      dispatch(BeerActions.waitOnRequest());
      return Axios.get("http://localhost:3002/v1/beer?expand=brewery,style")
        .then((res) => res.data)
        .then((json) => dispatch(BeerActions.fetchAllBeerReceived(json)));
    };
  },

  fetchBeerById: (id: string): ThunkAction<Promise<BeerActionTypes>, {}, {}, BeerActionTypes> => {
    return (dispatch) => {
      dispatch(BeerActions.waitOnRequest());
      return Axios.get(`http://localhost:3002/v1/beer/${id}?expand=brewery,style`)
        .then((res) => res.data)
        .then((json) => dispatch(BeerActions.fetchByIdReceived(json)));
    };
  },

  // Quantity actions
  // const fetchIfNotFound:(id: string, state: BeerState) => {
  //   const beer = state.inventory.find((beer) => beer._id === id);
  //   if (beer) {
  //     return Promise.resolve();
  //   }
  //   return fetchBeerById(id);
  // };

  // const getCurrentQuantity:(id: string, state: BeerState): number => {
  //   fetchIfNotFound(id, state).then(() => {
  //     return state.inventory.find((beer) => beer._id === id)!.quantity;
  //   });
  // };

  incrementBeerQuantity: (id: string): ThunkAction<Promise<BeerActionTypes>, RootState, {}, BeerActionTypes> => {
    return (dispatch, getState) => {
      dispatch(BeerActions.waitOnRequest());

      const quantity = beerSelectors.getBeerById(getState(), id)?.quantity;

      if (quantity === undefined) {
        throw new Error(`Unable to find quantity of beer with ID of <b>${id}</b> in Redux store`);
      }

      return Axios.put(`http://localhost:3002/v1/beer/${id}`, { quantity: quantity + 1, historicQuantity: quantity + 1 })
        .then((res) => res.data)
        .then((json) => {
          return dispatch(BeerActions.updateBeerById(id, json));
        });
    };
  },

  decrementBeerQuantity: (id: string): ThunkAction<Promise<BeerActionTypes>, RootState, {}, BeerActionTypes> => {
    return (dispatch, getState) => {
      dispatch(BeerActions.waitOnRequest());

      const quantity = beerSelectors.getBeerById(getState(), id)?.quantity;

      if (quantity === undefined) {
        throw new Error(`Unable to find quantity of beer with ID of <b>${id}</b> in Redux store`);
      }

      return Axios.put(`http://localhost:3002/v1/beer/${id}`, { quantity: quantity - 1 })
        .then((res) => res.data)
        .then((json) => {
          return dispatch(BeerActions.updateBeerById(id, json));
        });
    };
  },

  updateBeerQuantity: (id: string, quantity: number): ThunkAction<Promise<BeerActionTypes>, {}, {}, BeerActionTypes> => {
    return (dispatch) => {
      dispatch(BeerActions.waitOnRequest());
      return Axios.put(`http://localhost:3002/v1/beer/${id}`, { quantity })
        .then((res) => res.data)
        .then((json) => {
          return dispatch(BeerActions.updateBeerById(id, json));
        });
    };
  },
} as const;
