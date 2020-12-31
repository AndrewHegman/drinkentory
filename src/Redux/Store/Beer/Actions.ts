import Axios, { AxiosError } from "axios";
import { BeerActions, BeerActionTypes } from "./Types";
import { selectors } from "../../";
import { Container } from "../../../Interfaces";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../index";
import { CommonActions, CommonActionTypes } from "../Common/Types";
import { formatErrorMessage } from "../../Common";

export const beer = {
  setNewBeerName: (name: string): BeerActionTypes => {
    return BeerActions.setNewBeerName(name);
  },

  setNewBeerBrewery: (breweryId: string): ThunkAction<BeerActionTypes, RootState, {}, BeerActionTypes> => {
    return (dispatch, getState) => {
      const state = getState();
      const brewery = selectors.breweries.byId(state, breweryId);

      if (!brewery) {
        throw new Error(`Unable to find document in store for brewery with id ${breweryId}`);
      }

      return dispatch(BeerActions.setNewBeerBrewery(brewery));
    };
  },

  setNewBeerStyle: (styleId: string): ThunkAction<BeerActionTypes, RootState, {}, BeerActionTypes> => {
    return (dispatch, getState) => {
      const state = getState();
      const style = selectors.styles.byId(state, styleId);

      if (!style) {
        throw new Error(`Unable to find document in store for style with id ${styleId}`);
      }

      return dispatch(BeerActions.setNewBeerStyle(style));
    };
  },

  setNewBeerContainer: (container: Container): BeerActionTypes => {
    return BeerActions.setNewBeerContainer(container);
  },

  setNewBeerQuantity: (quantity: number): BeerActionTypes => {
    return BeerActions.setNewBeerQuantity(quantity);
  },

  addNewBeer: (): ThunkAction<
    Promise<ReturnType<typeof BeerActions.addNewBeerFinished> | CommonActionTypes>,
    RootState,
    {},
    BeerActionTypes | CommonActionTypes
  > => {
    return (dispatch, getState) => {
      dispatch(BeerActions.waitOnAddNewBeer());
      const { newBeer } = getState().beer;

      return Axios.post(`http://localhost:3002/v1/beer`, {
        name: newBeer.name,
        brewery: newBeer.brewery._id,
        style: newBeer.style._id,
        container: newBeer.container,
        quantity: newBeer.quantity,
        historicQuantity: newBeer.quantity,
      })
        .then((res) => dispatch(BeerActions.addNewBeerFinished(res.data)))
        .catch((error: AxiosError) => dispatch(CommonActions.setNetworkError(formatErrorMessage(error))));
    };
  },

  fetchAllBeer: (): ThunkAction<Promise<BeerActionTypes>, RootState, {}, BeerActionTypes> => {
    return (dispatch) => {
      dispatch(BeerActions.waitOnFetch());
      return Axios.get("http://localhost:3002/v1/beer?expand=brewery,style").then((res) => dispatch(BeerActions.fetchAllBeerReceived(res.data)));
    };
  },

  fetchBeerById: (id: string): ThunkAction<Promise<BeerActionTypes>, {}, {}, BeerActionTypes> => {
    return (dispatch) => {
      dispatch(BeerActions.waitOnFetch());
      return Axios.get(`http://localhost:3002/v1/beer/${id}?expand=brewery,style`)
        .then((res) => res.data)
        .then((json) => dispatch(BeerActions.fetchByIdReceived(json)));
    };
  },

  incrementBeerQuantity: (id: string, changeAmt?: number): ThunkAction<Promise<BeerActionTypes>, RootState, {}, BeerActionTypes> => {
    return (dispatch, getState) => {
      dispatch(BeerActions.waitOnUpdateBeer());

      const beer = selectors.beer.getBeerById(getState(), id);

      if (beer === undefined) {
        throw new Error(`Unable to find quantity of beer with ID of <b>${id}</b> in Redux store`);
      }

      const { quantity, historicQuantity } = beer;

      return Axios.put(`http://localhost:3002/v1/beer/${id}`, {
        quantity: quantity + (changeAmt ? changeAmt : 1),
        historicQuantity: historicQuantity + (changeAmt ? changeAmt : 1),
      }).then((res) => dispatch(BeerActions.updateBeerFinished(id, res.data)));
    };
  },

  decrementBeerQuantity: (id: string, changeAmt?: number): ThunkAction<Promise<BeerActionTypes>, RootState, {}, BeerActionTypes> => {
    return (dispatch, getState) => {
      dispatch(BeerActions.waitOnUpdateBeer());

      const quantity = selectors.beer.getBeerById(getState(), id)?.quantity;

      if (quantity === undefined) {
        throw new Error(`Unable to find quantity of beer with ID of <b>${id}</b> in Redux store`);
      }

      return Axios.put(`http://localhost:3002/v1/beer/${id}`, { quantity: quantity - (changeAmt ? changeAmt : 1) })
        .then((res) => res.data)
        .then((json) => {
          return dispatch(BeerActions.updateBeerFinished(id, json));
        });
    };
  },

  updateBeerQuantity: (id: string, quantity: number): ThunkAction<Promise<BeerActionTypes>, {}, {}, BeerActionTypes> => {
    return (dispatch) => {
      dispatch(BeerActions.waitOnUpdateBeer());
      return Axios.put(`http://localhost:3002/v1/beer/${id}`, { quantity })
        .then((res) => res.data)
        .then((json) => {
          return dispatch(BeerActions.updateBeerFinished(id, json));
        });
    };
  },
} as const;
